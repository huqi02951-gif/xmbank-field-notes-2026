import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { App } from '../../App'

describe('field institute learning journey', () => {
  it('presents rigorous outcomes, research method and professional boundaries', () => {
    render(<App />)
    expect(within(screen.getByRole('list', { name: '学习成果' })).getAllByRole('listitem')).toHaveLength(4)
    expect(screen.getByRole('region', { name: '一个月，不只积累经历' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '把课题做成一项真正的研究' })).toBeInTheDocument()
    expect(screen.getByText('问题真实而具体')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '使用边界' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '必须即时复核' })).toBeInTheDocument()
    expect(screen.getByText(/及时上报是一种专业能力/)).toBeInTheDocument()
  })

  it('lets the reader move between the four curriculum stages', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('tab', { name: /SYNTHESIZE/ }))
    expect(screen.getByRole('heading', { name: '让零散信息形成结构' })).toBeInTheDocument()
    expect(screen.getByText('一页可复核分析')).toBeInTheDocument()
  })
})
