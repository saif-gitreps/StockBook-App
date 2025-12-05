import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Company from "./pages/Company";
import CompanyProfile from "./pages/CompanyProfile";

function App() {
   const { isAuthenticated } = useAppSelector((state) => state.auth);

   return (
      <Routes>
         {<Route path="/" element={<Home />} />}
         {isAuthenticated && <Route path="/search" element={<Search />} />}
         {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
         {!isAuthenticated && <Route path="/register" element={<Register />} />}
         {isAuthenticated && (
            <Route path="/company" element={<Company />}>
               <Route path="/company-profile" element={<CompanyProfile />} />
               {/* <Route path="income-statement" element={<IncomeStatement />} />
               <Route path="balance-sheet" element={<BalanceSheet />} />
               <Route path="cashflow-statement" element={<CashflowStatement />} />
               <Route path="historical-dividend" element={<HistoricalDividend />} /> */}
            </Route>
         )}
         {
            <Route
               path="/*"
               element={
                  <div className="text-center text-red-400">404 Page not found</div>
               }
            />
         }
      </Routes>
   );
}

export default App;
