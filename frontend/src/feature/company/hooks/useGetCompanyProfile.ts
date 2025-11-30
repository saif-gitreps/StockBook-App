import apiClient from "@/lib/apiClient";
import type { CompanyProfile } from "@/types/company";
import { useQuery } from "@tanstack/react-query";

function useGetCompanyProfile(ticker: string) {
   return useQuery({
      queryKey: ["company", ticker],
      queryFn: async () => {
         const response = await apiClient.get<CompanyProfile>("");
         return response.data;
      },
   });
}

export default useGetCompanyProfile;
