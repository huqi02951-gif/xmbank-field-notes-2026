import { useLanguage } from '../../i18n/LanguageProvider'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {t.footer.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </footer>
  )
}
