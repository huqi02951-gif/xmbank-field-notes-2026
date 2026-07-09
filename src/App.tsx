import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { BankQuestions } from './components/sections/BankQuestions'
import { BusinessMoments } from './components/sections/BusinessMoments'
import { Hero } from './components/sections/Hero'
import { LifeCorner } from './components/sections/LifeCorner'
import { NoteStrip } from './components/sections/NoteStrip'
import { LanguageProvider } from './i18n/LanguageProvider'

function AppContent() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <BankQuestions />
        <BusinessMoments />
        <NoteStrip />
        <LifeCorner />
      </main>
      <Footer />
    </>
  )
}

export function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
