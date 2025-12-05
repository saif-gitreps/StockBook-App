import apiClient from "@/lib/apiClient";
import type { CompanyKeyMetrics } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

function useGetCompanyMetrics(ticker: string) {
   return useQuery({
      queryKey: ["companyMetrics", ticker],
      queryFn: async () => {
         const response = await apiClient.get<CompanyKeyMetrics[]>("");
         return response.data;
      },
   });
}

export default useGetCompanyMetrics;
