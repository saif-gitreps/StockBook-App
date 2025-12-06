import { useAppSelector } from "@/store/hooks";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
   children: ReactNode;
   auth?: boolean;
};

export default function ProtectedRoute({ children, auth = true }: ProtectedRouteProps) {
   const { isAuthenticated } = useAppSelector((state) => state.auth);

   if (auth && !isAuthenticated) {
      return <Navigate to="/login" replace />;
   }
   if (!auth && isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
   }

   return children;
}
