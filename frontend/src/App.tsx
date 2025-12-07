import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import StockExplorer from "./pages/StockExplorer";
import Portfolio from "./pages/Portfolio";
import StockDetails from "./pages/StockDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AccountDetails from "./pages/AccountDetails";
import { ToastContainer } from "react-toastify";

function App() {
   return (
      <>
         <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
               path="/login"
               element={
                  <ProtectedRoute auth={false}>
                     <LoginPage />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/register"
               element={
                  <ProtectedRoute auth={false}>
                     <Register />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/dashboard"
               element={
                  <ProtectedRoute>
                     <Dashboard />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/account"
               element={
                  <ProtectedRoute>
                     <AccountDetails />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/explorer"
               element={
                  <ProtectedRoute>
                     <StockExplorer />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/portfolio"
               element={
                  <ProtectedRoute>
                     <Portfolio />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/stock/:symbol"
               element={
                  <ProtectedRoute>
                     <StockDetails />
                  </ProtectedRoute>
               }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
         </Routes>
         <ToastContainer theme="dark" />
      </>
   );
}

export default App;
