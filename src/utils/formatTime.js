/**
 * formatTime.js
 * Pure helper functions for time and duration formatting.
 */

/**
 * Formats total seconds into MM:SS format (e.g., 1500 seconds -> "25:00").
 * 
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatSecondsToTimer(totalSeconds) {
  if (typeof totalSeconds !== 'number' || totalSeconds < 0) {
    return '00:00'
  }
  
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  
  const paddedMinutes = String(minutes).padStart(2, '0')
  const paddedSeconds = String(seconds).padStart(2, '0')
  
  return `${paddedMinutes}:${paddedSeconds}`
}

/**
 * Formats minutes into a readable duration string (e.g., 45 -> "45 min", 90 -> "1h 30m").
 * 
 * @param {number} minutes
 * @returns {string}
 */
export function formatDuration(minutes) {
  if (!minutes || minutes <= 0) return '0 min'
  if (minutes < 60) return `${minutes} min`
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) return `${hours}h`
  return `${hours}h ${remainingMinutes}m`
}
