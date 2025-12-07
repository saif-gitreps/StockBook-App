import type { Stock } from "@/types/common";
import { useNavigate } from "react-router-dom";

type StockSearchResultTableProps = {
   isLoading: boolean;
   stocks: Stock[] | undefined;
};

function StockSearchResultTable({ isLoading, stocks }: StockSearchResultTableProps) {
   const navigate = useNavigate();
   return (
      <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-[#08101A]/50 border-b border-[#1F2937]">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Symbol
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Company
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Price
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Dividend
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Market Cap
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                        Industry
                     </th>
                  </tr>
               </thead>

               <tbody className="divide-y divide-[#1F2937]">
                  {isLoading ? (
                     <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                           Loading stocks...
                        </td>
                     </tr>
                  ) : stocks && stocks?.length > 0 ? (
                     stocks?.map((stock: Stock) => (
                        <tr
                           key={stock.symbol}
                           className="hover:bg-[#08101A]/50 transition-colors cursor-pointer"
                           onClick={() => navigate("/stock/" + stock.symbol)}
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
                           <td className="px-6 py-4 text-sm text-white">
                              ${(stock.marketCap / 1e9).toFixed(2)}B
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-400">
                              {stock.industry}
                           </td>
                        </tr>
                     ))
                  ) : (
                     <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                           No stocks found
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
   );
}

export default StockSearchResultTable;
