import { useQuery } from "@tanstack/react-query";
import type { User } from "../../../types/common";
import apiClient from "@/lib/apiClient";

interface AuthCheckResponse {
   user: User;
}

export const useAuthCheck = () => {
   return useQuery({
      queryKey: ["auth-check"],
      queryFn: async () => {
         const data = await apiClient.get<AuthCheckResponse>("/api/Account/me");
         return data;
      },
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });
};
