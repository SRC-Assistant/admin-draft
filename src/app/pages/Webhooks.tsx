import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Webhook, Plus, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";

interface WebhookData {
  id: string;
  url: string;
  events: string[];
  status: "active" | "inactive" | "error";
  lastTriggered: string;
  successRate: number;
}

const mockWebhooks: WebhookData[] = [
  {
    id: "1",
    url: "https://api.example.com/webhooks/user-events",
    events: ["user.created", "user.updated"],
    status: "active",
    lastTriggered: "5 minutes ago",
    successRate: 99.8
  },
  {
    id: "2",
    url: "https://analytics.example.com/events",
    events: ["subscription.created", "payment.success", "payment.failed"],
    status: "active",
    lastTriggered: "1 hour ago",
    successRate: 100
  },
  {
    id: "3",
    url: "https://monitoring.example.com/alerts",
    events: ["usage.threshold", "api.error"],
    status: "error",
    lastTriggered: "2 days ago",
    successRate: 45.2
  },
];

export default function Webhooks() {
  const [webhooks, setWebhooks] = useState<WebhookData[]>(mockWebhooks);

  const getStatusIcon = (status: WebhookData["status"]) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "inactive":
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      case "error":
        return <XCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusBadge = (status: WebhookData["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-700 border-green-200",
      inactive: "bg-gray-100 text-gray-700 border-gray-200",
      error: "bg-red-100 text-red-700 border-red-200"
    };
    
    return (
      <Badge className={`${variants[status]} border`}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Webhooks</h1>
          <p className="text-sm text-gray-500 mt-1">Configure webhooks for real-time event notifications</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4" />
          Add Webhook
        </Button>
      </div>

      <div className="grid gap-4">
        {webhooks.map((webhook, index) => (
          <motion.div
            key={webhook.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Webhook className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(webhook.status)}
                      <code className="text-sm font-mono text-gray-900">{webhook.url}</code>
                      {getStatusBadge(webhook.status)}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {webhook.events.map(event => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 mt-4 text-xs text-gray-500">
                      <span>Last triggered: {webhook.lastTriggered}</span>
                      <span>Success rate: {webhook.successRate}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Test
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
