import apiClient from "@/lib/apiClient";
import { handleError } from "@/lib/errorHandler";
import type { CommentFormData } from "@/types/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useAddComment() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (data: CommentFormData) => {
         await apiClient.post("/api/comment", data);
         return data;
      },
      onSuccess: (data: CommentFormData) => {
         toast.success("comment added successfully");
         queryClient.invalidateQueries({ queryKey: ["comments", data.symbol] });
      },
      onError: (error) => {
         handleError(error);
      },
   });
}

export default useAddComment;
