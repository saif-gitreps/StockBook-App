import useFindTenK from "../hooks/useFindTenK";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";

type TenKProps = {
   ticker: string | undefined;
};

function TenK({ ticker }: TenKProps) {
   const { data, isLoading } = useFindTenK(ticker as string);

   if (isLoading) {
      return <Loader />;
   }
   return (
      data &&
      data?.slice(0, 5).map((tenK) => (
         <Link
            reloadDocument
            to={tenK.finalLink}
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-lightGreen border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
         >
            10K - {tenK.symbol} - {new Date(tenK.fillingDate).getFullYear()}
         </Link>
      ))
   );
}

export default TenK;
