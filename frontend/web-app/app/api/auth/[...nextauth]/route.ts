import NextAuth, { NextAuthOptions } from 'next-auth'
import DuendeIDS6Provider from 'next-auth/providers/duende-identity-server6'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    DuendeIDS6Provider({
      id: 'id-server',
      clientId: 'nextApp',
      clientSecret: process.env.CLIENT_SECRET!,
      issuer: process.env.IDENTITY_SERVER_URL,
      authorization: {
        params: {
          scope: 'openid profile auctionApp',
        },
      },
      idToken: true,
    }),
  ],
  callbacks: {
    async jwt({ token, profile, account }) {
      //console.log({ account, profile }) ONLY AVAILABLE AT FIRST REQ
      if (profile) {
        token.username = profile.username
      }

      if (account) {
        token.access_token = account.access_token
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username
      }

      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
