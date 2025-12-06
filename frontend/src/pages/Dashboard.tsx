import Layout from "@/components/Layout";
import Loader from "@/components/Loader";
import useGetPortfolio from "@/feature/portfolio/hooks/useGetPortfolio";

import type { Portfolio } from "@/types/common";
import { Activity, DollarSign, TrendingUp } from "lucide-react";

function Dashboard() {
   const { data: portfolio, isLoading } = useGetPortfolio();

   const calculatePortfolioValue = () => {
      if (!portfolio) return 0;
      return portfolio.reduce(
         (sum: number, stock: Portfolio) => sum + (stock.purchase || 0),
         0
      );
   };

   const calculateTotalInvested = () => {
      if (!portfolio) return 0;
      return portfolio.length * 100;
   };

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
               <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-gray-400 text-sm font-medium">
                              Portfolio Value
                           </span>
                           <DollarSign className="w-5 h-5 text-cyan-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">
                           ${calculatePortfolioValue().toLocaleString()}
                        </p>
                        <p className="text-green-400 text-sm mt-2">+12.5% this month</p>
                     </div>

                     <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-gray-400 text-sm font-medium">
                              Holdings
                           </span>
                           <Activity className="w-5 h-5 text-cyan-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">
                           {portfolio?.length || 0}
                        </p>
                        <p className="text-gray-300 text-sm mt-2">stocks in portfolio</p>
                     </div>

                     <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                           <span className="text-gray-400 text-sm font-medium">
                              Total Invested
                           </span>
                           <TrendingUp className="w-5 h-5 text-cyan-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">
                           ${calculateTotalInvested().toLocaleString()}
                        </p>
                        <p className="text-gray-300 text-sm mt-2">across all positions</p>
                     </div>
                  </div>

                  <div className="bg-[#0B1220] border border-[#1F2937] rounded-lg p-6">
                     <h2 className="text-xl font-bold text-white mb-4">
                        Recent Holdings
                     </h2>
                     {portfolio && portfolio.length > 0 ? (
                        <div className="space-y-3">
                           {portfolio.slice(0, 5).map((stock: Portfolio) => (
                              <div
                                 key={stock.symbol}
                                 className="flex items-center justify-between p-3 bg-[#08101A] rounded-lg"
                              >
                                 <div>
                                    <p className="font-medium text-white">
                                       {stock.symbol}
                                    </p>
                                    <p className="text-sm text-gray-300">
                                       {stock.companyName}
                                    </p>
                                 </div>
                                 <div className="text-right">
                                    <p className="font-bold text-white">
                                       ${stock.purchase.toFixed(2)}
                                    </p>
                                    <p className="text-sm text-green-400">+5.2%</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     ) : (
                        <p className="text-gray-300 text-center py-8">
                           No stocks in portfolio yet
                        </p>
                     )}
                  </div>
               </>
            )}
         </div>
      </Layout>
   );
}

export default Dashboard;
