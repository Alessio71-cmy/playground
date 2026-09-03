import { Figure } from './SplashArt.jsx'

// ponytail: img2-5 are still placeholders — screen 5's real icon wasn't provided.
// Swap them for the real SVGs when you have them.

const GOLD = '#B8860B'
const GREY = '#D8D8D8'

const img1 = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
    <rect x="2" y="6" width="20" height="13" rx="2" />
    <path d="M2 10h20" />
    <path d="M6 15h4" />
  </svg>
)

const img2 = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
    <rect x="6" y="2" width="12" height="20" rx="3" />
    <path d="M10 18h4" />
  </svg>
)

const img3 = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
    <path d="M4 20c0-4 3-6 3-10a3 3 0 0 1 6 0c0 4 3 6 3 10" />
    <path d="M8 20c0-3 1-5 1-8" />
  </svg>
)

const img4 = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
    <path d="M4 5c0 8.28 6.72 15 15 15l2-4-6-2-2 2c-2.5-1.2-4.3-3-5.5-5.5l2-2-2-6z" />
  </svg>
)

const img5 = img3

const img6 = (props) => (
  <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="0.5" y="0.5" width="20" height="20" rx="10" stroke="#B8860B" />
    <path d="M9.46713 6.2384C9.65755 6.15963 9.87727 6.17899 10.0511 6.29309L13.2445 8.38293L14.9593 6.83215C15.2116 6.60405 15.6043 6.61988 15.8363 6.86829C16.0682 7.117 16.0515 7.50335 15.7992 7.73157L13.7259 9.60657C13.5155 9.79705 13.2 9.82078 12.9622 9.66516L12.3353 9.255L10.9935 10.7345L12.3353 11.4972C12.4899 11.5851 12.5985 11.7346 12.6331 11.9073C12.6682 12.0796 12.6258 12.2587 12.5169 12.3986L9.89486 15.7618C9.68584 16.0291 9.29567 16.0789 9.02377 15.8732C8.75261 15.6678 8.70111 15.284 8.90951 15.0167L11.1009 12.2072L9.66927 11.3927C9.05956 11.0424 8.92798 10.229 9.39877 9.71008L10.7523 8.21887L9.66341 7.50696L7.66732 8.48938C7.36069 8.64025 6.98764 8.51768 6.83431 8.21594C6.68126 7.91427 6.80513 7.54691 7.11166 7.39563L9.46713 6.2384ZM8.51205 10.6866C8.57414 11.1133 8.79928 11.5159 9.16927 11.796L6.08334 15.1954C5.85487 15.4469 5.46268 15.4689 5.20736 15.2443C4.95204 15.019 4.92967 14.6326 5.15755 14.381L8.51205 10.6866ZM13.0023 5.00012C13.7098 5.00014 14.2826 5.56533 14.2826 6.26184C14.2823 6.95773 13.7096 7.52256 13.0023 7.52258C12.2954 7.52258 11.7213 6.95769 11.721 6.26184C11.721 5.56528 12.2953 5.00012 13.0023 5.00012Z" fill="#B8860B" />
  </svg>
)

const img7 = (props) => (
  <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M9.28859 8.48077V8.88461C9.28859 9.33087 9.65002 9.69231 10.0963 9.69231H10.904C12.2407 9.69231 13.3271 10.7786 13.3271 12.1154V12.5192C13.3271 13.7166 12.4527 14.7121 11.3078 14.906V14.9423C11.3078 15.3886 10.9464 15.75 10.5001 15.75C10.0539 15.75 9.69244 15.3886 9.69244 14.9423V14.906C8.54753 14.7121 7.67321 13.7166 7.67321 12.5192C7.67321 12.073 8.03464 11.7115 8.4809 11.7115C8.92716 11.7115 9.28859 12.073 9.28859 12.5192C9.28859 12.9655 9.65002 13.3269 10.0963 13.3269H10.904C11.3502 13.3269 11.7117 12.9655 11.7117 12.5192V12.1154C11.7117 11.6691 11.3502 11.3077 10.904 11.3077H10.0963C8.75955 11.3077 7.67321 10.2214 7.67321 8.88461V8.48077C7.67321 7.28337 8.54753 6.28788 9.69244 6.09403V6.05769C9.69244 5.61143 10.0539 5.25 10.5001 5.25C10.9464 5.25 11.3078 5.61143 11.3078 6.05769V6.09403C12.4527 6.28788 13.3271 7.28337 13.3271 8.48077C13.3271 8.92703 12.9656 9.28846 12.5194 9.28846C12.0731 9.28846 11.7117 8.92703 11.7117 8.48077C11.7117 8.03451 11.3502 7.67308 10.904 7.67308H10.0963C9.65204 7.67308 9.28859 8.03451 9.28859 8.48077ZM21 10.5C21 16.289 16.289 21 10.5 21C4.71098 21 0 16.289 0 10.5C0 4.71098 4.71098 0 10.5 0C16.289 0 21 4.71098 21 10.5ZM19.3846 10.5C19.3846 5.60138 15.3986 1.61538 10.5 1.61538C5.60138 1.61538 1.61538 5.60138 1.61538 10.5C1.61538 15.3986 5.60138 19.3846 10.5 19.3846C15.3986 19.3846 19.3846 15.3986 19.3846 10.5Z" fill="#B8860B" />
  </svg>
)

const img8 = (props) => (
  <svg viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="0.5" y="0.5" width="20" height="20" rx="10" stroke="#B8860B" />
    <path d="M10.4418 15.4481C9.68489 15.4499 9.23074 14.6824 8.61987 14.8484C8.50945 15.1405 8.31176 15.4879 8.1016 15.4879L4.58772 15.5C4.35798 15.5 4.00712 15.2373 4.00712 14.978L4 9.36044C4 9.16685 4.28674 8.77102 4.49333 8.77275L7.72403 8.79695C8.78016 10.356 8.96716 7.7011 10.8105 6.56203C13.1632 5.1101 11.8844 3.90362 12.7179 3.5562C13.0349 3.42483 13.4303 3.52509 13.6511 3.84313C14.1641 4.58292 14.1498 5.64247 13.555 6.34078C13.1827 6.77809 12.9387 7.22403 12.8568 7.82555L15.2914 7.87221C15.7545 7.88086 16.5185 8.02778 16.7981 8.39076C17.2487 8.97671 16.8623 9.7649 16.4455 10.1365C16.7946 10.401 16.994 10.7069 16.9691 11.101C16.9495 11.4087 16.7411 11.7319 16.4526 11.9601C17.0065 12.5115 16.7216 13.2391 16.2264 13.7007C16.3903 14.0498 16.49 14.5718 16.0608 14.8968C15.6654 15.1975 15.0118 15.4378 14.474 15.4395L10.4436 15.4499L10.4418 15.4481ZM7.10781 14.2019C6.95643 14.2797 6.93506 14.717 7.05973 14.8311C7.19152 14.9503 7.54415 14.9936 7.66882 14.8777C7.80596 14.7498 7.85761 14.3851 7.7454 14.2607C7.64923 14.1535 7.27344 14.1172 7.10959 14.2019H7.10781Z" fill="#B8860B" />
  </svg>
)

const SCREENS = [
  {
    key: 'payment',
    Icon: img1,
    title: 'Fossi in te, mi allenerei a vivere sotto un ponte.',
    subtitle: ['Disposizione di pagamento a favore di', 'MiniRoute & CO'],
    line: '15/09/26: -874,00 €',
  },
  {
    key: 'scroll',
    Icon: img2,
    title: 'Hai finito di scrollare? Quel pollice potresti infilartelo su per il....',
    subtitle: ['Utilizzo giornaliero dei Social'],
    line: 'media 6,5 ore',
  },
  {
    key: 'steps',
    Icon: img3,
    title: 'Abbiamo un nuovo Messner! Faresti bene a ricordarti che non hai più 20 anni.',
    subtitle: ['Hai SUPERATO il tuo obbiettivo del 75%'],
    line: '20516/10000 Passi',
  },
  {
    key: 'call',
    Icon: img4,
    title: 'Brav*! Vedi che ogni tanto sei in grado di fare qualcosa di decente',
    subtitle: ['Uno Bravo'],
    line: 'Missed Call again',
  },
]

const LIGHT_SCREENS = [
  {
    key: 'steps2',
    Icon: img6,
    title: 'Woow! Vedi che ogni tanto sei in grado di fare qualcosa di decente',
    subtitle: ['Hai QUASI raggiunto il tuo obbiettivo'],
    line: '9183/10000 Passi',
  },
  {
    key: 'balance',
    Icon: img7,
    title: 'Inaspettato... Se continui ad impegnarti potresti raggiungere la mediocrità perfetta',
    subtitle: ['Saldo mese di Agosto'],
    line: '-125 €',
  },
  {
    key: 'scroll2',
    Icon: img8,
    title: ['Mmmm...', 'Sei un buon adepto', 'Abbraccia la tua mediocrità', ' e sii fiero'],
    subtitle: ['Utilizzo giornaliero dei Social'],
    line: '1,5 ore',
  },
]

function ResultScreen({ Icon, title, subtitle, line }) {
  return (
    <div className="relative w-full h-dvh bg-black flex flex-col items-center justify-center px-8 text-center">
      <Icon
        className="magic-in"
        style={{ width: 'clamp(56px, 14dvh, 96px)', height: 'auto', color: GREY, animationDelay: '0ms' }}
      />
      <p
        className="max-w-3xl magic-in"
        style={{
          marginTop: 'clamp(24px, 6dvh, 48px)',
          fontSize: 38,
          lineHeight: 1.1,
          fontWeight: 300,
          fontStyle: 'italic',
          color: GREY,
          animationDelay: '150ms',
        }}
      >
        {title}
      </p>
      <div className="magic-in" style={{ marginTop: 'clamp(24px, 6dvh, 48px)', animationDelay: '300ms' }}>
        {subtitle.map((s, i) => (
          <p key={i} style={{ fontSize: 14, color: GOLD, marginTop: i === 0 ? 0 : 4 }}>
            {s}
          </p>
        ))}
      </div>
      <div className="flex items-center magic-in" style={{ gap: 4, marginTop: 4, animationDelay: '450ms' }}>
        <Icon style={{ width: 22, height: 22, color: GOLD }} />
        <span style={{ fontSize: 22, color: GOLD }}>{line}</span>
      </div>
    </div>
  )
}

function LightResultScreen({ Icon, title, subtitle, line }) {
  const titleLines = Array.isArray(title) ? title : [title]
  return (
    <div
      className="relative w-full h-dvh flex flex-col items-center justify-center px-8 text-center overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      <div
        className="absolute inset-0 solemn-gradient"
        style={{ background: 'linear-gradient(to bottom, #B8860B, #FFFFFF)', animationDelay: '0ms' }}
      />
      <Figure
        mainColor="#ffffff"
        className="relative solemn-rise"
        style={{ width: 'clamp(120px, 30dvh, 220px)', height: 'auto', flexShrink: 0, animationDelay: '0ms' }}
      />
      <p
        className="relative max-w-3xl solemn-rise"
        style={{
          marginTop: 'clamp(24px, 6dvh, 48px)',
          fontSize: 38,
          lineHeight: 1.1,
          fontWeight: 300,
          fontStyle: 'italic',
          color: GOLD,
          animationDelay: '350ms',
        }}
      >
        {titleLines.map((l, i) => (
          <span key={i}>
            {l}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className="relative solemn-rise" style={{ marginTop: 'clamp(24px, 6dvh, 48px)', animationDelay: '600ms' }}>
        {subtitle.map((s, i) => (
          <p key={i} style={{ fontSize: 14, color: GOLD, marginTop: i === 0 ? 0 : 4 }}>
            {s}
          </p>
        ))}
      </div>
      <div className="relative flex items-center solemn-rise" style={{ gap: 4, marginTop: 4, animationDelay: '800ms' }}>
        <Icon style={{ width: 22, height: 22, color: GOLD }} />
        <span style={{ fontSize: 22, color: GOLD }}>{line}</span>
      </div>
    </div>
  )
}

export function ResultScreensPreview() {
  return (
    <div className="flex flex-col">
      {SCREENS.map((s) => (
        <ResultScreen key={s.key} {...s} />
      ))}
      {LIGHT_SCREENS.map((s) => (
        <LightResultScreen key={s.key} {...s} />
      ))}
    </div>
  )
}

export { SCREENS, LIGHT_SCREENS, ResultScreen, LightResultScreen, img1, img2, img3, img4, img5, img6, img7, img8 }
