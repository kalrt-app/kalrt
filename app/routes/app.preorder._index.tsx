/**
 * PreOrder Module - Main Page
 * Full preorder management with orders, products, settings
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
  ChoiceList,
  Checkbox,
  RadioButton,
  RangeSlider,
  Banner,
} from "@shopify/polaris";
import {
  OrderIcon,
  ProductIcon,
  CashDollarIcon,
  CalendarIcon,
  SettingsIcon,
  PlusIcon,
} from "@shopify/polaris-icons";
import { useState, useCallback } from "react";
import AppLayout from "../components/AppLayout";

export default function PreOrderOverview() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [dateRange, setDateRange] = useState("30d");
  const [modalActive, setModalActive] = useState(false);
  const [paymentType, setPaymentType] = useState("full");
  const [depositType, setDepositType] = useState("percentage");
  const [depositValue, setDepositValue] = useState("25");

  const handleTabChange = useCallback((index: number) => setSelectedTab(index), []);

  const tabs = [
    { id: "orders", content: "Orders", badge: "89" },
    { id: "products", content: "Products", badge: "12" },
    { id: "settings", content: "Settings" },
  ];

  // Mock data
  const stats = {
    totalOrders: 89,
    ordersTrend: 12.4,
    revenue: 7845,
    revenueTrend: 31.2,
    pending: 23,
    fulfilled: 66,
    avgOrderValue: 88.15,
  };

  const orders = [
    { id: "PO-1001", customer: "John Smith", email: "john@example.com", product: "Limited Edition Sneakers", variant: "Size 10", amount: 249, status: "paid", paymentType: "Full", date: "Apr 25, 2026", expectedShip: "May 15, 2026" },
    { id: "PO-1002", customer: "Sarah Johnson", email: "sarah@test.com", product: "Designer Handbag", variant: "Black", amount: 199, deposit: 50, status: "partial", paymentType: "Deposit", date: "Apr 24, 2026", expectedShip: "May 20, 2026" },
    { id: "PO-1003", customer: "Mike Wilson", email: "mike@demo.com", product: "Smart Watch Pro", variant: "Silver", amount: 399, status: "paid", paymentType: "Full", date: "Apr 24, 2026", expectedShip: "May 10, 2026" },
    { id: "PO-1004", customer: "Anna Davis", email: "anna@mail.com", product: "Wireless Headphones", variant: "White", amount: 179, deposit: 45, status: "partial", paymentType: "Deposit", date: "Apr 23, 2026", expectedShip: "May 25, 2026" },
    { id: "PO-1005", customer: "Chris Brown", email: "chris@shop.com", product: "Gaming Console", variant: "Standard", amount: 499, status: "shipped", paymentType: "Full", date: "Apr 20, 2026", expectedShip: "Apr 30, 2026" },
    { id: "PO-1006", customer: "Lisa Taylor", email: "lisa@store.com", product: "Camera Kit", variant: "Pro Bundle", amount: 899, deposit: 300, status: "partial", paymentType: "Deposit", date: "Apr 18, 2026", expectedShip: "Jun 1, 2026" },
  ];

  const products = [
    { id: "1", name: "Limited Edition Sneakers", variants: 4, status: "active", orders: 34, revenue: 8466, availability: "May 15, 2026", paymentType: "Full" },
    { id: "2", name: "Designer Handbag", variants: 3, status: "active", orders: 18, revenue: 3582, availability: "May 20, 2026", paymentType: "Deposit 25%" },
    { id: "3", name: "Smart Watch Pro", variants: 2, status: "active", orders: 12, revenue: 4788, availability: "May 10, 2026", paymentType: "Full" },
    { id: "4", name: "Gaming Console", variants: 1, status: "paused", orders: 8, revenue: 3992, availability: "Jun 1, 2026", paymentType: "Full" },
    { id: "5", name: "Camera Kit", variants: 2, status: "active", orders: 6, revenue: 5394, availability: "Jun 15, 2026", paymentType: "Deposit 33%" },
  ];

  const resourceName = {
    singular: "order",
    plural: "orders",
  };

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(orders);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid": return <Badge tone="success">Paid</Badge>;
      case "partial": return <Badge tone="attention">Partial</Badge>;
      case "shipped": return <Badge tone="info">Shipped</Badge>;
      case "cancelled": return <Badge tone="critical">Cancelled</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const getProductStatusBadge = (status: string) => {
    switch (status) {
      case "active": return <Badge tone="success">Active</Badge>;
      case "paused": return <Badge tone="warning">Paused</Badge>;
      case "ended": return <Badge>Ended</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const orderRowMarkup = orders.map((order, index) => (
    <IndexTable.Row
      id={order.id}
      key={order.id}
      selected={selectedResources.includes(order.id)}
      position={index}
    >
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold">{order.id}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <BlockStack gap="100">
          <Text variant="bodyMd">{order.customer}</Text>
          <Text variant="bodySm" tone="subdued">{order.email}</Text>
        </BlockStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <BlockStack gap="100">
          <Text variant="bodyMd">{order.product}</Text>
          <Text variant="bodySm" tone="subdued">{order.variant}</Text>
        </BlockStack>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <BlockStack gap="100">
          <Text variant="bodyMd" fontWeight="semibold">${order.amount}</Text>
          {order.deposit && (
            <Text variant="bodySm" tone="subdued">Paid: ${order.deposit}</Text>
          )}
        </BlockStack>
      </IndexTable.Cell>
      <IndexTable.Cell>{getStatusBadge(order.status)}</IndexTable.Cell>
      <IndexTable.Cell>
        <Badge>{order.paymentType}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <BlockStack gap="100">
          <Text variant="bodySm">{order.date}</Text>
          <Text variant="bodySm" tone="subdued">Ships: {order.expectedShip}</Text>
        </BlockStack>
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
            <Text variant="bodySm" tone="subdued">{product.variants} variants</Text>
          </BlockStack>
        </InlineStack>
      </IndexTable.Cell>
      <IndexTable.Cell>{getProductStatusBadge(product.status)}</IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold">{product.orders}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodyMd" fontWeight="semibold">${product.revenue.toLocaleString()}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge>{product.paymentType}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Text variant="bodySm">{product.availability}</Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Button size="slim">Edit</Button>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <AppLayout>
      <Page
        title="PreOrder"
        subtitle="Collect payments before products are available"
        primaryAction={{ content: "Add Product", icon: PlusIcon, onAction: () => setModalActive(true) }}
        secondaryActions={[
          { content: "Export Orders" },
          { content: "Collect Payments" },
        ]}
      >
        <BlockStack gap="600">
          {/* Stats Cards */}
          <InlineGrid columns={4} gap="400">
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={OrderIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">Total Orders</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.totalOrders}</Text>
                <InlineStack gap="100">
                  <Badge tone="success">+{stats.ordersTrend}%</Badge>
                  <Text variant="bodySm" tone="subdued">vs last period</Text>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={CashDollarIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">Revenue</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">${stats.revenue.toLocaleString()}</Text>
                <InlineStack gap="100">
                  <Badge tone="success">+{stats.revenueTrend}%</Badge>
                </InlineStack>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={CalendarIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">Pending</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">{stats.pending}</Text>
                <Text variant="bodySm" tone="subdued">Awaiting shipment</Text>
              </BlockStack>
            </Card>
            <Card>
              <BlockStack gap="200">
                <InlineStack gap="200" blockAlign="center">
                  <Icon source={ProductIcon} tone="base" />
                  <Text variant="bodySm" tone="subdued">Avg Order Value</Text>
                </InlineStack>
                <Text variant="headingXl" as="h3">${stats.avgOrderValue}</Text>
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
                    itemCount={orders.length}
                    selectedItemsCount={allResourcesSelected ? "All" : selectedResources.length}
                    onSelectionChange={handleSelectionChange}
                    headings={[
                      { title: "Order" },
                      { title: "Customer" },
                      { title: "Product" },
                      { title: "Amount" },
                      { title: "Status" },
                      { title: "Payment" },
                      { title: "Date" },
                    ]}
                    bulkActions={[
                      { content: "Collect remaining payment" },
                      { content: "Send reminder" },
                      { content: "Export" },
                    ]}
                  >
                    {orderRowMarkup}
                  </IndexTable>
                )}

                {selectedTab === 1 && (
                  <IndexTable
                    resourceName={{ singular: "product", plural: "products" }}
                    itemCount={products.length}
                    headings={[
                      { title: "Product" },
                      { title: "Status" },
                      { title: "Orders" },
                      { title: "Revenue" },
                      { title: "Payment" },
                      { title: "Available" },
                      { title: "" },
                    ]}
                    selectable={false}
                  >
                    {productRowMarkup}
                  </IndexTable>
                )}

                {selectedTab === 2 && (
                  <BlockStack gap="600">
                    <Layout>
                      <Layout.Section>
                        <Card>
                          <BlockStack gap="400">
                            <Text variant="headingMd">Default Pre-Order Settings</Text>
                            <Divider />

                            <BlockStack gap="300">
                              <Text variant="bodyMd" fontWeight="semibold">Apply to products</Text>
                              <ChoiceList
                                title=""
                                titleHidden
                                choices={[
                                  { label: "All sold out products with 'Continue selling when out of stock' enabled", value: "sold-out" },
                                  { label: "Only products I manually select", value: "manual" },
                                  { label: "Products with specific tags", value: "tags" },
                                ]}
                                selected={["sold-out"]}
                                onChange={() => {}}
                              />
                            </BlockStack>

                            <Divider />

                            <BlockStack gap="300">
                              <Text variant="bodyMd" fontWeight="semibold">Payment collection</Text>
                              <InlineStack gap="400">
                                <RadioButton
                                  label="Full payment upfront"
                                  checked={paymentType === "full"}
                                  id="full"
                                  name="payment"
                                  onChange={() => setPaymentType("full")}
                                />
                                <RadioButton
                                  label="Partial payment (deposit)"
                                  checked={paymentType === "partial"}
                                  id="partial"
                                  name="payment"
                                  onChange={() => setPaymentType("partial")}
                                />
                              </InlineStack>

                              {paymentType === "partial" && (
                                <Box paddingInlineStart="800">
                                  <InlineStack gap="400">
                                    <Select
                                      label="Deposit type"
                                      options={[
                                        { label: "Percentage", value: "percentage" },
                                        { label: "Fixed amount", value: "fixed" },
                                      ]}
                                      value={depositType}
                                      onChange={(v) => setDepositType(v)}
                                    />
                                    <TextField
                                      label={depositType === "percentage" ? "Percentage" : "Amount"}
                                      type="number"
                                      value={depositValue}
                                      onChange={(v) => setDepositValue(v)}
                                      suffix={depositType === "percentage" ? "%" : "$"}
                                      autoComplete="off"
                                    />
                                  </InlineStack>
                                </Box>
                              )}
                            </BlockStack>

                            <Divider />

                            <BlockStack gap="300">
                              <Text variant="bodyMd" fontWeight="semibold">Pre-order button</Text>
                              <TextField
                                label="Button text"
                                value="Pre-Order Now"
                                autoComplete="off"
                              />
                              <Checkbox
                                label="Show expected availability date on button"
                                checked={true}
                              />
                              <Checkbox
                                label="Show 'Pre-Order' badge on product cards"
                                checked={true}
                              />
                            </BlockStack>

                            <Divider />

                            <BlockStack gap="300">
                              <Text variant="bodyMd" fontWeight="semibold">Order limits</Text>
                              <Checkbox
                                label="Limit pre-orders per product"
                                checked={false}
                              />
                              <Checkbox
                                label="Limit pre-orders per customer"
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
                            <Text variant="headingMd">Email Notifications</Text>
                            <Divider />
                            <Checkbox
                              label="Pre-order confirmation"
                              checked={true}
                              helpText="Sent when customer places a pre-order"
                            />
                            <Checkbox
                              label="Payment reminder"
                              checked={true}
                              helpText="For partial payments, remind to pay remaining"
                            />
                            <Checkbox
                              label="Shipping notification"
                              checked={true}
                              helpText="When pre-order item ships"
                            />
                            <Checkbox
                              label="Availability update"
                              checked={false}
                              helpText="If expected date changes"
                            />
                            <Button>Edit Email Templates</Button>
                          </BlockStack>
                        </Card>

                        <Box paddingBlockStart="400">
                          <Banner tone="info">
                            <p>Pre-orders work with all Shopify payment methods and can be mixed with regular items in cart.</p>
                          </Banner>
                        </Box>
                      </Layout.Section>
                    </Layout>
                  </BlockStack>
                )}
              </Box>
            </Tabs>
          </Card>
        </BlockStack>

        {/* Add Product Modal */}
        <Modal
          open={modalActive}
          onClose={() => setModalActive(false)}
          title="Enable Pre-Order for Product"
          primaryAction={{
            content: "Enable Pre-Order",
            onAction: () => setModalActive(false),
          }}
          secondaryActions={[
            { content: "Cancel", onAction: () => setModalActive(false) },
          ]}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                label="Search products"
                placeholder="Search by product name..."
                autoComplete="off"
              />
              <Select
                label="Payment type"
                options={[
                  { label: "Full payment", value: "full" },
                  { label: "Deposit 25%", value: "deposit-25" },
                  { label: "Deposit 50%", value: "deposit-50" },
                  { label: "Custom deposit", value: "custom" },
                ]}
              />
              <TextField
                label="Expected availability date"
                type="date"
                autoComplete="off"
              />
              <TextField
                label="Pre-order limit (optional)"
                type="number"
                placeholder="Leave empty for unlimited"
                autoComplete="off"
              />
              <Checkbox
                label="Apply discount for pre-orders"
                checked={false}
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </Page>
    </AppLayout>
  );
}
