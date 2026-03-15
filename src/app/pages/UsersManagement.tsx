import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { 
  Search, 
  MoreVertical, 
  UserPlus, 
  LogIn, 
  Ban, 
  CheckCircle, 
  Mail,
  Shield
} from "lucide-react";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { UserDetailsModal } from "../components/admin/UserDetailsModal";
import { toast } from "sonner";

const mockUsers = [
  {
    id: "1",
    name: "John Anderson",
    email: "john@example.com",
    plan: "Pro",
    status: "active",
    usage: "85%",
    joined: "2024-01-15",
    lastActive: "2 mins ago",
  },
  {
    id: "2",
    name: "Sarah Miller",
    email: "sarah@example.com",
    plan: "Enterprise",
    status: "active",
    usage: "62%",
    joined: "2024-02-01",
    lastActive: "1 hour ago",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    plan: "Free",
    status: "active",
    usage: "45%",
    joined: "2024-02-10",
    lastActive: "3 hours ago",
  },
  {
    id: "4",
    name: "Emma Wilson",
    email: "emma@example.com",
    plan: "Pro",
    status: "suspended",
    usage: "0%",
    joined: "2024-01-20",
    lastActive: "2 days ago",
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex@example.com",
    plan: "Pro",
    status: "active",
    usage: "92%",
    joined: "2024-01-05",
    lastActive: "15 mins ago",
  },
];

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<typeof mockUsers[0] | null>(null);
  const [users, setUsers] = useState(mockUsers);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return <Badge className="bg-purple-100 text-purple-800">Enterprise</Badge>;
      case "Pro":
        return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>;
      case "Free":
        return <Badge variant="outline">Free</Badge>;
      default:
        return <Badge variant="secondary">{plan}</Badge>;
    }
  };

  const handleLoginAsUser = (user: typeof mockUsers[0]) => {
    toast.success("Login as User", {
      description: `Logging in as ${user.name}... Redirecting to client portal`
    });
    // Simulate redirect after a delay
    setTimeout(() => {
      window.open('https://srcassistant.com/client', '_blank');
    }, 1500);
  };

  const handleSuspendUser = (user: typeof mockUsers[0]) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, status: "suspended" } : u
    ));
    toast.error("User Suspended", {
      description: `${user.name} has been suspended`
    });
  };

  const handleActivateUser = (user: typeof mockUsers[0]) => {
    setUsers(users.map(u => 
      u.id === user.id ? { ...u, status: "active" } : u
    ));
    toast.success("User Activated", {
      description: `${user.name} has been activated`
    });
  };

  const handleSendEmail = (user: typeof mockUsers[0]) => {
    toast.info("Sending Email", {
      description: `Email notification sent to ${user.email}`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-500 mt-2">Manage user accounts and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account for the platform</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan">Subscription Plan</Label>
                <Select>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search users by name, email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="pro">Pro</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({mockUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getPlanBadge(user.plan)}</TableCell>
                  <TableCell>{getStatusBadge(user.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            parseInt(user.usage) > 80 ? 'bg-red-500' : 
                            parseInt(user.usage) > 50 ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: user.usage }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{user.usage}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{user.joined}</TableCell>
                  <TableCell className="text-sm text-gray-600">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => handleLoginAsUser(user)}>
                          <LogIn className="w-4 h-4 mr-2" />
                          Login as User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setSelectedUser(user)}>
                          <Shield className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleSendEmail(user)}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem className="text-red-600" onClick={() => handleSuspendUser(user)}>
                            <Ban className="w-4 h-4 mr-2" />
                            Suspend User
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem className="text-green-600" onClick={() => handleActivateUser(user)}>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Activate User
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-2xl">
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle>User Details</DialogTitle>
                <DialogDescription>{selectedUser.email}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-6 py-4">
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">Full Name</Label>
                    <p className="font-medium mt-1">{selectedUser.name}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Email</Label>
                    <p className="font-medium mt-1">{selectedUser.email}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Plan</Label>
                    <div className="mt-1">{getPlanBadge(selectedUser.plan)}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-500">Joined Date</Label>
                    <p className="font-medium mt-1">{selectedUser.joined}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Last Active</Label>
                    <p className="font-medium mt-1">{selectedUser.lastActive}</p>
                  </div>
                  <div>
                    <Label className="text-gray-500">Usage</Label>
                    <p className="font-medium mt-1">{selectedUser.usage}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setSelectedUser(null)}>Close</Button>
                <Button onClick={() => handleLoginAsUser(selectedUser)}>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login as User
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}