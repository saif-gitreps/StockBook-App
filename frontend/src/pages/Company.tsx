import Loader from "@/components/Loader";
import Sidebar from "@/feature/company/component/Sidebar";
import Tile from "@/feature/company/component/Tile";
import useGetCompanyProfile from "@/feature/company/hooks/useGetCompanyProfile";
import { Outlet } from "react-router-dom";

function Company() {
   const { data: company, isLoading } = useGetCompanyProfile();

   if (isLoading) {
      return <Loader />;
   }
   return (
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
         <Sidebar />

         <div className="relative md:ml-64 bg-blueGray-100 w-full">
            <div className="relative pt-20 pb-32 bg-lightBlue-500">
               <div className="px-4 md:px-6 mx-auto w-full">
                  <div>
                     <div className="flex flex-wrap">
                        <Tile title="Company Name" subTitle={company?.companyName} />
                        <Tile title="Price" subTitle={"$" + company?.price.toString()} />
                        <Tile title="DCF" subTitle={"$" + company?.dcf.toString()} />
                        <Tile title="Sector" subTitle={company?.sector} />
                        <CompFinder ticker={company?.symbol} />
                        <TenKFinder ticker={company?.symbol} />
                        <p className="bg-white shadow rounded text-medium font-medium text-gray-900 p-3 mt-1 m-4">
                           {company.description}
                        </p>
                     </div>
                     <div className="flex flex-wrap">{<Outlet context={ticker} />}</div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Company;
