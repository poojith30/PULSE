import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import { useLocalStorage } from '../hooks/useLocalStorage'

/**
 * Layout Component
 * Provides a consistent, responsive frame for all pages.
 * Enforces generous whitespace, calm typography, and clean centering.
 */
export default function Layout() {
  const [settings] = useLocalStorage('pulse-settings', {})
  const selectedTheme = ['light', 'dark', 'system'].includes(settings?.theme)
    ? settings.theme
    : 'system'
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => (
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  ))
  const isDark = selectedTheme === 'dark' || (selectedTheme === 'system' && systemPrefersDark)
  const activeTheme = isDark ? 'theme-dark' : 'theme-light'

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const updateSystemTheme = (event) => setSystemPrefersDark(event.matches)

    setSystemPrefersDark(mediaQuery.matches)
    mediaQuery.addEventListener('change', updateSystemTheme)
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'

    return () => mediaQuery.removeEventListener('change', updateSystemTheme)
  }, [isDark])

  return (
    <div className={`app-shell ${activeTheme}`}>
      <Navbar />

      <main className="page-container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>PULSE <span>·</span> Student decision assistant</p>
      </footer>
    </div>
  )
}
