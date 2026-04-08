import { compare, hash } from "bcryptjs"
import { eq } from "drizzle-orm"
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db, users } from "./db"

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email.toLowerCase()),
        })

        if (!user) return null

        const valid = await compare(credentials.password, user.passwordHash)
        if (!valid) return null

        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}

export async function hashPassword(password: string) {
  return hash(password, 12)
}

export async function createUser(name: string, email: string, password: string) {
  const passwordHash = await hashPassword(password)
  const [user] = await db
    .insert(users)
    .values({ name, email: email.toLowerCase(), passwordHash })
    .returning({ id: users.id, name: users.name, email: users.email })
  return user
}
