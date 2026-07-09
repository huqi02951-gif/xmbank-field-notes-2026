import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LanguageToggle } from '../../../components/common/LanguageToggle'
import { LanguageProvider } from '../../../i18n/LanguageProvider'
import { ApexTool } from './ApexTool'

function renderTool() {
  return render(
    <LanguageProvider>
      <LanguageToggle />
      <ApexTool />
    </LanguageProvider>,
  )
}

describe('ApexTool', () => {
  beforeEach(() => {
    localStorage.clear()
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the three-stage workbench without private data controls', () => {
    renderTool()

    expect(screen.getByRole('region', { name: '经验怎样被整理下来' })).toBeInTheDocument()
    expect(screen.getByText('零散信息')).toBeInTheDocument()
    expect(screen.getByText('APEX 处理')).toBeInTheDocument()
    expect(screen.getByText('清晰结果')).toBeInTheDocument()
    expect(screen.getByText('识别任务 → 调用专业能力 → 形成可复核结果')).toBeInTheDocument()

    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(
      screen.queryByText(/(?:企业名称|客户名称|联系人|手机号|电话|身份证|统一社会信用代码|AI 对话)/),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: /(?:保存|上传|导出|聊天)/ }),
    ).not.toBeInTheDocument()
  })

  it('switches account kind and toggles temporary materials into ready and missing output', async () => {
    const user = userEvent.setup()
    renderTool()

    await user.click(screen.getByRole('radio', { name: '专用户示例' }))
    await user.click(screen.getByRole('checkbox', { name: /主体资格材料/ }))
    await user.click(screen.getByRole('checkbox', { name: /控制关系说明/ }))

    const result = screen.getByRole('region', { name: '清晰结果' })

    expect(within(result).getByText(/专用户示例/)).toBeInTheDocument()
    expect(within(result).getByText(/一、已准备材料/)).toBeInTheDocument()
    expect(within(result).getByText(/1\. 主体资格材料/)).toBeInTheDocument()
    expect(within(result).getByText(/2\. 控制关系说明/)).toBeInTheDocument()
    expect(within(result).getByText(/二、可补充材料/)).toBeInTheDocument()
    expect(within(result).getByText(/代表人或经办人身份材料/)).toBeInTheDocument()
  })

  it('follows language display and exposes explicit copy actions', async () => {
    const user = userEvent.setup()
    renderTool()

    await user.click(screen.getByRole('button', { name: '繁體' }))

    const result = screen.getByRole('region', { name: '清晰结果' })
    await waitFor(() => expect(within(result).getByText(/一、已準備材料/)).toBeInTheDocument())

    expect(screen.getByRole('button', { name: '复制当前版本' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '选择复制语言' }))
    const copyGroup = screen.getByRole('group', { name: '复制指定语言' })

    expect(within(copyGroup).getByRole('button', { name: '复制简体' })).toBeInTheDocument()
    expect(within(copyGroup).getByRole('button', { name: '复制繁體' })).toBeInTheDocument()
  })

  it('keeps material selections only in React memory', async () => {
    const user = userEvent.setup()
    const firstRender = renderTool()

    await user.click(screen.getByRole('checkbox', { name: /主体资格材料/ }))
    expect(screen.getByRole('checkbox', { name: /主体资格材料/ })).toBeChecked()

    firstRender.unmount()
    renderTool()

    expect(screen.getByRole('checkbox', { name: /主体资格材料/ })).not.toBeChecked()
    expect(Object.keys(localStorage)).toEqual(['xmbank-field-notes-locale'])
  })
})
