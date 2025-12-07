import { Search } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

type StockSearchBarProps = {
   searchSymbol: string;
   searchCompany: string;
   sortOrder: string;
   setSearchSymbol: Dispatch<SetStateAction<string>>;
   setSearchCompany: Dispatch<SetStateAction<string>>;
   setSortOrder: Dispatch<SetStateAction<string>>;
   setPageNumber: Dispatch<SetStateAction<number>>;
};

function StockSearchBar({
   searchSymbol,
   searchCompany,
   sortOrder,
   setSearchSymbol,
   setSearchCompany,
   setSortOrder,
   setPageNumber,
}: StockSearchBarProps) {
   return (
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
   );
}

export default StockSearchBar;
