/**
 * date.js
 * Pure helper functions for date formatting and comparison.
 */

/**
 * Formats an ISO date string or Date object into a readable string (e.g., "Sep 6, 2026").
 * 
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return ''
  const date = new Date(dateInput)
  if (isNaN(date.getTime())) return ''
  
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

/**
 * Checks if a given date is today.
 * 
 * @param {string|Date} dateInput 
 * @returns {boolean}
 */
export function isToday(dateInput) {
  if (!dateInput) return false
  const date = new Date(dateInput)
  const today = new Date()
  
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}
