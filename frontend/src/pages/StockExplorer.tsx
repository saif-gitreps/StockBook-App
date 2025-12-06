import useGetStocks from "@/feature/stocks/hooks/useGetStocks";
import type { Stock } from "@/types/common";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";

function StockExplorer() {
   const [searchSymbol, setSearchSymbol] = useState("");
   const [searchCompany, setSearchCompany] = useState("");
   const [sortOrder, setSortOrder] = useState("asc");
   const [pageNumber, setPageNumber] = useState(1);
   const [pageSize] = useState(10);
   const navigate = useNavigate();

   const { data: stocks, isLoading } = useGetStocks({
      symbol: searchSymbol || undefined,
      companyName: searchCompany || undefined,
      sortBy: "symbol",
      sortOrder,
      pageNumber,
      pageSize,
   });

   return (
      <Layout>
         <div className="space-y-6">
            <div>
               <h1 className="text-4xl font-bold text-white mb-2">Stock Explorer</h1>
               <p className="text-gray-400">Search and explore available stocks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search by symbol..."
                     value={searchSymbol}
                     onChange={(e) => {
                        setSearchSymbol(e.target.value);
                        setPageNumber(1);
                     }}
                     className="w-full pl-10 pr-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
               </div>

               <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                     type="text"
                     placeholder="Search by company..."
                     value={searchCompany}
                     onChange={(e) => {
                        setSearchCompany(e.target.value);
                        setPageNumber(1);
                     }}
                     className="w-full pl-10 pr-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-600"
                  />
               </div>

               <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-600"
               >
                  <option value="asc">Sort Ascending</option>
                  <option value="desc">Sort Descending</option>
               </select>
            </div>

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
                              <td
                                 colSpan={6}
                                 className="px-6 py-4 text-center text-gray-400"
                              >
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
                              <td
                                 colSpan={6}
                                 className="px-6 py-4 text-center text-gray-400"
                              >
                                 No stocks found
                              </td>
                           </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="flex items-center justify-between">
               <button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-gray-400 hover:text-white disabled:opacity-50"
               >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
               </button>

               <span className="text-gray-400">Page {pageNumber}</span>

               <button
                  onClick={() => setPageNumber(pageNumber + 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500"
               >
                  Next
                  <ChevronRight className="w-4 h-4" />
               </button>
            </div>
         </div>
      </Layout>
   );
}

export default StockExplorer;
