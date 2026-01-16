// components/dashboard/status-card.tsx
"use client"

import { StatusCardData } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { Stethoscope, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

interface StatusCardProps {
  data: StatusCardData
}

export function StatusCard({ data }: StatusCardProps) {
  return (
    <div className="relative rounded-[20px] bg-blue-50/50 p-6">
      <div className="absolute top-6 right-6">
        <Stethoscope className="h-8 w-8 text-black" strokeWidth={1.5} />
      </div>

      <div className="pr-12">
        <h2 className="mb-2 text-2xl leading-tight font-semibold text-black">{data.title}</h2>

        {data.message && <p className="mb-6 text-base leading-relaxed text-gray-500">{data.message}</p>}

        {data.countdown && (
          <Button
            size="lg"
            className="w-full rounded-xl bg-blue-600 py-6 text-lg font-medium hover:bg-blue-700"
            disabled
          >
            {data.countdown}
          </Button>
        )}

        {data.action && !data.countdown && (
          <Button
            asChild
            size="lg"
            className="w-full rounded-xl bg-blue-600 py-6 text-lg font-medium hover:bg-blue-700"
          >
            <Link href={data.action.href || "#"} className="flex items-center justify-center gap-2">
              {data.action.icon === "phone" && <Phone className="h-5 w-5" />}
              {data.action.label}
              {data.action.icon === "arrow-right" && <ArrowRight className="h-5 w-5" />}
            </Link>
          </Button>
        )}
      </div>
    </div>
  )
}
