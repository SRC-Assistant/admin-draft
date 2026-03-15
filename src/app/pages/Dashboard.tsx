import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Users, DollarSign, TrendingUp, Activity, ArrowUpRight, ArrowDownRight, Zap, AlertCircle, CheckCircle } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 12400, costs: 4200, users: 2100 },
  { month: "Feb", revenue: 15800, costs: 5100, users: 2350 },
  { month: "Mar", revenue: 18200, costs: 6800, users: 2580 },
  { month: "Apr", revenue: 21500, costs: 7200, users: 2720 },
  { month: "May", revenue: 19800, costs: 6500, users: 2690 },
  { month: "Jun", revenue: 24300, costs: 8100, users: 2847 },
];

const usageData = [
  { name: "GPT-4", value: 45, color: "#3b82f6" },
  { name: "GPT-3.5", value: 30, color: "#10b981" },
  { name: "DALL-E", value: 15, color: "#f59e0b" },
  { name: "Whisper", value: 10, color: "#8b5cf6" },
];

const apiCallsData = [
  { time: "00:00", calls: 1200 },
  { time: "04:00", calls: 800 },
  { time: "08:00", calls: 3400 },
  { time: "12:00", calls: 5200 },
  { time: "16:00", calls: 4800 },
  { time: "20:00", calls: 2400 },
];

const recentActivity = [
  { user: "john@example.com", action: "API Call - GPT-4", time: "2 mins ago", cost: "$0.45", status: "success" },
  { user: "sarah@example.com", action: "Image Generation", time: "5 mins ago", cost: "$0.12", status: "success" },
  { user: "mike@example.com", action: "API Call - GPT-3.5", time: "8 mins ago", cost: "$0.08", status: "success" },
  { user: "emma@example.com", action: "Transcription - Whisper", time: "12 mins ago", cost: "$0.06", status: "success" },
  { user: "alex@example.com", action: "API Call - GPT-4", time: "15 mins ago", cost: "$0.52", status: "error" },
];

const topUsers = [
  { name: "Enterprise Corp", usage: "$1,245", quota: 85, trend: "up" },
  { name: "Tech Startup Inc", usage: "$892", quota: 62, trend: "up" },
  { name: "Digital Agency", usage: "$756", quota: 48, trend: "down" },
  { name: "AI Solutions Ltd", usage: "$634", quota: 71, trend: "up" },
];

export function Dashboard() {
  return (
    <div className="space-y-6 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Dilawar • Last updated 2 minutes ago</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export Report</Button>
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Zap className="w-4 h-4 mr-2" />
            Quick Actions
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">Total Users</CardTitle>
              <Users className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">12.5%</span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">Monthly Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$24,300</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">22.7%</span>
                <span className="text-xs text-gray-500">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">API Calls Today</CardTitle>
              <Activity className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">71,280</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">8.3%</span>
                <span className="text-xs text-gray-500">vs yesterday</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-medium text-gray-600">Success Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.4%</div>
              <div className="flex items-center gap-1 mt-1">
                <ArrowUpRight className="w-3.5 h-3.5 text-green-600" />
                <span className="text-xs text-green-600 font-medium">0.2%</span>
                <span className="text-xs text-gray-500">improvement</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Revenue & Costs</CardTitle>
                <Badge variant="secondary" className="text-xs">Last 6 months</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorCosts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="costs" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCosts)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Model Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={usageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {usageData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {usageData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-xs text-gray-600">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Top Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">API Calls (24h)</CardTitle>
              <Badge variant="secondary" className="text-xs">Live</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={apiCallsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="calls" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Top Users This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topUsers.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-2.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.usage} spent</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="text-xs font-medium text-gray-900">{user.quota}%</p>
                      <p className="text-xs text-gray-500">quota</p>
                    </div>
                    {user.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200">
                <div className="flex items-center gap-3">
                  {activity.status === "success" ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                    <p className="text-xs text-gray-500">{activity.action}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{activity.time}</span>
                  <span className="text-sm font-semibold text-gray-900">{activity.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
