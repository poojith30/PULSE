import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Today from './pages/Today'
import Tasks from './pages/Tasks'
import Settings from './pages/Settings'

/**
 * App Component
 * Defines client-side routing structure for PULSE:
 * - /         -> Today (Daily decision & scenario)
 * - /tasks    -> Tasks (Task management & next steps)
 * - /settings -> Settings (User preferences)
 */
export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Today />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
