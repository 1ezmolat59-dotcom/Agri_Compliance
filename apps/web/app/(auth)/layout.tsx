import Link from "next/link"
import { Leaf } from "lucide-react"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-50 via-white to-green-50 flex flex-col">
      <div className="p-6">
        <Link href="/" className="inline-flex items-center gap-2 text-farm-800 font-bold text-xl">
          <Leaf className="h-6 w-6 text-farm-700" />
          AgriGuard
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </div>
    </div>
  )
}
