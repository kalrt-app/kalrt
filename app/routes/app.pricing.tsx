/**
 * Pricing Page - Plan selection and management
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
  Banner,
  Checkbox,
} from "@shopify/polaris";
import {
  CheckIcon,
  XIcon,
  StarFilledIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "For stores just getting started",
      current: false,
      features: {
        notifications: "50/month",
        preorders: "25/month",
        wishlist: "100 actions",
        sms: "5 (one-time)",
        email: true,
        klaviyo: true,
        mailchimp: true,
        customSender: false,
        api: false,
        branding: true,
        support: "Email",
      },
    },
    {
      name: "Starter",
      price: { monthly: 12, yearly: 10 },
      description: "For growing stores",
      current: true,
      popular: true,
      features: {
        notifications: "500/month",
        preorders: "200/month",
        wishlist: "2,000 actions",
        sms: "$0.03/msg",
        email: true,
        klaviyo: true,
        mailchimp: true,
        customSender: true,
        api: false,
        branding: false,
        support: "Priority Email",
      },
    },
    {
      name: "Growth",
      price: { monthly: 29, yearly: 24 },
      description: "For established stores",
      current: false,
      features: {
        notifications: "2,000/month",
        preorders: "500/month",
        wishlist: "10,000 actions",
        sms: "$0.025/msg",
        email: true,
        klaviyo: true,
        mailchimp: true,
        customSender: true,
        api: true,
        branding: false,
        support: "Priority + Chat",
      },
    },
    {
      name: "Scale",
      price: { monthly: 59, yearly: 49 },
      description: "For high-volume stores",
      current: false,
      features: {
        notifications: "Unlimited",
        preorders: "Unlimited",
        wishlist: "Unlimited",
        sms: "$0.02/msg",
        email: true,
        klaviyo: true,
        mailchimp: true,
        customSender: true,
        api: true,
        branding: false,
        support: "Dedicated + Phone",
      },
    },
  ];

  const currentUsage = {
    notifications: { used: 342, limit: 500 },
    preorders: { used: 89, limit: 200 },
    wishlist: { used: 1245, limit: 2000 },
  };

  return (
    <AppLayout>
      <Page
        title="Plan & Billing"
        subtitle="Manage your subscription and view usage"
        secondaryActions={[
          { content: "View Invoice History" },
          { content: "Update Payment Method" },
        ]}
      >
        <BlockStack gap="600">
          {/* Current Plan Banner */}
          <Banner title="You're on the Starter plan" tone="info">
            <p>Your next billing date is May 25, 2026. You'll be charged $12.00.</p>
          </Banner>

          {/* Usage Overview */}
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">Current Usage (This Month)</Text>
              <Divider />
              <InlineGrid columns={3} gap="400">
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="bodySm">Notifications</Text>
                    <Text variant="bodySm" tone="subdued">
                      {currentUsage.notifications.used} / {currentUsage.notifications.limit}
                    </Text>
                  </InlineStack>
                  <ProgressBar
                    progress={(currentUsage.notifications.used / currentUsage.notifications.limit) * 100}
                    tone={(currentUsage.notifications.used / currentUsage.notifications.limit) > 0.8 ? "critical" : "primary"}
                  />
                </BlockStack>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="bodySm">PreOrders</Text>
                    <Text variant="bodySm" tone="subdued">
                      {currentUsage.preorders.used} / {currentUsage.preorders.limit}
                    </Text>
                  </InlineStack>
                  <ProgressBar
                    progress={(currentUsage.preorders.used / currentUsage.preorders.limit) * 100}
                  />
                </BlockStack>
                <BlockStack gap="200">
                  <InlineStack align="space-between">
                    <Text variant="bodySm">Wishlist Actions</Text>
                    <Text variant="bodySm" tone="subdued">
                      {currentUsage.wishlist.used} / {currentUsage.wishlist.limit}
                    </Text>
                  </InlineStack>
                  <ProgressBar
                    progress={(currentUsage.wishlist.used / currentUsage.wishlist.limit) * 100}
                  />
                </BlockStack>
              </InlineGrid>
            </BlockStack>
          </Card>

          {/* Billing Toggle */}
          <InlineStack align="center" gap="400">
            <Button
              pressed={billingCycle === "monthly"}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </Button>
            <Button
              pressed={billingCycle === "yearly"}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <Badge tone="success">Save 20%</Badge>
            </Button>
          </InlineStack>

          {/* Plans Grid */}
          <InlineGrid columns={4} gap="400">
            {plans.map((plan) => (
              <Card key={plan.name} background={plan.current ? "bg-surface-selected" : undefined}>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text variant="headingLg">{plan.name}</Text>
                    {plan.popular && <Badge tone="attention">Popular</Badge>}
                    {plan.current && <Badge tone="success">Current</Badge>}
                  </InlineStack>

                  <BlockStack gap="100">
                    <InlineStack gap="100" blockAlign="end">
                      <Text variant="heading2xl" as="h2">
                        ${billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly}
                      </Text>
                      <Text tone="subdued">/month</Text>
                    </InlineStack>
                    {billingCycle === "yearly" && plan.price.yearly > 0 && (
                      <Text variant="bodySm" tone="success">
                        Save ${(plan.price.monthly - plan.price.yearly) * 12}/year
                      </Text>
                    )}
                  </BlockStack>

                  <Text tone="subdued">{plan.description}</Text>

                  <Divider />

                  <BlockStack gap="300">
                    <InlineStack gap="200">
                      <Icon source={CheckIcon} tone="success" />
                      <Text>{plan.features.notifications} notifications</Text>
                    </InlineStack>
                    <InlineStack gap="200">
                      <Icon source={CheckIcon} tone="success" />
                      <Text>{plan.features.preorders} preorders</Text>
                    </InlineStack>
                    <InlineStack gap="200">
                      <Icon source={CheckIcon} tone="success" />
                      <Text>{plan.features.wishlist}</Text>
                    </InlineStack>
                    <InlineStack gap="200">
                      <Icon source={CheckIcon} tone="success" />
                      <Text>SMS: {plan.features.sms}</Text>
                    </InlineStack>

                    <Divider />

                    <InlineStack gap="200">
                      <Icon source={plan.features.klaviyo ? CheckIcon : XIcon} tone={plan.features.klaviyo ? "success" : "subdued"} />
                      <Text tone={plan.features.klaviyo ? undefined : "subdued"}>Klaviyo integration</Text>
                    </InlineStack>
                    <InlineStack gap="200">
                      <Icon source={plan.features.mailchimp ? CheckIcon : XIcon} tone={plan.features.mailchimp ? "success" : "subdued"} />
                      <Text tone={plan.features.mailchimp ? undefined : "subdued"}>Mailchimp integration</Text>
                    </InlineStack>
                    <InlineStack gap="200">
                      <Icon source={plan.features.customSender ? CheckIcon : XIcon} tone={plan.features.customSender ? "success" : "subdued"} />
                      <Text tone={plan.features.customSender ? undefined : "subdued"}>Custom sender email</Text>
                    </InlineStack>
                    <InlineStack gap="200">
                      <Icon source={plan.features.api ? CheckIcon : XIcon} tone={plan.features.api ? "success" : "subdued"} />
                      <Text tone={plan.features.api ? undefined : "subdued"}>API access</Text>
                    </InlineStack>
                    <InlineStack gap="200">
                      <Icon source={plan.features.branding ? XIcon : CheckIcon} tone={plan.features.branding ? "subdued" : "success"} />
                      <Text tone={plan.features.branding ? "subdued" : undefined}>
                        {plan.features.branding ? "KALRT branding" : "No branding"}
                      </Text>
                    </InlineStack>

                    <Divider />

                    <Text variant="bodySm" tone="subdued">{plan.features.support} support</Text>
                  </BlockStack>

                  <Box paddingBlockStart="200">
                    {plan.current ? (
                      <Button fullWidth disabled>Current Plan</Button>
                    ) : plan.price.monthly === 0 ? (
                      <Button fullWidth variant="secondary">Downgrade</Button>
                    ) : (
                      <Button fullWidth variant="primary">
                        {plan.price.monthly > 12 ? "Upgrade" : "Change Plan"}
                      </Button>
                    )}
                  </Box>
                </BlockStack>
              </Card>
            ))}
          </InlineGrid>

          {/* Comparison Banner */}
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">Why KALRT beats competitors</Text>
              <Divider />
              <InlineGrid columns={3} gap="400">
                <BlockStack gap="200">
                  <Text variant="headingMd" tone="success">5x more free notifications</Text>
                  <Text tone="subdued">50/month vs competitors' 10/month</Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text variant="headingMd" tone="success">Free Klaviyo & Mailchimp</Text>
                  <Text tone="subdued">Competitors charge $20+/mo for integrations</Text>
                </BlockStack>
                <BlockStack gap="200">
                  <Text variant="headingMd" tone="success">No transaction fees</Text>
                  <Text tone="subdued">Competitors charge up to 3% on preorders</Text>
                </BlockStack>
              </InlineGrid>
            </BlockStack>
          </Card>

          {/* FAQ */}
          <Card>
            <BlockStack gap="400">
              <Text variant="headingMd">Frequently Asked Questions</Text>
              <Divider />

              <BlockStack gap="300">
                <Text variant="bodyMd" fontWeight="semibold">What happens if I exceed my limits?</Text>
                <Text tone="subdued">We use soft caps with grace periods. You'll get a warning email at 80% and can upgrade anytime. We won't cut off service mid-campaign like some competitors.</Text>
              </BlockStack>

              <BlockStack gap="300">
                <Text variant="bodyMd" fontWeight="semibold">Can I downgrade anytime?</Text>
                <Text tone="subdued">Yes! Unlike competitors, you can downgrade to any plan (including Free) at any time. Changes take effect at your next billing cycle.</Text>
              </BlockStack>

              <BlockStack gap="300">
                <Text variant="bodyMd" fontWeight="semibold">Is there a contract?</Text>
                <Text tone="subdued">No contracts, no commitments. Cancel anytime. If you choose yearly billing, you can still cancel and get a prorated refund.</Text>
              </BlockStack>

              <BlockStack gap="300">
                <Text variant="bodyMd" fontWeight="semibold">Will my prices ever increase?</Text>
                <Text tone="subdued">We offer a 24-month price lock. If we raise prices, existing customers keep their rate for 2 years.</Text>
              </BlockStack>
            </BlockStack>
          </Card>
        </BlockStack>
      </Page>
    </AppLayout>
  );
}
