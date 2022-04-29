import NextAuth from "next-auth"
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.AZURE_AD_B2C_TENANT_NAME!,
      clientId: process.env.AZURE_AD_B2C_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_B2C_CLIENT_SECRET!,
      primaryUserFlow: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW!,
      authorization: { params: { scope: `https://creatorclass.onmicrosoft.com/43dadc70-c776-4720-9331-4310e3753bb1/access_as_user offline_access openid` } },
    }),
  ],
  secret:process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

  },
  callbacks: {
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.userId = token.oid;
      session.name = token.userName;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (profile) {
        token.oid = profile.oid;
        token.userName = profile.given_name;
      }
      return token
    }

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt


  // Enable debug messages in the console if you are having problems
  debug: true,
})