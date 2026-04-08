import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { authOptions } from "@/lib/auth"
import { db, farms } from "@/lib/db"
import { AiChatClient } from "./ai-chat-client"

export const metadata = { title: "AI Compliance Assistant" }

export default async function AiAssistantPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/sign-in")

  const farm = await db.query.farms.findFirst({
    where: eq(farms.userId, session.user.id),
  })

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Compliance Assistant</h1>
        <p className="text-sm text-gray-500 mt-1">
          Ask plain-English questions about agricultural regulations, biosecurity, and compliance.
          {farm && ` Answers are tailored to ${farm.stateAbbreviation} regulations.`}
        </p>
      </div>
      <AiChatClient
        stateAbbreviation={farm?.stateAbbreviation ?? "US"}
        farmType={farm?.farmType ?? "mixed"}
        farmName={farm?.name}
      />
    </div>
  )
}
