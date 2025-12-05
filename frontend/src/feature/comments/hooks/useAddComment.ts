import apiClient from "@/lib/apiClient";
import { handleError } from "@/lib/errorHandler";
import type { CommentFormData } from "@/types/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function useAddComment() {
   return useMutation({
      mutationFn: async (data: CommentFormData) => {
         await apiClient.post("/api/comment", data);
      },
      onSuccess: () => {
         toast.success("comment added successfully");
      },
      onError: (error) => {
         handleError(error);
      },
   });
}

export default useAddComment;
