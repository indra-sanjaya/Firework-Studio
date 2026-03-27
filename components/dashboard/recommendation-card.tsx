import { LucideIcon, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface RecommendationCardProps {
  title: string
  description: string
  icon: LucideIcon
  priority: "high" | "medium" | "low"
  action: string
}

export function RecommendationCard({
  title,
  description,
  icon: Icon,
  priority,
  action
}: RecommendationCardProps) {
  return (
    <div className="group flex items-start gap-4 rounded-[20px] bg-card p-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)]">
      <div className={cn(
        "rounded-[16px] p-3 flex-shrink-0",
        priority === "high" && "bg-[#FFD54F]/20",
        priority === "medium" && "bg-[#A7D7A0]/20",
        priority === "low" && "bg-[#CFEFFF]/40"
      )}>
        <Icon className={cn(
          "h-5 w-5",
          priority === "high" && "text-[#F59E0B]",
          priority === "medium" && "text-[#4CAF50]",
          priority === "low" && "text-[#0EA5E9]"
        )} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{description}</p>
          </div>
          <span className={cn(
            "flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
            priority === "high" && "bg-[#FFD54F] text-[#2E2E2E]",
            priority === "medium" && "bg-[#A7D7A0] text-[#2E2E2E]",
            priority === "low" && "bg-[#CFEFFF] text-[#2E2E2E]"
          )}>
            {priority}
          </span>
        </div>
        
        <button className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#4CAF50] hover:text-[#388E3C] transition-colors">
          {action}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  )
}
