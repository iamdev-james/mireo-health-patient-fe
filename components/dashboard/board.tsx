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
        <h2 className="mb-5 text-2xl font-semibold text-black">My Board</h2>
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white px-6 py-12">
          <ClipboardList className="mb-4 h-16 w-16 text-gray-200" strokeWidth={1.5} />
          <p className="text-center text-base text-gray-400">You don&apos;t have any new updates</p>
        </div>
      </section>
    )
  }

  return (
    <section className="mt-10">
      <h2 className="mb-5 text-2xl font-semibold text-black">My Board</h2>
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
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
        >
          <div>
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.message}</p>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 shrink-0 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-gray-400" />
          )}
        </button>

        {isExpanded && item.tests && (
          <div className="border-t border-gray-100 px-6 pb-6">
            <ul className="mt-4 mb-4 space-y-3">
              {item.tests.map((test) => (
                <li key={test.id} className="flex items-center justify-between">
                  <span className="text-base text-black">{test.name}</span>
                  {test.uploaded ? (
                    <div className="flex items-center gap-1.5 text-sm font-medium text-blue-600">
                      <Check className="h-4 w-4" />
                      Uploaded
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Not uploaded</span>
                  )}
                </li>
              ))}
            </ul>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full rounded-xl border-2 border-blue-600 py-6 text-base font-medium text-blue-600 hover:bg-blue-50"
            >
              <Link href="/upload-results">Upload remaining results</Link>
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (item.type === "booking-confirmation") {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6">
        <div className="mb-4 flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600">
            <Check className="h-5 w-5 text-white" strokeWidth={3} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-black">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500">
              Your screening is scheduled for{" "}
              <span className="font-medium text-black">
                {item.scheduledDate}, {item.scheduledTime}
              </span>
            </p>
          </div>
        </div>

        {item.action && (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full rounded-xl border-2 border-blue-600 py-6 text-base font-medium text-blue-600 hover:bg-blue-50"
          >
            <Link href={item.action.href || "#"}>{item.action.label}</Link>
          </Button>
        )}
      </div>
    )
  }

  if (item.type === "doctor-review") {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6">
        <h3 className="mb-2 text-lg font-semibold text-black">{item.title}</h3>
        <p className="mb-6 text-sm leading-relaxed text-gray-500">{item.message}</p>

        {item.action && (
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full rounded-xl border-2 border-blue-600 py-6 text-base font-medium text-blue-600 hover:bg-blue-50"
          >
            <Link href={item.action.href || "#"} className="flex items-center justify-center gap-2">
              {item.action.label}
              <Phone className="h-5 w-5" />
            </Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-6">
      <div className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-1.5">
        <span className="text-sm font-medium text-blue-600">Next Steps</span>
      </div>

      <h3 className="mb-3 text-xl leading-tight font-semibold text-black">{item.title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-gray-500">{item.message}</p>

      {item.action && (
        <Button asChild size="lg" className="rounded-xl bg-blue-600 px-6 py-6 text-base font-medium hover:bg-blue-700">
          <Link href={item.action.href || "#"} className="flex items-center justify-center gap-2">
            {item.action.label}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Button>
      )}
    </div>
  )
}
