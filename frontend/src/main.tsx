import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store.ts";
import { queryClient } from "./lib/queryClient.ts";
import Layout from "./layouts/Layout.tsx";
import AuthProvider from "./components/AuthProvider.tsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <Provider store={store}>
         <QueryClientProvider client={queryClient}>
            <Router>
               <AuthProvider>
                  <Layout>
                     <App />
                  </Layout>
               </AuthProvider>
            </Router>
         </QueryClientProvider>
      </Provider>
   </StrictMode>
);
