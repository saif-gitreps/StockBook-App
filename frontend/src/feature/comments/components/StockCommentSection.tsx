import type { CommentFormData } from "@/types/common";
import { useForm } from "react-hook-form";
import useGetStockComments from "../hooks/useGetStockComments";
import Loader from "@/components/Loader";
import useAddComment from "../hooks/useAddComment";
import { Button } from "@/components/ui/button";

type StockCommentSectionProps = {
   symbol: string;
};

function StockCommentSection({ symbol }: StockCommentSectionProps) {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<CommentFormData>();
   const { data: comments, isLoading } = useGetStockComments(symbol);
   const { mutate: addComment, isPending } = useAddComment();
   const onSubmit = (data: CommentFormData) => {
      addComment(data);
   };

   if (isLoading) {
      return <Loader />;
   }

   return (
      <div className="flex flex-col">
         <ul>
            {comments &&
               comments.map((comment) => (
                  <li className="relative grid grid-cols-1 gap-4 ml-4 p-4 mb-8 w-full border rounded-lg bg-white shadow-lg">
                     <div className="relative flex gap-4">
                        <div className="flex flex-col w-full">
                           <div className="flex flex-row justify-between">
                              <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
                                 {comment.title}
                              </p>
                           </div>
                           <p className="text-dark text-sm">@{comment.createdBy}</p>
                        </div>
                     </div>
                     <p className="-mt-4 text-gray-500">{comment.content}</p>
                  </li>
               ))}
         </ul>

         <form className="mt-4 ml-4" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" value={symbol} />
            <input
               type="text"
               id="title"
               className="mb-3 bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Title"
               {...register("title", {
                  required: "title cannot be empty",
               })}
            />
            {errors.title ? <p>{errors.title.message}</p> : ""}
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
               <label htmlFor="comment" className="sr-only">
                  Your comment
               </label>

               <textarea
                  id="comment"
                  rows={6}
                  className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                  placeholder="Write a comment..."
                  {...register("content", {
                     required: "content cannot be empty",
                  })}
               ></textarea>
            </div>

            <Button
               type="submit"
               disabled={isPending}
               className="flex justify-between items-center text-center"
            >
               {isPending ? <Loader /> : "Submit"}
            </Button>
         </form>
      </div>
   );
}

export default StockCommentSection;
