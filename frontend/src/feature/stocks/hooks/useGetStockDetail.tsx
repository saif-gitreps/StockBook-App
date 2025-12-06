import apiClient from "@/lib/apiClient";
import type { Stock } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

function useGetStockDetail(symbol: string) {
   return useQuery({
      queryKey: ["stock", symbol],
      queryFn: async () => {
         const response = await apiClient.get<Stock>("/api/stock/" + symbol);
         return response.data;
      },
   });
}

export default useGetStockDetail;
