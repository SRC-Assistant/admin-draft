import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Key, Plus, Copy, Trash2, Eye, EyeOff, MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  permissions: string[];
}

const mockKeys: APIKey[] = [
  {
    id: "1",
    name: "Production API Key",
    key: "sk_live_abc123xyz789***************",
    created: "2024-01-15",
    lastUsed: "2 hours ago",
    permissions: ["read", "write"]
  },
  {
    id: "2",
    name: "Development Key",
    key: "sk_test_dev456qwe789***************",
    created: "2024-02-01",
    lastUsed: "1 day ago",
    permissions: ["read"]
  },
  {
    id: "3",
    name: "Analytics Service",
    key: "sk_live_analytics123***************",
    created: "2024-01-20",
    lastUsed: "5 minutes ago",
    permissions: ["read", "write", "admin"]
  },
];

export default function APIKeys() {
  const [keys, setKeys] = useState<APIKey[]>(mockKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key.replace(/\*/g, ''));
    toast.success("API key copied to clipboard");
  };

  const deleteKey = (id: string) => {
    setKeys(keys.filter(k => k.id !== id));
    toast.success("API key deleted");
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your API keys and access tokens</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4" />
          Create New Key
        </Button>
      </div>

      <div className="grid gap-4">
        {keys.map((apiKey, index) => (
          <motion.div
            key={apiKey.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <Key className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{apiKey.name}</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <code className="px-3 py-1.5 bg-gray-100 rounded text-xs font-mono">
                        {visibleKeys.has(apiKey.id) 
                          ? apiKey.key.replace(/\*/g, 'a1b2c3d4')
                          : apiKey.key
                        }
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.has(apiKey.id) ? (
                          <EyeOff className="w-3.5 h-3.5" />
                        ) : (
                          <Eye className="w-3.5 h-3.5" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyKey(apiKey.key)}
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex gap-1">
                        {apiKey.permissions.map(perm => (
                          <Badge key={perm} variant="secondary" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">
                        Created {apiKey.created}
                      </span>
                      <span className="text-xs text-gray-500">
                        Last used {apiKey.lastUsed}
                      </span>
                    </div>
                  </div>
                </div>
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => copyKey(apiKey.key)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Key
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info("Edit key")}>
                      <Key className="w-4 h-4 mr-2" />
                      Edit Permissions
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600"
                      onClick={() => deleteKey(apiKey.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Key
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
