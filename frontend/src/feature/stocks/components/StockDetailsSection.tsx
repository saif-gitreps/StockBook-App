import { Button } from "@/components/ui/button";
import useCreatePortfolio from "@/feature/portfolio/hooks/useCreatePortfolio";
import type { Stock } from "@/types/common";
import { Plus } from "lucide-react";

type StockDetailSectionProps = {
   stock: Stock;
   symbol: string | undefined;
};

function StockDetailsSection({ stock, symbol }: StockDetailSectionProps) {
   const { mutate: addToPortfolio } = useCreatePortfolio();

   const handleAddToPortfolio = () => {
      if (symbol) addToPortfolio(symbol);
   };

   return (
      <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-8">
         <div className="flex items-start justify-between mb-6">
            <div>
               <h1 className="text-4xl font-bold text-white">{stock.symbol}</h1>
               <p className="text-gray-300 mt-2">{stock.companyName}</p>
            </div>
            <Button
               onClick={handleAddToPortfolio}
               disabled={!symbol || symbol == ""}
               className="flex items-center gap-2 px-4 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-500 transition-colors"
            >
               <Plus className="w-4 h-4" />
               Add to Portfolio
            </Button>
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
   );
}

export default StockDetailsSection;
