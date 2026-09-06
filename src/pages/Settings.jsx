import React, { useState } from 'react'
import { defaultScenarioSettings } from '../engine/scenarioEngine'
import { useLocalStorage } from '../hooks/useLocalStorage'

const categoryOptions = [
  { id: 'academics', label: 'Academics' },
  { id: 'projects', label: 'Projects' },
  { id: 'time management', label: 'Time Management' },
  { id: 'clubs', label: 'Clubs' },
  { id: 'career', label: 'Career' },
]

const difficultyOptions = [
  { id: 'easy', label: 'Easy', description: 'Lower-pressure everyday decisions' },
  { id: 'normal', label: 'Normal', description: 'A balanced level of challenge' },
  { id: 'challenging', label: 'Challenging', description: 'More complex competing priorities' },
]

const frequencyOptions = [
  { id: 'every-open', label: 'Every time I open PULSE' },
  { id: 'once-a-day', label: 'Once a day' },
  { id: 'only-request', label: 'Only when I request one' },
]

const themeOptions = [
  { id: 'light', label: 'Light', description: 'A bright, calm workspace' },
  { id: 'dark', label: 'Dark', description: 'A softer workspace for low light' },
  { id: 'system', label: 'System', description: 'Follow your device preference' },
]

function getInitialSettings(settings) {
  return {
    ...defaultScenarioSettings,
    ...settings,
    categories: Array.isArray(settings?.categories)
      ? settings.categories
      : defaultScenarioSettings.categories,
    theme: ['light', 'dark', 'system'].includes(settings?.theme)
      ? settings.theme
      : defaultScenarioSettings.theme,
  }
}

/**
 * Settings Page
 * Configuration for student preferences, schedules, and learning defaults.
 */
export default function Settings() {
  const [savedSettings, setSavedSettings] = useLocalStorage(
    'pulse-settings',
    defaultScenarioSettings,
  )
  const [draftSettings, setDraftSettings] = useState(() => getInitialSettings(savedSettings))
  const [hasSaved, setHasSaved] = useState(false)

  function toggleCategory(categoryId) {
    const categoryIsSelected = draftSettings.categories.includes(categoryId)
    const nextCategories = categoryIsSelected
      ? draftSettings.categories.filter((category) => category !== categoryId)
      : [...draftSettings.categories, categoryId]

    setDraftSettings({ ...draftSettings, categories: nextCategories })
    setHasSaved(false)
  }

  function saveSettings(event) {
    event.preventDefault()
    setSavedSettings(draftSettings)
    setHasSaved(true)
  }

  return (
    <div className="page-content settings-page">
      <section className="page-intro compact-intro">
        <p className="eyebrow">Make it yours</p>
        <h1>Settings</h1>
        <p className="intro-copy">Customize how PULSE works for you.</p>
      </section>

      <form className="settings-section settings-form" onSubmit={saveSettings}>
        <section className="settings-group">
          <div className="section-title">
            <p className="eyebrow accent-label">Appearance</p>
            <h2>Theme</h2>
          </div>
          <div className="settings-list">
            {themeOptions.map((option) => (
              <label className="setting-row setting-control" key={option.id}>
                <span><strong>{option.label}</strong><small>{option.description}</small></span>
                <input
                  type="radio"
                  name="theme"
                  checked={draftSettings.theme === option.id}
                  onChange={() => { setDraftSettings({ ...draftSettings, theme: option.id }); setHasSaved(false) }}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="settings-group">
          <div className="section-title">
            <p className="eyebrow accent-label">Preferences</p>
            <h2>Scenario types</h2>
            <p>Choose the areas of student life you want to think through.</p>
          </div>
          <div className="settings-list">
            {categoryOptions.map((category) => (
              <label className="setting-row setting-control" key={category.id}>
                <span>{category.label}</span>
                <input
                  type="checkbox"
                  checked={draftSettings.categories.includes(category.id)}
                  onChange={() => toggleCategory(category.id)}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="settings-group">
          <div className="section-title">
            <p className="eyebrow accent-label">Challenge</p>
            <h2>Difficulty</h2>
          </div>
          <div className="settings-list">
            {difficultyOptions.map((option) => (
              <label className="setting-row setting-control" key={option.id}>
                <span><strong>{option.label}</strong><small>{option.description}</small></span>
                <input
                  type="radio"
                  name="difficulty"
                  checked={draftSettings.difficulty === option.id}
                  onChange={() => { setDraftSettings({ ...draftSettings, difficulty: option.id }); setHasSaved(false) }}
                />
              </label>
            ))}
          </div>
        </section>

        <section className="settings-group">
          <div className="section-title">
            <p className="eyebrow accent-label">Timing</p>
            <h2>Scenario frequency</h2>
          </div>
          <div className="settings-list">
            {frequencyOptions.map((option) => (
              <label className="setting-row setting-control" key={option.id}>
                <span>{option.label}</span>
                <input
                  type="radio"
                  name="frequency"
                  checked={draftSettings.frequency === option.id}
                  onChange={() => { setDraftSettings({ ...draftSettings, frequency: option.id }); setHasSaved(false) }}
                />
              </label>
            ))}
          </div>
        </section>

        <div className="settings-actions">
          <button type="submit" className="primary-button">SAVE SETTINGS</button>
          {hasSaved && <span className="saved-message">Settings saved</span>}
        </div>
      </form>
    </div>
  )
}
