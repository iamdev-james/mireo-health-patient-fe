// components/compliance/tab-switcher.tsx
"use client"

interface Tab {
  id: string
  label: string
}

interface TabSwitcherProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function TabSwitcher({ tabs, activeTab, onTabChange }: TabSwitcherProps) {
  return (
    <div className="m-auto mb-6 flex max-w-64 rounded-lg bg-gray-100 p-1 sm:max-w-sm">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 rounded-md px-4 py-2.5 text-sm transition-all ${
              isActive ? "bg-white text-black" : "text-gray-400 hover:text-gray-600"
            } `}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
