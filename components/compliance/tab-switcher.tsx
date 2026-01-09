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
    <div className="mb-6 flex rounded-xl bg-gray-50 p-1">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
              isActive ? "bg-white text-black shadow-sm" : "text-gray-400 hover:text-gray-600"
            } `}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
