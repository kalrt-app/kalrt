/**
 * VERSION 3: ACTION-FOCUSED ONBOARDING
 * Inspired by: Modern SaaS apps, Shopify's own app patterns
 * Philosophy: Guide users to success. Big CTAs, clear next steps, gamified progress.
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
  Banner
} from "@shopify/polaris";
import {
  CheckCircleIcon,
  CircleTickMinor,
  EmailIcon,
  SettingsIcon,
  ThemeIcon,
  ViewIcon
} from "@shopify/polaris-icons";

export default function DashboardV3() {
  // Onboarding state
  const setupSteps = [
    { id: 1, title: "Install app", done: true },
    { id: 2, title: "Add widget to theme", done: true },
    { id: 3, title: "Customize email template", done: false },
    { id: 4, title: "Get your first subscriber", done: false },
  ];

  const completedSteps = setupSteps.filter(s => s.done).length;
  const progressPercent = (completedSteps / setupSteps.length) * 100;

  // Mock data
  const stats = {
    subscribers: 0,
    notifications: 0,
    revenue: "$0"
  };

  const pendingProducts = [
    { title: "Classic White Tee", variant: "Medium", image: null, subscribers: 12 },
    { title: "Vintage Denim Jacket", variant: "Large", image: null, subscribers: 8 },
    { title: "Running Shoes", variant: "Size 10", image: null, subscribers: 5 },
  ];

  return (
    <Page title="Welcome to KALRT">
      <BlockStack gap="800">
        {/* Hero Section - Setup Progress */}
        <Card>
          <Box padding="600" background="bg-surface-secondary">
            <BlockStack gap="600">
              <InlineStack align="space-between" blockAlign="start">
                <BlockStack gap="200">
                  <Text variant="headingLg" as="h2">Complete your setup</Text>
                  <Text variant="bodyMd" tone="subdued">
                    You're {completedSteps} of {setupSteps.length} steps away from capturing lost sales
                  </Text>
                </BlockStack>
                <Box>
                  <div style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background: `conic-gradient(#2c6ecb ${progressPercent}%, #e3e3e3 0)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <Text variant="headingMd">{completedSteps}/{setupSteps.length}</Text>
                    </div>
                  </div>
                </Box>
              </InlineStack>

              <Divider />

              <InlineGrid columns={4} gap="400">
                {setupSteps.map((step) => (
                  <Box
                    key={step.id}
                    padding="400"
                    background={step.done ? "bg-surface-success" : "bg-surface"}
                    borderRadius="200"
                    borderWidth="025"
                    borderColor="border"
                  >
                    <InlineStack gap="300" blockAlign="center">
                      {step.done ? (
                        <div style={{ color: "#00a47c" }}>
                          <Icon source={CheckCircleIcon} />
                        </div>
                      ) : (
                        <div style={{
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          border: "2px solid #8c9196",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        }}>
                          <Text variant="bodySm">{step.id}</Text>
                        </div>
                      )}
                      <Text variant="bodySm" fontWeight={step.done ? "regular" : "semibold"}>
                        {step.title}
                      </Text>
                    </InlineStack>
                  </Box>
                ))}
              </InlineGrid>

              {/* Current Action */}
              <Card>
                <InlineStack align="space-between" blockAlign="center">
                  <BlockStack gap="200">
                    <Badge tone="attention">Next step</Badge>
                    <Text variant="headingMd">Customize your email template</Text>
                    <Text variant="bodyMd" tone="subdued">
                      Make your back-in-stock emails match your brand
                    </Text>
                  </BlockStack>
                  <Button variant="primary" size="large">
                    Customize Template
                  </Button>
                </InlineStack>
              </Card>
            </BlockStack>
          </Box>
        </Card>

        {/* Stats Row - Empty State Focused */}
        <InlineGrid columns={3} gap="400">
          <Card>
            <BlockStack gap="400" inlineAlign="center">
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#f6f6f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Icon source={EmailIcon} />
              </div>
              <Text variant="headingXl" as="h3">{stats.subscribers}</Text>
              <Text variant="bodyMd" tone="subdued">Subscribers</Text>
              <Text variant="bodySm" tone="subdued">
                Waiting for your first signup
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="400" inlineAlign="center">
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#f6f6f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Icon source={ViewIcon} />
              </div>
              <Text variant="headingXl" as="h3">{stats.notifications}</Text>
              <Text variant="bodyMd" tone="subdued">Notifications Sent</Text>
              <Text variant="bodySm" tone="subdued">
                Automatic when items restock
              </Text>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="400" inlineAlign="center">
              <div style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#f6f6f7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <Text variant="headingLg">$</Text>
              </div>
              <Text variant="headingXl" as="h3">{stats.revenue}</Text>
              <Text variant="bodyMd" tone="subdued">Revenue Recovered</Text>
              <Text variant="bodySm" tone="subdued">
                From back-in-stock sales
              </Text>
            </BlockStack>
          </Card>
        </InlineGrid>

        {/* Products Waiting for Stock */}
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <InlineStack align="space-between">
                  <BlockStack gap="100">
                    <Text variant="headingMd" as="h2">Products waiting for stock</Text>
                    <Text variant="bodySm" tone="subdued">
                      These products have customers waiting to be notified
                    </Text>
                  </BlockStack>
                  <Button>View all products</Button>
                </InlineStack>

                <Divider />

                {pendingProducts.length > 0 ? (
                  <BlockStack gap="400">
                    {pendingProducts.map((product, i) => (
                      <InlineStack key={i} align="space-between" blockAlign="center">
                        <InlineStack gap="400" blockAlign="center">
                          <Thumbnail
                            source="https://placehold.co/60x60/f6f6f7/8c9196?text=IMG"
                            alt={product.title}
                            size="small"
                          />
                          <BlockStack gap="100">
                            <Text variant="bodyMd" fontWeight="semibold">{product.title}</Text>
                            <Text variant="bodySm" tone="subdued">{product.variant}</Text>
                          </BlockStack>
                        </InlineStack>
                        <InlineStack gap="300" blockAlign="center">
                          <Badge tone="info">{product.subscribers} waiting</Badge>
                          <Button size="slim">Mark in stock</Button>
                        </InlineStack>
                      </InlineStack>
                    ))}
                  </BlockStack>
                ) : (
                  <Box padding="800">
                    <BlockStack gap="400" inlineAlign="center">
                      <Text variant="bodyMd" tone="subdued">
                        No out-of-stock products with subscribers yet
                      </Text>
                      <Button>View all products</Button>
                    </BlockStack>
                  </Box>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section variant="oneThird">
            <BlockStack gap="400">
              {/* Quick Links */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Quick Actions</Text>
                  <Divider />

                  <Button fullWidth icon={ThemeIcon} textAlign="left">
                    Customize Widget
                  </Button>
                  <Button fullWidth icon={EmailIcon} textAlign="left" variant="secondary">
                    Edit Email Template
                  </Button>
                  <Button fullWidth icon={SettingsIcon} textAlign="left" variant="secondary">
                    Notification Settings
                  </Button>
                </BlockStack>
              </Card>

              {/* Help Card */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Need help?</Text>
                  <Divider />
                  <Text variant="bodySm" tone="subdued">
                    Our team is here to help you get the most out of KALRT.
                  </Text>
                  <Button fullWidth variant="secondary">Contact Support</Button>
                  <Button fullWidth variant="plain">View Documentation</Button>
                </BlockStack>
              </Card>

              {/* Plan Info */}
              <Card>
                <BlockStack gap="300">
                  <InlineStack align="space-between">
                    <Text variant="headingMd">Free Plan</Text>
                    <Badge tone="success">Active</Badge>
                  </InlineStack>
                  <Text variant="bodySm" tone="subdued">50 notifications/month</Text>
                  <ProgressBar progress={0} size="small" />
                  <Text variant="bodySm" tone="subdued">0 of 50 used</Text>
                  <Box paddingBlockStart="200">
                    <Button fullWidth>Upgrade for unlimited</Button>
                  </Box>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
