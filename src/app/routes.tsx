import { createBrowserRouter } from "react-router";
import { AdminLayout } from "./components/admin/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { UsersManagement } from "./pages/UsersManagement";
import { Subscriptions } from "./pages/Subscriptions";
import { UsageTracking } from "./pages/UsageTracking";
import { Billing } from "./pages/Billing";
import { PlatformIntegrations } from "./pages/PlatformIntegrations";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import APIKeys from "./pages/APIKeys";
import Webhooks from "./pages/Webhooks";
import Monitoring from "./pages/Monitoring";
import Databases from "./pages/Databases";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "users", Component: UsersManagement },
      { path: "subscriptions", Component: Subscriptions },
      { path: "usage", Component: UsageTracking },
      { path: "billing", Component: Billing },
      { path: "integrations", Component: PlatformIntegrations },
      { path: "reports", Component: Reports },
      { path: "api-keys", Component: APIKeys },
      { path: "webhooks", Component: Webhooks },
      { path: "monitoring", Component: Monitoring },
      { path: "databases", Component: Databases },
      { path: "settings", Component: Settings },
    ],
  },
]);