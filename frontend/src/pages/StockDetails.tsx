import Layout from "@/components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { ArrowLeft, MessageSquare, Plus } from "lucide-react";
import Loader from "@/components/Loader";
import useGetStockComments from "@/feature/comments/hooks/useGetStockComments";
import useAddComment from "@/feature/comments/hooks/useAddComment";
import useGetStockDetail from "@/feature/stocks/hooks/useGetStockDetail";
import useCreatePortfolio from "@/feature/portfolio/hooks/useCreatePortfolio";
import type { Comment } from "@/types/common";

function StockDetails() {
   const { symbol } = useParams<{ symbol: string }>();
   const navigate = useNavigate();
   const [commentTitle, setCommentTitle] = useState("");
   const [commentContent, setCommentContent] = useState("");
   const [submittingComment, setSubmittingComment] = useState(false);

   const { data: stock, isLoading: stockLoading } = useGetStockDetail(symbol as string);
   const { data: comments, isLoading: commentsLoading } = useGetStockComments(
      symbol as string
   );
   const { mutate: createComment } = useAddComment();
   const { mutate: addToPortfolio } = useCreatePortfolio();

   const handleAddComment = async (e: FormEvent) => {
      e.preventDefault();
      if (!symbol || !commentTitle || !commentContent) return;

      setSubmittingComment(true);
      createComment({ symbol, title: commentTitle, content: commentContent });
   };

   const handleAddToPortfolio = () => {
      if (symbol) addToPortfolio(symbol);
   };

   if (stockLoading)
      return (
         <Layout>
            <Loader>Loading stock details..</Loader>
         </Layout>
      );

   if (!stock)
      return (
         <Layout>
            <div className="text-gray-300">Stock not found</div>
         </Layout>
      );

   return (
      <Layout>
         <div className="space-y-6">
            <button
               onClick={() => navigate("/explorer")}
               className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
               <ArrowLeft className="w-4 h-4" />
               Back to Explorer
            </button>

            <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-8">
               <div className="flex items-start justify-between mb-6">
                  <div>
                     <h1 className="text-4xl font-bold text-white">{stock.symbol}</h1>
                     <p className="text-gray-300 mt-2">{stock.companyName}</p>
                  </div>
                  <button
                     onClick={handleAddToPortfolio}
                     className="flex items-center gap-2 px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors"
                  >
                     <Plus className="w-4 h-4" />
                     Add to Portfolio
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                     <p className="text-gray-400 text-sm mb-1">Purchase Price</p>
                     <p className="text-3xl font-bold text-white">
                        ${stock.purchase.toFixed(2)}
                     </p>
                  </div>
                  <div>
                     <p className="text-gray-400 text-sm mb-1">Last Dividend</p>
                     <p className="text-3xl font-bold text-green-400">
                        ${stock.lastDiv.toFixed(2)}
                     </p>
                  </div>
                  <div>
                     <p className="text-gray-400 text-sm mb-1">Market Cap</p>
                     <p className="text-2xl font-bold text-white">
                        ${(stock.marketCap / 1e9).toFixed(2)}B
                     </p>
                  </div>
                  <div>
                     <p className="text-gray-400 text-sm mb-1">Industry</p>
                     <p className="text-xl font-bold text-white">{stock.industry}</p>
                  </div>
               </div>
            </div>

            <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
               <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-gray-300" />
                  Discussion ({comments?.length || 0})
               </h2>

               <form onSubmit={handleAddComment} className="mb-6 space-y-4">
                  <input
                     type="text"
                     placeholder="Comment title (min 5 chars)"
                     value={commentTitle}
                     onChange={(e) => setCommentTitle(e.target.value)}
                     maxLength={256}
                     className="w-full px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600"
                     required
                  />
                  <textarea
                     placeholder="Your comment (min 5 chars)"
                     value={commentContent}
                     onChange={(e) => setCommentContent(e.target.value)}
                     maxLength={256}
                     className="w-full px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600"
                     rows={3}
                     required
                  />
                  <button
                     type="submit"
                     disabled={submittingComment}
                     className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50"
                  >
                     Post Comment
                  </button>
               </form>

               <div className="space-y-3">
                  {commentsLoading ? (
                     <p className="text-gray-300 text-center py-4">Loading comments...</p>
                  ) : comments && comments.length > 0 ? (
                     comments.map((comment: Comment) => (
                        <div key={comment.id} className="bg-[#08101A]/60 rounded-lg p-4">
                           <p className="font-medium text-white">{comment.title}</p>
                           <p className="text-sm text-gray-300 mt-1">{comment.content}</p>
                           <p className="text-xs text-gray-400 mt-2">
                              By {comment.createdBy}
                           </p>
                        </div>
                     ))
                  ) : (
                     <p className="text-gray-300 text-center py-4">
                        No comments yet. Be the first to comment!
                     </p>
                  )}
               </div>
            </div>
         </div>
      </Layout>
   );
}

export default StockDetails;
