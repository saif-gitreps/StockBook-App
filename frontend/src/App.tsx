import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useAppSelector } from "./store/hooks";
import LoginPage from "./pages/LoginPage";

function App() {
   const { isAuthenticated } = useAppSelector((state) => state.auth);

   return (
      <Router>
         <Routes>
            {!isAuthenticated && <Route path="/login" element={<LoginPage />} />}
            {<Route path="/" element={<>hello</>} />}
         </Routes>
      </Router>
   );
}

export default App;
