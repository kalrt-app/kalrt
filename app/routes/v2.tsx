/**
 * VERSION 2: DATA-RICH ANALYTICS
 * Inspired by: STOQ, Back in Stock Restock Alerts
 * Philosophy: Comprehensive data, charts, detailed insights for power users.
 */

import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  InlineStack,
  Box,
  Divider,
  Badge,
  Button,
  Tabs,
  DataTable,
  ProgressBar,
  Select
} from "@shopify/polaris";
import { useState } from "react";

export default function DashboardV2() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState("7d");

  const tabs = [
    { id: "overview", content: "Overview" },
    { id: "products", content: "Top Products" },
    { id: "performance", content: "Performance" },
  ];

  // Mock data
  const topProducts = [
    ["Classic White Tee - M", "89", "34", "12", "35%"],
    ["Vintage Denim Jacket - L", "67", "28", "8", "29%"],
    ["Running Shoes - Size 10", "54", "21", "6", "29%"],
    ["Summer Dress - S", "43", "15", "4", "27%"],
    ["Leather Wallet", "38", "12", "3", "25%"],
  ];

  const chartData = [
    { day: "Mon", signups: 12, notifications: 8, conversions: 2 },
    { day: "Tue", signups: 18, notifications: 14, conversions: 4 },
    { day: "Wed", signups: 15, notifications: 22, conversions: 6 },
    { day: "Thu", signups: 24, notifications: 18, conversions: 5 },
    { day: "Fri", signups: 31, notifications: 25, conversions: 8 },
    { day: "Sat", signups: 28, notifications: 20, conversions: 7 },
    { day: "Sun", signups: 19, notifications: 12, conversions: 3 },
  ];

  const maxSignups = Math.max(...chartData.map(d => d.signups));

  return (
    <Page
      title="Analytics Dashboard"
      primaryAction={{ content: "Export Report", disabled: false }}
      secondaryActions={[
        { content: "Settings" },
        { content: "Help" },
      ]}
    >
      <BlockStack gap="600">
        {/* Date Range Selector */}
        <InlineStack align="end">
          <Select
            label=""
            options={[
              { label: "Last 7 days", value: "7d" },
              { label: "Last 30 days", value: "30d" },
              { label: "Last 90 days", value: "90d" },
              { label: "This year", value: "year" },
            ]}
            value={dateRange}
            onChange={setDateRange}
          />
        </InlineStack>

        {/* Key Metrics - Detailed */}
        <Layout>
          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingSm" tone="subdued">TOTAL SUBSCRIBERS</Text>
                <InlineStack align="space-between" blockAlign="end">
                  <Text variant="heading2xl" as="h3">1,247</Text>
                  <Badge tone="success">+18.2%</Badge>
                </InlineStack>
                <Divider />
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Active</Text>
                  <Text variant="bodySm">892</Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Notified</Text>
                  <Text variant="bodySm">298</Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Converted</Text>
                  <Text variant="bodySm">57</Text>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingSm" tone="subdued">NOTIFICATIONS SENT</Text>
                <InlineStack align="space-between" blockAlign="end">
                  <Text variant="heading2xl" as="h3">456</Text>
                  <Badge tone="attention">+5.3%</Badge>
                </InlineStack>
                <Divider />
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Delivered</Text>
                  <Text variant="bodySm">448 (98.2%)</Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Opened</Text>
                  <Text variant="bodySm">312 (69.6%)</Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Clicked</Text>
                  <Text variant="bodySm">189 (42.2%)</Text>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <Card>
              <BlockStack gap="400">
                <Text variant="headingSm" tone="subdued">REVENUE RECOVERED</Text>
                <InlineStack align="space-between" blockAlign="end">
                  <Text variant="heading2xl" as="h3">$4,829</Text>
                  <Badge tone="success">+24.1%</Badge>
                </InlineStack>
                <Divider />
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Orders</Text>
                  <Text variant="bodySm">57</Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Avg Order Value</Text>
                  <Text variant="bodySm">$84.72</Text>
                </InlineStack>
                <InlineStack align="space-between">
                  <Text variant="bodySm" tone="subdued">Conversion Rate</Text>
                  <Text variant="bodySm">12.5%</Text>
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Chart Section */}
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

            {/* Simple Bar Chart */}
            <Box paddingBlockStart="400">
              <InlineStack gap="400" align="space-around">
                {chartData.map((d, i) => (
                  <BlockStack key={i} gap="200" inlineAlign="center">
                    <div style={{ display: "flex", alignItems: "flex-end", height: 120, gap: 4 }}>
                      <div style={{
                        width: 16,
                        height: `${(d.signups / maxSignups) * 100}%`,
                        background: "#2c6ecb",
                        borderRadius: "2px 2px 0 0"
                      }} />
                      <div style={{
                        width: 16,
                        height: `${(d.notifications / maxSignups) * 100}%`,
                        background: "#8c6ecb",
                        borderRadius: "2px 2px 0 0"
                      }} />
                      <div style={{
                        width: 16,
                        height: `${(d.conversions / maxSignups) * 8}%`,
                        background: "#00a47c",
                        borderRadius: "2px 2px 0 0",
                        minHeight: 4
                      }} />
                    </div>
                    <Text variant="bodySm" tone="subdued">{d.day}</Text>
                  </BlockStack>
                ))}
              </InlineStack>
            </Box>
          </BlockStack>
        </Card>

        {/* Tabs Content */}
        <Card>
          <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
            <Box paddingBlockStart="400">
              {selectedTab === 0 && (
                <Text>Overview content here...</Text>
              )}
              {selectedTab === 1 && (
                <DataTable
                  columnContentTypes={["text", "numeric", "numeric", "numeric", "numeric"]}
                  headings={["Product", "Subscribers", "Notified", "Converted", "Rate"]}
                  rows={topProducts}
                />
              )}
              {selectedTab === 2 && (
                <BlockStack gap="400">
                  <Text variant="headingSm">Email Performance</Text>
                  <InlineStack align="space-between">
                    <Text variant="bodySm">Delivery Rate</Text>
                    <Text variant="bodySm">98.2%</Text>
                  </InlineStack>
                  <ProgressBar progress={98} tone="success" />

                  <InlineStack align="space-between">
                    <Text variant="bodySm">Open Rate</Text>
                    <Text variant="bodySm">69.6%</Text>
                  </InlineStack>
                  <ProgressBar progress={70} tone="success" />

                  <InlineStack align="space-between">
                    <Text variant="bodySm">Click Rate</Text>
                    <Text variant="bodySm">42.2%</Text>
                  </InlineStack>
                  <ProgressBar progress={42} tone="highlight" />

                  <InlineStack align="space-between">
                    <Text variant="bodySm">Conversion Rate</Text>
                    <Text variant="bodySm">12.5%</Text>
                  </InlineStack>
                  <ProgressBar progress={12} tone="primary" />
                </BlockStack>
              )}
            </Box>
          </Tabs>
        </Card>
      </BlockStack>
    </Page>
  );
}
