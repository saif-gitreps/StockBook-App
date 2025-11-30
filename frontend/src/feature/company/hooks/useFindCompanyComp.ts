import apiClient from "@/lib/apiClient";
import { useQuery } from "@tanstack/react-query";

function useFindCompanyComp(tinker: string) {
   return useQuery({
      queryKey: ["findCompanyComp", tinker],
      queryFn: async () => {
         const response = await apiClient.get<>();
         return response.data;
      },
   });
}
