import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { App } from '../../App'

describe('editorial internship experience', () => {
  it('renders the approved editorial structure without task or progress UI', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: '实务研习院' }),
    ).toBeInTheDocument()

    expect(
      screen.getAllByRole('button', { name: /^\d{2}\s+为什么/ }),
    ).toHaveLength(3)

    expect(
      screen.getByRole('heading', {
        level: 3,
        name: '开户前，为什么还要了解企业？',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: '零散信息，怎样变成一家企业的轮廓？',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: '一笔授信，最后会回到哪几个问题？',
      }),
    ).toBeInTheDocument()

    expect(screen.queryByText(/(?:任务中心|完成进度|每日打卡|实习作业)/)).not.toBeInTheDocument()

    const lifeSection = screen.getByRole('region', { name: '下班以后' })
    expect(within(lifeSection).getAllByRole('button')).toHaveLength(3)
    expect(within(lifeSection).queryByRole('article')).not.toBeInTheDocument()
    expect(within(lifeSection).queryByText(/(?:待补充|评分|人均)/)).not.toBeInTheDocument()

    const footer = screen.getByRole('contentinfo')
    expect(Array.from(footer.querySelectorAll('p'), (line) => line.textContent)).toEqual([
      '厦门银行 · 2026 台湾高校青年实习计划',
      '学习资料 · 专业内容以最新制度及有权人员确认为准',
    ])
  })

  it('lets readers open one bank question and one life entry', async () => {
    const user = userEvent.setup()
    render(<App />)

    const bankQuestion = screen.getByRole('button', {
      name: '01 为什么企业开户比个人开户复杂？',
    })
    await user.click(bankQuestion)
    expect(bankQuestion).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByText(/(?:企业账户连接的是经营活动、交易对象和资金路径)/),
    ).toBeVisible()

    const lifeEntry = screen.getByRole('button', { name: '徒步' })
    await user.click(lifeEntry)
    expect(lifeEntry).toHaveAttribute('aria-expanded', 'true')
    expect(
      screen.getByText(/(?:AllTrails).*(?:1—3 小时)/),
    ).toBeVisible()
  })
})
