import { useLanguage } from '../../i18n/LanguageProvider'

export function Hero() {
  const { t } = useLanguage()
  const { hero } = t

  return (
    <section className="hero page-grid" id="top" aria-labelledby="hero-title">
      <div className="hero__copy">
        <p className="eyebrow">{hero.eyebrow}</p>
        <h1 id="hero-title">{hero.title}</h1>
        <div className="hero__introduction">
          {hero.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <a className="primary-link" href="#bank-questions">
          {hero.action}
        </a>
      </div>

      <figure className="hero-route">
        <svg
          aria-hidden="true"
          className="hero-route__art"
          focusable="false"
          viewBox="0 0 560 340"
        >
          <path
            className="hero-route__coast"
            d="M24 274c52-46 97-20 142-55 45-34 59-91 117-100 66-10 94 53 154 26 42-19 56-59 99-62"
          />
          <path className="hero-route__city" d="M366 241v-45h25v-26h26v71m18 0v-73h30v73m20 0v-106h32v106" />
          <path className="hero-route__line" d="M83 208C164 84 312 75 469 196" />
          <circle cx="83" cy="208" r="7" />
          <circle cx="277" cy="103" r="7" />
          <circle cx="469" cy="196" r="7" />
          <text x="62" y="236">{hero.route[0]}</text>
          <text x="256" y="82">{hero.route[1]}</text>
          <text x="451" y="225">{hero.route[2]}</text>
        </svg>
        <figcaption className="visually-hidden">
          {hero.route.join('、')}构成的业务观察路线
        </figcaption>
      </figure>

      <p className="hero__note">{hero.note}</p>
    </section>
  )
}
