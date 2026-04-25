# Back-in-Stock App Competitor Blueprint
*Generated: April 23, 2026*
*Based on: Live testing of Notify Me! + Competitive research*

---

## Executive Summary

**Market Opportunity:** Back-in-stock notification apps have reliability and pricing problems. Merchants complain about notifications not sending, confusing billing, and locked features. A well-executed competitor can capture market share by being reliable, transparent, and generous on free tier.

**Target Position:** "The back-in-stock app that just works"

---

## Competitor Landscape

### Top 6 Players

| App | Rating | Reviews | Pricing | Key Weakness |
|-----|--------|---------|---------|--------------|
| Notify! Back in Stock | 4.9★ | 3,065 | Free + $19.90/mo | Deceptive free tier (100 requests/10 notifications), slow iframe UI |
| STOQ | 5.0★ | 2,964 | Free + $10/mo | Less brand recognition |
| Kbite (Cartbite) | 5.0★ | 3,470 | Free + paid | Newer, less proven |
| Appikon | 4.8★ | ~2,000 | Free + $19.99/mo | Mass email failures, poor support |
| Amp Back in Stock | 4.9★ | ~1,500 | Free + $19/mo | Expensive, reliability issues |
| Swym | 4.6★ | ~800 | Free + $29/mo | Sync delays (hours), bugs |

### Detailed Weakness Analysis (From 1-Star Reviews)

**Notify Me! (Your Primary Target)**
- "100 requests but only 10 notifications/month" = bait and switch
- Klaviyo/Mailchimp integrations locked behind paywall
- Thank-you emails locked
- API access locked
- Import requests locked (can't migrate data)
- Slow iframe-based UI
- "Powered by Notify Me" branding forced on free tier
- Wishlist still in "Beta" despite being a selling point

**Appikon**
- Mass emails completely failed to send
- Support ignored issues for days
- App randomly stopped working for a month

**Swym**
- Inventory sync takes hours, not real-time
- Issues unresolved for 6+ weeks

**Amp**
- "Super expensive"
- Only worked properly for 1 month out of a year
- Unresponsive chat support

---

## Product Strategy

### Positioning Statement
"The reliable back-in-stock app with honest pricing. Notifications = Requests. No gotchas."

### Core Differentiators
1. **Reliability First** - Redundant email infrastructure, real-time sync
2. **Transparent Pricing** - What you see is what you get
3. **Generous Free Tier** - Actually usable for small stores
4. **Fast UI** - Native Shopify, not iframe
5. **Free Integrations** - Klaviyo/Mailchimp on free tier

---

## Feature Roadmap

### MVP (Launch)
| Feature | Priority | Notes |
|---------|----------|-------|
| Notify Me button | Must Have | Product, collection, home pages |
| Email notifications | Must Have | Reliable delivery |
| Variant-level tracking | Must Have | Size/color specific |
| Basic email template editor | Must Have | Subject, body, logo |
| Dashboard with stats | Must Have | Requests, sent, conversions |
| Shopify theme integration | Must Have | One-click install |

### Phase 2 (Month 2-3)
| Feature | Priority | Notes |
|---------|----------|-------|
| SMS notifications | High | Major upsell opportunity |
| Klaviyo integration | High | Free on all plans |
| Mailchimp integration | High | Free on all plans |
| Custom sender email | High | Free on paid plans |
| Import/Export requests | High | Migration from competitors |
| Reminder emails | Medium | "Still in stock" follow-up |

### Phase 3 (Month 4-6)
| Feature | Priority | Notes |
|---------|----------|-------|
| PreOrder functionality | High | Bundled feature |
| Wishlist | High | Bundled feature |
| Low stock alerts | Medium | "Only X left" FOMO |
| WhatsApp notifications | Medium | High open rates |
| Push notifications | Medium | Via web push |
| Omnisend integration | Medium | |
| Multi-language | Medium | Global merchants |

### Phase 4 (Month 6+)
| Feature | Priority | Notes |
|---------|----------|-------|
| API access | Medium | Free on higher tiers |
| Shopify POS | Low | Brick & mortar |
| B2B/Wholesale | Low | Niche market |
| AI demand forecasting | Low | Future differentiator |
| Price drop alerts | Low | Related feature |

---

## Pricing Strategy

### Philosophy
- Undercut on price, over-deliver on value
- Free tier must be genuinely useful (not a trap)
- No hidden limits or confusing metrics

### Proposed Tiers

| Tier | Price | Notifications/mo | Key Features |
|------|-------|------------------|--------------|
| **Free** | $0 | 50 | Email only, basic templates, Klaviyo/Mailchimp |
| **Starter** | $9/mo | 500 | + SMS, custom email sender, priority support |
| **Growth** | $29/mo | 5,000 | + PreOrder, Wishlist, API access, no branding |
| **Scale** | $59/mo | Unlimited | + Dedicated support, custom integrations |

### Why This Beats Competitors

| Metric | Notify Me Free | Your Free | Advantage |
|--------|----------------|-----------|-----------|
| Notifications/mo | 10 | 50 | 5x more |
| Klaviyo | Locked | Included | Free vs $20/mo |
| Mailchimp | Locked | Included | Free vs $20/mo |
| Custom email | Locked | Starter tier | $9 vs $20 |
| API access | Locked | Growth tier | $29 vs $70+ |

---

## Technical Architecture (Recommended)

### Stack
- **Backend:** Node.js or Python (fast development)
- **Database:** PostgreSQL (reliable, scales)
- **Queue:** Redis + Bull (job processing)
- **Email:** SendGrid + Mailgun (redundancy)
- **SMS:** Twilio
- **Hosting:** Vercel/Railway or AWS

### Key Technical Decisions

**1. Real-Time Inventory Sync**
- Use Shopify webhooks: `inventory_levels/update`
- Process immediately, not batch
- This alone beats Swym (hours delay)

**2. Redundant Email Delivery**
- Primary: SendGrid
- Fallback: Mailgun
- If one fails, auto-switch
- This beats Appikon (mass failures)

**3. Native Shopify App (Not Iframe)**
- Use Shopify App Bridge 
- Embedded app with Polaris UI
- Faster than iframe-based competitors

**4. Notification Queue**
- Don't send all at once
- Rate limit to avoid spam filters
- Track delivery status per notification

### Shopify Integration Points
- `products/update` webhook - detect restock
- `inventory_levels/update` webhook - real-time stock
- Theme App Extension - button injection
- Customer data - email collection
- Orders - conversion tracking

---

## Go-To-Market Strategy

### Launch Checklist
- [ ] Shopify App Store listing (SEO optimized)
- [ ] Competitive comparison page on website
- [ ] Migration tool from Notify Me/Appikon
- [ ] "Switch and get 2 months free" promo
- [ ] Case study with beta merchant

### Positioning Against Each Competitor

**vs Notify Me:**
"50 free notifications vs 10. Klaviyo included vs locked. We don't play games with your pricing."

**vs Appikon:**
"Our emails actually send. Every time. Guaranteed."

**vs Swym:**
"Real-time inventory sync. Not hours. Seconds."

**vs STOQ:**
"Same features, better free tier, faster support."

### Review Strategy
- Ask happy merchants for reviews at day 7, 30, 60
- Respond to every review within 24 hours
- Fix issues publicly in review responses

---

## Key Metrics to Track

### Product Metrics
- Notification delivery rate (target: 99.9%)
- Time from restock to notification (target: <60 seconds)
- Email open rate (benchmark: 40-50%)
- Click-through rate (benchmark: 10-15%)
- Conversion rate (benchmark: 5-10%)

### Business Metrics
- Free to paid conversion rate
- Monthly churn rate
- Average revenue per user (ARPU)
- Customer acquisition cost (CAC)
- Lifetime value (LTV)

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Email deliverability issues | Redundant providers, proper SPF/DKIM |
| Shopify API changes | Follow changelog, test beta features |
| Support overwhelm at launch | Self-service docs, chatbot first |
| Competitor price war | Focus on reliability, not just price |
| Large merchant needs | Enterprise tier with SLA |

---

## 90-Day Launch Plan

### Week 1-2: Foundation
- Shopify app setup and authentication
- Database schema design
- Basic webhook handling

### Week 3-4: Core Features
- Notify Me button (Theme App Extension)
- Email collection and storage
- Basic email sending

### Week 5-6: Polish
- Email template editor
- Dashboard with stats
- Variant-level tracking

### Week 7-8: Integrations
- Klaviyo integration
- Mailchimp integration
- SMS via Twilio

### Week 9-10: Testing
- Beta merchants (5-10)
- Load testing
- Edge case handling

### Week 11-12: Launch
- App Store submission
- Marketing site live
- Launch promo campaign

---

## Appendix: Notify Me! Locked Features (Verified)

From live testing on FervoGear store:

| Feature | Status | Unlock At |
|---------|--------|-----------|
| Import requests | Locked | Paid |
| Custom sender email | Locked | Paid |
| 99e14d-17@notify-me.io | Locked | Paid |
| Add Custom Email button | Locked | Paid |
| Shopify contact field | Locked | Paid |
| Privacy policy field | Locked | Paid |
| Show icon on button | Locked | Paid |
| Thank-you message email | Locked | Paid |
| API keys | Locked | Paid |
| Klaviyo integration | Locked | Paid |
| Omnisend integration | Locked | Paid |
| Mailchimp integration | Locked | Paid |
| Shopify Customers integration | Locked | Paid |

**Free tier actual limits:**
- 100 requests (lifetime)
- 10 notifications/month
- 5 PreOrders (lifetime)
- 50 Wishlist actions (lifetime)
- 5 SMS/WhatsApp (lifetime)

---

## Sources

- Live testing: FervoGear Shopify store (April 2026)
- Shopify App Store reviews and ratings
- Competitor websites and documentation
- Merchant forums and communities
