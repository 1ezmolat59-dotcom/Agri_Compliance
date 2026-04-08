import type { StateCompliance } from "./types"

// Common reportable diseases that apply across nearly all states
const COMMON_REPORTABLE_DISEASES = [
  { name: "Foot-and-Mouth Disease (FMD)", species: ["cattle", "swine", "sheep", "goats"], reportWithinHours: 24, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Highly Pathogenic Avian Influenza (HPAI)", species: ["poultry", "waterfowl"], reportWithinHours: 24, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "African Swine Fever (ASF)", species: ["swine"], reportWithinHours: 24, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Classical Swine Fever (CSF)", species: ["swine"], reportWithinHours: 24, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Newcastle Disease (Virulent)", species: ["poultry"], reportWithinHours: 24, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Bovine Spongiform Encephalopathy (BSE)", species: ["cattle"], reportWithinHours: 24, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Anthrax", species: ["cattle", "sheep", "horses"], reportWithinHours: 24, notifyAgency: "State Veterinarian" },
  { name: "Brucellosis", species: ["cattle", "swine", "bison"], reportWithinHours: 48, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Bovine Tuberculosis (bTB)", species: ["cattle", "bison"], reportWithinHours: 48, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Scrapie", species: ["sheep", "goats"], reportWithinHours: 48, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Vesicular Stomatitis (VS)", species: ["cattle", "horses", "swine"], reportWithinHours: 24, notifyAgency: "State Veterinarian + USDA APHIS" },
  { name: "Equine Infectious Anemia (EIA)", species: ["horses"], reportWithinHours: 48, notifyAgency: "State Veterinarian" },
  { name: "Rabies", species: ["all mammals"], reportWithinHours: 24, notifyAgency: "State Veterinarian + State Health Dept" },
]

const FEDERAL_PROGRAMS = [
  "USDA APHIS Animal Disease Traceability (ADT)",
  "USDA Farm Service Agency (FSA) Programs",
  "EPA Clean Water Act Compliance",
  "EPA FIFRA Pesticide Regulations",
  "FDA Food Safety Modernization Act (FSMA)",
  "OSHA Agricultural Worker Safety Standards",
  "USDA Natural Resources Conservation Service (NRCS)",
]

export const US_STATES: StateCompliance[] = [
  // ── ALABAMA ───────────────────────────────────────────────────────
  {
    name: "Alabama",
    abbreviation: "AL",
    agDepartment: {
      name: "Alabama Department of Agriculture and Industries",
      website: "https://www.agi.alabama.gov",
      phone: "(334) 240-7100",
      emergencyHotline: "(334) 240-7100",
    },
    regulations: [
      {
        id: "al-bio-1",
        title: "Alabama Animal Diseases Law",
        citation: "Ala. Code § 2-15-150 et seq.",
        category: "animal-health",
        description: "Mandates reporting of specified infectious or contagious diseases in livestock and poultry within 24 hours of discovery.",
        requirements: ["Report notifiable diseases to State Veterinarian within 24 hours", "Quarantine affected premises", "Cooperate with state veterinary inspectors and USDA APHIS"],
        penalty: "Civil penalty up to $500 per violation; criminal misdemeanor possible",
      },
      {
        id: "al-pest-1",
        title: "Alabama Pesticide Act",
        citation: "Ala. Code § 2-27-1 et seq.",
        category: "pesticides",
        description: "Requires licensure of all commercial pesticide applicators and registration of all pesticide products sold in Alabama.",
        requirements: ["Certified applicator license required for restricted-use pesticides", "Maintain application records for 2 years", "Report pesticide incidents within 24 hours"],
        penalty: "Fine up to $5,000 per violation; license revocation",
      },
      {
        id: "al-water-1",
        title: "Alabama CAFO Permit Program",
        citation: "ADEM Admin. Code r. 335-6-7",
        category: "water-quality",
        description: "Large animal feeding operations must obtain NPDES permit from ADEM and comply with nutrient management planning requirements.",
        requirements: ["Obtain NPDES permit for operations above CAFO threshold", "Implement certified nutrient management plan", "Maintain 100-foot setback from waterways"],
        federalOverlay: "EPA Clean Water Act CAFO Rule (40 CFR Part 122)",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Alabama Dept. of Agriculture and Industries – Pesticide Management Section",
      recordkeepingYears: 2,
      additionalNotes: "Private applicators using restricted-use pesticides must complete certification. Commercial applicators require additional licensing categories.",
    },
    biosecurityRequirements: ["Maintain signed visitor log with previous-farm contact history", "Disinfect all vehicles and equipment entering premises", "Source documentation required for all animal purchases", "USDA premises registration (PIN) strongly recommended"],
    keyStatutes: ["Ala. Code § 2-15-1 (Animal Industry)", "Ala. Code § 2-27-1 (Pesticides)", "ADEM Admin. Code r. 335-6-7 (Water Quality)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── ALASKA ────────────────────────────────────────────────────────
  {
    name: "Alaska",
    abbreviation: "AK",
    agDepartment: {
      name: "Alaska Division of Agriculture",
      website: "https://agriculture.alaska.gov",
      phone: "(907) 745-7200",
    },
    regulations: [
      {
        id: "ak-bio-1",
        title: "Alaska Livestock Disease Control",
        citation: "AS 03.05.010 et seq.",
        category: "animal-health",
        description: "Requires reporting of communicable animal diseases. State veterinarian has authority to quarantine infected premises.",
        requirements: ["Report communicable diseases within 24 hours", "Comply with quarantine orders", "Obtain import permits for livestock entering Alaska"],
        penalty: "Civil penalty; criminal misdemeanor for willful violations",
      },
      {
        id: "ak-pest-1",
        title: "Alaska Pesticide Control",
        citation: "AS 46.03.320 et seq.",
        category: "pesticides",
        description: "Requires registration of pesticide products and certification of restricted-use pesticide applicators.",
        requirements: ["Applicator certification for restricted-use pesticides", "Product registration with DEC", "Maintain records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Alaska Dept. of Environmental Conservation – Division of Environmental Health",
      recordkeepingYears: 2,
      additionalNotes: "Alaska's unique climate creates specific pest pressures; consult UAF Cooperative Extension for approved products.",
    },
    biosecurityRequirements: ["Obtain livestock import permit before moving animals into Alaska", "Comply with entry health certificate requirements", "Maintain premises registration"],
    keyStatutes: ["AS 03.05 (Agricultural Code)", "AS 46.03 (Environmental Conservation)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── ARIZONA ───────────────────────────────────────────────────────
  {
    name: "Arizona",
    abbreviation: "AZ",
    agDepartment: {
      name: "Arizona Department of Agriculture",
      website: "https://agriculture.az.gov",
      phone: "(602) 542-4373",
      emergencyHotline: "(602) 542-0900",
    },
    regulations: [
      {
        id: "az-bio-1",
        title: "Arizona Livestock Code – Disease Reporting",
        citation: "A.R.S. § 3-1201 et seq.",
        category: "animal-health",
        description: "Mandates immediate reporting of suspected foreign animal diseases and listed reportable diseases to the State Veterinarian.",
        requirements: ["Immediate notification for FAD-suspect animals", "Maintain animal movement records for 5 years", "Brand registration for cattle and horses"],
        penalty: "Class 2 misdemeanor; civil penalty up to $1,000",
      },
      {
        id: "az-pest-1",
        title: "Arizona Pesticide Control Act",
        citation: "A.R.S. § 3-361 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration, applicator certification, and use restrictions in Arizona.",
        requirements: ["Commercial applicator license required", "Restricted-use records for 2 years", "Report pesticide incidents within 24 hours to AZDA"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Arizona Dept. of Agriculture – Environmental Services Division",
      recordkeepingYears: 2,
      additionalNotes: "Arizona has specific regulations for fumigation and soil injection due to groundwater protection concerns.",
    },
    biosecurityRequirements: ["Obtain movement permit for cattle, horses, swine entering Arizona", "Negative EIA test required for horses within 12 months", "Brand inspection required for cattle movement"],
    keyStatutes: ["A.R.S. § 3-1201 (Livestock)", "A.R.S. § 3-361 (Pesticides)", "A.R.S. § 49-201 (Environmental Quality)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── ARKANSAS ──────────────────────────────────────────────────────
  {
    name: "Arkansas",
    abbreviation: "AR",
    agDepartment: {
      name: "Arkansas Department of Agriculture",
      website: "https://www.agriculture.arkansas.gov",
      phone: "(501) 823-1150",
    },
    regulations: [
      {
        id: "ar-bio-1",
        title: "Arkansas Livestock and Poultry Disease Control",
        citation: "Ark. Code Ann. § 2-33-101 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed livestock and poultry diseases. Poultry is a major industry; specific HPAI protocols are maintained.",
        requirements: ["Report HPAI suspicion immediately to State Vet and USDA APHIS", "Maintain flock records for poultry operations", "Comply with movement restrictions during disease events"],
        penalty: "Civil penalty; misdemeanor for willful violations",
      },
      {
        id: "ar-water-1",
        title: "Arkansas Nutrient Management Law",
        citation: "Ark. Code Ann. § 15-20-1201 et seq.",
        category: "water-quality",
        description: "Large animal operations must develop and implement certified nutrient management plans.",
        requirements: ["Certified NMP for operations with 300+ animal units", "Application setbacks from waterways and residences", "Soil testing every 3 years"],
        federalOverlay: "EPA CAFO Rule; Clean Water Act NPDES",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Arkansas State Plant Board",
      recordkeepingYears: 2,
      additionalNotes: "Rice and cotton farmers have specific additional restrictions under state law.",
    },
    biosecurityRequirements: ["Poultry premises must maintain active biosecurity plans", "All poultry movement requires health documentation", "Visitor logs required for commercial poultry operations"],
    keyStatutes: ["Ark. Code Ann. § 2-33-101 (Animal Health)", "Ark. Code Ann. § 2-16-101 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── CALIFORNIA ────────────────────────────────────────────────────
  {
    name: "California",
    abbreviation: "CA",
    agDepartment: {
      name: "California Department of Food and Agriculture (CDFA)",
      website: "https://www.cdfa.ca.gov",
      phone: "(916) 654-0433",
      emergencyHotline: "(916) 654-1447",
    },
    regulations: [
      {
        id: "ca-bio-1",
        title: "California Animal Disease Prevention and Response",
        citation: "Food & Agr. Code § 9501 et seq.",
        category: "animal-health",
        description: "Comprehensive disease reporting system with mandatory notification to CDFA State Veterinarian for listed diseases.",
        requirements: ["Immediate notification for foreign animal disease suspects", "Mandatory premises registration for livestock operations", "Comply with CDFA quarantine and depopulation orders"],
        penalty: "Civil penalty $1,000–$10,000; criminal prosecution possible",
      },
      {
        id: "ca-pest-1",
        title: "California Pesticide Law – Restricted Material Permit",
        citation: "Food & Agr. Code § 11401 et seq.; 3 CCR",
        category: "pesticides",
        description: "California has some of the strictest pesticide regulations in the U.S. Many pesticides require county permits in addition to state licensing.",
        requirements: ["County-issued permit required for restricted materials", "QAC (Qualified Applicator Certificate) for commercial use", "Pesticide use reports filed monthly with county agricultural commissioner", "Pre-notification requirements for certain applications near schools"],
        penalty: "Civil penalty up to $5,000 per violation; license revocation",
      },
      {
        id: "ca-env-1",
        title: "California Irrigated Lands Regulatory Program",
        citation: "Wat. Code § 13000 et seq.; Central Valley NPDES",
        category: "water-quality",
        description: "Irrigated agricultural lands must comply with Regional Water Quality Control Board requirements for runoff quality.",
        requirements: ["Join a Third Party Group or obtain individual permit", "Implement management practices to reduce nitrate, pesticide, and sediment in runoff", "Submit annual reports to Regional Water Board"],
        federalOverlay: "Clean Water Act; EPA NPDES Program",
      },
      {
        id: "ca-env-2",
        title: "California AB 2088 – Sustainable Groundwater Management",
        citation: "Wat. Code § 10720 et seq.",
        category: "water-quality",
        description: "Farmers in critically overdrafted groundwater basins must participate in Groundwater Sustainability Agency plans.",
        requirements: ["Register water extractions in critically overdrafted basins", "Comply with Groundwater Sustainability Agency (GSA) management plans", "Report water use data as required by local GSA"],
      },
      {
        id: "ca-labor-1",
        title: "California Agricultural Worker Safety (Cal/OSHA)",
        citation: "8 CCR § 3430 et seq. (Heat Illness Prevention)",
        category: "worker-safety",
        description: "California's heat illness prevention standard for outdoor workers is among the most stringent in the nation.",
        requirements: ["Provide shade for workers when temperature exceeds 80°F", "Provide fresh water (1 quart/hour) at no cost", "Mandatory rest periods in high-heat conditions (≥95°F)", "Maintain written Heat Illness Prevention Plan"],
        penalty: "Cal/OSHA citations up to $25,000 per violation",
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Pierce's Disease (grapevines)", species: ["grapevines"], reportWithinHours: 72, notifyAgency: "CDFA Plant Health and Pest Prevention" },
      { name: "Citrus Greening (HLB)", species: ["citrus"], reportWithinHours: 72, notifyAgency: "CDFA Plant Health" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "California Dept. of Pesticide Regulation (CDPR) + County Agricultural Commissioner",
      recordkeepingYears: 3,
      additionalNotes: "California requires monthly Pesticide Use Reports (PURs) filed with the county ag commissioner. Many pesticides prohibited in CA that are federally registered.",
    },
    biosecurityRequirements: ["CDFA premises registration mandatory for livestock operations", "All animal imports require interstate Certificate of Veterinary Inspection (CVI)", "Poultry operations must maintain active NPIP enrollment", "Comply with California Border Protection Station inspection requirements"],
    keyStatutes: ["Cal. Food & Agr. Code § 9501 (Animal Health)", "Cal. Food & Agr. Code § 11401 (Pesticides)", "Cal. Wat. Code § 13000 (Water Quality)", "8 CCR § 3430 (Worker Safety)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── COLORADO ──────────────────────────────────────────────────────
  {
    name: "Colorado",
    abbreviation: "CO",
    agDepartment: {
      name: "Colorado Department of Agriculture",
      website: "https://ag.colorado.gov",
      phone: "(303) 869-9000",
    },
    regulations: [
      {
        id: "co-bio-1",
        title: "Colorado Livestock Disease Control",
        citation: "C.R.S. § 35-50-101 et seq.",
        category: "animal-health",
        description: "Mandates reporting of listed animal diseases. Colorado has specific CWD (Chronic Wasting Disease) surveillance requirements for cervid operations.",
        requirements: ["Report listed diseases within 24 hours", "CWD testing required for farmed cervids", "Comply with movement restrictions from CDA"],
        penalty: "Civil penalty up to $1,000 per day; criminal charges possible",
      },
      {
        id: "co-pest-1",
        title: "Colorado Pesticide Applicators' Act",
        citation: "C.R.S. § 35-10-101 et seq.",
        category: "pesticides",
        description: "Requires licensing of commercial and public pesticide applicators and certification of private applicators using restricted-use pesticides.",
        requirements: ["Licensed commercial applicators for commercial pest management", "Private applicator certification for RUPs", "Maintain records for 2 years"],
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Chronic Wasting Disease (CWD)", species: ["deer", "elk", "moose", "caribou"], reportWithinHours: 48, notifyAgency: "Colorado Parks & Wildlife + CDA" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Colorado Dept. of Agriculture – Division of Plant Industry",
      recordkeepingYears: 2,
      additionalNotes: "Colorado has specific noxious weed management requirements that intersect with pesticide use regulations.",
    },
    biosecurityRequirements: ["Farmed cervid facilities must be licensed and fenced per CDA standards", "CWD testing protocol for all mortalities in cervid operations", "Brand inspection required for cattle movement"],
    keyStatutes: ["C.R.S. § 35-50-101 (Animal Health)", "C.R.S. § 35-10-101 (Pesticides)", "C.R.S. § 25-8-501 (Water Quality)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── CONNECTICUT ───────────────────────────────────────────────────
  {
    name: "Connecticut",
    abbreviation: "CT",
    agDepartment: {
      name: "Connecticut Department of Agriculture",
      website: "https://portal.ct.gov/DOAG",
      phone: "(860) 713-2500",
    },
    regulations: [
      {
        id: "ct-bio-1",
        title: "Connecticut Animal Disease Reporting",
        citation: "C.G.S. § 22-327 et seq.",
        category: "animal-health",
        description: "Veterinarians and farm operators must report listed infectious diseases to the State Veterinarian.",
        requirements: ["Report listed diseases within 24 hours", "Quarantine affected animals as directed", "Cooperate with state and federal investigation"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "ct-pest-1",
        title: "Connecticut Pesticide Control Act",
        citation: "C.G.S. § 22a-46 et seq.",
        category: "pesticides",
        description: "Requires certification and licensing of pesticide applicators and registration of all pesticide products.",
        requirements: ["Certified applicator for all commercial pesticide use", "Private applicator certification for RUPs", "Records maintained 3 years"],
        penalty: "Civil penalty up to $25,000 per violation",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Connecticut Dept. of Energy and Environmental Protection (DEEP)",
      recordkeepingYears: 3,
      additionalNotes: "Connecticut has buffer zone requirements near water bodies and schools. Notify neighbors before certain applications.",
    },
    biosecurityRequirements: ["Interstate health certificate required for all livestock imports", "Poultry NPIP certification encouraged", "Maintain visitor logs for commercial operations"],
    keyStatutes: ["C.G.S. § 22-327 (Animal Health)", "C.G.S. § 22a-46 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── DELAWARE ──────────────────────────────────────────────────────
  {
    name: "Delaware",
    abbreviation: "DE",
    agDepartment: {
      name: "Delaware Department of Agriculture",
      website: "https://dda.delaware.gov",
      phone: "(302) 698-4500",
    },
    regulations: [
      {
        id: "de-bio-1",
        title: "Delaware Animal Disease Reporting",
        citation: "3 Del. C. § 7101 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed animal diseases. Delaware has significant poultry industry with specific HPAI protocols.",
        requirements: ["Immediate reporting of suspected HPAI and FADs", "Poultry flock health plans required for large operations", "Comply with DDA quarantine orders"],
        penalty: "Civil penalty up to $1,000 per day",
      },
      {
        id: "de-pest-1",
        title: "Delaware Pesticide Law",
        citation: "3 Del. C. § 1201 et seq.",
        category: "pesticides",
        description: "Regulates pesticide registration, applicator licensing, and use in Delaware.",
        requirements: ["Commercial applicator license required", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Delaware Dept. of Agriculture – Pesticides Section",
      recordkeepingYears: 2,
      additionalNotes: "Chesapeake Bay watershed location creates additional pesticide application restrictions near waterways.",
    },
    biosecurityRequirements: ["NPIP participation required for commercial poultry", "Biosecurity plans required for poultry operations", "Enhanced poultry movement documentation"],
    keyStatutes: ["3 Del. C. § 7101 (Animal Health)", "3 Del. C. § 1201 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── FLORIDA ───────────────────────────────────────────────────────
  {
    name: "Florida",
    abbreviation: "FL",
    agDepartment: {
      name: "Florida Department of Agriculture and Consumer Services (FDACS)",
      website: "https://www.fdacs.gov",
      phone: "(850) 617-7600",
      emergencyHotline: "(850) 617-7900",
    },
    regulations: [
      {
        id: "fl-bio-1",
        title: "Florida Animal Disease Control Law",
        citation: "Fla. Stat. § 585.001 et seq.",
        category: "animal-health",
        description: "Comprehensive livestock and poultry disease control law requiring prompt reporting of listed diseases to the State Veterinarian.",
        requirements: ["Report listed diseases within 24 hours", "Livestock must be identified per Florida's system", "Comply with movement certificates for cattle leaving county"],
        penalty: "Civil penalty up to $5,000; criminal penalties for willful violations",
      },
      {
        id: "fl-pest-1",
        title: "Florida Pesticide Law",
        citation: "Fla. Stat. § 487.011 et seq.",
        category: "pesticides",
        description: "Regulates all pesticide activity in Florida including registration, applicator licensing, and use requirements.",
        requirements: ["Certified pest control operator license for commercial applications", "Private applicator certification for RUPs", "Maintain records for 2 years", "Special restrictions for urban interface areas"],
        penalty: "Civil penalty up to $5,000; criminal misdemeanor",
      },
      {
        id: "fl-env-1",
        title: "Florida Best Management Practices (BMP) Program",
        citation: "Fla. Stat. § 403.067",
        category: "water-quality",
        description: "Agricultural operations in water quality priority areas must implement FDACS-approved BMPs to reduce nutrient loads to surface water.",
        requirements: ["Enroll in BMP program if in designated basin", "Implement applicable BMPs within 2 years of enrollment", "Maintain BMP implementation records"],
        federalOverlay: "Clean Water Act; EPA TMDL Program",
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Citrus Canker", species: ["citrus trees"], reportWithinHours: 48, notifyAgency: "FDACS – Division of Plant Industry" },
      { name: "Huanglongbing (Citrus Greening)", species: ["citrus trees"], reportWithinHours: 48, notifyAgency: "FDACS – Division of Plant Industry" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Florida Dept. of Agriculture – Bureau of Pesticides",
      recordkeepingYears: 2,
      additionalNotes: "Florida has restricted-use pesticide permits near water bodies. Specific labeling requirements for fumigants.",
    },
    biosecurityRequirements: ["Cattle movement certificate required for all cattle leaving origin county", "NPIP compliance for commercial poultry", "Citrus nurseries require certification", "Premises registration strongly recommended"],
    keyStatutes: ["Fla. Stat. § 585.001 (Animal Health)", "Fla. Stat. § 487.011 (Pesticides)", "Fla. Stat. § 403.067 (Water Quality BMPs)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── GEORGIA ───────────────────────────────────────────────────────
  {
    name: "Georgia",
    abbreviation: "GA",
    agDepartment: {
      name: "Georgia Department of Agriculture",
      website: "https://agr.georgia.gov",
      phone: "(404) 656-3600",
    },
    regulations: [
      {
        id: "ga-bio-1",
        title: "Georgia Animal Disease Control",
        citation: "O.C.G.A. § 4-4-1 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed animal diseases and authorizes the State Veterinarian to impose quarantines.",
        requirements: ["Report listed diseases within 24 hours", "Poultry producers must maintain active flock health records", "Comply with GDA quarantine and testing requirements"],
        penalty: "Civil penalty up to $1,000; misdemeanor",
      },
      {
        id: "ga-pest-1",
        title: "Georgia Pesticide Use and Application Act",
        citation: "O.C.G.A. § 2-7-90 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration, dealer licensing, and commercial/private applicator certification in Georgia.",
        requirements: ["Commercial applicator license for hire", "Private applicator certification for RUPs", "Maintain application records 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Georgia Dept. of Agriculture – Pesticide Division",
      recordkeepingYears: 2,
      additionalNotes: "Georgia is a major broiler state; specific HPAI biosecurity and pesticide use protocols apply to commercial poultry.",
    },
    biosecurityRequirements: ["NPIP participation required for commercial poultry sale across state lines", "Poultry flock health plans recommended", "Livestock import health certificates required"],
    keyStatutes: ["O.C.G.A. § 4-4-1 (Animal Health)", "O.C.G.A. § 2-7-90 (Pesticides)", "O.C.G.A. § 12-5-20 (Water Quality)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── HAWAII ────────────────────────────────────────────────────────
  {
    name: "Hawaii",
    abbreviation: "HI",
    agDepartment: {
      name: "Hawaii Department of Agriculture",
      website: "https://hdoa.hawaii.gov",
      phone: "(808) 973-9560",
    },
    regulations: [
      {
        id: "hi-bio-1",
        title: "Hawaii Animal Disease Control",
        citation: "HRS § 142-1 et seq.",
        category: "animal-health",
        description: "Hawaii maintains strict import controls to protect its disease-free status for many livestock diseases.",
        requirements: ["Pre-import permit required for all livestock", "Mandatory quarantine periods for imported animals", "Report any suspected exotic disease immediately"],
        penalty: "Civil penalty; criminal charges for import violations",
      },
      {
        id: "hi-pest-1",
        title: "Hawaii Pesticide Law",
        citation: "HRS § 149A-1 et seq.",
        category: "pesticides",
        description: "Regulates pesticide use with additional restrictions due to Hawaii's unique ecosystems.",
        requirements: ["Restricted-use pesticide license required", "Special restrictions near watersheds and coral reefs", "Report incidents to HDOA within 24 hours"],
        penalty: "Fine up to $25,000 per violation",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Hawaii Dept. of Agriculture – Pesticides Branch",
      recordkeepingYears: 2,
      additionalNotes: "Hawaii has strict import restrictions on pesticides. Many mainland products are not registered in Hawaii. Coral reef protection buffer zones apply.",
    },
    biosecurityRequirements: ["All animal imports require HDOA import permit and federal inspection", "Mandatory quarantine at Hawaii's animal quarantine facility", "No direct imports of most livestock without testing"],
    keyStatutes: ["HRS § 142-1 (Animal Health)", "HRS § 149A-1 (Pesticides)", "HRS § 174C (Water Resources)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── IDAHO ─────────────────────────────────────────────────────────
  {
    name: "Idaho",
    abbreviation: "ID",
    agDepartment: {
      name: "Idaho State Department of Agriculture",
      website: "https://www.agri.idaho.gov",
      phone: "(208) 332-8500",
    },
    regulations: [
      {
        id: "id-bio-1",
        title: "Idaho Animal Disease Control",
        citation: "Idaho Code § 25-201 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed livestock diseases to the State Veterinarian. Dairy industry-specific protocols maintained.",
        requirements: ["Report listed diseases within 24 hours", "Dairy herd testing for brucellosis and TB as required", "Brand inspection required for cattle movement"],
        penalty: "Civil penalty; misdemeanor",
      },
      {
        id: "id-pest-1",
        title: "Idaho Pesticide Act",
        citation: "Idaho Code § 22-3401 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration, applicator licensing, and use in Idaho.",
        requirements: ["Commercial applicator license required", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Idaho Dept. of Agriculture – Division of Agricultural Resources",
      recordkeepingYears: 2,
      additionalNotes: "Idaho's Snake River Plain aquifer is a significant agricultural water resource; pesticide restrictions near the aquifer apply.",
    },
    biosecurityRequirements: ["Brand registration and inspection for cattle, horses, mules", "Import permit for cattle, swine, poultry from certain states", "Dairy operations subject to regular state inspection"],
    keyStatutes: ["Idaho Code § 25-201 (Animal Industry)", "Idaho Code § 22-3401 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── ILLINOIS ──────────────────────────────────────────────────────
  {
    name: "Illinois",
    abbreviation: "IL",
    agDepartment: {
      name: "Illinois Department of Agriculture",
      website: "https://www2.illinois.gov/sites/agr",
      phone: "(217) 782-2172",
    },
    regulations: [
      {
        id: "il-bio-1",
        title: "Illinois Diseased Animals Act",
        citation: "510 ILCS 50/1 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed livestock and poultry diseases. Swine industry has specific pseudorabies monitoring requirements.",
        requirements: ["Report listed diseases within 24 hours", "Maintain health certificates for interstate movement", "Comply with IDOA quarantine orders"],
        penalty: "Civil penalty; Class A misdemeanor",
      },
      {
        id: "il-pest-1",
        title: "Illinois Pesticide Act",
        citation: "415 ILCS 60/1 et seq.",
        category: "pesticides",
        description: "Comprehensive pesticide regulatory scheme covering registration, certification, and use requirements.",
        requirements: ["Applicator certification for commercial and restricted-use", "Maintain records 2 years", "Report spills to IEPA within 24 hours"],
        penalty: "Civil penalty up to $10,000 per violation",
      },
      {
        id: "il-env-1",
        title: "Illinois Livestock Management Facilities Act",
        citation: "510 ILCS 77/1 et seq.",
        category: "environmental",
        description: "Regulates construction, operation, and siting of large livestock facilities to protect water quality.",
        requirements: ["Permit required for new or expanded facilities above threshold", "Setback requirements from residences, schools, and waterways", "Nutrient management plan required"],
        federalOverlay: "EPA Clean Water Act; CAFO Rules",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Illinois Dept. of Agriculture – Bureau of Environmental Programs",
      recordkeepingYears: 2,
      additionalNotes: "Illinois Nutrient Loss Reduction Strategy affects fertilizer timing and application practices.",
    },
    biosecurityRequirements: ["Health certificate required for livestock imports", "Swine operations in Pseudorabies monitoring areas require additional testing", "Livestock facilities above thresholds need IDA permit"],
    keyStatutes: ["510 ILCS 50/1 (Animal Diseases)", "415 ILCS 60/1 (Pesticides)", "510 ILCS 77/1 (Livestock Facilities)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── INDIANA ───────────────────────────────────────────────────────
  {
    name: "Indiana",
    abbreviation: "IN",
    agDepartment: {
      name: "Indiana State Board of Animal Health (BOAH)",
      website: "https://www.in.gov/boah",
      phone: "(317) 544-2400",
      emergencyHotline: "(317) 544-2400",
    },
    regulations: [
      {
        id: "in-bio-1",
        title: "Indiana Animal Disease Control",
        citation: "IC 15-17-1 et seq.",
        category: "animal-health",
        description: "BOAH oversees livestock disease control, movement permits, and emergency response. Indiana's swine industry has specific health protocols.",
        requirements: ["Immediate reporting of FAD suspects", "Health certificate for all livestock entering Indiana", "Swine movement permits for certain intrastate movements"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "in-pest-1",
        title: "Indiana Pesticide Registration and Application Law",
        citation: "IC 15-16-4-1 et seq.",
        category: "pesticides",
        description: "Requires applicator certification and pesticide product registration. OISC oversees enforcement.",
        requirements: ["Commercial applicator license from OISC", "Private applicator certification for RUPs", "Maintain records 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Indiana Office of Indiana State Chemist (OISC)",
      recordkeepingYears: 2,
      additionalNotes: "OISC coordinates with BOAH on pesticide-related animal health issues.",
    },
    biosecurityRequirements: ["Health certificate required for all livestock imports", "Premises registration (PIN) required for livestock operations selling animals", "Swine operations should be enrolled in Swine Health Improvement Plan"],
    keyStatutes: ["IC 15-17-1 (Animal Health)", "IC 15-16-4 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── IOWA ──────────────────────────────────────────────────────────
  {
    name: "Iowa",
    abbreviation: "IA",
    agDepartment: {
      name: "Iowa Department of Agriculture and Land Stewardship (IDALS)",
      website: "https://iowaagriculture.gov",
      phone: "(515) 281-5321",
    },
    regulations: [
      {
        id: "ia-bio-1",
        title: "Iowa Livestock Health Code",
        citation: "Iowa Code ch. 163",
        category: "animal-health",
        description: "Governs livestock disease reporting, movement, and herd health. Iowa is the nation's top pork producer with extensive swine health protocols.",
        requirements: ["Report listed diseases within 24 hours to State Vet", "Interstate CVI for all livestock movement", "Comply with IDALS herd cleanup and quarantine orders"],
        penalty: "Simple misdemeanor; civil penalty up to $1,000 per day",
      },
      {
        id: "ia-pest-1",
        title: "Iowa Pesticide Act",
        citation: "Iowa Code ch. 206",
        category: "pesticides",
        description: "Requires commercial applicator licensing and private applicator certification in Iowa.",
        requirements: ["Commercial pesticide applicator license", "Private applicator training for RUPs", "Maintain records 3 years"],
        penalty: "Simple misdemeanor to aggravated misdemeanor",
      },
      {
        id: "ia-env-1",
        title: "Iowa Nutrient Reduction Strategy",
        citation: "Iowa Code ch. 459 (Confinement Feeding Operations)",
        category: "environmental",
        description: "Iowa's comprehensive plan to reduce nutrient loading to waterways. Confinement operations require construction permits and master matrix review.",
        requirements: ["Manure management plan for confinement operations", "Setback requirements from waterways, drainage wells, and residences", "Manure application records maintained 5 years"],
        federalOverlay: "EPA Clean Water Act; CAFO Rules",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Iowa Dept. of Agriculture – Pesticide Bureau",
      recordkeepingYears: 3,
      additionalNotes: "Iowa has specific groundwater protection areas (karst geography) with additional pesticide use restrictions.",
    },
    biosecurityRequirements: ["Swine premises registration required", "Porcine Epidemic Diarrhea (PED) monitoring required for swine operations", "Poultry NPIP compliance for commercial flocks"],
    keyStatutes: ["Iowa Code ch. 163 (Animal Health)", "Iowa Code ch. 206 (Pesticides)", "Iowa Code ch. 459 (Confinement Operations)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── KANSAS ────────────────────────────────────────────────────────
  {
    name: "Kansas",
    abbreviation: "KS",
    agDepartment: {
      name: "Kansas Department of Agriculture",
      website: "https://www.agriculture.ks.gov",
      phone: "(785) 564-6700",
    },
    regulations: [
      {
        id: "ks-bio-1",
        title: "Kansas Animal Disease Control",
        citation: "K.S.A. 47-601 et seq.",
        category: "animal-health",
        description: "Comprehensive livestock disease control law covering reporting, quarantine, and depopulation authority.",
        requirements: ["Report listed diseases within 24 hours", "Brand inspection for cattle intrastate and interstate movement", "Comply with Kansas Animal Health Commissioner orders"],
        penalty: "Civil penalty; Class B misdemeanor",
      },
      {
        id: "ks-pest-1",
        title: "Kansas Pesticide Act",
        citation: "K.S.A. 2-2438 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration, dealer licensing, and applicator certification in Kansas.",
        requirements: ["Commercial applicator license required", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Kansas Dept. of Agriculture – Division of Environment",
      recordkeepingYears: 2,
      additionalNotes: "Kansas Ogallala Aquifer location creates groundwater protection requirements affecting pesticide use.",
    },
    biosecurityRequirements: ["Brand registration required for cattle and horses", "Health certificate for livestock imports", "Feedlot operations subject to state CAFO permit requirements"],
    keyStatutes: ["K.S.A. 47-601 (Animal Health)", "K.S.A. 2-2438 (Pesticides)", "K.S.A. 65-164 (Water Pollution)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── KENTUCKY ──────────────────────────────────────────────────────
  {
    name: "Kentucky",
    abbreviation: "KY",
    agDepartment: {
      name: "Kentucky Department of Agriculture",
      website: "https://www.kyagr.com",
      phone: "(502) 573-0282",
    },
    regulations: [
      {
        id: "ky-bio-1",
        title: "Kentucky Livestock Disease Control",
        citation: "KRS 257.010 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control. Equine industry has specific EIA and EHV-1 protocols.",
        requirements: ["Report listed diseases to KDA within 24 hours", "Negative Coggins test required for horses in commerce", "Comply with KDA quarantine orders"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "ky-pest-1",
        title: "Kentucky Pesticides Act",
        citation: "KRS 217B.010 et seq.",
        category: "pesticides",
        description: "Regulates pesticide registration, certification, and use in Kentucky.",
        requirements: ["Commercial applicator license from KDA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Equine Herpesvirus-1 (EHV-1) Neurological Form", species: ["horses"], reportWithinHours: 24, notifyAgency: "Kentucky State Veterinarian" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Kentucky Dept. of Agriculture – Division of Pesticides",
      recordkeepingYears: 2,
      additionalNotes: "Kentucky has significant karst topography; special pesticide use restrictions apply near sinkholes and caves.",
    },
    biosecurityRequirements: ["Coggins test required for horse movement and events", "Health certificate for livestock imports", "Hemp operations require KDA license and compliance"],
    keyStatutes: ["KRS 257.010 (Livestock)", "KRS 217B.010 (Pesticides)", "KRS 224.01-010 (Environmental)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── LOUISIANA ─────────────────────────────────────────────────────
  {
    name: "Louisiana",
    abbreviation: "LA",
    agDepartment: {
      name: "Louisiana Department of Agriculture and Forestry (LDAF)",
      website: "https://www.ldaf.state.la.us",
      phone: "(225) 922-1234",
    },
    regulations: [
      {
        id: "la-bio-1",
        title: "Louisiana Livestock Disease Control",
        citation: "La. R.S. 3:2091 et seq.",
        category: "animal-health",
        description: "Comprehensive livestock disease control authority for the Commissioner of Agriculture.",
        requirements: ["Report listed diseases within 24 hours to LDAF", "Health certificate for livestock imports from certain states", "Comply with Louisiana State Veterinarian orders"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "la-pest-1",
        title: "Louisiana Pesticide Law",
        citation: "La. R.S. 3:3201 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator certification. Louisiana has specific regulations for aquatic pesticide applications.",
        requirements: ["Commercial pesticide applicator license", "Private applicator certification for RUPs", "Aquatic permit for water body applications", "Records for 2 years"],
        penalty: "Civil penalty up to $5,000; criminal charges possible",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Louisiana Dept. of Agriculture and Forestry – Pesticide and Environmental Programs",
      recordkeepingYears: 2,
      additionalNotes: "Louisiana's coastal agriculture faces unique challenges including saltwater intrusion and hurricane-related biosecurity issues.",
    },
    biosecurityRequirements: ["Livestock import health certificate required", "Crawfish and aquaculture operations have specific disease control requirements", "Comply with LDAF biosecurity emergency orders"],
    keyStatutes: ["La. R.S. 3:2091 (Animal Health)", "La. R.S. 3:3201 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MAINE ─────────────────────────────────────────────────────────
  {
    name: "Maine",
    abbreviation: "ME",
    agDepartment: {
      name: "Maine Department of Agriculture, Conservation and Forestry",
      website: "https://www.maine.gov/dacf",
      phone: "(207) 287-3200",
    },
    regulations: [
      {
        id: "me-bio-1",
        title: "Maine Animal Disease Reporting",
        citation: "7 M.R.S. § 1311 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed infectious diseases affecting livestock and poultry.",
        requirements: ["Report listed diseases within 24 hours", "Comply with DACF quarantine orders", "Health certificate for livestock imports"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "me-pest-1",
        title: "Maine Board of Pesticides Control",
        citation: "7 M.R.S. § 601 et seq.",
        category: "pesticides",
        description: "Maine Board of Pesticides Control oversees all pesticide regulation including aerial applications and buffer zones.",
        requirements: ["Commercial pesticide applicator license", "Private applicator certification", "Notification requirements before certain applications", "Records for 2 years"],
        penalty: "Civil penalty up to $25,000 per violation",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Maine Board of Pesticides Control",
      recordkeepingYears: 2,
      additionalNotes: "Maine has significant restrictions on pesticide applications near water bodies. Blueberry operations have specific IPM requirements.",
    },
    biosecurityRequiriances: ["Health certificates for livestock imports", "Aquaculture operations require DMR permits and disease reporting", "Organic operations must comply with NOP standards"],
    biosecurityRequirements: ["Health certificates for livestock imports", "Aquaculture operations require DMR permits and disease reporting", "Organic operations must comply with NOP standards"],
    keyStatutes: ["7 M.R.S. § 1311 (Animal Health)", "7 M.R.S. § 601 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MARYLAND ──────────────────────────────────────────────────────
  {
    name: "Maryland",
    abbreviation: "MD",
    agDepartment: {
      name: "Maryland Department of Agriculture",
      website: "https://mda.maryland.gov",
      phone: "(410) 841-5700",
    },
    regulations: [
      {
        id: "md-bio-1",
        title: "Maryland Animal Disease Reporting",
        citation: "Md. Code Ann., Agric. § 3-101 et seq.",
        category: "animal-health",
        description: "Requires veterinarians and farm operators to report listed diseases. Poultry industry on Delmarva Peninsula has specific protocols.",
        requirements: ["Report listed diseases within 24 hours to MDA", "NPIP compliance for commercial poultry", "Health certificate for livestock imports"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "md-env-1",
        title: "Maryland Nutrient Management Act",
        citation: "Md. Code Ann., Agric. § 8-801 et seq.",
        category: "environmental",
        description: "Farmers applying nutrients above a threshold must develop a certified nutrient management plan to protect Chesapeake Bay.",
        requirements: ["NMP required for operations generating or applying > 10 animal units of manure", "Licensed Nutrient Management Consultant must certify plan", "Record all nutrient applications; retain 3 years"],
        federalOverlay: "Chesapeake Bay TMDL; EPA Clean Water Act",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Maryland Dept. of Agriculture – Pesticide Regulation Section",
      recordkeepingYears: 2,
      additionalNotes: "Chesapeake Bay watershed restrictions on pesticide applications near waterways. Chesapeake Bay Critical Area requires additional setbacks.",
    },
    biosecurityRequirements: ["NPIP compliance required for commercial poultry", "Nutrient management plan required for livestock operations", "Waterfowl operations require MDA permits"],
    keyStatutes: ["Md. Code Ann., Agric. § 3-101 (Animal Health)", "Md. Code Ann., Agric. § 8-801 (Nutrients)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MASSACHUSETTS ─────────────────────────────────────────────────
  {
    name: "Massachusetts",
    abbreviation: "MA",
    agDepartment: {
      name: "Massachusetts Department of Agricultural Resources",
      website: "https://www.mass.gov/agr",
      phone: "(617) 626-1700",
    },
    regulations: [
      {
        id: "ma-bio-1",
        title: "Massachusetts Animal Disease Reporting",
        citation: "G.L. c. 129, § 13 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed infectious diseases to the Division of Animal Health.",
        requirements: ["Report listed diseases within 24 hours", "Comply with MDAR quarantine orders", "Interstate CVI required for livestock imports"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "ma-pest-1",
        title: "Massachusetts Pesticide Control Act",
        citation: "G.L. c. 132B",
        category: "pesticides",
        description: "Comprehensive pesticide regulation including licensing, restricted areas, and prohibited substances.",
        requirements: ["Commercial applicator license from DPH/MDA", "Restricted pesticide permit for certain categories", "Notification requirements near sensitive sites", "Records for 3 years"],
        penalty: "Civil penalty up to $25,000 per violation",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Massachusetts Dept. of Agricultural Resources – Pesticide Program",
      recordkeepingYears: 3,
      additionalNotes: "Massachusetts has strict restrictions on neonicotinoids and other pollinator-harmful pesticides. Buffer zones near schools and playgrounds.",
    },
    biosecurityRequirements: ["Health certificate for all livestock imports", "Cranberry operations have specific water use and pesticide reporting requirements"],
    keyStatutes: ["G.L. c. 129 (Animal Health)", "G.L. c. 132B (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MICHIGAN ──────────────────────────────────────────────────────
  {
    name: "Michigan",
    abbreviation: "MI",
    agDepartment: {
      name: "Michigan Department of Agriculture and Rural Development (MDARD)",
      website: "https://www.michigan.gov/mdard",
      phone: "(800) 292-3939",
    },
    regulations: [
      {
        id: "mi-bio-1",
        title: "Michigan Animal Industry Act",
        citation: "MCL 287.701 et seq.",
        category: "animal-health",
        description: "Comprehensive animal disease control including mandatory reporting, quarantine, and testing. Michigan has bovine TB in white-tailed deer affecting livestock.",
        requirements: ["Report listed diseases to MDARD within 24 hours", "Cattle herds in TB surveillance zones require annual testing", "Movement permits for cattle from TB zone counties", "Mandatory livestock premises registration"],
        penalty: "Civil penalty up to $2,500; criminal misdemeanor",
      },
      {
        id: "mi-pest-1",
        title: "Michigan Pesticide Control Act",
        citation: "MCL 324.8301 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration, applicator licensing, and use in Michigan.",
        requirements: ["Commercial applicator license from MDARD", "Private applicator certification for RUPs", "Records for 3 years", "Report spills to MDEQ within 24 hours"],
        penalty: "Civil penalty up to $5,000; criminal misdemeanor",
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Bovine Tuberculosis (bTB) – White-tailed Deer Interface", species: ["cattle", "bison", "deer"], reportWithinHours: 24, notifyAgency: "MDARD + DNR" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Michigan Dept. of Agriculture and Rural Development – Pesticide and Plant Pest Management",
      recordkeepingYears: 3,
      additionalNotes: "Michigan has significant Great Lakes watershed restrictions on pesticide applications. TB zone counties have enhanced cattle movement requirements.",
    },
    biosecurityRequirements: ["Mandatory premises registration for livestock operations", "TB zone cattle require movement permits", "Poultry NPIP participation required for commercial sale", "Wildlife interface biosecurity measures required in TB zone"],
    keyStatutes: ["MCL 287.701 (Animal Industry)", "MCL 324.8301 (Pesticides)", "MCL 324.3101 (Natural Resources)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MINNESOTA ─────────────────────────────────────────────────────
  {
    name: "Minnesota",
    abbreviation: "MN",
    agDepartment: {
      name: "Minnesota Board of Animal Health",
      website: "https://www.bah.state.mn.us",
      phone: "(651) 296-2942",
    },
    regulations: [
      {
        id: "mn-bio-1",
        title: "Minnesota Animal Disease Reporting",
        citation: "Minn. Stat. § 35.01 et seq.",
        category: "animal-health",
        description: "Minnesota Board of Animal Health oversees disease reporting, testing, and emergency response. Turkey industry has specific protocols.",
        requirements: ["Report listed diseases within 24 hours to MBAH", "Livestock premises registration required", "Movement permits for certain animals"],
        penalty: "Civil penalty; gross misdemeanor",
      },
      {
        id: "mn-pest-1",
        title: "Minnesota Pesticide Control",
        citation: "Minn. Stat. § 18B.01 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration, applicator licensing, and use in Minnesota.",
        requirements: ["Commercial pesticide applicator license from MDA", "Private applicator certification for RUPs", "Records for 3 years", "Groundwater protection label requirements"],
        penalty: "Civil penalty up to $7,500 per violation",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Minnesota Dept. of Agriculture – Agronomy and Plant Protection",
      recordkeepingYears: 3,
      additionalNotes: "Minnesota Groundwater Protection Act creates additional restrictions. Pollinator protection requirements enacted in 2014.",
    },
    biosecurityRequirements: ["Livestock premises registration required by MBAH", "Poultry NPIP compliance for commercial operations", "CWD testing for farmed cervids"],
    keyStatutes: ["Minn. Stat. § 35.01 (Animal Health)", "Minn. Stat. § 18B.01 (Pesticides)", "Minn. Stat. § 103H (Groundwater)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MISSISSIPPI ───────────────────────────────────────────────────
  {
    name: "Mississippi",
    abbreviation: "MS",
    agDepartment: {
      name: "Mississippi Board of Animal Health",
      website: "https://www.mbah.ms.gov",
      phone: "(601) 359-1170",
    },
    regulations: [
      {
        id: "ms-bio-1",
        title: "Mississippi Livestock Disease Control",
        citation: "Miss. Code Ann. § 41-53-1 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control in Mississippi. Poultry and catfish industries have specific protocols.",
        requirements: ["Report listed diseases within 24 hours to MBAH", "Health certificate for livestock imports", "Catfish disease reporting to MBAH and USDA"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "ms-pest-1",
        title: "Mississippi Pesticide Law",
        citation: "Miss. Code Ann. § 69-23-1 et seq.",
        category: "pesticides",
        description: "Regulates pesticide registration, applicator certification, and use in Mississippi.",
        requirements: ["Commercial applicator license from MDAC", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Mississippi Dept. of Agriculture and Commerce – Bureau of Plant Industry",
      recordkeepingYears: 2,
      additionalNotes: "Mississippi Delta region has specific pesticide restrictions near waterways. Aquaculture (catfish) operations have unique biosecurity requirements.",
    },
    biosecurityRequirements: ["Livestock health certificate for imports", "Commercial catfish operations require MBAH disease monitoring", "NPIP compliance for poultry"],
    keyStatutes: ["Miss. Code Ann. § 41-53-1 (Animal Health)", "Miss. Code Ann. § 69-23-1 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MISSOURI ──────────────────────────────────────────────────────
  {
    name: "Missouri",
    abbreviation: "MO",
    agDepartment: {
      name: "Missouri Department of Agriculture",
      website: "https://agriculture.mo.gov",
      phone: "(573) 751-4211",
    },
    regulations: [
      {
        id: "mo-bio-1",
        title: "Missouri Animal Disease Control Law",
        citation: "RSMo 267.010 et seq.",
        category: "animal-health",
        description: "Comprehensive livestock disease control. Swine industry has significant operations requiring specific biosecurity.",
        requirements: ["Report listed diseases within 24 hours", "Health certificate for livestock imports", "Brand registration for cattle"],
        penalty: "Class D misdemeanor; civil penalty",
      },
      {
        id: "mo-pest-1",
        title: "Missouri Pesticide Use Act",
        citation: "RSMo 281.005 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator certification in Missouri.",
        requirements: ["Commercial applicator license from MDA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Missouri Dept. of Agriculture – Bureau of Pesticide Control",
      recordkeepingYears: 2,
      additionalNotes: "Missouri has specific restrictions on pesticide applications near the Missouri and Mississippi Rivers and their tributaries.",
    },
    biosecurityRequirements: ["Health certificate for interstate livestock movement", "Premises registration encouraged for livestock operations", "CAFO permit required for large operations"],
    keyStatutes: ["RSMo 267.010 (Animal Health)", "RSMo 281.005 (Pesticides)", "RSMo 644.006 (Water Pollution)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── MONTANA ───────────────────────────────────────────────────────
  {
    name: "Montana",
    abbreviation: "MT",
    agDepartment: {
      name: "Montana Department of Livestock",
      website: "https://liv.mt.gov",
      phone: "(406) 444-2043",
    },
    regulations: [
      {
        id: "mt-bio-1",
        title: "Montana Livestock Disease Control",
        citation: "MCA 81-2-101 et seq.",
        category: "animal-health",
        description: "Montana Dept. of Livestock has broad authority over disease reporting and control. Brucellosis near Yellowstone is a specific ongoing concern.",
        requirements: ["Report listed diseases within 24 hours to DOL", "Cattle from Greater Yellowstone Area require brucellosis testing", "Brand registration and inspection required"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "mt-pest-1",
        title: "Montana Pesticide Act",
        citation: "MCA 80-8-101 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator licensing in Montana.",
        requirements: ["Commercial applicator license from MDOA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Brucellosis – Greater Yellowstone Interface", species: ["cattle", "bison", "elk"], reportWithinHours: 24, notifyAgency: "Montana Dept. of Livestock + USDA APHIS" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Montana Dept. of Agriculture – Agricultural Sciences Division",
      recordkeepingYears: 2,
      additionalNotes: "Montana's rangeland environment requires specific weed control pesticide strategies. Brucellosis interface zone restrictions near national parks.",
    },
    biosecurityRequirements: ["Brand registration mandatory for cattle and horses", "Brucellosis testing for cattle from interface areas", "Health certificate for livestock movement"],
    keyStatutes: ["MCA 81-2-101 (Animal Health)", "MCA 80-8-101 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NEBRASKA ──────────────────────────────────────────────────────
  {
    name: "Nebraska",
    abbreviation: "NE",
    agDepartment: {
      name: "Nebraska Department of Agriculture",
      website: "https://nda.nebraska.gov",
      phone: "(402) 471-2341",
    },
    regulations: [
      {
        id: "ne-bio-1",
        title: "Nebraska Animal Disease Control",
        citation: "Neb. Rev. Stat. § 54-701 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed livestock and poultry diseases. Major cattle and swine state with extensive disease monitoring.",
        requirements: ["Report listed diseases within 24 hours", "Brand registration and inspection for cattle", "Health certificate for livestock imports"],
        penalty: "Class III misdemeanor; civil penalty",
      },
      {
        id: "ne-pest-1",
        title: "Nebraska Pesticide Act",
        citation: "Neb. Rev. Stat. § 2-2620 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator licensing. Nebraska has specific groundwater protection requirements.",
        requirements: ["Commercial applicator license from NDA", "Private applicator certification for RUPs", "Records for 2 years", "Groundwater management area restrictions"],
        penalty: "Class III misdemeanor; civil penalty up to $1,000",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Nebraska Dept. of Agriculture – Bureau of Plant and Seed",
      recordkeepingYears: 2,
      additionalNotes: "Nebraska Groundwater Management Areas have specific pesticide use restrictions. Ogallala Aquifer protection is a priority.",
    },
    biosecurityRequirements: ["Brand registration and inspection required", "Health certificate for livestock movement", "Feedlot operations require state CAFO permits"],
    keyStatutes: ["Neb. Rev. Stat. § 54-701 (Animal Health)", "Neb. Rev. Stat. § 2-2620 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NEVADA ────────────────────────────────────────────────────────
  {
    name: "Nevada",
    abbreviation: "NV",
    agDepartment: {
      name: "Nevada Department of Agriculture",
      website: "https://agri.nv.gov",
      phone: "(775) 353-3601",
    },
    regulations: [
      {
        id: "nv-bio-1",
        title: "Nevada Livestock Disease Control",
        citation: "NRS 571.010 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control. Open range ranching creates specific movement and disease tracking challenges.",
        requirements: ["Report listed diseases within 24 hours", "Brand registration for cattle and horses", "Health certificate for livestock imports"],
        penalty: "Civil penalty; misdemeanor",
      },
      {
        id: "nv-pest-1",
        title: "Nevada Pesticide Control Act",
        citation: "NRS 586.010 et seq.",
        category: "pesticides",
        description: "Regulates pesticide registration and applicator certification in Nevada.",
        requirements: ["Commercial applicator license from NDA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Nevada Dept. of Agriculture – Division of Plant Industry",
      recordkeepingYears: 2,
      additionalNotes: "Nevada's arid environment limits agricultural operations; specific irrigation water quality requirements for pest management.",
    },
    biosecurityRequirements: ["Brand registration and inspection required", "Open range grazing operations must maintain animal identification", "Health certificate for livestock imports"],
    keyStatutes: ["NRS 571.010 (Animal Health)", "NRS 586.010 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NEW HAMPSHIRE ─────────────────────────────────────────────────
  {
    name: "New Hampshire",
    abbreviation: "NH",
    agDepartment: {
      name: "New Hampshire Department of Agriculture, Markets and Food",
      website: "https://www.agriculture.nh.gov",
      phone: "(603) 271-3551",
    },
    regulations: [
      {
        id: "nh-bio-1",
        title: "NH Animal Disease Reporting",
        citation: "RSA 436:1 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed infectious diseases to the State Veterinarian.",
        requirements: ["Report listed diseases within 24 hours", "Health certificate for livestock imports", "Comply with NHDAMF quarantine orders"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "NH Dept. of Agriculture – Division of Pesticide Control",
      recordkeepingYears: 2,
      additionalNotes: "New Hampshire has significant restrictions near lakes and ponds. Lake Winnipesaukee watershed has enhanced protections.",
    },
    biosecurityRequirements: ["Health certificate for all livestock imports", "Maple sugaring operations have specific sanitation requirements"],
    keyStatutes: ["RSA 436:1 (Animal Health)", "RSA 430:28 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NEW JERSEY ────────────────────────────────────────────────────
  {
    name: "New Jersey",
    abbreviation: "NJ",
    agDepartment: {
      name: "New Jersey Department of Agriculture",
      website: "https://www.nj.gov/agriculture",
      phone: "(609) 292-3976",
    },
    regulations: [
      {
        id: "nj-bio-1",
        title: "NJ Animal Disease Control",
        citation: "N.J.S.A. 4:5-1 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed animal diseases to the State Veterinarian. Poultry on Delmarva has specific HPAI protocols.",
        requirements: ["Report listed diseases within 24 hours", "NPIP compliance for commercial poultry", "Health certificate for livestock imports"],
        penalty: "Civil penalty; misdemeanor",
      },
      {
        id: "nj-pest-1",
        title: "New Jersey Pesticide Control Code",
        citation: "N.J.S.A. 13:1F-1 et seq.",
        category: "pesticides",
        description: "Comprehensive pesticide regulation including school and childcare center notification requirements.",
        requirements: ["Certified pesticide applicator license from NJDEP", "Records for 3 years", "Pre-notification for applications near schools and childcare"],
        penalty: "Civil penalty up to $50,000; criminal charges possible",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "New Jersey Dept. of Environmental Protection – Pesticide Control Program",
      recordkeepingYears: 3,
      additionalNotes: "New Jersey has very strict pesticide notification requirements. Pinelands Area has special restrictions.",
    },
    biosecurityRequirements: ["NPIP compliance for commercial poultry", "Health certificate for livestock imports", "Compliance with Highlands and Pinelands resource management plans"],
    keyStatutes: ["N.J.S.A. 4:5-1 (Animal Health)", "N.J.S.A. 13:1F-1 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NEW MEXICO ────────────────────────────────────────────────────
  {
    name: "New Mexico",
    abbreviation: "NM",
    agDepartment: {
      name: "New Mexico Livestock Board",
      website: "https://www.nmlbonline.com",
      phone: "(505) 841-6161",
    },
    regulations: [
      {
        id: "nm-bio-1",
        title: "New Mexico Livestock Law",
        citation: "NMSA 1978 § 77-2-1 et seq.",
        category: "animal-health",
        description: "New Mexico Livestock Board oversees disease control, brand inspection, and livestock movement.",
        requirements: ["Report listed diseases within 24 hours to NMLB", "Brand registration for cattle and horses", "Movement permits for certain livestock"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "nm-pest-1",
        title: "New Mexico Pesticide Control Act",
        citation: "NMSA 1978 § 76-4-1 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator licensing in New Mexico.",
        requirements: ["Commercial applicator license from NMDA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "New Mexico Dept. of Agriculture – Division of Agricultural and Environmental Services",
      recordkeepingYears: 2,
      additionalNotes: "New Mexico has specific pesticide restrictions related to Rio Grande watershed protection and federal lands interface.",
    },
    biosecurityRequirements: ["Brand registration required for cattle, horses, and mules", "Health certificate for livestock imports", "Open range operations must follow NMLB movement protocols"],
    keyStatutes: ["NMSA § 77-2-1 (Livestock Board)", "NMSA § 76-4-1 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NEW YORK ──────────────────────────────────────────────────────
  {
    name: "New York",
    abbreviation: "NY",
    agDepartment: {
      name: "New York State Department of Agriculture and Markets",
      website: "https://agriculture.ny.gov",
      phone: "(800) 554-4501",
    },
    regulations: [
      {
        id: "ny-bio-1",
        title: "New York Agriculture and Markets Law – Animal Disease",
        citation: "NY AG&MKT § 72 et seq.",
        category: "animal-health",
        description: "Comprehensive animal disease reporting and control. NY has significant dairy industry requiring specific protocols.",
        requirements: ["Report listed diseases within 24 hours to NYSDAM", "Dairy herd testing and somatic cell count compliance", "Comply with NYSDAM quarantine orders"],
        penalty: "Civil penalty up to $1,000; criminal misdemeanor",
      },
      {
        id: "ny-pest-1",
        title: "New York Environmental Conservation Law – Pesticides",
        citation: "ECL § 33-0101 et seq.",
        category: "pesticides",
        description: "Comprehensive pesticide regulation including commercial certification, restricted use, and notification requirements.",
        requirements: ["Commercial pesticide applicator certification from NYSDEC", "Neighbor notification for certain applications", "Records for 3 years"],
        penalty: "Civil penalty up to $37,500 per day; criminal charges possible",
      },
      {
        id: "ny-env-1",
        title: "New York Agricultural Environmental Management (AEM)",
        citation: "NY AG&MKT § 151-aa et seq.",
        category: "environmental",
        description: "Voluntary framework providing priority access to cost-share programs for farms implementing environmental improvements.",
        requirements: ["Complete farm assessment for priority program access", "Implement nutrient management plans", "Soil and water conservation practices"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "New York State Dept. of Environmental Conservation – Division of Materials Management",
      recordkeepingYears: 3,
      additionalNotes: "New York has buffer zones around sensitive areas including Long Island Sound and Hudson River. Lake George has the strictest aquatic pesticide restrictions in the state.",
    },
    biosecurityRequirements: ["Dairy operations subject to NYSDAM routine inspection", "Health certificate for all livestock imports", "Premises registration for livestock sales operations"],
    keyStatutes: ["NY AG&MKT § 72 (Animal Disease)", "ECL § 33-0101 (Pesticides)", "ECL § 15-0101 (Water Resources)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NORTH CAROLINA ────────────────────────────────────────────────
  {
    name: "North Carolina",
    abbreviation: "NC",
    agDepartment: {
      name: "North Carolina Department of Agriculture and Consumer Services",
      website: "https://www.ncagr.gov",
      phone: "(919) 707-3000",
    },
    regulations: [
      {
        id: "nc-bio-1",
        title: "North Carolina Livestock Disease Control",
        citation: "G.S. 106-306 et seq.",
        category: "animal-health",
        description: "Major hog and poultry producing state with comprehensive disease reporting and extensive environmental regulations for swine CAFOs.",
        requirements: ["Report listed diseases to NCDA&CS within 24 hours", "Swine farms must have certified operator for waste management", "Health certificate for livestock imports"],
        penalty: "Class 1 misdemeanor; civil penalty up to $5,000",
      },
      {
        id: "nc-env-1",
        title: "North Carolina Swine Farm Act",
        citation: "G.S. 143-215.10A et seq.",
        category: "environmental",
        description: "Strict regulations for swine lagoon and spray field operations to protect water quality in the coastal plain.",
        requirements: ["State NPDES permit for swine operations above threshold", "Certified Operator in Responsible Charge for waste systems", "Prohibition on new or expanded lagoon systems", "100-year flood plain restrictions"],
        federalOverlay: "EPA Clean Water Act; CAFO Rules",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "NC Dept. of Agriculture – Structural Pest Control and Pesticides Division",
      recordkeepingYears: 2,
      additionalNotes: "NC has specific restrictions on pesticide applications near coastal wetlands and river basins.",
    },
    biosecurityRequirements: ["Swine operations must have certified operator", "NPIP compliance for commercial poultry", "Health certificate for livestock imports", "Swine operations need current state permit"],
    keyStatutes: ["G.S. 106-306 (Animal Health)", "G.S. 143-215.10A (Swine Farms)", "G.S. 143-215.1 (Water Quality)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── NORTH DAKOTA ──────────────────────────────────────────────────
  {
    name: "North Dakota",
    abbreviation: "ND",
    agDepartment: {
      name: "North Dakota Department of Agriculture",
      website: "https://www.nd.gov/ndda",
      phone: "(701) 328-2231",
    },
    regulations: [
      {
        id: "nd-bio-1",
        title: "North Dakota Animal Disease Control",
        citation: "NDCC § 36-01-14 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control. Significant cattle and grain state.",
        requirements: ["Report listed diseases within 24 hours to NDDA", "Brand registration for cattle and horses", "Health certificate for livestock imports"],
        penalty: "Class B misdemeanor; civil penalty",
      },
      {
        id: "nd-pest-1",
        title: "North Dakota Pesticide Act",
        citation: "NDCC § 4.1-35-01 et seq.",
        category: "pesticides",
        description: "Regulates pesticide registration and applicator licensing in North Dakota.",
        requirements: ["Commercial applicator license from NDDA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "North Dakota Dept. of Agriculture – Plant Industries Division",
      recordkeepingYears: 2,
      additionalNotes: "North Dakota's prairie pothole region creates specific pesticide application requirements near wetlands.",
    },
    biosecurityRequirements: ["Brand registration for cattle and horses", "Health certificate for livestock imports", "Comply with prairie wetland protection requirements"],
    keyStatutes: ["NDCC § 36-01-14 (Animal Health)", "NDCC § 4.1-35-01 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── OHIO ──────────────────────────────────────────────────────────
  {
    name: "Ohio",
    abbreviation: "OH",
    agDepartment: {
      name: "Ohio Department of Agriculture",
      website: "https://agri.ohio.gov",
      phone: "(614) 728-6200",
    },
    regulations: [
      {
        id: "oh-bio-1",
        title: "Ohio Animal Disease Control",
        citation: "ORC § 941.01 et seq.",
        category: "animal-health",
        description: "Ohio has significant swine, poultry, and dairy industries with comprehensive disease control requirements.",
        requirements: ["Report listed diseases within 24 hours to ODA", "Livestock premises registration required", "Health certificate for livestock imports"],
        penalty: "Civil penalty up to $1,000; criminal misdemeanor",
      },
      {
        id: "oh-env-1",
        title: "Ohio CAFO Registration and Permit Program",
        citation: "ORC § 903.01 et seq.",
        category: "environmental",
        description: "Large livestock operations must register with OEPA and implement approved manure management plans.",
        requirements: ["Register as CAFO with OEPA above threshold", "Certified nutrient management plan", "Comply with Lake Erie watershed phosphorus limits"],
        federalOverlay: "EPA Clean Water Act; CAFO Rules; Lake Erie TMDL",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Ohio Dept. of Agriculture – Division of Plant Health",
      recordkeepingYears: 2,
      additionalNotes: "Ohio's Lake Erie watershed has specific phosphorus and algae bloom-related restrictions on nutrient applications.",
    },
    biosecurityRequirements: ["Livestock premises registration required", "NPIP compliance for commercial poultry", "Health certificate for livestock imports", "Lake Erie watershed nutrient management compliance"],
    keyStatutes: ["ORC § 941.01 (Animal Disease)", "ORC § 903.01 (CAFO)", "ORC § 6111.01 (Water Pollution)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── OKLAHOMA ──────────────────────────────────────────────────────
  {
    name: "Oklahoma",
    abbreviation: "OK",
    agDepartment: {
      name: "Oklahoma Department of Agriculture, Food and Forestry",
      website: "https://www.ag.ok.gov",
      phone: "(405) 521-3864",
    },
    regulations: [
      {
        id: "ok-bio-1",
        title: "Oklahoma Animal Disease Control",
        citation: "2 O.S. § 6-1 et seq.",
        category: "animal-health",
        description: "Comprehensive livestock disease control. Major cattle state with extensive brand inspection system.",
        requirements: ["Report listed diseases within 24 hours to ODAFF", "Brand inspection required for cattle and horse movement", "Health certificate for livestock imports from some states"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "ok-pest-1",
        title: "Oklahoma Pesticide Act",
        citation: "2 O.S. § 3-81 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator licensing in Oklahoma.",
        requirements: ["Commercial applicator license from ODAFF", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Oklahoma Dept. of Agriculture – Plant Industry and Consumer Services",
      recordkeepingYears: 2,
      additionalNotes: "Oklahoma has specific restrictions near the Arbuckle-Simpson Aquifer and sensitive groundwater recharge areas.",
    },
    biosecurityRequirements: ["Brand inspection required for cattle movement", "Health certificate for livestock imports", "Poultry NPIP compliance for commercial operations"],
    keyStatutes: ["2 O.S. § 6-1 (Animal Disease)", "2 O.S. § 3-81 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── OREGON ────────────────────────────────────────────────────────
  {
    name: "Oregon",
    abbreviation: "OR",
    agDepartment: {
      name: "Oregon Department of Agriculture",
      website: "https://www.oregon.gov/oda",
      phone: "(503) 986-4550",
    },
    regulations: [
      {
        id: "or-bio-1",
        title: "Oregon Livestock Disease Control",
        citation: "ORS 596.001 et seq.",
        category: "animal-health",
        description: "Governs livestock and poultry disease reporting. Oregon's diverse agriculture includes cattle, dairy, and specialty crops.",
        requirements: ["Report listed diseases within 24 hours to ODA", "Brand registration for cattle and horses", "Health certificate for livestock imports"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "or-pest-1",
        title: "Oregon Pesticide Control Law",
        citation: "ORS 634.002 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration, applicator licensing, and use in Oregon.",
        requirements: ["Commercial applicator license from ODA", "Private applicator certification for RUPs", "Records for 2 years", "Riparian buffer restrictions"],
        penalty: "Civil penalty up to $10,000; criminal charges possible",
      },
      {
        id: "or-env-1",
        title: "Oregon Agricultural Water Quality Program",
        citation: "ORS 568.900 et seq.",
        category: "water-quality",
        description: "Farmers in designated areas must implement agricultural water quality management plans to protect streams, rivers, and wetlands.",
        requirements: ["Agricultural Water Quality Management Area Plan compliance", "Maintain riparian buffers", "Manage soil erosion"],
        federalOverlay: "EPA Clean Water Act; Oregon Coastal Management Program",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Oregon Dept. of Agriculture – Pesticides Division",
      recordkeepingYears: 2,
      additionalNotes: "Oregon has specific restrictions in Endangered Species Act-affected areas. Columbia River basin has enhanced protections.",
    },
    biosecurityRequirements: ["Brand registration and inspection for cattle and horses", "Health certificate for livestock imports", "Riparian buffer zone compliance required"],
    keyStatutes: ["ORS 596.001 (Animal Health)", "ORS 634.002 (Pesticides)", "ORS 568.900 (Water Quality)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── PENNSYLVANIA ──────────────────────────────────────────────────
  {
    name: "Pennsylvania",
    abbreviation: "PA",
    agDepartment: {
      name: "Pennsylvania Department of Agriculture",
      website: "https://www.agriculture.pa.gov",
      phone: "(717) 787-4737",
    },
    regulations: [
      {
        id: "pa-bio-1",
        title: "Pennsylvania Animal Disease Control",
        citation: "3 Pa. C.S. § 2301 et seq.",
        category: "animal-health",
        description: "Comprehensive disease control with significant dairy, poultry, and mushroom industry-specific protocols.",
        requirements: ["Report listed diseases within 24 hours to PDA", "Dairy operations subject to routine inspection", "NPIP compliance for commercial poultry", "Health certificate for livestock imports"],
        penalty: "Civil penalty; summary offense",
      },
      {
        id: "pa-env-1",
        title: "Pennsylvania Clean Streams Law – Agricultural Nutrient Management",
        citation: "35 P.S. § 691.1 et seq.; 3 Pa. C.S. § 501 et seq.",
        category: "environmental",
        description: "Operations above nutrient management thresholds must develop certified nutrient management plans to protect Pennsylvania's waterways.",
        requirements: ["Nutrient management plan for operations with > 2,000 pounds of live weight per acre", "Agricultural E&S plan for operations disturbing 5+ acres", "Comply with Chesapeake Bay TMDL requirements"],
        federalOverlay: "Chesapeake Bay TMDL; EPA Clean Water Act",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Pennsylvania Dept. of Agriculture – Bureau of Plant Industry",
      recordkeepingYears: 2,
      additionalNotes: "Pennsylvania has specific pesticide regulations protecting Chesapeake Bay and Delaware River watersheds.",
    },
    biosecurityRequirements: ["Dairy operations subject to routine PDA inspection", "NPIP compliance required for commercial poultry", "Health certificate for livestock imports", "Nutrient management plan compliance"],
    keyStatutes: ["3 Pa. C.S. § 2301 (Animal Disease)", "3 Pa. C.S. § 501 (Nutrient Management)", "35 P.S. § 691.1 (Clean Streams)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── RHODE ISLAND ──────────────────────────────────────────────────
  {
    name: "Rhode Island",
    abbreviation: "RI",
    agDepartment: {
      name: "Rhode Island Division of Agriculture",
      website: "https://dem.ri.gov/bureaus-offices/office-agriculture",
      phone: "(401) 222-2781",
    },
    regulations: [
      {
        id: "ri-bio-1",
        title: "Rhode Island Animal Disease Reporting",
        citation: "R.I. Gen. Laws § 4-4-1 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed animal diseases to the State Veterinarian.",
        requirements: ["Report listed diseases within 24 hours", "Health certificate for livestock imports", "Comply with RIDEM quarantine orders"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Rhode Island Dept. of Environmental Management",
      recordkeepingYears: 2,
      additionalNotes: "Rhode Island's small size and coastal location create strict pesticide buffer requirements near Narragansett Bay.",
    },
    biosecurityRequirements: ["Health certificate for livestock imports", "Aquaculture operations require DEM permits"],
    keyStatutes: ["R.I. Gen. Laws § 4-4-1 (Animal Health)", "R.I. Gen. Laws § 23-25-1 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── SOUTH CAROLINA ────────────────────────────────────────────────
  {
    name: "South Carolina",
    abbreviation: "SC",
    agDepartment: {
      name: "South Carolina Department of Agriculture",
      website: "https://agriculture.sc.gov",
      phone: "(803) 734-2210",
    },
    regulations: [
      {
        id: "sc-bio-1",
        title: "South Carolina Animal Disease Control",
        citation: "S.C. Code Ann. § 47-4-10 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control. Poultry and peach industries have specific biosecurity needs.",
        requirements: ["Report listed diseases within 24 hours to SCDA", "NPIP compliance for commercial poultry", "Health certificate for livestock imports"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "South Carolina Dept. of Pesticide Regulation",
      recordkeepingYears: 2,
      additionalNotes: "South Carolina has specific pesticide buffer requirements around ACE Basin and other coastal heritage preserves.",
    },
    biosecurityRequirements: ["NPIP participation for commercial poultry", "Health certificate for livestock imports", "Comply with SCDA emergency disease orders"],
    keyStatutes: ["S.C. Code Ann. § 47-4-10 (Animal Disease)", "S.C. Code Ann. § 48-30-10 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── SOUTH DAKOTA ──────────────────────────────────────────────────
  {
    name: "South Dakota",
    abbreviation: "SD",
    agDepartment: {
      name: "South Dakota Animal Industry Board",
      website: "https://aib.sd.gov",
      phone: "(605) 773-3321",
    },
    regulations: [
      {
        id: "sd-bio-1",
        title: "South Dakota Animal Disease Control",
        citation: "SDCL § 40-4-1 et seq.",
        category: "animal-health",
        description: "SD Animal Industry Board oversees disease reporting and control. Major cattle state with brand inspection system.",
        requirements: ["Report listed diseases within 24 hours to AIB", "Brand registration and inspection for cattle and horses", "Health certificate for livestock imports"],
        penalty: "Class 1 misdemeanor; civil penalty",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "South Dakota Dept. of Agriculture and Natural Resources",
      recordkeepingYears: 2,
      additionalNotes: "South Dakota's prairie pothole region has specific restrictions on pesticide applications near wetlands.",
    },
    biosecurityRequirements: ["Brand registration and inspection required", "Health certificate for livestock imports", "CWD testing for farmed cervids"],
    keyStatutes: ["SDCL § 40-4-1 (Animal Disease)", "SDCL § 38-20A-1 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── TENNESSEE ─────────────────────────────────────────────────────
  {
    name: "Tennessee",
    abbreviation: "TN",
    agDepartment: {
      name: "Tennessee Department of Agriculture",
      website: "https://www.tn.gov/agriculture",
      phone: "(615) 837-5100",
    },
    regulations: [
      {
        id: "tn-bio-1",
        title: "Tennessee Animal Disease Control",
        citation: "T.C.A. § 44-3-101 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control. Significant cattle and horse industries.",
        requirements: ["Report listed diseases within 24 hours to TDA", "Negative Coggins test required for horses at events", "Health certificate for livestock imports"],
        penalty: "Civil penalty; Class B misdemeanor",
      },
      {
        id: "tn-pest-1",
        title: "Tennessee Pesticide Control Act",
        citation: "T.C.A. § 43-8-101 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator certification in Tennessee.",
        requirements: ["Commercial applicator license from TDA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Tennessee Dept. of Agriculture – Consumer and Industry Services",
      recordkeepingYears: 2,
      additionalNotes: "Tennessee Valley Authority watershed creates additional agricultural runoff restrictions.",
    },
    biosecurityRequirements: ["Coggins test required for horse events", "Health certificate for livestock imports", "NPIP compliance for commercial poultry"],
    keyStatutes: ["T.C.A. § 44-3-101 (Animal Disease)", "T.C.A. § 43-8-101 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── TEXAS ─────────────────────────────────────────────────────────
  {
    name: "Texas",
    abbreviation: "TX",
    agDepartment: {
      name: "Texas Animal Health Commission (TAHC)",
      website: "https://www.tahc.texas.gov",
      phone: "(512) 719-0700",
      emergencyHotline: "(800) 550-8242",
    },
    regulations: [
      {
        id: "tx-bio-1",
        title: "Texas Animal Health Commission Rules",
        citation: "Tex. Agric. Code Ann. § 161.001 et seq.",
        category: "animal-health",
        description: "The TAHC is one of the largest state animal health agencies in the U.S., reflecting Texas's massive livestock industry. Brand inspection and movement control are key elements.",
        requirements: ["Immediate reporting of FAD suspects to TAHC and USDA APHIS", "Brand registration and inspection required for cattle movement", "Tick inspection in Gulf Coast Fever tick eradication zone", "Movement restrictions for livestock from quarantine areas"],
        penalty: "Civil penalty up to $5,000 per violation; criminal misdemeanor",
      },
      {
        id: "tx-pest-1",
        title: "Texas Pesticide Regulatory Program",
        citation: "Tex. Agric. Code Ann. § 76.001 et seq.",
        category: "pesticides",
        description: "TDA oversees pesticide registration and applicator certification. Texas has a large commercial agricultural pesticide market.",
        requirements: ["Commercial pesticide applicator license from TDA", "Private applicator certification for RUPs", "Records for 2 years", "Fumigation permit required for certain applications"],
        penalty: "Civil penalty up to $10,000; criminal misdemeanor",
      },
      {
        id: "tx-tick-1",
        title: "Texas Cattle Fever Tick Eradication Program",
        citation: "TAHC § 161.056 et seq.",
        category: "biosecurity",
        description: "Ongoing program to eradicate cattle fever ticks along the Texas-Mexico border to protect U.S. livestock from tick-borne diseases.",
        requirements: ["Cattle in quarantine zone must be inspected and treated for ticks", "Movement permit required from tick-free to non-quarantine areas", "Cooperate with TAHC/USDA tick inspectors"],
        federalOverlay: "USDA APHIS National Cattle Fever Tick Eradication Program",
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Cattle Fever Tick Infestation", species: ["cattle"], reportWithinHours: 24, notifyAgency: "Texas Animal Health Commission" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Texas Dept. of Agriculture – Pesticide Programs",
      recordkeepingYears: 2,
      additionalNotes: "Texas has specific regulations for boll weevil eradication programs. Gulf Coast operations face unique pesticide restrictions near estuaries.",
    },
    biosecurityRequirements: ["Brand registration required for cattle", "Tick inspection required in border quarantine zone", "TAHC premises registration for livestock operations", "Health certificate for livestock imports from certain states"],
    keyStatutes: ["Tex. Agric. Code § 161.001 (Animal Health)", "Tex. Agric. Code § 76.001 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── UTAH ──────────────────────────────────────────────────────────
  {
    name: "Utah",
    abbreviation: "UT",
    agDepartment: {
      name: "Utah Department of Agriculture and Food",
      website: "https://ag.utah.gov",
      phone: "(801) 538-7100",
    },
    regulations: [
      {
        id: "ut-bio-1",
        title: "Utah Livestock Disease Control",
        citation: "Utah Code Ann. § 4-31-101 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control. Significant range cattle and sheep operations.",
        requirements: ["Report listed diseases within 24 hours to UDAF", "Brand registration for cattle, horses, and sheep", "Health certificate for livestock imports"],
        penalty: "Class B misdemeanor; civil penalty",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Utah Dept. of Agriculture and Food – Division of Plant Industry",
      recordkeepingYears: 2,
      additionalNotes: "Utah's Great Salt Lake watershed creates specific agricultural runoff requirements.",
    },
    biosecurityRequirements: ["Brand registration and inspection required", "Health certificate for livestock imports", "Open range grazing compliance with BLM and USFS permits"],
    keyStatutes: ["Utah Code § 4-31-101 (Animal Disease)", "Utah Code § 4-14-101 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── VERMONT ───────────────────────────────────────────────────────
  {
    name: "Vermont",
    abbreviation: "VT",
    agDepartment: {
      name: "Vermont Agency of Agriculture, Food and Markets",
      website: "https://agriculture.vermont.gov",
      phone: "(802) 828-2430",
    },
    regulations: [
      {
        id: "vt-bio-1",
        title: "Vermont Animal Disease Reporting",
        citation: "6 V.S.A. § 201 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed diseases. Vermont's dairy industry is central to its agricultural economy.",
        requirements: ["Report listed diseases within 24 hours to VAAFM", "Dairy operations subject to routine inspection", "Health certificate for livestock imports"],
        penalty: "Civil penalty; criminal misdemeanor",
      },
      {
        id: "vt-env-1",
        title: "Vermont Required Agricultural Practices (RAPs)",
        citation: "6 V.S.A. § 4810 et seq.",
        category: "environmental",
        description: "Mandatory agricultural practices for all farms in Vermont to protect water quality in Lake Champlain and other water bodies.",
        requirements: ["All farms must comply with RAPs – no permit required but inspections occur", "Establish and maintain buffers along all surface waters", "Manage manure and fertilizer applications per RAP requirements", "Agricultural wastewater must not enter surface waters"],
        federalOverlay: "Lake Champlain TMDL; EPA Clean Water Act",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Vermont Agency of Agriculture – Laboratory and Regulatory Services",
      recordkeepingYears: 2,
      additionalNotes: "Vermont has restricted use near Lake Champlain. Neonicotinoid use on certain crops requires additional notification.",
    },
    biosecurityRequirements: ["Dairy operations subject to routine state inspection", "Health certificate for livestock imports", "RAP compliance required for all farms"],
    keyStatutes: ["6 V.S.A. § 201 (Animal Disease)", "6 V.S.A. § 4810 (RAPs)", "10 V.S.A. § 1256 (Water Quality)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── VIRGINIA ──────────────────────────────────────────────────────
  {
    name: "Virginia",
    abbreviation: "VA",
    agDepartment: {
      name: "Virginia Department of Agriculture and Consumer Services",
      website: "https://www.vdacs.virginia.gov",
      phone: "(804) 786-3501",
    },
    regulations: [
      {
        id: "va-bio-1",
        title: "Virginia Livestock Disease Control",
        citation: "Code of Virginia § 3.2-6000 et seq.",
        category: "animal-health",
        description: "Governs livestock disease reporting and control. Significant poultry, cattle, and horse industries.",
        requirements: ["Report listed diseases within 24 hours to VDACS", "NPIP compliance for commercial poultry", "Health certificate for livestock imports"],
        penalty: "Civil penalty up to $1,000; Class 1 misdemeanor",
      },
      {
        id: "va-env-1",
        title: "Virginia Agricultural Stewardship Act (VASA)",
        citation: "Code of Virginia § 10.1-559.1 et seq.",
        category: "environmental",
        description: "Governs agricultural practices affecting water quality in the Chesapeake Bay watershed. DCR has authority to require corrective action.",
        requirements: ["Comply with agricultural best management practices", "Maintain records of nutrient applications", "Correct identified water quality violations"],
        federalOverlay: "Chesapeake Bay TMDL; EPA Clean Water Act",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "Virginia Dept. of Agriculture – Office of Pesticide Services",
      recordkeepingYears: 2,
      additionalNotes: "Virginia's Chesapeake Bay watershed location creates stringent nutrient management and pesticide application requirements.",
    },
    biosecurityRequirements: ["NPIP compliance for commercial poultry", "Health certificate for livestock imports", "Chesapeake Bay riparian buffer maintenance"],
    keyStatutes: ["Code of Virginia § 3.2-6000 (Animal Health)", "Code of Virginia § 10.1-559.1 (Agricultural Stewardship)", "Code of Virginia § 3.2-3900 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── WASHINGTON ────────────────────────────────────────────────────
  {
    name: "Washington",
    abbreviation: "WA",
    agDepartment: {
      name: "Washington State Department of Agriculture",
      website: "https://agr.wa.gov",
      phone: "(360) 902-1800",
    },
    regulations: [
      {
        id: "wa-bio-1",
        title: "Washington Animal Disease Reporting",
        citation: "RCW 16.36.010 et seq.",
        category: "animal-health",
        description: "Governs livestock and poultry disease reporting. Significant dairy and tree fruit industries.",
        requirements: ["Report listed diseases within 24 hours to WSDA", "Health certificate for livestock imports", "Comply with WSDA quarantine orders"],
        penalty: "Civil penalty; gross misdemeanor",
      },
      {
        id: "wa-pest-1",
        title: "Washington Pesticide Application Act",
        citation: "RCW 17.21.010 et seq.",
        category: "pesticides",
        description: "Comprehensive pesticide regulation with specific protections for salmon-bearing waters.",
        requirements: ["Commercial pesticide applicator license from WSDA", "Salmon-safe buffer zones near water bodies", "Records for 2 years", "Notify neighbors before certain applications"],
        penalty: "Civil penalty up to $7,500 per day; criminal charges possible",
      },
      {
        id: "wa-env-1",
        title: "Washington CAFO Permit Program",
        citation: "WAC 173-216",
        category: "environmental",
        description: "CAFOs require state water quality permits and must implement nutrient management plans protecting Puget Sound and Columbia River.",
        requirements: ["NPDES permit for CAFOs above threshold", "Nutrient management plan", "Riparian buffer requirements"],
        federalOverlay: "EPA Clean Water Act; Puget Sound TMDL",
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Gyrodactylus salaris (salmon parasite)", species: ["salmon", "trout"], reportWithinHours: 48, notifyAgency: "WSDA – Shellfish & Finfish Program" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Washington State Dept. of Agriculture – Pesticide Management Division",
      recordkeepingYears: 2,
      additionalNotes: "Washington has extensive salmon-safe pesticide buffer requirements. Endangered Species Act constraints significantly affect pesticide use in the Columbia River basin.",
    },
    biosecurityRequirements: ["Health certificate for livestock imports", "Shellfish and aquaculture operations require WSDA and WDFW permits", "Salmon habitat protection compliance"],
    keyStatutes: ["RCW 16.36.010 (Animal Disease)", "RCW 17.21.010 (Pesticides)", "RCW 90.48.010 (Water Pollution Control)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── WEST VIRGINIA ─────────────────────────────────────────────────
  {
    name: "West Virginia",
    abbreviation: "WV",
    agDepartment: {
      name: "West Virginia Department of Agriculture",
      website: "https://agriculture.wv.gov",
      phone: "(304) 558-2214",
    },
    regulations: [
      {
        id: "wv-bio-1",
        title: "West Virginia Animal Disease Reporting",
        citation: "W. Va. Code § 19-9-1 et seq.",
        category: "animal-health",
        description: "Requires reporting of listed animal diseases. Beef cattle and poultry are major industries.",
        requirements: ["Report listed diseases within 24 hours to WVDA", "Health certificate for livestock imports", "Comply with WVDA quarantine orders"],
        penalty: "Civil penalty; misdemeanor",
      },
    ],
    reportableDiseases: COMMON_REPORTABLE_DISEASES,
    pesticides: {
      licenseRequired: true,
      licenseBody: "West Virginia Dept. of Agriculture – Plant Industries Division",
      recordkeepingYears: 2,
      additionalNotes: "West Virginia's karst topography creates significant groundwater protection requirements for pesticide applications.",
    },
    biosecurityRequirements: ["Health certificate for livestock imports", "NPIP compliance for commercial poultry"],
    keyStatutes: ["W. Va. Code § 19-9-1 (Animal Disease)", "W. Va. Code § 19-16A-1 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── WISCONSIN ─────────────────────────────────────────────────────
  {
    name: "Wisconsin",
    abbreviation: "WI",
    agDepartment: {
      name: "Wisconsin Department of Agriculture, Trade and Consumer Protection",
      website: "https://datcp.wi.gov",
      phone: "(608) 224-5012",
    },
    regulations: [
      {
        id: "wi-bio-1",
        title: "Wisconsin Animal Disease Control",
        citation: "Wis. Stat. § 95.001 et seq.",
        category: "animal-health",
        description: "Comprehensive disease control. Wisconsin is a leading dairy state with specific Grade A milk standards and animal health requirements.",
        requirements: ["Report listed diseases within 24 hours to DATCP", "Dairy operations subject to routine state inspection", "Health certificate for livestock imports", "CWD testing for farmed cervids"],
        penalty: "Civil penalty; Class A misdemeanor",
      },
      {
        id: "wi-env-1",
        title: "Wisconsin Livestock Facility Siting Law",
        citation: "Wis. Stat. § 93.90 et seq.",
        category: "environmental",
        description: "Establishes a statewide siting standard for new or expanded livestock operations above 500 animal units.",
        requirements: ["County review for new or expanded operations ≥ 500 AU", "Compliance with state performance standards", "Manure management plan"],
        federalOverlay: "EPA Clean Water Act; Wisconsin WPDES program",
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Chronic Wasting Disease (CWD) – Farmed Cervids", species: ["deer", "elk"], reportWithinHours: 48, notifyAgency: "Wisconsin DATCP + DNR" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Wisconsin Dept. of Agriculture – Trade and Consumer Protection – Pesticide and Fertilizer Management",
      recordkeepingYears: 2,
      additionalNotes: "Wisconsin has groundwater protection standards that restrict certain pesticide applications in vulnerable areas.",
    },
    biosecurityRequirements: ["Dairy operations subject to routine DATCP inspection", "CWD testing required for farmed cervid mortalities", "Health certificate for livestock imports", "Grade A dairy operations must meet DATCP milk standards"],
    keyStatutes: ["Wis. Stat. § 95.001 (Animal Disease)", "Wis. Stat. § 93.90 (Livestock Siting)", "Wis. Stat. § 94.67 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },

  // ── WYOMING ───────────────────────────────────────────────────────
  {
    name: "Wyoming",
    abbreviation: "WY",
    agDepartment: {
      name: "Wyoming Livestock Board",
      website: "https://wlsb.wyo.gov",
      phone: "(307) 777-7515",
    },
    regulations: [
      {
        id: "wy-bio-1",
        title: "Wyoming Livestock Disease Control",
        citation: "Wyo. Stat. § 11-19-101 et seq.",
        category: "animal-health",
        description: "Wyoming Livestock Board oversees disease control and brand inspection for the state's extensive cattle and sheep ranching industry.",
        requirements: ["Report listed diseases within 24 hours to WLB", "Brand registration and inspection required for cattle, horses, and sheep", "Health certificate for livestock imports", "Brucellosis testing for cattle from GYA"],
        penalty: "Misdemeanor; civil penalty",
      },
      {
        id: "wy-pest-1",
        title: "Wyoming Pesticide Act",
        citation: "Wyo. Stat. § 35-7-301 et seq.",
        category: "pesticides",
        description: "Governs pesticide registration and applicator certification in Wyoming.",
        requirements: ["Commercial applicator license from WDA", "Private applicator certification for RUPs", "Records for 2 years"],
      },
    ],
    reportableDiseases: [
      ...COMMON_REPORTABLE_DISEASES,
      { name: "Brucellosis – Greater Yellowstone Interface", species: ["cattle", "bison", "elk"], reportWithinHours: 24, notifyAgency: "Wyoming Livestock Board + USDA APHIS" },
    ],
    pesticides: {
      licenseRequired: true,
      licenseBody: "Wyoming Dept. of Agriculture – Consumer Health Services",
      recordkeepingYears: 2,
      additionalNotes: "Wyoming's open range ranching environment has specific requirements for range improvement pesticide use.",
    },
    biosecurityRequirements: ["Brand registration and inspection required for cattle, horses, sheep", "Brucellosis testing for cattle near Yellowstone", "Health certificate for livestock imports", "Greater Yellowstone Area brucellosis management plan compliance"],
    keyStatutes: ["Wyo. Stat. § 11-19-101 (Livestock Disease)", "Wyo. Stat. § 35-7-301 (Pesticides)"],
    federalPrograms: FEDERAL_PROGRAMS,
  },
]

export function getStateByAbbreviation(abbreviation: string): StateCompliance | undefined {
  return US_STATES.find((s) => s.abbreviation === abbreviation.toUpperCase())
}

export function getStatesByCategory(category: string): StateCompliance[] {
  return US_STATES.filter((s) => s.regulations.some((r) => r.category === category))
}

export function searchStates(query: string): StateCompliance[] {
  const q = query.toLowerCase()
  return US_STATES.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.regulations.some((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)),
  )
}
