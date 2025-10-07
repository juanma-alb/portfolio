export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "40px",
      background: "linear-gradient(135deg,#0f172a,#1e293b)",
      color: "#e2e8f0",
      fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif"
    }}>
      <section style={{
        maxWidth: 900,
        width: "100%",
        background: "rgba(15,23,42,0.65)",
        border: "1px solid rgba(226,232,240,0.08)",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
      }}>
        <h1 style={{ fontSize: 36, margin: 0, letterSpacing: 0.3 }}>
          Juan Manuel Albino
        </h1>
        <p style={{ margin: "8px 0 16px", opacity: 0.9 }}>
          Full Stack Developer Jr · React/Next.js · TypeScript · Node.js · .NET 8 · SQL
        </p>

        <p style={{ lineHeight: 1.6, marginBottom: 24 }}>
          Desarrollador Web Full Stack Jr. Construyo APIs REST y CRUDs con auth, paginación, validaciones,
          manejo de errores y documentación (Swagger/OpenAPI). Deploys en Vercel/Render.
          
        </p>

        <div style={{ display: "grid", gap: 12 }}>
          <a href="mailto:juanmanuelalbino01@gmail.com" style={linkStyle}>✉️ Email</a>
          <a href="https://www.linkedin.com/in/juan-manuel-albino/" style={linkStyle}>🔗 LinkedIn</a>
          <a href="https://github.com/juanma-alb" style={linkStyle}>💻 GitHub</a>

          {/* Proyectos (iremos activando los links) */}
          <a href="https://node-auth-api.onrender.com" style={linkStyle}>API Demo — Node Auth API (en preparación)</a>
          <a href="https://tasks-api.onrender.com" style={linkStyle}>API Demo — Tasks API (en preparación)</a>
          <a href="https://recomendador-peliculas-dotnet.onrender.com" style={linkStyle}>Demo — Recomendador .NET (en preparación)</a>
        </div>
      </section>
    </main>
  );
}

const linkStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 14px",
  background: "rgba(148,163,184,0.15)",
  border: "1px solid rgba(148,163,184,0.25)",
  borderRadius: 10,
  color: "#e2e8f0",
  textDecoration: "none",
  width: "fit-content"
};
