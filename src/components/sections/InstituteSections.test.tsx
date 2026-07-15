import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'

import { App } from '../../App'

describe('internship learning portal', () => {
  beforeEach(() => { window.location.hash = '#/' })

  it('presents the structured learning path and core modules', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: '从一项业务，理解一家银行。' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '实习地图' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '企业账户与基础服务' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '企业授信全流程' })).toBeInTheDocument()
    expect(screen.getByText('重大预警续报')).toBeInTheDocument()
  })

  it('searches across chapters', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('textbox', { name: '搜索知识与工具' }), '受益所有人')
    expect(screen.getByRole('link', { name: /账户变更与受益所有人/ })).toBeInTheDocument()
  })
})
