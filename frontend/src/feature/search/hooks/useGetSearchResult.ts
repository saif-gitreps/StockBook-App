import apiClient from "@/lib/apiClient";
import type { CompanySearch } from "@/types/company";
import { useQuery } from "@tanstack/react-query";
const key = import.meta.env.VITE_FMP_SERVICE_KEY as string;

function useGetSearchResult(query: string) {
   return useQuery({
      queryKey: ["searchStocks"],
      queryFn: async () => {
         const data = await apiClient.get<CompanySearch[]>(
            `https://financialmodelingprep.com/stable/search-exchange-variants?symbol=${query}&apikey=${key}`
         );
         return data;
      },
   });
}

export default useGetSearchResult;
