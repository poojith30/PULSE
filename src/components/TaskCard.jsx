import React from 'react'
import { calculatePriority } from '../engine/priorityEngine'
import { formatDate } from '../utils/date'

function formatDeadline(deadline) {
  return formatDate(`${deadline}T00:00:00`)
}

export default function TaskCard({ task, priority, onToggle, onDelete, onBreakdown, onToggleSubtask, onStartFocus }) {
  const taskPriority = priority || calculatePriority(task)
  const subtasks = Array.isArray(task.subtasks) ? task.subtasks : []
  const completedSubtasks = subtasks.filter((subtask) => subtask.completed).length

  return (
    <article className={`task-card ${task.completed ? 'completed' : ''}`}>
      <div className="task-card-main">
        <button
          type="button"
          className="task-check"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? `Reopen ${task.title}` : `Complete ${task.title}`}
        >
          {task.completed ? '✓' : ''}
        </button>
        <div className="task-card-copy">
          <h3>{task.title}</h3>
          <div className="task-details">
            <span>{formatDeadline(task.deadline)}</span>
            <span>{task.estimatedMinutes} min</span>
            <span>{task.category}</span>
          </div>
          {subtasks.length > 0 && (
            <div className="task-subtasks">
              <div className="subtask-heading"><span>Steps</span><span>{completedSubtasks}/{subtasks.length}</span></div>
              {subtasks.map((subtask) => (
                <label className={`subtask-row ${subtask.completed ? 'completed' : ''}`} key={subtask.id}>
                  <input type="checkbox" checked={subtask.completed} onChange={() => onToggleSubtask(task.id, subtask.id)} />
                  <span>{subtask.title}</span>
                  <small>{subtask.estimatedMinutes} min</small>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="task-card-side">
        <span className={`priority-label priority-${taskPriority.label.toLowerCase()}`}>
          {taskPriority.label} · {taskPriority.score}
        </span>
        <span className="importance-pill">Importance {task.importance}/5</span>
        <span className="task-status">{task.completed ? 'Completed' : 'Open'}</span>
        <div className="task-actions">
          {!task.completed && onStartFocus && <button type="button" className="task-action-button focus-action" onClick={() => onStartFocus(task)}>Focus</button>}
          {!task.completed && onBreakdown && subtasks.length === 0 && <button type="button" className="task-action-button" onClick={() => onBreakdown(task.id)}>Break into steps</button>}
          <button type="button" className="task-action-button" onClick={() => onToggle(task.id)}>
            {task.completed ? 'Reopen' : 'Complete'}
          </button>
          <button type="button" className="task-action-button delete" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>Delete</button>
        </div>
      </div>
    </article>
  )
}
