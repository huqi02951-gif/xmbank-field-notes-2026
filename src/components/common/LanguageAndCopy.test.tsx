import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { CopyButton, copyInLocale } from './CopyButton'
import { LanguageToggle } from './LanguageToggle'
import { Toast } from './Toast'
import { LanguageProvider } from '../../i18n/LanguageProvider'

let clipboardWriteText: ReturnType<typeof vi.fn>

describe('Language and copy controls', () => {
  beforeEach(() => {
    localStorage.clear()
    clipboardWriteText = vi.fn().mockResolvedValue(undefined)
    const navigatorStub = Object.create(navigator) as Navigator
    Object.defineProperty(navigatorStub, 'clipboard', {
      configurable: true,
      value: { writeText: clipboardWriteText },
    })
    vi.stubGlobal('navigator', navigatorStub)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('copyInLocale writes converted text to the clipboard', async () => {
    await copyInLocale('资料', 'zh-CN')
    expect(clipboardWriteText).toHaveBeenLastCalledWith('资料')

    await copyInLocale('资料', 'zh-TW')
    await waitFor(() => expect(clipboardWriteText).toHaveBeenLastCalledWith('資料'))
  })

  it('toggles display language with two pressed-state controls', async () => {
    const user = userEvent.setup()

    render(
      <LanguageProvider>
        <LanguageToggle />
      </LanguageProvider>,
    )

    const simplified = screen.getByRole('button', { name: '简体' })
    const traditional = screen.getByRole('button', { name: '繁體' })

    expect(simplified).toHaveAttribute('aria-pressed', 'true')
    expect(traditional).toHaveAttribute('aria-pressed', 'false')

    await user.click(traditional)

    await waitFor(() => expect(traditional).toHaveAttribute('aria-pressed', 'true'))
    expect(simplified).toHaveAttribute('aria-pressed', 'false')
  })

  it('copies current, Simplified, and Traditional versions with status toast text', async () => {
    const user = userEvent.setup()
    const copyText = vi.fn().mockResolvedValue(undefined)

    render(
      <LanguageProvider>
        <CopyButton text="资料" copyText={copyText} />
      </LanguageProvider>,
    )

    await user.click(screen.getByRole('button', { name: '复制当前版本' }))
    await waitFor(() => expect(copyText).toHaveBeenLastCalledWith('资料', 'zh-CN'))
    expect(screen.getByRole('status')).toHaveTextContent('已复制当前版本')

    await user.click(screen.getByRole('button', { name: '选择复制语言' }))
    const explicitActions = screen.getByRole('group', { name: '复制指定语言' })

    await user.click(within(explicitActions).getByRole('button', { name: '复制简体' }))
    await waitFor(() => expect(copyText).toHaveBeenLastCalledWith('资料', 'zh-CN'))
    expect(screen.getByRole('status')).toHaveTextContent('已复制简体')

    await user.click(within(explicitActions).getByRole('button', { name: '复制繁體' }))
    await waitFor(() => expect(copyText).toHaveBeenLastCalledWith('资料', 'zh-TW'))
    expect(screen.getByRole('status')).toHaveTextContent('已复制繁体')
  })

  it('reports clipboard rejection and allows the toast to be dismissed or cleared by timer', async () => {
    vi.useFakeTimers()
    const copyText = vi.fn().mockRejectedValueOnce(new Error('denied')).mockResolvedValue(undefined)

    render(
      <LanguageProvider>
        <CopyButton text="资料" copyText={copyText} />
      </LanguageProvider>,
    )

    fireEvent.click(screen.getByRole('button', { name: '复制当前版本' }))

    await act(async () => {
      await Promise.resolve()
    })
    expect(screen.getByRole('status')).toHaveTextContent('复制失败，请手动选择文本')
    fireEvent.click(screen.getByRole('button', { name: '关闭提示' }))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: '复制当前版本' }))
    await act(async () => {
      await Promise.resolve()
    })
    expect(screen.getByRole('status')).toHaveTextContent('已复制当前版本')

    await act(async () => {
      vi.advanceTimersByTime(2600)
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('renders a dismissible status toast', async () => {
    const user = userEvent.setup()

    render(<Toast message="已复制繁体" onDismiss={vi.fn()} />)

    expect(screen.getByRole('status')).toHaveTextContent('已复制繁体')
    await user.click(screen.getByRole('button', { name: '关闭提示' }))
  })
})
