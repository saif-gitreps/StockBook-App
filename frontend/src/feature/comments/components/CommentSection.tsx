import type { Comment, CommentFormData } from "@/types/common";
import useAddComment from "../hooks/useAddComment";
import useDeleteComment from "../hooks/useDeleteComment";
import useGetStockComments from "../hooks/useGetStockComments";
import { useForm } from "react-hook-form";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type CommentSectionProps = {
   symbol: string | undefined;
};

function CommentSection({ symbol }: CommentSectionProps) {
   const { mutate: createComment } = useAddComment();
   const { mutate: deleteComment } = useDeleteComment();
   const { data: comments, isLoading: commentsLoading } = useGetStockComments(
      symbol as string
   );
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<CommentFormData>();

   const onSubmit = (data: CommentFormData) => {
      if (!symbol || symbol == "") return;

      createComment(data, {
         onSuccess: () => {
            reset();
         },
      });
   };

   return (
      <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
         <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-gray-300" />
            Discussion ({comments?.length || 0})
         </h2>
         <div className="space-y-3">
            {commentsLoading ? (
               <p className="text-gray-300 text-center py-4">Loading comments...</p>
            ) : comments && comments.length > 0 ? (
               comments.map((comment: Comment) => (
                  <div className="flex items-center justify-between px-2 border rounded-lg border-gray-800">
                     <div key={comment.id} className="bg-[#08101A]/60 rounded-lg p-4">
                        <p className="font-medium text-white">{comment.title}</p>
                        <p className="text-sm text-gray-300 mt-1">{comment.content}</p>
                        <p className="text-xs text-gray-400 mt-2">
                           By {comment.createdBy}
                        </p>
                     </div>

                     <Trash2
                        className="stroke-red-500 hover:cursor-pointer"
                        onClick={() =>
                           deleteComment({
                              id: comment.id,
                              symbol: symbol as string,
                           })
                        }
                     />
                  </div>
               ))
            ) : (
               <p className="text-gray-300 text-center py-4">
                  No comments yet. Be the first to comment!
               </p>
            )}
         </div>

         <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <input type="hidden" {...register("symbol")} value={symbol} />

            <input
               type="text"
               placeholder="Title "
               maxLength={256}
               {...register("title", {
                  required: "Title is required",
                  minLength: {
                     value: 3,
                     message: "Title must be at least 5 characters",
                  },
               })}
               className="w-full px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.title && (
               <p className="text-red-400 text-sm">{errors.title.message}</p>
            )}

            <textarea
               placeholder="Your comment "
               maxLength={256}
               rows={3}
               {...register("content", {
                  required: "Content is required",
                  minLength: {
                     value: 5,
                     message: "Content must be at least 5 characters",
                  },
               })}
               className="w-full px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600"
            />
            {errors.content && (
               <p className="text-red-400 text-sm">{errors.content.message}</p>
            )}

            <Button
               type="submit"
               disabled={isSubmitting}
               className="px-4 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50"
            >
               {isSubmitting ? "Posting..." : "Post Comment"}
            </Button>
         </form>
      </div>
   );
}

export default CommentSection;
