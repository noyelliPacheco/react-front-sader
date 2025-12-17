import {  Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export type WizardStep = {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "pending" | "active" | "complete";
};

type WizardSidebarProps = {
  steps: WizardStep[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
};

export function WizardSidebar({ steps, currentStep, onStepClick }: WizardSidebarProps) {
  return (
    <aside  className="w-80 border-r border-border bg-card">
      <div className="sticky top-16 h-[calc(100vh-4rem)] p-8">
        <div className="space-y-8">
        {steps.map((step, index) => {
          const isComplete = step.status === "complete";
          const isActive = step.status === "active";
          const isPending = step.status === "pending";
          const isClickable = isComplete || currentStep >= step.id;

          return (
            <div key={step.id} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "absolute left-4 top-7 w-0.5 h-11 transition-colors duration-300",
                    isComplete ? "bg-validation-success text-white" : "bg-step-line"
                  )}
                />
              )}

              {/* Step Item */}
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={cn(
                  "flex items-start gap-4 w-full text-left transition-all duration-300",
                  isClickable && "cursor-pointer hover:opacity-80",
                  !isClickable && "cursor-not-allowed opacity-50"
                )}
              >
                {/* Icon Container */}
                <div className={cn( "relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300",
                    isComplete && "bg-validation-success text-white",
                    isActive && "bg-guinda-150 text-primary-foreground shadow-lg shadow-primary/30",
                    isPending && "validation-info text-step-pending shadow-lg shadow-primary/30"
                  )}
                >
                  {isComplete ? (
                    <step.icon className="w-6 h-6 text-white" />
                  ) : (
                    <step.icon className="w-6 h-6" />
                  )}
                  
                  {/* Active Pulse */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-20" />
                  )}
                </div>

                {/* Step Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                        isComplete && "text-validation-success",
                        isActive && "text-primary",
                        isPending && "text-muted-foreground"
                      )}
                    >
                      Paso {step.id}
                    </span>
                    {isComplete && (
                      <Circle className="w-2 h-2 fill-success text-success" />
                    )}
                  </div>
                  <h3 className={cn( "text-sm font-medium transition-colors duration-300",
                      isComplete && "text-card-foreground",
                      isActive && "text-card-foreground font-semibold",
                      isPending && "text-muted-foreground"
                    )}>
                    {step.title}
                  </h3>
                </div>
              </button>
            </div>
          );
        })}
        </div>
      </div>
    </aside>
  );
}
