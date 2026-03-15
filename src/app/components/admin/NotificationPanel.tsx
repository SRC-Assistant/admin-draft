import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Bell, AlertCircle, TrendingUp, CreditCard, Users, X, Check } from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
  action?: {
    label: string;
    path: string;
  };
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High API Usage Alert',
    message: 'User john@example.com exceeded 80% quota',
    time: '5 mins ago',
    read: false,
    action: {
      label: 'View User',
      path: '/users'
    }
  },
  {
    id: '2',
    type: 'success',
    title: 'New Subscription',
    message: 'Sarah Miller upgraded to Pro plan',
    time: '15 mins ago',
    read: false,
    action: {
      label: 'View Subscriptions',
      path: '/subscriptions'
    }
  },
  {
    id: '3',
    type: 'error',
    title: 'Payment Failed',
    message: 'Failed payment for user mike@example.com',
    time: '1 hour ago',
    read: false,
    action: {
      label: 'View Billing',
      path: '/billing'
    }
  },
  {
    id: '4',
    type: 'info',
    title: 'API Integration Update',
    message: 'OpenAI GPT-4 Turbo is now available',
    time: '2 hours ago',
    read: true,
    action: {
      label: 'View Integrations',
      path: '/integrations'
    }
  },
  {
    id: '5',
    type: 'success',
    title: 'Monthly Report Ready',
    message: 'February 2024 analytics report is ready',
    time: '3 hours ago',
    read: true,
    action: {
      label: 'View Reports',
      path: '/reports'
    }
  },
];

export function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'success':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'error':
        return <CreditCard className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Users className="w-5 h-5 text-blue-600" />;
    }
  };

  const getColorClasses = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-amber-50 border-amber-200 hover:bg-amber-100';
      case 'success':
        return 'bg-green-50 border-green-200 hover:bg-green-100';
      case 'error':
        return 'bg-red-50 border-red-200 hover:bg-red-100';
      case 'info':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success("Notification removed");
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.action) {
      navigate(notification.action.path);
      setIsOpen(false);
      toast.info(`Navigating to ${notification.action.label}`);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center"
            >
              <Badge 
                variant="destructive" 
                className="w-4 h-4 flex items-center justify-center p-0 text-[10px]"
              >
                {unreadCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
            <p className="text-xs text-gray-500 mt-1">
              {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={markAllAsRead}
              className="text-xs"
            >
              <Check className="w-3 h-3 mr-1" />
              Mark all read
            </Button>
          )}
        </div>
        
        <ScrollArea className="max-h-[400px]">
          <div className="p-2 space-y-2">
            <AnimatePresence>
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`relative p-3 rounded-lg border transition-all cursor-pointer ${
                      getColorClasses(notification.type)
                    } ${!notification.read ? 'border-l-4' : ''}`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-600'
                          }`}>
                            {notification.title}
                          </p>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-500">
                            {notification.time}
                          </p>
                          {notification.action && (
                            <span className="text-xs font-medium text-blue-600">
                              {notification.action.label} →
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="absolute top-3 right-3 w-2 h-2 bg-blue-600 rounded-full" />
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Button 
                variant="ghost" 
                className="w-full text-sm"
                onClick={() => {
                  navigate('/settings');
                  setIsOpen(false);
                }}
              >
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}