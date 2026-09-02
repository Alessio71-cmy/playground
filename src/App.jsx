import { useSession, useSessionStorage } from './session/SessionContext.jsx'

function App() {
  const sessionId = useSession()
  const [count, setCount] = useSessionStorage('counter', 0)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 px-4 text-center">
      <h1 className="text-3xl font-medium">Your session</h1>
      <p className="text-sm text-neutral-500 font-mono break-all">{sessionId}</p>
      <p className="text-sm text-neutral-500">
        This id lives only in your browser. Nobody else scanning the same QR
        code shares it or anything you do here.
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="mt-4 rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
      >
        Your count: {count}
      </button>
    </main>
  )
}

export default App
