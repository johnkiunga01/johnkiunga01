import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface PricingProps {
  hideLanding?: boolean;
}

export default function Pricing({ hideLanding = false }: PricingProps) {
  return (
    <section id="pricing" className={cn("py-20", !hideLanding && "bg-slate-50")}>
      {!hideLanding && (
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment in Your Future</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that fits your career goals. 
            All plans include ATS-optimization and PDF export.
          </p>
        </div>
      )}

      <div className={cn(
        "container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8",
        hideLanding && "max-w-none"
      )}>
        {PLANS.map((plan) => (
          <div 
            key={plan.id}
            className={cn(
              "relative p-8 rounded-2xl bg-white border transition-all hover:shadow-xl",
              plan.popular ? "border-primary shadow-lg ring-1 ring-primary/20 scale-105 z-10" : "border-border shadow-sm",
              hideLanding && plan.popular && "scale-100"
            )}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-4xl font-bold">KES {plan.price}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-sm text-muted-foreground">Limit: {plan.limit} optimized CVs</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className="w-full h-11" 
              variant={plan.popular ? "default" : "outline"}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
      
      {!hideLanding && (
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Secure payments via <strong>M-Pesa</strong> & <strong>Stripe</strong></p>
        </div>
      )}
    </section>
  );
}