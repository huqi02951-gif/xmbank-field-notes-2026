import { useEffect, useMemo, useState } from 'react'

import { LanguageToggle } from './components/common/LanguageToggle'
import { LanguageProvider, useLanguage } from './i18n/LanguageProvider'
import type { PortalModule, PortalModuleId } from './content/portal'
import type { SiteContent } from './content/content.zh-CN'
import { AccountServiceWorkbench } from './features/account/components/AccountServiceWorkbench'
import './styles/portal.css'

type Route = { page: 'home' } | { page: 'module'; moduleId: PortalModuleId; chapterId?: string }

function readRoute(): Route {
  const parts = window.location.hash.replace(/^#\/?/, '').split('/').filter(Boolean)
  if (parts[0] === 'module' && parts[1]) return { page: 'module', moduleId: parts[1] as PortalModuleId, chapterId: parts[2] }
  return { page: 'home' }
}

type PortalLabels = SiteContent['portal']
type SearchResult = { module: PortalModule; chapter: PortalModule['chapters'][number] }

function AppContent() {
  const { t } = useLanguage()
  const portal = t.portal
  const modules = portal.modules as PortalModule[]
  const [route, setRoute] = useState<Route>(readRoute)
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onHash = () => {
      const nextRoute = readRoute()
      setRoute(nextRoute)
      setMenuOpen(false)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return modules.flatMap((module) => module.chapters
      .filter((chapter) => `${module.title}${JSON.stringify(chapter)}`.toLowerCase().includes(term))
      .map((chapter) => ({ module, chapter })))
  }, [modules, query])

  return (
    <div className="portal-shell">
      <a className="skip-link" href="#main-content">{portal.skip}</a>
      <header className="portal-header">
        <a className="portal-brand" href="#/" aria-label={portal.brand}>
          <span className="portal-brand__seal">IL</span>
          <span><strong>{portal.brand}</strong><small>{portal.brandEn}</small></span>
        </a>
        <button className="portal-menu" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{portal.menu}</button>
        <nav className={menuOpen ? 'is-open' : ''} aria-label="主导航">
          <a href="#/">{portal.home}</a>
          {modules.slice(0, 4).map((module) => <a key={module.id} href={`#/module/${module.id}`}>{module.title}</a>)}
        </nav>
        <LanguageToggle />
      </header>
      <main id="main-content">
        {route.page === 'home' ? (
          <HomePage portal={portal} modules={modules} query={query} setQuery={setQuery} results={results} />
        ) : (
          <ModulePage module={modules.find((item) => item.id === route.moduleId) ?? modules[0]} chapterId={route.chapterId} labels={portal} />
        )}
      </main>
      <footer className="portal-footer"><span>{portal.brandEn}</span><strong>{portal.footer}</strong></footer>
    </div>
  )
}

function HomePage({ portal, modules, query, setQuery, results }: { portal: PortalLabels; modules: PortalModule[]; query: string; setQuery: (value: string) => void; results: SearchResult[] }) {
  return <>
    <section className="portal-hero">
      <div className="portal-hero__copy"><p className="portal-kicker">{portal.hero.eyebrow}</p><h1>{portal.hero.title}</h1><p>{portal.hero.intro}</p><div className="portal-actions"><a href="#learning-path">{portal.hero.primary}</a><a className="secondary" href="#/module/account/account-basics">{portal.hero.secondary}</a></div><small>{portal.hero.note}</small></div>
      <div className="portal-hero__folio" aria-hidden="true"><span>FIELD<br/>INDEX</span><strong>01—06</strong><i/></div>
    </section>
    <section className="portal-search" aria-label={portal.search}><label htmlFor="portal-search">{portal.search}</label><input id="portal-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={portal.searchPlaceholder}/>{query && <div className="search-results">{results.length ? results.map(({module, chapter}) => <a key={`${module.id}/${chapter.id}`} href={`#/module/${module.id}/${chapter.id}`}><small>{module.label}</small><strong>{chapter.title}</strong><span>{chapter.summary}</span></a>) : <p>{portal.searchEmpty}</p>}</div>}</section>
    <section id="learning-path" className="portal-section"><header><p className="portal-kicker">LEARNING PATH</p><h2>{portal.learningPath}</h2></header><div className="learning-path">{portal.path.map((item: readonly string[]) => <a key={item[0]} href={`#/module/${item[3]}`}><b>{item[0]}</b><span><strong>{item[1]}</strong><small>{item[2]}</small></span></a>)}</div></section>
    <section className="portal-section module-index"><header><p className="portal-kicker">ACADEMIC INDEX</p><h2>{portal.moduleIndex}</h2></header><div className="module-grid">{modules.map((module: PortalModule) => <a key={module.id} href={`#/module/${module.id}`} className="module-card"><span>{module.number}</span><small>{module.label}</small><h3>{module.title}</h3><p>{module.summary}</p><b>{module.chapters.length} {portal.chapterUnit} →</b></a>)}</div></section>
    <section className="portal-section quick-entry"><header><p className="portal-kicker">QUICK ACCESS</p><h2>{portal.recommended}</h2></header><div>{portal.quickEntries.map((entry: readonly string[], index: number) => <a key={entry[1]} href={['#/module/account/materials', '#/module/credit/alert-follow-up', '#/module/agents/apex'][index]}><small>{entry[0]}</small><strong>{entry[1]}</strong><span>{entry[2]}</span></a>)}</div></section>
  </>
}

function ModulePage({ module, chapterId, labels }: { module: PortalModule; chapterId?: string; labels: PortalLabels }) {
  const activeIndex = Math.max(0, module.chapters.findIndex((chapter) => chapter.id === chapterId))
  const chapter = module.chapters[activeIndex]
  return <div className="module-layout">
    <aside className="chapter-sidebar"><a href="#/">← {labels.home}</a><p>{module.label}</p><h2>{module.title}</h2><nav aria-label={`${module.title}章节`}>{module.chapters.map((item, index) => <a className={item.id === chapter.id ? 'is-active' : ''} key={item.id} href={`#/module/${module.id}/${item.id}`}><span>{String(index + 1).padStart(2, '0')}</span>{item.title}</a>)}</nav></aside>
    <article className="chapter-article">
      <div className="breadcrumbs"><a href="#/">{labels.home}</a><span>/</span><a href={`#/module/${module.id}`}>{module.title}</a><span>/</span><b>{chapter.title}</b></div>
      <header><p className="portal-kicker">{chapter.eyebrow}</p><h1>{chapter.title}</h1><p>{chapter.summary}</p></header>
      <div className="article-body">{chapter.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {chapter.steps && <ol className="process-list">{chapter.steps.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></li>)}</ol>}
        {chapter.points && <ul className="knowledge-list">{chapter.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        {chapter.note && <aside className="teaching-note"><small>FIELD NOTE</small><p>{chapter.note}</p></aside>}
      </div>
      {chapter.feature === 'account-toolkit' && chapter.toolkit ? <AccountServiceWorkbench content={chapter.toolkit} /> : null}
      <nav className="chapter-pagination">{activeIndex > 0 ? <a href={`#/module/${module.id}/${module.chapters[activeIndex - 1].id}`}>← {labels.previous}<strong>{module.chapters[activeIndex - 1].title}</strong></a> : <span/>}{activeIndex < module.chapters.length - 1 ? <a href={`#/module/${module.id}/${module.chapters[activeIndex + 1].id}`}>{labels.next} →<strong>{module.chapters[activeIndex + 1].title}</strong></a> : <a href="#/">{labels.backToModule}<strong>{labels.home}</strong></a>}</nav>
    </article>
  </div>
}

export function App() { return <LanguageProvider><AppContent /></LanguageProvider> }
