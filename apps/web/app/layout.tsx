import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "AgriGuard — Farm Biosecurity & Compliance Tracker",
    template: "%s | AgriGuard",
  },
  description:
    "Daily biosecurity checklists, streak tracking, and audit-ready compliance reports for small farmers — covering all 50 U.S. states.",
  keywords: ["agriculture", "biosecurity", "compliance", "farm management", "USDA", "EPA"],
  authors: [{ name: "AgriGuard" }],
  openGraph: {
    title: "AgriGuard — Farm Biosecurity & Compliance",
    description: "Daily checklists, streak tracking, and audit-ready reports for small farms.",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
