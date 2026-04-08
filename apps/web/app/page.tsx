import Link from "next/link"
import {
  CheckCircle,
  Shield,
  BarChart3,
  MapPin,
  Flame,
  FileText,
  Leaf,
  ArrowRight,
  Star,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-farm-700" />
            <span className="font-bold text-xl text-farm-900">AgriGuard</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#features" className="hover:text-farm-700 transition-colors">Features</a>
            <a href="#compliance" className="hover:text-farm-700 transition-colors">50-State Coverage</a>
            <a href="#how" className="hover:text-farm-700 transition-colors">How It Works</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/sign-in" className="text-sm text-gray-600 hover:text-farm-700 transition-colors">
              Sign in
            </Link>
            <Link
              href="/sign-up"
              className="bg-farm-700 text-white text-sm px-4 py-2 rounded-lg hover:bg-farm-800 transition-colors"
            >
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="gradient-farm text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm mb-8">
            <Shield className="h-4 w-4" />
            <span>Covers all 50 U.S. states · USDA · EPA · FDA</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            Biosecurity & Compliance<br />Built for Small Farmers
          </h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto mb-10 text-balance">
            Daily checklists with streak tracking, real-time regulatory guidance for your state,
            and audit-ready reports — all in one simple app.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="bg-white text-farm-800 font-semibold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Start tracking for free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/sign-in"
              className="border border-white/40 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-lg"
            >
              Sign in to your farm
            </Link>
          </div>
          <p className="mt-6 text-green-200 text-sm">No credit card required · Free forever for 1 farm</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-farm-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50", label: "U.S. States Covered" },
              { value: "35+", label: "Daily Checklist Items" },
              { value: "100%", label: "Audit-Ready Reports" },
              { value: "0", label: "Regulatory Surprises" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-green-400 mb-1">{stat.value}</div>
                <div className="text-green-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything a small farm needs to stay compliant
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From daily checklists to state-specific laws, AgriGuard keeps your operation protected.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-farm-50 flex items-center justify-center mb-6">
                  <f.icon className="h-6 w-6 text-farm-700" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streak Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-sm bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full mb-6">
                <Flame className="h-4 w-4" />
                Streak System
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Build the habit. Keep the streak.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Complete your daily biosecurity checklist and build consecutive-day streaks.
                Longer streaks mean stronger biosecurity culture — and better audit outcomes.
              </p>
              <ul className="space-y-4">
                {[
                  "Daily reminders sent to your phone",
                  "Streak counter resets if you miss a day",
                  "Lifetime stats and personal records",
                  "Team visibility for multi-person farms",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-farm-600 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gradient-to-br from-farm-50 to-green-100 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-4">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">Current Streak</span>
                  <span className="text-3xl">🔥</span>
                </div>
                <div className="text-5xl font-bold text-farm-700 mb-1">47</div>
                <div className="text-sm text-gray-500">consecutive days</div>
                <div className="mt-4 bg-farm-50 rounded-full h-2 overflow-hidden">
                  <div className="bg-farm-600 h-2 rounded-full" style={{ width: "78%" }} />
                </div>
                <div className="mt-2 text-xs text-gray-500">78% toward 60-day badge</div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 28 }, (_, i) => (
                  <div
                    key={i}
                    className={`aspect-square rounded-md ${
                      i < 25
                        ? "bg-farm-600"
                        : i < 27
                        ? "bg-farm-300"
                        : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-3 text-xs text-center text-farm-700 font-medium">Last 28 days of compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* 50-State Coverage */}
      <section id="compliance" className="py-20 bg-farm-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-sm bg-green-800 px-3 py-1.5 rounded-full mb-6">
              <MapPin className="h-4 w-4 text-green-400" />
              <span className="text-green-300">50-State Regulatory Database</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Your state's laws, instantly accessible
            </h2>
            <p className="text-xl text-green-200 max-w-2xl mx-auto">
              Every state's agricultural regulations, reportable disease lists, pesticide laws,
              and biosecurity requirements — organized and searchable.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {complianceCategories.map((cat) => (
              <div key={cat.title} className="bg-farm-900 rounded-xl p-6 border border-farm-800">
                <div className="text-2xl mb-3">{cat.emoji}</div>
                <h3 className="font-semibold text-white mb-2">{cat.title}</h3>
                <p className="text-green-300 text-sm">{cat.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/sign-up"
              className="bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              Browse your state's regulations
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600">Up and running in under 5 minutes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-14 h-14 rounded-full gradient-farm flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                  {i + 1}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-farm-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
          </div>
          <blockquote className="text-2xl font-medium text-gray-800 mb-8 text-balance">
            "AgriGuard caught that we were missing our monthly water test records — exactly
            the kind of thing that would've been a problem during our USDA inspection."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-farm-200 flex items-center justify-center text-farm-700 font-bold text-lg">
              M
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Maria Gutierrez</div>
              <div className="text-sm text-gray-500">Small cattle operation, Texas</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-farm text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start protecting your farm today
          </h2>
          <p className="text-xl text-green-100 mb-10">
            Join farmers across all 50 states who trust AgriGuard for biosecurity compliance.
          </p>
          <Link
            href="/sign-up"
            className="bg-white text-farm-800 font-bold text-lg px-10 py-5 rounded-xl hover:bg-green-50 transition-colors inline-flex items-center gap-2"
          >
            Create your free account
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-farm-950 text-green-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-green-400" />
              <span className="font-bold text-white">AgriGuard</span>
            </div>
            <p className="text-sm text-center">
              Regulatory data is for informational purposes only. Consult your state Department of Agriculture for official guidance.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/sign-in" className="hover:text-white transition-colors">Sign in</Link>
              <Link href="/sign-up" className="hover:text-white transition-colors">Sign up</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    icon: CheckCircle,
    title: "Daily Biosecurity Checklists",
    description:
      "35+ science-based tasks covering animal health, feed safety, visitor logs, equipment sanitation, and perimeter security — organized by farm type.",
  },
  {
    icon: Flame,
    title: "Streak Tracking",
    description:
      "Build consecutive compliance days like a habit. See your current streak, personal best, and 28-day completion calendar at a glance.",
  },
  {
    icon: MapPin,
    title: "All 50 State Regulations",
    description:
      "Every state's animal health codes, pesticide laws, water quality rules, and reportable disease lists — updated and searchable.",
  },
  {
    icon: FileText,
    title: "Audit-Ready Reports",
    description:
      "Generate PDF reports covering any date range — perfect for USDA inspections, lender audits, or insurance documentation.",
  },
  {
    icon: Shield,
    title: "AI Compliance Assistant",
    description:
      "Ask plain-English questions about regulations: 'Do I need a permit for this?' or 'What's the withdrawal period for this drug?'",
  },
  {
    icon: BarChart3,
    title: "Farm Analytics Dashboard",
    description:
      "Track compliance trends over time, identify your most-missed checklist items, and spot risks before they become violations.",
  },
]

const complianceCategories = [
  {
    emoji: "🦠",
    title: "Animal Disease Reporting",
    description: "Reportable disease lists and 24-hour notification requirements for all livestock species in your state.",
  },
  {
    emoji: "🌿",
    title: "Pesticide Regulations",
    description: "License requirements, recordkeeping rules, restricted-use permits, and application setbacks by state.",
  },
  {
    emoji: "💧",
    title: "Water Quality & CAFOs",
    description: "NPDES permits, nutrient management plans, manure setback rules, and Clean Water Act compliance.",
  },
  {
    emoji: "👷",
    title: "Worker Safety",
    description: "EPA Worker Protection Standard requirements, heat illness prevention, and OSHA agricultural standards.",
  },
  {
    emoji: "📋",
    title: "Recordkeeping Requirements",
    description: "Retention periods, required records, and documentation requirements under federal and state law.",
  },
  {
    emoji: "🏷️",
    title: "Animal ID & Movement",
    description: "USDA Animal Disease Traceability, brand inspection, health certificates, and movement permits.",
  },
]

const steps = [
  {
    title: "Create your farm profile",
    description: "Enter your farm type, location, and livestock species. We'll customize the regulations and checklist for you.",
  },
  {
    title: "Complete your daily checklist",
    description: "Work through your daily, weekly, and monthly tasks. Each one links to the regulation it satisfies.",
  },
  {
    title: "Generate audit-ready reports",
    description: "At any time, export a complete compliance report showing your completion history, dates, and regulatory citations.",
  },
]
