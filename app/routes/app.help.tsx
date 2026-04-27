/**
 * Help & Support Page
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
  TextField,
  Banner,
  Collapsible,
  Link,
} from "@shopify/polaris";
import {
  QuestionCircleIcon,
  ChatIcon,
  EmailIcon,
  BookIcon,
  PlayIcon,
  ExternalIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = useCallback((id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  }, [openFaq]);

  const faqs = [
    {
      id: "1",
      question: "How do I install the Notify Me button on my store?",
      answer: "Go to Settings → General → Theme Extension and click 'Enable'. The button automatically appears on out-of-stock products. You can customize colors and text in Back in Stock → Customization tab."
    },
    {
      id: "2",
      question: "Why aren't my notifications sending?",
      answer: "Check: 1) Product is actually back in stock in Shopify, 2) SendGrid/email is configured in Settings → Integrations, 3) You haven't hit your plan's notification limit. View delivery status in Back in Stock → Notifications tab."
    },
    {
      id: "3",
      question: "How do I connect Klaviyo?",
      answer: "Go to Settings → Integrations → Klaviyo → Connect. Enter your Klaviyo API key (found in Klaviyo → Account → API Keys), select the list to sync to, and click Save. New subscribers automatically sync."
    },
    {
      id: "4",
      question: "What's the difference between PreOrder deposit vs full payment?",
      answer: "Full payment charges the complete amount upfront. Deposit collects a partial payment (e.g., 25%) now, with the remainder due when the product ships. Configure in PreOrder → Settings tab."
    },
    {
      id: "5",
      question: "How do I enable SMS notifications?",
      answer: "Go to Settings → Integrations → Twilio → Connect. Enter your Twilio Account SID, Auth Token, and phone number. Then enable SMS in Back in Stock → Customization → 'Collect phone number'. SMS costs are passed through at Twilio rates."
    },
    {
      id: "6",
      question: "Can I migrate subscribers from Notify Me! or another app?",
      answer: "Yes! Go to Back in Stock → Import (in the page actions menu). Upload a CSV with email, product_id, and variant_id columns. We support unlimited imports on all plans."
    },
    {
      id: "7",
      question: "How does the Low Stock FOMO feature work?",
      answer: "When products fall below your threshold (default: 5 units), we show 'Only X left!' badges on your store. This creates urgency and increases conversions by up to 23%. Configure in Low Stock → Settings."
    },
    {
      id: "8",
      question: "What happens when I hit my notification limit?",
      answer: "We use soft caps with a 20% grace period. You'll get warnings at 80% usage. We never cut off service mid-campaign. Upgrade anytime or notifications roll over if you stay under limit."
    },
  ];

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resources = [
    { title: "Getting Started Guide", description: "Set up KALRT in under 5 minutes", icon: BookIcon, type: "doc" },
    { title: "Video Tutorials", description: "Step-by-step walkthroughs", icon: PlayIcon, type: "video" },
    { title: "API Documentation", description: "Build custom integrations", icon: ExternalIcon, type: "doc" },
    { title: "Changelog", description: "See what's new", icon: BookIcon, type: "doc" },
  ];

  return (
    <AppLayout>
      <Page title="Help & Support" subtitle="Find answers and get assistance">
        <BlockStack gap="600">
          {/* Search */}
          <Card>
            <BlockStack gap="400">
              <TextField
                label="Search help articles"
                labelHidden
                placeholder="Search for help..."
                value={searchQuery}
                onChange={setSearchQuery}
                autoComplete="off"
                prefix={<Icon source={QuestionCircleIcon} />}
              />
            </BlockStack>
          </Card>

          <Layout>
            <Layout.Section>
              {/* FAQs */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">Frequently Asked Questions</Text>
                  <Divider />

                  <BlockStack gap="200">
                    {filteredFaqs.map((faq) => (
                      <div key={faq.id}>
                        <Button
                          fullWidth
                          textAlign="left"
                          variant="plain"
                          onClick={() => toggleFaq(faq.id)}
                          ariaExpanded={openFaq === faq.id}
                          ariaControls={`faq-${faq.id}`}
                        >
                          <InlineStack align="space-between" blockAlign="center">
                            <Text variant="bodyMd" fontWeight="semibold">{faq.question}</Text>
                            <Text>{openFaq === faq.id ? "−" : "+"}</Text>
                          </InlineStack>
                        </Button>
                        <Collapsible
                          open={openFaq === faq.id}
                          id={`faq-${faq.id}`}
                          transition={{ duration: "200ms", timingFunction: "ease-in-out" }}
                        >
                          <Box paddingBlock="300" paddingInlineStart="400">
                            <Text tone="subdued">{faq.answer}</Text>
                          </Box>
                        </Collapsible>
                        <Divider />
                      </div>
                    ))}
                  </BlockStack>

                  {filteredFaqs.length === 0 && (
                    <Box padding="400">
                      <Text tone="subdued">No results found. Try a different search or contact support.</Text>
                    </Box>
                  )}
                </BlockStack>
              </Card>
            </Layout.Section>

            <Layout.Section variant="oneThird">
              {/* Contact Support */}
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd">Contact Support</Text>
                  <Divider />

                  <BlockStack gap="300">
                    <Button fullWidth icon={ChatIcon}>
                      Live Chat
                    </Button>
                    <Text variant="bodySm" tone="subdued" alignment="center">
                      Average response: 2 minutes
                    </Text>
                  </BlockStack>

                  <Divider />

                  <BlockStack gap="300">
                    <Button fullWidth variant="secondary" icon={EmailIcon}>
                      Email Support
                    </Button>
                    <Text variant="bodySm" tone="subdued" alignment="center">
                      support@kalrt.com
                    </Text>
                  </BlockStack>

                  <Divider />

                  <BlockStack gap="200">
                    <Text variant="bodySm" fontWeight="semibold">Support Hours</Text>
                    <Text variant="bodySm" tone="subdued">Monday - Friday</Text>
                    <Text variant="bodySm" tone="subdued">9:00 AM - 6:00 PM EST</Text>
                  </BlockStack>
                </BlockStack>
              </Card>

              <Box paddingBlockStart="400">
                <Card>
                  <BlockStack gap="400">
                    <Text variant="headingMd">Resources</Text>
                    <Divider />

                    <BlockStack gap="300">
                      {resources.map((resource, index) => (
                        <InlineStack key={index} gap="300" blockAlign="center">
                          <div style={{
                            width: 40,
                            height: 40,
                            borderRadius: 8,
                            background: "#f6f6f7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <Icon source={resource.icon} />
                          </div>
                          <BlockStack gap="100">
                            <Link url="#">{resource.title}</Link>
                            <Text variant="bodySm" tone="subdued">{resource.description}</Text>
                          </BlockStack>
                        </InlineStack>
                      ))}
                    </BlockStack>
                  </BlockStack>
                </Card>
              </Box>

              <Box paddingBlockStart="400">
                <Card>
                  <BlockStack gap="400">
                    <Text variant="headingMd">System Status</Text>
                    <Divider />
                    <InlineStack gap="200" blockAlign="center">
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background: "#00a47c",
                      }} />
                      <Text>All systems operational</Text>
                    </InlineStack>
                    <Link url="#">View status page</Link>
                  </BlockStack>
                </Card>
              </Box>
            </Layout.Section>
          </Layout>

          {/* Feedback Banner */}
          <Banner title="Help us improve KALRT" tone="info">
            <p>Have a feature request or feedback? We'd love to hear from you.</p>
            <Box paddingBlockStart="200">
              <Button>Share Feedback</Button>
            </Box>
          </Banner>
        </BlockStack>
      </Page>
    </AppLayout>
  );
}
