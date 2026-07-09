export type AccountKind = 'basic' | 'general' | 'special'

export type MaterialCategory =
  | 'entity'
  | 'identity'
  | 'control'
  | 'premises'
  | 'authorization'

export interface AccountOpeningMaterial {
  id: string
  name: string
  category: MaterialCategory
  note?: string
}

export interface AccountOpeningResult {
  ready: AccountOpeningMaterial[]
  missing: AccountOpeningMaterial[]
  disclaimer: string
}
