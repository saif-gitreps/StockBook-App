import React, { useEffect, useState } from "react";
import { useAuthCheck } from "../hooks/auth/useAuthCheck";
import { useAppDispatch } from "../store/hooks";
import Loader from "./Loader";
import { setCredentials } from "../store/slices/AuthSlice";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
   const { data, isLoading } = useAuthCheck();
   const dispatch = useAppDispatch(); // Using our custom hook
   const [isDispatching, setIsDispatching] = useState(false);

   useEffect(() => {
      const updateState = async () => {
         if (!isLoading && data) {
            setIsDispatching(true);

            await dispatch(setCredentials(data.user));
            setIsDispatching(false);
         }
      };

      updateState();

      return () => setIsDispatching(false);
   }, [data, isLoading, dispatch]);

   if (isLoading || isDispatching) {
      return <Loader />;
   }

   return <>{children}</>;
}
