export type RegulationCategory =
  | "biosecurity"
  | "animal-health"
  | "pesticides"
  | "water-quality"
  | "worker-safety"
  | "food-safety"
  | "environmental"
  | "recordkeeping"
  | "movement-permits"
  | "organic"

export interface Regulation {
  id: string
  title: string
  citation: string
  category: RegulationCategory
  description: string
  requirements: string[]
  penalty?: string
  federalOverlay?: string
}

export interface ReportableDisease {
  name: string
  species: string[]
  reportWithinHours: number
  notifyAgency: string
}

export interface PesticideInfo {
  licenseRequired: boolean
  licenseBody: string
  recordkeepingYears: number
  additionalNotes: string
}

export interface AgDepartment {
  name: string
  website: string
  phone: string
  emergencyHotline?: string
}

export interface StateCompliance {
  name: string
  abbreviation: string
  agDepartment: AgDepartment
  regulations: Regulation[]
  reportableDiseases: ReportableDisease[]
  pesticides: PesticideInfo
  biosecurityRequirements: string[]
  keyStatutes: string[]
  federalPrograms: string[]
}

export interface ChecklistItem {
  id: string
  title: string
  description: string
  category: RegulationCategory | "daily-operations"
  frequency: "daily" | "weekly" | "monthly"
  required: boolean
  applicableTo: FarmType[]
  regulatoryBasis?: string
}

export type FarmType =
  | "livestock"
  | "poultry"
  | "crop"
  | "dairy"
  | "swine"
  | "aquaculture"
  | "mixed"
  | "organic"
  | "all"
