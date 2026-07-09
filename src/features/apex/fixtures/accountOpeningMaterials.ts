import type { AccountKind, AccountOpeningMaterial } from '../types/accountOpening'

export const accountOpeningDisclaimer =
  '示例仅用于理解材料结构，实际办理前请以当地网点最新要求为准。'

export const accountOpeningMaterials = Object.freeze([
  {
    id: 'entity-qualification',
    name: '主体资格材料',
    category: 'entity',
    note: '帮助确认办理对象的基本资格。',
  },
  {
    id: 'representative-identity',
    name: '代表人或经办人身份材料',
    category: 'identity',
    note: '帮助确认谁代表主体办理。',
  },
  {
    id: 'control-relationship',
    name: '控制关系说明',
    category: 'control',
    note: '帮助理解谁拥有、控制或影响主体。',
  },
  {
    id: 'operating-premises',
    name: '经营场所或经营背景材料',
    category: 'premises',
    note: '帮助理解经营活动是否有合理场景。',
  },
  {
    id: 'seal-authorization',
    name: '印章或授权材料',
    category: 'authorization',
    note: '帮助确认办理行为和用印授权。',
  },
] as const satisfies readonly AccountOpeningMaterial[])

export const accountKindLabels: Record<AccountKind, string> = {
  basic: '基本户示例',
  general: '一般户示例',
  special: '专用户示例',
}

export const accountKindRequirements: Record<AccountKind, readonly string[]> = {
  basic: [
    'entity-qualification',
    'representative-identity',
    'control-relationship',
    'operating-premises',
    'seal-authorization',
  ],
  general: ['entity-qualification', 'representative-identity', 'seal-authorization'],
  special: [
    'entity-qualification',
    'representative-identity',
    'control-relationship',
    'seal-authorization',
  ],
}
