import React, { useState } from 'react'
import AddTaskModal from '../components/AddTaskModal'
import FocusTimer from '../components/FocusTimer'
import TaskCard from '../components/TaskCard'
import { calculatePriority, sortTasksByPriority } from '../engine/priorityEngine'
import { useTasks } from '../hooks/useTasks'

function getTodayKey() {
  const today = new Date()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${today.getFullYear()}-${month}-${day}`
}

function TaskGroup({ title, tasks, onToggle, onDelete, onBreakdown, onToggleSubtask, onStartFocus }) {
  return (
    <section className="task-group">
      <div className="task-group-heading">
        <p className="eyebrow">{title}</p>
        <span>{tasks.length}</span>
      </div>
      {tasks.length > 0 ? (
        <div className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              priority={calculatePriority(task)}
              onToggle={onToggle}
              onDelete={onDelete}
              onBreakdown={onBreakdown}
              onToggleSubtask={onToggleSubtask}
              onStartFocus={onStartFocus}
            />
          ))}
        </div>
      ) : (
        <p className="task-group-empty">Nothing here yet.</p>
      )}
    </section>
  )
}

/**
 * Tasks Page
 * The action and execution space for student tasks.
 * Hosts task creation, grouping, breakdown, and focus actions.
 */
export default function Tasks() {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    breakTaskIntoSteps,
    toggleSubtask,
  } = useTasks()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [focusTaskId, setFocusTaskId] = useState(null)
  const todayKey = getTodayKey()
  const openTasks = tasks.filter((task) => !task.completed)
  const todayTasks = sortTasksByPriority(openTasks.filter((task) => task.deadline <= todayKey))
  const upcomingTasks = sortTasksByPriority(openTasks.filter((task) => task.deadline > todayKey))
  const completedTasks = tasks.filter((task) => task.completed)
  const focusTask = tasks.find((task) => task.id === focusTaskId)

  function startFocus(task) {
    setFocusTaskId(task.id)
  }

  return (
    <div className="page-content tasks-page">
      <section className="page-intro compact-intro">
        <p className="eyebrow">Your actions</p>
        <h1>Tasks</h1>
        <p className="intro-copy">Turn everything on your mind into clear next steps.</p>
        <button type="button" className="primary-button page-action-button" onClick={() => setIsModalOpen(true)}>
          <span aria-hidden="true">+</span> Add task
        </button>
      </section>

      {tasks.length > 0 ? (
        <div className="task-groups">
          <TaskGroup title="Today" tasks={todayTasks} onToggle={toggleTask} onDelete={deleteTask} onBreakdown={breakTaskIntoSteps} onToggleSubtask={toggleSubtask} onStartFocus={startFocus} />
          <TaskGroup title="Upcoming" tasks={upcomingTasks} onToggle={toggleTask} onDelete={deleteTask} onBreakdown={breakTaskIntoSteps} onToggleSubtask={toggleSubtask} onStartFocus={startFocus} />
          <TaskGroup title="Completed" tasks={completedTasks} onToggle={toggleTask} onDelete={deleteTask} onBreakdown={breakTaskIntoSteps} onToggleSubtask={toggleSubtask} onStartFocus={startFocus} />
        </div>
      ) : (
        <section className="empty-state">
          <div className="empty-icon" aria-hidden="true">+</div>
          <h2>A clear list starts here.</h2>
          <p>Your tasks and priorities will be organized here.</p>
          <button type="button" className="primary-button" onClick={() => setIsModalOpen(true)}>
            <span aria-hidden="true">+</span> Add task
          </button>
        </section>
      )}

      {isModalOpen && <AddTaskModal onClose={() => setIsModalOpen(false)} onAddTask={addTask} />}
      {focusTask && <FocusTimer key={focusTask.id} task={focusTask} onClose={() => setFocusTaskId(null)} />}
    </div>
  )
}
