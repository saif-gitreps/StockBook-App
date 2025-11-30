import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../types/common";
import apiClient from "@/lib/apiClient";

export const useAuthCheck = () => {
   return useQuery({
      queryKey: ["auth"],
      queryFn: async () => {
         const response = await apiClient.get<User>("/api/Account/me");

         return response.data;
      },
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });
};
