/**
 * VERSION 1: CLEAN MINIMAL
 * Inspired by: Notify Me!, Back in Stock by Appikon
 * Philosophy: Simple, focused, no clutter. Key stats at a glance.
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
  Icon,
  Banner
} from "@shopify/polaris";
import {
  EmailIcon,
  NotificationIcon,
  ChartVerticalFilledIcon,
  CheckCircleIcon
} from "@shopify/polaris-icons";

export default function DashboardV1() {
  // Mock data
  const stats = {
    totalSubscribers: 247,
    pendingNotifications: 18,
    sentThisMonth: 156,
    conversionRate: 12.4
  };

  const recentActivity = [
    { email: "john@example.com", product: "Classic White Tee - M", time: "2 min ago", type: "signup" },
    { email: "sarah@test.com", product: "Vintage Denim Jacket - L", time: "15 min ago", type: "notified" },
    { email: "mike@demo.com", product: "Running Shoes - 10", time: "1 hour ago", type: "purchased" },
    { email: "anna@mail.com", product: "Summer Dress - S", time: "2 hours ago", type: "signup" },
  ];

  return (
    <Page title="Dashboard">
      <BlockStack gap="600">
        {/* Welcome Banner - Show only for new users */}
        <Banner
          title="Welcome to KALRT!"
          tone="success"
          onDismiss={() => {}}
        >
          <p>Your back-in-stock notifications are ready. Add the widget to your theme to start collecting subscribers.</p>
        </Banner>

        {/* Stats Row - Clean and Simple */}
        <Layout>
          <Layout.Section variant="oneQuarter">
            <Card>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <Text variant="bodyMd" tone="subdued">Subscribers</Text>
                  <Icon source={EmailIcon} tone="base" />
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.totalSubscribers}</Text>
                <Text variant="bodySm" tone="success">+12 this week</Text>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneQuarter">
            <Card>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <Text variant="bodyMd" tone="subdued">Waiting</Text>
                  <Icon source={NotificationIcon} tone="base" />
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.pendingNotifications}</Text>
                <Text variant="bodySm" tone="subdued">Ready to notify</Text>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneQuarter">
            <Card>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <Text variant="bodyMd" tone="subdued">Sent</Text>
                  <Icon source={ChartVerticalFilledIcon} tone="base" />
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.sentThisMonth}</Text>
                <Text variant="bodySm" tone="subdued">This month</Text>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneQuarter">
            <Card>
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <Text variant="bodyMd" tone="subdued">Conversions</Text>
                  <Icon source={CheckCircleIcon} tone="base" />
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.conversionRate}%</Text>
                <Text variant="bodySm" tone="success">+2.1% vs last month</Text>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {/* Main Content */}
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <Text variant="headingMd" as="h2">Recent Activity</Text>
                  <Button variant="plain">View all</Button>
                </InlineStack>
                <Divider />
                <BlockStack gap="400">
                  {recentActivity.map((item, i) => (
                    <InlineStack key={i} align="space-between" blockAlign="center">
                      <BlockStack gap="100">
                        <Text variant="bodyMd" fontWeight="semibold">{item.email}</Text>
                        <Text variant="bodySm" tone="subdued">{item.product}</Text>
                      </BlockStack>
                      <InlineStack gap="300" blockAlign="center">
                        <Badge tone={
                          item.type === "signup" ? "info" :
                          item.type === "notified" ? "attention" : "success"
                        }>
                          {item.type === "signup" ? "Signed up" :
                           item.type === "notified" ? "Notified" : "Purchased"}
                        </Badge>
                        <Text variant="bodySm" tone="subdued">{item.time}</Text>
                      </InlineStack>
                    </InlineStack>
                  ))}
                </BlockStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <BlockStack gap="400">
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Quick Actions</Text>
                  <Divider />
                  <Button fullWidth>View Subscribers</Button>
                  <Button fullWidth variant="secondary">Edit Email Template</Button>
                  <Button fullWidth variant="secondary">Customize Widget</Button>
                </BlockStack>
              </Card>

              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Your Plan</Text>
                  <Divider />
                  <InlineStack align="space-between">
                    <Text>Free Plan</Text>
                    <Badge tone="success">Active</Badge>
                  </InlineStack>
                  <Text variant="bodySm" tone="subdued">
                    47 / 50 notifications this month
                  </Text>
                  <Box paddingBlockStart="200">
                    <div style={{
                      background: "#e3e3e3",
                      borderRadius: "4px",
                      height: "8px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        background: "#2c6ecb",
                        width: "94%",
                        height: "100%"
                      }} />
                    </div>
                  </Box>
                  <Button fullWidth variant="primary">Upgrade Plan</Button>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
