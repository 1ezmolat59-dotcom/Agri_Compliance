import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { db, farms } from "@/lib/db"
import { US_STATES } from "@agriguard/compliance-data"
import { MapPin, Search, ExternalLink, ArrowRight } from "lucide-react"

export const metadata = { title: "Compliance" }

export default async function CompliancePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) redirect("/sign-in")

  const params = await searchParams
  const query = params.q?.toLowerCase() ?? ""

  const farm = await db.query.farms.findFirst({
    where: eq(farms.userId, session.user.id),
  })

  const filteredStates = query
    ? US_STATES.filter(
        (s) =>
          s.name.toLowerCase().includes(query) ||
          s.abbreviation.toLowerCase().includes(query) ||
          s.regulations.some(
            (r) =>
              r.title.toLowerCase().includes(query) ||
              r.description.toLowerCase().includes(query),
          ),
      )
    : US_STATES

  const userState = farm?.stateAbbreviation

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">50-State Compliance Database</h1>
        <p className="text-sm text-gray-500 mt-1">
          Agricultural regulations, biosecurity laws, and reportable disease requirements for every U.S. state.
        </p>
      </div>

      {/* User's state callout */}
      {userState && (
        <Link
          href={`/compliance/${userState}`}
          className="flex items-center justify-between bg-farm-50 border border-farm-200 rounded-2xl px-6 py-4 hover:bg-farm-100 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-farm-700" />
            <div>
              <p className="font-semibold text-farm-900">Your state: {US_STATES.find(s => s.abbreviation === userState)?.name}</p>
              <p className="text-sm text-farm-700">View all regulations, reportable diseases, and contacts for {userState}</p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-farm-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}

      {/* Search */}
      <form className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Search states, regulations, or topics…"
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-farm-600 text-gray-900"
        />
      </form>

      <p className="text-sm text-gray-500">{filteredStates.length} states</p>

      {/* State grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStates.map((state) => (
          <Link
            key={state.abbreviation}
            href={`/compliance/${state.abbreviation}`}
            className={`bg-white rounded-2xl border shadow-sm p-5 hover:shadow-md transition-all group ${
              state.abbreviation === userState
                ? "border-farm-300 ring-1 ring-farm-300"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-2xl font-bold text-gray-900">{state.abbreviation}</div>
                <div className="text-sm text-gray-600 font-medium">{state.name}</div>
              </div>
              {state.abbreviation === userState && (
                <span className="text-xs bg-farm-100 text-farm-700 px-2 py-1 rounded-full font-medium">
                  Your state
                </span>
              )}
            </div>
            <div className="space-y-1.5 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {state.reportableDiseases.length} reportable diseases
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {state.regulations.length} key regulations
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                {state.pesticides.licenseRequired ? "Pesticide license required" : "No license required"}
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium text-farm-700 group-hover:gap-2 transition-all gap-1">
              <ExternalLink className="h-3.5 w-3.5" />
              View full regulations
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
