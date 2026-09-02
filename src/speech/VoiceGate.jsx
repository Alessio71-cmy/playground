import { useRef, useState } from 'react'

const SpeechRecognition =
  typeof window !== 'undefined' &&
  (window.SpeechRecognition || window.webkitSpeechRecognition)

function normalize(text) {
  return text.toLowerCase().trim().replace(/[^\p{L}\p{N}\s]/gu, '')
}

// ponytail: single global recognizer per gate instance, one phrase, no retry/backoff — add if flaky mics show up
export default function VoiceGate({ phrase, lang = 'it-IT', children }) {
  const [unlocked, setUnlocked] = useState(false)
  const [listening, setListening] = useState(false)
  const [heard, setHeard] = useState('')
  const recognitionRef = useRef(null)

  if (!SpeechRecognition) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white text-center px-4">
        <p>Il tuo browser non supporta il riconoscimento vocale. Usa Chrome o Edge.</p>
      </main>
    )
  }

  const target = normalize(phrase)

  function listen() {
    setListening(true)
    setHeard('')
    const recognition = new SpeechRecognition()
    recognitionRef.current = recognition
    recognition.lang = lang
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setHeard(transcript)
      if (normalize(transcript).includes(target)) setUnlocked(true)
    }
    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
    recognition.start()
  }

  if (unlocked) return children

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 bg-black text-white text-center px-4">
      <p className="text-sm text-neutral-400">Pronuncia la frase per continuare</p>
      <p className="text-xl font-medium">&ldquo;{phrase}&rdquo;</p>
      <button
        type="button"
        onClick={listen}
        disabled={listening}
        className="mt-4 rounded-lg bg-violet-600 px-5 py-2 text-white hover:bg-violet-700 disabled:opacity-50"
      >
        {listening ? 'Ascolto...' : 'Parla'}
      </button>
      {heard && !unlocked && (
        <p className="text-sm text-neutral-500">Hai detto: &ldquo;{heard}&rdquo; — riprova.</p>
      )}
    </main>
  )
}
