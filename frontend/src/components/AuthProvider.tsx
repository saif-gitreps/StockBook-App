import React, { useEffect } from "react";
import { useAuthCheck } from "../feature/auth/hooks/useAuthCheck";
import { useAppDispatch } from "../store/hooks";
import Loader from "./Loader";
import { setCredentials } from "../store/slices/AuthSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
   const { data, isLoading, isFetching, isError } = useAuthCheck();
   const dispatch = useAppDispatch();

   console.log(data?.user);

   useEffect(() => {
      if (!data?.user) {
         return;
      }

      dispatch(setCredentials({ user: data.user }));
   }, [data?.user, dispatch]);

   if (isLoading || isFetching) {
      return <Loader>Loading..</Loader>;
   }

   if (isError) {
      return <>{children}</>;
   }

   return <>{children}</>;
}
