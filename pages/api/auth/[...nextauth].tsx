import { faJarWheat } from "@fortawesome/free-solid-svg-icons";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code",
            },
         },
      }),
   ],
   debug: true,
   secret: "iwS/fwKiCOG3WnIC10PZnqefqfBLNrb606YNSEtfZjU=",
   callbacks: {
      async jwt({ token, account }) {
         // Persist the OAuth access_token to the token right after signin
         if (account) {
            token.accessToken = account.access_token;
         }
         return token;
      },
      async session({ session, token, user }) {
         // Send properties to the client, like an access_token from a provider.
         session.accessToken = token.accessToken;
         return session;
      },
   },
});
