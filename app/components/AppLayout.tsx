/**
 * KALRT App Layout - Main navigation wrapper
 * Replicates Shopify embedded app navigation pattern
 */

import { Frame, Navigation, TopBar } from "@shopify/polaris";
import {
  HomeIcon,
  NotificationIcon,
  OrderIcon,
  HeartIcon,
  InventoryIcon,
  SettingsIcon,
  ChartVerticalFilledIcon,
  EmailIcon,
  CreditCardIcon,
  QuestionCircleIcon,
} from "@shopify/polaris-icons";
import { useLocation, useNavigate } from "@remix-run/react";
import { useState, useCallback } from "react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavActive, setMobileNavActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);

  const toggleMobileNav = useCallback(() => {
    setMobileNavActive((active) => !active);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setUserMenuActive((active) => !active);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileNavActive(false);
  };

  const isSelected = (path: string) => location.pathname === path;

  const navigationMarkup = (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            label: "Dashboard",
            icon: HomeIcon,
            selected: isSelected("/app"),
            onClick: () => handleNavigate("/app"),
          },
        ]}
      />
      <Navigation.Section
        title="Features"
        items={[
          {
            label: "Back in Stock",
            icon: NotificationIcon,
            selected: location.pathname.startsWith("/app/back-in-stock"),
            onClick: () => handleNavigate("/app/back-in-stock"),
          },
          {
            label: "PreOrder",
            icon: OrderIcon,
            selected: location.pathname.startsWith("/app/preorder"),
            onClick: () => handleNavigate("/app/preorder"),
            badge: "New",
          },
          {
            label: "Wishlist",
            icon: HeartIcon,
            selected: location.pathname.startsWith("/app/wishlist"),
            onClick: () => handleNavigate("/app/wishlist"),
          },
          {
            label: "Low Stock",
            icon: InventoryIcon,
            selected: location.pathname.startsWith("/app/low-stock"),
            onClick: () => handleNavigate("/app/low-stock"),
          },
        ]}
      />
      <Navigation.Section
        title="Manage"
        items={[
          {
            label: "Analytics",
            icon: ChartVerticalFilledIcon,
            selected: isSelected("/app/analytics"),
            onClick: () => handleNavigate("/app/analytics"),
          },
          {
            label: "Templates",
            icon: EmailIcon,
            selected: isSelected("/app/templates"),
            onClick: () => handleNavigate("/app/templates"),
          },
          {
            label: "Pricing",
            icon: CreditCardIcon,
            selected: isSelected("/app/pricing"),
            onClick: () => handleNavigate("/app/pricing"),
          },
        ]}
      />
      <Navigation.Section
        separator
        items={[
          {
            label: "Settings",
            icon: SettingsIcon,
            selected: location.pathname.startsWith("/app/settings"),
            onClick: () => handleNavigate("/app/settings"),
          },
          {
            label: "Help",
            icon: QuestionCircleIcon,
            selected: isSelected("/app/help"),
            onClick: () => handleNavigate("/app/help"),
          },
        ]}
      />
    </Navigation>
  );

  const userMenuMarkup = (
    <TopBar.UserMenu
      actions={[
        {
          items: [
            { content: "Help Center", onAction: () => {} },
            { content: "Contact Support", onAction: () => {} },
          ],
        },
        {
          items: [
            { content: "Manage Plan", onAction: () => handleNavigate("/app/pricing") },
          ],
        },
      ]}
      name="Demo Store"
      detail="demo-store.myshopify.com"
      initials="DS"
      open={userMenuActive}
      onToggle={toggleUserMenu}
    />
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={userMenuMarkup}
      onNavigationToggle={toggleMobileNav}
    />
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavActive}
      onNavigationDismiss={toggleMobileNav}
    >
      {children}
    </Frame>
  );
}
