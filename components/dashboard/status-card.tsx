// components/dashboard/status-card.tsx
"use client"

import { ArrowRight, Phone } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { StatusCardData } from "@/types/dashboard"

interface StatusCardProps {
  data: StatusCardData
}

export function StatusCard({ data }: StatusCardProps) {
  return (
    <div className="bg-primary/15 border-primary/30 relative mt-8 rounded-[14px] border px-5 py-5">
      <div className="absolute top-5 right-6">
        <Image src="/images/stethoscope.svg" alt="Stethoscope Icon" width={30} height={30} className="" />
      </div>

      <div>
        <div className="pr-8">
          <h2 className="mb-2 text-xl leading-tight font-semibold text-black">{data.title}</h2>

          {data.message && <p className="mb-2 pr-2 text-sm leading-relaxed text-gray-500">{data.message}</p>}
        </div>

        {data.countdown && (
          <Button size="xl" className="mt-6 w-full">
            {data.countdown}
          </Button>
        )}

        {data.action && !data.countdown && (
          <Button asChild size="xl" className="mt-4 w-full">
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
