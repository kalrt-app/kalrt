/**
 * Analytics & Reports Page
 * Comprehensive performance metrics across all modules
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
  Select,
  Tabs,
  ProgressBar,
  DataTable,
  Thumbnail,
} from "@shopify/polaris";
import {
  ChartVerticalFilledIcon,
  ExportIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function Analytics() {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedTab, setSelectedTab] = useState(0);

  const handleDateChange = useCallback((value: string) => setDateRange(value), []);
  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);

  const tabs = [
    { id: "overview", content: "Overview" },
    { id: "back-in-stock", content: "Back in Stock" },
    { id: "preorder", content: "PreOrder" },
    { id: "wishlist", content: "Wishlist" },
    { id: "email", content: "Email Performance" },
  ];

  // Mock analytics data
  const overviewStats = {
    totalRevenue: 12847,
    revenueTrend: 24.3,
    totalNotifications: 1892,
    notificationsTrend: 18.2,
    conversionRate: 12.5,
    conversionTrend: 2.1,
    avgOrderValue: 87.50,
    aovTrend: 8.4,
  };

  const emailStats = {
    sent: 1892,
    delivered: 1845,
    deliveryRate: 97.5,
    opened: 1247,
    openRate: 67.6,
    clicked: 534,
    clickRate: 28.9,
    converted: 89,
    conversionRate: 12.5,
  };

  // Back in Stock specific stats
  const bisStats = {
    totalRequests: 1247,
    requestsTrend: 18.2,
    waiting: 892,
    notified: 298,
    converted: 57,
    conversionRate: 19.1,
    revenue: 4829,
    avgTimeToNotify: "47 seconds",
  };

  // PreOrder specific stats
  const preorderStats = {
    totalOrders: 89,
    ordersTrend: 12.4,
    revenue: 7845,
    revenueTrend: 31.2,
    pendingPayments: 23,
    pendingAmount: 2150,
    avgOrderValue: 88.15,
    fulfillmentRate: 94.2,
  };

  // Wishlist specific stats
  const wishlistStats = {
    totalWishlists: 567,
    wishlistsTrend: 8.7,
    totalItems: 2341,
    itemsTrend: 15.3,
    conversions: 45,
    conversionRate: 7.9,
    revenue: 3892,
    avgItemsPerList: 4.1,
  };

  const channelData = [
    ["Email", "1,456", "68.2%", "12.3%", "$8,234"],
    ["SMS", "312", "94.1%", "18.7%", "$3,421"],
    ["Push", "124", "45.2%", "8.1%", "$1,192"],
  ];

  const topProducts = [
    ["Classic White Tee - Medium", "234", "28", "$2,156", "12.0%"],
    ["Vintage Denim Jacket - Large", "189", "21", "$2,079", "11.1%"],
    ["Running Shoes Pro - Size 10", "156", "19", "$1,862", "12.2%"],
    ["Summer Floral Dress - Small", "134", "15", "$1,035", "11.2%"],
    ["Leather Crossbody Bag - Black", "98", "11", "$1,309", "11.2%"],
  ];

  const bisTopProducts = [
    ["Classic White Tee", "89", "67", "12", "$468", "17.9%"],
    ["Vintage Denim Jacket", "67", "45", "8", "$792", "17.8%"],
    ["Running Shoes Pro", "54", "32", "6", "$774", "18.8%"],
    ["Summer Floral Dress", "43", "38", "5", "$345", "13.2%"],
    ["Leather Crossbody Bag", "38", "25", "4", "$476", "16.0%"],
  ];

  const preorderTopProducts = [
    ["Limited Edition Sneakers", "34", "$8,466", "May 15", "Full"],
    ["Designer Handbag", "18", "$3,582", "May 20", "Deposit 25%"],
    ["Smart Watch Pro", "12", "$4,788", "May 10", "Full"],
    ["Gaming Console", "8", "$3,992", "Jun 1", "Full"],
    ["Camera Kit", "6", "$5,394", "Jun 15", "Deposit 33%"],
  ];

  const wishlistTopProducts = [
    ["Classic White Tee", "89", "156", "34", "12", "$468"],
    ["Vintage Denim Jacket", "67", "112", "28", "8", "$792"],
    ["Running Shoes Pro", "54", "89", "18", "6", "$774"],
    ["Summer Floral Dress", "43", "67", "12", "5", "$345"],
    ["Leather Crossbody Bag", "38", "52", "8", "4", "$476"],
  ];

  const weeklyData = [
    { week: "Week 1", requests: 312, notifications: 89, conversions: 12, revenue: 1456 },
    { week: "Week 2", requests: 398, notifications: 112, conversions: 15, revenue: 1823 },
    { week: "Week 3", requests: 456, notifications: 134, conversions: 18, revenue: 2134 },
    { week: "Week 4", requests: 521, notifications: 156, conversions: 22, revenue: 2567 },
  ];

  const maxRequests = Math.max(...weeklyData.map(d => d.requests));

  return (
    <AppLayout>
      <Page
        title="Analytics & Reports"
        subtitle="Track performance across all modules"
        primaryAction={{
          content: "Export Report",
          icon: ExportIcon,
        }}
        secondaryActions={[
          { content: "Schedule Report" },
          { content: "Custom Report" },
        ]}
      >
        <BlockStack gap="600">
          {/* Date Range & Filters */}
          <InlineStack align="space-between">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
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

          {/* Tab 0: Overview */}
          {selectedTab === 0 && (
            <>
              <InlineGrid columns={4} gap="400">
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Total Revenue</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">${overviewStats.totalRevenue.toLocaleString()}</Text>
                      <Badge tone="success">+{overviewStats.revenueTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">From all notification conversions</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Total Notifications</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">{overviewStats.totalNotifications.toLocaleString()}</Text>
                      <Badge tone="success">+{overviewStats.notificationsTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">Email, SMS & Push combined</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Conversion Rate</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">{overviewStats.conversionRate}%</Text>
                      <Badge tone="success">+{overviewStats.conversionTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">Notification to purchase</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Avg Order Value</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">${overviewStats.avgOrderValue}</Text>
                      <Badge tone="success">+{overviewStats.aovTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">From notification sales</Text>
                  </BlockStack>
                </Card>
              </InlineGrid>

              {/* Weekly Trend Chart */}
              <Card>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text variant="headingMd" as="h2">Weekly Performance</Text>
                    <InlineStack gap="400">
                      <InlineStack gap="200" blockAlign="center">
                        <div style={{ width: 12, height: 12, background: "#2c6ecb", borderRadius: 2 }} />
                        <Text variant="bodySm">Requests</Text>
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
                    <InlineStack gap="600" align="space-around">
                      {weeklyData.map((d, i) => (
                        <BlockStack key={i} gap="200" inlineAlign="center">
                          <div style={{ display: "flex", alignItems: "flex-end", height: 150, gap: 6 }}>
                            <div style={{
                              width: 24,
                              height: `${(d.requests / maxRequests) * 100}%`,
                              background: "#2c6ecb",
                              borderRadius: "4px 4px 0 0",
                            }} />
                            <div style={{
                              width: 24,
                              height: `${(d.notifications / maxRequests) * 100}%`,
                              background: "#8c6ecb",
                              borderRadius: "4px 4px 0 0",
                            }} />
                            <div style={{
                              width: 24,
                              height: `${(d.conversions / maxRequests) * 30}%`,
                              background: "#00a47c",
                              borderRadius: "4px 4px 0 0",
                              minHeight: 8,
                            }} />
                          </div>
                          <Text variant="bodySm" tone="subdued">{d.week}</Text>
                          <Text variant="bodySm" fontWeight="semibold" tone="success">${d.revenue}</Text>
                        </BlockStack>
                      ))}
                    </InlineStack>
                  </Box>
                </BlockStack>
              </Card>

              <Layout>
                <Layout.Section>
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Channel Performance</Text>
                      <Divider />
                      <DataTable
                        columnContentTypes={["text", "numeric", "numeric", "numeric", "numeric"]}
                        headings={["Channel", "Sent", "Open Rate", "Conversion", "Revenue"]}
                        rows={channelData}
                      />
                    </BlockStack>
                  </Card>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">This Month</Text>
                      <Divider />
                      <BlockStack gap="300">
                        <InlineStack align="space-between">
                          <Text variant="bodySm">New subscribers</Text>
                          <Text variant="bodyMd" fontWeight="semibold">+892</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Restocked products</Text>
                          <Text variant="bodyMd" fontWeight="semibold">34</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">PreOrders placed</Text>
                          <Text variant="bodyMd" fontWeight="semibold">89</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Wishlist items added</Text>
                          <Text variant="bodyMd" fontWeight="semibold">567</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Low stock alerts shown</Text>
                          <Text variant="bodyMd" fontWeight="semibold">1,234</Text>
                        </InlineStack>
                      </BlockStack>
                    </BlockStack>
                  </Card>
                </Layout.Section>
              </Layout>
            </>
          )}

          {/* Tab 1: Back in Stock */}
          {selectedTab === 1 && (
            <>
              <InlineGrid columns={4} gap="400">
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Total Requests</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">{bisStats.totalRequests.toLocaleString()}</Text>
                      <Badge tone="success">+{bisStats.requestsTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">Lifetime signups</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Waiting</Text>
                    <Text variant="heading2xl" as="h3">{bisStats.waiting}</Text>
                    <Text variant="bodySm" tone="subdued">Ready to notify</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Notified → Purchased</Text>
                    <Text variant="heading2xl" as="h3">{bisStats.converted}</Text>
                    <InlineStack gap="100">
                      <Badge tone="success">{bisStats.conversionRate}% rate</Badge>
                    </InlineStack>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Revenue Recovered</Text>
                    <Text variant="heading2xl" as="h3">${bisStats.revenue.toLocaleString()}</Text>
                    <Text variant="bodySm" tone="subdued">From restock notifications</Text>
                  </BlockStack>
                </Card>
              </InlineGrid>

              <Layout>
                <Layout.Section>
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Request Funnel</Text>
                      <Divider />
                      <BlockStack gap="300">
                        <InlineStack align="space-between" blockAlign="center">
                          <Text variant="bodySm">Total Requests</Text>
                          <InlineStack gap="200" blockAlign="center">
                            <div style={{ width: 300, height: 24, background: "#2c6ecb", borderRadius: 4 }} />
                            <Text fontWeight="semibold">1,247</Text>
                          </InlineStack>
                        </InlineStack>
                        <InlineStack align="space-between" blockAlign="center">
                          <Text variant="bodySm">Notified</Text>
                          <InlineStack gap="200" blockAlign="center">
                            <div style={{ width: 180, height: 24, background: "#8c6ecb", borderRadius: 4 }} />
                            <Text fontWeight="semibold">298</Text>
                          </InlineStack>
                        </InlineStack>
                        <InlineStack align="space-between" blockAlign="center">
                          <Text variant="bodySm">Clicked</Text>
                          <InlineStack gap="200" blockAlign="center">
                            <div style={{ width: 90, height: 24, background: "#00a47c", borderRadius: 4 }} />
                            <Text fontWeight="semibold">126</Text>
                          </InlineStack>
                        </InlineStack>
                        <InlineStack align="space-between" blockAlign="center">
                          <Text variant="bodySm">Purchased</Text>
                          <InlineStack gap="200" blockAlign="center">
                            <div style={{ width: 45, height: 24, background: "#e94560", borderRadius: 4 }} />
                            <Text fontWeight="semibold">57</Text>
                          </InlineStack>
                        </InlineStack>
                      </BlockStack>
                    </BlockStack>
                  </Card>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Performance</Text>
                      <Divider />
                      <BlockStack gap="300">
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Avg time to notify</Text>
                          <Badge tone="success">{bisStats.avgTimeToNotify}</Badge>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Email open rate</Text>
                          <Text fontWeight="semibold">69.6%</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Click-through rate</Text>
                          <Text fontWeight="semibold">42.2%</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">SMS delivery rate</Text>
                          <Text fontWeight="semibold">98.4%</Text>
                        </InlineStack>
                      </BlockStack>
                    </BlockStack>
                  </Card>
                </Layout.Section>
              </Layout>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Top Products by Demand</Text>
                  <Divider />
                  <DataTable
                    columnContentTypes={["text", "numeric", "numeric", "numeric", "numeric", "numeric"]}
                    headings={["Product", "Requests", "Waiting", "Converted", "Revenue", "Conv. Rate"]}
                    rows={bisTopProducts}
                  />
                </BlockStack>
              </Card>
            </>
          )}

          {/* Tab 2: PreOrder */}
          {selectedTab === 2 && (
            <>
              <InlineGrid columns={4} gap="400">
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Total Orders</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">{preorderStats.totalOrders}</Text>
                      <Badge tone="success">+{preorderStats.ordersTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">This period</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Revenue</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">${preorderStats.revenue.toLocaleString()}</Text>
                      <Badge tone="success">+{preorderStats.revenueTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">Collected payments</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Pending Payments</Text>
                    <Text variant="heading2xl" as="h3">{preorderStats.pendingPayments}</Text>
                    <Text variant="bodySm" tone="subdued">${preorderStats.pendingAmount.toLocaleString()} remaining</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Avg Order Value</Text>
                    <Text variant="heading2xl" as="h3">${preorderStats.avgOrderValue}</Text>
                    <Text variant="bodySm" tone="subdued">Per preorder</Text>
                  </BlockStack>
                </Card>
              </InlineGrid>

              <Layout>
                <Layout.Section>
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Order Status Breakdown</Text>
                      <Divider />
                      <InlineGrid columns={4} gap="400">
                        <BlockStack gap="200" inlineAlign="center">
                          <Text variant="heading2xl">66</Text>
                          <Badge tone="success">Paid in Full</Badge>
                        </BlockStack>
                        <BlockStack gap="200" inlineAlign="center">
                          <Text variant="heading2xl">15</Text>
                          <Badge tone="attention">Deposit Paid</Badge>
                        </BlockStack>
                        <BlockStack gap="200" inlineAlign="center">
                          <Text variant="heading2xl">5</Text>
                          <Badge tone="info">Shipped</Badge>
                        </BlockStack>
                        <BlockStack gap="200" inlineAlign="center">
                          <Text variant="heading2xl">3</Text>
                          <Badge tone="critical">Cancelled</Badge>
                        </BlockStack>
                      </InlineGrid>
                    </BlockStack>
                  </Card>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Fulfillment</Text>
                      <Divider />
                      <BlockStack gap="300">
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Fulfillment rate</Text>
                          <Badge tone="success">{preorderStats.fulfillmentRate}%</Badge>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">On-time delivery</Text>
                          <Text fontWeight="semibold">91.2%</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Avg days to ship</Text>
                          <Text fontWeight="semibold">18 days</Text>
                        </InlineStack>
                      </BlockStack>
                    </BlockStack>
                  </Card>
                </Layout.Section>
              </Layout>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Top PreOrder Products</Text>
                  <Divider />
                  <DataTable
                    columnContentTypes={["text", "numeric", "numeric", "text", "text"]}
                    headings={["Product", "Orders", "Revenue", "Available Date", "Payment Type"]}
                    rows={preorderTopProducts}
                  />
                </BlockStack>
              </Card>
            </>
          )}

          {/* Tab 3: Wishlist */}
          {selectedTab === 3 && (
            <>
              <InlineGrid columns={4} gap="400">
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Total Wishlists</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">{wishlistStats.totalWishlists}</Text>
                      <Badge tone="success">+{wishlistStats.wishlistsTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">Active customer lists</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Items Saved</Text>
                    <InlineStack align="space-between" blockAlign="end">
                      <Text variant="heading2xl" as="h3">{wishlistStats.totalItems.toLocaleString()}</Text>
                      <Badge tone="success">+{wishlistStats.itemsTrend}%</Badge>
                    </InlineStack>
                    <Text variant="bodySm" tone="subdued">Avg {wishlistStats.avgItemsPerList} per list</Text>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Conversions</Text>
                    <Text variant="heading2xl" as="h3">{wishlistStats.conversions}</Text>
                    <InlineStack gap="100">
                      <Badge tone="success">{wishlistStats.conversionRate}% rate</Badge>
                    </InlineStack>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Revenue</Text>
                    <Text variant="heading2xl" as="h3">${wishlistStats.revenue.toLocaleString()}</Text>
                    <Text variant="bodySm" tone="subdued">From wishlist purchases</Text>
                  </BlockStack>
                </Card>
              </InlineGrid>

              <Layout>
                <Layout.Section>
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Wishlist Engagement</Text>
                      <Divider />
                      <InlineGrid columns={3} gap="400">
                        <BlockStack gap="200">
                          <Text variant="bodySm" tone="subdued">Guest vs Logged In</Text>
                          <InlineStack gap="200">
                            <div style={{ flex: 1 }}>
                              <ProgressBar progress={35} tone="success" size="small" />
                              <Text variant="bodySm">35% Guest</Text>
                            </div>
                            <div style={{ flex: 1 }}>
                              <ProgressBar progress={65} tone="highlight" size="small" />
                              <Text variant="bodySm">65% Logged In</Text>
                            </div>
                          </InlineStack>
                        </BlockStack>
                        <BlockStack gap="200">
                          <Text variant="bodySm" tone="subdued">Shared Lists</Text>
                          <Text variant="headingLg">89</Text>
                          <Text variant="bodySm" tone="subdued">15.7% share rate</Text>
                        </BlockStack>
                        <BlockStack gap="200">
                          <Text variant="bodySm" tone="subdued">Reminder Clicks</Text>
                          <Text variant="headingLg">234</Text>
                          <Text variant="bodySm" tone="subdued">28% click rate</Text>
                        </BlockStack>
                      </InlineGrid>
                    </BlockStack>
                  </Card>
                </Layout.Section>
                <Layout.Section variant="oneThird">
                  <Card>
                    <BlockStack gap="400">
                      <Text variant="headingMd" as="h2">Reminders Sent</Text>
                      <Divider />
                      <BlockStack gap="300">
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Price drop alerts</Text>
                          <Text fontWeight="semibold">45</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Low stock alerts</Text>
                          <Text fontWeight="semibold">23</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Back in stock</Text>
                          <Text fontWeight="semibold">67</Text>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text variant="bodySm">Weekly reminders</Text>
                          <Text fontWeight="semibold">120</Text>
                        </InlineStack>
                      </BlockStack>
                    </BlockStack>
                  </Card>
                </Layout.Section>
              </Layout>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Most Wishlisted Products</Text>
                  <Divider />
                  <DataTable
                    columnContentTypes={["text", "numeric", "numeric", "numeric", "numeric", "numeric"]}
                    headings={["Product", "In Wishlists", "Adds", "Removes", "Purchases", "Revenue"]}
                    rows={wishlistTopProducts}
                  />
                </BlockStack>
              </Card>
            </>
          )}

          {/* Tab 4: Email Performance */}
          {selectedTab === 4 && (
            <>
              <InlineGrid columns={4} gap="400">
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Emails Sent</Text>
                    <Text variant="heading2xl" as="h3">{emailStats.sent.toLocaleString()}</Text>
                    <InlineStack gap="100">
                      <Text variant="bodySm" tone="success">{emailStats.deliveryRate}% delivered</Text>
                    </InlineStack>
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Open Rate</Text>
                    <Text variant="heading2xl" as="h3">{emailStats.openRate}%</Text>
                    <ProgressBar progress={emailStats.openRate} tone="success" size="small" />
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Click Rate</Text>
                    <Text variant="heading2xl" as="h3">{emailStats.clickRate}%</Text>
                    <ProgressBar progress={emailStats.clickRate} tone="highlight" size="small" />
                  </BlockStack>
                </Card>
                <Card>
                  <BlockStack gap="200">
                    <Text variant="bodySm" tone="subdued">Conversion Rate</Text>
                    <Text variant="heading2xl" as="h3">{emailStats.conversionRate}%</Text>
                    <ProgressBar progress={emailStats.conversionRate} size="small" />
                  </BlockStack>
                </Card>
              </InlineGrid>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Email Funnel</Text>
                  <Divider />
                  <Box paddingBlockStart="200">
                    <BlockStack gap="300">
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="300" blockAlign="center">
                          <div style={{ width: 120 }}><Text variant="bodySm">Sent</Text></div>
                          <div style={{ width: 400, background: "rgba(44, 110, 203, 0.2)", borderRadius: 4 }}>
                            <div style={{ width: "100%", height: 32, background: "#2c6ecb", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                              <Text variant="bodySm" fontWeight="semibold">{emailStats.sent}</Text>
                            </div>
                          </div>
                        </InlineStack>
                        <Text variant="bodySm" tone="subdued">100%</Text>
                      </InlineStack>
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="300" blockAlign="center">
                          <div style={{ width: 120 }}><Text variant="bodySm">Delivered</Text></div>
                          <div style={{ width: 400, background: "rgba(44, 110, 203, 0.2)", borderRadius: 4 }}>
                            <div style={{ width: `${emailStats.deliveryRate}%`, height: 32, background: "#2c6ecb", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                              <Text variant="bodySm" fontWeight="semibold">{emailStats.delivered}</Text>
                            </div>
                          </div>
                        </InlineStack>
                        <Text variant="bodySm" tone="subdued">{emailStats.deliveryRate}%</Text>
                      </InlineStack>
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="300" blockAlign="center">
                          <div style={{ width: 120 }}><Text variant="bodySm">Opened</Text></div>
                          <div style={{ width: 400, background: "rgba(44, 110, 203, 0.2)", borderRadius: 4 }}>
                            <div style={{ width: `${emailStats.openRate}%`, height: 32, background: "#8c6ecb", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                              <Text variant="bodySm" fontWeight="semibold">{emailStats.opened}</Text>
                            </div>
                          </div>
                        </InlineStack>
                        <Text variant="bodySm" tone="subdued">{emailStats.openRate}%</Text>
                      </InlineStack>
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="300" blockAlign="center">
                          <div style={{ width: 120 }}><Text variant="bodySm">Clicked</Text></div>
                          <div style={{ width: 400, background: "rgba(44, 110, 203, 0.2)", borderRadius: 4 }}>
                            <div style={{ width: `${emailStats.clickRate}%`, height: 32, background: "#00a47c", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                              <Text variant="bodySm" fontWeight="semibold">{emailStats.clicked}</Text>
                            </div>
                          </div>
                        </InlineStack>
                        <Text variant="bodySm" tone="subdued">{emailStats.clickRate}%</Text>
                      </InlineStack>
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="300" blockAlign="center">
                          <div style={{ width: 120 }}><Text variant="bodySm">Converted</Text></div>
                          <div style={{ width: 400, background: "rgba(44, 110, 203, 0.2)", borderRadius: 4 }}>
                            <div style={{ width: `${emailStats.conversionRate}%`, height: 32, background: "#e94560", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 12 }}>
                              <Text variant="bodySm" fontWeight="semibold">{emailStats.converted}</Text>
                            </div>
                          </div>
                        </InlineStack>
                        <Text variant="bodySm" tone="subdued">{emailStats.conversionRate}%</Text>
                      </InlineStack>
                    </BlockStack>
                  </Box>
                </BlockStack>
              </Card>
            </>
          )}

          {/* Top Products - Show on all tabs except email */}
          {selectedTab !== 4 && selectedTab !== 1 && selectedTab !== 2 && selectedTab !== 3 && (
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingMd" as="h2">Top Converting Products</Text>
                  <Button variant="plain">View all</Button>
                </InlineStack>
                <Divider />
                <DataTable
                  columnContentTypes={["text", "numeric", "numeric", "numeric", "numeric"]}
                  headings={["Product", "Requests", "Conversions", "Revenue", "Conv. Rate"]}
                  rows={topProducts}
                />
              </BlockStack>
            </Card>
          )}
        </BlockStack>
      </Page>
    </AppLayout>
  );
}
