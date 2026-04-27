# KALRT

> Shopify back-in-stock notification app. Reliable. Transparent. Actually works.

## Why This Exists

Current back-in-stock apps have problems:
- **Notify Me!** charges for 100 "requests" but only sends 10 notifications/month
- **Appikon** has mass email failures, support ignores issues
- **Swym** takes hours to sync inventory
- All of them lock basic features (Klaviyo, Mailchimp) behind expensive plans

We're building the alternative.

## Our Advantages

| Feature | Competitors | KALRT |
|---------|-------------|-----------|
| Free notifications/mo | 10 | **50** |
| Klaviyo integration | $20/mo+ | **Free** |
| Mailchimp integration | $20/mo+ | **Free** |
| Inventory sync | Hours | **Real-time** |
| Email reliability | Single provider | **Redundant** |

## Tech Stack

- **Framework:** Remix (Shopify's recommended)
- **Database:** PostgreSQL + Prisma
- **Email:** SendGrid + Mailgun (redundancy)
- **SMS:** Twilio
- **Hosting:** Vercel / Railway / Fly.io

## Getting Started

```bash
# Clone
git clone https://github.com/yourusername/kalrt.git
cd kalrt

# Install
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Database
npm run db:migrate

# Development
npm run dev
```

## Project Structure

```
kalrt/
├── src/
│   ├── app/              # Remix routes
│   ├── components/       # UI components
│   ├── lib/              # Utilities
│   ├── webhooks/         # Shopify webhooks
│   ├── services/         # Business logic
│   └── templates/        # Email/SMS templates
├── extensions/           # Theme App Extension
├── prisma/               # Database schema
├── docs/                 # Documentation
│   ├── COMPETITOR_BLUEPRINT.md
│   └── NOTIFY_ME_ANALYSIS.html
└── scripts/              # Automation
```

## Roadmap

### MVP (Week 1-6)
- [ ] Shopify OAuth
- [ ] Webhook handling
- [ ] Theme App Extension (button)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] App Store submission

### Phase 2 (Week 7-12)
- [ ] SMS notifications
- [ ] Klaviyo integration
- [ ] Mailchimp integration
- [ ] Custom email templates
- [ ] Reminder emails

### Phase 3 (Week 13-18)
- [ ] PreOrder functionality
- [ ] Wishlist feature
- [ ] Low stock alerts
- [ ] WhatsApp notifications

## Documentation

- [Competitor Blueprint](docs/COMPETITOR_BLUEPRINT.md) - Full competitive analysis
- [Notify Me Analysis](docs/NOTIFY_ME_ANALYSIS.html) - Live testing of main competitor

## License

Proprietary - All rights reserved
