import { useLocalStorage } from './useLocalStorage'
import { generateSubtasks } from '../engine/breakdownEngine'

function createTaskId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('pulse-tasks', [])
  const safeTasks = Array.isArray(tasks)
    ? tasks.filter((task) => task && typeof task === 'object' && typeof task.id === 'string' && typeof task.title === 'string')
    : []

  function addTask(taskDetails) {
    const newTask = {
      id: createTaskId(),
      title: taskDetails.title,
      deadline: taskDetails.deadline,
      estimatedMinutes: Number(taskDetails.estimatedMinutes),
      importance: Number(taskDetails.importance),
      category: taskDetails.category,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      actualMinutes: null,
      subtasks: [],
    }

    setTasks((currentTasks) => [
      ...(Array.isArray(currentTasks) ? currentTasks : []),
      newTask,
    ])
  }

  function toggleTask(taskId) {
    setTasks((currentTasks) => (Array.isArray(currentTasks) ? currentTasks : []).map((task) => {
      if (task.id !== taskId) {
        return task
      }

      const isCompleting = !task.completed
      return {
        ...task,
        completed: isCompleting,
        completedAt: isCompleting ? new Date().toISOString() : null,
      }
    }))
  }

  function deleteTask(taskId) {
    setTasks((currentTasks) => (Array.isArray(currentTasks) ? currentTasks : []).filter((task) => task.id !== taskId))
  }

  function breakTaskIntoSteps(taskId) {
    setTasks((currentTasks) => (Array.isArray(currentTasks) ? currentTasks : []).map((task) => {
      if (task.id !== taskId || (Array.isArray(task.subtasks) && task.subtasks.length > 0)) {
        return task
      }

      return { ...task, subtasks: generateSubtasks(task) }
    }))
  }

  function toggleSubtask(taskId, subtaskId) {
    setTasks((currentTasks) => (Array.isArray(currentTasks) ? currentTasks : []).map((task) => {
      if (task.id !== taskId) {
        return task
      }

      return {
        ...task,
        subtasks: (Array.isArray(task.subtasks) ? task.subtasks : []).map((subtask) => (
          subtask.id === subtaskId
            ? { ...subtask, completed: !subtask.completed }
            : subtask
        )),
      }
    }))
  }

  return {
    tasks: safeTasks,
    addTask,
    toggleTask,
    deleteTask,
    breakTaskIntoSteps,
    toggleSubtask,
  }
}
