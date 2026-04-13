export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: "4rem", fontWeight: "bold", color: "#15803d", margin: 0 }}>404</h1>
      <p style={{ color: "#6b7280", margin: "1rem 0" }}>Page not found</p>
      <a href="/" style={{ color: "#15803d", textDecoration: "underline" }}>Go to AgriGuard</a>
    </div>
  )
}
