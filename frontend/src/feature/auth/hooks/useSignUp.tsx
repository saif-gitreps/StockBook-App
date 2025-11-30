import apiClient from "@/lib/apiClient";
import { handleError } from "@/lib/errorHandler";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/AuthSlice";
import type { RegisterFormData, User } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useSignUp() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: async (data: RegisterFormData) => {
         const response = await apiClient.post<{ user: User }>(
            "/api/account/register",
            data
         );

         return response.data;
      },
      onSuccess: (data: { user: User }) => {
         dispatch(setCredentials({ user: data.user }));
         navigate("/");
      },
      onError: (error) => {
         handleError(error);
      },
   });
}

export default useSignUp;
