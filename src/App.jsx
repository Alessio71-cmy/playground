import { useEffect, useRef, useState } from 'react'
import { useSession, useSessionStorage } from './session/SessionContext.jsx'
import { Figure } from './components/SplashArt.jsx'
import { SCREENS, LIGHT_SCREENS, ResultScreen, LightResultScreen } from './components/ResultScreens.jsx'

const PHRASE_WORDS = ['Il', 'mio', 'unico', 'giudice', 'è', 'Anubi!']
const PHRASE2_WORDS = ['Anubi,', 'ti', 'affido', 'il', 'giudizio']
const PHRASE3_WORDS = ['Abbraccio', 'il', 'fallimento,', 'sono', 'fiero', 'della', 'mia', 'mediocrità']
const normalize = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z\s]/g, '')
    .trim()
// "è" is dropped as a required word: speech recognition often merges/loses it.
const buildRequired = (words) => words.map(normalize).filter((w) => w && w !== 'e')
const buildCumulative = (words) => {
  let requiredSoFar = 0
  return words.map((w) => {
    const norm = normalize(w)
    if (norm && norm !== 'e') requiredSoFar++
    return requiredSoFar
  })
}
const REQUIRED_TOKENS = buildRequired(PHRASE_WORDS)
const CUMULATIVE_REQUIRED = buildCumulative(PHRASE_WORDS)
const REQUIRED_TOKENS_2 = buildRequired(PHRASE2_WORDS)
const CUMULATIVE_REQUIRED_2 = buildCumulative(PHRASE2_WORDS)
const REQUIRED_TOKENS_3 = buildRequired(PHRASE3_WORDS)
const CUMULATIVE_REQUIRED_3 = buildCumulative(PHRASE3_WORDS)

const AnubiIcon = ({ rocking = false, restTilt = 24, style, ...props }) => (
  <svg viewBox="0 0 482 460" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: 'visible', ...style }} {...props}>
    {/* Beam + the two pans: the only part that swings, pinned at the pivot ball's center. */}
    <g
      className={rocking ? 'escalation-rock' : ''}
      style={rocking ? { transformOrigin: '241px 119.5px', '--final-tilt': `${restTilt}deg` } : undefined}
    >
      <path d="M72.0374 183.32L112.507 328.83L131.487 394.01L139.837 393.71L109.527 289.13L76.1274 171.98C82.2674 169.81 85.5974 164.78 85.3674 159.12C85.1374 153.53 81.3574 148.97 75.4774 147.46L75.3274 130.53L290.767 130.49L290.847 130.52H405.417L405.537 147.6C399.177 148.92 395.897 154.12 395.757 159.77C395.617 165.39 399.307 170.13 405.117 172.23L385.697 240.81L341.347 393.86L349.667 393.98L373.667 310.71L408.937 183.33C414.767 200.19 424.397 242.61 429.087 259.31L466.887 394.06L475.407 393.92L415.747 180.49L414.007 171.78C419.227 169.31 422.347 164.93 422.297 159.77C422.247 154.94 419.417 150.46 414.277 147.91L414.197 130.64L421.767 130.41C432.277 130.09 441.697 124.15 446.267 114.52L274.537 114.58L35.5774 114.54C41.9274 127.42 53.1774 131.18 66.9074 130.74L66.9274 147.69C61.4974 150 58.5574 154.96 58.7774 160.43C58.9874 165.69 62.3474 170.41 67.7374 172.1L52.6174 227.89L15.7174 359.74L6.10742 393.93L14.4574 393.83L43.6974 289.46L72.0574 183.34" fill="currentColor" />
      <path d="M111.437 449.9C73.9272 469.25 21.4272 459.38 3.65722 418.64C0.927223 412.38 -0.152784 405.97 0.0172161 399.48L144.227 399.43C145.277 419.7 129.197 440.74 111.427 449.9H111.437Z" fill="currentColor" />
      <path d="M476.987 421.71C469.427 437.1 456.487 448.35 440.227 454.16C405.027 466.75 361.917 456.94 343.657 422.55C339.847 415.37 337.447 408.06 337.567 399.47H473.367L481.917 399.27C482.187 407.17 480.547 414.47 476.987 421.71Z" fill="currentColor" />
    </g>
    {/* Pole + pivot ball: fixed, drawn on top of the beam so the pin reads as a hinge. */}
    <path d="M240.967 151.66C258.734 151.66 273.137 137.257 273.137 119.49C273.137 101.723 258.734 87.32 240.967 87.32C223.2 87.32 208.797 101.723 208.797 119.49C208.797 137.257 223.2 151.66 240.967 151.66Z" fill="currentColor" />
    <path d="M240.737 0C244.647 0 247.827 3.18 247.827 7.09V104.94H234.107V6.62999C234.107 2.96999 237.077 0 240.737 0Z" fill="currentColor" />
  </svg>
)

function App() {
  useSession()
  const [count, setCount] = useSessionStorage('counter', 0)
  const [matchedCount, setMatchedCount] = useState(0)
  const [listening, setListening] = useState(false)
  const [passed, setPassed] = useState(false)
  const recognitionRef = useRef(null)

  const [matchedCount2, setMatchedCount2] = useState(0)
  const [listening2, setListening2] = useState(false)
  const [revealed2, setRevealed2] = useState(false)
  const [passed2, setPassed2] = useState(false)
  const [escalate, setEscalate] = useState(false)
  const pickTilt = () => [-24, 0, 24][Math.floor(Math.random() * 3)]
  const [restTilt, setRestTilt] = useState(pickTilt)
  const [result, setResult] = useState(null)
  const recognitionRef2 = useRef(null)

  const [resultFadingOut, setResultFadingOut] = useState(false)
  const [showEmbrace, setShowEmbrace] = useState(false)
  const [matchedCount3, setMatchedCount3] = useState(0)
  const [listening3, setListening3] = useState(false)
  const [passed3, setPassed3] = useState(false)
  const recognitionRef3 = useRef(null)
  const [introKey, setIntroKey] = useState(0)

  useEffect(() => {
    if (!passed2) return
    const timer = setTimeout(() => setEscalate(true), 8000)
    return () => clearTimeout(timer)
  }, [passed2])

  // Post-glitch result screen holds for 8s, then fades out before the "embrace failure" phrase appears.
  useEffect(() => {
    if (!result) return
    const timer = setTimeout(() => setResultFadingOut(true), 8000)
    return () => clearTimeout(timer)
  }, [result])

  useEffect(() => {
    if (!resultFadingOut) return
    const timer = setTimeout(() => {
      setResult(null)
      setResultFadingOut(false)
      setShowEmbrace(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [resultFadingOut])

  // Reset the whole flow back to the first screen once the embrace phrase is repeated correctly.
  useEffect(() => {
    if (!passed3) return
    setShowEmbrace(false)
    setPassed(false)
    setMatchedCount(0)
    setPassed2(false)
    setMatchedCount2(0)
    setRevealed2(false)
    setEscalate(false)
    setPassed3(false)
    setMatchedCount3(0)
    setRestTilt(pickTilt())
    setIntroKey((k) => k + 1)
  }, [passed3])

  // Glitch + rocking run for 16s (beamRock/escalatingEnergy), settling on restTilt
  // for the last 4s. Reveal the result screen once the balance has held still.
  useEffect(() => {
    if (!escalate) return
    const timer = setTimeout(() => {
      const direction = restTilt < 0 ? 'left' : restTilt > 0 ? 'right' : 'center'
      if (direction === 'left') {
        const pool = [SCREENS[0], SCREENS[1], SCREENS[3]]
        setResult({ Screen: ResultScreen, data: pool[Math.floor(Math.random() * pool.length)] })
      } else if (direction === 'right') {
        setResult({ Screen: ResultScreen, data: SCREENS[2] })
      } else {
        setResult({ Screen: LightResultScreen, data: LIGHT_SCREENS[Math.floor(Math.random() * LIGHT_SCREENS.length)] })
      }
    }, 16000)
    return () => clearTimeout(timer)
  }, [escalate, restTilt])

  const listen = ({ requiredTokens, setListening, setMatchedCount, onDone }) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Riconoscimento vocale non supportato su questo browser (serve Chrome o Edge).')
      return
    }
    const isSecure = window.isSecureContext || location.hostname === 'localhost'
    if (!isSecure) {
      alert('Il riconoscimento vocale richiede HTTPS (o localhost). Apri il sito in https.')
      return
    }
    const recognition = new SpeechRecognition()
    recognition.lang = 'it-IT'
    recognition.interimResults = true
    recognition.continuous = false

    let done = false
    let matched = 0

    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += ` ${event.results[i][0].transcript}`
      }
      const blob = normalize(transcript).replace(/\s+/g, '')
      let count = 0
      let searchFrom = 0
      for (const word of requiredTokens) {
        const idx = blob.indexOf(word, searchFrom)
        if (idx === -1) break
        searchFrom = idx + word.length
        count++
      }
      matched = count
      setMatchedCount(count)
      if (count === requiredTokens.length) {
        done = true
        onDone()
        recognition.stop()
      }
    }
    recognition.onend = () => {
      if (!done && matched < requiredTokens.length) {
        recognition.start()
      } else {
        setListening(false)
      }
    }
    recognition.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        done = true
        setListening(false)
        alert('Permesso microfono negato. Consenti l\'accesso al microfono nelle impostazioni del browser.')
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        done = true
        setListening(false)
        alert(`Errore riconoscimento vocale: ${event.error}`)
      }
    }

    setListening(true)
    setMatchedCount(0)
    recognition.start()
    return recognition
  }

  const startListening = () => {
    recognitionRef.current = listen({
      requiredTokens: REQUIRED_TOKENS,
      setListening,
      setMatchedCount,
      onDone: () => setPassed(true),
    })
  }

  const startListening2 = () => {
    setRevealed2(true)
    recognitionRef2.current = listen({
      requiredTokens: REQUIRED_TOKENS_2,
      setListening: setListening2,
      setMatchedCount: setMatchedCount2,
      onDone: () => setPassed2(true),
    })
  }

  const startListening3 = () => {
    recognitionRef3.current = listen({
      requiredTokens: REQUIRED_TOKENS_3,
      setListening: setListening3,
      setMatchedCount: setMatchedCount3,
      onDone: () => setPassed3(true),
    })
  }

  return (
    <main className="relative min-h-dvh bg-black overflow-hidden">
      <div key={introKey} className="force-portrait absolute inset-0">
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none intro-glow"
        style={{
          height: '38rem',
          background: `
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(230,185,90,0.7), rgba(230,185,90,0) 65%),
            radial-gradient(ellipse 120% 40% at 50% 0%, rgba(0,0,0,0.35), rgba(0,0,0,0) 70%),
            linear-gradient(to bottom, #3A2A02, #B8860B)
          `,
        }}
      />
      <div
        className="absolute inset-0 bg-black transition-opacity duration-[1500ms] pointer-events-none"
        style={{ opacity: passed ? 1 : 0 }}
      />
      <div
        className="absolute left-0 right-0 w-full flex flex-col items-center overflow-visible intro-rise"
        style={{ top: 'max(2rem, 6dvh)' }}
      >
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          aria-label={`count ${count}`}
          className="w-full transition-transform duration-[1500ms] ease-in"
          style={{
            transform: passed ? 'scale(6)' : 'translateY(-3dvh)',
            transformOrigin: 'bottom center',
            transitionDelay: passed ? '400ms' : '0ms',
          }}
        >
          <Figure />
        </button>
      </div>
      <div
        className="absolute bottom-0 pointer-events-none transition-transform duration-[1200ms] ease-in intro-glow"
        style={{
          left: '-30%',
          right: '-30%',
          height: '9rem',
          transform: passed ? 'translateY(200%)' : 'translateY(0)',
          mixBlendMode: 'screen',
          background: 'radial-gradient(ellipse at bottom, rgba(183,134,12,0.55), rgba(183,134,12,0) 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-4 sm:pb-8"
        style={{
          transform: passed ? 'translateY(-200%)' : 'translateY(0)',
          opacity: passed ? 0 : 1,
          transition: 'transform 1200ms ease-in, opacity 600ms ease-in',
          transitionDelay: passed ? '0ms, 400ms' : '0ms, 0ms',
        }}
      >
        <div className="flex flex-col items-center intro-fade-up" style={{ animationDelay: '3900ms' }}>
          <p style={{ fontSize: 16, color: '#B8860B', marginBottom: 8 }}>Ripeti a voce alta</p>
          <p
            className="px-8 text-center"
            style={{ fontSize: 38, lineHeight: 1.1, fontWeight: 300, fontStyle: 'italic' }}
          >
            {PHRASE_WORDS.map((word, i) => (
              <span key={i}>
                {word === 'giudice' && <br />}
                <span
                  className="transition-colors duration-200"
                  style={{ color: CUMULATIVE_REQUIRED[i] <= matchedCount ? '#B8860B' : '#D8D8D8' }}
                >
                  {word}
                </span>{' '}
              </span>
            ))}
          </p>
        </div>
        <button
          type="button"
          aria-label="audio"
          onClick={startListening}
          className="flex items-center justify-center rounded-full intro-fade-up"
          style={{
            width: 48,
            height: 48,
            marginTop: 40,
            backgroundColor: listening ? '#C89A2E' : '#B8860B',
            animationDelay: '4300ms',
          }}
        >
          {listening ? (
            <div className="flex items-center justify-center gap-1.5">
              <span className="voice-bar" style={{ height: 10, animationDelay: '0ms' }} />
              <span className="voice-bar" style={{ height: 18, animationDelay: '250ms' }} />
              <span className="voice-bar" style={{ height: 10, animationDelay: '500ms' }} />
            </div>
          ) : (
            <svg viewBox="0 0 24 24" width={22} height={22} fill="black">
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
            </svg>
          )}
        </button>
      </div>
      </div>
      <div
        className="force-landscape absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-8 py-4 overflow-hidden"
        style={{
          opacity: result || showEmbrace ? 0 : passed ? 1 : 0,
          pointerEvents: result || showEmbrace ? 'none' : passed ? 'auto' : 'none',
          transition: 'opacity 800ms ease-in',
          transitionDelay: passed && !result && !showEmbrace ? '1900ms' : '0ms',
        }}
      >
      <div
        className="absolute pointer-events-none"
        style={{
          inset: '-20%',
          mixBlendMode: 'screen',
          background: 'radial-gradient(ellipse at center, rgba(183,134,12,0.55), rgba(183,134,12,0) 70%)',
        }}
      />
      {passed2 ? (
        <div className={`absolute inset-0 flex items-center justify-center${escalate ? ' escalation-container' : ''}`} style={{ backgroundColor: '#000000' }}>
          <AnubiIcon
            className={escalate ? 'escalation-svg' : ''}
            rocking={escalate}
            restTilt={restTilt}
            style={{ width: 'clamp(72px, calc(var(--sh) * 0.2), 130px)', height: 'auto', color: '#ffffff' }}
          />
        </div>
      ) : (
      <div className="grid" style={{ placeItems: 'center' }}>
      <div
        className="flex flex-col items-center rotate-in-hint"
        style={{ gridArea: '1 / 1' }}
      >
        <AnubiIcon style={{ width: 'clamp(36px, calc(var(--sh) * 0.07), 64px)', height: 'auto', color: '#B8860B' }} />
        <div className="grid" style={{ placeItems: 'center', marginTop: 'clamp(16px, calc(var(--sh) * 0.04), 32px)' }}>
          <p
            className="max-w-3xl text-center"
            style={{
              gridArea: '1 / 1',
              fontSize: 38,
              lineHeight: 1.1,
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#D8D8D8',
              opacity: revealed2 ? 0 : 1,
              transform: revealed2 ? 'scale(0.92) translateY(-6px)' : 'scale(1) translateY(0)',
              filter: revealed2 ? 'blur(4px)' : 'blur(0px)',
              transition: 'opacity 500ms ease, transform 500ms ease, filter 500ms ease',
              pointerEvents: revealed2 ? 'none' : 'auto',
            }}
          >
            Affidi il tuo giudizio<br />nelle mani di Anubi?
          </p>
          <div
            className="flex flex-col items-center"
            style={{
              gridArea: '1 / 1',
              opacity: revealed2 ? 1 : 0,
              transform: revealed2 ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(6px)',
              filter: revealed2 ? 'blur(0px)' : 'blur(4px)',
              transition: 'opacity 550ms ease, transform 550ms ease, filter 550ms ease',
              transitionDelay: revealed2 ? '150ms' : '0ms',
              pointerEvents: revealed2 ? 'auto' : 'none',
            }}
          >
            <p style={{ fontSize: 16, color: '#B8860B', marginBottom: 8 }}>Ripeti a voce alta</p>
            <p
              className="max-w-3xl text-center"
              style={{ fontSize: 38, lineHeight: 1.1, fontWeight: 300, fontStyle: 'italic' }}
            >
              {PHRASE2_WORDS.map((word, i) => (
                <span key={i}>
                  <span
                    className="transition-colors duration-200"
                    style={{ color: CUMULATIVE_REQUIRED_2[i] <= matchedCount2 ? '#B8860B' : '#D8D8D8' }}
                  >
                    {word}
                  </span>{' '}
                </span>
              ))}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="audio"
          onClick={startListening2}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 48,
            height: 48,
            marginTop: 40,
            backgroundColor: listening2 ? '#C89A2E' : '#B8860B',
          }}
        >
          {listening2 ? (
            <div className="flex items-center justify-center gap-1.5">
              <span className="voice-bar" style={{ height: 10, animationDelay: '0ms' }} />
              <span className="voice-bar" style={{ height: 18, animationDelay: '250ms' }} />
              <span className="voice-bar" style={{ height: 10, animationDelay: '500ms' }} />
            </div>
          ) : (
            <svg viewBox="0 0 24 24" width={22} height={22} fill="black">
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
            </svg>
          )}
        </button>
      </div>
      </div>
      )}
    </div>
    {result && (
      <div
        className="force-portrait absolute inset-0 z-40 transition-opacity duration-[800ms] ease-in"
        style={{ opacity: resultFadingOut ? 0 : 1, pointerEvents: resultFadingOut ? 'none' : 'auto' }}
      >
        <result.Screen {...result.data} />
      </div>
    )}
    {showEmbrace && (
      <div
        className="force-portrait absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-8"
        style={{ backgroundColor: '#000000' }}
      >
        <p style={{ fontSize: 16, color: '#B8860B', marginBottom: 8 }}>Ripeti ad alta voce</p>
        <p
          className="max-w-3xl"
          style={{ fontSize: 38, lineHeight: 1.1, fontWeight: 300, fontStyle: 'italic' }}
        >
          {PHRASE3_WORDS.map((word, i) => (
            <span key={i}>
              <span
                className="transition-colors duration-200"
                style={{ color: CUMULATIVE_REQUIRED_3[i] <= matchedCount3 ? '#B8860B' : '#D8D8D8' }}
              >
                {word}
              </span>{' '}
            </span>
          ))}
        </p>
        <button
          type="button"
          aria-label="audio"
          onClick={startListening3}
          className="flex items-center justify-center rounded-full"
          style={{
            width: 48,
            height: 48,
            marginTop: 40,
            backgroundColor: listening3 ? '#C89A2E' : '#B8860B',
          }}
        >
          {listening3 ? (
            <div className="flex items-center justify-center gap-1.5">
              <span className="voice-bar" style={{ height: 10, animationDelay: '0ms' }} />
              <span className="voice-bar" style={{ height: 18, animationDelay: '250ms' }} />
              <span className="voice-bar" style={{ height: 10, animationDelay: '500ms' }} />
            </div>
          ) : (
            <svg viewBox="0 0 24 24" width={22} height={22} fill="black">
              <path d="M3 9v6h4l5 5V4L7 9H3z" />
              <path d="M16.5 12a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
            </svg>
          )}
        </button>
      </div>
    )}
    </main>
  )
}

export default App
