import apiClient from "@/lib/apiClient";
import { handleError } from "@/lib/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useCreatePortfolio() {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async (symbol: string | undefined) => {
         await apiClient.post<{ symbol: string }>("/api/portfolio?symbol=" + symbol);
      },
      onSuccess: () => {
         toast.success("Stock added to portfolio");
         queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      },
      onError: (error) => {
         handleError(error);
      },
   });
}

export default useCreatePortfolio;
