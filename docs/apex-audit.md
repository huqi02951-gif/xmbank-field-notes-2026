# APEX 只读审计与迁移建议

审计时间：2026-07-08（Asia/Shanghai）  
审计提交：`1aa4375c7bf88518e309fcbe636158cd67bf31f8`

## 结论

最可行的真实迁移功能是“企业开户材料助手”的纯前端、无持久化版本。APEX 已有开户类型、材料项、格式要求和文本整理逻辑，运行时不需要后端、模型、密钥或内部接口；但原始数据同时包含内部操作提醒、费用、时效性规则和个人信息输入，不能整文件或整组件公开复制。

建议只在业务/合规复核后迁移以下最小子集：

1. `ChecklistItem`、`BusinessSubCategory` 的最小公开类型；
2. 经复核的基本户、一般户、专户材料项；
3. “选择开户类型 -> 输出材料清单 -> 复制当前语言”的纯函数和轻量组件；
4. 不收集企业名称、联系人、电话、邮箱、微信、地址，不保存历史，不导出 Word/Excel，刷新即清空。

若业务负责人不能确认开户材料可公开、仍然有效，必须降级为脱敏固定示例，并明确标注“示例，不作为实际办理依据；请以网点最新要求为准”。

## 审计范围与方法

- APEX 仓库仅做只读检查；未安装依赖，未运行格式化、构建、生成器或测试。
- 检查了根前端、相关业务组件、纯函数、内容数据、持久化层、后端依赖与环境配置。
- 原路径均为 APEX 仓库相对路径，避免把本机绝对路径写入拟公开仓库。
- 本阶段只输出审计和拟迁移映射，没有复制 APEX 代码或内容。

## 技术栈与架构

| 层 | 观察 | 迁移含义 |
|---|---|---|
| 前端 | Vite 6、React 19、TypeScript 5.8、Tailwind CSS 4；根 `package.json` 还含 React Router、Framer Motion、Dexie、docx、xlsx、Supabase、Google GenAI 等依赖 | 新站可选 Vite + React + TypeScript，但不要照搬依赖集合 |
| 业务数据 | `data/checklistData.ts` 以 TypeScript 数据和模板函数承载柜面/授信材料 | 开户材料子集可离线运行，但内容必须逐项公开复核 |
| 材料工具 | `components/MaterialChecklistCenter.tsx` 在浏览器内筛选、格式化、复制、导出，并可保存历史 | 只迁移选择、格式化和复制；排除导出、历史、客户字段 |
| 专业语言转译 | `components/tools/SensitiveCommAssistant.tsx` 使用本地静态模板和字符串插值，`setTimeout` 只是模拟生成 | 可提取纯函数机制；原模板包含监管、利率、审批及内部表述，不得原样公开 |
| 材料缺失检核 | `components/tools/checklist-generator/logic.ts` 是复杂授信准入/测算规则，并依赖 `docx` | 不适合公开静态站；规则敏感、强时效、与开户场景不相同 |
| 企业画像 | `data/checklistData.ts` 的 `COMMON_REQUIRED_INFO` 是信息采集结构，不是企业画像生成算法 | 只能借用“企业是谁、谁控制、做什么、怎么赚钱”等教育性框架；不要提供真实信息录入或评价 |
| 全局前端配置 | `vite.config.ts` 会把 Gemini 环境变量定义到浏览器；应用另有 Supabase/API 客户端 | 绝对不能复制配置、环境文件、服务层或密钥接线 |
| 后端 | NestJS 10、Prisma/PostgreSQL、Supabase、JWT、邮件与 Socket.IO；后端包声明 `UNLICENSED` | 新站不需要也不得迁移后端、鉴权、数据库或实时接口 |

## 能力逐项判定

### 1. 企业开户材料

判定：`有条件可迁移，优先级最高`。

证据：

- `data/checklistData.ts:1-35` 定义材料、补充信息和业务类别类型。
- `data/checklistData.ts:120-188` 提供基本户、一般户、专户开户材料和对客模板。
- `components/MaterialChecklistCenter.tsx:109-143` 在内存中生成话术、材料清单和补充信息文本。
- `components/MaterialChecklistCenter.tsx:147-148` 直接使用浏览器剪贴板。

依赖判断：核心筛选与文本输出不依赖后端、模型、密钥或内部接口。完整组件依赖 Router、Framer Motion、图标、Toast、docx、xlsx、file-saver、Dexie 历史记录等，不能整组件复制。

公开风险：

- `data/checklistData.ts:139-145` 含内部操作提醒、费用、系统核实、视频和实地走访要求，存在内部信息和时效风险。
- 原清单使用“必须”等确定性表达，可能随监管、账户类型、客户情况或网点要求变化。
- `components/MaterialChecklistCenter.tsx:614-683` 收集企业名称、客户经理、电话、微信、邮箱和地址。
- `components/MaterialChecklistCenter.tsx:587-594` 将生成结果保存到浏览器历史；不符合新站“不保存信息、刷新清空”的边界。

公开方式：仅迁移经复核的材料项与纯文本格式化；内部提醒独立排除；页面显著标注示例和复核日期。

### 2. 受益所有人

判定：`只适合脱敏固定示例，不适合直接迁移操作指引`。

证据：

- `data/checklistData.ts:132-142` 在开户材料中出现受益人身份证和章程识别要求。
- `components/tools/SensitiveCommAssistant.tsx:174-180` 提供受益所有人备案模板。
- `components/tools/SensitiveCommAssistant.tsx:361-383` 展示规则日期和本地监管系统操作路径。

依赖判断：技术上完全在前端运行，无模型、后端或密钥依赖。

公开风险：包含法律实施日期、地方系统路径、登录方式和确定性操作结论，可能过期或不适用于所有主体。公开前需要法律/合规人员按当前《受益所有人信息管理办法》和官方办理入口复核。新站首版建议只解释“银行为什么关注实际控制关系”，不提供办理步骤、阈值判断或身份证材料要求。

### 3. 企业画像

判定：`仅迁移教育性框架，不迁移真实资料表单`。

证据：`data/checklistData.ts:57-118` 覆盖企业简介、实控人、产品、收付款、上下游、融资、资产和联系人等信息维度。

依赖判断：静态数据，无后端、模型或密钥依赖；但 APEX 没有把碎片自动汇总成“一页企业画像”的独立纯函数。

公开风险：原字段会诱导填写客户、供应商、销售客户、财务、融资、利率、担保和联系方式等敏感信息。新站不得提供这些输入框、上传、保存或评价功能。应按已批准产品文案，以六个教育性问题展示，而不是声称 APEX 已自动生成企业画像。

### 4. 材料缺失项提示

判定：`开户助手可做简单本地勾选；APEX 授信检核引擎禁止迁移`。

证据：

- `components/tools/checklist-generator/logic.ts:997-1100` 的 `validateGeneratorData` 会根据大量授信字段和产品规则生成缺失/错误提示。
- 同文件 `GeneratorFormData` 包含企业名称、法定代表人、实际控制人、评级、征信/风险、税务、资产负债、授信金额等敏感字段。

依赖判断：验证计算主要是纯函数，但同文件还依赖 `docx`，且业务规则与内部产品准入、额度、风险判断紧耦合。

公开风险：暴露内部准入、风控、产品与审批逻辑；规则强时效；输入数据高度敏感。禁止复制该文件、字段表和规则。开户助手如需“还差哪些材料”，只可在当前页面内比较“公开清单项”和用户临时勾选状态，不收集材料内容、不持久化。

### 5. 专业语言转译

判定：`机制可迁移，原内容需大幅筛选；首版更适合作为固定示例`。

证据：

- `components/tools/SensitiveCommAssistant.tsx:98-247` 使用本地 `switch`、语气和渠道参数生成直接、正式、柔和、电话四种文本。
- `components/tools/SensitiveCommAssistant.tsx:163-172` 的材料补充场景是最接近目标的纯字符串转换。
- `components/tools/SensitiveCommAssistant.tsx:193-223` 含具体日期、利率与监管判断，不能公开复用。
- `components/tools/SensitiveCommAssistant.tsx:680-693` 会导出并保存完整生成结果及参数。

依赖判断：生成本身无模型、后端、密钥或内部接口；`setTimeout` 仅模拟等待。完整页面依赖 React、Router、Framer Motion、docx、Dexie 历史等。

公开方式：如需要第三个 APEX 场景，仅保留“把内部术语改写为清楚、礼貌、可核对表达”的固定脱敏示例。不要称其为实时 AI，不接受真实客户资料，不保留收费、利率、授信结论、监管路径或办理承诺。

## 精确源文件到拟迁移文件映射

以下均为“待批准映射”，不是已复制清单。

| APEX 源（仓库相对路径） | 可用片段 | 新站拟迁移文件 | 处理要求 | 公开状态 |
|---|---|---|---|---|
| `data/checklistData.ts` | `ChecklistItem` 与开户类别最小类型，约 1-35 行 | `src/features/apex/types/accountOpening.ts` | 重命名并缩小类型；移除 `requiredInfo`、客户经理参数和内部字段 | 待代码授权 |
| `data/checklistData.ts` | 基本户、一般户、专户的公开材料项，约 120-188 行 | `src/features/apex/fixtures/accountOpeningMaterials.ts` | 逐项业务/合规复核；删除 `managerReminders`、费用、系统、视频、走访等内容；加 `reviewedAt` 和示例声明 | 待内容批准 |
| `components/MaterialChecklistCenter.tsx` | 清单文本整理，约 109-123 行 | `src/features/apex/utils/formatAccountOpeningChecklist.ts` | 提取为无 DOM、无状态纯函数；输入只允许公开 fixture | 可技术迁移 |
| `components/MaterialChecklistCenter.tsx` | 类别选择与清单展示交互的行为 | `src/features/apex/components/AccountOpeningMaterialAssistant.tsx` | 重新按新站设计实现；不复制样式/路由/导出/历史；不收集个人或企业信息 | 可技术迁移 |
| `data/checklistData.ts` | 企业资料维度，约 57-118 行 | `src/features/apex/fixtures/enterpriseProfileExample.ts` | 只保留已批准的六问教育框架；使用虚构、无数字固定示例；禁止输入和保存 | 只限脱敏示例 |
| `components/tools/SensitiveCommAssistant.tsx` | 语气/渠道分支与材料补充文本机制，约 98-172 行 | `src/features/apex/utils/buildCommunicationExample.ts` | 提取纯函数；仅固定示例输入；删客户称呼、电话、期限承诺、审批与营销引导 | 有条件可迁移 |
| `components/tools/SensitiveCommAssistant.tsx` | 受益所有人模板，约 174-180、361-383 行 | `src/features/apex/fixtures/beneficialOwnerExample.ts` | 不复制操作路径；仅在法律/合规复核后保留基础说明和来源日期 | 默认不迁移 |
| `components/tools/checklist-generator/logic.ts` | `validateGeneratorData` 及授信字段/规则 | 无 | 禁止迁移；不能用内部授信校验冒充公开材料助手 | 禁止公开 |
| `components/shared/ActionBar.tsx`、`lib/localDB.ts` | 历史记录、导出、IndexedDB | 无 | 新站明确不保存、不导出，不引入 Dexie | 禁止迁移 |
| `lib/CustomerContext.tsx` | 客户名称、联系人、电话等全局上下文 | 无 | 新站不得持久化真实客户资料 | 禁止迁移 |
| `vite.config.ts`、`.env.production`、`src/services/**`、`backend/**` | 密钥/API/Supabase/后端接线 | 无 | 不复制、不引用、不写入 provenance 内容 | 禁止迁移 |

## 推荐的新站能力边界

### AccountOpeningMaterialAssistant

输入：仅一个开户类型枚举（基本户 / 一般户 / 专户）。  
输出：经过复核的示例材料名称、形式说明、示例声明、复核日期。  
动作：复制当前显示版本、复制简体、复制繁体。  
状态：仅 React 内存；刷新清空。  
网络：零请求。  
存储：零业务数据存储；语言偏好可单独存 `localStorage`。  
禁止：企业名、姓名、电话、证件、统一社会信用代码、上传、历史、Word/Excel、内部提醒、审批建议。

### 可观测验收标准

1. 构建产物中不存在 APEX 本地路径、`.env` 值、Supabase/API/Gemini 接线。
2. 工具运行时的 Network 面板无业务请求。
3. 业务数据仅来自 `accountOpeningMaterials.ts`，且每条有来源提交、复核状态和复核日期。
4. 页面刷新后没有企业或个人业务数据残留；IndexedDB 不创建 APEX 业务库。
5. 仅复制当前语言展示文本；简体源不被繁体回写。
6. 敏感信息扫描、过期规则扫描和本地绝对路径扫描通过。
7. 内容负责人确认材料清单允许公开，法律/合规负责人确认受益所有人说明（若上线）。

## 公开发布阻塞项与最短路径

| 风险 | 等级 | 处置 |
|---|---|---|
| 开户清单及内部提醒的公开授权、现行有效性未确认 | 阻塞真实工具发布 | 由业务负责人逐项签字确认；未确认则用固定脱敏示例 |
| 前端源代码未见 LICENSE；后端明确 `UNLICENSED` | 阻塞未经授权的逐字复制 | 仓库所有者书面确认有权以新公开仓库许可证再发布；后端永不复制 |
| 受益所有人操作路径和法规日期可能变化 | 阻塞操作指引发布 | 法律/合规按当前官方来源复核并记录复核日期；否则只做概念解释 |
| 原组件收集并持久化客户信息 | 高 | 新实现删除全部客户字段、历史与 IndexedDB |
| 原项目存在浏览器环境变量、API、Supabase 和后端能力 | 高 | 新站只复制批准的静态数据/纯函数；禁止复制配置、服务层、环境文件 |
| 授信检核含内部风控与敏感财务字段 | 高 | 不迁移、不节选、不截图、不在公开文档描述具体阈值 |

## 来源与后续同步规则

- 所有迁移内容以 APEX 提交 `1aa4375c7bf88518e309fcbe636158cd67bf31f8` 为基线。
- 实际复制时必须生成 `src/features/apex/provenance/apex-source-map.json`，记录源仓库相对路径、Git 提交、源 blob、目标文件、修改说明、脱敏状态、公开批准人/日期。
- 后续同步只允许“APEX -> 新站”的人工审阅复制；不得用软链接、Submodule、绝对路径、自动反向同步或运行时读取。
- 每次同步重新执行业务有效性、敏感信息、许可证/授权和 APEX 完整性检查。

