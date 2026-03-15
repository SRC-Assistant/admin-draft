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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Settings,
  RefreshCw,
  Activity,
  TrendingUp,
  Clock
} from "lucide-react";
import { Progress } from "../components/ui/progress";

const platforms = [
  {
    name: "OpenAI",
    status: "active",
    models: ["GPT-4", "GPT-3.5-turbo", "DALL-E 3", "Whisper"],
    uptime: 99.9,
    latency: "145ms",
    requests: 45250,
    errors: 12,
    lastSync: "2 mins ago",
  },
  {
    name: "Anthropic Claude",
    status: "active",
    models: ["Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku"],
    uptime: 99.7,
    latency: "168ms",
    requests: 12800,
    errors: 8,
    lastSync: "5 mins ago",
  },
  {
    name: "Google Gemini",
    status: "active",
    models: ["Gemini Pro", "Gemini Pro Vision"],
    uptime: 99.5,
    latency: "192ms",
    requests: 8450,
    errors: 15,
    lastSync: "3 mins ago",
  },
  {
    name: "Stability AI",
    status: "degraded",
    models: ["Stable Diffusion XL", "Stable Diffusion 3"],
    uptime: 97.2,
    latency: "2.8s",
    requests: 3200,
    errors: 42,
    lastSync: "12 mins ago",
  },
  {
    name: "Cohere",
    status: "active",
    models: ["Command", "Embed"],
    uptime: 99.8,
    latency: "128ms",
    requests: 5680,
    errors: 3,
    lastSync: "1 min ago",
  },
];

const modelStats = [
  { model: "GPT-4", provider: "OpenAI", status: "active", requests: 28500, avgCost: "$0.03", quota: "85%" },
  { model: "GPT-3.5-turbo", provider: "OpenAI", status: "active", requests: 16750, avgCost: "$0.002", quota: "62%" },
  { model: "Claude 3 Opus", provider: "Anthropic", status: "active", requests: 8900, avgCost: "$0.015", quota: "45%" },
  { model: "DALL-E 3", provider: "OpenAI", status: "active", requests: 3200, avgCost: "$0.04", quota: "38%" },
  { model: "Gemini Pro", provider: "Google", status: "active", requests: 6800, avgCost: "$0.0005", quota: "28%" },
  { model: "Whisper", provider: "OpenAI", status: "active", requests: 2100, avgCost: "$0.006", quota: "15%" },
  { model: "Stable Diffusion XL", provider: "Stability AI", status: "degraded", requests: 1850, avgCost: "$0.02", quota: "72%" },
];

const apiKeys = [
  { provider: "OpenAI", key: "sk-...x7Y9", status: "active", lastUsed: "2 mins ago", expiresIn: "Never" },
  { provider: "Anthropic", key: "sk-ant-...K3L8", status: "active", lastUsed: "5 mins ago", expiresIn: "Never" },
  { provider: "Google", key: "AIza...M4N2", status: "active", lastUsed: "3 mins ago", expiresIn: "90 days" },
  { provider: "Stability AI", key: "sk-...P2Q5", status: "warning", lastUsed: "12 mins ago", expiresIn: "15 days" },
  { provider: "Cohere", key: "co-...R8S3", status: "active", lastUsed: "1 min ago", expiresIn: "Never" },
];

export function PlatformIntegrations() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        );
      case "degraded":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Degraded
          </Badge>
        );
      case "warning":
        return (
          <Badge className="bg-amber-100 text-amber-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Warning
          </Badge>
        );
      case "offline":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Offline
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getUptimeBadge = (uptime: number) => {
    if (uptime >= 99.5) {
      return <Badge className="bg-green-100 text-green-800">{uptime}%</Badge>;
    } else if (uptime >= 98) {
      return <Badge className="bg-amber-100 text-amber-800">{uptime}%</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">{uptime}%</Badge>;
    }
  };

  const totalRequests = platforms.reduce((sum, p) => sum + p.requests, 0);
  const avgUptime = (platforms.reduce((sum, p) => sum + p.uptime, 0) / platforms.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Integrations</h1>
          <p className="text-gray-500 mt-2">Monitor and manage AI platform integrations</p>
        </div>
        <Button>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Platforms</CardTitle>
            <Activity className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.filter(p => p.status === 'active').length}/{platforms.length}</div>
            <p className="text-xs text-gray-500 mt-1">Integrated services</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Uptime</CardTitle>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUptime}%</div>
            <p className="text-xs text-green-600 mt-1">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Requests</CardTitle>
            <Activity className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalRequests / 1000).toFixed(1)}k</div>
            <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Errors</CardTitle>
            <AlertTriangle className="w-4 h-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platforms.reduce((sum, p) => sum + p.errors, 0)}</div>
            <p className="text-xs text-gray-500 mt-1">Error rate: 0.1%</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="platforms" className="space-y-6">
        <TabsList>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
          <TabsTrigger value="keys">API Keys</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-6">
          {/* Platform Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {platforms.map((platform, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{platform.name}</CardTitle>
                    {getStatusBadge(platform.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Uptime</p>
                      <div className="mt-1">{getUptimeBadge(platform.uptime)}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Latency</p>
                      <p className="font-medium mt-1">{platform.latency}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Requests (24h)</p>
                      <p className="font-medium mt-1">{platform.requests.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Errors</p>
                      <p className="font-medium mt-1 text-red-600">{platform.errors}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Available Models</p>
                    <div className="flex flex-wrap gap-2">
                      {platform.models.map((model, idx) => (
                        <Badge key={idx} variant="outline">{model}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>Last sync: {platform.lastSync}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Table */}
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Uptime</TableHead>
                    <TableHead className="text-right">Requests</TableHead>
                    <TableHead className="text-right">Errors</TableHead>
                    <TableHead className="text-right">Latency</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {platforms.map((platform, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{platform.name}</TableCell>
                      <TableCell>{getStatusBadge(platform.status)}</TableCell>
                      <TableCell className="text-right">{getUptimeBadge(platform.uptime)}</TableCell>
                      <TableCell className="text-right">{platform.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={platform.errors > 20 ? "text-red-600 font-medium" : ""}>
                          {platform.errors}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{platform.latency}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance & Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Requests</TableHead>
                    <TableHead className="text-right">Avg Cost</TableHead>
                    <TableHead>Quota Usage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {modelStats.map((model, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{model.model}</TableCell>
                      <TableCell>{model.provider}</TableCell>
                      <TableCell>{getStatusBadge(model.status)}</TableCell>
                      <TableCell className="text-right">{model.requests.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{model.avgCost}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress 
                            value={parseInt(model.quota)} 
                            className="w-24"
                          />
                          <span className="text-sm text-gray-600 w-10">{model.quota}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keys" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Provider</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Expires In</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{key.provider}</TableCell>
                      <TableCell className="font-mono text-sm">{key.key}</TableCell>
                      <TableCell>{getStatusBadge(key.status)}</TableCell>
                      <TableCell className="text-sm text-gray-600">{key.lastUsed}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={key.expiresIn === "Never" ? "outline" : "secondary"}
                          className={
                            key.expiresIn.includes("15 days") 
                              ? "bg-amber-100 text-amber-800" 
                              : ""
                          }
                        >
                          {key.expiresIn}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">Rotate</Button>
                          <Button variant="ghost" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 border-amber-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-900">API Key Expiring Soon</h3>
                  <p className="text-sm text-amber-700 mt-1">
                    Your Stability AI API key will expire in 15 days. Please rotate the key to avoid service interruption.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 border-amber-300 text-amber-900">
                    Rotate Key Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
