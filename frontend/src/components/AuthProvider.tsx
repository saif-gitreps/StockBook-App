import React, { useEffect } from "react";
import { useAuthCheck } from "../feature/auth/hooks/useAuthCheck";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
   const { data, isLoading } = useAuthCheck();
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
   }, [data, dispatch, navigate]);

   if (isLoading) {
      return (
         <div className="bg-[#0B0F17] h-screen flex justify-center items-center">
            <Loader>Please wait..</Loader>
         </div>
      );
   }

   return <>{children}</>;
}
