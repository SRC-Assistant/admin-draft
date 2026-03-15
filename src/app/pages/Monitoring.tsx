import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Activity, AlertCircle, CheckCircle, TrendingUp, Zap, Globe, Server, Database } from "lucide-react";
import { motion } from "motion/react";

const services = [
  { name: "API Gateway", status: "operational", uptime: "99.98%", latency: "45ms", icon: Globe },
  { name: "Database Primary", status: "operational", uptime: "100%", latency: "12ms", icon: Database },
  { name: "Database Replica", status: "operational", uptime: "99.95%", latency: "15ms", icon: Database },
  { name: "OpenAI Integration", status: "operational", uptime: "99.87%", latency: "320ms", icon: Zap },
  { name: "Anthropic Integration", status: "operational", uptime: "99.92%", latency: "285ms", icon: Zap },
  { name: "Background Workers", status: "degraded", uptime: "98.50%", latency: "N/A", icon: Server },
  { name: "Webhook Service", status: "operational", uptime: "99.99%", latency: "8ms", icon: Activity },
];

const recentIncidents = [
  { id: "1", title: "High API Latency", severity: "minor", status: "resolved", time: "2 hours ago" },
  { id: "2", title: "Database Connection Pool Exhaustion", severity: "major", status: "resolved", time: "1 day ago" },
  { id: "3", title: "Scheduled Maintenance", severity: "info", status: "completed", time: "3 days ago" },
];

export default function Monitoring() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "text-green-600 bg-green-100 border-green-200";
      case "degraded": return "text-yellow-600 bg-yellow-100 border-yellow-200";
      case "outage": return "text-red-600 bg-red-100 border-red-200";
      default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-100 text-red-700 border-red-200";
      case "major": return "bg-orange-100 text-orange-700 border-orange-200";
      case "minor": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "info": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">System Monitoring</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time status and performance metrics</p>
      </div>

      {/* Overall Status */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Systems Operational</h2>
            <p className="text-sm text-gray-600">Last updated: 2 minutes ago</p>
          </div>
        </div>
      </Card>

      {/* Services Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Services Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-sm text-gray-900">{service.name}</h3>
                    </div>
                    <Badge className={`text-xs border ${getStatusColor(service.status)}`}>
                      {service.status}
                    </Badge>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Uptime</span>
                      <span className="font-medium text-gray-900">{service.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Latency</span>
                      <span className="font-medium text-gray-900">{service.latency}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Incidents */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Incidents</h2>
        <div className="space-y-3">
          {recentIncidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-sm text-gray-900">{incident.title}</h3>
                      <p className="text-xs text-gray-500">{incident.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-xs border ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {incident.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
