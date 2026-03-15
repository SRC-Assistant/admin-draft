import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  AlertCircle,
  Download,
  FileText,
  CheckCircle,
  XCircle
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const costOverTime = [
  { month: "Sep", llmCosts: 6200, imageCosts: 1200, audioCosts: 450, revenue: 18500 },
  { month: "Oct", llmCosts: 7100, imageCosts: 1400, audioCosts: 520, revenue: 21200 },
  { month: "Nov", llmCosts: 6800, imageCosts: 1300, audioCosts: 480, revenue: 19800 },
  { month: "Dec", llmCosts: 8200, imageCosts: 1600, audioCosts: 620, revenue: 24300 },
  { month: "Jan", llmCosts: 7800, imageCosts: 1500, audioCosts: 580, revenue: 22900 },
  { month: "Feb", llmCosts: 9100, imageCosts: 1800, audioCosts: 680, revenue: 26500 },
  { month: "Mar", llmCosts: 8900, imageCosts: 1700, audioCosts: 650, revenue: 25800 },
];

const costBreakdown = [
  { name: "GPT-4 API", value: 5200, color: "#3b82f6" },
  { name: "GPT-3.5 API", value: 3700, color: "#10b981" },
  { name: "DALL-E 3", value: 1700, color: "#f59e0b" },
  { name: "Whisper", value: 650, color: "#8b5cf6" },
  { name: "Embeddings", value: 850, color: "#ec4899" },
];

const invoices = [
  {
    id: "INV-2024-003",
    period: "March 2024",
    amount: "$12,100",
    status: "paid",
    dueDate: "Mar 31, 2024",
    paidDate: "Mar 28, 2024",
  },
  {
    id: "INV-2024-002",
    period: "February 2024",
    amount: "$11,580",
    status: "paid",
    dueDate: "Feb 29, 2024",
    paidDate: "Feb 27, 2024",
  },
  {
    id: "INV-2024-001",
    period: "January 2024",
    amount: "$9,880",
    status: "paid",
    dueDate: "Jan 31, 2024",
    paidDate: "Jan 30, 2024",
  },
  {
    id: "INV-2023-012",
    period: "December 2023",
    amount: "$10,420",
    status: "paid",
    dueDate: "Dec 31, 2023",
    paidDate: "Dec 29, 2023",
  },
];

const costByUser = [
  { user: "alex@example.com", llm: "$385.40", images: "$48.20", audio: "$12.50", total: "$446.10" },
  { user: "sarah@example.com", llm: "$248.50", images: "$32.80", audio: "$8.90", total: "$290.20" },
  { user: "john@example.com", llm: "$156.80", images: "$18.50", audio: "$5.20", total: "$180.50" },
  { user: "mike@example.com", llm: "$58.20", images: "$6.80", audio: "$1.90", total: "$66.90" },
  { user: "emma@example.com", llm: "$0.00", images: "$0.00", audio: "$0.00", total: "$0.00" },
];

export function Billing() {
  const totalCost = costBreakdown.reduce((sum, item) => sum + item.value, 0);
  const currentRevenue = costOverTime[costOverTime.length - 1].revenue;
  const profit = currentRevenue - totalCost;
  const profitMargin = ((profit / currentRevenue) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Billing & Costs</h1>
          <p className="text-gray-500 mt-2">Track API costs, revenue, and billing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(currentRevenue / 1000).toFixed(1)}k</div>
            <p className="text-xs text-green-600 mt-1">↑ 8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total API Costs</CardTitle>
            <CreditCard className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalCost / 1000).toFixed(1)}k</div>
            <p className="text-xs text-red-600 mt-1">↑ 5.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Profit</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(profit / 1000).toFixed(1)}k</div>
            <p className="text-xs text-green-600 mt-1">Margin: {profitMargin}%</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Cost per User</CardTitle>
            <AlertCircle className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4.28</div>
            <p className="text-xs text-gray-500 mt-1">Average monthly</p>
          </CardContent>
        </Card>
      </div>

      {/* Cost Analysis Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="users">By User</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs Costs</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={costOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="llmCosts" 
                    stroke="#3b82f6" 
                    strokeWidth={2} 
                    name="LLM Costs"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="imageCosts" 
                    stroke="#f59e0b" 
                    strokeWidth={2} 
                    name="Image Costs"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="audioCosts" 
                    stroke="#8b5cf6" 
                    strokeWidth={2} 
                    name="Audio Costs"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">LLM Costs (GPT Models)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,900</div>
                <p className="text-sm text-gray-500 mt-1">73.5% of total costs</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GPT-4</span>
                    <span className="font-medium">$5,200</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">GPT-3.5</span>
                    <span className="font-medium">$3,700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Image Generation (DALL-E)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,700</div>
                <p className="text-sm text-gray-500 mt-1">14.0% of total costs</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">DALL-E 3</span>
                    <span className="font-medium">$1,700</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Audio Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,500</div>
                <p className="text-sm text-gray-500 mt-1">12.5% of total costs</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Whisper</span>
                    <span className="font-medium">$650</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Embeddings</span>
                    <span className="font-medium">$850</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monthly Cost Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="llmCosts" stackId="a" fill="#3b82f6" name="LLM" />
                    <Bar dataKey="imageCosts" stackId="a" fill="#f59e0b" name="Images" />
                    <Bar dataKey="audioCosts" stackId="a" fill="#8b5cf6" name="Audio" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costBreakdown.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${item.value.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">
                        {((item.value / totalCost) * 100).toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-right">
                        <span className="text-green-600 text-sm">↑ {(Math.random() * 10 + 2).toFixed(1)}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cost by User</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">LLM Costs</TableHead>
                    <TableHead className="text-right">Image Costs</TableHead>
                    <TableHead className="text-right">Audio Costs</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {costByUser.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.user}</TableCell>
                      <TableCell className="text-right">{user.llm}</TableCell>
                      <TableCell className="text-right">{user.images}</TableCell>
                      <TableCell className="text-right">{user.audio}</TableCell>
                      <TableCell className="text-right font-bold">{user.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-mono text-sm">{invoice.id}</TableCell>
                      <TableCell>{invoice.period}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Paid
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-600">{invoice.dueDate}</TableCell>
                      <TableCell className="text-sm text-gray-600">{invoice.paidDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
