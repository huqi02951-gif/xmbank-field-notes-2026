import { useState } from 'react'

import { useLanguage } from '../../i18n/LanguageProvider'

export function BankQuestions() {
  const { t } = useLanguage()
  const { bankQuestions } = t
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null)

  return (
    <section
      className="section-shell bank-questions page-grid"
      id="bank-questions"
      aria-labelledby="bank-questions-title"
    >
      <div className="section-heading">
        <p className="section-index">01</p>
        <h2 id="bank-questions-title">{bankQuestions.title}</h2>
        <p>{bankQuestions.introduction}</p>
      </div>

      <div className="question-list">
        {bankQuestions.questions.map((question, index) => {
          const isOpen = question.id === openQuestionId
          const panelId = `bank-question-${question.id}`

          return (
            <div className="question" key={question.id}>
              <button
                type="button"
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenQuestionId(isOpen ? null : question.id)}
              >
                <span>{String(index + 1).padStart(2, '0')} {question.title}</span>
                <span aria-hidden="true" className="question__marker">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              {isOpen ? (
                <div className="question__answer" id={panelId}>
                  <p>{question.answer}</p>
                </div>
              ) : null}
            </div>
          )
        })}
      </div>

      <aside className="year-notes" aria-label="年份边注">
        {bankQuestions.years.map(({ year, label }) => (
          <p key={year}>
            <strong>{year}</strong>
            <span>{label}</span>
          </p>
        ))}
      </aside>
    </section>
  )
}
