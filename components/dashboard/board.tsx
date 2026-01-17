// components/dashboard/board.tsx
"use client"

import { useState } from "react"
import { BoardItem } from "@/types/dashboard"
import { Button } from "@/components/ui/button"
import { ClipboardList, ChevronDown, ChevronUp, Check, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface BoardProps {
  items?: BoardItem[]
}

export function Board({ items }: BoardProps) {
  if (!items || items.length === 0) {
    return (
      <section className="mt-10">
        <h2 className="mb-5 text-xl text-black">My Board</h2>
        <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-gray-50 bg-white px-6 py-12">
          <ClipboardList className="mb-4 h-14 w-14 text-gray-50" strokeWidth={1} />
          <p className="text-center text-base text-gray-400">You don&apos;t have any new updates</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-10">
      <h2 className="mb-5 text-xl text-black">My Board</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <BoardItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

function BoardItemCard({ item }: { item: BoardItem }) {
  const [isExpanded, setIsExpanded] = useState(item.type === "lab-request")

  if (item.type === "lab-request") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-50 bg-white">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-start justify-between p-4 text-left transition-colors hover:bg-gray-50/10"
        >
          <div>
            <h3 className="text-lg text-black">{item.title}</h3>
            <p className="mt-1 text-xs leading-relaxed font-medium text-gray-400 md:text-sm">{item.message}</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
          )}
        </button>

        {isExpanded && item.tests && (
          <div className="-mt-4 px-5 pb-6">
            <ul className="mt-4 mb-6 list-outside list-disc space-y-5 pl-5">
              {item.tests.map((test) => (
                <li key={test.id}>
                  <div className="flex items-center justify-between">
                    <span className="text-base text-black">{test.name}</span>

                    {test.uploaded ? (
                      <div className="text-primary flex items-center gap-1.5 text-xs md:text-sm">
                        <Check className="h-4 w-4" />
                        Uploaded
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 md:text-sm">Not uploaded</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <Button asChild variant="primaryOutline" size="xl" className="w-full">
              <Link href="/upload-results">Upload remaining results</Link>
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (item.type === "booking-confirmation") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-50 bg-white px-4 py-5">
        <div className="mb-4 flex items-center gap-4">
          <div className="bg-primary flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-base font-medium text-black md:text-lg">{item.title}</h3>
            <p className="mt-1 text-xs text-gray-400 md:text-sm">{item.message}</p>
          </div>
        </div>

        <Button asChild variant="outline" size="xl" className="text-primary w-full">
          <Link href={"#"}>Track Progress</Link>
        </Button>
      </div>
    )
  }

  if (item.type === "doctor-review") {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-50 bg-white px-4 py-5">
        <h3 className="mb-2 text-base font-medium text-black md:text-lg">{item.title}</h3>
        <p className="mb-6 text-xs leading-relaxed text-gray-500 md:text-sm">{item.message}</p>

        <Button asChild variant="outline" size="lg" className="text-primary w-full">
          <Link href={"#"} className="flex items-center justify-center gap-2">
            {"Schedule call"}
            <Phone className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-50 bg-white px-4 py-5">
      <div className="bg-primary/10 border-primary/30 mb-4 inline-block rounded-md border px-2.5 pb-0.5">
        <span className="text-primary text-xs font-medium md:text-sm">Next Steps</span>
      </div>

      <h3 className="mb-2 text-base leading-tight font-medium text-black md:text-lg">{item.title}</h3>
      <p className="mb-6 text-xs leading-relaxed text-gray-500 md:text-sm">{item.message}</p>

      {item.action && (
        <Button asChild size="xl" className="">
          <Link href={item.action.href || "#"} className="flex items-center justify-center gap-2">
            {item.action.label}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </div>
  )
}
