import { useSession, signIn } from "next-auth/react";

function ProtectedRoute(props) {
   const { data: session } = useSession();

   if (!session)
      return (
         <div>
            To view this page you have to{" "}
            <button onClick={() => signIn("google")}>sign in</button>
         </div>
      );

   return <div>{props.children}</div>;
}

export default ProtectedRoute;
