import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 * Navbar Component
 * Minimal top navigation bar following Apple/Linear aesthetic.
 * Provides accessible navigation between Today, Tasks, and Settings.
 */
export default function Navbar() {
  const navItems = [
    { path: '/', label: 'Today' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/settings', label: 'Settings' },
  ]

  return (
    <header className="sticky top-0 z-30 w-full border-b border-zinc-200/80 bg-zinc-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Name */}
        <NavLink to="/" className="flex items-center gap-2 group">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-xs transition-transform group-hover:scale-105">
            {/* Minimal Pulse Wave Icon */}
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-wider text-zinc-900 uppercase">
            Pulse
          </span>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-200/70 text-zinc-900'
                    : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
