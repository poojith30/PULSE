import { useLocalStorage } from './useLocalStorage'

/**
 * useTasks Hook
 * Placeholder hook for student task management.
 * In future prompts, this will expose add, update, delete, and toggle actions.
 */
export function useTasks() {
  const [tasks, setTasks] = useLocalStorage('pulse_tasks', [])

  return {
    tasks,
    setTasks,
  }
}
