/**
 * KALRT Dashboard - Main Home Page
 * Complete overview with all 4 modules, stats, activity feed
 */

import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  InlineGrid,
  Box,
  Divider,
  Badge,
  Button,
  Icon,
  ProgressBar,
  Thumbnail,
  Banner,
  Select,
  Tabs,
  DataTable,
  Link,
  Tooltip,
} from "@shopify/polaris";
import {
  NotificationIcon,
  OrderIcon,
  HeartIcon,
  InventoryIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  EmailIcon,
  MobileIcon,
  ViewIcon,
  CartIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleDateChange = useCallback((value: string) => setDateRange(value), []);
  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);

  // Mock data - comprehensive stats
  const stats = {
    backInStock: {
      requests: 1247,
      requestsTrend: 18.2,
      notifications: 456,
      notificationsTrend: 5.3,
      revenue: 4829,
      revenueTrend: 24.1,
      conversionRate: 12.5,
    },
    preOrder: {
      orders: 89,
      ordersTrend: 12.4,
      revenue: 7845,
      revenueTrend: 31.2,
      pending: 23,
    },
    wishlist: {
      items: 2341,
      itemsTrend: 8.7,
      wishlists: 567,
      conversions: 45,
    },
    lowStock: {
      products: 12,
      alerts: 34,
    },
  };

  // Plan usage
  const planUsage = {
    notifications: { used: 342, limit: 500, percentage: 68 },
    preorders: { used: 89, limit: 500, percentage: 18 },
    wishlist: { used: 1245, limit: 2000, percentage: 62 },
  };

  // Top demanding products
  const topProducts = [
    { name: "Classic White Tee", variant: "Medium", requests: 89, image: "https://placehold.co/40x40/f0f0f0/666?text=1" },
    { name: "Vintage Denim Jacket", variant: "Large", requests: 67, image: "https://placehold.co/40x40/f0f0f0/666?text=2" },
    { name: "Running Shoes Pro", variant: "Size 10", requests: 54, image: "https://placehold.co/40x40/f0f0f0/666?text=3" },
    { name: "Summer Floral Dress", variant: "Small", requests: 43, image: "https://placehold.co/40x40/f0f0f0/666?text=4" },
    { name: "Leather Crossbody Bag", variant: "Black", requests: 38, image: "https://placehold.co/40x40/f0f0f0/666?text=5" },
  ];

  // Recent activity
  const recentActivity = [
    { type: "signup", email: "john@example.com", product: "Classic White Tee - M", time: "2 min ago", channel: "email" },
    { type: "notified", email: "sarah@test.com", product: "Vintage Denim Jacket - L", time: "15 min ago", channel: "email" },
    { type: "purchased", email: "mike@demo.com", product: "Running Shoes Pro - 10", time: "1 hour ago", channel: "sms", revenue: 129 },
    { type: "wishlist", email: "anna@mail.com", product: "Summer Floral Dress - S", time: "2 hours ago", channel: "email" },
    { type: "preorder", email: "chris@shop.com", product: "Limited Edition Sneakers", time: "3 hours ago", channel: "email", revenue: 249 },
    { type: "signup", email: "lisa@store.com", product: "Leather Crossbody Bag", time: "4 hours ago", channel: "sms" },
  ];

  // Chart data for weekly trend
  const chartData = [
    { day: "Mon", signups: 12, notifications: 8, conversions: 2 },
    { day: "Tue", signups: 18, notifications: 14, conversions: 4 },
    { day: "Wed", signups: 15, notifications: 22, conversions: 6 },
    { day: "Thu", signups: 24, notifications: 18, conversions: 5 },
    { day: "Fri", signups: 31, notifications: 25, conversions: 8 },
    { day: "Sat", signups: 28, notifications: 20, conversions: 7 },
    { day: "Sun", signups: 19, notifications: 12, conversions: 3 },
  ];
  const maxValue = Math.max(...chartData.map(d => Math.max(d.signups, d.notifications)));

  const tabs = [
    { id: "all", content: "All Activity" },
    { id: "back-in-stock", content: "Back in Stock" },
    { id: "preorder", content: "PreOrder" },
    { id: "wishlist", content: "Wishlist" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "signup": return NotificationIcon;
      case "notified": return EmailIcon;
      case "purchased": return CartIcon;
      case "wishlist": return HeartIcon;
      case "preorder": return OrderIcon;
      default: return NotificationIcon;
    }
  };

  const getActivityBadge = (type: string) => {
    switch (type) {
      case "signup": return <Badge tone="info">Signed up</Badge>;
      case "notified": return <Badge tone="attention">Notified</Badge>;
      case "purchased": return <Badge tone="success">Purchased</Badge>;
      case "wishlist": return <Badge>Wishlisted</Badge>;
      case "preorder": return <Badge tone="warning">Pre-ordered</Badge>;
      default: return <Badge>{type}</Badge>;
    }
  };

  return (
    <AppLayout>
      <Page
        title="Dashboard"
        subtitle="Welcome back! Here's your store overview."
        secondaryActions={[
          { content: "Export Report" },
          { content: "View Analytics" },
        ]}
      >
        <BlockStack gap="600">
          {/* Date Range Selector */}
          <InlineStack align="end">
            <Select
              label=""
              labelHidden
              options={[
                { label: "Last 7 days", value: "7d" },
                { label: "Last 30 days", value: "30d" },
                { label: "Last 90 days", value: "90d" },
                { label: "This year", value: "year" },
              ]}
              value={dateRange}
              onChange={handleDateChange}
            />
          </InlineStack>

          {/* Module Stats Grid - 4 Modules */}
          <InlineGrid columns={4} gap="400">
            {/* Back in Stock Stats */}
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="200" blockAlign="center">
                    <div style={{
                      padding: 8,
                      borderRadius: 8,
                      background: "rgba(44, 110, 203, 0.1)"
                    }}>
                      <Icon source={NotificationIcon} tone="info" />
                    </div>
                    <Text variant="headingSm" as="h3">Back in Stock</Text>
                  </InlineStack>
                  <Badge tone="success">Active</Badge>
                </InlineStack>
                <Divider />
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Requests</Text>
                    <InlineStack gap="100" blockAlign="center">
                      <Text variant="bodyMd" fontWeight="semibold">{stats.backInStock.requests.toLocaleString()}</Text>
                      <Text variant="bodySm" tone="success">
                        <Icon source={ArrowUpIcon} /> {stats.backInStock.requestsTrend}%
                      </Text>
                    </InlineStack>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Sent</Text>
                    <Text variant="bodyMd" fontWeight="semibold">{stats.backInStock.notifications}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Revenue</Text>
                    <Text variant="bodyMd" fontWeight="semibold" tone="success">${stats.backInStock.revenue.toLocaleString()}</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>

            {/* PreOrder Stats */}
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="200" blockAlign="center">
                    <div style={{
                      padding: 8,
                      borderRadius: 8,
                      background: "rgba(255, 184, 0, 0.1)"
                    }}>
                      <Icon source={OrderIcon} tone="warning" />
                    </div>
                    <Text variant="headingSm" as="h3">PreOrder</Text>
                  </InlineStack>
                  <Badge tone="success">Active</Badge>
                </InlineStack>
                <Divider />
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Orders</Text>
                    <InlineStack gap="100" blockAlign="center">
                      <Text variant="bodyMd" fontWeight="semibold">{stats.preOrder.orders}</Text>
                      <Text variant="bodySm" tone="success">
                        <Icon source={ArrowUpIcon} /> {stats.preOrder.ordersTrend}%
                      </Text>
                    </InlineStack>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Pending</Text>
                    <Text variant="bodyMd" fontWeight="semibold">{stats.preOrder.pending}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Revenue</Text>
                    <Text variant="bodyMd" fontWeight="semibold" tone="success">${stats.preOrder.revenue.toLocaleString()}</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>

            {/* Wishlist Stats */}
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="200" blockAlign="center">
                    <div style={{
                      padding: 8,
                      borderRadius: 8,
                      background: "rgba(233, 69, 96, 0.1)"
                    }}>
                      <Icon source={HeartIcon} tone="critical" />
                    </div>
                    <Text variant="headingSm" as="h3">Wishlist</Text>
                  </InlineStack>
                  <Badge tone="success">Active</Badge>
                </InlineStack>
                <Divider />
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Items</Text>
                    <InlineStack gap="100" blockAlign="center">
                      <Text variant="bodyMd" fontWeight="semibold">{stats.wishlist.items.toLocaleString()}</Text>
                      <Text variant="bodySm" tone="success">
                        <Icon source={ArrowUpIcon} /> {stats.wishlist.itemsTrend}%
                      </Text>
                    </InlineStack>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Wishlists</Text>
                    <Text variant="bodyMd" fontWeight="semibold">{stats.wishlist.wishlists}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Conversions</Text>
                    <Text variant="bodyMd" fontWeight="semibold">{stats.wishlist.conversions}</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>

            {/* Low Stock Stats */}
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="200" blockAlign="center">
                    <div style={{
                      padding: 8,
                      borderRadius: 8,
                      background: "rgba(0, 164, 124, 0.1)"
                    }}>
                      <Icon source={InventoryIcon} tone="success" />
                    </div>
                    <Text variant="headingSm" as="h3">Low Stock</Text>
                  </InlineStack>
                  <Badge tone="success">Active</Badge>
                </InlineStack>
                <Divider />
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Low Products</Text>
                    <Text variant="bodyMd" fontWeight="semibold" tone="warning">{stats.lowStock.products}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Alerts Sent</Text>
                    <Text variant="bodyMd" fontWeight="semibold">{stats.lowStock.alerts}</Text>
                  </InlineStack>
                  <InlineStack align="space-between">
                    <Text variant="bodySm" tone="subdued">Threshold</Text>
                    <Text variant="bodyMd" fontWeight="semibold">5 units</Text>
                  </InlineStack>
                </BlockStack>
              </BlockStack>
            </Card>
          </InlineGrid>

          {/* Main Content Area */}
          <Layout>
            <Layout.Section>
              {/* Weekly Trend Chart */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text variant="headingMd" as="h2">Weekly Trend</Text>
                    <InlineStack gap="400">
                      <InlineStack gap="200" blockAlign="center">
                        <div style={{ width: 12, height: 12, background: "#2c6ecb", borderRadius: 2 }} />
                        <Text variant="bodySm">Signups</Text>
                      </InlineStack>
                      <InlineStack gap="200" blockAlign="center">
                        <div style={{ width: 12, height: 12, background: "#8c6ecb", borderRadius: 2 }} />
                        <Text variant="bodySm">Notifications</Text>
                      </InlineStack>
                      <InlineStack gap="200" blockAlign="center">
                        <div style={{ width: 12, height: 12, background: "#00a47c", borderRadius: 2 }} />
                        <Text variant="bodySm">Conversions</Text>
                      </InlineStack>
                    </InlineStack>
                  </InlineStack>
                  <Divider />
                  <Box paddingBlockStart="400">
                    <InlineStack gap="400" align="space-around">
                      {chartData.map((d, i) => (
                        <BlockStack key={i} gap="200" inlineAlign="center">
                          <div style={{ display: "flex", alignItems: "flex-end", height: 120, gap: 4 }}>
                            <Tooltip content={`${d.signups} signups`}>
                              <div style={{
                                width: 20,
                                height: `${(d.signups / maxValue) * 100}%`,
                                background: "#2c6ecb",
                                borderRadius: "3px 3px 0 0",
                                cursor: "pointer",
                                transition: "opacity 0.2s",
                              }} />
                            </Tooltip>
                            <Tooltip content={`${d.notifications} sent`}>
                              <div style={{
                                width: 20,
                                height: `${(d.notifications / maxValue) * 100}%`,
                                background: "#8c6ecb",
                                borderRadius: "3px 3px 0 0",
                                cursor: "pointer",
                              }} />
                            </Tooltip>
                            <Tooltip content={`${d.conversions} sales`}>
                              <div style={{
                                width: 20,
                                height: `${(d.conversions / maxValue) * 30}%`,
                                background: "#00a47c",
                                borderRadius: "3px 3px 0 0",
                                cursor: "pointer",
                                minHeight: 6,
                              }} />
                            </Tooltip>
                          </div>
                          <Text variant="bodySm" tone="subdued">{d.day}</Text>
                        </BlockStack>
                      ))}
                    </InlineStack>
                  </Box>
                </BlockStack>
              </Card>

              {/* Recent Activity with Tabs */}
              <Box paddingBlockStart="400">
                <Card>
                  <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
                    <Box paddingBlockStart="400">
                      <BlockStack gap="400">
                        {recentActivity.map((item, i) => (
                          <InlineStack key={i} align="space-between" blockAlign="center">
                            <InlineStack gap="400" blockAlign="center">
                              <div style={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                background: "#f6f6f7",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}>
                                <Icon source={getActivityIcon(item.type)} tone="subdued" />
                              </div>
                              <BlockStack gap="100">
                                <Text variant="bodyMd" fontWeight="semibold">{item.email}</Text>
                                <Text variant="bodySm" tone="subdued">{item.product}</Text>
                              </BlockStack>
                            </InlineStack>
                            <InlineStack gap="300" blockAlign="center">
                              {item.revenue && (
                                <Text variant="bodyMd" fontWeight="semibold" tone="success">
                                  +${item.revenue}
                                </Text>
                              )}
                              <Badge tone={item.channel === "sms" ? "attention" : "info"}>
                                {item.channel === "sms" ? "SMS" : "Email"}
                              </Badge>
                              {getActivityBadge(item.type)}
                              <Text variant="bodySm" tone="subdued">{item.time}</Text>
                            </InlineStack>
                          </InlineStack>
                        ))}
                      </BlockStack>
                      <Box paddingBlockStart="400">
                        <InlineStack align="center">
                          <Button variant="plain">View all activity</Button>
                        </InlineStack>
                      </Box>
                    </Box>
                  </Tabs>
                </Card>
              </Box>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              {/* Plan Usage */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text variant="headingMd" as="h2">Plan Usage</Text>
                    <Badge tone="info">Starter</Badge>
                  </InlineStack>
                  <Divider />

                  <BlockStack gap="300">
                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text variant="bodySm">Notifications</Text>
                        <Text variant="bodySm" tone="subdued">
                          {planUsage.notifications.used} / {planUsage.notifications.limit}
                        </Text>
                      </InlineStack>
                      <ProgressBar
                        progress={planUsage.notifications.percentage}
                        tone={planUsage.notifications.percentage > 80 ? "critical" : "primary"}
                        size="small"
                      />
                    </BlockStack>

                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text variant="bodySm">PreOrders</Text>
                        <Text variant="bodySm" tone="subdued">
                          {planUsage.preorders.used} / {planUsage.preorders.limit}
                        </Text>
                      </InlineStack>
                      <ProgressBar progress={planUsage.preorders.percentage} size="small" />
                    </BlockStack>

                    <BlockStack gap="200">
                      <InlineStack align="space-between">
                        <Text variant="bodySm">Wishlist Actions</Text>
                        <Text variant="bodySm" tone="subdued">
                          {planUsage.wishlist.used} / {planUsage.wishlist.limit}
                        </Text>
                      </InlineStack>
                      <ProgressBar progress={planUsage.wishlist.percentage} size="small" />
                    </BlockStack>
                  </BlockStack>

                  <Button fullWidth>Upgrade Plan</Button>
                </BlockStack>
              </Card>

              {/* Top Demanding Products */}
              <Box paddingBlockStart="400">
                <Card>
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingMd" as="h2">Top Demand</Text>
                      <Button variant="plain" size="slim">View all</Button>
                    </InlineStack>
                    <Divider />
                    <BlockStack gap="300">
                      {topProducts.map((product, i) => (
                        <InlineStack key={i} align="space-between" blockAlign="center">
                          <InlineStack gap="300" blockAlign="center">
                            <Text variant="bodySm" tone="subdued">{i + 1}</Text>
                            <Thumbnail source={product.image} alt={product.name} size="small" />
                            <BlockStack gap="050">
                              <Text variant="bodySm" fontWeight="semibold">{product.name}</Text>
                              <Text variant="bodySm" tone="subdued">{product.variant}</Text>
                            </BlockStack>
                          </InlineStack>
                          <Badge tone="info">{product.requests} waiting</Badge>
                        </InlineStack>
                      ))}
                    </BlockStack>
                  </BlockStack>
                </Card>
              </Box>

              {/* Quick Actions */}
              <Box paddingBlockStart="400">
                <Card>
                  <BlockStack gap="400">
                    <Text variant="headingMd" as="h2">Quick Actions</Text>
                    <Divider />
                    <Button fullWidth icon={NotificationIcon}>Send Manual Notification</Button>
                    <Button fullWidth variant="secondary" icon={EmailIcon}>Edit Email Template</Button>
                    <Button fullWidth variant="secondary" icon={ViewIcon}>Preview Widget</Button>
                    <Button fullWidth variant="secondary" icon={InventoryIcon}>Sync Inventory</Button>
                  </BlockStack>
                </Card>
              </Box>
            </Layout.Section>
          </Layout>
        </BlockStack>
      </Page>
    </AppLayout>
  );
}
