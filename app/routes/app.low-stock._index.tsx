/**
 * Low Stock Module - FOMO alerts and merchant notifications
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
  TextField,
  Tabs,
  Checkbox,
  RangeSlider,
  Banner,
  Tooltip,
} from "@shopify/polaris";
import {
  InventoryIcon,
  AlertTriangleIcon,
  ViewIcon,
  NotificationIcon,
  SettingsIcon,
  ProductIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function LowStockOverview() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [threshold, setThreshold] = useState(5);

  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);
  const handleThresholdChange = useCallback((value: number) => setThreshold(value), []);

  const tabs = [
    { id: "products", content: "Low Stock Products", badge: "12" },
    { id: "alerts", content: "Customer Alerts" },
    { id: "settings", content: "Settings" },
  ];

  // Mock data
  const stats = {
    lowStockProducts: 12,
    criticalProducts: 3,
    alertsSent: 34,
    conversions: 8,
  };

  const lowStockProducts = [
    { id: "1", name: "Classic White Tee", variant: "Medium", stock: 3, threshold: 5, status: "low", alertEnabled: true, customerAlerts: 12, image: "https://placehold.co/40x40/f0f0f0/666?text=1" },
    { id: "2", name: "Vintage Denim Jacket", variant: "Large", stock: 1, threshold: 5, status: "critical", alertEnabled: true, customerAlerts: 8, image: "https://placehold.co/40x40/f0f0f0/666?text=2" },
    { id: "3", name: "Running Shoes Pro", variant: "Size 10", stock: 4, threshold: 5, status: "low", alertEnabled: true, customerAlerts: 5, image: "https://placehold.co/40x40/f0f0f0/666?text=3" },
    { id: "4", name: "Summer Floral Dress", variant: "Small", stock: 0, threshold: 5, status: "out", alertEnabled: false, customerAlerts: 15, image: "https://placehold.co/40x40/f0f0f0/666?text=4" },
    { id: "5", name: "Leather Crossbody Bag", variant: "Black", stock: 2, threshold: 5, status: "critical", alertEnabled: true, customerAlerts: 3, image: "https://placehold.co/40x40/f0f0f0/666?text=5" },
    { id: "6", name: "Wireless Earbuds", variant: "White", stock: 5, threshold: 5, status: "low", alertEnabled: false, customerAlerts: 0, image: "https://placehold.co/40x40/f0f0f0/666?text=6" },
    { id: "7", name: "Canvas Backpack", variant: "Navy", stock: 1, threshold: 3, status: "critical", alertEnabled: true, customerAlerts: 7, image: "https://placehold.co/40x40/f0f0f0/666?text=7" },
  ];

  const customerAlerts = [
    { id: "1", product: "Classic White Tee - M", message: "Only 3 left!", views: 234, clicks: 45, conversions: 8, status: "active" },
    { id: "2", product: "Vintage Denim Jacket - L", message: "Almost sold out!", views: 189, clicks: 38, conversions: 5, status: "active" },
    { id: "3", product: "Running Shoes Pro - 10", message: "Low stock - order soon!", views: 156, clicks: 28, conversions: 3, status: "active" },
    { id: "4", product: "Leather Crossbody Bag", message: "Only 2 remaining!", views: 98, clicks: 15, conversions: 2, status: "active" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "critical": return <Badge tone="critical">Critical</Badge>;
      case "low": return <Badge tone="warning">Low</Badge>;
      case "out": return <Badge tone="critical">Out of Stock</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getStockIndicator = (stock: number, threshold: number) => {
    const percentage = Math.min((stock / threshold) * 100, 100);
    const tone = stock === 0 ? "critical" : stock <= threshold / 2 ? "critical" : "warning";
    return (
      <div style={{ width: 60 }}>
        <ProgressBar progress={percentage} tone={tone} size="small" />
      </div>
    );
  };

  const productRowMarkup = lowStockProducts.map((product, index) => (
    <IndexTable.Row
      id={product.id}
      key={product.id}
      position={index}
    >
      <IndexTable.Cell>
        <InlineStack gap="300" blockAlign="center">
          <Thumbnail source={product.image} alt={product.name} size="small" />
          <BlockStack gap="100">
            <Text variant="bodyMd" fontWeight="semibold">{product.name}</Text>
            <Text variant="bodySm" tone="subdued">{product.variant}</Text>
          </BlockStack>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="200" blockAlign="center">
          <Text variant="headingMd" fontWeight="bold" tone={product.stock <= 2 ? "critical" : "caution"}>
            {product.stock}
          </Text>
          {getStockIndicator(product.stock, product.threshold)}
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodySm" tone="subdued">{product.threshold}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{getStatusBadge(product.status)}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone={product.alertEnabled ? "success" : "info"}>
          {product.alertEnabled ? "Enabled" : "Disabled"}
        </Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {product.customerAlerts > 0 ? (
          <Badge tone="info">{product.customerAlerts} waiting</Badge>
        ) : (
          <Text variant="bodySm" tone="subdued">—</Text>
        )}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="200">
          <Button size="slim">Restock</Button>
          <Button size="slim" variant="plain">Edit</Button>
        </InlineStack>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  const alertRowMarkup = customerAlerts.map((alert, index) => (
    <IndexTable.Row
      id={alert.id}
      key={alert.id}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold">{alert.product}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge>{alert.message}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd">{alert.views.toLocaleString()}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd">{alert.clicks}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold" tone="success">{alert.conversions}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge tone="success">{alert.status}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Button size="slim" variant="plain">Edit</Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <AppLayout>
      <Page
        title="Low Stock"
        subtitle="Create urgency with low stock alerts and manage inventory"
        secondaryActions={[
          { content: "Export Inventory" },
          { content: "Sync Stock" },
        ]}
      >
        <BlockStack gap="600">
          {/* Stats Cards */}
          <InlineGrid columns={4} gap="400">
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={InventoryIcon} tone="warning" />
                  <Text variant="bodySm" tone="subdued">Low Stock</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.lowStockProducts}</Text>
                <Text variant="bodySm" tone="subdued">products below threshold</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={AlertTriangleIcon} tone="critical" />
                  <Text variant="bodySm" tone="subdued">Critical</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3" tone="critical">{stats.criticalProducts}</Text>
                <Text variant="bodySm" tone="subdued">need immediate restock</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={ViewIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">Alerts Shown</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.alertsSent}</Text>
                <Text variant="bodySm" tone="subdued">this month</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={ProductIcon} tone="success" />
                  <Text variant="bodySm" tone="subdued">Conversions</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.conversions}</Text>
                <Text variant="bodySm" tone="success">from FOMO alerts</Text>
              </BlockStack>
            </Card>
          </InlineGrid>

          {/* Alert Banner */}
          {stats.criticalProducts > 0 && (
            <Banner
              title={`${stats.criticalProducts} products are critically low!`}
              tone="critical"
              action={{ content: "View Critical Products" }}
            >
              <p>These products have only 1-2 items left and may sell out soon.</p>
            </Banner>
          )}

          {/* Tabs Content */}
          <Card padding="0">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <Box padding="400">
                {selectedTab === 0 && (
                  <IndexTable
                    resourceName={{ singular: "product", plural: "products" }}
                    itemCount={lowStockProducts.length}
                    headings={[
                      { title: "Product" },
                      { title: "Stock" },
                      { title: "Threshold" },
                      { title: "Status" },
                      { title: "Customer Alert" },
                      { title: "Waiting" },
                      { title: "" },
                    ]}
                    selectable={false}
                  >
                    {productRowMarkup}
                  </IndexTable>
                )}

                {selectedTab === 1 && (
                  <BlockStack gap="400">
                    <Banner tone="info">
                      <p>"Only X left" badges create urgency and increase conversion rates by up to 23%.</p>
                    </Banner>

                    <IndexTable
                      resourceName={{ singular: "alert", plural: "alerts" }}
                      itemCount={customerAlerts.length}
                      headings={[
                        { title: "Product" },
                        { title: "Message" },
                        { title: "Views" },
                        { title: "Clicks" },
                        { title: "Conversions" },
                        { title: "Status" },
                        { title: "" },
                      ]}
                      selectable={false}
                    >
                      {alertRowMarkup}
                    </IndexTable>
                  </BlockStack>
                )}

                {selectedTab === 2 && (
                  <Layout>
                    <Layout.Section>
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Low Stock Threshold</Text>
                          <Divider />

                          <BlockStack gap="300">
                            <Text variant="bodyMd">Default threshold for all products</Text>
                            <RangeSlider
                              label="Units"
                              value={threshold}
                              onChange={handleThresholdChange}
                              output
                              min={1}
                              max={20}
                            />
                            <Text variant="bodySm" tone="subdued">
                              Products with {threshold} or fewer units will be marked as "Low Stock"
                            </Text>
                          </BlockStack>

                          <Divider />

                          <BlockStack gap="300">
                            <Text variant="bodyMd" fontWeight="semibold">Customer Alerts (FOMO)</Text>
                            <Checkbox
                              label="Show 'Only X left' badge on product pages"
                              checked={true}
                            />
                            <Checkbox
                              label="Show low stock indicator on collection pages"
                              checked={true}
                            />
                            <Checkbox
                              label="Show in cart for low stock items"
                              checked={false}
                            />

                            <TextField
                              label="Custom message template"
                              value="Only {stock} left in stock!"
                              helpText="Use {stock} for current inventory count"
                              autoComplete="off"
                            />
                          </BlockStack>

                          <Divider />

                          <BlockStack gap="300">
                            <Text variant="bodyMd" fontWeight="semibold">Merchant Alerts</Text>
                            <Checkbox
                              label="Email me when products hit low stock threshold"
                              checked={true}
                            />
                            <Checkbox
                              label="Email me daily low stock summary"
                              checked={false}
                            />
                            <TextField
                              label="Alert email"
                              type="email"
                              value="store@example.com"
                              autoComplete="off"
                            />
                          </BlockStack>

                          <Button variant="primary">Save Settings</Button>
                        </BlockStack>
                      </Card>
                    </Layout.Section>

                    <Layout.Section variant="oneThird">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Badge Appearance</Text>
                          <Divider />
                          <Select
                            label="Badge style"
                            options={[
                              { label: "Red badge", value: "red" },
                              { label: "Orange badge", value: "orange" },
                              { label: "Text only", value: "text" },
                            ]}
                            value="red"
                          />
                          <Select
                            label="Position"
                            options={[
                              { label: "Below price", value: "below-price" },
                              { label: "Above add to cart", value: "above-cart" },
                              { label: "Next to stock status", value: "stock" },
                            ]}
                            value="below-price"
                          />
                          <Checkbox
                            label="Animate badge"
                            checked={false}
                            helpText="Subtle pulse animation"
                          />
                          <Button>Preview Badge</Button>
                        </BlockStack>
                      </Card>

                      <Box paddingBlockStart="400">
                        <Card>
                          <BlockStack gap="400">
                            <Text variant="headingMd">Exclusions</Text>
                            <Divider />
                            <Checkbox
                              label="Hide alerts for products with 'continue selling'"
                              checked={false}
                            />
                            <Checkbox
                              label="Exclude products by tag"
                              checked={false}
                            />
                            <TextField
                              label="Excluded tags"
                              placeholder="no-fomo, always-available"
                              disabled
                              autoComplete="off"
                            />
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
      </Page>
    </AppLayout>
  );
}
