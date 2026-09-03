import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SessionProvider } from './session/SessionContext.jsx'
import { ResultScreensPreview } from './components/ResultScreens.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {location.search.includes('preview') ? (
      <ResultScreensPreview />
    ) : (
      <SessionProvider>
        <App />
      </SessionProvider>
    )}
  </StrictMode>,
)
