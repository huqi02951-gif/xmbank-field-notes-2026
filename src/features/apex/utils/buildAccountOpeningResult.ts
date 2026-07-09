import {
  accountKindRequirements,
  accountOpeningDisclaimer,
  accountOpeningMaterials,
} from '../fixtures/accountOpeningMaterials'
import type {
  AccountKind,
  AccountOpeningMaterial,
  AccountOpeningResult,
} from '../types/accountOpening'

export function buildAccountOpeningResult(
  kind: AccountKind,
  selectedIds: readonly string[],
): AccountOpeningResult {
  const selectedIdSet = new Set(selectedIds)
  const requiredIdSet = new Set(accountKindRequirements[kind])

  const requiredMaterials = accountOpeningMaterials.filter((material) =>
    requiredIdSet.has(material.id),
  )

  const ready: AccountOpeningMaterial[] = []
  const missing: AccountOpeningMaterial[] = []

  requiredMaterials.forEach((material) => {
    if (selectedIdSet.has(material.id)) {
      ready.push(material)
      return
    }

    missing.push(material)
  })

  return {
    ready,
    missing,
    disclaimer: accountOpeningDisclaimer,
  }
}
