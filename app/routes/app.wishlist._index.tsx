/**
 * Wishlist Module - Main Page
 * Customer wishlists, products, reminders
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
  Avatar,
} from "@shopify/polaris";
import {
  HeartIcon,
  PersonIcon,
  ProductIcon,
  EmailIcon,
  CartIcon,
  ViewIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function WishlistOverview() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState("30d");
  const [modalActive, setModalActive] = useState(false);

  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);

  const tabs = [
    { id: "wishlists", content: "Wishlists", badge: "567" },
    { id: "products", content: "Products", badge: "234" },
    { id: "reminders", content: "Reminders" },
    { id: "settings", content: "Settings" },
  ];

  // Mock data
  const stats = {
    totalWishlists: 567,
    totalItems: 2341,
    itemsTrend: 8.7,
    conversions: 45,
    conversionRate: 7.9,
    revenue: 3892,
    avgItemsPerList: 4.1,
  };

  const wishlists = [
    { id: "1", customer: "John Smith", email: "john@example.com", items: 8, created: "Apr 25, 2026", lastActive: "2 hours ago", status: "active" },
    { id: "2", customer: "Sarah Johnson", email: "sarah@test.com", items: 5, created: "Apr 24, 2026", lastActive: "1 day ago", status: "active" },
    { id: "3", customer: "Guest", email: "—", items: 3, created: "Apr 24, 2026", lastActive: "3 hours ago", status: "guest" },
    { id: "4", customer: "Mike Wilson", email: "mike@demo.com", items: 12, created: "Apr 20, 2026", lastActive: "5 days ago", status: "inactive" },
    { id: "5", customer: "Anna Davis", email: "anna@mail.com", items: 6, created: "Apr 18, 2026", lastActive: "1 week ago", status: "converted" },
    { id: "6", customer: "Guest", email: "—", items: 2, created: "Apr 17, 2026", lastActive: "2 weeks ago", status: "guest" },
  ];

  const products = [
    { id: "1", name: "Classic White Tee", variant: "All variants", wishlists: 89, adds: 156, removes: 34, conversions: 12, revenue: 468 },
    { id: "2", name: "Vintage Denim Jacket", variant: "All variants", wishlists: 67, adds: 112, removes: 28, conversions: 8, revenue: 792 },
    { id: "3", name: "Running Shoes Pro", variant: "All variants", wishlists: 54, adds: 89, removes: 18, conversions: 6, revenue: 774 },
    { id: "4", name: "Summer Floral Dress", variant: "All variants", wishlists: 43, adds: 67, removes: 12, conversions: 5, revenue: 345 },
    { id: "5", name: "Leather Crossbody Bag", variant: "All variants", wishlists: 38, adds: 52, removes: 8, conversions: 4, revenue: 476 },
  ];

  const reminders = [
    { id: "1", type: "price_drop", name: "Price Drop Alert", sent: 45, opened: 32, clicked: 18, conversions: 5, status: "active" },
    { id: "2", type: "low_stock", name: "Low Stock Alert", sent: 23, opened: 19, clicked: 12, conversions: 3, status: "active" },
    { id: "3", type: "back_in_stock", name: "Back in Stock", sent: 67, opened: 51, clicked: 34, conversions: 8, status: "active" },
    { id: "4", type: "reminder", name: "Weekly Reminder", sent: 120, opened: 78, clicked: 25, conversions: 4, status: "paused" },
  ];

  const resourceName = {
    singular: "wishlist",
    plural: "wishlists",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(wishlists);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge tone="success">Active</Badge>;
      case "guest": return <Badge tone="info">Guest</Badge>;
      case "inactive": return <Badge tone="warning">Inactive</Badge>;
      case "converted": return <Badge tone="success">Converted</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const wishlistRowMarkup = wishlists.map((wishlist, index) => (
    <IndexTable.Row
      id={wishlist.id}
      key={wishlist.id}
      selected={selectedResources.includes(wishlist.id)}
      position={index}
    >
      <IndexTable.Cell>
        <InlineStack gap="300" blockAlign="center">
          <Avatar customer size="sm" name={wishlist.customer} />
          <BlockStack gap="100">
            <Text variant="bodyMd" fontWeight="semibold">{wishlist.customer}</Text>
            <Text variant="bodySm" tone="subdued">{wishlist.email}</Text>
          </BlockStack>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold">{wishlist.items} items</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>{getStatusBadge(wishlist.status)}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodySm" tone="subdued">{wishlist.created}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodySm" tone="subdued">{wishlist.lastActive}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Button size="slim" icon={ViewIcon}>View</Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  const productRowMarkup = products.map((product, index) => (
    <IndexTable.Row
      id={product.id}
      key={product.id}
      position={index}
    >
      <IndexTable.Cell>
        <InlineStack gap="300" blockAlign="center">
          <Thumbnail
            source="https://placehold.co/40x40/f0f0f0/666?text=P"
            alt={product.name}
            size="small"
          />
          <BlockStack gap="100">
            <Text variant="bodyMd" fontWeight="semibold">{product.name}</Text>
            <Text variant="bodySm" tone="subdued">{product.variant}</Text>
          </BlockStack>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold">{product.wishlists}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <InlineStack gap="100">
          <Text variant="bodySm" tone="success">+{product.adds}</Text>
          <Text variant="bodySm" tone="subdued">/</Text>
          <Text variant="bodySm" tone="critical">-{product.removes}</Text>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd">{product.conversions}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold" tone="success">${product.revenue}</Text>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <AppLayout>
      <Page
        title="Wishlist"
        subtitle="Let customers save products and send them reminders"
        primaryAction={{ content: "Send Reminder", icon: EmailIcon }}
        secondaryActions={[
          { content: "Export" },
          { content: "Widget Settings" },
        ]}
      >
        <BlockStack gap="600">
          {/* Stats Cards */}
          <InlineGrid columns={4} gap="400">
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={HeartIcon} tone="critical" />
                  <Text variant="bodySm" tone="subdued">Total Wishlists</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.totalWishlists}</Text>
                <Text variant="bodySm" tone="subdued">{stats.totalItems.toLocaleString()} items saved</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={PersonIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">Avg Items/List</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.avgItemsPerList}</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={CartIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">Conversions</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.conversions}</Text>
                <Text variant="bodySm" tone="success">{stats.conversionRate}% rate</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Text variant="headingLg">$</Text>
                  <Text variant="bodySm" tone="subdued">Revenue</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">${stats.revenue.toLocaleString()}</Text>
                <Text variant="bodySm" tone="subdued">From wishlist items</Text>
              </BlockStack>
            </Card>
          </InlineGrid>

          {/* Tabs Content */}
          <Card padding="0">
            <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange}>
              <Box padding="400">
                {selectedTab === 0 && (
                  <IndexTable
                    resourceName={resourceName}
                    itemCount={wishlists.length}
                    selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
                    onSelectionChange={handleSelectionChange}
                    headings={[
                      { title: "Customer" },
                      { title: "Items" },
                      { title: "Status" },
                      { title: "Created" },
                      { title: "Last Active" },
                      { title: "" },
                    ]}
                    bulkActions={[
                      { content: "Send reminder email" },
                      { content: "Export" },
                    ]}
                  >
                    {wishlistRowMarkup}
                  </IndexTable>
                )}

                {selectedTab === 1 && (
                  <IndexTable
                    resourceName={{ singular: "product", plural: "products" }}
                    itemCount={products.length}
                    headings={[
                      { title: "Product" },
                      { title: "In Wishlists" },
                      { title: "Adds/Removes" },
                      { title: "Conversions" },
                      { title: "Revenue" },
                    ]}
                    selectable={false}
                  >
                    {productRowMarkup}
                  </IndexTable>
                )}

                {selectedTab === 2 && (
                  <BlockStack gap="400">
                    <Banner tone="info">
                      <p>Wishlist reminders help convert saved items to purchases. Set up automated emails based on triggers.</p>
                    </Banner>

                    {reminders.map((reminder) => (
                      <Card key={reminder.id}>
                        <InlineStack align="space-between" blockAlign="center">
                          <InlineStack gap="400" blockAlign="center">
                            <div style={{
                              width: 48,
                              height: 48,
                              borderRadius: 8,
                              background: reminder.status === "active" ? "rgba(0, 164, 124, 0.1)" : "#f6f6f7",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}>
                              <Icon source={EmailIcon} tone={reminder.status === "active" ? "success" : "subdued"} />
                            </div>
                            <BlockStack gap="100">
                              <InlineStack gap="200">
                                <Text variant="bodyMd" fontWeight="semibold">{reminder.name}</Text>
                                <Badge tone={reminder.status === "active" ? "success" : "warning"}>
                                  {reminder.status === "active" ? "Active" : "Paused"}
                                </Badge>
                              </InlineStack>
                              <InlineStack gap="400">
                                <Text variant="bodySm" tone="subdued">Sent: {reminder.sent}</Text>
                                <Text variant="bodySm" tone="subdued">Opened: {reminder.opened} ({Math.round(reminder.opened/reminder.sent*100)}%)</Text>
                                <Text variant="bodySm" tone="subdued">Clicked: {reminder.clicked}</Text>
                                <Text variant="bodySm" tone="success">Conversions: {reminder.conversions}</Text>
                              </InlineStack>
                            </BlockStack>
                          </InlineStack>
                          <InlineStack gap="200">
                            <Button size="slim">Edit</Button>
                            <Button size="slim" variant={reminder.status === "active" ? "secondary" : "primary"}>
                              {reminder.status === "active" ? "Pause" : "Activate"}
                            </Button>
                          </InlineStack>
                        </InlineStack>
                      </Card>
                    ))}

                    <Button icon={EmailIcon}>Create New Reminder</Button>
                  </BlockStack>
                )}

                {selectedTab === 3 && (
                  <Layout>
                    <Layout.Section>
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Widget Settings</Text>
                          <Divider />

                          <BlockStack gap="300">
                            <Text variant="bodyMd" fontWeight="semibold">Heart Button</Text>
                            <Checkbox
                              label="Show on product cards"
                              checked={true}
                            />
                            <Checkbox
                              label="Show on product pages"
                              checked={true}
                            />
                            <Checkbox
                              label="Show on collection pages"
                              checked={true}
                            />
                          </BlockStack>

                          <Divider />

                          <BlockStack gap="300">
                            <Text variant="bodyMd" fontWeight="semibold">Wishlist Drawer</Text>
                            <Checkbox
                              label="Enable floating wishlist button"
                              checked={true}
                            />
                            <Select
                              label="Position"
                              options={[
                                { label: "Bottom Left", value: "bottom-left" },
                                { label: "Bottom Right", value: "bottom-right" },
                              ]}
                              value="bottom-left"
                            />
                          </BlockStack>

                          <Divider />

                          <BlockStack gap="300">
                            <Text variant="bodyMd" fontWeight="semibold">Guest Wishlist</Text>
                            <Checkbox
                              label="Allow guests to save items without login"
                              checked={true}
                              helpText="Items saved in browser, synced when customer logs in"
                            />
                            <Checkbox
                              label="Prompt for email to save wishlist"
                              checked={false}
                            />
                          </BlockStack>

                          <Button variant="primary">Save Settings</Button>
                        </BlockStack>
                      </Card>
                    </Layout.Section>

                    <Layout.Section variant="oneThird">
                      <Card>
                        <BlockStack gap="400">
                          <Text variant="headingMd">Appearance</Text>
                          <Divider />
                          <TextField
                            label="Button color"
                            value="#e94560"
                            autoComplete="off"
                          />
                          <Select
                            label="Icon style"
                            options={[
                              { label: "Filled heart", value: "filled" },
                              { label: "Outline heart", value: "outline" },
                              { label: "Star", value: "star" },
                            ]}
                            value="filled"
                          />
                          <Checkbox
                            label="Show item count badge"
                            checked={true}
                          />
                          <Button>Preview Widget</Button>
                        </BlockStack>
                      </Card>

                      <Box paddingBlockStart="400">
                        <Card>
                          <BlockStack gap="400">
                            <Text variant="headingMd">Wishlist Page</Text>
                            <Divider />
                            <Checkbox
                              label="Create dedicated /wishlist page"
                              checked={true}
                            />
                            <Checkbox
                              label="Allow sharing wishlist"
                              checked={true}
                            />
                            <Checkbox
                              label="Show 'Add all to cart' button"
                              checked={true}
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
