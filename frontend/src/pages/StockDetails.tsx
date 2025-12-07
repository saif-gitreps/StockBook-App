import Layout from "@/components/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Loader from "@/components/Loader";
import useGetStockDetail from "@/feature/stocks/hooks/useGetStockDetail";
import { Button } from "@/components/ui/button";
import CommentSection from "@/feature/comments/components/CommentSection";
import StockDetailsSection from "@/feature/stocks/components/StockDetailsSection";

function StockDetails() {
   const { symbol } = useParams<{ symbol: string }>();
   const navigate = useNavigate();
   const { data: stock, isLoading: stockLoading } = useGetStockDetail(symbol as string);

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
            <Button
               onClick={() => navigate("/explorer")}
               variant={"link"}
               className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors hover:cursor-pointer"
            >
               <ArrowLeft className="w-4 h-4" />
               Back to Explorer
            </Button>

            <StockDetailsSection stock={stock} symbol={symbol} />

            <CommentSection symbol={symbol} />
         </div>
      </Layout>
   );
}

export default StockDetails;
