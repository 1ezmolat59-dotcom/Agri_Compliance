import Link from "next/link"
import { Leaf } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-farm flex items-center justify-center">
            <Leaf className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-6xl font-bold text-farm-700 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Page not found</h2>
        <p className="text-gray-500 mb-8">
          This page doesn&apos;t exist. Head back to your farm dashboard.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 gradient-farm text-white font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
        >
          Go to AgriGuard
        </Link>
      </div>
    </div>
  )
}
