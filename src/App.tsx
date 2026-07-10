import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { BankQuestions } from './components/sections/BankQuestions'
import { BusinessMoments } from './components/sections/BusinessMoments'
import { ClosingReflection } from './components/sections/ClosingReflection'
import { Curriculum } from './components/sections/Curriculum'
import { FieldPractice } from './components/sections/FieldPractice'
import { Hero } from './components/sections/Hero'
import { LifeCorner } from './components/sections/LifeCorner'
import { NoteStrip } from './components/sections/NoteStrip'
import { MentorshipProtocol } from './components/sections/MentorshipProtocol'
import { ResearchStudio } from './components/sections/ResearchStudio'
import { ApexTool } from './features/apex/components/ApexTool'
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
        <Curriculum />
        <BankQuestions />
        <BusinessMoments />
        <NoteStrip />
        <ApexTool />
        <FieldPractice />
        <ResearchStudio />
        <MentorshipProtocol />
        <LifeCorner />
        <ClosingReflection />
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
