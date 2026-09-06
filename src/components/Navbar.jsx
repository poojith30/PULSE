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
    <header className="topbar">
      <div className="topbar-inner">
        <NavLink to="/" className="brand" aria-label="PULSE home">
          <div className="brand-mark" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="2 12 6 12 9 4 15 20 18 12 22 12" />
            </svg>
          </div>
          <span className="brand-name">PULSE</span>
        </NavLink>

        <nav className="main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
