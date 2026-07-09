import { LanguageToggle } from '../common/LanguageToggle'

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-mark" href="#top" aria-label="两岸实习手记首页">
          手记
        </a>
        <nav aria-label="主导航">
          <a href="#bank-questions">值得看</a>
          <a href="#business-moments">业务瞬间</a>
          <a href="#life-corner">下班以后</a>
        </nav>
        <LanguageToggle />
      </div>
    </header>
  )
}
