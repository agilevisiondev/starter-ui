import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value: number // The current value of progress
  max: number // The maximum value of progress
  label?: string // Label to display inside the progress bar
  colorClass?: string // Class for the progress color
  showDetails?: boolean // Whether to show details (percentage and score/total)
}

const ColoredProgress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, value, max, label, colorClass = "bg-primary", showDetails = false, ...props }, ref) => {
    const percentage = Math.min((value / max) * 100, 100)

    return (
      <div className={cn("flex items-center gap-3", className)}>
        <ProgressPrimitive.Root
          ref={ref}
          className={cn("relative h-8 w-full overflow-hidden rounded-lg bg-white border border-gray-300", className)}
          {...props}
        >
          {showDetails && (
            <span className="space-x-4 text-sm absolute right-2 top-1">
              <span className="font-semibold">{percentage.toFixed(1)}%</span>
              <span className="text-gray-500">
                ({value}/{max})
              </span>
            </span>
          )}
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full transition-all duration-300 flex items-center justify-end pr-3 rounded-lg",
              colorClass,
            )}
            style={{ width: `${percentage}%` }}
          >
            {label && <span className="absolute left-3 text-sm">{label}</span>}
          </ProgressPrimitive.Indicator>
        </ProgressPrimitive.Root>
      </div>
    )
  },
)

ColoredProgress.displayName = ProgressPrimitive.Root.displayName

export { ColoredProgress }
