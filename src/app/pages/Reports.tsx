import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  Activity
} from "lucide-react";
import { 
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const savedReports = [
  {
    name: "Monthly Performance Report",
    type: "Performance",
    period: "March 2024",
    generated: "Mar 15, 2024",
    size: "2.4 MB",
  },
  {
    name: "User Growth Analysis",
    type: "Analytics",
    period: "Q1 2024",
    generated: "Mar 10, 2024",
    size: "1.8 MB",
  },
  {
    name: "API Cost Breakdown",
    type: "Financial",
    period: "February 2024",
    generated: "Mar 1, 2024",
    size: "3.2 MB",
  },
  {
    name: "Platform Health Report",
    type: "Technical",
    period: "March 2024",
    generated: "Mar 14, 2024",
    size: "1.5 MB",
  },
];

const growthData = [
  { month: "Sep", users: 1850, revenue: 18500, costs: 7800 },
  { month: "Oct", users: 2050, revenue: 21200, costs: 9000 },
  { month: "Nov", users: 2200, revenue: 19800, costs: 8600 },
  { month: "Dec", users: 2450, revenue: 24300, costs: 10400 },
  { month: "Jan", users: 2650, revenue: 22900, costs: 9900 },
  { month: "Feb", users: 2750, revenue: 26500, costs: 11600 },
  { month: "Mar", users: 2847, revenue: 25800, costs: 12100 },
];

const performanceMetrics = [
  { metric: "User Growth Rate", value: "+12.5%", trend: "up", period: "Last 30 days" },
  { metric: "Revenue Growth", value: "+22.7%", trend: "up", period: "Month over month" },
  { metric: "API Success Rate", value: "99.4%", trend: "up", period: "Last 7 days" },
  { metric: "Customer Retention", value: "94.2%", trend: "up", period: "Last quarter" },
  { metric: "Average Cost per User", value: "$4.28", trend: "down", period: "Last 30 days" },
  { metric: "Support Response Time", value: "2.3h", trend: "down", period: "Last 7 days" },
];

export function Reports() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-500 mt-2">Generate and download analytics reports</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
            <Users className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-green-600 mt-1">↑ 12.5% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$25.8k</div>
            <p className="text-xs text-green-600 mt-1">↑ 22.7% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">API Costs</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12.1k</div>
            <p className="text-xs text-red-600 mt-1">↑ 8.3% increase</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Profit Margin</CardTitle>
            <Activity className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">53.1%</div>
            <p className="text-xs text-green-600 mt-1">↑ 2.1% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Generate Report Section */}
      <Card>
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select defaultValue="performance">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">Performance Report</SelectItem>
                <SelectItem value="analytics">Analytics Report</SelectItem>
                <SelectItem value="financial">Financial Report</SelectItem>
                <SelectItem value="technical">Technical Report</SelectItem>
                <SelectItem value="comprehensive">Comprehensive Report</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="monthly">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF Format</SelectItem>
                <SelectItem value="excel">Excel Format</SelectItem>
                <SelectItem value="csv">CSV Format</SelectItem>
                <SelectItem value="json">JSON Format</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Download className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Growth Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  name="Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Costs</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={growthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                <Bar dataKey="costs" fill="#ef4444" name="Costs" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Key Performance Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">{metric.metric}</p>
                    <p className="text-2xl font-bold mt-2">{metric.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{metric.period}</p>
                  </div>
                  <Badge 
                    className={
                      metric.trend === "up" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-blue-100 text-blue-800"
                    }
                  >
                    {metric.trend === "up" ? "↑" : "↓"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Saved Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedReports.map((report, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 rounded-lg border bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline">{report.type}</Badge>
                      <span className="text-sm text-gray-500">{report.period}</span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{report.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Generated</p>
                    <p className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {report.generated}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mx-auto">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium">Performance Report</h3>
              <p className="text-sm text-gray-500">Overall platform performance metrics</p>
              <Button variant="outline" size="sm" className="w-full">Generate</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium">User Analytics</h3>
              <p className="text-sm text-gray-500">User growth and engagement data</p>
              <Button variant="outline" size="sm" className="w-full">Generate</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="font-medium">Financial Report</h3>
              <p className="text-sm text-gray-500">Revenue, costs, and profitability</p>
              <Button variant="outline" size="sm" className="w-full">Generate</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium">API Usage Report</h3>
              <p className="text-sm text-gray-500">API calls, models, and endpoints</p>
              <Button variant="outline" size="sm" className="w-full">Generate</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
