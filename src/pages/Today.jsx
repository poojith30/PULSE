import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskCard from '../components/TaskCard'
import NextMoveCard from '../components/NextMoveCard'
import WeeklySummary from '../components/WeeklySummary'
import { scenarios } from '../data/scenarios'
import { getNextTask, sortTasksByPriority } from '../engine/priorityEngine'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useTasks } from '../hooks/useTasks'
import {
  defaultScenarioSettings,
  getDateKey,
  getScenarioForFrequency,
} from '../engine/scenarioEngine'
import { formatDate } from '../utils/date'

const initialScenarioHistory = {
  recentlyShownScenarioIds: [],
  currentScenario: null,
  currentScenarioDate: null,
  lastShownTime: null,
}

function formatLabel(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getTeachingSummary(choice) {
  const effects = Object.entries(choice.effects)
  const gains = effects.filter(([, value]) => value > 0).map(([key]) => formatLabel(key))
  const costs = effects.filter(([, value]) => value < 0).map(([key]) => formatLabel(key))

  if (costs.length > 0) {
    return `This choice invests in ${gains.join(' and ')} while asking you to spend some ${costs.join(' and ')}.`
  }

  return `This choice creates momentum around ${gains.join(' and ')}. The trade-off is what it leaves less room for.`
}

function updateHistory(scenario, scenarioHistory) {
  const recentIds = Array.isArray(scenarioHistory.recentlyShownScenarioIds)
    ? scenarioHistory.recentlyShownScenarioIds
    : []
  const nextRecentIds = [
    scenario.id,
    ...recentIds.filter((scenarioId) => scenarioId !== scenario.id),
  ].slice(0, 5)

  return {
    recentlyShownScenarioIds: nextRecentIds,
    currentScenario: scenario,
    currentScenarioDate: getDateKey(),
    lastShownTime: new Date().toISOString(),
  }
}

/**
 * Today Page
 * The primary landing and daily decision experience for students.
 * Features the daily scenario workflow and the user's next task move.
 */
export default function Today() {
  const [scenarioHistory, setScenarioHistory] = useLocalStorage(
    'pulse-scenario-history',
    initialScenarioHistory,
  )
  const [settings] = useLocalStorage('pulse-settings', defaultScenarioSettings)
  const [storedSessions] = useLocalStorage('pulse-sessions', [])
  const [currentScenario, setCurrentScenario] = useState(null)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const { tasks, toggleTask, deleteTask, breakTaskIntoSteps, toggleSubtask } = useTasks()
  const hasLoadedScenario = useRef(false)
  const navigate = useNavigate()
  const activeSettings = settings && typeof settings === 'object'
    ? settings
    : defaultScenarioSettings
  const activeTasks = tasks.filter((task) => !task.completed)
  const sessions = Array.isArray(storedSessions) ? storedSessions : []
  const nextTask = getNextTask(activeTasks)
  const previewTasks = sortTasksByPriority(activeTasks).slice(0, 3)
  const todayLabel = formatDate(new Date())

  useEffect(() => {
    if (hasLoadedScenario.current) {
      return
    }

    const safeHistory = scenarioHistory && typeof scenarioHistory === 'object'
      ? scenarioHistory
      : initialScenarioHistory
    const nextScenario = getScenarioForFrequency(
      scenarios,
      safeHistory,
      activeSettings,
    )

    setCurrentScenario(nextScenario)
    hasLoadedScenario.current = true

    if (nextScenario) {
      setScenarioHistory(updateHistory(nextScenario, safeHistory))
    } else {
      setScenarioHistory({
        ...safeHistory,
        currentScenario: null,
        currentScenarioDate: null,
      })
    }
  }, [scenarioHistory, activeSettings, setScenarioHistory])

  function chooseNewScenario() {
    const safeHistory = scenarioHistory && typeof scenarioHistory === 'object'
      ? scenarioHistory
      : initialScenarioHistory
    const nextScenario = getScenarioForFrequency(
      scenarios,
      { ...safeHistory, currentScenario: null },
      activeSettings,
    )

    if (!nextScenario) {
      setCurrentScenario(null)
      setSelectedChoice(null)
      return
    }

    setCurrentScenario(nextScenario)
    setSelectedChoice(null)
    setScenarioHistory(updateHistory(nextScenario, safeHistory))
  }

  const selectedChoiceData = currentScenario?.choices.find(
    (choice) => choice.id === selectedChoice,
  )

  return (
    <div className="page-content today-page">
      <section className="page-intro">
        <p className="eyebrow">{todayLabel}</p>
        <h1>Make room for the next right thing.</h1>
        <p className="intro-copy">A small moment of clarity can change the shape of your day.</p>
      </section>

      <section className="feature-panel scenario-panel">
        <div className="panel-heading">
          <div>
            <p className="eyebrow accent-label">Today&apos;s scenario</p>
            <h2>Today&apos;s scenario</h2>
          </div>
          <span className="panel-index">01</span>
        </div>

        {currentScenario ? (
          <div className="scenario-content">
            <div className="scenario-meta">
              <span>{formatLabel(currentScenario.category)}</span>
              <span>{formatLabel(currentScenario.difficulty)}</span>
            </div>
            <h3>{currentScenario.title}</h3>
            <p className="scenario-description">{currentScenario.description}</p>
            <div className="choice-list" aria-label="Scenario choices">
              {currentScenario.choices.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  className={`choice-card ${selectedChoice === choice.id ? 'selected' : ''}`}
                  aria-pressed={selectedChoice === choice.id}
                  onClick={() => setSelectedChoice(choice.id)}
                >
                  <span className="choice-marker" aria-hidden="true">
                    {selectedChoice === choice.id ? '✓' : ''}
                  </span>
                  <span>{choice.text}</span>
                </button>
              ))}
            </div>
            {selectedChoiceData && (
              <div className="result-section">
                <div className="result-heading">
                  <p className="eyebrow accent-label">Your choice</p>
                  <p className="selected-choice-text">{selectedChoiceData.text}</p>
                </div>
                <div className="result-block">
                  <p className="eyebrow">Why?</p>
                  <p>{selectedChoiceData.explanation}</p>
                </div>
                <div className="result-block">
                  <p className="eyebrow">Trade-off</p>
                  <div className="effect-list">
                    {Object.entries(selectedChoiceData.effects).map(([effect, value]) => (
                      <div className="effect-item" key={effect}>
                        <div className="effect-label">
                          <span>{formatLabel(effect)}</span>
                          <strong>{value > 0 ? '+' : ''}{value}</strong>
                        </div>
                        <div className="effect-track">
                          <span className={value < 0 ? 'negative' : ''} style={{ width: `${Math.min(Math.abs(value) * 25, 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="result-block teaching-block">
                  <p className="eyebrow">What this teaches</p>
                  <p>{getTeachingSummary(selectedChoiceData)}</p>
                </div>
                <button type="button" className="apply-button" onClick={() => navigate('/tasks')}>
                  APPLY THIS TO MY TASKS <span aria-hidden="true">→</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="scenario-unavailable">
            <p>This scenario is not available right now.</p>
          </div>
        )}
      </section>

      {activeSettings.frequency === 'only-request' && (
        <button type="button" className="new-scenario-button" onClick={chooseNewScenario}>
          New scenario <span aria-hidden="true">↗</span>
        </button>
      )}

      {nextTask ? (
        <NextMoveCard task={nextTask} />
      ) : (
        <section className="feature-panel next-move-panel">
          <div className="panel-heading">
            <div>
              <p className="eyebrow">Action, when you&apos;re ready</p>
              <h2>Your next move</h2>
            </div>
            <span className="panel-index">02</span>
          </div>
          <div className="placeholder-content compact">
            <p>Add a task to find your next move.</p>
          </div>
        </section>
      )}

      <section className="tasks-preview">
        <div className="panel-heading">
          <div>
            <p className="eyebrow accent-label">Your actions</p>
            <h2>Your tasks</h2>
          </div>
          <button type="button" className="text-link" onClick={() => navigate('/tasks')}>View all <span aria-hidden="true">→</span></button>
        </div>
        {tasks.length > 0 ? (
          <div className="task-list today-task-list">
            {previewTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onBreakdown={breakTaskIntoSteps}
                onToggleSubtask={toggleSubtask}
              />
            ))}
          </div>
        ) : (
          <p className="tasks-preview-empty">Your tasks will appear here once you add them.</p>
        )}
      </section>

      <WeeklySummary tasks={tasks} sessions={sessions} />
    </div>
  )
}
