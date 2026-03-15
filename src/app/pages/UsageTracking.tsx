import { useState } from "react";
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
  Activity, 
  Zap, 
  TrendingUp, 
  AlertTriangle,
  Download
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const usageOverTime = [
  { date: "Mar 9", gpt4: 4500, gpt35: 8200, dalle: 1200, whisper: 800 },
  { date: "Mar 10", gpt4: 5200, gpt35: 9100, dalle: 1400, whisper: 950 },
  { date: "Mar 11", gpt4: 4800, gpt35: 8800, dalle: 1100, whisper: 720 },
  { date: "Mar 12", gpt4: 6100, gpt35: 10200, dalle: 1600, whisper: 1100 },
  { date: "Mar 13", gpt4: 5900, gpt35: 9800, dalle: 1500, whisper: 980 },
  { date: "Mar 14", gpt4: 7200, gpt35: 11500, dalle: 1800, whisper: 1250 },
  { date: "Mar 15", gpt4: 6800, gpt35: 10900, dalle: 1650, whisper: 1150 },
];

const userUsage = [
  {
    user: "john@example.com",
    gpt4Calls: 1250,
    gpt35Calls: 3400,
    imageGen: 85,
    transcriptions: 42,
    totalCost: "$156.80",
    quota: "85%",
  },
  {
    user: "sarah@example.com",
    gpt4Calls: 2100,
    gpt35Calls: 4200,
    imageGen: 120,
    transcriptions: 68,
    totalCost: "$248.50",
    quota: "62%",
  },
  {
    user: "mike@example.com",
    gpt4Calls: 450,
    gpt35Calls: 1200,
    imageGen: 25,
    transcriptions: 15,
    totalCost: "$58.20",
    quota: "45%",
  },
  {
    user: "alex@example.com",
    gpt4Calls: 3200,
    gpt35Calls: 5800,
    imageGen: 180,
    transcriptions: 95,
    totalCost: "$385.40",
    quota: "92%",
  },
  {
    user: "emma@example.com",
    gpt4Calls: 0,
    gpt35Calls: 0,
    imageGen: 0,
    transcriptions: 0,
    totalCost: "$0.00",
    quota: "0%",
  },
];

const apiEndpoints = [
  { endpoint: "chat/completions", calls: 45250, avgLatency: "1.2s", successRate: "99.8%" },
  { endpoint: "images/generations", calls: 8450, avgLatency: "3.5s", successRate: "98.5%" },
  { endpoint: "audio/transcriptions", calls: 5280, avgLatency: "2.1s", successRate: "99.2%" },
  { endpoint: "embeddings", calls: 12300, avgLatency: "0.8s", successRate: "99.9%" },
];

export function UsageTracking() {
  const [timeRange, setTimeRange] = useState("7d");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Usage Tracking</h1>
          <p className="text-gray-500 mt-2">Monitor API usage and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total API Calls</CardTitle>
            <Activity className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71,280</div>
            <p className="text-xs text-green-600 mt-1">↑ 12.5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Response Time</CardTitle>
            <Zap className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.8s</div>
            <p className="text-xs text-green-600 mt-1">↓ 0.3s faster</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.4%</div>
            <p className="text-xs text-green-600 mt-1">↑ 0.2% improvement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Error Rate</CardTitle>
            <AlertTriangle className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.6%</div>
            <p className="text-xs text-gray-500 mt-1">428 failed requests</p>
          </CardContent>
        </Card>
      </div>

      {/* Usage Charts */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="models">By Model</TabsTrigger>
          <TabsTrigger value="users">By User</TabsTrigger>
          <TabsTrigger value="endpoints">By Endpoint</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Usage Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={usageOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="gpt4" 
                    stackId="1" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    name="GPT-4"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="gpt35" 
                    stackId="1" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    name="GPT-3.5"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="dalle" 
                    stackId="1" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    name="DALL-E"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="whisper" 
                    stackId="1" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    name="Whisper"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage by Model Type</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={usageOverTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="gpt4" fill="#3b82f6" name="GPT-4" />
                  <Bar dataKey="gpt35" fill="#10b981" name="GPT-3.5" />
                  <Bar dataKey="dalle" fill="#f59e0b" name="DALL-E" />
                  <Bar dataKey="whisper" fill="#8b5cf6" name="Whisper" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">GPT-4</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">42,500</div>
                <div className="text-sm text-gray-500">Total calls</div>
                <Badge className="bg-blue-100 text-blue-800">45% of total</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">GPT-3.5</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">68,600</div>
                <div className="text-sm text-gray-500">Total calls</div>
                <Badge className="bg-green-100 text-green-800">38% of total</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">DALL-E 3</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">10,350</div>
                <div className="text-sm text-gray-500">Total calls</div>
                <Badge className="bg-amber-100 text-amber-800">12% of total</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Whisper</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-2xl font-bold">6,830</div>
                <div className="text-sm text-gray-500">Total calls</div>
                <Badge className="bg-purple-100 text-purple-800">5% of total</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Usage Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">GPT-4</TableHead>
                    <TableHead className="text-right">GPT-3.5</TableHead>
                    <TableHead className="text-right">Images</TableHead>
                    <TableHead className="text-right">Audio</TableHead>
                    <TableHead className="text-right">Total Cost</TableHead>
                    <TableHead>Quota Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userUsage.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{user.user}</TableCell>
                      <TableCell className="text-right">{user.gpt4Calls.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{user.gpt35Calls.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{user.imageGen}</TableCell>
                      <TableCell className="text-right">{user.transcriptions}</TableCell>
                      <TableCell className="text-right font-medium">{user.totalCost}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                parseInt(user.quota) > 80 ? 'bg-red-500' : 
                                parseInt(user.quota) > 50 ? 'bg-amber-500' : 'bg-green-500'
                              }`}
                              style={{ width: user.quota }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-10">{user.quota}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Endpoint Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint</TableHead>
                    <TableHead className="text-right">Total Calls</TableHead>
                    <TableHead className="text-right">Avg Latency</TableHead>
                    <TableHead className="text-right">Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiEndpoints.map((endpoint, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-mono text-sm">{endpoint.endpoint}</TableCell>
                      <TableCell className="text-right font-medium">
                        {endpoint.calls.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right">{endpoint.avgLatency}</TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          className={
                            parseFloat(endpoint.successRate) > 99 
                              ? "bg-green-100 text-green-800" 
                              : "bg-amber-100 text-amber-800"
                          }
                        >
                          {endpoint.successRate}
                        </Badge>
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
