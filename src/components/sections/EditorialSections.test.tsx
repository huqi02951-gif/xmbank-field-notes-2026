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

  it('keeps learning pages free of homework-style read tracking', () => {
    render(<App />)
    expect(screen.queryByRole('button', { name: '标记为已读' })).not.toBeInTheDocument()
    expect(screen.queryByText(/已读/)).not.toBeInTheDocument()
  })

  it('turns the account materials chapter into a practical bilingual toolkit', () => {
    window.location.hash = '#/module/account/materials'
    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: '开户与变更实用工作台' })).toBeInTheDocument()
    expect(screen.getByText('开户尽调申请表')).toBeInTheDocument()
    expect(screen.getByText('客户经理尽调走访照片')).toBeInTheDocument()
    expect(screen.getByText('受益所有人系统 PDF')).toBeInTheDocument()
    expect(screen.getByText('受益所有人登记表')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '复制简体' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '复制繁體' })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: /一般户开户/ }))
    expect(screen.getByText('基本存款账户信息表或原基本户相关信息')).toBeInTheDocument()
  })
})
