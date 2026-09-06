import React from 'react'
import { calculateWeeklyInsights, getPersonalInsight } from '../engine/insightEngine'

function formatMinutes(minutes) {
  if (minutes === null || minutes === undefined) return '—'
  return `${Math.round(minutes)} min`
}

function formatRate(rate, hasData) {
  return hasData ? `${Math.round(rate * 100)}%` : '—'
}

export default function WeeklySummary({ tasks, sessions }) {
  const insights = calculateWeeklyInsights(tasks, sessions)
  const personalInsight = getPersonalInsight(tasks, sessions)
  const hasCompletedTasks = insights.completedTaskCount > 0
  const hasFocusSessions = insights.sessionCount > 0
  const hasEstimateComparison = insights.comparedTaskCount > 0

  return (
    <section className="weekly-summary">
      <div className="weekly-summary-heading">
        <div>
          <p className="eyebrow accent-label">This week</p>
          <h2>Weekly summary</h2>
        </div>
        <span className="weekly-summary-caption">A quiet look back</span>
      </div>
      <div className="summary-grid">
        <div className="summary-metric">
          <span>Tasks completed</span>
          <strong>{insights.completedTaskCount}</strong>
          <small>{formatRate(insights.completionRate, insights.trackedTaskCount > 0)} completion rate</small>
        </div>
        <div className="summary-metric">
          <span>Completed on time</span>
          <strong>{hasCompletedTasks ? `${insights.onTimeTaskCount}/${insights.completedTaskCount}` : '—'}</strong>
          <small>{formatRate(insights.onTimeRate, hasCompletedTasks)} on-time rate</small>
        </div>
        <div className="summary-metric">
          <span>Average focus session</span>
          <strong>{formatMinutes(insights.averageFocusMinutes)}</strong>
          <small>{hasFocusSessions ? `${insights.sessionCount} session${insights.sessionCount === 1 ? '' : 's'}` : 'No sessions yet'}</small>
        </div>
        <div className="summary-metric">
          <span>Estimated vs actual</span>
          <strong>{hasEstimateComparison ? `${Math.round(insights.estimatedMinutes)} / ${Math.round(insights.actualMinutes)} min` : '—'}</strong>
          <small>{hasEstimateComparison ? `${Math.round(insights.estimateAccuracy * 100)}% of estimate` : 'Complete a focus session'}</small>
        </div>
      </div>
      <p className="personal-insight"><span>Pattern</span>{personalInsight}</p>
    </section>
  )
}
