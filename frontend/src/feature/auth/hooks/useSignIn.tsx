import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { setCredentials } from "@/store/slices/AuthSlice";
import type { LoginFormData, User } from "@/types/common";
import { useNavigate } from "react-router-dom";

function useSignIn() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: async (data: LoginFormData) => {
         const response = await apiClient.post<{ user: User }>(
            "/api/account/login",
            data
         );
         return response;
      },
      onSuccess: (data: { user: User }) => {
         dispatch(setCredentials({ user: data.user }));
         navigate("/");
      },
      onError: (error) => {
         console.log(error.message);
      },
   });
}

export default useSignIn;
