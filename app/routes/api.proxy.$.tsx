/**
 * App Proxy Handler
 * Routes: /apps/kalrt/* → /api/proxy/*
 *
 * Handles storefront requests from theme extension:
 * - POST /apps/kalrt/subscribe → Save subscriber to database
 */

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import * as crypto from "crypto";

const prisma = new PrismaClient();

// CORS headers for direct storefront requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Verify Shopify app proxy signature
function verifyAppProxySignature(
  query: URLSearchParams,
  secret: string
): boolean {
  const signature = query.get("signature");
  if (!signature) return false;

  // Build the message from sorted query params (excluding signature)
  const params: string[] = [];
  query.forEach((value, key) => {
    if (key !== "signature") {
      params.push(`${key}=${value}`);
    }
  });
  params.sort();
  const message = params.join("");

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  return hmac === signature;
}

// GET requests (health check, etc.) and OPTIONS preflight
export async function loader({ request }: LoaderFunctionArgs) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  const url = new URL(request.url);
  const path = url.pathname.replace("/api/proxy", "");

  if (path === "/health" || path === "") {
    return json({ status: "ok", service: "kalrt" }, { headers: corsHeaders });
  }

  return json({ error: "Not found" }, { status: 404, headers: corsHeaders });
}

// POST requests (subscribe, etc.)
export async function action({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/proxy", "");

  // Handle subscribe endpoint
  if (path === "/subscribe") {
    return handleSubscribe(request);
  }

  return json({ error: "Not found" }, { status: 404 });
}

async function handleSubscribe(request: Request) {
  try {
    const url = new URL(request.url);
    const shop = url.searchParams.get("shop");
    const origin = request.headers.get("origin") || "";
    const isDirectCall = origin.includes("myshopify.com") || !shop;

    // Verify app proxy signature ONLY for proxy calls (not direct storefront calls)
    if (process.env.NODE_ENV === "production" && shop && !isDirectCall) {
      const isValid = verifyAppProxySignature(
        url.searchParams,
        process.env.SHOPIFY_API_SECRET || ""
      );
      if (!isValid) {
        return json({ error: "Invalid signature" }, { status: 401, headers: corsHeaders });
      }
    }

    const body = await request.json();
    const { email, phone, productId, variantId, productTitle } = body;

    // Validate required fields
    if (!email || !email.includes("@")) {
      return json({ error: "Valid email required" }, { status: 400, headers: corsHeaders });
    }

    if (!productId) {
      return json({ error: "Product ID required" }, { status: 400, headers: corsHeaders });
    }

    // Get store from database - use origin for direct calls
    let shopDomain = shop || url.searchParams.get("logged_in_customer_id")?.split("/")[0];

    // For direct storefront calls, extract shop from origin
    if (!shopDomain && origin) {
      const match = origin.match(/https?:\/\/([^\/]+)/);
      shopDomain = match?.[1] || "kalrt-dev.myshopify.com";
    }

    if (!shopDomain) {
      // In dev, create or find a default store
      if (process.env.NODE_ENV !== "production") {
        console.log("[KALRT] Dev mode - using default store");
        shopDomain = "kalrt-dev.myshopify.com";
      } else {
        return json({ error: "Shop not identified" }, { status: 400, headers: corsHeaders });
      }
    }

    // Find or create store (for dev mode)
    let store = await prisma.store.findFirst({
      where: shopDomain ? { shopDomain } : undefined,
    });

    if (!store) {
      // Create dev store if none exists
      store = await prisma.store.create({
        data: {
          id: crypto.randomUUID(),
          shopDomain: shopDomain || "kalrt-dev.myshopify.com",
          accessToken: "dev-token",
          updatedAt: new Date(),
        },
      });
    }

    // Check for existing subscriber (same email + product + variant)
    const existingSubscriber = await prisma.subscriber.findFirst({
      where: {
        storeId: store.id,
        email: email.toLowerCase().trim(),
        productId: String(productId),
        variantId: variantId ? String(variantId) : null,
        status: "WAITING",
      },
    });

    if (existingSubscriber) {
      return json({
        success: true,
        message: "You're already subscribed! We'll notify you when it's back.",
        alreadySubscribed: true,
      }, { headers: corsHeaders });
    }

    // Create new subscriber
    const subscriber = await prisma.subscriber.create({
      data: {
        id: crypto.randomUUID(),
        storeId: store.id,
        email: email.toLowerCase().trim(),
        phone: phone?.trim() || null,
        productId: String(productId),
        variantId: variantId ? String(variantId) : null,
        productTitle: productTitle || null,
        source: "theme-extension",
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || null,
        userAgent: request.headers.get("user-agent") || null,
        updatedAt: new Date(),
      },
    });

    console.log(`[KALRT] New subscriber: ${email} for product ${productId}`);

    return json({
      success: true,
      message: "You're on the list! We'll notify you when it's back in stock.",
      subscriberId: subscriber.id,
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("[KALRT] Subscribe error:", error);
    return json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: corsHeaders }
    );
  }
}
