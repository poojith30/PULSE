import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

/**
 * Layout Component
 * Provides a consistent, responsive frame for all pages.
 * Enforces generous whitespace, calm typography, and clean centering.
 */
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-zinc-900">
      {/* Sticky Top Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6 sm:py-12">
        <Outlet />
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-zinc-200/60 py-6 text-center text-xs text-zinc-400">
        <p>PULSE — Student Decision & Action Assistant</p>
      </footer>
    </div>
  )
}
