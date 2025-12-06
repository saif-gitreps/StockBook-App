import { useState } from "react";
import { Trash2, TrendingUp } from "lucide-react";
import useGetPortfolio from "@/feature/portfolio/hooks/useGetPortfolio";
import useDeletePortfolio from "@/feature/portfolio/hooks/useDeletePortfolio";
import type { Portfolio } from "@/types/common";
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";

export default function Portfolio() {
   const { data: portfolio, isLoading } = useGetPortfolio();
   const { mutate: removeStock } = useDeletePortfolio();
   const [removingSymbol, setRemovingSymbol] = useState<string | null>(null);

   const handleRemove = (symbol: string) => {
      setRemovingSymbol(symbol);
      removeStock(symbol, {
         onSuccess: () => {
            setRemovingSymbol(null);
         },
      });
   };

   const totalValue =
      portfolio?.reduce((sum: number, stock: Portfolio) => sum + stock.purchase, 0) || 0;
   const gainLoss = (totalValue * 0.052).toFixed(2);

   return (
      <Layout>
         <div className="space-y-6">
            <div>
               <h1 className="text-4xl font-bold text-white mb-2">My Portfolio</h1>
               <p className="text-gray-300">Manage your stock holdings</p>
            </div>

            {isLoading ? (
               <Loader />
            ) : (
               <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
                        <p className="text-gray-400 text-sm font-medium mb-2">
                           Total Value
                        </p>
                        <p className="text-3xl font-bold text-white">
                           ${totalValue.toLocaleString()}
                        </p>
                     </div>
                     <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
                        <p className="text-gray-400 text-sm font-medium mb-2">
                           Gain/Loss
                        </p>
                        <p className="text-3xl font-bold text-cyan-400">+${gainLoss}</p>
                     </div>
                  </div>

                  <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg overflow-hidden">
                     <div className="overflow-x-auto">
                        <table className="w-full">
                           <thead className="bg-[#08101A]/70 border-b border-[#1F2937]">
                              <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                    Symbol
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                    Company
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                    Purchase Price
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                    Dividend
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                    Industry
                                 </th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                                    Action
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-[#1F2937]">
                              {portfolio && portfolio.length > 0 ? (
                                 portfolio.map((stock: Portfolio) => (
                                    <tr
                                       key={stock.symbol}
                                       className="hover:bg-[#08101A]/50 transition-colors"
                                    >
                                       <td className="px-6 py-4 text-sm font-medium text-cyan-400">
                                          {stock.symbol}
                                       </td>
                                       <td className="px-6 py-4 text-sm text-white">
                                          {stock.companyName}
                                       </td>
                                       <td className="px-6 py-4 text-sm text-white">
                                          ${stock.purchase.toFixed(2)}
                                       </td>
                                       <td className="px-6 py-4 text-sm text-green-400">
                                          ${stock.lastDiv.toFixed(2)}
                                       </td>
                                       <td className="px-6 py-4 text-sm text-gray-300">
                                          {stock.industry}
                                       </td>
                                       <td className="px-6 py-4">
                                          <button
                                             onClick={() => handleRemove(stock.symbol)}
                                             disabled={removingSymbol === stock.symbol}
                                             className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                                          >
                                             <Trash2 className="w-4 h-4" />
                                          </button>
                                       </td>
                                    </tr>
                                 ))
                              ) : (
                                 <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center">
                                       <div className="flex flex-col items-center gap-2">
                                          <TrendingUp className="w-8 h-8 text-gray-400" />
                                          <p className="text-gray-300">
                                             No stocks in portfolio yet
                                          </p>
                                          <p className="text-xs text-gray-400">
                                             Go to Stock Explorer to add stocks
                                          </p>
                                       </div>
                                    </td>
                                 </tr>
                              )}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </>
            )}
         </div>
      </Layout>
   );
}
