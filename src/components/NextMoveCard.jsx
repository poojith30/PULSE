import React from 'react'
import { calculatePriority } from '../engine/priorityEngine'
import { formatDate } from '../utils/date'

function formatDeadline(deadline) {
  return formatDate(`${deadline}T00:00:00`)
}

function getDeadlineMessage(priority) {
  if (priority.urgency === 100) return 'its deadline is today or overdue'
  if (priority.urgency >= 85) return 'its deadline is close'
  if (priority.urgency >= 65) return 'its deadline is approaching'
  return 'it has a little more time before its deadline'
}

function getImportanceMessage(task) {
  if (Number(task.importance) >= 4) return 'its importance is high'
  if (Number(task.importance) <= 2) return 'its importance is lower'
  return 'its importance is moderate'
}

function getWorkloadMessage(priority) {
  if (priority.risk >= 85) return 'it needs early attention because the available time is tight'
  if (priority.risk <= 45) return 'it can be completed within your available time'
  return 'it needs a focused block before the deadline'
}

export default function NextMoveCard({ task }) {
  const priority = calculatePriority(task)
  const explanation = `Start this now because ${getDeadlineMessage(priority)}, ${getImportanceMessage(task)}, and ${getWorkloadMessage(priority)}.`

  return (
    <section className="next-move-card">
      <div className="next-move-heading">
        <p className="eyebrow accent-label">Your next move</p>
        <span className={`priority-label priority-${priority.label.toLowerCase()}`}>
          {priority.label} · {priority.score}
        </span>
      </div>
      <h3>{task.title}</h3>
      <div className="next-move-details">
        <span>{formatDeadline(task.deadline)}</span>
        <span>{task.estimatedMinutes} min</span>
        <span>{task.category}</span>
      </div>
      <div className="next-move-reason">
        <p className="eyebrow">Why this one?</p>
        <p>{explanation}</p>
      </div>
    </section>
  )
}
