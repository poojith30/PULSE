const MINUTES_PER_FOCUS_DAY = 120
const MINUTES_PER_DAY = 24 * 60

function getLocalDateStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function parseDeadline(deadline) {
  if (typeof deadline !== 'string' || !deadline.trim()) {
    return null
  }

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(deadline)
  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1])
    const month = Number(dateOnlyMatch[2])
    const day = Number(dateOnlyMatch[3])
    const date = new Date(
      year,
      month - 1,
      day,
    )

    return date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
      ? date
      : null
  }

  const parsedDate = new Date(deadline)
  return Number.isNaN(parsedDate.getTime()) ? null : parsedDate
}

export function getDeadlineUrgency(deadline, now = new Date()) {
  const deadlineDate = parseDeadline(deadline)
  if (!deadlineDate) {
    return 100
  }

  const todayStart = getLocalDateStart(now)
  const deadlineStart = getLocalDateStart(deadlineDate)
  const daysUntilDeadline = Math.floor((deadlineStart - todayStart) / (MINUTES_PER_DAY * 60_000))

  if (daysUntilDeadline < 0) return 100
  if (daysUntilDeadline === 0) return 100
  if (daysUntilDeadline === 1) return 85
  if (daysUntilDeadline <= 3) return 65
  if (daysUntilDeadline <= 6) return 40
  return 20
}

export function getImportanceScore(importance) {
  const importanceScores = {
    1: 20,
    2: 40,
    3: 60,
    4: 80,
    5: 100,
  }

  return importanceScores[Number(importance)] || 0
}

export function getEffortScore(estimatedMinutes) {
  const minutes = Number(estimatedMinutes)

  if (!Number.isFinite(minutes) || minutes <= 0) return 100
  if (minutes < 30) return 25
  if (minutes <= 60) return 40
  if (minutes <= 120) return 65
  if (minutes <= 240) return 85
  return 100
}

function getAvailableMinutes(deadline, now) {
  const deadlineDate = parseDeadline(deadline)
  if (!deadlineDate) {
    return 0
  }

  const todayStart = getLocalDateStart(now)
  const deadlineStart = getLocalDateStart(deadlineDate)
  const calendarDaysRemaining = Math.floor((deadlineStart - todayStart) / (MINUTES_PER_DAY * 60_000))

  if (calendarDaysRemaining < 0) {
    return 0
  }

  // Date-only tasks receive one focused work block today, plus one per future day.
  return Math.max(calendarDaysRemaining, 1) * MINUTES_PER_FOCUS_DAY
}

export function getDeadlineRisk(task, now = new Date()) {
  const estimatedMinutes = Number(task?.estimatedMinutes)
  const availableMinutes = getAvailableMinutes(task?.deadline, now)

  if (!Number.isFinite(estimatedMinutes) || estimatedMinutes <= 0 || availableMinutes === 0) {
    return 100
  }

  const requiredWorkRatio = estimatedMinutes / availableMinutes

  if (requiredWorkRatio >= 1) return 100
  if (requiredWorkRatio >= 0.75) return 85
  if (requiredWorkRatio >= 0.5) return 70
  if (requiredWorkRatio >= 0.25) return 45
  return 20
}

export function getPriorityLabel(score) {
  if (score >= 70) return 'HIGH'
  if (score >= 40) return 'MEDIUM'
  return 'LOW'
}

export function calculatePriority(task, now = new Date()) {
  const urgency = getDeadlineUrgency(task?.deadline, now)
  const importance = getImportanceScore(task?.importance)
  const effort = getEffortScore(task?.estimatedMinutes)
  const risk = getDeadlineRisk(task, now)
  const score = Math.round(
    urgency * 0.35 +
    importance * 0.25 +
    effort * 0.20 +
    risk * 0.20,
  )

  return {
    score,
    label: getPriorityLabel(score),
    urgency,
    importance,
    effort,
    risk,
  }
}

export function sortTasksByPriority(tasks = [], now = new Date()) {
  return [...tasks].sort((firstTask, secondTask) => (
    calculatePriority(secondTask, now).score - calculatePriority(firstTask, now).score
  ))
}

export function getNextTask(tasks = [], now = new Date()) {
  const activeTasks = tasks.filter((task) => !task.completed)
  return sortTasksByPriority(activeTasks, now)[0] || null
}
