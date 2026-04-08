import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { and, eq } from "drizzle-orm"
import { z } from "zod"
import { authOptions } from "@/lib/auth"
import { db, farms, visitorLog } from "@/lib/db"

const schema = z.object({
  farmId: z.string().uuid(),
  visitorName: z.string().min(1).max(255),
  organization: z.string().max(255).optional(),
  purpose: z.string().min(1),
  previousFarmContact: z.boolean().default(false),
  previousFarmDetails: z.string().optional(),
  visitDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  entryTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  exitTime: z.string().regex(/^\d{2}:\d{2}$/).optional(),
  ppeUsed: z.boolean().default(false),
  vehicleDisinfected: z.boolean().default(false),
  contactPhone: z.string().max(20).optional(),
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 })

  const { farmId, ...data } = parsed.data

  const farm = await db.query.farms.findFirst({
    where: and(eq(farms.id, farmId), eq(farms.userId, session.user.id)),
  })
  if (!farm) return NextResponse.json({ error: "Farm not found" }, { status: 404 })

  const [entry] = await db.insert(visitorLog).values({ farmId, ...data }).returning()

  return NextResponse.json({ success: true, id: entry.id }, { status: 201 })
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

  // Verify ownership via farm join
  const entry = await db.query.visitorLog.findFirst({
    where: eq(visitorLog.id, id),
    with: { farm: true },
  })
  if (!entry || entry.farm.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  await db.delete(visitorLog).where(eq(visitorLog.id, id))
  return NextResponse.json({ success: true })
}
