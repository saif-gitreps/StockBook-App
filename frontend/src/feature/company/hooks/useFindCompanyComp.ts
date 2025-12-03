import apiClient from "@/lib/apiClient";
import type { CompanyCompData } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

function useFindCompanyComp(ticker: string) {
   return useQuery({
      queryKey: ["findCompanyComp", ticker],
      queryFn: async () => {
         const response = await apiClient.get<CompanyCompData>("");
         return response.data;
      },
   });
}

export default useFindCompanyComp;
