import { Button } from "@/components/ui/button";
import type { Portfolio } from "@/types/common";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";

type PortfolioCardProps = {
   portfolioValue: Portfolio;
   onDeletePortfolio: (e: FormEvent<HTMLFormElement>) => void;
};

function PortfolioCard({ portfolioValue, onDeletePortfolio }: PortfolioCardProps) {
   return (
      <div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
         <Link
            to={`/company/${portfolioValue.symbol}/company-profile`}
            className="pt-6 text-xl font-bold"
         >
            {portfolioValue.symbol}
         </Link>

         <div>
            <form onSubmit={onDeletePortfolio}>
               <input hidden={true} value={portfolioValue.symbol} readOnly />
               <Button type="submit">Remove</Button>
            </form>
         </div>
      </div>
   );
}

export default PortfolioCard;
