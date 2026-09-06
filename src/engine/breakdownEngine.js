import { taskTemplates } from '../data/taskTemplates.js'

function getTemplateType(task) {
  const title = String(task?.title || '').toLowerCase()
  const category = String(task?.category || '').toLowerCase()

  if (title.includes('exam') || title.includes('test')) {
    return 'exam'
  }
  if (title.includes('presentation') || title.includes('slides')) {
    return 'presentation'
  }
  if (category === 'projects') {
    return 'project'
  }
  return 'assignment'
}

function createSubtaskId(taskId, index) {
  return `${taskId}-step-${index + 1}`
}

export function getTemplateForTask(task) {
  const templateType = getTemplateType(task)
  return taskTemplates[templateType] || taskTemplates.assignment
}

export function generateSubtasks(task) {
  const template = getTemplateForTask(task)
  const estimatedMinutes = Number(task?.estimatedMinutes)
  const stepMinutes = Number.isFinite(estimatedMinutes) && estimatedMinutes > 0
    ? Math.max(5, Math.round(estimatedMinutes / template.length))
    : 15

  return template.map((title, index) => ({
    id: createSubtaskId(task.id, index),
    title,
    estimatedMinutes: stepMinutes,
    completed: false,
  }))
}
