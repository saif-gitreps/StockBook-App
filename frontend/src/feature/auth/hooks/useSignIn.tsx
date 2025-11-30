import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/AuthSlice";
import type { LoginFormData, User } from "@/types/common";
import { useNavigate } from "react-router-dom";
import { handleError } from "@/lib/errorHandler";
import apiClient from "@/lib/apiClient";

function useSignIn() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   return useMutation({
      // API returns the User object directly
      mutationFn: async (data: LoginFormData) => {
         const response = await apiClient.post<User>("/api/account/login", data);

         // response.data IS the user object
         console.log("AXIOS FULL RESPONSE:", response);
         console.log("RESPONSE DATA:", response.data);

         return response.data; // user object
      },

      onSuccess: (user) => {
         console.log("ON SUCCESS RECEIVED:", user);

         // No user.user — user *is* the returned object
         dispatch(
            setCredentials({
               user: {
                  id: user.id,
                  email: user.email,
                  userName: user.userName,
               },
            })
         );

         navigate("/search");
      },

      onError: (error) => {
         handleError(error);
      },
   });
}

export default useSignIn;
