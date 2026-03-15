import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { 
  CreditCard, 
  TrendingUp, 
  Users, 
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  ExternalLink,
  MoreVertical,
  Eye,
  Ban,
  RefreshCw
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { AddSubscriptionModal } from "../components/admin/AddSubscriptionModal";
import { toast } from "sonner";

const subscriptionStats = [
  { plan: "Free", count: 1245, revenue: 0 },
  { plan: "Pro", count: 542, revenue: 27100 },
  { plan: "Enterprise", count: 89, revenue: 89000 },
];

const recentSubscriptions = [
  {
    id: "1",
    user: "Sarah Miller",
    email: "sarah@example.com",
    plan: "Enterprise",
    status: "active",
    amount: "$1,000/mo",
    nextBilling: "Apr 15, 2024",
    paymentStatus: "paid",
  },
  {
    id: "2",
    user: "John Anderson",
    email: "john@example.com",
    plan: "Pro",
    status: "active",
    amount: "$50/mo",
    nextBilling: "Apr 20, 2024",
    paymentStatus: "paid",
  },
  {
    id: "3",
    user: "Mike Johnson",
    email: "mike@example.com",
    plan: "Free",
    status: "active",
    amount: "$0/mo",
    nextBilling: "-",
    paymentStatus: "free",
  },
  {
    id: "4",
    user: "Emma Wilson",
    email: "emma@example.com",
    plan: "Pro",
    status: "cancelled",
    amount: "$50/mo",
    nextBilling: "Cancelled",
    paymentStatus: "refunded",
  },
  {
    id: "5",
    user: "Alex Chen",
    email: "alex@example.com",
    plan: "Pro",
    status: "active",
    amount: "$50/mo",
    nextBilling: "Apr 12, 2024",
    paymentStatus: "pending",
  },
];

export function Subscriptions() {
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<typeof recentSubscriptions[0] | null>(null);
  const [subscriptions, setSubscriptions] = useState(recentSubscriptions);

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      case "Pro":
        return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>;
      case "Free":
        return <Badge variant="outline">Free</Badge>;
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      case "trial":
        return <Badge className="bg-amber-100 text-amber-800">Trial</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <div className="flex items-center gap-1 text-green-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Paid</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-1 text-amber-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Pending</span>
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center gap-1 text-red-600">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Failed</span>
          </div>
        );
      case "refunded":
        return (
          <div className="flex items-center gap-1 text-gray-600">
            <XCircle className="w-4 h-4" />
            <span className="text-sm">Refunded</span>
          </div>
        );
      case "free":
        return (
          <div className="flex items-center gap-1 text-gray-400">
            <span className="text-sm">-</span>
          </div>
        );
      default:
        return <span className="text-sm text-gray-500">{status}</span>;
    }
  };

  const totalRevenue = subscriptionStats.reduce((sum, stat) => sum + stat.revenue, 0);
  const totalUsers = subscriptionStats.reduce((sum, stat) => sum + stat.count, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-500 mt-2">Manage and track user subscriptions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/users')}>
            <Users className="w-4 h-4 mr-2" />
            View Users
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Subscription
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Subscribers</CardTitle>
            <Users className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Active subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">MRR</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000).toFixed(1)}k</div>
            <p className="text-xs text-gray-500 mt-1">Monthly recurring revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pro Users</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats[1].count}</div>
            <p className="text-xs text-gray-500 mt-1">Professional plan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Enterprise</CardTitle>
            <CreditCard className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptionStats[2].count}</div>
            <p className="text-xs text-gray-500 mt-1">Enterprise plan</p>
          </CardContent>
        </Card>
      </div>

      {/* Subscription Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Subscription Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subscriptionStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plan" />
              <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
              <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Users" />
              <Bar yAxisId="right" dataKey="revenue" fill="#10b981" name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Plan Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 border-gray-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Free Plan</span>
              <Badge variant="outline">Free</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-3xl font-bold">{subscriptionStats[0].count}</p>
              <p className="text-sm text-gray-500">Active users</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">API Calls</span>
                <span className="font-medium">1,000/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Models</span>
                <span className="font-medium">GPT-3.5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Support</span>
                <span className="font-medium">Email</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pro Plan</span>
              <Badge className="bg-blue-100 text-blue-800">$50/mo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-3xl font-bold">{subscriptionStats[1].count}</p>
              <p className="text-sm text-gray-500">Active users</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">API Calls</span>
                <span className="font-medium">100,000/mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Models</span>
                <span className="font-medium">All Models</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Support</span>
                <span className="font-medium">Priority</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Enterprise</span>
              <Badge className="bg-purple-100 text-purple-800">$1,000/mo</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-3xl font-bold">{subscriptionStats[2].count}</p>
              <p className="text-sm text-gray-500">Active users</p>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">API Calls</span>
                <span className="font-medium">Unlimited</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Models</span>
                <span className="font-medium">All + Custom</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Support</span>
                <span className="font-medium">24/7 Dedicated</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Subscriptions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((sub) => (
                <TableRow key={sub.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{sub.user}</p>
                      <p className="text-sm text-gray-500">{sub.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(sub.plan)}</TableCell>
                  <TableCell>{getStatusBadge(sub.status)}</TableCell>
                  <TableCell className="font-medium">{sub.amount}</TableCell>
                  <TableCell>{getPaymentStatusBadge(sub.paymentStatus)}</TableCell>
                  <TableCell className="text-sm text-gray-600">{sub.nextBilling}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setSelectedSubscription(sub);
                          toast.info("Viewing subscription details");
                        }}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          toast.success("Refreshing payment status");
                        }}>
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Refresh Payment
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          navigate('/users');
                        }}>
                          <Users className="w-4 h-4 mr-2" />
                          View User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {sub.status === "active" ? (
                          <DropdownMenuItem className="text-red-600" onClick={() => {
                            setSubscriptions(subscriptions.map(s => 
                              s.id === sub.id ? { ...s, status: "cancelled" } : s
                            ));
                            toast.error("Subscription Cancelled", {
                              description: `${sub.user}'s subscription has been cancelled`
                            });
                          }}>
                            <Ban className="w-4 h-4 mr-2" />
                            Cancel Subscription
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600" onClick={() => {
                            setSubscriptions(subscriptions.map(s => 
                              s.id === sub.id ? { ...s, status: "active" } : s
                            ));
                            toast.success("Subscription Reactivated", {
                              description: `${sub.user}'s subscription has been reactivated`
                            });
                          }}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Reactivate
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subscription Details Modal */}
      <Dialog open={!!selectedSubscription} onOpenChange={() => setSelectedSubscription(null)}>
        <DialogContent className="max-w-2xl">
          {selectedSubscription && (
            <>
              <DialogHeader>
                <DialogTitle>Subscription Details</DialogTitle>
                <DialogDescription>{selectedSubscription.email}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">User</Label>
                    <p className="font-medium mt-1">{selectedSubscription.user}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Email</Label>
                    <p className="font-medium mt-1">{selectedSubscription.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Plan</Label>
                    <div className="mt-1">{getPlanBadge(selectedSubscription.plan)}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedSubscription.status)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">Amount</Label>
                    <p className="font-medium mt-1">{selectedSubscription.amount}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Next Billing</Label>
                    <p className="font-medium mt-1">{selectedSubscription.nextBilling}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Payment Status</Label>
                    <div className="mt-1">{getPaymentStatusBadge(selectedSubscription.paymentStatus)}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedSubscription(null)}>Close</Button>
                <Button onClick={() => {
                  navigate('/users');
                }}>
                  <Users className="w-4 h-4 mr-2" />
                  View User
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Subscription Modal */}
      <AddSubscriptionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={() => {
          toast.success("Subscription created successfully");
        }}
      />
    </div>
  );
}