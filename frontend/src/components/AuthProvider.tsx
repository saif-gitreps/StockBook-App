import React, { useEffect } from "react";
import { useAuthCheck } from "../feature/auth/hooks/useAuthCheck";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
   const { data } = useAuthCheck();
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

   return <>{children}</>;
}
