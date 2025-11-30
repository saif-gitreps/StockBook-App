import Loader from "@/components/Loader";
import type { CompanySearch } from "@/types/company";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type CardListProps = {
   searchResults: CompanySearch[] | undefined;
   onCreatePortfolio: (e: FormEvent<HTMLFormElement>) => void;
   isSearchResultLoading: boolean;
};

function CardList({
   searchResults,
   onCreatePortfolio,
   isSearchResultLoading,
}: CardListProps) {
   return (
      <div>
         {isSearchResultLoading && <Loader />}

         {searchResults && searchResults.length > 0 ? (
            searchResults.map((result, index) => {
               return (
                  <Card
                     id={result.symbol}
                     key={index}
                     searchResult={result}
                     onCreatePortfolio={onCreatePortfolio}
                  />
               );
            })
         ) : (
            <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
               No results!
            </p>
         )}
      </div>
   );
}

type CardProps = {
   id: string;
   searchResult: CompanySearch;
   onCreatePortfolio: (e: FormEvent<HTMLFormElement>) => void;
};

function Card({ id, searchResult, onCreatePortfolio }: CardProps) {
   return (
      <div
         className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row"
         key={id}
         id={id}
      >
         <Link
            to={`/company/${searchResult.symbol}/company-profile`}
            className="font-bold text-center text-veryDarkViolet md:text-left"
         >
            {searchResult.name} ({searchResult.symbol})
         </Link>

         <p className="text-veryDarkBlue">{searchResult.currency}</p>
         <p className="font-bold text-veryDarkBlue">
            {searchResult.exchangeShortName} - {searchResult.stockExchange}
         </p>

         <div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
            <form onSubmit={onCreatePortfolio}>
               <input readOnly={true} hidden={true} value={searchResult.symbol} />
               <button
                  type="submit"
                  className="p-2 px-8 text-white bg-darkBlue rounded-lg hover:opacity-70 focus:outline-none"
               >
                  Add
               </button>
            </form>
         </div>
      </div>
   );
}

export default CardList;
