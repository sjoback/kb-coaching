import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "data/users.json";

export default NextAuth({
   providers: [
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            username: {
               label: "Email",
               type: "text",
               placeholder: "Email",
            },
            password: { label: "Password", type: "password" },
         },

         async authorize(credentials, req) {
            const userFromDatabase = users.filter(
               (user) => user.email == credentials.username
            );

            const user = {
               id: userFromDatabase[0].id,
               name: userFromDatabase[0].name,
               email: userFromDatabase[0].email,
               password: userFromDatabase[0].password,
            };

            function userVerified() {
               return (
                  credentials.password == user.password &&
                  credentials.username == user.email
               );
            }

            if (userVerified()) {
               return user;
            } else {
               return null;
            }
         },
      }),
   ],
   debug: true,
   secret: "iwS/fwKiCOG3WnIC10PZnqefqfBLNrb606YNSEtfZjU=",
   callbacks: {
      // async signIn({ user, account, profile, email, credentials }) {
      //    return true;
      // },
      // async redirect({ url, baseUrl }) {
      //    console.log(baseUrl);

      //    return "/signin";
      // },
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
