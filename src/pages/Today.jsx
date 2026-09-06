import React from 'react'

/**
 * Today Page
 * The primary landing and daily decision experience for students.
 * Features the daily scenario workflow (placeholder for future prompts).
 */
export default function Today() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          PULSE
        </h1>
        <p className="text-base text-zinc-600 sm:text-lg">
          Start with a scenario.
          <br className="hidden sm:inline" /> End with a better decision.
        </p>
      </section>

      {/* Subtle Placeholder Card */}
      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-xs sm:p-8">
        <div className="space-y-2">
          <span className="inline-block text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            Today&apos;s Scenario
          </span>
          <p className="text-sm text-zinc-500">
            Your scenario will appear here.
          </p>
        </div>
      </section>
    </div>
  )
}
