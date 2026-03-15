import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { 
  Sparkles, 
  X, 
  Send, 
  Loader2,
  FileText,
  Users,
  BarChart3,
  DollarSign,
  Settings,
  Download,
  Search,
  TrendingUp,
  Maximize2,
  Minimize2
} from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'thinking' | 'action';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    onClick: () => void;
  }>;
}

const quickActions = [
  { icon: FileText, label: "Generate Report", action: "generate_report" },
  { icon: Users, label: "User Overview", action: "user_overview" },
  { icon: BarChart3, label: "Usage Analytics", action: "usage_analytics" },
  { icon: DollarSign, label: "Billing Summary", action: "billing_summary" },
  { icon: TrendingUp, label: "Growth Metrics", action: "growth_metrics" },
  { icon: Download, label: "Export Data", action: "export_data" },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your SRC Admin Assistant. I can help you generate reports, analyze data, manage users, and navigate the admin panel. What would you like me to help you with?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const messageIdCounter = useRef(2); // Start from 2 since we have message id '1'

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Auto-minimize when processing starts, expand when done
  useEffect(() => {
    if (isProcessing && isOpen) {
      setIsMinimized(true);
    } else if (!isProcessing && isMinimized && isOpen) {
      // Wait a bit before expanding to show completion
      const timer = setTimeout(() => {
        setIsMinimized(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, isOpen, isMinimized]);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    setMessages(prev => [...prev, {
      ...message,
      id: `msg-${messageIdCounter.current++}`,
      timestamp: new Date(),
    }]);
  };

  const simulateThinking = async (steps: string[]) => {
    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      addMessage({
        type: 'thinking',
        content: step,
      });
    }
  };

  const performAction = async (action: string, params?: any) => {
    setIsProcessing(true);

    // User message
    addMessage({
      type: 'user',
      content: params?.userQuery || `Perform ${action}`,
    });

    switch (action) {
      case 'generate_report':
        await simulateThinking([
          '📊 Analyzing current data...',
          '📈 Calculating metrics...',
          '📝 Compiling report structure...',
        ]);
        
        addMessage({
          type: 'action',
          content: '✅ Navigating to Reports page...',
        });
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        navigate('/reports');
        
        addMessage({
          type: 'assistant',
          content: 'I\'ve navigated you to the Reports page. You can now generate a custom report by selecting the report type, period, and format. Would you like me to help with anything else?',
        });
        
        toast.success("Navigated to Reports", {
          description: "You can now generate your report"
        });
        break;

      case 'user_overview':
        await simulateThinking([
          '👥 Fetching user data...',
          '📊 Analyzing user metrics...',
        ]);
        
        navigate('/users');
        
        addMessage({
          type: 'assistant',
          content: 'Here\'s the User Management page. Currently, you have 2,847 total users with a 12.5% growth rate. Is there a specific user or metric you\'d like to explore?',
          actions: [
            {
              label: 'View Active Users',
              onClick: () => toast.info('Filtering active users...'),
            },
            {
              label: 'Check High Usage',
              onClick: () => toast.info('Showing users with high quota usage...'),
            }
          ]
        });
        break;

      case 'usage_analytics':
        await simulateThinking([
          '📊 Collecting usage data...',
          '🔍 Analyzing API patterns...',
          '📈 Generating insights...',
        ]);
        
        navigate('/usage');
        
        addMessage({
          type: 'assistant',
          content: 'I\'ve taken you to Usage Tracking. Your platform has processed 71,280 API calls with a 99.4% success rate. GPT-4 accounts for 45% of usage. Want to dive deeper into any specific metric?',
          actions: [
            {
              label: 'Show Top Users',
              onClick: () => {
                toast.success('Showing top API users');
              },
            },
            {
              label: 'Model Breakdown',
              onClick: () => {
                toast.info('Analyzing model distribution...');
              },
            }
          ]
        });
        break;

      case 'billing_summary':
        await simulateThinking([
          '💰 Calculating revenue...',
          '💳 Analyzing costs...',
          '📊 Computing profit margins...',
        ]);
        
        navigate('/billing');
        
        addMessage({
          type: 'assistant',
          content: 'Here\'s your Billing overview: Monthly Revenue: $25.8k | API Costs: $12.1k | Profit: $13.7k (53.1% margin). Your LLM costs represent 73.5% of total expenses. Would you like to explore cost optimization?',
        });
        break;

      case 'growth_metrics':
        await simulateThinking([
          '📈 Analyzing growth trends...',
          '🎯 Calculating KPIs...',
        ]);
        
        navigate('/');
        
        addMessage({
          type: 'assistant',
          content: 'Growth Overview: User growth +12.5%, Revenue growth +22.7%, Customer retention 94.2%. Your platform is showing strong upward trends! Want me to generate a detailed growth report?',
          actions: [
            {
              label: 'Generate Growth Report',
              onClick: () => {
                performAction('generate_report');
              },
            }
          ]
        });
        break;

      case 'export_data':
        await simulateThinking([
          '📦 Preparing data export...',
          '🔒 Ensuring data security...',
          '📄 Generating export file...',
        ]);
        
        addMessage({
          type: 'assistant',
          content: 'Data export prepared! I can export: User data, Usage statistics, Billing records, or Complete analytics. Which would you like?',
          actions: [
            {
              label: 'Export Users',
              onClick: () => toast.success('Exporting user data...'),
            },
            {
              label: 'Export Analytics',
              onClick: () => toast.success('Exporting analytics data...'),
            },
            {
              label: 'Export All',
              onClick: () => toast.success('Preparing complete export...'),
            }
          ]
        });
        break;

      case 'search':
        await simulateThinking([
          '🔍 Searching across all data...',
          '📊 Finding relevant results...',
        ]);
        
        addMessage({
          type: 'assistant',
          content: `I found results for "${params?.query}". Let me show you the most relevant information...`,
        });
        break;

      default:
        // Handle natural language queries
        await simulateThinking([
          '🤔 Understanding your request...',
          '🔍 Finding the best solution...',
        ]);
        
        addMessage({
          type: 'assistant',
          content: 'I can help you with: generating reports, viewing user analytics, checking billing, monitoring API usage, and navigating the admin panel. What specific task would you like assistance with?',
        });
    }

    setIsProcessing(false);
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userQuery = input.trim();
    setInput("");

    // Simple NLP-like parsing
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('report') || lowerQuery.includes('generate')) {
      await performAction('generate_report', { userQuery });
    } else if (lowerQuery.includes('user') || lowerQuery.includes('account')) {
      await performAction('user_overview', { userQuery });
    } else if (lowerQuery.includes('usage') || lowerQuery.includes('api')) {
      await performAction('usage_analytics', { userQuery });
    } else if (lowerQuery.includes('billing') || lowerQuery.includes('cost') || lowerQuery.includes('revenue')) {
      await performAction('billing_summary', { userQuery });
    } else if (lowerQuery.includes('growth') || lowerQuery.includes('trend')) {
      await performAction('growth_metrics', { userQuery });
    } else if (lowerQuery.includes('export') || lowerQuery.includes('download')) {
      await performAction('export_data', { userQuery });
    } else {
      await performAction('default', { userQuery });
    }
  };

  // Get last thinking message for minimized view
  const lastThinkingMessage = [...messages].reverse().find(m => m.type === 'thinking' || m.type === 'action');

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 relative group"
            >
              <Sparkles className="w-6 h-6 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full bg-blue-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background Highlight - visible, not blurred */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 pointer-events-none z-30"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            )}

            {/* Minimized Floating Window */}
            {isMinimized ? (
              <motion.div
                key="minimized"
                initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
                animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border-2 border-blue-500"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center"
                      >
                        <Sparkles className="w-4 h-4 text-white" />
                      </motion.div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">AI Assistant Working</p>
                        <p className="text-xs text-gray-500">Processing your request...</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMinimized(false)}
                      className="h-8 w-8"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Show current activity */}
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-start gap-2">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-gray-700">
                        {lastThinkingMessage?.content || 'Processing...'}
                      </p>
                    </div>
                  </div>

                  {/* Progress indicator */}
                  <div className="mt-3 space-y-1">
                    <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 to-purple-600"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ width: '50%' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Full Sidebar Panel */
              <>
                {/* Light backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/10 z-40"
                  onClick={() => !isProcessing && setIsOpen(false)}
                />

                {/* Panel */}
                <motion.div
                  key="expanded"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-white shadow-2xl z-50 flex flex-col"
                >
                  {/* Header */}
                  <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-white">AI Assistant</h2>
                          <p className="text-sm text-blue-100">Always here to help</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isProcessing && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMinimized(true)}
                            className="text-white hover:bg-white/20"
                          >
                            <Minimize2 className="w-5 h-5" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsOpen(false)}
                          className="text-white hover:bg-white/20"
                          disabled={isProcessing}
                        >
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4 border-b bg-gray-50">
                    <p className="text-xs font-medium text-gray-600 mb-3">QUICK ACTIONS</p>
                    <div className="grid grid-cols-3 gap-2">
                      {quickActions.map((action, index) => {
                        const Icon = action.icon;
                        return (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => performAction(action.action)}
                            disabled={isProcessing}
                            className="p-3 rounded-lg border bg-white hover:bg-blue-50 hover:border-blue-300 transition-all flex flex-col items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Icon className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                            <span className="text-xs text-gray-600 group-hover:text-blue-600 text-center leading-tight">
                              {action.label}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.type === 'thinking' ? (
                            <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                              <Loader2 className="w-4 h-4 animate-spin" />
                              {message.content}
                            </div>
                          ) : message.type === 'action' ? (
                            <div className="flex items-center gap-2 text-sm text-blue-600 font-medium">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              >
                                <Settings className="w-4 h-4" />
                              </motion.div>
                              {message.content}
                            </div>
                          ) : (
                            <div
                              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                                message.type === 'user'
                                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              {message.actions && message.actions.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                  {message.actions.map((action, idx) => (
                                    <Button
                                      key={idx}
                                      variant="outline"
                                      size="sm"
                                      onClick={action.onClick}
                                      className="bg-white hover:bg-gray-50"
                                    >
                                      {action.label}
                                    </Button>
                                  ))}
                                </div>
                              )}
                              <p className="text-xs opacity-70 mt-2">
                                {message.timestamp.toLocaleTimeString([], { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                      {isProcessing && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-start"
                        >
                          <div className="bg-gray-100 rounded-2xl px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <motion.div
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                />
                                <motion.div
                                  className="w-2 h-2 bg-gray-400 rounded-full"
                                  animate={{ y: [0, -8, 0] }}
                                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="p-4 border-t bg-white">
                    <div className="flex gap-2">
                      <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask me anything..."
                        disabled={isProcessing}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSend}
                        disabled={!input.trim() || isProcessing}
                        size="icon"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        {isProcessing ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Try: "Generate a report" or "Show user analytics"
                    </p>
                  </div>
                </motion.div>
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
}