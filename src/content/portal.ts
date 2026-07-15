export type PortalModuleId = 'account' | 'credit' | 'agents' | 'practice' | 'resources'

export interface PortalChapter {
  id: string
  eyebrow: string
  title: string
  summary: string
  body: string[]
  points?: string[]
  steps?: string[]
  note?: string
  feature?: 'account-toolkit'
  toolkit?: AccountToolkitContent
}

export interface AccountToolkitScenario {
  id: string
  label: string
  title: string
  description: string
  materials: string[]
}

export interface AccountToolkitContent {
  title: string
  intro: string
  sourceNote: string
  scenarios: AccountToolkitScenario[]
  appointmentTitle: string
  appointmentPath: string[]
  appointmentNotes: string[]
  contactTitle: string
  contactSteps: string[]
  counterTitle: string
  counterIntro: string
  counterMaterials: string[]
  messageTitle: string
  messageIntro: string
  messageClosing: string
}

export interface PortalModule {
  id: PortalModuleId
  number: string
  label: string
  title: string
  summary: string
  chapters: PortalChapter[]
}

export const portalContent = {
  brand: '实习学习站',
  brandEn: 'Internship Learning Portal',
  home: '首页',
  learningPath: '实习地图',
  moduleIndex: '实习知识模块',
  menu: '目录',
  skip: '跳到主要内容',
  chapterUnit: '个章节',
  search: '搜索知识与工具',
  searchPlaceholder: '搜索：基本户、开户材料、重大预警、APEX…',
  searchEmpty: '暂时没有找到相关内容，可以换一个关键词。',
  recentlyAdded: '最近新增',
  recommended: '建议从这里开始',
  quickEntries: [
    ['ACCOUNT SERVICES', '开户实用工作台', '预约、材料与沟通文本'],
    ['NEW · POST-LOAN', '重大预警续报', '从上期内容到本期提交'],
    ['AI ARCHITECTURE', 'APEX 能力架构', 'Skills、Workflow 与人工复核'],
  ],
  backToModule: '返回模块',
  previous: '上一节',
  next: '下一节',
  hero: {
    eyebrow: '2026 INTERNSHIP KNOWLEDGE PORTAL · 科技业务部',
    title: '从一项业务，理解一家银行。',
    intro:
      '这里把实习中接触到的账户、企业、授信、贷后与 Agent 工具整理成清楚的业务入口。需要办理、查询或复看时，直接进入对应模块即可。',
    primary: '查看实习地图',
    secondary: '从企业开户开始',
    note: '制作人｜科技业务部 XD.Hu · 有问题、有想法，欢迎随时沟通交流。',
  },
  path: [
    ['01', '认识银行与企业', '理解客户经理、企业客户与银行内部岗位的关系。', 'account'],
    ['02', '从账户开始', '认识基本户、一般户、开户材料、变更与受益所有人。', 'account'],
    ['03', '认识一家企业', '从访前准备、现场观察与经营信息形成企业轮廓。', 'credit'],
    ['04', '进入授信流程', '串起贷前调查、审查审批、合同落实与放款。', 'credit'],
    ['05', '持续关注企业', '理解贷后管理、征信变化、外部查询与重大预警续报。', 'credit'],
    ['06', '理解 Agent 能力架构', '认识 Skills、Workflow 与人工复核如何组合成可复用能力。', 'agents'],
  ],
  modules: [
    {
      id: 'account', number: '01', label: 'ACCOUNT SERVICES', title: '企业账户与基础服务',
      summary: '从企业最常见的银行业务开始，理解开户材料背后的真实性、权限与使用逻辑。',
      chapters: [
        { id: 'account-basics', eyebrow: '01 / ACCOUNT BASICS', title: '企业对公账户是什么', summary: '企业账户连接经营活动、交易对象与资金路径。', body: ['企业对公账户用于日常收付款、缴税、发放工资、办理融资及使用银行金融服务。', '开户时，银行除了核对证照，也会了解企业是否真实经营、谁在实际控制企业、账户准备如何使用，以及预计交易是否与经营情况相匹配。'], points: ['企业是否真实经营', '主要从事什么业务', '谁在实际控制企业', '账户准备如何使用', '资金往来是否与经营匹配'], note: '现场可以留意：银行正在确认什么、客户容易遗漏什么、哪些要求服务于后续使用，哪些用于核实真实性与防范风险。' },
        { id: 'basic-general', eyebrow: '02 / ACCOUNT TYPES', title: '基本户与一般户', summary: '账户名称相近，使用位置并不相同。', body: ['基本存款账户是企业主要结算账户，一家企业原则上只能开立一个，可用于日常收付款、缴税、发薪及现金业务。', '一般存款账户是在已有基本户后，因结算、融资或其他经营需要开立；企业可按需要开立多个，一般用于转账、项目结算及贷款资金收取和偿还。具体使用范围以最新规定为准。'], points: ['基本户：主要账户，原则上一个', '一般户：已有基本户后按经营需要开立', '开户前先确认账户用途与原基本户信息'] },
        { id: 'opening-flow', eyebrow: '03 / OPENING FLOW', title: '对公开户如何办理', summary: '从线上预约到权限设置，五步形成完整办理链路。', body: ['实际流程会随客户情况与最新要求调整，以下用于理解各环节之间的关系。'], steps: ['线上预约：按企业分别提交申请', '法人意愿确认：核实企业真实开户意愿', '准备资料：按企业、人员与经营资料分类', '现场办理：核对原件、印鉴与账户用途', '设置账户：确定联系人、网银角色与权限'], note: '厦门银行 App 的具体入口、所需材料及有效期，以办理时页面和经办人员提示为准。' },
        {
          id: 'materials', eyebrow: '04 / PRACTICAL TOOLKIT', title: '开户与变更实用工作台', summary: '选择办理场景，直接查看材料、预约步骤，并复制给客户的沟通文本。',
          body: ['本页把 APEX 中已经整理的开户与变更材料能力接入实习学习站，并重新设计为便于经办使用的界面。', '材料清单用于准备与沟通，具体要求仍需结合账户类型、企业结构及最新柜面口径确认。'],
          feature: 'account-toolkit',
          toolkit: {
            title: '选择本次办理场景',
            intro: '材料随账户类型和变更事项变化。先选择场景，再逐项核对客户材料与柜台内部材料。',
            sourceNote: '内容结构迁移自 APEX 材料清单能力；未连接内部系统，不保存客户信息。',
            scenarios: [
              {
                id: 'open-basic', label: '开户', title: '基本户开户', description: '企业首次建立主要结算账户时使用。',
                materials: ['单位有效证件原件', '法定代表人有效身份证件原件', '经办人有效身份证件原件', '经办人在职证明（社保、公积金或劳动合同等）', '网银、手机银行管理员及相关联系人身份证件复印件', '受益所有人身份证件复印件', '实际经营场所证明（租赁合同、产权证明或使用说明）', '公章、财务章（如有）及法定代表人印章', '公司章程（需要时提供带水印版本）'],
              },
              {
                id: 'open-general', label: '开户', title: '一般户开户', description: '企业已有基本户，因结算、融资等需要另行开户。',
                materials: ['单位有效证件原件', '法定代表人有效身份证件原件', '基本存款账户信息表或原基本户相关信息', '经办人有效身份证件原件', '经办人在职证明（需要时提供）', '网银、手机银行管理员及相关联系人身份证件复印件', '受益所有人身份证件复印件', '公章、财务章（如有）及法定代表人印章', '实际经营与账户用途佐证（需要时提供）'],
              },
              {
                id: 'change-name', label: '变更', title: '企业名称变更', description: '企业完成工商名称变更后，同步维护银行账户信息。',
                materials: ['变更后的单位有效证件原件', '法定代表人有效身份证件原件', '企业名称变更核准或登记材料', '原基本存款账户信息', '原预留印鉴卡或相关账户资料', '经办人有效身份证件原件及在职证明', '新公章、财务章及法定代表人印章', '旧印章或旧印鉴资料（按实际要求准备）'],
              },
              {
                id: 'change-legal', label: '变更', title: '法定代表人变更', description: '法定代表人发生变化后，同步更新账户、印鉴与受益所有人信息。',
                materials: ['变更后的单位有效证件原件', '新法定代表人有效身份证件原件', '原基本存款账户信息', '原预留印鉴卡或相关账户资料', '经办人有效身份证件原件及在职证明', '公章、财务章及新旧法定代表人印章', '最新公司章程或工商变更材料', '受益所有人及实际控制信息更新材料'],
              },
            ],
            appointmentTitle: '线上预约怎么做',
            appointmentPath: ['厦门银行 App', '空中柜台', '对公开户', '选择科技支行'],
            appointmentNotes: ['建议至少提前一天提交，每一家企业分别预约。', '线上通常上传营业执照及法定代表人证件，并由法定代表人实名手机号接收验证码。', '企业已有基本户时，本次开户类型一般选择“一般户”；页面要求基本存款账户信息时，填写原基本户资料。', '页面入口、预约有效期及材料要求可能调整，提交前请以最新页面和经办口径为准。'],
            contactTitle: '联系经办人和客户',
            contactSteps: ['先确认办理事项、企业名称、联系人与预计办理时间。', '将对应场景的材料清单复制给客户，请客户逐项核对。', '不确定的材料可先发送电子版给经办人预审，减少现场补件。', '办理前再次确认预约编码、原件、印章、到场人员及实名手机号。'],
            counterTitle: '交给柜台的内部材料',
            counterIntro: '客户材料确认后，经办人员还需按内部流程准备并复核以下四项材料，再交柜台办理。',
            counterMaterials: ['开户尽调申请表', '客户经理尽调走访照片', '受益所有人系统 PDF', '受益所有人登记表'],
            messageTitle: '生成给客户的材料提示',
            messageIntro: '您好，关于贵司本次办理事项，我将预约路径和材料清单整理如下，辛苦提前核对：',
            messageClosing: '材料准备过程中如有不确定，可以先将电子版发给我确认。现场办理时间、预约状态及最新材料要求，我们再一起核对。',
          },
          note: '清单适合直接使用，也适合给实习生理解每份材料在开户流程中的位置。涉及客户资料时请使用合规渠道传递。',
        },
        { id: 'changes-beneficial-owner', eyebrow: '05–06 / MAINTENANCE', title: '账户变更与受益所有人', summary: '账户开立后，企业信息发生变化也需要及时维护。', body: ['常见变更包括企业名称、法定代表人、注册地址、印鉴、联系人、手机号、网银操作员及证件有效期。', '受益所有人是最终拥有、控制企业，或最终享有企业收益的自然人。判断时不能只看营业执照上的法定代表人，还要理解股东层级与实际控制关系。'], steps: ['借款企业', '企业股东', '上层企业股东', '最终自然人'] },
        { id: 'roles', eyebrow: '07 / ACCESS ROLES', title: '联系人与网银角色', summary: '账户能否安全顺畅使用，也取决于企业内部的权限安排。', body: ['常见角色包括大额资金联系人、对账联系人、日常联系人、网银录入员、授权人员、管理员及手机银行超级管理员。', '不同角色可依企业内部安排重合，但应提前明确谁录入、谁授权、谁管理，并确保实名手机号能够接收验证码。'] },
      ],
    },
    {
      id: 'credit', number: '02', label: 'CREDIT LIFECYCLE', title: '企业授信全流程',
      summary: '从认识企业到贷后跟踪，看见一项授信如何在不同岗位之间逐步形成。',
      chapters: [
        { id: 'know-business', eyebrow: '01 / KNOW A BUSINESS', title: '先认识一家企业', summary: '授信判断从事实开始。', body: ['先回答六个问题：它是谁、谁在控制、经营什么、如何赚钱、为什么需要银行、最大的不确定性是什么。', '访前资料用于形成问题，现场走访用于确认、修正并补充判断。'], points: ['工商与股权', '行业与商业模式', '上下游与现金流', '融资用途与还款来源'] },
        { id: 'credit-flow', eyebrow: '02–07 / CREDIT FLOW', title: '贷前、贷中与贷后', summary: '一条完整流程，帮助理解每项资料最终流向哪里。', body: ['贷前阶段了解企业、核实需求并形成授信方案；贷中阶段完成审查审批、合同与放款条件落实；贷后阶段持续关注资金用途、经营、偿债与风险变化。'], steps: ['访前调查', '企业走访', '需求分析', '授信方案', '调查报告', '审查审批', '合同与放款', '贷后管理'] },
        { id: 'alert-follow-up', eyebrow: '08 / POST-LOAN MONITORING', title: '贷后重大预警客户续报', summary: '以上一期为基础，核查本期变化，再共同完成风险判断。', body: ['重大预警客户此前已经出现需要持续跟踪的风险事项。续报无需重新完成首报，也不必从头调查企业。', '上一期已确认的企业情况、授信结构、担保方式、原有风险与历史措施可以沿用；本期重点更新日期、征信、外部查询、风险进展、判断与后续措施。'], steps: ['复制上一期系统内容', '更新本期日期', '整理外部查询主体', '小海螺批量查询与截图', '整理征信查询名单', '比较本期征信变化', '共同分析企业最新情况', '更新系统报告并提交'], note: '日期可以先改为本期实际日期；融资余额、逾期金额、贷款分类和司法数据不能只改日期，需等待本期查询结果后更新。' },
        { id: 'external-query', eyebrow: 'WORKSHEET / EXTERNAL CHECK', title: '外部查询主体与结果', summary: '先把查询范围整理完整，再让工具执行重复工作。', body: ['查询主体可能包括借款企业、保证企业、实际控制人、法定代表人、自然人保证人、抵押人及其他关联主体。', '小海螺用于批量查询公开司法、执行、工商、处罚及税务风险线索，并保存截图；结果仍需人工确认主体、时间、身份、金额、进展与实际影响。'], points: ['主体名称与类型', '与客户关系', '统一社会信用代码或证件信息', '是否为保证人', '本期查询日期与新增事项'], note: '工具提高查询与归档效率，不直接代替风险判断。查询到异常先如实记录，不确定处先标注。' },
        { id: 'credit-report', eyebrow: 'WORKSHEET / CREDIT REPORT', title: '整理征信查询与变化', summary: '不必摘录整份征信，先找出与上一期相比发生了什么。', body: ['根据授信与担保关系整理企业及个人查询名单，发送相关同事协助查询。收到最新征信后，与上一期逐项比较。'], points: ['融资余额及授信机构变化', '新增贷款、逾期、欠息或垫款', '五级分类变化', '新增对外担保', '实控人或保证人负债变化', '查询次数是否异常增加'], note: '实习生先整理事实、数据与变化；最终风险判断和报告表述由导师共同讨论、复核。' },
      ],
    },
    {
      id: 'agents', number: '03', label: 'AI ARCHITECTURE', title: 'AI 能力与工作流',
      summary: '以 Skills 封装专业能力，以 Workflow 编排流程，并通过人工复核保持结果可信。',
      chapters: [
        { id: 'apex', eyebrow: '01 / APEX', title: 'APEX 能力架构', summary: '把零散材料、专业方法与复核节点组织为稳定能力。', body: ['APEX 以业务输入为起点，通过任务识别调用对应 Skill，再由 Workflow 组织多个步骤，形成可以追溯、复核和继续完善的结果。', 'Knowledge Base 提供业务知识，MCP 或工具接口连接可控能力，Evaluation 与 Human-in-the-loop 负责质量检查和最终确认。'], steps: ['业务输入', '任务识别', '调用专业 Skill', 'Workflow 编排', '形成可复核结果', '人工确认'] },
        { id: 'skills-workflow', eyebrow: '02 / SKILLS & WORKFLOW', title: 'Skills 与 Workflow', summary: '把“会做”拆成可调用能力，把“怎么做完”编排成稳定流程。', body: ['Skill 可以封装材料检查、企业画像、外部风险查询、沟通转译等专业能力；Workflow 决定何时调用、如何传递上下文、在哪里停下来等待人工复核。', '推荐采用小而清晰的 Skills，并为关键输出设置来源、校验与回退路径。'], points: ['Account Opening Skill', 'Business Profile Skill', 'Risk Check Skill', 'Communication Skill', 'Knowledge Base', 'Human-in-the-loop'] },
        { id: 'boundaries', eyebrow: '03 / GOVERNANCE', title: '工具边界与人工复核', summary: '技术负责提效，人负责确认事实、权限与影响。', body: ['适合自动化的环节包括批量整理、格式转换、差异提示与文件归档。涉及客户身份、制度适用、风险结论与审批权限的内容，始终需要人工确认。'], points: ['来源可追溯', '结果可复核', '权限最小化', '异常可回退', '敏感信息不进入公开环境'] },
        { id: 'conch', eyebrow: '04 / ENTERPRISE WECHAT BOT', title: '小海螺企微机器人', summary: '位于能力底层的轻量 Bot，用于承接重复查询与结果归档。', body: ['小海螺可接收确认过的主体名单，协助执行公开信息查询、截图归档和异常线索整理，再把结果交给人工复核。', '它是企业微信 Bot 形态的流程入口，不作为本阶段的主要教学内容。'], steps: ['接收任务', '调用查询能力', '归档结果', '提示异常', '人工确认'] },
      ],
    },
    {
      id: 'practice', number: '04', label: 'PRACTICE LAB', title: '协作实验室',
      summary: '把日常协作放回业务流程，理解它为什么存在、如何完成、交付给谁。',
      chapters: [
        { id: 'practice-cards', eyebrow: '01 / PRACTICE CARDS', title: '日常工作也有完整逻辑', summary: '录入、核对、归档不是孤立步骤。', body: ['每项协作任务都可以从六个角度理解：它处于哪段流程、为什么需要、输入是什么、如何完成、交付什么、何时需要确认。'], points: ['系统信息录入', '查询主体名单整理', '截图与文件归档', '表格及数据差异核对', '资料脱敏与简繁校对', '机器人和 Prompt 测试'] },
      ],
    },
    {
      id: 'resources', number: '05', label: 'RESOURCES', title: '资料中心',
      summary: '按账户、授信与工具分类，快速回到需要复看的讲义和模板。',
      chapters: [
        { id: 'resource-index', eyebrow: '01 / RESOURCE INDEX', title: '在线资料索引', summary: '没有有效文件时只提供在线阅读，不展示失效下载。', body: ['账户类：企业对公账户、基本户与一般户、开户流程、材料清单、受益所有人。', '授信类：企业观察、授信全流程、重大预警续报、外部查询与征信变化。', '工具类：APEX、小海螺、机器人搭建、人工复核边界。'] },
      ],
    },
  ] satisfies PortalModule[],
  footer: '科技业务部 XD.Hu｜仅供内部交流',
} as const
