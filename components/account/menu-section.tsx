// components/account/menu-section.tsx

interface MenuSectionProps {
  title: string
  children: React.ReactNode
}

export function MenuSection({ title, children }: MenuSectionProps) {
  return (
    <div className="space-y-3">
      <h2 className="px-2 text-base font-medium text-gray-600">{title}</h2>
      <div className="space-y-2">{children}</div>
    </div>
  )
}
