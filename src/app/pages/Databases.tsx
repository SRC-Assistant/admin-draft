import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Database, HardDrive, Activity, TrendingUp, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

const databases = [
  {
    id: "1",
    name: "Primary PostgreSQL",
    type: "PostgreSQL 15.2",
    status: "healthy",
    size: "42.8 GB",
    connections: "145/200",
    cpu: "23%",
    memory: "68%",
    iops: "1,240"
  },
  {
    id: "2",
    name: "Read Replica 1",
    type: "PostgreSQL 15.2",
    status: "healthy",
    size: "42.8 GB",
    connections: "89/150",
    cpu: "18%",
    memory: "54%",
    iops: "980"
  },
  {
    id: "3",
    name: "Redis Cache",
    type: "Redis 7.0",
    status: "healthy",
    size: "8.2 GB",
    connections: "342/500",
    cpu: "12%",
    memory: "45%",
    iops: "5,420"
  },
  {
    id: "4",
    name: "Analytics DB",
    type: "PostgreSQL 15.2",
    status: "warning",
    size: "128.5 GB",
    connections: "172/200",
    cpu: "67%",
    memory: "89%",
    iops: "2,840"
  },
];

export default function Databases() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-100 text-green-700 border-green-200";
      case "warning": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "critical": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Databases</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor and manage database instances</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      {/* Database Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Database className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Databases</p>
              <p className="text-xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Storage</p>
              <p className="text-xl font-bold text-gray-900">222.3 GB</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Active Connections</p>
              <p className="text-xl font-bold text-gray-900">748</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Avg IOPS</p>
              <p className="text-xl font-bold text-gray-900">2,620</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Database List */}
      <div className="grid gap-4">
        {databases.map((db, index) => (
          <motion.div
            key={db.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{db.name}</h3>
                      <Badge className={`text-xs border ${getStatusColor(db.status)}`}>
                        {db.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5">{db.type}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Manage</Button>
                  <Button variant="outline" size="sm">Logs</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
                <div>
                  <p className="text-gray-500 mb-1">Storage</p>
                  <p className="font-semibold text-gray-900">{db.size}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Connections</p>
                  <p className="font-semibold text-gray-900">{db.connections}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">CPU Usage</p>
                  <p className="font-semibold text-gray-900">{db.cpu}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Memory</p>
                  <p className="font-semibold text-gray-900">{db.memory}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">IOPS</p>
                  <p className="font-semibold text-gray-900">{db.iops}</p>
                </div>
                <div>
                  <p className="text-gray-500 mb-1">Replication</p>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
