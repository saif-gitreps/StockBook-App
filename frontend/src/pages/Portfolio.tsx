import type { Portfolio } from "@/types/common";
import Loader from "@/components/Loader";
import Layout from "@/components/Layout";
import useGetPortfolio from "@/feature/portfolio/hooks/useGetPortfolio";
import PortfolioTable from "@/feature/portfolio/components/PortfolioTable";

export default function Portfolio() {
   const { data: portfolio, isLoading } = useGetPortfolio();

   return (
      <Layout>
         <div className="space-y-6">
            <div>
               <h1 className="text-4xl font-bold text-white mb-2">My Portfolio</h1>
               <p className="text-gray-300">Manage your stock holdings</p>
            </div>

            {isLoading ? <Loader /> : <PortfolioTable portfolio={portfolio} />}
         </div>
      </Layout>
   );
}
