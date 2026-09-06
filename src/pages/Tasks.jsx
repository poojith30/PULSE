import React from 'react'

/**
 * Tasks Page
 * The action and execution space for student tasks.
 * Will host task prioritization, breakdowns, and focus modes.
 */
export default function Tasks() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Tasks
        </h1>
        <p className="text-base text-zinc-600 sm:text-lg">
          Turn everything on your mind into clear next steps.
        </p>
      </section>

      {/* Subtle Tasks Placeholder */}
      <section className="rounded-xl border border-dashed border-zinc-200 bg-white/50 p-8 text-center sm:p-12">
        <p className="text-sm text-zinc-400">
          Your tasks and priorities will be organized here.
        </p>
      </section>
    </div>
  )
}
