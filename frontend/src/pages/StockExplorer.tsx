import useGetStocks from "@/feature/stocks/hooks/useGetStocks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import StockSearchBar from "@/feature/stocks/components/StockSearchBar";
import StockSearchResultTable from "@/feature/stocks/components/StockSearchResultTable";
import useDebounce from "@/hooks/useDebounce";

function StockExplorer() {
   const [searchSymbol, setSearchSymbol] = useState<string>("");
   const [searchCompany, setSearchCompany] = useState<string>("");
   const debouncedSearchSymbol = useDebounce(searchSymbol, 500);
   const debouncedSearchCompany = useDebounce(searchCompany, 500);
   const [sortOrder, setSortOrder] = useState<string>("desc");
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [pageSize] = useState<number>(10);

   const { data: stocks, isLoading } = useGetStocks({
      symbol: debouncedSearchSymbol || undefined,
      companyName: debouncedSearchCompany || undefined,
      sortBy: "Symbol",
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

            <StockSearchBar
               searchSymbol={searchSymbol}
               searchCompany={searchCompany}
               sortOrder={sortOrder}
               setSearchSymbol={setSearchSymbol}
               setSearchCompany={setSearchCompany}
               setSortOrder={setSortOrder}
               setPageNumber={setPageNumber}
            />

            <StockSearchResultTable isLoading={isLoading} stocks={stocks} />

            <div className="flex items-center justify-between">
               <Button
                  onClick={() => setPageNumber(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber === 1}
                  className="flex items-center gap-2 px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-gray-400 hover:text-white disabled:opacity-50"
               >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
               </Button>

               <span className="text-gray-400">Page {pageNumber}</span>

               <Button
                  onClick={() => setPageNumber(pageNumber + 1)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-500"
               >
                  Next
                  <ChevronRight className="w-4 h-4" />
               </Button>
            </div>
         </div>
      </Layout>
   );
}

export default StockExplorer;
