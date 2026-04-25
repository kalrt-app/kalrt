import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "KALRT - Back in Stock Alerts" },
    { name: "description", content: "Shopify back-in-stock notification app" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem" }}>
      <h1>KALRT</h1>
      <p>Back in Stock Alerts for Shopify</p>
      <p style={{ color: "#666" }}>App coming soon...</p>
    </div>
  );
}
