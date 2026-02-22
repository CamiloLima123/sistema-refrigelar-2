import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Senha", type: "password" },
      },

      async authorize(credentials) {
        // LOGIN TEMPORÁRIO (teste)
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

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
