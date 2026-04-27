/**
 * Storefront Subscribe API (Direct endpoint with CORS)
 * Temporary endpoint for development while app proxy is being fixed
 *
 * POST /api/storefront/subscribe
 */

import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// CORS headers for storefront requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Handle OPTIONS preflight
export async function loader({ request }: LoaderFunctionArgs) {
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  return json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
}

// Handle POST subscribe
export async function action({ request }: ActionFunctionArgs) {
  // Handle CORS preflight
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const body = await request.json();
    const { email, phone, productId, variantId, productTitle } = body;

    // Validate required fields
    if (!email || !email.includes("@")) {
      return json({ error: "Valid email required" }, { status: 400, headers: corsHeaders });
    }

    if (!productId) {
      return json({ error: "Product ID required" }, { status: 400, headers: corsHeaders });
    }

    // Get origin/referer to identify store
    const origin = request.headers.get("origin") || request.headers.get("referer") || "";
    const shopDomain = origin.match(/https?:\/\/([^\/]+)/)?.[1] || "kalrt-dev.myshopify.com";

    // Find or create store
    let store = await prisma.store.findFirst({
      where: { shopDomain },
    });

    if (!store) {
      store = await prisma.store.create({
        data: {
          id: crypto.randomUUID(),
          shopDomain,
          accessToken: "storefront-direct",
          updatedAt: new Date(),
        },
      });
    }

    // Check for existing subscriber
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
        source: "storefront-direct",
        ipAddress: request.headers.get("x-forwarded-for")?.split(",")[0] || null,
        userAgent: request.headers.get("user-agent") || null,
        updatedAt: new Date(),
      },
    });

    console.log(`[KALRT] New subscriber: ${email} for product ${productId} (direct)`);

    return json({
      success: true,
      message: "You're on the list! We'll notify you when it's back in stock.",
      subscriberId: subscriber.id,
    }, { headers: corsHeaders });

  } catch (error) {
    console.error("[KALRT] Storefront subscribe error:", error);
    return json(
      { error: "Something went wrong. Please try again." },
      { status: 500, headers: corsHeaders }
    );
  }
}
