import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import PortfolioSummary from "@/feature/portfolio/components/PortfolioSummary";
import useGetPortfolio from "@/feature/portfolio/hooks/useGetPortfolio";

function Dashboard() {
   const { data: portfolio, isLoading } = useGetPortfolio();

   return (
      <Layout>
         <div className="space-y-8">
            <div>
               <h1 className="text-4xl font-bold text-white mb-2">Portfolio Dashboard</h1>
               <p className="text-gray-300">
                  Welcome back! Here's your portfolio overview
               </p>
            </div>

            {isLoading ? (
               <Loader>Portfolio is loading..</Loader>
            ) : (
               <PortfolioSummary portfolio={portfolio} />
            )}
         </div>
      </Layout>
   );
}

export default Dashboard;
