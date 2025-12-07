import apiClient from "@/lib/apiClient";
import { useAppDispatch } from "@/store/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/store/slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { handleError } from "@/lib/errorHandler";
import { toast } from "react-toastify";

function useLogout() {
   const dispatch = useAppDispatch();
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async () => {
         await apiClient.post("/api/account/logout");
      },
      onSuccess: () => {
         toast.success("User logged out successfully!");
         queryClient.invalidateQueries({ queryKey: ["auth"] });
         dispatch(logout());
         navigate("/");
      },

      onError: (error) => {
         handleError(error);
      },
   });
}

export default useLogout;
