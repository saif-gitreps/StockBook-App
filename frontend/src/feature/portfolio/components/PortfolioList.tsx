import type { FormEvent } from "react";
import PortfolioCard from "./PortfolioCard";
import type { Portfolio } from "@/types/common";
import Loader from "@/components/Loader";

type PortfolioListProps = {
   portfolioValues: Portfolio[] | undefined;
   onDeletePortfolio: (e: FormEvent<HTMLFormElement>) => void;
   isPortfolioLoading: boolean;
   isCreatePortfolioPending: boolean;
   isDeletePortfolioPending: boolean;
};

function PortfolioList({
   portfolioValues,
   onDeletePortfolio,
   isPortfolioLoading,
   isCreatePortfolioPending,
   isDeletePortfolioPending,
}: PortfolioListProps) {
   return (
      <section id="portfolio">
         <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
            My Portfolio
         </h2>
         <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
            <>
               {(isPortfolioLoading ||
                  isDeletePortfolioPending ||
                  isCreatePortfolioPending) && <Loader />}

               {portfolioValues && portfolioValues.length > 0 ? (
                  portfolioValues.map((portfolioValue) => {
                     return (
                        <PortfolioCard
                           key={portfolioValue.symbol}
                           portfolioValue={portfolioValue}
                           onDeletePortfolio={onDeletePortfolio}
                        />
                     );
                  })
               ) : (
                  <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                     Your portfolio is empty.
                  </h3>
               )}
            </>
         </div>
      </section>
   );
}

export default PortfolioList;
