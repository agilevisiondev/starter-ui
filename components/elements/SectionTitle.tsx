import React from "react"

export default function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center pt-20 px-4 md:px-8 lg:px-10">
      <h2 className="pl-4 text-center text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        {title || "Default Title"}
      </h2>
      {subtitle && (
        <p className="mt-4 text-neutral-700 dark:text-neutral-300 text-sm md:text-base">
          {subtitle || "Default long subtitle that explains the info about a section"}
        </p>
      )}
    </div>
  )
}
