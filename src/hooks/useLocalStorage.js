import { useState, useEffect } from 'react'

/**
 * useLocalStorage Hook
 * Reusable hook to sync React state with browser localStorage.
 * 
 * @param {string} key - The localStorage storage key
 * @param {*} initialValue - Fallback value if no stored data exists
 * @returns {[any, Function]} - Stored value and state setter function
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
