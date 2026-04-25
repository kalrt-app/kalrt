# RestockIt - Shopify Back-in-Stock App

## What This Is
Shopify embedded app competing with Notify Me!, STOQ, Appikon. Core promise: "The back-in-stock app that just works. Honest pricing. Reliable notifications."

## Stack
- **Framework:** Remix (Shopify's recommended)
- **Database:** PostgreSQL + Prisma
- **Email:** SendGrid (primary) + Mailgun (fallback)
- **SMS:** Twilio
- **UI:** Shopify Polaris components
- **Auth:** Shopify App Bridge

## Commands
```bash
npm run dev          # Start dev server (shopify app dev)
npm run build        # Production build
npm run deploy       # Deploy to Shopify
npm run db:migrate   # Prisma migrations
npm run db:studio    # Prisma Studio GUI
npm run tunnel       # ngrok for webhooks
```

## File Structure
```
src/
├── app/              # Remix routes
│   ├── routes/       # Page routes + API endpoints
│   └── shopify.server.ts  # Shopify auth config
├── components/       # React + Polaris components
├── lib/              # Utilities, clients, helpers
├── webhooks/         # Shopify webhook handlers
├── services/         # Business logic
│   ├── notifications.ts   # Send email/SMS
│   ├── inventory.ts       # Stock tracking
│   └── integrations.ts    # Klaviyo, Mailchimp
└── templates/        # Email/SMS templates
extensions/           # Theme App Extension (Notify button)
prisma/               # Database schema
docs/                 # Competitive research
```

## Environment Variables
All secrets in `.env` — never hardcode. Required:
```
SHOPIFY_API_KEY, SHOPIFY_API_SECRET     # Shopify Partners
DATABASE_URL                             # PostgreSQL connection
SENDGRID_API_KEY, MAILGUN_API_KEY       # Email providers
TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN   # SMS
```
See `.env.example` for full list.

## Key Webhooks
```
inventory_levels/update  → CRITICAL: triggers restock notifications
products/update          → Sync product data
app/uninstalled          → Cleanup store data
orders/create            → Track conversions
```

## Database Models (prisma/schema.prisma)
- `Store` — Shop data, plan, settings
- `Subscriber` — Email/phone waiting for restock
- `Notification` — Sent notifications, delivery tracking
- `Product/Variant` — Cached Shopify product data
- `Template` — Email/SMS templates per store

## Conventions

### Naming
- Files: kebab-case (`notification-service.ts`)
- Components: PascalCase (`NotifyButton.tsx`)
- Functions: camelCase (`sendRestockEmail`)
- Database: PascalCase models, camelCase fields

### Patterns
- Services handle business logic, routes are thin
- Always use Prisma transactions for multi-table writes
- Webhook handlers must be idempotent (same webhook may fire twice)
- Email sending: try SendGrid first, fallback to Mailgun on failure

### Error Handling
- Log all errors with context (storeId, subscriberId, etc.)
- Never expose internal errors to storefront
- Webhooks must return 200 quickly, process async

### Security
- Verify Shopify webhook HMAC signatures
- Sanitize all user input (email, phone)
- Rate limit notification sending (100/min per store)
- Never store raw access tokens in logs

## Current Phase: MVP
Target: 6 weeks to App Store

### MVP Checklist
1. [ ] Shopify app auth (OAuth flow)
2. [ ] Database setup (Prisma + PostgreSQL)
3. [ ] Webhook handling (inventory_levels/update)
4. [ ] Theme App Extension (Notify Me button)
5. [ ] Email collection form
6. [ ] Basic email sending (SendGrid)
7. [ ] Admin dashboard (requests, notifications, stats)
8. [ ] Variant-level tracking
9. [ ] Email template editor
10. [ ] App Store submission

## Competitive Edge
| Feature | Competitors | RestockIt |
|---------|-------------|-----------|
| Free notifications/mo | 10 | **50** |
| Klaviyo/Mailchimp | $20/mo+ | **Free** |
| Inventory sync | Hours | **Real-time** |
| Email reliability | Single | **Redundant** |

## Reference Docs
- `docs/COMPETITOR_BLUEPRINT.md` — Full competitive analysis
- `docs/NOTIFY_ME_ANALYSIS.html` — Live testing of Notify Me!
- `docs/UI_UX_BLUEPRINT.md` — Dashboard design patterns & Polaris guidelines
- `docs/BUILD_PLAN.md` — 6-week development roadmap
- Shopify App Docs: https://shopify.dev/docs/apps
- Remix Docs: https://remix.run/docs
- Polaris: https://polaris.shopify.com

## Update This File
When making architectural decisions, learning new patterns, or establishing conventions — update this file so future sessions have context. Claude should proactively suggest updates when:
- New integration pattern established
- Bug fix reveals important gotcha
- Convention decided (naming, structure, approach)
- External service configured
