import { useSession, signIn } from "next-auth/react";

function ProtectedRoute(props) {
   const { data: session } = useSession();

   if (session) return <div>To view this page you have to sign in</div>;

   return <div>{props.children}</div>;
}

export default ProtectedRoute;
