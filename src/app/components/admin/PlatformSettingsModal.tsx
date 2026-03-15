import { useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { 
  Key, 
  Activity, 
  DollarSign, 
  Settings,
  Copy,
  Eye,
  EyeOff,
  Check
} from "lucide-react";
import { toast } from "sonner";

interface PlatformSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  platform: {
    name: string;
    icon: string;
    status: string;
    apiCalls: string;
    cost: string;
  };
}

export function PlatformSettingsModal({ isOpen, onClose, platform }: PlatformSettingsModalProps) {
  const [apiKey, setApiKey] = useState("sk-proj-xxxxxxxxxxxxxxxxxxxx");
  const [showApiKey, setShowApiKey] = useState(false);
  const [rateLimitEnabled, setRateLimitEnabled] = useState(true);
  const [rateLimitValue, setRateLimitValue] = useState("1000");
  const [webhookUrl, setWebhookUrl] = useState("https://srcassistant.com/webhook");

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    toast.success("API Key copied to clipboard");
  };

  const testConnection = async () => {
    toast.loading("Testing connection...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.dismiss();
    toast.success("Connection successful!", {
      description: `${platform.name} API is responding`
    });
  };

  const saveSettings = () => {
    toast.success("Settings saved", {
      description: `${platform.name} configuration updated`
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="text-3xl">{platform.icon}</div>
            <div>
              <DialogTitle>{platform.name} Settings</DialogTitle>
              <DialogDescription>
                Configure API settings and monitoring
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="api" className="mt-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="api">
              <Key className="w-4 h-4 mr-2" />
              API
            </TabsTrigger>
            <TabsTrigger value="usage">
              <Activity className="w-4 h-4 mr-2" />
              Usage
            </TabsTrigger>
            <TabsTrigger value="billing">
              <DollarSign className="w-4 h-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="advanced">
              <Settings className="w-4 h-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">API Credentials</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <Button variant="outline" onClick={copyApiKey}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Your API key is encrypted and stored securely
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={testConnection} className="flex-1">
                    Test Connection
                  </Button>
                  <Button onClick={saveSettings} className="flex-1">
                    <Check className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Webhook Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook">Webhook URL</Label>
                  <Input
                    id="webhook"
                    type="url"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    placeholder="https://your-domain.com/webhook"
                  />
                  <p className="text-xs text-gray-500">
                    Receive real-time notifications about API usage and errors
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4 mt-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Total Calls</p>
                    <p className="text-3xl font-bold">{platform.apiCalls}</p>
                    <Badge className="mt-2 bg-green-100 text-green-800">+12% this week</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Success Rate</p>
                    <p className="text-3xl font-bold">99.8%</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800">Excellent</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-2">Avg Response</p>
                    <p className="text-3xl font-bold">245ms</p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800">Fast</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Rate Limiting</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Rate Limiting</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Prevent excessive API usage
                    </p>
                  </div>
                  <Switch
                    checked={rateLimitEnabled}
                    onCheckedChange={setRateLimitEnabled}
                  />
                </div>

                {rateLimitEnabled && (
                  <div className="space-y-2">
                    <Label htmlFor="rateLimit">Requests per minute</Label>
                    <Input
                      id="rateLimit"
                      type="number"
                      value={rateLimitValue}
                      onChange={(e) => setRateLimitValue(e.target.value)}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Current Period</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Cost</span>
                  <span className="text-2xl font-bold">{platform.cost}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Billing Period</span>
                  <span className="text-sm font-medium">Mar 1 - Mar 31, 2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Average per call</span>
                  <span className="text-sm font-medium">$0.0045</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Cost Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['API Calls', 'Image Generation', 'Fine-tuning', 'Embeddings'].map((item, index) => (
                    <div key={item} className="flex justify-between items-center py-2 border-b last:border-0">
                      <span className="text-sm">{item}</span>
                      <span className="text-sm font-medium">${(Math.random() * 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Advanced Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <Label>Auto-retry failed requests</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Automatically retry API calls that fail
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <Label>Enable caching</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Cache responses to reduce API costs
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <Label>Detailed logging</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Log all API requests and responses
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div>
                    <Label>Cost alerts</Label>
                    <p className="text-xs text-gray-500 mt-1">
                      Get notified when costs exceed threshold
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={saveSettings}>
            <Check className="w-4 h-4 mr-2" />
            Save All Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}