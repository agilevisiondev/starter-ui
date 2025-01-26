import React from "react"

export default function DashboardPageTitle({
  title,
  subTitle,
  filterItems,
  actionElement,
}: {
  title: string
  subTitle?: string
  filterItems?: React.ReactElement
  actionElement?: React.ReactElement
}) {
  return (
    <header className="flex flex-row items-center justify-between gap-x-2 mb-2">
      <div className="flex items-center space-x-12">
        <div className="flex flex-col">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {subTitle && <p className="text-gray-500 mb-4 text-sm">{subTitle}</p>}
        </div>
        <div>{filterItems}</div>
      </div>
      <div>{actionElement}</div>
    </header>
  )
}
