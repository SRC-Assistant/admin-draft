import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  User, 
  Activity, 
  CreditCard, 
  BarChart3,
  Mail,
  Calendar,
  Globe,
  Clock,
  DollarSign,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const usageHistory = [
  { date: "Mar 8", calls: 450 },
  { date: "Mar 9", calls: 520 },
  { date: "Mar 10", calls: 380 },
  { date: "Mar 11", calls: 610 },
  { date: "Mar 12", calls: 550 },
  { date: "Mar 13", calls: 720 },
  { date: "Mar 14", calls: 680 },
  { date: "Mar 15", calls: 590 },
];

const recentActivity = [
  { action: "API Call - GPT-4", time: "2 mins ago", cost: "$0.45", status: "success" },
  { action: "Image Generation", time: "5 mins ago", cost: "$0.12", status: "success" },
  { action: "API Call - GPT-3.5", time: "8 mins ago", cost: "$0.08", status: "success" },
  { action: "Failed Request", time: "12 mins ago", cost: "$0.00", status: "error" },
  { action: "Transcription", time: "15 mins ago", cost: "$0.06", status: "success" },
];

export function UserDetailsModal({ isOpen, onClose, user }: UserDetailsModalProps) {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {user.name.split(' ').map((n: string) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-sm text-gray-500 font-normal">{user.email}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Account Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Status</span>
                      <Badge className="bg-green-100 text-green-800">{user.status}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Plan</span>
                      <Badge className="bg-blue-100 text-blue-800">{user.plan}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Joined</span>
                      <span className="text-sm font-medium">{user.joined}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Last Active</span>
                      <span className="text-sm font-medium">{user.lastActive}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" />
                      Quick Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">API Calls (30d)</span>
                      <span className="text-sm font-medium">12,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Total Spent</span>
                      <span className="text-sm font-medium">$156.80</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Quota Usage</span>
                      <span className="text-sm font-medium">{user.usage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">Avg Daily Calls</span>
                      <span className="text-sm font-medium">415</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Usage Trend (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={usageHistory}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="calls" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4 mt-6">
            <div className="grid grid-cols-3 gap-4">
              {['GPT-4', 'GPT-3.5', 'DALL-E'].map((model, index) => (
                <motion.div
                  key={model}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">{model}</p>
                        <p className="text-2xl font-bold">{Math.floor(Math.random() * 5000 + 1000)}</p>
                        <p className="text-xs text-gray-400 mt-1">API calls</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Usage History</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={usageHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="calls" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Total Spent
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$156.80</p>
                  <p className="text-sm text-green-600 mt-1">↑ 12% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Monthly Average
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$52.27</p>
                  <p className="text-sm text-gray-500 mt-1">Last 3 months</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Invoices</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="font-medium">Invoice #{1000 + index}</p>
                        <p className="text-sm text-gray-500">March {15 - index * 3}, 2024</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${(50 + Math.random() * 20).toFixed(2)}</p>
                        <Badge className="bg-green-100 text-green-800 mt-1">Paid</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{activity.cost}</p>
                        <Badge 
                          variant={activity.status === 'success' ? 'outline' : 'destructive'}
                          className="mt-1"
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>
            <Mail className="w-4 h-4 mr-2" />
            Send Email
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
