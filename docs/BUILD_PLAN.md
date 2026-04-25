# RestockIt Build Plan

## Prerequisites (Before Coding)

### Accounts Needed
| Service | Purpose | Free Tier | Sign Up |
|---------|---------|-----------|---------|
| Shopify Partners | App development | Yes | partners.shopify.com |
| Development Store | Testing | Yes | Create in Partners |
| SendGrid | Primary email | 100/day | sendgrid.com |
| Mailgun | Backup email | 5,000/mo | mailgun.com |
| Twilio | SMS (Phase 2) | Trial credits | twilio.com |
| PostgreSQL | Database | Yes (Railway/Supabase) | railway.app |
| Vercel/Railway | Hosting | Yes | vercel.com |

### Local Setup
- [ ] Node.js 18+
- [ ] PostgreSQL local or cloud
- [ ] ngrok for webhook tunneling
- [ ] Shopify CLI (`npm install -g @shopify/cli`)

---

## Phase 1: Foundation (Week 1)

### 1.1 Shopify App Scaffolding
```bash
npm init @shopify/app@latest restockit-app
# Select: Remix template
# Move contents to src/
```

**What this gives you:**
- OAuth flow (automatic)
- Session management
- App Bridge setup
- Polaris UI ready

### 1.2 Database Setup
- [ ] Configure DATABASE_URL in .env
- [ ] Run `npx prisma db push` to create tables
- [ ] Test connection with Prisma Studio

### 1.3 Basic App Routes
```
src/app/routes/
├── app._index.tsx        # Dashboard home
├── app.settings.tsx      # Store settings
├── app.subscribers.tsx   # View subscribers
└── webhooks.tsx          # Webhook receiver
```

### 1.4 Connect to Shopify Partners
- [ ] Create app in Partners dashboard
- [ ] Get API key + secret
- [ ] Configure app URL (ngrok for dev)
- [ ] Install on development store

**Deliverable:** App installs, shows empty dashboard, database connected.

---

## Phase 2: Webhook Infrastructure (Week 2)

### 2.1 Register Webhooks
On app install, subscribe to:
```javascript
const webhooks = [
  'INVENTORY_LEVELS_UPDATE',  // Stock changes (CRITICAL)
  'PRODUCTS_UPDATE',          // Product info changes
  'PRODUCTS_DELETE',          // Cleanup
  'APP_UNINSTALLED',          // Store cleanup
  'ORDERS_CREATE'             // Conversion tracking
];
```

### 2.2 Webhook Handler
```
src/webhooks/
├── inventory-update.ts    # Check if back in stock → trigger notifications
├── product-update.ts      # Sync product data
├── product-delete.ts      # Remove subscribers for deleted products
├── app-uninstalled.ts     # Delete all store data
└── order-create.ts        # Mark conversions
```

### 2.3 Inventory Logic
```
When inventory_levels/update fires:
1. Get variant ID from webhook
2. Check if inventory > 0 (now in stock)
3. Query subscribers waiting for this variant
4. Queue notifications for each subscriber
5. Update subscriber status to NOTIFIED
```

**Deliverable:** Webhooks receiving, inventory changes logged.

---

## Phase 3: Theme App Extension (Week 2-3)

### 3.1 Create Extension
```bash
shopify app generate extension
# Select: Theme App Extension
```

### 3.2 Notify Button Block
```
extensions/notify-button/
├── blocks/
│   └── notify-button.liquid    # The button + form
├── assets/
│   └── notify-button.js        # Form submission
└── locales/
    └── en.default.json         # Text strings
```

### 3.3 Button Features
- Shows only when product is out of stock
- Email input field
- Optional phone input (for SMS)
- Submit to your app's API
- Success/error states
- Customizable via theme editor (colors, text)

### 3.4 API Endpoint for Form
```
POST /api/subscribe
Body: { email, phone?, productId, variantId, shopDomain }
Response: { success: true } or { error: "message" }
```

**Deliverable:** Button appears on out-of-stock products, submissions saved to database.

---

## Phase 4: Email Notifications (Week 3-4)

### 4.1 Email Service
```typescript
// src/services/email.ts
async function sendRestockEmail(subscriber, product) {
  try {
    // Try SendGrid first
    await sendgrid.send(email);
    return { provider: 'sendgrid', success: true };
  } catch (error) {
    // Fallback to Mailgun
    await mailgun.send(email);
    return { provider: 'mailgun', success: true };
  }
}
```

### 4.2 Email Template
```
Subject: Good news! {product_name} is back in stock

Body:
- Product image
- Product name + variant
- Price
- "Shop Now" button (tracked link)
- Unsubscribe link
```

### 4.3 Notification Queue
- Don't send all at once (spam filters)
- Rate limit: 100 emails/minute
- Track: sent, delivered, opened, clicked, bounced
- Retry failed sends (max 3 attempts)

### 4.4 Delivery Tracking
- SendGrid webhooks for delivery status
- Update Notification record with timestamps
- Calculate open/click rates

**Deliverable:** Emails send when items restock, delivery tracked.

---

## Phase 5: Admin Dashboard (Week 4-5)

### 5.1 Dashboard Pages

**Home (app._index.tsx)**
- Total subscribers
- Notifications sent (this month)
- Open rate, click rate
- Recent activity feed

**Subscribers (app.subscribers.tsx)**
- Table: email, product, status, date
- Filter by: status, product, date range
- Export to CSV
- Manual notification trigger

**Products (app.products.tsx)**
- Products with subscribers
- Subscriber count per product
- Stock status

**Notifications (app.notifications.tsx)**
- Sent notifications log
- Status: delivered, opened, clicked, bounced
- Filter by date, status

**Settings (app.settings.tsx)**
- Email sender name
- Reply-to email
- Notification timing
- Branding options

### 5.2 UI Components (Polaris)
```
src/components/
├── StatsCard.tsx         # Metric display
├── SubscriberTable.tsx   # Data table
├── ActivityFeed.tsx      # Recent events
├── ProductSelector.tsx   # Product picker
└── TemplateEditor.tsx    # Email template editor
```

**Deliverable:** Full admin dashboard with real data.

---

## Phase 6: Email Template Editor (Week 5)

### 6.1 Template System
- Store templates in database per store
- Variables: {product_name}, {variant_name}, {price}, {image_url}, {shop_url}
- Preview with sample data
- HTML + plain text versions

### 6.2 Editor UI
- Subject line input
- Rich text editor for body
- Image upload for logo
- Color picker for button
- Live preview
- Send test email

### 6.3 Default Templates
- Restock notification (required)
- Thank-you for subscribing
- Reminder (still in stock)

**Deliverable:** Merchants can customize their emails.

---

## Phase 7: Polish & Testing (Week 5-6)

### 7.1 Edge Cases
- [ ] Product deleted while subscribers waiting
- [ ] Variant deleted
- [ ] Store uninstalls then reinstalls
- [ ] Invalid email submitted
- [ ] Subscriber already notified, product goes out then back in
- [ ] High volume (1000+ subscribers for one product)

### 7.2 Error Handling
- [ ] Webhook signature validation
- [ ] Rate limiting on subscribe endpoint
- [ ] Graceful API failures
- [ ] User-friendly error messages

### 7.3 Testing Checklist
- [ ] Install flow works
- [ ] Button appears on out-of-stock only
- [ ] Form submits successfully
- [ ] Webhook receives inventory updates
- [ ] Email sends on restock
- [ ] Email renders correctly (test multiple clients)
- [ ] Dashboard shows accurate stats
- [ ] Unsubscribe works
- [ ] Mobile responsive

### 7.4 Performance
- [ ] Database queries optimized (indexes)
- [ ] Webhook processing < 5 seconds
- [ ] Dashboard loads < 2 seconds

**Deliverable:** App is production-ready.

---

## Phase 8: App Store Submission (Week 6)

### 8.1 Requirements
- [ ] Privacy policy URL
- [ ] App icon (1200x1200)
- [ ] Screenshots (desktop + mobile)
- [ ] Demo video (optional but helps)
- [ ] App listing copy

### 8.2 App Listing
```
Name: RestockIt - Back in Stock Alerts
Tagline: Reliable notifications. Honest pricing.

Key Features:
- 50 free notifications/month
- Real-time inventory sync
- Email + SMS notifications
- Klaviyo & Mailchimp included free
- Beautiful, customizable emails
```

### 8.3 Review Prep
- [ ] Test on fresh store
- [ ] Document all features
- [ ] Prepare for reviewer questions
- [ ] GDPR compliance (data handling)

**Deliverable:** App submitted to Shopify App Store.

---

## Phase 2 Features (Post-Launch)

### Month 2-3
- [ ] SMS notifications (Twilio)
- [ ] Klaviyo integration
- [ ] Mailchimp integration
- [ ] Import subscribers from competitors
- [ ] Reminder emails ("Still in stock!")
- [ ] Custom sender email domain

### Month 4-6
- [ ] PreOrder functionality
- [ ] Wishlist feature
- [ ] Low stock alerts
- [ ] WhatsApp notifications
- [ ] Multi-language support
- [ ] API access for developers

---

## Cost Estimates

### Development
| Service | Monthly Cost |
|---------|--------------|
| Railway (DB + Hosting) | $5-20 |
| SendGrid | Free (100/day) |
| Mailgun | Free (5,000/mo) |
| ngrok | Free (dev only) |
| **Total** | **~$10/mo to start** |

### At Scale (1000+ merchants)
| Service | Monthly Cost |
|---------|--------------|
| Railway/AWS | $50-200 |
| SendGrid Pro | $20-90 |
| Twilio SMS | Usage-based |
| **Total** | **$100-300/mo** |

---

## Timeline Summary

| Week | Focus | Deliverable |
|------|-------|-------------|
| 1 | Foundation | App installs, DB connected |
| 2 | Webhooks + Button | Inventory tracking, form working |
| 3 | Notifications | Emails sending on restock |
| 4 | Dashboard | Admin UI complete |
| 5 | Templates + Polish | Customization, edge cases |
| 6 | Testing + Submit | App Store submission |

---

## Questions to Decide

1. **Hosting:** Vercel, Railway, or Fly.io?
2. **Free tier limit:** 50 notifications/month good?
3. **Branding:** "Powered by RestockIt" on free tier?
4. **Pricing tiers:** Finalize pricing structure?
5. **Domain:** restockit.com / restockit.app / other?
