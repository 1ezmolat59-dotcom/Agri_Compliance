import { streamText } from "ai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { getServerSession } from "next-auth"
import { NextRequest } from "next/server"
import { authOptions } from "@/lib/auth"
import { getStateByAbbreviation } from "@agriguard/compliance-data"

export const maxDuration = 60

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const { messages, stateAbbreviation, farmType, farmName } = await req.json()

  const stateData = stateAbbreviation ? getStateByAbbreviation(stateAbbreviation) : null
  const stateContext = stateData
    ? `
State: ${stateData.name} (${stateData.abbreviation})
State Dept of Agriculture: ${stateData.agDepartment.name} — ${stateData.agDepartment.phone}
Key regulations: ${stateData.regulations.map((r) => `${r.title} (${r.citation})`).join("; ")}
Reportable diseases: ${stateData.reportableDiseases.slice(0, 8).map((d) => d.name).join(", ")}
Pesticide license required: ${stateData.pesticides.licenseRequired ? "Yes" : "No"} — ${stateData.pesticides.licenseBody}
Pesticide records retention: ${stateData.pesticides.recordkeepingYears} years
Biosecurity requirements: ${stateData.biosecurityRequirements.join("; ")}
`
    : "State: Not specified — provide general U.S. federal guidance"

  const systemPrompt = `You are AgriGuard's AI Compliance Assistant — an expert in U.S. agricultural biosecurity and regulatory compliance for small and mid-size farms.

FARM CONTEXT:
- Farm name: ${farmName ?? "Unknown"}
- Farm type: ${farmType ?? "mixed"}
- ${stateContext}

YOUR ROLE:
- Help farmers understand their biosecurity and regulatory obligations
- Explain regulations in plain English, avoiding jargon
- Always cite the specific law, statute, or agency when referencing a requirement
- When you mention a reportable disease, always state the reporting timeline (e.g., "within 24 hours")
- For pesticide questions, always note whether a license is required and which body issues it
- Remind users that your guidance is informational — they should verify with their State Veterinarian or Dept of Agriculture for official decisions
- Be concise but thorough. Use bullet points for lists of requirements.
- If asked about something outside your expertise (non-agricultural topics), politely redirect to compliance questions.

IMPORTANT DISCLAIMERS TO INCLUDE:
- Always note when something requires verification with official agencies
- State law can change — recommend checking the state ag department website for current info
- You are not a licensed attorney or veterinarian — always recommend consulting qualified professionals for complex situations`

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
