import { ToastContainer } from "react-toastify";

function Layout({ children }: { children: React.ReactNode }) {
   return (
      <div className="flex flex-col min-h-screen">
         <div>{/* Header */}</div>
         <ToastContainer />
         <main className="container mx-auto pt-20 pb-16 flex-1">{children}</main>
         <div>{/* Footer */}</div>
      </div>
   );
}

export default Layout;
