import { NextRequest, NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { z } from "zod"
import { db, users, farms } from "@/lib/db"
import { createUser } from "@/lib/auth"

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  farmName: z.string().min(2).max(200),
  state: z.string().length(2),
  farmType: z.enum(["livestock","poultry","crop","dairy","swine","aquaculture","mixed","organic"]),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })
    }

    const { name, email, password, farmName, state, farmType } = parsed.data

    const existing = await db.query.users.findFirst({ where: eq(users.email, email.toLowerCase()) })
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 })
    }

    const user = await createUser(name, email, password)

    await db.insert(farms).values({
      userId: user.id,
      name: farmName,
      stateAbbreviation: state.toUpperCase(),
      farmType,
    })

    return NextResponse.json({ success: true, userId: user.id }, { status: 201 })
  } catch (err) {
    console.error("Registration error:", err)
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 })
  }
}
