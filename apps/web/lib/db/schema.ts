import { relations } from "drizzle-orm"
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core"

// ── Enums ────────────────────────────────────────────────────────────

export const farmTypeEnum = pgEnum("farm_type", [
  "livestock",
  "poultry",
  "crop",
  "dairy",
  "swine",
  "aquaculture",
  "mixed",
  "organic",
])

export const checklistFrequencyEnum = pgEnum("checklist_frequency", [
  "daily",
  "weekly",
  "monthly",
])

export const reportStatusEnum = pgEnum("report_status", [
  "draft",
  "completed",
  "submitted",
])

// ── Users ────────────────────────────────────────────────────────────

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("users_email_idx").on(t.email)],
)

// ── Farms ────────────────────────────────────────────────────────────

export const farms = pgTable("farms", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  stateAbbreviation: varchar("state_abbreviation", { length: 2 }).notNull(),
  county: varchar("county", { length: 100 }),
  farmType: farmTypeEnum("farm_type").notNull().default("mixed"),
  acreage: integer("acreage"),
  animalUnits: integer("animal_units"),
  premisesId: varchar("premises_id", { length: 50 }), // USDA PIN
  address: text("address"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ── Checklist Completions ─────────────────────────────────────────────

export const checklistCompletions = pgTable(
  "checklist_completions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    farmId: uuid("farm_id")
      .notNull()
      .references(() => farms.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    checklistItemId: varchar("checklist_item_id", { length: 50 }).notNull(),
    completedAt: timestamp("completed_at").defaultNow().notNull(),
    date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD
    notes: text("notes"),
  },
  (t) => [
    index("completions_farm_date_idx").on(t.farmId, t.date),
    index("completions_user_date_idx").on(t.userId, t.date),
  ],
)

// ── Streaks ───────────────────────────────────────────────────────────

export const streaks = pgTable("streaks", {
  id: uuid("id").defaultRandom().primaryKey(),
  farmId: uuid("farm_id")
    .notNull()
    .references(() => farms.id, { onDelete: "cascade" })
    .unique(),
  currentStreak: integer("current_streak").notNull().default(0),
  longestStreak: integer("longest_streak").notNull().default(0),
  lastCompletedDate: varchar("last_completed_date", { length: 10 }), // YYYY-MM-DD
  totalDaysCompleted: integer("total_days_completed").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})

// ── Compliance Notes ──────────────────────────────────────────────────

export const complianceNotes = pgTable(
  "compliance_notes",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    farmId: uuid("farm_id")
      .notNull()
      .references(() => farms.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    stateAbbreviation: varchar("state_abbreviation", { length: 2 }),
    regulationId: varchar("regulation_id", { length: 50 }),
    title: varchar("title", { length: 255 }).notNull(),
    content: text("content").notNull(),
    isResolved: boolean("is_resolved").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (t) => [index("notes_farm_idx").on(t.farmId)],
)

// ── Audit Reports ─────────────────────────────────────────────────────

export const auditReports = pgTable(
  "audit_reports",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    farmId: uuid("farm_id")
      .notNull()
      .references(() => farms.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    periodStart: varchar("period_start", { length: 10 }).notNull(), // YYYY-MM-DD
    periodEnd: varchar("period_end", { length: 10 }).notNull(), // YYYY-MM-DD
    status: reportStatusEnum("status").notNull().default("draft"),
    totalItems: integer("total_items").notNull().default(0),
    completedItems: integer("completed_items").notNull().default(0),
    complianceScore: integer("compliance_score"), // 0-100
    notes: text("notes"),
    generatedAt: timestamp("generated_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("reports_farm_idx").on(t.farmId)],
)

// ── Visitor Log ───────────────────────────────────────────────────────

export const visitorLog = pgTable(
  "visitor_log",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    farmId: uuid("farm_id")
      .notNull()
      .references(() => farms.id, { onDelete: "cascade" }),
    visitorName: varchar("visitor_name", { length: 255 }).notNull(),
    organization: varchar("organization", { length: 255 }),
    purpose: text("purpose").notNull(),
    previousFarmContact: boolean("previous_farm_contact").notNull().default(false),
    previousFarmDetails: text("previous_farm_details"),
    visitDate: varchar("visit_date", { length: 10 }).notNull(), // YYYY-MM-DD
    entryTime: varchar("entry_time", { length: 5 }), // HH:MM
    exitTime: varchar("exit_time", { length: 5 }),
    ppeUsed: boolean("ppe_used").notNull().default(false),
    vehicleDisinfected: boolean("vehicle_disinfected").notNull().default(false),
    contactPhone: varchar("contact_phone", { length: 20 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("visitor_farm_date_idx").on(t.farmId, t.visitDate)],
)

// ── Relations ─────────────────────────────────────────────────────────

export const usersRelations = relations(users, ({ many }) => ({
  farms: many(farms),
  checklistCompletions: many(checklistCompletions),
  complianceNotes: many(complianceNotes),
  auditReports: many(auditReports),
}))

export const farmsRelations = relations(farms, ({ one, many }) => ({
  user: one(users, { fields: [farms.userId], references: [users.id] }),
  checklistCompletions: many(checklistCompletions),
  streak: one(streaks, { fields: [farms.id], references: [streaks.farmId] }),
  complianceNotes: many(complianceNotes),
  auditReports: many(auditReports),
  visitorLog: many(visitorLog),
}))

export const streaksRelations = relations(streaks, ({ one }) => ({
  farm: one(farms, { fields: [streaks.farmId], references: [farms.id] }),
}))

// ── Types ─────────────────────────────────────────────────────────────

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Farm = typeof farms.$inferSelect
export type NewFarm = typeof farms.$inferInsert
export type ChecklistCompletion = typeof checklistCompletions.$inferSelect
export type NewChecklistCompletion = typeof checklistCompletions.$inferInsert
export type Streak = typeof streaks.$inferSelect
export type ComplianceNote = typeof complianceNotes.$inferSelect
export type AuditReport = typeof auditReports.$inferSelect
export type VisitorLog = typeof visitorLog.$inferSelect
