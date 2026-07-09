import { siteContent } from '../../content/content.zh-CN'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        {siteContent.footer.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </footer>
  )
}
