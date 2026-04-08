"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Leaf, Loader2 } from "lucide-react"

const FARM_TYPES = [
  { value: "livestock", label: "Livestock (cattle, sheep, goats)" },
  { value: "poultry", label: "Poultry (chickens, turkeys)" },
  { value: "dairy", label: "Dairy" },
  { value: "swine", label: "Swine" },
  { value: "crop", label: "Crop farming" },
  { value: "mixed", label: "Mixed / Multiple types" },
  { value: "organic", label: "Organic" },
  { value: "aquaculture", label: "Aquaculture" },
]

const US_STATES = [
  ["AL","Alabama"],["AK","Alaska"],["AZ","Arizona"],["AR","Arkansas"],["CA","California"],
  ["CO","Colorado"],["CT","Connecticut"],["DE","Delaware"],["FL","Florida"],["GA","Georgia"],
  ["HI","Hawaii"],["ID","Idaho"],["IL","Illinois"],["IN","Indiana"],["IA","Iowa"],
  ["KS","Kansas"],["KY","Kentucky"],["LA","Louisiana"],["ME","Maine"],["MD","Maryland"],
  ["MA","Massachusetts"],["MI","Michigan"],["MN","Minnesota"],["MS","Mississippi"],["MO","Missouri"],
  ["MT","Montana"],["NE","Nebraska"],["NV","Nevada"],["NH","New Hampshire"],["NJ","New Jersey"],
  ["NM","New Mexico"],["NY","New York"],["NC","North Carolina"],["ND","North Dakota"],["OH","Ohio"],
  ["OK","Oklahoma"],["OR","Oregon"],["PA","Pennsylvania"],["RI","Rhode Island"],["SC","South Carolina"],
  ["SD","South Dakota"],["TN","Tennessee"],["TX","Texas"],["UT","Utah"],["VT","Vermont"],
  ["VA","Virginia"],["WA","Washington"],["WV","West Virginia"],["WI","Wisconsin"],["WY","Wyoming"],
]

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [farmName, setFarmName] = useState("")
  const [state, setState] = useState("")
  const [farmType, setFarmType] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, farmName, state, farmType }),
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error ?? "Registration failed. Please try again.")
        setLoading(false)
        return
      }

      // Auto-sign in
      const { signIn } = await import("next-auth/react")
      await signIn("credentials", { email, password, redirect: false })
      router.push("/dashboard")
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl gradient-farm mb-4">
            <Leaf className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 ? "Create your account" : "Set up your farm"}
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            {step === 1 ? "Free forever for one farm" : "We'll customize compliance tracking for you"}
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          <div className="flex-1 h-1.5 rounded-full bg-farm-600" />
          <div className={`flex-1 h-1.5 rounded-full ${step === 2 ? "bg-farm-600" : "bg-gray-100"}`} />
        </div>

        <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2) } : handleSubmit} className="space-y-5">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farm-600 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="farmer@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farm-600 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farm-600 text-gray-900 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="w-full gradient-farm text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Farm name</label>
                <input
                  type="text"
                  required
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  placeholder="Smith Family Farm"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farm-600 text-gray-900 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farm-600 text-gray-900 bg-white"
                >
                  <option value="">Select your state…</option>
                  {US_STATES.map(([abbr, label]) => (
                    <option key={abbr} value={abbr}>{label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Primary farm type</label>
                <select
                  required
                  value={farmType}
                  onChange={(e) => setFarmType(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-farm-600 text-gray-900 bg-white"
                >
                  <option value="">Select farm type…</option>
                  {FARM_TYPES.map((ft) => (
                    <option key={ft.value} value={ft.value}>{ft.label}</option>
                  ))}
                </select>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 gradient-farm text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                  {loading ? "Creating…" : "Create account"}
                </button>
              </div>
            </>
          )}
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-farm-700 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
