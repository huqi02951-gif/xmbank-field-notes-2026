import { LanguageToggle } from '../common/LanguageToggle'

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-mark" href="#top" aria-label="实务研习院首页">
          FI
        </a>
        <nav aria-label="主导航">
          <a href="#curriculum">课程</a>
          <a href="#apex-tool">实验室</a>
          <a href="#research-studio">研究</a>
          <a href="#mentorship">协作</a>
        </nav>
        <LanguageToggle />
      </div>
    </header>
  )
}
