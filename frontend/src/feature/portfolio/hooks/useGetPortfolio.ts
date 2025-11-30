import apiClient from "@/lib/apiClient";
import type { Portfolio } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

function useGetPortfolio() {
   return useQuery({
      queryKey: ["portfolio"],
      queryFn: async () => {
         const data = await apiClient.get<Portfolio[]>("/api/portfolio");
         return data;
      },
   });
}

export default useGetPortfolio;
