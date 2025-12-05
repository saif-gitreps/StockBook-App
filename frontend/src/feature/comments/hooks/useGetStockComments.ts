import apiClient from "@/lib/apiClient";
import type { Comment } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

function useGetStockComments(symbol: string) {
   return useQuery({
      queryKey: ["comments", symbol],
      queryFn: async () => {
         const response = await apiClient.get<Comment[]>(
            "/api/comments?symbol=" + symbol
         );
         return response.data;
      },
   });
}

export default useGetStockComments;
