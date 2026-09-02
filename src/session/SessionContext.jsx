import { createContext, useContext, useState } from 'react'

const STORAGE_KEY = 'session-id'
const SessionContext = createContext(null)

function getOrCreateSessionId() {
  let id = localStorage.getItem(STORAGE_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(STORAGE_KEY, id)
  }
  return id
}

export function SessionProvider({ children }) {
  const [sessionId] = useState(getOrCreateSessionId)
  return (
    <SessionContext.Provider value={sessionId}>
      {children}
    </SessionContext.Provider>
  )
}

// Each browser gets its own localStorage, so each visitor's session is
// already isolated from everyone else's just by existing in this context.
export function useSession() {
  const sessionId = useContext(SessionContext)
  if (!sessionId) throw new Error('useSession must be used within a SessionProvider')
  return sessionId
}

// Helper for feature state that must stay scoped to this visitor only.
export function useSessionStorage(key, initialValue) {
  const sessionId = useSession()
  const storageKey = `session:${sessionId}:${key}`
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(storageKey)
    return stored ? JSON.parse(stored) : initialValue
  })

  const update = (next) => {
    const resolved = typeof next === 'function' ? next(value) : next
    setValue(resolved)
    localStorage.setItem(storageKey, JSON.stringify(resolved))
  }

  return [value, update]
}
