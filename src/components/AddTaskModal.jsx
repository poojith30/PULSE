import React, { useState } from 'react'
import { createPortal } from 'react-dom'

const categories = ['Academics', 'Projects', 'Clubs', 'Career', 'Personal', 'Other']
const initialForm = {
  title: '',
  deadline: '',
  estimatedMinutes: '',
  importance: '3',
  category: 'Academics',
}

function validateForm(form) {
  const errors = {}

  if (!form.title.trim()) {
    errors.title = 'Add a title so you know what to work on.'
  }
  if (!form.deadline) {
    errors.deadline = 'Choose a deadline.'
  }
  if (!form.estimatedMinutes || Number(form.estimatedMinutes) <= 0) {
    errors.estimatedMinutes = 'Estimated time must be greater than 0 minutes.'
  }
  if (!form.importance || Number(form.importance) < 1 || Number(form.importance) > 5) {
    errors.importance = 'Importance must be between 1 and 5.'
  }
  if (!categories.includes(form.category)) {
    errors.category = 'Choose a valid category.'
  }

  return errors
}

export default function AddTaskModal({ onClose, onAddTask }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})

  function updateField(event) {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
    setErrors({ ...errors, [name]: '' })
  }

  function submitForm(event) {
    event.preventDefault()
    const nextErrors = validateForm(form)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onAddTask(form)
    onClose()
  }

  return createPortal(
    (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="add-task-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-heading">
          <div>
            <p className="eyebrow accent-label">New action</p>
            <h2 id="add-task-title">Add task</h2>
          </div>
          <button type="button" className="close-button" onClick={onClose} aria-label="Close add task dialog">×</button>
        </div>

        <form className="task-form" onSubmit={submitForm}>
          <label className="form-field form-field-wide">
            <span>Task title</span>
            <input name="title" value={form.title} onChange={updateField} placeholder="e.g. Finish the research outline" autoFocus />
            {errors.title && <small className="field-error">{errors.title}</small>}
          </label>

          <div className="form-grid">
            <label className="form-field">
              <span>Deadline</span>
              <input type="date" name="deadline" value={form.deadline} onChange={updateField} />
              {errors.deadline && <small className="field-error">{errors.deadline}</small>}
            </label>
            <label className="form-field">
              <span>Estimated time</span>
              <div className="input-with-suffix">
                <input type="number" name="estimatedMinutes" min="1" step="1" value={form.estimatedMinutes} onChange={updateField} placeholder="45" />
                <span>min</span>
              </div>
              {errors.estimatedMinutes && <small className="field-error">{errors.estimatedMinutes}</small>}
            </label>
          </div>

          <div className="form-grid">
            <label className="form-field">
              <span>Importance</span>
              <select name="importance" value={form.importance} onChange={updateField}>
                {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value} / 5</option>)}
              </select>
              {errors.importance && <small className="field-error">{errors.importance}</small>}
            </label>
            <label className="form-field">
              <span>Category</span>
              <select name="category" value={form.category} onChange={updateField}>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
              {errors.category && <small className="field-error">{errors.category}</small>}
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="primary-button">ADD TASK</button>
          </div>
        </form>
      </section>
    </div>
    ),
    document.body,
  )
}
