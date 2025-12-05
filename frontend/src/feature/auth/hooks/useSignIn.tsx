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
      mutationFn: async (data: LoginFormData) => {
         const response = await apiClient.post<User>("/api/account/login", data);

         return response.data;
      },

      onSuccess: (user) => {
         console.log("ON SUCCESS RECEIVED:", user);

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
