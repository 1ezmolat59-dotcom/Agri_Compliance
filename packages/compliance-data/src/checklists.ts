import type { ChecklistItem } from "./types"

export const DEFAULT_CHECKLIST_ITEMS: ChecklistItem[] = [
  // ── Daily Biosecurity ──────────────────────────────────────────────
  {
    id: "bio-001",
    title: "Restrict farm access to authorized personnel only",
    description:
      "Ensure all entry points are secured. Verify that signs indicating biosecurity zones are posted and legible.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["all"],
    regulatoryBasis: "USDA APHIS Biosecurity Guidelines; state animal health codes",
  },
  {
    id: "bio-002",
    title: "Log all farm visitors",
    description:
      "Record visitor name, contact information, purpose of visit, and previous farm contact within 48 hours.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["all"],
    regulatoryBasis: "State biosecurity laws; USDA APHIS Premises Registration",
  },
  {
    id: "bio-003",
    title: "Inspect and disinfect all incoming vehicles and equipment",
    description:
      "Apply approved disinfectant to tires, wheel wells, and exterior surfaces of all vehicles entering production areas.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "National Biosecurity Guidelines; USDA APHIS",
  },
  {
    id: "bio-004",
    title: "Require PPE (boot covers, coveralls) for all barn entries",
    description:
      "All persons entering animal housing must use appropriate personal protective equipment. Document any non-compliance.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
  },
  {
    id: "bio-005",
    title: "Check perimeter fencing for breaches",
    description:
      "Walk the perimeter or use camera system to identify gaps, damaged sections, or unauthorized entry points.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["all"],
  },
  {
    id: "bio-006",
    title: "Inspect for signs of wildlife intrusion",
    description:
      "Look for tracks, droppings, or physical damage indicating wildlife contact with feed, water, or animal areas.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine", "crop"],
  },

  // ── Animal Health ──────────────────────────────────────────────────
  {
    id: "ah-001",
    title: "Conduct morning animal health observation",
    description:
      "Walk all animal housing areas and observe for abnormal behavior, respiratory signs, lameness, diarrhea, or unexplained deaths.",
    category: "animal-health",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "State veterinary codes; USDA APHIS Animal Disease Traceability",
  },
  {
    id: "ah-002",
    title: "Record all mortalities with date, species, and probable cause",
    description:
      "Document each mortality event. Retain carcasses for veterinary review if cause is unknown or suspicious.",
    category: "animal-health",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "State animal health codes; USDA APHIS reporting requirements",
  },
  {
    id: "ah-003",
    title: "Check and record body condition scores",
    description: "Assess body condition for a representative sample of animals and record findings in the health log.",
    category: "animal-health",
    frequency: "weekly",
    required: true,
    applicableTo: ["livestock", "dairy"],
  },
  {
    id: "ah-004",
    title: "Record all medication treatments administered",
    description:
      "Log animal ID, drug name, dosage, route of administration, withdrawal period, and administering person for every treatment.",
    category: "animal-health",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "FDA VFD regulations; FSMA; state veterinary drug regulations",
  },
  {
    id: "ah-005",
    title: "Verify withdrawal periods before slaughter or milk sale",
    description:
      "Confirm all drug withdrawal periods have been met for animals entering the food chain or for milk being sold.",
    category: "animal-health",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "dairy", "swine"],
    regulatoryBasis: "FDA; USDA FSIS; state milk safety regulations",
  },
  {
    id: "ah-006",
    title: "Report any suspected reportable disease to state veterinarian",
    description:
      "If any animal shows signs consistent with a reportable disease, notify the State Veterinarian immediately (within 24 hours).",
    category: "animal-health",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "All state animal health codes; federal Animal Health Protection Act",
  },

  // ── Feed & Water ───────────────────────────────────────────────────
  {
    id: "fw-001",
    title: "Inspect feed storage areas for pests, moisture, and mold",
    description:
      "Check all feed storage bins, bags, and silage for evidence of rodents, birds, moisture intrusion, or visible mold.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "FDA FSMA Preventive Controls for Animal Food",
  },
  {
    id: "fw-002",
    title: "Test water source quality (monthly sample submission)",
    description: "Collect monthly water samples from primary drinking water sources and submit for laboratory analysis.",
    category: "water-quality",
    frequency: "monthly",
    required: true,
    applicableTo: ["all"],
    regulatoryBasis: "EPA Safe Drinking Water Act; state agricultural water standards; FSMA",
  },
  {
    id: "fw-003",
    title: "Inspect water delivery systems for contamination risk",
    description:
      "Check all water lines, nipple drinkers, troughs, and tanks for algae, biofilm, dead animals, or backflow risk.",
    category: "water-quality",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
  },
  {
    id: "fw-004",
    title: "Verify feed nutritional labels and expiration dates",
    description:
      "Check all purchased feeds for lot numbers, expiration dates, and proper medicated-feed labeling (if applicable).",
    category: "recordkeeping",
    frequency: "weekly",
    required: false,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "FDA 21 CFR Part 558; VFD regulations",
  },

  // ── Pesticides & Chemicals ─────────────────────────────────────────
  {
    id: "pest-001",
    title: "Inspect pesticide storage area for leaks, labels, and security",
    description:
      "Verify locked storage, intact labels on all containers, secondary containment integrity, and no expired products.",
    category: "pesticides",
    frequency: "daily",
    required: true,
    applicableTo: ["crop", "mixed", "organic"],
    regulatoryBasis: "EPA FIFRA; state pesticide regulations",
  },
  {
    id: "pest-002",
    title: "Log all pesticide applications (crop, date, rate, applicator)",
    description:
      "Record product name, EPA registration number, crop/site treated, application rate, date, weather conditions, and applicator name/license number.",
    category: "pesticides",
    frequency: "daily",
    required: true,
    applicableTo: ["crop", "mixed"],
    regulatoryBasis: "EPA FIFRA; state pesticide recordkeeping laws (2-year retention standard)",
  },
  {
    id: "pest-003",
    title: "Verify pesticide applicator license is current",
    description:
      "Confirm that all personnel applying restricted-use pesticides hold a valid, current state applicator license.",
    category: "pesticides",
    frequency: "monthly",
    required: true,
    applicableTo: ["crop", "mixed"],
    regulatoryBasis: "EPA FIFRA § 11; state pesticide laws",
  },
  {
    id: "pest-004",
    title: "Check pre-harvest intervals (PHI) for all pesticides applied",
    description:
      "Ensure no crop is harvested before the pre-harvest interval on the pesticide label has been met.",
    category: "pesticides",
    frequency: "daily",
    required: true,
    applicableTo: ["crop", "mixed", "organic"],
    regulatoryBasis: "EPA FIFRA; FDA pesticide residue tolerances",
  },

  // ── Sanitation & Waste ─────────────────────────────────────────────
  {
    id: "san-001",
    title: "Clean and disinfect equipment between uses or animal groups",
    description: "Apply USDA-approved disinfectant to all reused equipment. Document cleaning date and product used.",
    category: "biosecurity",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "State biosecurity regulations; USDA APHIS cleaning standards",
  },
  {
    id: "san-002",
    title: "Properly dispose of dead animals per state regulations",
    description:
      "Use approved disposal method (rendering, composting, burial, incineration) within state-mandated timeframe.",
    category: "environmental",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "poultry", "dairy", "swine"],
    regulatoryBasis: "State dead animal disposal laws; EPA regulations",
  },
  {
    id: "san-003",
    title: "Inspect manure storage and management system",
    description:
      "Check manure lagoons, pits, or composting areas for overflow, structural integrity, and setback compliance.",
    category: "environmental",
    frequency: "weekly",
    required: true,
    applicableTo: ["livestock", "dairy", "swine"],
    regulatoryBasis: "EPA CAFO rules; state nutrient management plans; Clean Water Act",
  },
  {
    id: "san-004",
    title: "Review nutrient management plan compliance",
    description:
      "Compare current manure/fertilizer applications against the approved nutrient management plan rates and setbacks.",
    category: "environmental",
    frequency: "monthly",
    required: true,
    applicableTo: ["livestock", "dairy", "swine", "crop"],
    regulatoryBasis: "State nutrient management laws; EPA CAFO regulations",
  },

  // ── Worker Safety ──────────────────────────────────────────────────
  {
    id: "ws-001",
    title: "Post Worker Protection Standard (WPS) safety information",
    description:
      "Ensure WPS materials (central posting, pesticide application information, emergency contacts) are current and accessible.",
    category: "worker-safety",
    frequency: "daily",
    required: true,
    applicableTo: ["crop", "mixed"],
    regulatoryBasis: "EPA Worker Protection Standard (40 CFR Part 170)",
  },
  {
    id: "ws-002",
    title: "Conduct daily safety briefing for field workers",
    description:
      "Brief workers on pesticide applications, restricted entry intervals (REI), heat safety, and emergency procedures.",
    category: "worker-safety",
    frequency: "daily",
    required: true,
    applicableTo: ["crop", "mixed"],
    regulatoryBasis: "EPA WPS; OSHA 29 CFR 1928 (agricultural standards)",
  },
  {
    id: "ws-003",
    title: "Verify PPE availability and condition for all chemical handlers",
    description:
      "Inspect gloves, goggles, respirators, and protective clothing assigned to pesticide handlers. Replace damaged items.",
    category: "worker-safety",
    frequency: "daily",
    required: true,
    applicableTo: ["crop", "mixed"],
    regulatoryBasis: "EPA WPS; OSHA 29 CFR 1928.102",
  },

  // ── Recordkeeping ──────────────────────────────────────────────────
  {
    id: "rec-001",
    title: "Update animal inventory and movement records",
    description:
      "Record all animal births, deaths, purchases, sales, and movements with dates, premises IDs, and documentation.",
    category: "recordkeeping",
    frequency: "daily",
    required: true,
    applicableTo: ["livestock", "dairy", "swine"],
    regulatoryBasis: "USDA Animal Disease Traceability (ADT) rule; state tagging laws",
  },
  {
    id: "rec-002",
    title: "Back up farm compliance records (digital or physical copies)",
    description:
      "Ensure all production, health, pesticide, and financial records have a secure backup. Records must be retained per regulation.",
    category: "recordkeeping",
    frequency: "weekly",
    required: true,
    applicableTo: ["all"],
    regulatoryBasis: "FSMA (2-year retention); EPA FIFRA (2-year retention); state law",
  },
  {
    id: "rec-003",
    title: "Review and file daily production logs",
    description:
      "Compile daily milk weights, egg production, feed consumption, or crop harvest data and file in the farm management system.",
    category: "recordkeeping",
    frequency: "daily",
    required: false,
    applicableTo: ["dairy", "poultry", "crop"],
  },

  // ── Environmental ──────────────────────────────────────────────────
  {
    id: "env-001",
    title: "Inspect fields for runoff and erosion after rain events",
    description:
      "Following significant precipitation, assess fields for soil erosion, nutrient runoff paths, and drainage issues.",
    category: "environmental",
    frequency: "daily",
    required: true,
    applicableTo: ["crop", "mixed", "livestock"],
    regulatoryBasis: "EPA Clean Water Act; state stormwater regulations",
  },
  {
    id: "env-002",
    title: "Monitor well water levels and quality near livestock areas",
    description:
      "Check water well levels and inspect well heads for signs of contamination from manure or chemical runoff.",
    category: "water-quality",
    frequency: "weekly",
    required: true,
    applicableTo: ["livestock", "dairy", "swine"],
    regulatoryBasis: "EPA Safe Drinking Water Act; state groundwater protection laws",
  },
]

export const CHECKLIST_CATEGORIES = [
  { id: "biosecurity", label: "Biosecurity", color: "#dc2626" },
  { id: "animal-health", label: "Animal Health", color: "#16a34a" },
  { id: "pesticides", label: "Pesticides", color: "#d97706" },
  { id: "water-quality", label: "Water Quality", color: "#2563eb" },
  { id: "worker-safety", label: "Worker Safety", color: "#7c3aed" },
  { id: "food-safety", label: "Food Safety", color: "#db2777" },
  { id: "environmental", label: "Environmental", color: "#059669" },
  { id: "recordkeeping", label: "Recordkeeping", color: "#6b7280" },
  { id: "movement-permits", label: "Movement Permits", color: "#0891b2" },
  { id: "organic", label: "Organic", color: "#65a30d" },
] as const
