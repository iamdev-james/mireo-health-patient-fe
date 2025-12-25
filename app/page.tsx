import { Metadata } from "next"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Mireo Health - Patient App",
  // openGraph: {
  //   url: "https://next-enterprise.vercel.app/",
  //   images: [
  //     {
  //       width: 1200,
  //       height: 630,
  //       url: "",
  //     },
  //   ],
  // },
}

export default function Web() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <h2 className="py-5 text-center font-bold">Patient App</h2>
      </section>
    </>
  )
}
