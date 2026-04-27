/**
 * Email Templates Page
 * Customizable notification templates for all channels
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
  TextField,
  Select,
  Tabs,
  Modal,
  FormLayout,
  Checkbox,
  Banner,
  Thumbnail,
} from "@shopify/polaris";
import {
  EmailIcon,
  MobileIcon,
  EditIcon,
  ViewIcon,
  DuplicateIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function Templates() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);

  const tabs = [
    { id: "back-in-stock", content: "Back in Stock" },
    { id: "preorder", content: "PreOrder" },
    { id: "wishlist", content: "Wishlist" },
    { id: "low-stock", content: "Low Stock" },
  ];

  const templates = {
    backInStock: [
      {
        id: "bis-default",
        name: "Default Restock Alert",
        type: "email",
        subject: "Good news! {{product_name}} is back in stock!",
        status: "active",
        openRate: 68.2,
        clickRate: 24.5,
        lastEdited: "2 days ago",
      },
      {
        id: "bis-urgency",
        name: "Urgency Restock",
        type: "email",
        subject: "HURRY! {{product_name}} just restocked - limited quantity!",
        status: "active",
        openRate: 72.1,
        clickRate: 28.9,
        lastEdited: "1 week ago",
      },
      {
        id: "bis-sms",
        name: "SMS Restock Alert",
        type: "sms",
        subject: "{{product_name}} is back! Shop now: {{product_url}}",
        status: "active",
        openRate: 94.2,
        clickRate: 18.7,
        lastEdited: "3 days ago",
      },
    ],
    preorder: [
      {
        id: "pre-confirmation",
        name: "PreOrder Confirmation",
        type: "email",
        subject: "Your pre-order for {{product_name}} is confirmed!",
        status: "active",
        openRate: 89.5,
        clickRate: 12.3,
        lastEdited: "1 week ago",
      },
      {
        id: "pre-shipping",
        name: "PreOrder Shipping Update",
        type: "email",
        subject: "Great news! Your pre-order is shipping soon",
        status: "active",
        openRate: 78.4,
        clickRate: 34.2,
        lastEdited: "2 weeks ago",
      },
      {
        id: "pre-reminder",
        name: "Payment Reminder",
        type: "email",
        subject: "Complete your pre-order payment for {{product_name}}",
        status: "active",
        openRate: 65.8,
        clickRate: 45.6,
        lastEdited: "5 days ago",
      },
    ],
    wishlist: [
      {
        id: "wl-price-drop",
        name: "Price Drop Alert",
        type: "email",
        subject: "Price drop! {{product_name}} is now {{discount}}% off",
        status: "active",
        openRate: 74.3,
        clickRate: 32.1,
        lastEdited: "3 days ago",
      },
      {
        id: "wl-reminder",
        name: "Weekly Wishlist Reminder",
        type: "email",
        subject: "Don't forget! You have items waiting in your wishlist",
        status: "paused",
        openRate: 45.2,
        clickRate: 15.8,
        lastEdited: "2 weeks ago",
      },
      {
        id: "wl-low-stock",
        name: "Wishlist Item Low Stock",
        type: "email",
        subject: "Running low! {{product_name}} from your wishlist is almost gone",
        status: "active",
        openRate: 71.8,
        clickRate: 38.4,
        lastEdited: "1 week ago",
      },
    ],
    lowStock: [
      {
        id: "ls-merchant",
        name: "Merchant Low Stock Alert",
        type: "email",
        subject: "[KALRT] Low stock alert: {{product_name}} has {{stock_count}} left",
        status: "active",
        openRate: 98.2,
        clickRate: 67.5,
        lastEdited: "1 day ago",
      },
      {
        id: "ls-daily",
        name: "Daily Inventory Summary",
        type: "email",
        subject: "[KALRT] Daily inventory report - {{date}}",
        status: "active",
        openRate: 92.1,
        clickRate: 45.3,
        lastEdited: "5 days ago",
      },
    ],
  };

  const currentTemplates = [
    templates.backInStock,
    templates.preorder,
    templates.wishlist,
    templates.lowStock,
  ][selectedTab];

  const openEditModal = (template: any) => {
    setSelectedTemplate(template);
    setEditModalOpen(true);
  };

  const openPreviewModal = (template: any) => {
    setSelectedTemplate(template);
    setPreviewModalOpen(true);
  };

  return (
    <AppLayout>
      <Page
        title="Email Templates"
        subtitle="Customize your notification templates"
        primaryAction={{
          content: "Create Template",
          icon: EmailIcon,
        }}
        secondaryActions={[
          { content: "Import Template" },
          { content: "Template Gallery" },
        ]}
      >
        <BlockStack gap="600">
          <Banner tone="info">
            <p>Personalize your templates with variables like <code>{`{{product_name}}`}</code>, <code>{`{{customer_name}}`}</code>, <code>{`{{product_url}}`}</code>, and more.</p>
          </Banner>

          <Card padding="0">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <Box padding="400">
                <BlockStack gap="400">
                  {currentTemplates.map((template) => (
                    <Card key={template.id}>
                      <InlineStack align="space-between" blockAlign="center">
                        <InlineStack gap="400" blockAlign="center">
                          <div style={{
                            width: 48,
                            height: 48,
                            borderRadius: 8,
                            background: template.type === "email" ? "rgba(44, 110, 203, 0.1)" : "rgba(255, 184, 0, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            {template.type === "email" ? (
                              <span style={{ fontSize: "1.5rem" }}>mail</span>
                            ) : (
                              <span style={{ fontSize: "1.5rem" }}>sms</span>
                            )}
                          </div>
                          <BlockStack gap="100">
                            <InlineStack gap="200" blockAlign="center">
                              <Text variant="bodyMd" fontWeight="semibold">{template.name}</Text>
                              <Badge tone={template.type === "email" ? "info" : "attention"}>
                                {template.type === "email" ? "Email" : "SMS"}
                              </Badge>
                              <Badge tone={template.status === "active" ? "success" : "warning"}>
                                {template.status === "active" ? "Active" : "Paused"}
                              </Badge>
                            </InlineStack>
                            <Text variant="bodySm" tone="subdued">
                              Subject: {template.subject}
                            </Text>
                            <InlineStack gap="400">
                              <Text variant="bodySm" tone="subdued">
                                Open: <Text as="span" fontWeight="semibold" tone="success">{template.openRate}%</Text>
                              </Text>
                              <Text variant="bodySm" tone="subdued">
                                Click: <Text as="span" fontWeight="semibold">{template.clickRate}%</Text>
                              </Text>
                              <Text variant="bodySm" tone="subdued">
                                Edited: {template.lastEdited}
                              </Text>
                            </InlineStack>
                          </BlockStack>
                        </InlineStack>
                        <InlineStack gap="200">
                          <Button size="slim" icon={ViewIcon} onClick={() => openPreviewModal(template)}>Preview</Button>
                          <Button size="slim" icon={EditIcon} onClick={() => openEditModal(template)}>Edit</Button>
                          <Button size="slim" icon={DuplicateIcon} variant="plain">Duplicate</Button>
                        </InlineStack>
                      </InlineStack>
                    </Card>
                  ))}

                  <Button>+ Add New Template</Button>
                </BlockStack>
              </Box>
            </Tabs>
          </Card>

          {/* Template Variables Reference */}
          <Layout>
            <Layout.Section>
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Available Variables</Text>
                  <Divider />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
                    {[
                      { var: "{{customer_name}}", desc: "Customer's first name" },
                      { var: "{{customer_email}}", desc: "Customer's email" },
                      { var: "{{product_name}}", desc: "Product title" },
                      { var: "{{product_url}}", desc: "Product page link" },
                      { var: "{{product_image}}", desc: "Product image URL" },
                      { var: "{{product_price}}", desc: "Current price" },
                      { var: "{{variant_name}}", desc: "Variant (size, color)" },
                      { var: "{{stock_count}}", desc: "Current inventory" },
                      { var: "{{shop_name}}", desc: "Your store name" },
                      { var: "{{discount}}", desc: "Discount percentage" },
                      { var: "{{date}}", desc: "Current date" },
                      { var: "{{unsubscribe_url}}", desc: "Unsubscribe link" },
                    ].map((v, i) => (
                      <div key={i}>
                        <code style={{
                          background: "rgba(0,0,0,0.1)",
                          padding: "2px 6px",
                          borderRadius: 4,
                          fontSize: "0.85rem",
                        }}>{v.var}</code>
                        <Text variant="bodySm" tone="subdued"> - {v.desc}</Text>
                      </div>
                    ))}
                  </div>
                </BlockStack>
              </Card>
            </Layout.Section>
            <Layout.Section variant="oneThird">
              <Card>
                <BlockStack gap="400">
                  <Text variant="headingMd" as="h2">Best Practices</Text>
                  <Divider />
                  <BlockStack gap="200">
                    <Text variant="bodySm">Use customer's name for personalization</Text>
                    <Text variant="bodySm">Keep subject lines under 50 characters</Text>
                    <Text variant="bodySm">Include product image in email body</Text>
                    <Text variant="bodySm">Add urgency for restocks ("limited stock")</Text>
                    <Text variant="bodySm">Always include unsubscribe link</Text>
                    <Text variant="bodySm">Test with A/B variations</Text>
                  </BlockStack>
                </BlockStack>
              </Card>
            </Layout.Section>
          </Layout>
        </BlockStack>

        {/* Edit Modal */}
        <Modal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={`Edit Template: ${selectedTemplate?.name || ""}`}
          primaryAction={{
            content: "Save Changes",
            onAction: () => setEditModalOpen(false),
          }}
          secondaryActions={[
            {
              content: "Cancel",
              onAction: () => setEditModalOpen(false),
            },
          ]}
          large
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Template Name"
                value={selectedTemplate?.name || ""}
                autoComplete="off"
              />
              <Select
                label="Template Type"
                options={[
                  { label: "Email", value: "email" },
                  { label: "SMS", value: "sms" },
                ]}
                value={selectedTemplate?.type || "email"}
              />
              <TextField
                label="Subject Line"
                value={selectedTemplate?.subject || ""}
                autoComplete="off"
                helpText="Use variables like {{product_name}} for personalization"
              />
              <TextField
                label="Email Body"
                value={`Hi {{customer_name}},\n\nGreat news! The product you've been waiting for is back in stock:\n\n{{product_name}} - {{variant_name}}\n\nShop now: {{product_url}}\n\nDon't wait - these tend to sell out fast!\n\nThanks,\n{{shop_name}}`}
                multiline={8}
                autoComplete="off"
              />
              <Checkbox
                label="Enable this template"
                checked={selectedTemplate?.status === "active"}
              />
            </FormLayout>
          </Modal.Section>
        </Modal>

        {/* Preview Modal */}
        <Modal
          open={previewModalOpen}
          onClose={() => setPreviewModalOpen(false)}
          title={`Preview: ${selectedTemplate?.name || ""}`}
          large
        >
          <Modal.Section>
            <div style={{
              background: "#f6f6f7",
              padding: "2rem",
              borderRadius: 8,
            }}>
              <div style={{
                background: "#fff",
                maxWidth: 600,
                margin: "0 auto",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}>
                {/* Email Header */}
                <div style={{
                  background: "linear-gradient(135deg, #e94560, #ff6b6b)",
                  padding: "2rem",
                  textAlign: "center",
                  color: "#fff",
                }}>
                  <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>KALRT</div>
                  <div style={{ opacity: 0.9, marginTop: "0.5rem" }}>Your Store Name</div>
                </div>
                {/* Email Body */}
                <div style={{ padding: "2rem", color: "#333" }}>
                  <h2 style={{ marginBottom: "1rem", color: "#1a1a1a" }}>Good news! Your item is back!</h2>
                  <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    Hi Sarah,
                  </p>
                  <p style={{ marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    The product you've been waiting for is back in stock:
                  </p>
                  {/* Product Card */}
                  <div style={{
                    display: "flex",
                    gap: "1rem",
                    padding: "1rem",
                    background: "#f9f9f9",
                    borderRadius: 8,
                    marginBottom: "1.5rem",
                  }}>
                    <div style={{
                      width: 80,
                      height: 80,
                      background: "#e0e0e0",
                      borderRadius: 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      [IMG]
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: "0.25rem" }}>Classic White Tee</div>
                      <div style={{ color: "#666", fontSize: "0.9rem" }}>Size: Medium</div>
                      <div style={{ color: "#e94560", fontWeight: 600, marginTop: "0.5rem" }}>$29.99</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button style={{
                      background: "#e94560",
                      color: "#fff",
                      border: "none",
                      padding: "1rem 2rem",
                      borderRadius: 8,
                      fontSize: "1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}>
                      Shop Now
                    </button>
                  </div>
                  <p style={{ marginTop: "1.5rem", lineHeight: 1.6, color: "#666" }}>
                    Don't wait - these tend to sell out fast!
                  </p>
                </div>
                {/* Email Footer */}
                <div style={{
                  padding: "1.5rem 2rem",
                  background: "#f9f9f9",
                  textAlign: "center",
                  color: "#999",
                  fontSize: "0.85rem",
                }}>
                  <p>Thanks for shopping with us!</p>
                  <p style={{ marginTop: "0.5rem" }}>
                    <a href="#" style={{ color: "#666" }}>Unsubscribe</a> | <a href="#" style={{ color: "#666" }}>View in browser</a>
                  </p>
                </div>
              </div>
            </div>
          </Modal.Section>
        </Modal>
      </Page>
    </AppLayout>
  );
}
