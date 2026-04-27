/**
 * Settings Module - Complete app configuration
 * General, Notifications, Integrations, API, Locations, Language
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
  TextField,
  Select,
  Tabs,
  Checkbox,
  Banner,
  Thumbnail,
  Modal,
  FormLayout,
  ChoiceList,
  ProgressBar,
} from "@shopify/polaris";
import {
  SettingsIcon,
  EmailIcon,
  AppsIcon,
  CodeIcon,
  LocationIcon,
  GlobeIcon,
  CheckIcon,
  AlertCircleIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function SettingsOverview() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [senderName, setSenderName] = useState("KALRT Alerts");
  const [replyTo, setReplyTo] = useState("support@demo-store.com");
  const [language, setLanguage] = useState("en");

  // Modal states
  const [apiKeyModalActive, setApiKeyModalActive] = useState(false);
  const [integrationModalActive, setIntegrationModalActive] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

  // Integration form states
  const [klaviyoApiKey, setKlaviyoApiKey] = useState("");
  const [klaviyoList, setKlaviyoList] = useState("");
  const [mailchimpApiKey, setMailchimpApiKey] = useState("");
  const [sendgridApiKey, setSendgridApiKey] = useState("");
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const [twilioPhone, setTwilioPhone] = useState("");

  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);

  const openIntegrationModal = (integration: any) => {
    setSelectedIntegration(integration);
    setIntegrationModalActive(true);
  };

  const tabs = [
    { id: "general", content: "General", icon: SettingsIcon },
    { id: "notifications", content: "Notifications", icon: EmailIcon },
    { id: "integrations", content: "Integrations", icon: AppsIcon },
    { id: "api", content: "API Keys", icon: CodeIcon },
    { id: "locations", content: "Locations", icon: LocationIcon },
    { id: "language", content: "Language", icon: GlobeIcon },
  ];

  const integrations = [
    { id: "klaviyo", name: "Klaviyo", description: "Sync subscribers to Klaviyo lists", status: "connected", icon: "https://placehold.co/40x40/0d1f44/fff?text=K", free: true, category: "email" },
    { id: "mailchimp", name: "Mailchimp", description: "Add subscribers to Mailchimp audiences", status: "available", icon: "https://placehold.co/40x40/ffe01b/000?text=M", free: true, category: "email" },
    { id: "omnisend", name: "Omnisend", description: "Sync with Omnisend campaigns", status: "available", icon: "https://placehold.co/40x40/1d3557/fff?text=O", free: false, category: "email" },
    { id: "drip", name: "Drip", description: "E-commerce CRM automation", status: "available", icon: "https://placehold.co/40x40/5c63ab/fff?text=D", free: false, category: "email" },
    { id: "sendgrid", name: "SendGrid", description: "Primary email delivery service", status: "connected", icon: "https://placehold.co/40x40/1a82e2/fff?text=SG", free: true, category: "sending" },
    { id: "mailgun", name: "Mailgun", description: "Backup email delivery service", status: "available", icon: "https://placehold.co/40x40/d44332/fff?text=MG", free: true, category: "sending" },
    { id: "twilio", name: "Twilio", description: "SMS notifications", status: "connected", icon: "https://placehold.co/40x40/f22f46/fff?text=T", free: true, category: "sms" },
    { id: "smsbump", name: "SMSBump", description: "SMS marketing automation", status: "available", icon: "https://placehold.co/40x40/00c853/fff?text=SB", free: false, category: "sms" },
    { id: "shopify", name: "Shopify Customers", description: "Sync to Shopify customer list", status: "connected", icon: "https://placehold.co/40x40/96bf48/fff?text=S", free: true, category: "other" },
    { id: "zapier", name: "Zapier", description: "Connect to 5000+ apps", status: "available", icon: "https://placehold.co/40x40/ff4a00/fff?text=Z", free: false, category: "other" },
    { id: "pushowl", name: "PushOwl", description: "Web push notifications", status: "available", icon: "https://placehold.co/40x40/ff6b35/fff?text=PO", free: true, category: "other" },
  ];

  const locations = [
    { id: "1", name: "Main Warehouse", address: "123 Commerce St, New York, NY", inventory: 1234, active: true },
    { id: "2", name: "West Coast DC", address: "456 Pacific Ave, Los Angeles, CA", inventory: 567, active: true },
    { id: "3", name: "Retail Store", address: "789 Main St, Chicago, IL", inventory: 89, active: false },
  ];

  const languages = [
    { label: "English", value: "en" },
    { label: "Spanish (Español)", value: "es" },
    { label: "French (Français)", value: "fr" },
    { label: "German (Deutsch)", value: "de" },
    { label: "Italian (Italiano)", value: "it" },
    { label: "Portuguese (Português)", value: "pt" },
    { label: "Dutch (Nederlands)", value: "nl" },
    { label: "Japanese (日本語)", value: "ja" },
    { label: "Chinese (中文)", value: "zh" },
  ];

  const getIntegrationStatus = (status: string) => {
    switch (status) {
      case "connected": return <Badge tone="success"><Icon source={CheckIcon} /> Connected</Badge>;
      case "available": return <Badge>Available</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const renderIntegrationModal = () => {
    if (!selectedIntegration) return null;

    const modalContent: { [key: string]: JSX.Element } = {
      klaviyo: (
        <FormLayout>
          <Banner tone="info">
            <p>Get your API key from Klaviyo → Account → Settings → API Keys</p>
          </Banner>
          <TextField
            label="Klaviyo API Key"
            value={klaviyoApiKey}
            onChange={setKlaviyoApiKey}
            type="password"
            placeholder="pk_xxxxxxxxxxxx"
            autoComplete="off"
          />
          <Select
            label="Sync to List"
            options={[
              { label: "Select a list...", value: "" },
              { label: "Back in Stock Subscribers", value: "bis" },
              { label: "Newsletter", value: "newsletter" },
              { label: "All Customers", value: "all" },
            ]}
            value={klaviyoList}
            onChange={setKlaviyoList}
          />
          <ChoiceList
            title="Sync Events"
            allowMultiple
            choices={[
              { label: "When customer subscribes", value: "subscribe" },
              { label: "When notification sent", value: "notify" },
              { label: "When customer purchases", value: "purchase" },
            ]}
            selected={["subscribe", "notify"]}
            onChange={() => {}}
          />
          <Checkbox label="Sync existing subscribers" checked={true} />
          <Button>Test Connection</Button>
        </FormLayout>
      ),
      mailchimp: (
        <FormLayout>
          <Banner tone="info">
            <p>Get your API key from Mailchimp → Account → Extras → API Keys</p>
          </Banner>
          <TextField
            label="Mailchimp API Key"
            value={mailchimpApiKey}
            onChange={setMailchimpApiKey}
            type="password"
            placeholder="xxxxxxxx-us1"
            autoComplete="off"
          />
          <Select
            label="Sync to Audience"
            options={[
              { label: "Select an audience...", value: "" },
              { label: "Main Audience", value: "main" },
              { label: "Back in Stock", value: "bis" },
            ]}
            value=""
          />
          <TextField
            label="Tag subscribers with"
            value="back-in-stock"
            autoComplete="off"
          />
          <Checkbox label="Enable double opt-in" checked={false} />
          <Button>Test Connection</Button>
        </FormLayout>
      ),
      sendgrid: (
        <FormLayout>
          <Banner tone="success">
            <p>SendGrid is your primary email delivery service.</p>
          </Banner>
          <TextField
            label="SendGrid API Key"
            value={sendgridApiKey}
            onChange={setSendgridApiKey}
            type="password"
            placeholder="SG.xxxxxxxxxxxx"
            autoComplete="off"
          />
          <TextField
            label="Verified Sender Email"
            value="noreply@kalrt.com"
            disabled
            autoComplete="off"
          />
          <TextField
            label="Verified Sender Name"
            value="KALRT Notifications"
            autoComplete="off"
          />
          <Divider />
          <Text variant="headingSm">Delivery Stats (Last 30 days)</Text>
          <InlineGrid columns={3} gap="400">
            <BlockStack gap="100">
              <Text variant="bodySm" tone="subdued">Delivered</Text>
              <Text variant="headingMd">98.7%</Text>
            </BlockStack>
            <BlockStack gap="100">
              <Text variant="bodySm" tone="subdued">Bounced</Text>
              <Text variant="headingMd">0.8%</Text>
            </BlockStack>
            <BlockStack gap="100">
              <Text variant="bodySm" tone="subdued">Spam Reports</Text>
              <Text variant="headingMd">0.02%</Text>
            </BlockStack>
          </InlineGrid>
          <Button>Send Test Email</Button>
        </FormLayout>
      ),
      twilio: (
        <FormLayout>
          <Banner tone="info">
            <p>Get credentials from Twilio Console → Account → API Keys</p>
          </Banner>
          <TextField
            label="Account SID"
            value={twilioSid}
            onChange={setTwilioSid}
            placeholder="ACxxxxxxxxxxxxxxxx"
            autoComplete="off"
          />
          <TextField
            label="Auth Token"
            value={twilioToken}
            onChange={setTwilioToken}
            type="password"
            placeholder="xxxxxxxxxxxxxxxx"
            autoComplete="off"
          />
          <TextField
            label="Phone Number"
            value={twilioPhone}
            onChange={setTwilioPhone}
            placeholder="+1 555 123 4567"
            autoComplete="off"
          />
          <Divider />
          <Text variant="headingSm">SMS Pricing</Text>
          <BlockStack gap="200">
            <InlineStack align="space-between">
              <Text>US/Canada</Text>
              <Text fontWeight="semibold">$0.03/SMS</Text>
            </InlineStack>
            <InlineStack align="space-between">
              <Text>UK</Text>
              <Text fontWeight="semibold">$0.05/SMS</Text>
            </InlineStack>
            <InlineStack align="space-between">
              <Text>Other</Text>
              <Text fontWeight="semibold">Varies</Text>
            </InlineStack>
          </BlockStack>
          <Button>Send Test SMS</Button>
        </FormLayout>
      ),
      zapier: (
        <FormLayout>
          <Banner tone="info">
            <p>Use these webhook URLs in your Zapier Zaps to connect KALRT with 5,000+ apps.</p>
          </Banner>
          <Text variant="headingSm">Available Triggers</Text>
          <BlockStack gap="200">
            <Card>
              <InlineStack align="space-between">
                <BlockStack gap="100">
                  <Text fontWeight="semibold">New Subscriber</Text>
                  <Text variant="bodySm" tone="subdued">Fires when someone subscribes for back-in-stock</Text>
                </BlockStack>
                <Button size="slim">Copy URL</Button>
              </InlineStack>
            </Card>
            <Card>
              <InlineStack align="space-between">
                <BlockStack gap="100">
                  <Text fontWeight="semibold">Notification Sent</Text>
                  <Text variant="bodySm" tone="subdued">Fires when a restock notification is sent</Text>
                </BlockStack>
                <Button size="slim">Copy URL</Button>
              </InlineStack>
            </Card>
            <Card>
              <InlineStack align="space-between">
                <BlockStack gap="100">
                  <Text fontWeight="semibold">Purchase from Notification</Text>
                  <Text variant="bodySm" tone="subdued">Fires when subscriber makes a purchase</Text>
                </BlockStack>
                <Button size="slim">Copy URL</Button>
              </InlineStack>
            </Card>
          </BlockStack>
          <Button url="https://zapier.com/apps/kalrt" external>Open in Zapier</Button>
        </FormLayout>
      ),
    };

    // Default modal for integrations without specific content
    const defaultContent = (
      <FormLayout>
        <Banner tone="info">
          <p>Connect {selectedIntegration.name} to sync your back-in-stock subscribers automatically.</p>
        </Banner>
        <TextField
          label={`${selectedIntegration.name} API Key`}
          type="password"
          placeholder="Enter your API key"
          autoComplete="off"
        />
        <Checkbox label="Enable automatic sync" checked={true} />
        <Checkbox label="Sync existing subscribers" checked={false} />
        <Button>Test Connection</Button>
      </FormLayout>
    );

    return modalContent[selectedIntegration.id] || defaultContent;
  };

  return (
    <AppLayout>
      <Page title="Settings" subtitle="Configure your KALRT app">
        <Card padding="0">
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
            <Box padding="600">
              {/* General Settings */}
              {selectedTab === 0 && (
                <Layout>
                  <Layout.Section>
                    <BlockStack gap="600">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Store Information</Text>
                          <Divider />
                          <TextField label="Store name" value="Demo Store" disabled autoComplete="off" />
                          <TextField label="Store domain" value="demo-store.myshopify.com" disabled autoComplete="off" />
                          <TextField label="Store email" value="contact@demo-store.com" autoComplete="off" />
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Email Sender</Text>
                          <Divider />
                          <TextField
                            label="Sender name"
                            value={senderName}
                            onChange={setSenderName}
                            helpText="Name shown in customer's inbox"
                            autoComplete="off"
                          />
                          <TextField
                            label="Reply-to email"
                            type="email"
                            value={replyTo}
                            onChange={setReplyTo}
                            helpText="Where customer replies go"
                            autoComplete="off"
                          />
                          <Banner tone="info">
                            <p>Emails are sent from noreply@kalrt.com. For custom sender domain, upgrade to Growth plan.</p>
                          </Banner>
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Data & Privacy</Text>
                          <Divider />
                          <Checkbox label="Collect customer consent for marketing" checked={true} helpText="Show opt-in checkbox on subscription forms" />
                          <Checkbox label="GDPR compliance mode" checked={true} helpText="Double opt-in and data export features" />
                          <Checkbox label="Delete customer data after 12 months of inactivity" checked={false} />
                          <Button>Export All Data</Button>
                        </BlockStack>
                      </Card>
                    </BlockStack>
                  </Layout.Section>

                  <Layout.Section variant="oneThird">
                    <Card>
                      <BlockStack gap="400">
                        <Text variant="headingMd">App Status</Text>
                        <Divider />
                        <InlineStack align="space-between">
                          <Text>Back in Stock</Text>
                          <Badge tone="success">Active</Badge>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text>PreOrder</Text>
                          <Badge tone="success">Active</Badge>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text>Wishlist</Text>
                          <Badge tone="success">Active</Badge>
                        </InlineStack>
                        <InlineStack align="space-between">
                          <Text>Low Stock</Text>
                          <Badge tone="success">Active</Badge>
                        </InlineStack>
                        <Divider />
                        <Button variant="primary" fullWidth>Save Changes</Button>
                      </BlockStack>
                    </Card>

                    <Box paddingBlockStart="400">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Danger Zone</Text>
                          <Divider />
                          <Button tone="critical" variant="secondary">Reset All Settings</Button>
                          <Button tone="critical" variant="plain">Delete All Data</Button>
                        </BlockStack>
                      </Card>
                    </Box>
                  </Layout.Section>
                </Layout>
              )}

              {/* Notification Settings */}
              {selectedTab === 1 && (
                <Layout>
                  <Layout.Section>
                    <BlockStack gap="600">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Email Notifications</Text>
                          <Divider />
                          <Checkbox label="Back-in-stock notification" checked={true} helpText="Send when subscribed products come back in stock" />
                          <Checkbox label="Thank you email" checked={true} helpText="Send confirmation when customer subscribes" />
                          <Checkbox label="Reminder email" checked={false} helpText="Send 'still in stock' reminder after 24 hours" />
                          <Button>Edit Email Templates</Button>
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">SMS Notifications</Text>
                          <Divider />
                          <Checkbox label="Enable SMS notifications" checked={true} />
                          <TextField
                            label="SMS template"
                            value="{{product_name}} is back in stock at {{shop_name}}! Shop now: {{product_url}}"
                            multiline={3}
                            autoComplete="off"
                          />
                          <Banner tone="info">
                            <p>SMS costs vary by country. US/Canada: $0.03/SMS. View full pricing in your plan.</p>
                          </Banner>
                        </BlockStack>
                      </Card>

                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Push Notifications</Text>
                          <Divider />
                          <Checkbox label="Enable web push notifications" checked={false} helpText="Requires PushOwl integration" />
                          <TextField label="Push title" value="{{product_name}} is available now!" disabled autoComplete="off" />
                          <Button disabled>Configure Push (Connect PushOwl first)</Button>
                        </BlockStack>
                      </Card>
                    </BlockStack>
                  </Layout.Section>

                  <Layout.Section variant="oneThird">
                    <Card>
                      <BlockStack gap="400">
                        <Text variant="headingMd">Delivery Settings</Text>
                        <Divider />
                        <Select
                          label="Send notifications"
                          options={[
                            { label: "Immediately when restocked", value: "immediate" },
                            { label: "Batch every hour", value: "hourly" },
                            { label: "Batch every 6 hours", value: "6hours" },
                          ]}
                          value="immediate"
                        />
                        <TextField
                          label="Rate limit"
                          type="number"
                          value="100"
                          suffix="per minute"
                          helpText="Prevents spam filter issues"
                          autoComplete="off"
                        />
                        <Checkbox label="Notify on partial restock" checked={true} helpText="Send even if only some variants are back" />
                      </BlockStack>
                    </Card>

                    <Box paddingBlockStart="400">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Merchant Notifications</Text>
                          <Divider />
                          <Checkbox label="Daily summary email" checked={true} />
                          <Checkbox label="Weekly analytics report" checked={false} />
                          <Checkbox label="Alert on high demand product" checked={true} helpText="10+ requests for same product" />
                        </BlockStack>
                      </Card>
                    </Box>
                  </Layout.Section>
                </Layout>
              )}

              {/* Integrations */}
              {selectedTab === 2 && (
                <BlockStack gap="600">
                  <Banner tone="success">
                    <p>Unlike competitors, KALRT includes Klaviyo and Mailchimp integrations FREE on all plans!</p>
                  </Banner>

                  {/* Email Marketing */}
                  <BlockStack gap="400">
                    <Text variant="headingMd">Email Marketing</Text>
                    <InlineGrid columns={2} gap="400">
                      {integrations.filter(i => i.category === "email").map((integration) => (
                        <Card key={integration.id}>
                          <InlineStack align="space-between" blockAlign="start">
                            <InlineStack gap="400" blockAlign="center">
                              <Thumbnail source={integration.icon} alt={integration.name} size="small" />
                              <BlockStack gap="100">
                                <InlineStack gap="200">
                                  <Text variant="headingMd">{integration.name}</Text>
                                  {integration.free ? <Badge tone="success">Free</Badge> : <Badge tone="attention">Paid</Badge>}
                                </InlineStack>
                                <Text variant="bodySm" tone="subdued">{integration.description}</Text>
                              </BlockStack>
                            </InlineStack>
                            <BlockStack gap="200" inlineAlign="end">
                              {getIntegrationStatus(integration.status)}
                              <Button size="slim" variant={integration.status === "connected" ? "secondary" : "primary"} onClick={() => openIntegrationModal(integration)}>
                                {integration.status === "connected" ? "Settings" : "Connect"}
                              </Button>
                            </BlockStack>
                          </InlineStack>
                        </Card>
                      ))}
                    </InlineGrid>
                  </BlockStack>

                  {/* Email Sending */}
                  <BlockStack gap="400">
                    <Text variant="headingMd">Email Delivery</Text>
                    <InlineGrid columns={2} gap="400">
                      {integrations.filter(i => i.category === "sending").map((integration) => (
                        <Card key={integration.id}>
                          <InlineStack align="space-between" blockAlign="start">
                            <InlineStack gap="400" blockAlign="center">
                              <Thumbnail source={integration.icon} alt={integration.name} size="small" />
                              <BlockStack gap="100">
                                <InlineStack gap="200">
                                  <Text variant="headingMd">{integration.name}</Text>
                                  {integration.id === "sendgrid" && <Badge tone="info">Primary</Badge>}
                                  {integration.id === "mailgun" && <Badge>Backup</Badge>}
                                </InlineStack>
                                <Text variant="bodySm" tone="subdued">{integration.description}</Text>
                              </BlockStack>
                            </InlineStack>
                            <BlockStack gap="200" inlineAlign="end">
                              {getIntegrationStatus(integration.status)}
                              <Button size="slim" variant={integration.status === "connected" ? "secondary" : "primary"} onClick={() => openIntegrationModal(integration)}>
                                {integration.status === "connected" ? "Settings" : "Connect"}
                              </Button>
                            </BlockStack>
                          </InlineStack>
                        </Card>
                      ))}
                    </InlineGrid>
                  </BlockStack>

                  {/* SMS */}
                  <BlockStack gap="400">
                    <Text variant="headingMd">SMS</Text>
                    <InlineGrid columns={2} gap="400">
                      {integrations.filter(i => i.category === "sms").map((integration) => (
                        <Card key={integration.id}>
                          <InlineStack align="space-between" blockAlign="start">
                            <InlineStack gap="400" blockAlign="center">
                              <Thumbnail source={integration.icon} alt={integration.name} size="small" />
                              <BlockStack gap="100">
                                <InlineStack gap="200">
                                  <Text variant="headingMd">{integration.name}</Text>
                                  {integration.free ? <Badge tone="success">Free</Badge> : <Badge tone="attention">Paid</Badge>}
                                </InlineStack>
                                <Text variant="bodySm" tone="subdued">{integration.description}</Text>
                              </BlockStack>
                            </InlineStack>
                            <BlockStack gap="200" inlineAlign="end">
                              {getIntegrationStatus(integration.status)}
                              <Button size="slim" variant={integration.status === "connected" ? "secondary" : "primary"} onClick={() => openIntegrationModal(integration)}>
                                {integration.status === "connected" ? "Settings" : "Connect"}
                              </Button>
                            </BlockStack>
                          </InlineStack>
                        </Card>
                      ))}
                    </InlineGrid>
                  </BlockStack>

                  {/* Other */}
                  <BlockStack gap="400">
                    <Text variant="headingMd">Other Integrations</Text>
                    <InlineGrid columns={2} gap="400">
                      {integrations.filter(i => i.category === "other").map((integration) => (
                        <Card key={integration.id}>
                          <InlineStack align="space-between" blockAlign="start">
                            <InlineStack gap="400" blockAlign="center">
                              <Thumbnail source={integration.icon} alt={integration.name} size="small" />
                              <BlockStack gap="100">
                                <InlineStack gap="200">
                                  <Text variant="headingMd">{integration.name}</Text>
                                  {integration.free ? <Badge tone="success">Free</Badge> : <Badge tone="attention">Paid</Badge>}
                                </InlineStack>
                                <Text variant="bodySm" tone="subdued">{integration.description}</Text>
                              </BlockStack>
                            </InlineStack>
                            <BlockStack gap="200" inlineAlign="end">
                              {getIntegrationStatus(integration.status)}
                              <Button size="slim" variant={integration.status === "connected" ? "secondary" : "primary"} onClick={() => openIntegrationModal(integration)}>
                                {integration.status === "connected" ? "Settings" : "Connect"}
                              </Button>
                            </BlockStack>
                          </InlineStack>
                        </Card>
                      ))}
                    </InlineGrid>
                  </BlockStack>
                </BlockStack>
              )}

              {/* API Keys */}
              {selectedTab === 3 && (
                <Layout>
                  <Layout.Section>
                    <Card>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text variant="headingMd">API Keys</Text>
                          <Button variant="primary" onClick={() => setApiKeyModalActive(true)}>Generate New Key</Button>
                        </InlineStack>
                        <Divider />
                        <Text tone="subdued">
                          Use API keys to integrate KALRT with your custom systems, data warehouses, or third-party applications.
                        </Text>

                        <Card>
                          <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="100">
                              <Text variant="bodyMd" fontWeight="semibold">Production Key</Text>
                              <Text variant="bodySm" tone="subdued">Created Apr 15, 2026</Text>
                            </BlockStack>
                            <InlineStack gap="200">
                              <TextField label="" labelHidden value="kalrt_live_••••••••••••••••" disabled autoComplete="off" />
                              <Button>Reveal</Button>
                              <Button tone="critical" variant="plain">Revoke</Button>
                            </InlineStack>
                          </InlineStack>
                        </Card>

                        <Card>
                          <InlineStack align="space-between" blockAlign="center">
                            <BlockStack gap="100">
                              <Text variant="bodyMd" fontWeight="semibold">Test Key</Text>
                              <Text variant="bodySm" tone="subdued">Created Apr 10, 2026</Text>
                            </BlockStack>
                            <InlineStack gap="200">
                              <TextField label="" labelHidden value="kalrt_test_••••••••••••••••" disabled autoComplete="off" />
                              <Button>Reveal</Button>
                              <Button tone="critical" variant="plain">Revoke</Button>
                            </InlineStack>
                          </InlineStack>
                        </Card>
                      </BlockStack>
                    </Card>
                  </Layout.Section>

                  <Layout.Section variant="oneThird">
                    <Card>
                      <BlockStack gap="400">
                        <Text variant="headingMd">API Documentation</Text>
                        <Divider />
                        <Text tone="subdued">
                          Our REST API lets you manage subscribers, send notifications, and access analytics programmatically.
                        </Text>
                        <Button fullWidth url="#">View API Docs</Button>
                        <Button fullWidth variant="plain">View Webhooks</Button>
                      </BlockStack>
                    </Card>

                    <Box paddingBlockStart="400">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Rate Limits</Text>
                          <Divider />
                          <InlineStack align="space-between">
                            <Text>Requests/minute</Text>
                            <Text fontWeight="semibold">60</Text>
                          </InlineStack>
                          <InlineStack align="space-between">
                            <Text>Requests/day</Text>
                            <Text fontWeight="semibold">10,000</Text>
                          </InlineStack>
                        </BlockStack>
                      </Card>
                    </Box>
                  </Layout.Section>
                </Layout>
              )}

              {/* Locations */}
              {selectedTab === 4 && (
                <BlockStack gap="400">
                  <Banner tone="info">
                    <p>KALRT tracks inventory across all your Shopify locations. Enable or disable locations to control which stock counts trigger notifications.</p>
                  </Banner>

                  {locations.map((location) => (
                    <Card key={location.id}>
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="400" blockAlign="center">
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            background: location.active ? "rgba(0, 164, 124, 0.1)" : "#f6f6f7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <Icon source={LocationIcon} tone={location.active ? "success" : "subdued"} />
                          </div>
                          <BlockStack gap="100">
                            <InlineStack gap="200">
                              <Text variant="headingMd">{location.name}</Text>
                              <Badge tone={location.active ? "success" : "info"}>
                                {location.active ? "Tracking" : "Not tracking"}
                              </Badge>
                            </InlineStack>
                            <Text variant="bodySm" tone="subdued">{location.address}</Text>
                            <Text variant="bodySm">Inventory: {location.inventory} items</Text>
                          </BlockStack>
                        </InlineStack>
                        <Button variant={location.active ? "secondary" : "primary"}>
                          {location.active ? "Disable" : "Enable"}
                        </Button>
                      </InlineStack>
                    </Card>
                  ))}
                </BlockStack>
              )}

              {/* Language */}
              {selectedTab === 5 && (
                <Layout>
                  <Layout.Section>
                    <Card>
                      <BlockStack gap="400">
                        <Text variant="headingMd">App Language</Text>
                        <Divider />
                        <Select
                          label="Admin panel language"
                          options={languages}
                          value={language}
                          onChange={setLanguage}
                          helpText="Language for your admin dashboard"
                        />
                      </BlockStack>
                    </Card>

                    <Box paddingBlockStart="400">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Customer-Facing Language</Text>
                          <Divider />
                          <Select label="Widget language" options={languages} value={language} onChange={setLanguage} helpText="Language for 'Notify Me' button and forms" />
                          <Select label="Email language" options={languages} value={language} onChange={setLanguage} helpText="Language for notification emails" />
                          <Checkbox label="Auto-detect customer language" checked={false} helpText="Use customer's browser language when possible" />
                        </BlockStack>
                      </Card>
                    </Box>

                    <Box paddingBlockStart="400">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Custom Translations</Text>
                          <Divider />
                          <Text tone="subdued">Override default text for buttons, forms, and emails.</Text>
                          <TextField label="'Notify Me' button text" value="Notify Me When Available" autoComplete="off" />
                          <TextField label="Form title" value="Get notified when this item is back in stock" autoComplete="off" />
                          <TextField label="Success message" value="You're on the list! We'll email you when it's back." autoComplete="off" />
                          <Button variant="primary">Save Translations</Button>
                        </BlockStack>
                      </Card>
                    </Box>
                  </Layout.Section>

                  <Layout.Section variant="oneThird">
                    <Card>
                      <BlockStack gap="400">
                        <Text variant="headingMd">Supported Languages</Text>
                        <Divider />
                        <BlockStack gap="200">
                          {languages.map((lang) => (
                            <InlineStack key={lang.value} align="space-between">
                              <Text>{lang.label}</Text>
                              <Badge tone="success">✓</Badge>
                            </InlineStack>
                          ))}
                        </BlockStack>
                      </BlockStack>
                    </Card>
                  </Layout.Section>
                </Layout>
              )}
            </Box>
          </Tabs>
        </Card>

        {/* Integration Config Modal */}
        <Modal
          open={integrationModalActive}
          onClose={() => setIntegrationModalActive(false)}
          title={selectedIntegration ? `Configure ${selectedIntegration.name}` : "Configure Integration"}
          primaryAction={{
            content: selectedIntegration?.status === "connected" ? "Save Changes" : "Connect",
            onAction: () => setIntegrationModalActive(false),
          }}
          secondaryActions={[
            ...(selectedIntegration?.status === "connected" ? [{ content: "Disconnect", destructive: true, onAction: () => setIntegrationModalActive(false) }] : []),
            { content: "Cancel", onAction: () => setIntegrationModalActive(false) },
          ]}
          large
        >
          <Modal.Section>
            {renderIntegrationModal()}
          </Modal.Section>
        </Modal>

        {/* API Key Modal */}
        <Modal
          open={apiKeyModalActive}
          onClose={() => setApiKeyModalActive(false)}
          title="Generate API Key"
          primaryAction={{
            content: "Generate Key",
            onAction: () => setApiKeyModalActive(false),
          }}
          secondaryActions={[
            { content: "Cancel", onAction: () => setApiKeyModalActive(false) },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <TextField label="Key name" placeholder="e.g., Production API Key" autoComplete="off" />
              <Select
                label="Environment"
                options={[
                  { label: "Production", value: "live" },
                  { label: "Test", value: "test" },
                ]}
              />
              <ChoiceList
                title="Permissions"
                allowMultiple
                choices={[
                  { label: "Read subscribers", value: "read:subscribers" },
                  { label: "Write subscribers", value: "write:subscribers" },
                  { label: "Send notifications", value: "send:notifications" },
                  { label: "Read analytics", value: "read:analytics" },
                ]}
                selected={["read:subscribers", "read:analytics"]}
                onChange={() => {}}
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Page>
    </AppLayout>
  );
}
