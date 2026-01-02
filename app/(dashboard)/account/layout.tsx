// app/(dashboard)/account/layout.tsx

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-350">
      <div className="m-auto min-h-screen w-full max-w-2xl">{children}</div>
    </div>
  )
}
