import { useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { CreditCard, Users, Check } from "lucide-react";
import { toast } from "sonner";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const plans = [
  {
    name: "Free",
    price: "$0",
    features: ["1,000 API calls/month", "Basic support", "1 user"],
    color: "gray"
  },
  {
    name: "Starter",
    price: "$29",
    features: ["10,000 API calls/month", "Email support", "3 users"],
    color: "blue"
  },
  {
    name: "Pro",
    price: "$99",
    features: ["100,000 API calls/month", "Priority support", "10 users"],
    color: "purple",
    popular: true
  },
  {
    name: "Enterprise",
    price: "$299",
    features: ["Unlimited API calls", "24/7 support", "Unlimited users"],
    color: "amber"
  },
];

export function AddSubscriptionModal({ isOpen, onClose, onSuccess }: AddSubscriptionModalProps) {
  const [selectedPlan, setSelectedPlan] = useState("Pro");
  const [userEmail, setUserEmail] = useState("");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Subscription created successfully", {
      description: `${selectedPlan} plan activated for ${userEmail}`
    });

    setIsProcessing(false);
    onSuccess?.();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Subscription</DialogTitle>
          <DialogDescription>
            Select a plan and assign it to a user
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User Selection */}
          <div className="space-y-2">
            <Label htmlFor="user">User Email</Label>
            <Input
              id="user"
              type="email"
              placeholder="user@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              required
            />
          </div>

          {/* Billing Cycle */}
          <div className="space-y-2">
            <Label htmlFor="cycle">Billing Cycle</Label>
            <Select value={billingCycle} onValueChange={setBillingCycle}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly (Save 20%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Plan Selection */}
          <div className="space-y-3">
            <Label>Select Plan</Label>
            <div className="grid grid-cols-2 gap-3">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedPlan(plan.name)}
                  className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedPlan === plan.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600">
                      Popular
                    </Badge>
                  )}
                  {selectedPlan === plan.name && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="mb-3">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <p className="text-2xl font-bold text-blue-600 mt-1">
                      {plan.price}
                      <span className="text-sm text-gray-500">/mo</span>
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing || !userEmail}>
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Create Subscription
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
