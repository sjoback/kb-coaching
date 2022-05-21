import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import users from "data/users.json";

export default NextAuth({
   providers: [
      CredentialsProvider({
         name: "credentials",
         credentials: {
            email: {
               label: "Email",
               type: "email",
               placeholder: "Email",
            },
            password: {
               label: "Password",
               type: "password",
               placeholder: "Password",
            },
         },
         async authorize(credentials, req) {
            const userFromDatabase = users.filter(
               (e) => e.email == credentials.email
            );
            console.log(credentials.email);

            console.log(userFromDatabase);

            const user = {
               id: userFromDatabase[0].id,
               name: userFromDatabase[0].name,
               email: userFromDatabase[0].email,
               role: userFromDatabase[0].role,
               password: userFromDatabase[0].password,
            };

            function userVerified() {
               return (
                  credentials.password == user.password &&
                  credentials.email == user.email
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
   secret: "iwS/fwKiCOG3WnIC10PZnqefqfBLNrb606YNSEtfZjU=",
   debug: true,
   callbacks: {
      async redirect({ url, baseUrl }) {
         return "/";
      },
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
