import { Outlet, Link, useLocation, useNavigate } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  BarChart3, 
  DollarSign, 
  Boxes, 
  FileText,
  Settings,
  Search,
  ChevronDown,
  LogOut,
  User,
  HelpCircle,
  Shield,
  Zap,
  Activity,
  Database,
  Key,
  Globe,
  Webhook
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { AIAssistant } from "./AIAssistant";
import { NotificationPanel } from "./NotificationPanel";
import { Breadcrumbs } from "./Breadcrumbs";
import { Toaster } from "../ui/sonner";
import { toast } from "sonner";

const navigationItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "Usage Tracking", href: "/usage", icon: BarChart3 },
  { name: "Billing", href: "/billing", icon: DollarSign },
  { name: "Integrations", href: "/integrations", icon: Boxes },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "API Keys", href: "/api-keys", icon: Key },
  { name: "Webhooks", href: "/webhooks", icon: Webhook },
  { name: "Monitoring", href: "/monitoring", icon: Activity },
  { name: "Databases", href: "/databases", icon: Database },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-gray-200 z-30 flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SRC Assistant
              </h1>
              <p className="text-[10px] text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-xs ${
                  isActive
                    ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom User Info */}
        <div className="p-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white">DJ</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 truncate">Dilawar Jahangir</p>
              <p className="text-[10px] text-gray-500 truncate">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-56">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search users, subscriptions, reports..."
                  className="pl-9 h-9 text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quick Stats */}
              <div className="hidden lg:flex items-center gap-3 mr-2">
                <div className="px-3 py-1.5 bg-green-50 rounded-md border border-green-200">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-medium text-green-700">99.8% Uptime</span>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-blue-50 rounded-md border border-blue-200">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">2,847 Users</span>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <NotificationPanel />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-9">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 text-white">DJ</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Admin</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Dilawar Jahangir</p>
                      <p className="text-xs text-gray-500">admin@srcassistant.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    navigate('/settings');
                    toast.info("Opening profile settings");
                  }}>
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    navigate('/settings');
                    toast.info("Opening admin settings");
                  }}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => {
                    toast.info("Opening help center");
                  }}>
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help Center
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600"
                    onClick={() => {
                      toast.success("Logged out successfully");
                      setTimeout(() => {
                        navigate('/');
                      }, 1000);
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <Breadcrumbs />
          <Outlet />
        </main>
      </div>

      {/* AI Assistant */}
      <AIAssistant />
      
      {/* Toast Notifications */}
      <Toaster position="top-right" toastOptions={{
        style: {
          zIndex: 9999,
        },
      }} />
    </div>
  );
}