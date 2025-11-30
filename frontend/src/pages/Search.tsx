import CardList from "@/feature/portfolio/components/CardList";
import PortfolioList from "@/feature/portfolio/components/PortfolioList";
import useCreatePortfolio from "@/feature/portfolio/hooks/useCreatePortfolio";
import useDeletePortfolio from "@/feature/portfolio/hooks/useDeletePortfolio";
import useGetPortfolio from "@/feature/portfolio/hooks/useGetPortfolio";
import SearchBar from "@/feature/search/components/SearchBar";
import useGetSearchResult from "@/feature/search/hooks/useGetSearchResult";
import { useState, type ChangeEvent, type FormEvent } from "react";

function Search() {
   const [searchQuery, setSearchQuery] = useState<string>("");

   const { data: searchResult, isLoading: isSearchResultLoading } =
      useGetSearchResult(searchQuery);
   const { data: portfolios, isLoading: isPortfolioLoading } = useGetPortfolio();
   const { mutate: createPortfolio, isPending: isCreatePortfolioPending } =
      useCreatePortfolio();
   const { mutate: deletePortfolio, isPending: isDeletePortfolioPending } =
      useDeletePortfolio();

   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
   };
   const onCreatePortfolio = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      createPortfolio(searchResult?.data[0].symbol);
   };
   const onDeletePortfolio = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      deletePortfolio(searchResult?.data[0].symbol);
   };

   return (
      <div>
         <SearchBar search={searchQuery} handleSearchChange={handleSearchChange} />

         <PortfolioList
            portfolioValues={portfolios?.data}
            onDeletePortfolio={onDeletePortfolio}
            isPortfolioLoading={isPortfolioLoading}
            isDeletePortfolioPending={isDeletePortfolioPending}
            isCreatePortfolioPending={isCreatePortfolioPending}
         />

         <CardList
            searchResults={searchResult?.data}
            onCreatePortfolio={onCreatePortfolio}
            isSearchResultLoading={isSearchResultLoading}
         />
      </div>
   );
}

export default Search;
