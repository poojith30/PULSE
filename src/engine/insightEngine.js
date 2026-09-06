const DAYS_IN_WEEK = 7

function getDateStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function getDateKey(date) {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${month}-${day}`
}

function parseDate(value) {
  if (!value) return null
  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)

  if (dateOnlyMatch) {
    const year = Number(dateOnlyMatch[1])
    const month = Number(dateOnlyMatch[2])
    const day = Number(dateOnlyMatch[3])
    const date = new Date(year, month - 1, day)

    return date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
      ? date
      : null
  }

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function getWeekStart(date = new Date()) {
  const dateStart = getDateStart(date)
  const day = dateStart.getDay()
  const daysSinceMonday = day === 0 ? 6 : day - 1
  dateStart.setDate(dateStart.getDate() - daysSinceMonday)
  return dateStart
}

function isInCurrentWeek(value, referenceDate) {
  const date = parseDate(value)
  if (!date) return false

  const weekStart = getWeekStart(referenceDate)
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekEnd.getDate() + DAYS_IN_WEEK)

  return date >= weekStart && date < weekEnd
}

function getTaskDeadlineKey(deadline) {
  if (typeof deadline !== 'string' || !deadline.trim()) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(deadline)) return deadline

  const date = parseDate(deadline)
  return date ? getDateKey(date) : null
}

function getTaskCompletionRecords(tasks, referenceDate) {
  if (!Array.isArray(tasks)) return []

  return tasks.filter((task) => (
    task &&
    task.completed === true &&
    isInCurrentWeek(task.completedAt, referenceDate)
  ))
}

function getTrackedTasks(tasks, referenceDate) {
  if (!Array.isArray(tasks)) return []

  return tasks.filter((task) => (
    task && (
      isInCurrentWeek(task.createdAt, referenceDate) ||
      isInCurrentWeek(task.completedAt, referenceDate)
    )
  ))
}

function getOnTimeTasks(completedTasks) {
  return completedTasks.filter((task) => {
    const completedDate = parseDate(task.completedAt)
    const deadlineKey = getTaskDeadlineKey(task.deadline)

    if (!completedDate || !deadlineKey) return false
    return getDateKey(completedDate) <= deadlineKey
  })
}

function getSessionRecords(sessions, referenceDate) {
  if (!Array.isArray(sessions)) return []

  return sessions.filter((session) => (
    session &&
    Number.isFinite(Number(session.actualMinutes)) &&
    Number(session.actualMinutes) >= 0 &&
    isInCurrentWeek(session.endedAt || session.startedAt, referenceDate)
  ))
}

function getSessionTotals(tasks, sessions, referenceDate) {
  const taskMap = new Map(
    (Array.isArray(tasks) ? tasks : [])
      .filter((task) => task && typeof task.id === 'string')
      .map((task) => [task.id, task]),
  )
  const actualByTask = new Map()
  const weeklySessions = getSessionRecords(sessions, referenceDate)

  weeklySessions.forEach((session) => {
    const currentTotal = actualByTask.get(session.taskId) || 0
    actualByTask.set(session.taskId, currentTotal + Number(session.actualMinutes))
  })

  let estimatedMinutes = 0
  let actualMinutes = 0
  let comparedTaskCount = 0

  actualByTask.forEach((actual, taskId) => {
    const task = taskMap.get(taskId)
    const estimated = Number(task?.estimatedMinutes)

    // Deleted tasks can still have sessions. Keep them in focus averages,
    // but skip them here because there is no estimate left to compare.
    if (!task || !Number.isFinite(estimated) || estimated <= 0) return

    estimatedMinutes += estimated
    actualMinutes += actual
    comparedTaskCount += 1
  })

  return { estimatedMinutes, actualMinutes, comparedTaskCount, weeklySessions }
}

export function calculateCompletionRate(completedCount, totalCount) {
  if (!totalCount) return 0
  return completedCount / totalCount
}

export function calculateOnTimeRate(onTimeCount, completedCount) {
  if (!completedCount) return 0
  return onTimeCount / completedCount
}

export function calculateEstimateAccuracy(estimatedMinutes, actualMinutes) {
  if (!estimatedMinutes || !Number.isFinite(actualMinutes)) return null
  return actualMinutes / estimatedMinutes
}

export function calculateWeeklyInsights(tasks = [], sessions = [], referenceDate = new Date()) {
  const completedTasks = getTaskCompletionRecords(tasks, referenceDate)
  const trackedTasks = getTrackedTasks(tasks, referenceDate)
  const onTimeTasks = getOnTimeTasks(completedTasks)
  const sessionTotals = getSessionTotals(tasks, sessions, referenceDate)
  const averageFocusMinutes = sessionTotals.weeklySessions.length > 0
    ? sessionTotals.weeklySessions.reduce((total, session) => total + Number(session.actualMinutes), 0) / sessionTotals.weeklySessions.length
    : null

  return {
    trackedTaskCount: trackedTasks.length,
    completedTaskCount: completedTasks.length,
    onTimeTaskCount: onTimeTasks.length,
    completionRate: calculateCompletionRate(completedTasks.length, trackedTasks.length),
    onTimeRate: calculateOnTimeRate(onTimeTasks.length, completedTasks.length),
    sessionCount: sessionTotals.weeklySessions.length,
    averageFocusMinutes,
    estimatedMinutes: sessionTotals.estimatedMinutes,
    actualMinutes: sessionTotals.actualMinutes,
    estimateAccuracy: calculateEstimateAccuracy(sessionTotals.estimatedMinutes, sessionTotals.actualMinutes),
    comparedTaskCount: sessionTotals.comparedTaskCount,
  }
}

export function getPersonalInsight(tasks = [], sessions = []) {
  const taskMap = new Map(
    (Array.isArray(tasks) ? tasks : [])
      .filter((task) => task && typeof task.id === 'string')
      .map((task) => [task.id, task]),
  )
  const totalsByCategory = new Map()

  if (Array.isArray(sessions)) {
    sessions.forEach((session) => {
      const task = taskMap.get(session?.taskId)
      const actual = Number(session?.actualMinutes)
      const estimated = Number(task?.estimatedMinutes)

      if (!task || !Number.isFinite(actual) || !Number.isFinite(estimated) || estimated <= 0) return

      const category = task.category || 'Other'
      const current = totalsByCategory.get(category) || { tasks: new Set(), estimated: 0, actual: 0 }
      current.tasks.add(task.id)
      current.estimated += estimated
      current.actual += actual
      totalsByCategory.set(category, current)
    })
  }

  for (const [category, totals] of totalsByCategory) {
    if (totals.tasks.size < 2) continue

    const ratio = totals.actual / totals.estimated
    if (ratio > 1.1) {
      return `You usually spend longer than estimated on ${category.toLowerCase()} tasks.`
    }
    if (ratio < 0.9) {
      return `You usually finish ${category.toLowerCase()} tasks faster than estimated.`
    }
  }

  return 'Complete a few more tasks to discover your patterns.'
}
