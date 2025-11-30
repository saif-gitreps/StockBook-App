import React, { useEffect } from "react";
import { useAuthCheck } from "../feature/auth/hooks/useAuthCheck";
import { useAppDispatch } from "../store/hooks";
import Loader from "./Loader";
import { setCredentials } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
   const { data, isLoading, isError } = useAuthCheck();
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (data) {
         dispatch(
            setCredentials({
               user: data,
            })
         );
      }

      if (isError) {
         navigate("/login");
      }
   }, [data, isError, dispatch, navigate]);

   if (isLoading) {
      return <Loader>Loading..</Loader>;
   }

   return <>{children}</>;
}
