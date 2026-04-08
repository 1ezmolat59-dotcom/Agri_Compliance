import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Phone,
  Globe,
  AlertTriangle,
  Shield,
  Droplets,
  Bug,
  HardHat,
  FileText,
  Clock,
} from "lucide-react"
import { getStateByAbbreviation } from "@agriguard/compliance-data"

export async function generateStaticParams() {
  const abbrs = [
    "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
    "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
    "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
    "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
    "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
  ]
  return abbrs.map((state) => ({ state }))
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params
  const data = getStateByAbbreviation(state)
  if (!data) return { title: "State Not Found" }
  return { title: `${data.name} Compliance` }
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  biosecurity: Shield,
  "animal-health": AlertTriangle,
  pesticides: Bug,
  "water-quality": Droplets,
  "worker-safety": HardHat,
  environmental: Droplets,
  recordkeeping: FileText,
}

export default async function StatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state: stateAbbr } = await params
  const data = getStateByAbbreviation(stateAbbr)

  if (!data) notFound()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/compliance"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All States
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-4xl font-black text-farm-700">{data.abbreviation}</span>
              <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            </div>
            <p className="text-sm text-gray-500">{data.agDepartment.name}</p>
          </div>
          <div className="sm:ml-auto flex gap-3">
            <a
              href={`tel:${data.agDepartment.phone}`}
              className="flex items-center gap-2 bg-farm-50 border border-farm-200 text-farm-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-farm-100 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {data.agDepartment.phone}
            </a>
            <a
              href={data.agDepartment.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <Globe className="h-4 w-4" />
              Website
            </a>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-red-700">{data.reportableDiseases.length}</div>
          <div className="text-sm text-red-600 font-medium mt-0.5">Reportable Diseases</div>
          <div className="text-xs text-red-500 mt-1">Must notify within 24–48 hrs</div>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-700">{data.regulations.length}</div>
          <div className="text-sm text-blue-600 font-medium mt-0.5">Key Regulations</div>
          <div className="text-xs text-blue-500 mt-1">State-specific laws</div>
        </div>
        <div className="bg-farm-50 border border-farm-100 rounded-xl p-4">
          <div className="text-2xl font-bold text-farm-700">{data.pesticides.recordkeepingYears}yr</div>
          <div className="text-sm text-farm-600 font-medium mt-0.5">Pesticide Records</div>
          <div className="text-xs text-farm-500 mt-1">Minimum retention period</div>
        </div>
      </div>

      {/* Regulations */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Key Regulations</h2>
        <div className="space-y-4">
          {data.regulations.map((reg) => {
            const Icon = CATEGORY_ICONS[reg.category] ?? Shield
            return (
              <div key={reg.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-farm-50 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-farm-700" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">{reg.title}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {reg.citation}
                      </span>
                      <span className="text-xs bg-farm-50 text-farm-700 px-2 py-0.5 rounded-full capitalize">
                        {reg.category.replace("-", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{reg.description}</p>
                    <div className="space-y-1.5">
                      {reg.requirements.map((req, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-farm-600 mt-0.5 shrink-0">✓</span>
                          <span className="text-gray-700">{req}</span>
                        </div>
                      ))}
                    </div>
                    {reg.penalty && (
                      <div className="mt-4 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs text-red-700">
                        <strong>Penalty:</strong> {reg.penalty}
                      </div>
                    )}
                    {reg.federalOverlay && (
                      <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs text-blue-700">
                        <strong>Federal overlay:</strong> {reg.federalOverlay}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Reportable Diseases */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Reportable Diseases</h2>
        <p className="text-sm text-gray-500 mb-4">
          Report these diseases immediately upon suspicion to {data.agDepartment.phone}
        </p>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Disease</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">Species</th>
                  <th className="text-left px-6 py-3 font-semibold text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      Report Within
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.reportableDiseases.map((disease, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">{disease.name}</td>
                    <td className="px-6 py-3 text-gray-600">{disease.species.join(", ")}</td>
                    <td className="px-6 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        disease.reportWithinHours <= 24
                          ? "bg-red-50 text-red-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}>
                        {disease.reportWithinHours}h
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Biosecurity Requirements */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Biosecurity Requirements</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <ul className="space-y-3">
            {data.biosecurityRequirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-sm">
                <Shield className="h-4 w-4 text-farm-600 mt-0.5 shrink-0" />
                <span className="text-gray-700">{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pesticides */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Pesticide Regulations</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">License Required</div>
              <div className={`font-semibold ${data.pesticides.licenseRequired ? "text-red-600" : "text-green-600"}`}>
                {data.pesticides.licenseRequired ? "Yes — required for RUPs" : "No"}
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Licensing Body</div>
              <div className="text-sm text-gray-900">{data.pesticides.licenseBody}</div>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Recordkeeping</div>
              <div className="font-semibold text-gray-900">{data.pesticides.recordkeepingYears} years minimum</div>
            </div>
          </div>
          {data.pesticides.additionalNotes && (
            <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 text-sm text-amber-800">
              <strong>Note:</strong> {data.pesticides.additionalNotes}
            </div>
          )}
        </div>
      </section>

      {/* Federal Programs */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 mb-4">Federal Programs Applicable</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <ul className="space-y-2">
            {data.federalPrograms.map((prog, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-farm-500 shrink-0" />
                {prog}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <p className="text-xs text-gray-400 text-center pb-4">
        This information is for educational purposes only. Always consult the{" "}
        {data.agDepartment.name} at {data.agDepartment.phone} for official guidance.
      </p>
    </div>
  )
}
