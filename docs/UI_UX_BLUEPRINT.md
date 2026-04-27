# KALRT UI/UX Blueprint
*Research-based design guidelines for a top-tier Shopify app experience*

---

## Research Summary

### What Makes Top Shopify Apps Great?

| App | Rating | Reviews | UX Strengths |
|-----|--------|---------|--------------|
| **Judge.me** | 5.0★ | 38,100 | Sensible interface, easy setup, clean design |
| **Loox** | 5.0★ | 22,000+ | Beautiful widgets, seamless integration |
| **Klaviyo** | 4.6★ | 3,000+ | Data-rich, powerful but complex |
| **Privy** | 4.6★ | 25,000+ | Live within minutes, simple dashboards |
| **Gorgias** | 4.6★ | 700+ | Unified inbox, deep Shopify integration |
| **STOQ** | 5.0★ | 2,964 | Clean analytics, multiple features bundled |

### Competitor Weaknesses (Our Opportunity)

| Competitor | UI Problem | KALRT Solution |
|------------|------------|-------------------|
| **Notify Me!** | Slow iframe, cluttered | Native Polaris, fast, clean |
| **Appikon** | Complex setup | One-click install, guided setup |
| **Swym** | Confusing navigation | Simple 4-tab layout |

---

## Design Principles for KALRT

### 1. Native Feel
- Use **Shopify Polaris** components exclusively
- Match Shopify admin patterns exactly
- No custom styling that looks foreign

### 2. Speed First
- Dashboard loads in <2 seconds
- No iframe delays
- Instant navigation between tabs

### 3. Progressive Disclosure
- Show simple view by default
- Advanced options hidden until needed
- Don't overwhelm new users

### 4. Data at a Glance
- Key metrics visible immediately
- Trend indicators (↑↓) for context
- Visual graphs for quick understanding

---

## Dashboard Structure

### Main Navigation (4 Tabs Only)

```
┌─────────────────────────────────────────────────────┐
│  KALRT                                          │
├──────────┬──────────┬──────────┬───────────────────┤
│ 📊 Home  │ 👥 Subs  │ 📧 Emails │ ⚙️ Settings      │
└──────────┴──────────┴──────────┴───────────────────┘
```

**Why 4 tabs?**
- Competitors have 6-8 tabs = confusing
- 4 covers everything: overview, subscribers, notifications, settings
- Matches Shopify's own app patterns

---

## Page Layouts

### 1. Home Dashboard

```
┌─────────────────────────────────────────────────────┐
│  Welcome back! Here's your overview                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐│
│  │ 1,234   │  │   89    │  │  42%    │  │  $2.4K  ││
│  │ Waiting │  │  Sent   │  │ Opened  │  │ Revenue ││
│  │  ↑ 12%  │  │  ↑ 5%   │  │  ↑ 3%   │  │  ↑ 18% ││
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘│
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ 📈 Notifications This Month                     ││
│  │ [============ Graph ================]           ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ 🔥 Top Products Waiting for Restock             ││
│  │ 1. Black T-Shirt (XL) — 234 waiting             ││
│  │ 2. Running Shoes (10) — 189 waiting             ││
│  │ 3. Wireless Earbuds — 156 waiting               ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ 📋 Recent Activity                              ││
│  │ • 12 notifications sent for "Black T-Shirt"    ││
│  │ • 45 new subscribers today                      ││
│  │ • 3 conversions ($127 revenue)                  ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

**Polaris Components Used:**
- `Page` with title
- `Layout` with responsive columns
- `LegacyCard` for metric cards
- `DataTable` for top products
- `List` for activity feed

---

### 2. Subscribers Page

```
┌─────────────────────────────────────────────────────┐
│  Subscribers                        [Export CSV ↓] │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Filters: [All ▼] [Product ▼] [Date ▼] [🔍 Search] │
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ Email          │ Product    │ Status  │ Date   ││
│  ├─────────────────────────────────────────────────┤│
│  │ john@email.com │ T-Shirt XL │ Waiting │ Apr 24 ││
│  │ jane@email.com │ Shoes 10   │ Notified│ Apr 23 ││
│  │ mike@email.com │ Earbuds    │ Bought  │ Apr 22 ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  Showing 1-50 of 1,234        [← 1 2 3 ... 25 →]   │
└─────────────────────────────────────────────────────┘
```

**Polaris Components Used:**
- `IndexTable` for data (sortable, selectable)
- `Filters` for filtering
- `Pagination` for navigation
- `Badge` for status

---

### 3. Notifications Page

```
┌─────────────────────────────────────────────────────┐
│  Notifications                                      │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Tabs: [Sent] [Delivered] [Opened] [Clicked]       │
│                                                     │
│  ┌─────────────────────────────────────────────────┐│
│  │ Recipient      │ Product    │ Status  │ Time   ││
│  ├─────────────────────────────────────────────────┤│
│  │ john@email.com │ T-Shirt XL │ ✅ Opened│ 2h ago ││
│  │ jane@email.com │ Shoes 10   │ 📬 Sent │ 3h ago ││
│  │ mike@email.com │ Earbuds    │ 🛒 Bought│ 1d ago ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

---

### 4. Settings Page

```
┌─────────────────────────────────────────────────────┐
│  Settings                                           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Sections (vertical tabs):                          │
│  ┌──────────────┬──────────────────────────────────┐│
│  │              │                                  ││
│  │ General      │  Sender Name                     ││
│  │ Email        │  [KALRT Alerts         ]    ││
│  │ SMS          │                                  ││
│  │ Branding     │  Reply-to Email                  ││
│  │ Integrations │  [support@store.com        ]    ││
│  │              │                                  ││
│  │              │  [Save Settings]                 ││
│  └──────────────┴──────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

---

## Onboarding Flow

### First-Time Setup (3 Steps Only)

```
Step 1 of 3: Connect Your Store
┌─────────────────────────────────────────────────────┐
│  ✅ Store connected: fervogear.myshopify.com       │
│                                                     │
│  [Continue →]                                       │
└─────────────────────────────────────────────────────┘

Step 2 of 3: Add Notify Button
┌─────────────────────────────────────────────────────┐
│  Add the "Notify Me" button to your theme          │
│                                                     │
│  [Enable Button] ← One-click install               │
│                                                     │
│  Preview: [Image of button on product page]        │
└─────────────────────────────────────────────────────┘

Step 3 of 3: Test It!
┌─────────────────────────────────────────────────────┐
│  Let's make sure everything works                   │
│                                                     │
│  [Send Test Email]                                  │
│                                                     │
│  ✅ Email sent! Check your inbox.                  │
│                                                     │
│  [Go to Dashboard →]                                │
└─────────────────────────────────────────────────────┘
```

**Why 3 steps?**
- Competitors have 5-7 steps = drop-off
- Privy's "live within minutes" is praised
- 3 steps = less than 2 minutes to start

---

## Component Guidelines

### Metric Cards

```jsx
// Use for key stats on dashboard
<LegacyCard sectioned>
  <Text variant="headingLg">1,234</Text>
  <Text color="subdued">Subscribers Waiting</Text>
  <Badge status="success">↑ 12%</Badge>
</LegacyCard>
```

### Status Badges

| Status | Badge Color | Icon |
|--------|-------------|------|
| Waiting | Default (grey) | ⏳ |
| Notified | Info (blue) | 📬 |
| Opened | Attention (yellow) | 👁️ |
| Clicked | Success (green) | ✅ |
| Converted | Success (green) | 🛒 |
| Bounced | Critical (red) | ❌ |

### Empty States

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              📭 No subscribers yet                  │
│                                                     │
│   Once customers sign up for restock alerts,       │
│   they'll appear here.                              │
│                                                     │
│   [View Setup Guide]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Color Palette (Polaris Tokens)

| Use | Token | Color |
|-----|-------|-------|
| Primary actions | `--p-color-bg-fill-brand` | Green |
| Success states | `--p-color-bg-fill-success` | Green |
| Warning states | `--p-color-bg-fill-warning` | Yellow |
| Critical states | `--p-color-bg-fill-critical` | Red |
| Info states | `--p-color-bg-fill-info` | Blue |

**Never use custom colors** — always use Polaris tokens.

---

## Mobile Responsiveness

### Dashboard on Mobile

```
┌─────────────────┐
│  KALRT      │
├─────────────────┤
│ ┌─────┐ ┌─────┐ │
│ │1,234│ │ 89  │ │
│ │Wait │ │Sent │ │
│ └─────┘ └─────┘ │
│ ┌─────┐ ┌─────┐ │
│ │ 42% │ │$2.4K│ │
│ │Open │ │Rev  │ │
│ └─────┘ └─────┘ │
│                 │
│ 🔥 Top Products │
│ ─────────────── │
│ 1. T-Shirt (234)│
│ 2. Shoes (189)  │
│                 │
│ [📊][👥][📧][⚙️]│
└─────────────────┘
```

Polaris handles this automatically with responsive `Layout` components.

---

## Performance Targets

| Metric | Target | Competitor Benchmark |
|--------|--------|---------------------|
| Dashboard load | <2s | Notify Me: 4-5s |
| Page navigation | <500ms | Notify Me: 2-3s |
| Search/filter | <300ms | Most apps: 1s+ |
| Email send | <60s from restock | Swym: hours |

---

## Accessibility

- All Polaris components are WCAG 2.1 compliant
- Keyboard navigation built-in
- Screen reader support included
- Color contrast meets standards

---

## What NOT to Do

| Don't | Do Instead |
|-------|------------|
| Custom fonts | Use Polaris typography |
| Custom colors | Use Polaris tokens |
| iframe embeds | Native App Bridge |
| Complex navigation | 4 simple tabs |
| Walls of settings | Progressive disclosure |
| Tutorial popups | Inline guidance |

---

## References

- [Shopify Polaris Design](https://polaris-react.shopify.com/design)
- [App Design Guidelines](https://shopify.dev/docs/apps/design)
- [Metrics Card Pattern](https://shopify.dev/docs/api/app-home/patterns/compositions/metrics-card)
- [Polaris Components](https://polaris-react.shopify.com/)

---

## Summary: KALRT UX Advantages

| vs Competitors | KALRT |
|----------------|-----------|
| Slow iframe | Native Polaris (2x faster) |
| 6-8 confusing tabs | 4 simple tabs |
| 5-7 step onboarding | 3 steps, <2 minutes |
| Cluttered dashboard | Clean, metrics first |
| Complex settings | Progressive disclosure |
| No mobile design | Fully responsive |

**Goal:** Feel like Shopify built it themselves.
