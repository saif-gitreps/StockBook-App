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
         const response = await apiClient.post<{ user: User }>(
            "/api/account/login",
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

export default useSignIn;
