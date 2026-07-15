import { curriculumStages } from './curriculum'
import {
  contentBoundaryLabels,
  fieldMoments,
  mentorshipProtocol,
  reflectionPrompts,
  researchMethod,
} from './fieldGuide'
import { portalContent } from './portal'

export const siteContent = {
  portal: portalContent,
  hero: {
    eyebrow: 'FIELD INSTITUTE · 2026',
    title: '实务研习院',
    paragraphs: [
      '欢迎进入真实的银行现场。这里没有速成答案，只有一套帮助你观察、提问、整理与表达的方法。',
      '你可以暂时不知道答案，但需要知道事实从哪里来、判断的边界在哪里，以及下一步应当向谁确认。',
    ],
    action: '进入课程',
    note: '一份给台湾高校实习生的实务课程手册。它辅助学习，不替代正式培训、最新制度与有权岗位判断。',
    route: ['观察', '判断', '表达'],
    metadata: [
      ['周期', '四周实务研习'],
      ['方法', '案例 · 现场 · 复盘'],
      ['文字', '简体 / 繁體'],
    ],
    outcomes: ['看见业务结构', '提出可验证问题', '形成证据判断', '完成专业表达'],
  },
  curriculum: {
    eyebrow: '01 / CURRICULUM',
    title: '一个月，不只积累经历',
    introduction: '真正的成长不是“接触过多少业务”，而是你开始用更准确的方法理解复杂问题。四个阶段可以反复往返，不是一条只能向前的进度条。',
    stages: curriculumStages,
  },
  bankQuestions: {
    title: '银行里值得看的事',
    introduction:
      '先不急着背术语。银行里很多看起来繁琐的步骤，其实都在回答几个很具体的问题：面对的是谁，事情为什么发生，信息能不能互相解释，风险由谁确认。',
    questions: [
      {
        id: 'enterprise-account',
        title: '为什么企业开户比个人开户复杂？',
        answer:
          '企业账户连接的是经营活动、交易对象和资金路径。银行不仅要核实企业身份，也需要了解谁最终拥有或控制企业、账户准备怎么使用，以及相关信息是否一致。',
      },
      {
        id: 'follow-up',
        title: '为什么客户说经营很好，银行仍然会继续问？',
        answer:
          '客户的描述是一部分，登记、经营、财务、交易和现场情况是另外几部分。银行会把信息放在一起，看它们能不能互相解释；继续提问不等于已经作出负面判断。',
      },
      {
        id: 'shared-review',
        title: '为什么一件看起来简单的业务，需要这么多人确认？',
        answer:
          '客户经理、审查审批、运营和柜面看到的是同一项业务的不同部分。分工让信息更完整，也让每个环节的职责更清楚。具体参与岗位会随业务类型不同。',
      },
    ],
    years: [
      { year: '1996', label: '厦门银行成立' },
      { year: '2013', label: '台湾高校青年实习计划启动' },
      { year: '2026', label: '这一届实习交流' },
    ],
  },
  moments: {
    title: '三个真实业务瞬间',
    dialogue: {
      eyebrow: '业务瞬间 01 / 对话',
      title: '开户前，为什么还要了解企业？',
      quote: '“公司只是开个账户，为什么还要看经营情况？”',
      concerns: [
        '企业身份和实际经营是否能够相互印证；',
        '谁最终拥有、控制或代表这家企业；',
        '账户准备怎样使用，可能发生什么类型的交易；',
        '现有信息有没有缺口或不一致。',
      ],
      closing:
        '开户不只是收齐材料。银行需要理解账户背后的人、企业和资金活动。实际所需材料和核实方式，以办理时经办机构要求为准。',
    },
    workspace: {
      eyebrow: '业务瞬间 02 / 材料工作台',
      title: '零散信息，怎样变成一家企业的轮廓？',
      fragments: ['营业执照', '股东结构', '客户描述', '收入和现金流', '上下游', '资金需求'],
      questions: [
        '它是谁？',
        '谁在控制？',
        '做什么？',
        '怎么赚钱？',
        '为什么需要银行？',
        '最大的不确定性是什么？',
      ],
      closing:
        '银行会把分散信息整理成一个能够被理解、验证和讨论的企业轮廓。它不是给企业“打标签”，而是帮助不同岗位围绕同一组事实沟通。',
    },
    questions: {
      eyebrow: '业务瞬间 03 / 四问',
      title: '一笔授信，最后会回到哪几个问题？',
      items: ['谁在申请？', '为什么需要？', '靠什么偿还？', '情况发生变化时怎么办？'],
      closing:
        '很多复杂材料，最后都在帮助回答这四个问题。当天碰到有意思的授信业务，可以试着看它正在回答哪一个问题。',
    },
  },
  noteStrip: {
    title: '留下一句话',
    lines: [
      '今天看懂了一个问题。',
      '还有一个地方，之后想再问。',
      '银行里的答案，通常不是一个岗位单独完成的。',
    ],
  },
  apex: {
    title: 'APEX 可复核工具实验室',
    paragraphs: [
      '银行一线有很多细小却反复出现的工作：整理材料、核对信息、理解一家企业、回应专业问题，再把复杂内容转换成更容易理解的表达。',
      'APEX 把这些经验整理成可以调用、复核和持续完善的能力。这里展示的是经过脱敏的公开示例，不连接内部系统，也不保存输入。',
    ],
    fragments: ['企业基本信息', '客户描述', '缺失材料', '不一致信息', '专业问题'],
    process: ['识别任务', '调用专业能力', '形成可复核结果'],
    results: ['示例材料准备方向', '一页企业轮廓', '易理解的补充说明'],
    disclaimer:
      '示例仅用于理解信息整理方法，不构成开户、授信或其他业务的办理要求。实际结果需由经办人员依据最新制度和具体情况复核。',
    classification: '教学示例 · 不连接内部系统 · 不保存业务信息',
  },
  fieldPractice: {
    eyebrow: '04 / FIELD PRACTICE',
    title: '第一次进入现场，应该看什么',
    introduction: '现场学习的价值不在于站在旁边，而在于知道自己正在观察什么、哪些信息不能带走，以及回来后值得追问什么。',
    moments: fieldMoments,
  },
  research: {
    eyebrow: '05 / RESEARCH STUDIO',
    title: '把课题做成一项真正的研究',
    introduction: '无论是个人书信、城市记录，还是两岸金融服务课题，高质量成果都需要一条完整的证据链，而不只是漂亮结论。',
    method: researchMethod,
    criteria: ['问题真实而具体', '证据来源可解释', '建议能够被实施', '原型可以被体验', '限制与边界被说明'],
  },
  mentorship: {
    eyebrow: '06 / MENTORSHIP',
    title: '我们怎样一起工作',
    introduction: '导师不会替你完成判断，但会帮助你获得进入问题的方法、适合当前阶段的工作，以及足够具体的反馈。',
    protocol: mentorshipProtocol,
    escalationTitle: '不要等到下次复盘',
    escalation: '涉及客户隐私、合规疑问、操作风险、人身安全、严重健康状况或你感到无法独立处理的情况，请立即停止并联系导师或项目负责人。及时上报是一种专业能力。',
  },
  boundaries: {
    title: '使用边界',
    labels: contentBoundaryLabels,
  },
  reflection: {
    eyebrow: '08 / CLOSING REFLECTION',
    title: '最后带走的，应该是一种方法',
    introduction: '经历会过去，方法会留下。每周用这四个问题检验一次自己的变化。',
    prompts: reflectionPrompts,
  },
  life: {
    title: '下班以后',
    introduction:
      '想徒步、喝咖啡、吃甜点、找一家辣一点的餐厅，或者只是想找个地方坐坐，都可以随时问。',
    entries: [
      {
        id: 'hikes',
        title: '徒步',
        body: '想自己找轻松路线，可以使用 AllTrails，优先筛选“轻松或中等、1—3 小时、景观路线”。复杂路线或没有实际走过的路线，不在这里随意推荐。',
      },
      {
        id: 'drinks',
        title: '咖啡、甜点和奶茶',
        body: '找店可以先看大众点评。哪天下班想喝咖啡，也可以直接来找我，一起去喝一杯；想找咖啡、甜点或奶茶，也可以私聊说一下区域和偏好。',
      },
      {
        id: 'food',
        title: '吃什么',
        body: '想吃川菜、辣口料理、漂亮饭，或者只是想找个地方放松，都可以随时问。这里不按身份预设口味，也不放未经确认的排行榜。',
      },
    ],
  },
  footer: ['厦门银行 · 2026 台湾高校青年实习计划', '学习资料 · 专业内容以最新制度及有权人员确认为准'],
} as const

type WidenContent<T> = T extends string
  ? string
  : T extends readonly (infer Item)[]
    ? readonly WidenContent<Item>[]
    : T extends object
      ? { readonly [Key in keyof T]: WidenContent<T[Key]> }
      : T

export type SiteContent = WidenContent<typeof siteContent>
