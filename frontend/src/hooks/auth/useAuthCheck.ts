import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/api";

interface AuthCheckResponse {
   user: {
      id: string;
      email: string;
      userName: string;
   };
}

export const useAuthCheck = () => {
   return useQuery({
      queryKey: ["auth-check"],
      queryFn: async () => {
         const data = await apiClient.get<AuthCheckResponse>("/auth/me");
         return data;
      },
      retry: false,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
   });
};
