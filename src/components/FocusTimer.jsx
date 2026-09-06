import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTimer } from '../hooks/useFocusTimer'
import { formatSecondsToTimer } from '../utils/formatTime'

export default function FocusTimer({ task, onClose }) {
  const timer = useFocusTimer(task)
  const isComplete = timer.status === 'complete' && timer.completedSession

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeTimer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [timer.status])

  function closeTimer() {
    if (timer.status === 'running' || timer.status === 'paused') {
      timer.stop()
    }
    onClose()
  }

  return createPortal(
    (
    <div className="focus-backdrop" role="presentation">
      <section className="focus-mode" role="dialog" aria-modal="true" aria-labelledby="focus-task-title">
        <button type="button" className="focus-close" onClick={closeTimer} aria-label="Exit focus mode">Exit focus</button>
        <div className="focus-content">
          <p className="eyebrow accent-label">Focus mode</p>
          <h2 id="focus-task-title">{task.title}</h2>
          {isComplete ? (
            <div className="session-complete">
              <p className="eyebrow accent-label">Session complete</p>
              <div className="session-stats">
                <div><span>Estimated</span><strong>{task.estimatedMinutes} min</strong></div>
                <div><span>Actual</span><strong>{timer.completedSession.actualMinutes} min</strong></div>
              </div>
              <button type="button" className="focus-primary-button" onClick={onClose}>Done</button>
            </div>
          ) : (
            <>
              <div className="focus-clock" aria-live="polite">{formatSecondsToTimer(timer.remainingSeconds)}</div>
              <p className="focus-status">{timer.status === 'paused' ? 'Paused' : timer.status === 'stopped' ? 'Stopped' : 'One thing at a time.'}</p>
              <div className="focus-controls">
                {timer.status === 'idle' && <button type="button" className="focus-primary-button" onClick={timer.start}>Start</button>}
                {timer.status === 'running' && <button type="button" className="focus-secondary-button" onClick={timer.pause}>Pause</button>}
                {timer.status === 'paused' && <button type="button" className="focus-primary-button" onClick={timer.resume}>Resume</button>}
                {(timer.status === 'running' || timer.status === 'paused') && <button type="button" className="focus-secondary-button" onClick={timer.complete}>Complete</button>}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
    ),
    document.body,
  )
}
