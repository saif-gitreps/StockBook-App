import apiClient from "@/lib/apiClient";
import type { CompanyTenK } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

function useFindTenK(ticker: string) {
   return useQuery({
      queryKey: ["findTenK", ticker],
      queryFn: async () => {
         const response = await apiClient.get<CompanyTenK[]>("");
         return response.data;
      },
   });
}

export default useFindTenK;
