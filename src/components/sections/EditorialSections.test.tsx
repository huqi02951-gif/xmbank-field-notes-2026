import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'

import { App } from '../../App'

describe('portal chapter experience', () => {
  beforeEach(() => { window.location.hash = '#/module/credit/alert-follow-up' })

  it('explains post-loan follow-up as an eight-step workflow', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: '贷后重大预警客户续报' })).toBeInTheDocument()
    expect(screen.getByText('复制上一期系统内容')).toBeInTheDocument()
    expect(screen.getByText('小海螺批量查询与截图')).toBeInTheDocument()
    expect(screen.getByText('共同分析企业最新情况')).toBeInTheDocument()
    expect(screen.getByText(/不能只改日期/)).toBeInTheDocument()
  })

  it('stores lightweight reading progress', () => {
    render(<App />)
    const button = screen.getByRole('button', { name: '标记为已读' })
    fireEvent.click(button)
    expect(screen.getByRole('button', { name: /已读/ })).toHaveClass('is-read')
  })
})
