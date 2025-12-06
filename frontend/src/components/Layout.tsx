import { Link, useLocation } from "react-router-dom";
import { LogOut, BarChart3, TrendingUp, PieChart, Search } from "lucide-react";
import type { ReactNode } from "react";
import { useAppSelector } from "@/store/hooks";
import useLogout from "@/feature/auth/hooks/useLogout";
import { Button } from "./ui/button";

function Layout({ children }: { children: ReactNode }) {
   const { user } = useAppSelector((state) => state.auth);
   const location = useLocation();
   const { mutate: logout } = useLogout();

   const isActive = (path: string) => location.pathname === path;

   return (
      <div className="flex min-h-screen bg-[#0B0F17] text-foreground">
         <aside className="w-64 border-r border-border bg-[#111827]/80 backdrop-blur-md p-6 sticky top-0 h-screen">
            <div className="mb-8">
               <Link to="/dashboard" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                     <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">StockBook</span>
               </Link>
            </div>

            <nav className="space-y-2 mb-8">
               <Link
                  to="/dashboard"
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                     isActive("/dashboard")
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-[#1F2937]"
                  }`}
               >
                  <BarChart3 className="w-5 h-5" />
                  <span>Dashboard</span>
               </Link>

               <Link
                  to="/explorer"
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                     isActive("/explorer")
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-[#1F2937]"
                  }`}
               >
                  <Search className="w-5 h-5" />
                  <span>Stock Explorer</span>
               </Link>

               <Link
                  to="/portfolio"
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                     isActive("/portfolio")
                        ? "bg-primary text-white"
                        : "text-gray-300 hover:bg-[#1F2937]"
                  }`}
               >
                  <PieChart className="w-5 h-5" />
                  <span>My Portfolio</span>
               </Link>
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
               <div className="border-t border-border pt-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Logged in as</p>
                  <p className="text-sm font-medium text-white truncate">
                     {user?.userName}
                  </p>
               </div>

               <Button
                  onClick={() => logout()}
                  className="w-full flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20"
               >
                  Logout
                  <LogOut className="w-4 h-4" />
               </Button>
            </div>
         </aside>

         <main className="flex-1 p-8 bg-[#0B0F17]">{children}</main>
      </div>
   );
}

export default Layout;
