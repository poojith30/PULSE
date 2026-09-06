import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from './useLocalStorage'

function getInitialSeconds(estimatedMinutes) {
  const minutes = Number(estimatedMinutes)
  return Number.isFinite(minutes) && minutes > 0 ? minutes * 60 : 60
}

export function useFocusTimer(task) {
  const initialSeconds = getInitialSeconds(task.estimatedMinutes)
  const [remainingSeconds, setRemainingSeconds] = useState(initialSeconds)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [status, setStatus] = useState('idle')
  const [startedAt, setStartedAt] = useState(null)
  const [completedSession, setCompletedSession] = useState(null)
  const [sessions, setSessions] = useLocalStorage('pulse-sessions', [])
  const sessionSaved = useRef(false)

  useEffect(() => {
    if (status !== 'running') {
      return undefined
    }

    const intervalId = setInterval(() => {
      setElapsedSeconds((currentSeconds) => currentSeconds + 1)
      setRemainingSeconds((currentSeconds) => {
        if (currentSeconds <= 1) {
          setStatus('complete')
          return 0
        }
        return currentSeconds - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [status])

  useEffect(() => {
    if (status !== 'complete' || sessionSaved.current || !startedAt) {
      return
    }

    const session = {
      taskId: task.id,
      startedAt,
      endedAt: new Date().toISOString(),
      actualMinutes: Math.ceil(elapsedSeconds / 60),
    }

    setSessions((currentSessions) => [
      ...(Array.isArray(currentSessions) ? currentSessions : []),
      session,
    ])
    setCompletedSession(session)
    sessionSaved.current = true
  }, [status, startedAt, elapsedSeconds, task.id, setSessions])

  function start() {
    if (status !== 'idle') {
      return
    }

    setStartedAt(new Date().toISOString())
    setStatus('running')
  }

  function pause() {
    if (status === 'running') {
      setStatus('paused')
    }
  }

  function resume() {
    if (status === 'paused') {
      setStatus('running')
    }
  }

  function stop() {
    if (status === 'running' || status === 'paused') {
      setStatus('stopped')
    }
  }

  function complete() {
    if ((status === 'running' || status === 'paused') && startedAt) {
      setStatus('complete')
    }
  }

  return {
    remainingSeconds,
    elapsedSeconds,
    status,
    completedSession,
    start,
    pause,
    resume,
    stop,
    complete,
  }
}
