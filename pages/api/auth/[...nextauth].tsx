import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,
         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code",
            },
         },
      }),
      // CredentialsProvider({
      //    name: "Credentials",
      //    credentials: {
      //       username: {
      //          label: "Email",
      //          type: "text",
      //          placeholder: "Email",
      //       },
      //       password: { label: "Password", type: "password" },
      //    },
      //    async authorize(credentials, req) {
      //       const userFromDatabase = users.filter(
      //          (user) => user.email == credentials.username
      //       );

      //       const user = {
      //          id: userFromDatabase[0].id,
      //          name: userFromDatabase[0].name,
      //          email: userFromDatabase[0].email,
      //          role: userFromDatabase[0].role,
      //          password: userFromDatabase[0].password,
      //       };

      //       function userVerified() {
      //          return (
      //             credentials.password == user.password &&
      //             credentials.username == user.email
      //          );
      //       }

      //       if (userVerified()) {
      //          return user;
      //       } else {
      //          return null;
      //       }
      //    },
      // }),
   ],
   debug: true,
   secret: "iwS/fwKiCOG3WnIC10PZnqefqfBLNrb606YNSEtfZjU=",
   callbacks: {
      async jwt({ token, account }) {
         if (account) {
            token.accessToken = account.access_token;
         }
         return token;
      },
      async session({ session, token, user }) {
         session.accessToken = token.accessToken;
         return session;
      },
   },
});
