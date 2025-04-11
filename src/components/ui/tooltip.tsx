"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TooltipProps {
  children: React.ReactNode
  content: string
  className?: string
}

export function Tooltip({ children, content, className }: TooltipProps) {
  return (
    <div className="relative group">
      {children}
      <div className={cn(
        "absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md",
        "opacity-0 invisible group-hover:opacity-100 group-hover:visible",
        "transition-all duration-200 transform -translate-y-2 group-hover:translate-y-0",
        "whitespace-nowrap",
        className
      )}>
        {content}
      </div>
    </div>
  )
} 