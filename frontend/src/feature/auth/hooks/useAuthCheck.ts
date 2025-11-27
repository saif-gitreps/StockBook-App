import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../../lib/api";
import type { User } from "../../../types/common";

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
