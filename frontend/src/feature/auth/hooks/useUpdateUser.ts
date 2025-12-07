import apiClient from "@/lib/apiClient";
import { handleError } from "@/lib/errorHandler";
import type { UpdateUserForm, User } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useUpdateUser() {
   const navigate = useNavigate();
   return useMutation({
      mutationFn: async (data: UpdateUserForm) => {
         const response = await apiClient.put<User>("/api/account", data);
         return response.data;
      },
      onSuccess: () => {
         toast.success("Account details updated successfully");
         navigate("/dashboard");
      },
      onError: (error) => {
         handleError(error);
      },
   });
}

export default useUpdateUser;
