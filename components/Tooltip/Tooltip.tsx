"use client"

import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"

import { Tooltip as TooltipRoot, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const tooltipContent = cva([], {
  variants: {
    intent: {
      primary: ["rounded-md", "bg-zinc-700", "font-sans", "text-white"],
    },
    size: {
      md: ["px-4", "py-2.5", "text-xs"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
})

const tooltipArrow = cva([], {
  variants: {
    intent: {
      primary: ["fill-zinc-700"],
    },
    size: {
      md: ["w-4", "h-2"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
})

export interface TooltipProps extends VariantProps<typeof tooltipContent>, TooltipPrimitive.TooltipProps {
  explainer: React.ReactElement | string
  children: React.ReactElement
  className?: string
  withArrow?: boolean
  side?: "top" | "right" | "bottom" | "left"
}

export function Tooltip({
  children,
  explainer,
  open,
  defaultOpen,
  onOpenChange,
  intent,
  size,
  side = "top",
  className,
  withArrow,
}: TooltipProps) {
  return (
    <TooltipRoot open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange} delayDuration={200}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={5}
          className={cn(tooltipContent({ intent, size, className }))}
        >
          {explainer}
          {withArrow ? <TooltipPrimitive.Arrow className={cn(tooltipArrow({ intent, size }))} /> : null}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipRoot>
  )
}
