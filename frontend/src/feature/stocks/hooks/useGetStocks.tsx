import apiClient from "@/lib/apiClient";
import type { Stock } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

function useGetStocks(params?: {
   symbol?: string;
   companyName?: string;
   sortBy?: string;
   sortOrder?: string;
   pageNumber?: number;
   pageSize?: number;
}) {
   return useQuery({
      queryKey: ["stocks", params],
      queryFn: async () => {
         const response = await apiClient.get<Stock[]>("/api/stock", { params });
         return response.data;
      },
   });
}

export default useGetStocks;
