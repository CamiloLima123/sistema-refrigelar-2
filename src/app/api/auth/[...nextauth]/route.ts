import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 🔐 LOGIN TEMPORÁRIO (ADMIN)
        if (
          credentials?.email === "admin@email.com" &&
          credentials?.password === "123456"
        ) {
          return {
            id: "1",
            name: "Administrador",
            email: "admin@email.com",
          }
        }

        return null
      },
    }),
  ],

  // ✅ obrigatório no Vercel
  secret: process.env.NEXTAUTH_SECRET,

  // ✅ evita problemas de sessão
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
})

export { handler as GET, handler as POST }
