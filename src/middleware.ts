import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Proteger rotas de admin
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Proteger rotas de técnico
    if (path.startsWith("/tecnico") && token?.role !== "TECNICO" && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // Proteger rotas de cliente
    if (path.startsWith("/cliente") && !token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        // Permitir acesso à página pública do equipamento
        if (req.nextUrl.pathname.startsWith("/equipamento/")) {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*", "/tecnico/:path*", "/cliente/:path*"],
}
