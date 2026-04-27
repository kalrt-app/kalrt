/**
 * Back in Stock - Complete Module with Tabs
 * Requests | Products | Notifications | Customization
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
  Select,
  IndexTable,
  useIndexResourceState,
  TextField,
  Tabs,
  Modal,
  FormLayout,
  Checkbox,
  Banner,
  RangeSlider,
  ColorPicker,
  Popover,
  hsbToRgb,
} from "@shopify/polaris";
import {
  EmailIcon,
  MobileIcon,
  NotificationIcon,
  ExportIcon,
  DeleteIcon,
  ProductIcon,
  SendIcon,
  PaintBrushIcon,
  ViewIcon,
  CodeIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function BackInStockModule() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState("30d");
  const [modalActive, setModalActive] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [buttonColor, setButtonColor] = useState({ hue: 348, saturation: 0.8, brightness: 0.6 });
  const [colorPopoverActive, setColorPopoverActive] = useState(false);

  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);

  const tabs = [
    { id: "requests", content: "Requests", badge: "892" },
    { id: "products", content: "Products", badge: "45" },
    { id: "notifications", content: "Notifications" },
    { id: "customization", content: "Customization" },
  ];

  // Mock data - requests
  const requests = [
    { id: "1", email: "john@example.com", phone: "+1 555-0123", product: "Classic White Tee", variant: "Medium", status: "waiting", channel: "email", date: "Apr 25, 2026", source: "Product Page" },
    { id: "2", email: "sarah@test.com", phone: "", product: "Vintage Denim Jacket", variant: "Large", status: "notified", channel: "email", date: "Apr 24, 2026", source: "Collection Page" },
    { id: "3", email: "mike@demo.com", phone: "+1 555-0456", product: "Running Shoes Pro", variant: "Size 10", status: "purchased", channel: "both", date: "Apr 24, 2026", source: "Product Page" },
    { id: "4", email: "anna@mail.com", phone: "", product: "Summer Floral Dress", variant: "Small", status: "waiting", channel: "email", date: "Apr 23, 2026", source: "Homepage" },
    { id: "5", email: "chris@shop.com", phone: "+44 20 1234 5678", product: "Leather Crossbody Bag", variant: "Black", status: "notified", channel: "sms", date: "Apr 23, 2026", source: "Product Page" },
    { id: "6", email: "lisa@store.com", phone: "+1 555-0789", product: "Wireless Earbuds", variant: "White", status: "waiting", channel: "both", date: "Apr 22, 2026", source: "Product Page" },
  ];

  // Mock data - products with demand
  const products = [
    { id: "1", name: "Classic White Tee", variants: 4, totalRequests: 89, waiting: 67, notified: 18, converted: 4, conversionRate: 22, image: "https://placehold.co/40x40/f0f0f0/666?text=1" },
    { id: "2", name: "Vintage Denim Jacket", variants: 3, totalRequests: 67, waiting: 45, notified: 15, converted: 7, conversionRate: 31, image: "https://placehold.co/40x40/f0f0f0/666?text=2" },
    { id: "3", name: "Running Shoes Pro", variants: 6, totalRequests: 54, waiting: 32, notified: 18, converted: 4, conversionRate: 18, image: "https://placehold.co/40x40/f0f0f0/666?text=3" },
    { id: "4", name: "Summer Floral Dress", variants: 4, totalRequests: 43, waiting: 38, notified: 5, converted: 0, conversionRate: 0, image: "https://placehold.co/40x40/f0f0f0/666?text=4" },
    { id: "5", name: "Leather Crossbody Bag", variants: 2, totalRequests: 38, waiting: 25, notified: 10, converted: 3, conversionRate: 23, image: "https://placehold.co/40x40/f0f0f0/666?text=5" },
  ];

  // Mock data - sent notifications
  const notifications = [
    { id: "1", email: "sarah@test.com", product: "Vintage Denim Jacket", channel: "email", sentAt: "Apr 24, 2026 2:34 PM", status: "delivered", opened: true, clicked: true, purchased: false },
    { id: "2", email: "mike@demo.com", product: "Running Shoes Pro", channel: "sms", sentAt: "Apr 24, 2026 1:15 PM", status: "delivered", opened: true, clicked: true, purchased: true },
    { id: "3", email: "chris@shop.com", product: "Leather Crossbody Bag", channel: "email", sentAt: "Apr 23, 2026 4:22 PM", status: "delivered", opened: true, clicked: false, purchased: false },
    { id: "4", email: "emma@web.com", product: "Canvas Backpack", channel: "email", sentAt: "Apr 22, 2026 11:08 AM", status: "bounced", opened: false, clicked: false, purchased: false },
    { id: "5", email: "david@mail.com", product: "Wireless Earbuds", channel: "both", sentAt: "Apr 21, 2026 3:45 PM", status: "delivered", opened: true, clicked: true, purchased: true },
  ];

  const resourceName = { singular: "request", plural: "requests" };
  const { selectedResources, allResourcesSelected, handleSelectionChange } = useIndexResourceState(requests);

  const stats = {
    total: 1247,
    waiting: 892,
    notified: 298,
    purchased: 57,
    emailRate: 69.6,
    clickRate: 42.2,
    conversionRate: 12.5,
  };

  const openModal = (request: any) => {
    setSelectedRequest(request);
    setModalActive(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "waiting": return <Badge tone="info">Waiting</Badge>;
      case "notified": return <Badge tone="attention">Notified</Badge>;
      case "purchased": return <Badge tone="success">Purchased</Badge>;
      case "expired": return <Badge tone="warning">Expired</Badge>;
      case "delivered": return <Badge tone="success">Delivered</Badge>;
      case "bounced": return <Badge tone="critical">Bounced</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getChannelBadge = (channel: string) => {
    switch (channel) {
      case "email": return <Badge>Email</Badge>;
      case "sms": return <Badge tone="attention">SMS</Badge>;
      case "both": return <Badge tone="info">Email + SMS</Badge>;
      default: return <Badge>{channel}</Badge>;
    }
  };

  const bulkActions = [
    { content: "Send notification now", onAction: () => console.log("Send") },
    { content: "Export selected", onAction: () => console.log("Export") },
    { icon: DeleteIcon, destructive: true, content: "Delete", onAction: () => console.log("Delete") },
  ];

  // Convert HSB to hex for display
  const rgbColor = hsbToRgb(buttonColor);
  const hexColor = `#${Math.round(rgbColor.red * 255).toString(16).padStart(2, '0')}${Math.round(rgbColor.green * 255).toString(16).padStart(2, '0')}${Math.round(rgbColor.blue * 255).toString(16).padStart(2, '0')}`;

  return (
    <AppLayout>
      <Page
        title="Back in Stock"
        subtitle="Manage notification requests and send alerts when products restock"
        primaryAction={{ content: "Send Manual Alert", icon: NotificationIcon }}
        secondaryActions={[
          { content: "Export", icon: ExportIcon },
          { content: "Import" },
        ]}
      >
        <BlockStack gap="600">
          {/* Stats Cards */}
          <InlineGrid columns={4} gap="400">
            <Card>
              <BlockStack gap="200">
                <Text variant="bodySm" tone="subdued">Total Requests</Text>
                <Text variant="headingXl" as="h3">{stats.total.toLocaleString()}</Text>
                <InlineStack gap="100">
                  <Badge tone="success">+18.2%</Badge>
                  <Text variant="bodySm" tone="subdued">vs last period</Text>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text variant="bodySm" tone="subdued">Waiting</Text>
                <Text variant="headingXl" as="h3">{stats.waiting}</Text>
                <Text variant="bodySm" tone="subdued">Ready to notify</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text variant="bodySm" tone="subdued">Notified</Text>
                <Text variant="headingXl" as="h3">{stats.notified}</Text>
                <Text variant="bodySm" tone="subdued">This month</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <Text variant="bodySm" tone="subdued">Conversion Rate</Text>
                <Text variant="headingXl" as="h3">{stats.conversionRate}%</Text>
                <InlineStack gap="100">
                  <Badge tone="success">+2.1%</Badge>
                  <Text variant="bodySm" tone="subdued">vs last month</Text>
                </InlineStack>
              </BlockStack>
            </Card>
          </InlineGrid>

          {/* Main Content with Tabs */}
          <Card padding="0">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <Box padding="400">
                {/* Tab 0: Requests */}
                {selectedTab === 0 && (
                  <BlockStack gap="400">
                    {/* Email Performance */}
                    <Card>
                      <BlockStack gap="400">
                        <InlineStack align="space-between">
                          <Text variant="headingMd" as="h2">Email Performance</Text>
                          <Select
                            label=""
                            labelHidden
                            options={[
                              { label: "Last 7 days", value: "7d" },
                              { label: "Last 30 days", value: "30d" },
                              { label: "Last 90 days", value: "90d" },
                            ]}
                            value={dateRange}
                            onChange={setDateRange}
                          />
                        </InlineStack>
                        <InlineGrid columns={3} gap="400">
                          <BlockStack gap="200">
                            <InlineStack align="space-between">
                              <Text variant="bodySm">Open Rate</Text>
                              <Text variant="bodyMd" fontWeight="semibold">{stats.emailRate}%</Text>
                            </InlineStack>
                            <ProgressBar progress={stats.emailRate} tone="success" size="small" />
                          </BlockStack>
                          <BlockStack gap="200">
                            <InlineStack align="space-between">
                              <Text variant="bodySm">Click Rate</Text>
                              <Text variant="bodyMd" fontWeight="semibold">{stats.clickRate}%</Text>
                            </InlineStack>
                            <ProgressBar progress={stats.clickRate} tone="highlight" size="small" />
                          </BlockStack>
                          <BlockStack gap="200">
                            <InlineStack align="space-between">
                              <Text variant="bodySm">Conversion Rate</Text>
                              <Text variant="bodyMd" fontWeight="semibold">{stats.conversionRate}%</Text>
                            </InlineStack>
                            <ProgressBar progress={stats.conversionRate} size="small" />
                          </BlockStack>
                        </InlineGrid>
                      </BlockStack>
                    </Card>

                    {/* Requests Table */}
                    <IndexTable
                      resourceName={resourceName}
                      itemCount={requests.length}
                      selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
                      onSelectionChange={handleSelectionChange}
                      headings={[
                        { title: "Contact" },
                        { title: "Product" },
                        { title: "Status" },
                        { title: "Channel" },
                        { title: "Date" },
                        { title: "Source" },
                      ]}
                      bulkActions={bulkActions}
                    >
                      {requests.map((request, index) => (
                        <IndexTable.Row
                          id={request.id}
                          key={request.id}
                          selected={selectedResources.includes(request.id)}
                          position={index}
                          onClick={() => openModal(request)}
                        >
                          <IndexTable.Cell>
                            <Text variant="bodyMd" fontWeight="semibold">{request.email}</Text>
                            {request.phone && <Text variant="bodySm" tone="subdued">{request.phone}</Text>}
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <BlockStack gap="100">
                              <Text variant="bodyMd">{request.product}</Text>
                              <Text variant="bodySm" tone="subdued">{request.variant}</Text>
                            </BlockStack>
                          </IndexTable.Cell>
                          <IndexTable.Cell>{getStatusBadge(request.status)}</IndexTable.Cell>
                          <IndexTable.Cell>{getChannelBadge(request.channel)}</IndexTable.Cell>
                          <IndexTable.Cell><Text variant="bodySm" tone="subdued">{request.date}</Text></IndexTable.Cell>
                          <IndexTable.Cell><Text variant="bodySm" tone="subdued">{request.source}</Text></IndexTable.Cell>
                        </IndexTable.Row>
                      ))}
                    </IndexTable>
                  </BlockStack>
                )}

                {/* Tab 1: Products */}
                {selectedTab === 1 && (
                  <BlockStack gap="400">
                    <Banner tone="info">
                      <p>Products with the highest demand. Focus restocking efforts here for maximum revenue recovery.</p>
                    </Banner>

                    <IndexTable
                      resourceName={{ singular: "product", plural: "products" }}
                      itemCount={products.length}
                      headings={[
                        { title: "Product" },
                        { title: "Total Requests" },
                        { title: "Waiting" },
                        { title: "Notified" },
                        { title: "Converted" },
                        { title: "Conv. Rate" },
                        { title: "" },
                      ]}
                      selectable={false}
                    >
                      {products.map((product, index) => (
                        <IndexTable.Row id={product.id} key={product.id} position={index}>
                          <IndexTable.Cell>
                            <InlineStack gap="300" blockAlign="center">
                              <Thumbnail source={product.image} alt={product.name} size="small" />
                              <BlockStack gap="100">
                                <Text variant="bodyMd" fontWeight="semibold">{product.name}</Text>
                                <Text variant="bodySm" tone="subdued">{product.variants} variants</Text>
                              </BlockStack>
                            </InlineStack>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text variant="headingMd">{product.totalRequests}</Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Badge tone="info">{product.waiting}</Badge>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Badge tone="attention">{product.notified}</Badge>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Badge tone="success">{product.converted}</Badge>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text variant="bodyMd" fontWeight="semibold" tone={product.conversionRate > 20 ? "success" : "subdued"}>
                              {product.conversionRate}%
                            </Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Button size="slim" icon={SendIcon}>Notify All</Button>
                          </IndexTable.Cell>
                        </IndexTable.Row>
                      ))}
                    </IndexTable>
                  </BlockStack>
                )}

                {/* Tab 2: Notifications */}
                {selectedTab === 2 && (
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingMd">Sent Notifications</Text>
                      <Select
                        label=""
                        labelHidden
                        options={[
                          { label: "Last 7 days", value: "7d" },
                          { label: "Last 30 days", value: "30d" },
                          { label: "All time", value: "all" },
                        ]}
                        value="30d"
                      />
                    </InlineStack>

                    <IndexTable
                      resourceName={{ singular: "notification", plural: "notifications" }}
                      itemCount={notifications.length}
                      headings={[
                        { title: "Recipient" },
                        { title: "Product" },
                        { title: "Channel" },
                        { title: "Sent" },
                        { title: "Status" },
                        { title: "Opened" },
                        { title: "Clicked" },
                        { title: "Purchased" },
                      ]}
                      selectable={false}
                    >
                      {notifications.map((notif, index) => (
                        <IndexTable.Row id={notif.id} key={notif.id} position={index}>
                          <IndexTable.Cell>
                            <Text variant="bodyMd">{notif.email}</Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text variant="bodyMd">{notif.product}</Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>{getChannelBadge(notif.channel)}</IndexTable.Cell>
                          <IndexTable.Cell>
                            <Text variant="bodySm" tone="subdued">{notif.sentAt}</Text>
                          </IndexTable.Cell>
                          <IndexTable.Cell>{getStatusBadge(notif.status)}</IndexTable.Cell>
                          <IndexTable.Cell>
                            {notif.opened ? <Badge tone="success">Yes</Badge> : <Badge>No</Badge>}
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            {notif.clicked ? <Badge tone="success">Yes</Badge> : <Badge>No</Badge>}
                          </IndexTable.Cell>
                          <IndexTable.Cell>
                            {notif.purchased ? <Badge tone="success">Yes</Badge> : <Badge>No</Badge>}
                          </IndexTable.Cell>
                        </IndexTable.Row>
                      ))}
                    </IndexTable>
                  </BlockStack>
                )}

                {/* Tab 3: Customization */}
                {selectedTab === 3 && (
                  <Layout>
                    <Layout.Section>
                      <BlockStack gap="600">
                        <Card>
                          <BlockStack gap="400">
                            <Text variant="headingMd">Notify Me Button</Text>
                            <Divider />

                            <TextField
                              label="Button text"
                              value="Notify Me When Available"
                              autoComplete="off"
                            />

                            <InlineStack gap="400">
                              <div style={{ flex: 1 }}>
                                <Popover
                                  active={colorPopoverActive}
                                  activator={
                                    <Button onClick={() => setColorPopoverActive(!colorPopoverActive)} disclosure>
                                      <InlineStack gap="200" blockAlign="center">
                                        <div style={{ width: 20, height: 20, borderRadius: 4, background: hexColor }} />
                                        <Text>Button Color: {hexColor}</Text>
                                      </InlineStack>
                                    </Button>
                                  }
                                  onClose={() => setColorPopoverActive(false)}
                                >
                                  <Box padding="400">
                                    <ColorPicker onChange={setButtonColor} color={buttonColor} />
                                  </Box>
                                </Popover>
                              </div>
                            </InlineStack>

                            <Select
                              label="Button position"
                              options={[
                                { label: "Replace Add to Cart button", value: "replace" },
                                { label: "Below Add to Cart", value: "below" },
                                { label: "Above Add to Cart", value: "above" },
                              ]}
                              value="replace"
                            />

                            <Checkbox label="Show bell icon on button" checked={true} />
                            <Checkbox label="Show on collection pages" checked={true} />
                            <Checkbox label="Show on homepage featured products" checked={false} />
                          </BlockStack>
                        </Card>

                        <Card>
                          <BlockStack gap="400">
                            <Text variant="headingMd">Subscription Form</Text>
                            <Divider />

                            <TextField
                              label="Form title"
                              value="Get notified when this item is back in stock"
                              autoComplete="off"
                            />

                            <Checkbox label="Collect phone number for SMS" checked={true} />
                            <Checkbox label="Phone number required" checked={false} />
                            <Checkbox label="Show marketing consent checkbox" checked={true} />

                            <TextField
                              label="Consent text"
                              value="I agree to receive marketing emails"
                              autoComplete="off"
                            />

                            <TextField
                              label="Success message"
                              value="You're on the list! We'll email you when it's back."
                              autoComplete="off"
                            />

                            <TextField
                              label="Already subscribed message"
                              value="You're already subscribed for this product."
                              autoComplete="off"
                            />
                          </BlockStack>
                        </Card>

                        <Card>
                          <BlockStack gap="400">
                            <Text variant="headingMd">Advanced</Text>
                            <Divider />

                            <Checkbox
                              label="Remove KALRT branding"
                              checked={false}
                              helpText="Available on Growth plan and above"
                            />

                            <Checkbox
                              label="Custom CSS enabled"
                              checked={false}
                            />

                            <TextField
                              label="Custom CSS"
                              value=""
                              multiline={4}
                              placeholder=".kalrt-button { /* your styles */ }"
                              disabled
                              autoComplete="off"
                            />
                          </BlockStack>
                        </Card>

                        <Button variant="primary" size="large">Save Customization</Button>
                      </BlockStack>
                    </Layout.Section>

                    <Layout.Section variant="oneThird">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Live Preview</Text>
                          <Divider />

                          {/* Mock Product Preview */}
                          <div style={{
                            border: "1px solid #e1e3e5",
                            borderRadius: 8,
                            padding: 16,
                            background: "#fafafa"
                          }}>
                            <BlockStack gap="300">
                              <div style={{
                                width: "100%",
                                height: 150,
                                background: "#e0e0e0",
                                borderRadius: 8,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#666"
                              }}>
                                Product Image
                              </div>
                              <Text variant="headingMd">Classic White Tee</Text>
                              <Text variant="bodyLg" fontWeight="semibold">$29.99</Text>
                              <Badge tone="critical">Out of Stock</Badge>

                              {/* Preview Button */}
                              <button style={{
                                width: "100%",
                                padding: "12px 20px",
                                background: hexColor,
                                color: "#fff",
                                border: "none",
                                borderRadius: 8,
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 8,
                              }}>
                                🔔 Notify Me When Available
                              </button>
                            </BlockStack>
                          </div>

                          <Button fullWidth icon={ViewIcon}>Preview on Store</Button>
                          <Button fullWidth variant="plain" icon={CodeIcon}>Get Embed Code</Button>
                        </BlockStack>
                      </Card>

                      <Box paddingBlockStart="400">
                        <Card>
                          <BlockStack gap="400">
                            <Text variant="headingMd">Installation</Text>
                            <Divider />
                            <Badge tone="success">Theme Extension Active</Badge>
                            <Text variant="bodySm" tone="subdued">
                              The Notify Me button is automatically added to out-of-stock products.
                            </Text>
                            <Button>Manage Theme Extension</Button>
                          </BlockStack>
                        </Card>
                      </Box>
                    </Layout.Section>
                  </Layout>
                )}
              </Box>
            </Tabs>
          </Card>
        </BlockStack>

        {/* Request Detail Modal */}
        <Modal
          open={modalActive}
          onClose={() => setModalActive(false)}
          title="Request Details"
          primaryAction={{
            content: "Send Notification",
            onAction: () => setModalActive(false),
          }}
          secondaryActions={[
            { content: "Delete Request", destructive: true, onAction: () => setModalActive(false) },
          ]}
        >
          <Modal.Section>
            {selectedRequest && (
              <FormLayout>
                <TextField label="Email" value={selectedRequest.email} disabled autoComplete="off" />
                <TextField label="Phone" value={selectedRequest.phone || "Not provided"} disabled autoComplete="off" />
                <TextField label="Product" value={`${selectedRequest.product} - ${selectedRequest.variant}`} disabled autoComplete="off" />
                <InlineStack gap="400">
                  <div>
                    <Text variant="bodyMd" fontWeight="semibold">Status</Text>
                    <Box paddingBlockStart="100">{getStatusBadge(selectedRequest.status)}</Box>
                  </div>
                  <div>
                    <Text variant="bodyMd" fontWeight="semibold">Channel</Text>
                    <Box paddingBlockStart="100">{getChannelBadge(selectedRequest.channel)}</Box>
                  </div>
                </InlineStack>
                <TextField label="Signed up" value={selectedRequest.date} disabled autoComplete="off" />
                <TextField label="Source" value={selectedRequest.source} disabled autoComplete="off" />
              </FormLayout>
            )}
          </Modal.Section>
        </Modal>
      </Page>
    </AppLayout>
  );
}
