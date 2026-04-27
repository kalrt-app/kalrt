import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

export default function App() {
  const location = useLocation();
  const isPolarisRoute = location.pathname.startsWith("/v") || location.pathname.startsWith("/app");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <style>{`
          /* Reset for Polaris app */
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
          }
          /* Ensure Frame takes full height */
          .Polaris-Frame {
            min-height: 100vh;
          }
        `}</style>
      </head>
      <body>
        {isPolarisRoute ? (
          <AppProvider i18n={enTranslations}>
            <Outlet />
          </AppProvider>
        ) : (
          <Outlet />
        )}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
