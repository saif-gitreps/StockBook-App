import apiClient from "@/lib/apiClient";
import { handleError } from "@/lib/errorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useDeleteComment() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async ({ id, symbol }: { id: string; symbol: string }) => {
         await apiClient.delete("/api/comment/" + id);
         return symbol;
      },
      onSuccess: (symbol) => {
         toast.success("Comment deleted");
         queryClient.invalidateQueries({ queryKey: ["comments", symbol] });
      },
      onError: (error) => {
         handleError(error);
      },
   });
}

export default useDeleteComment;
