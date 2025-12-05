import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
   return (
      <section id="hero">
         <div className="container flex flex-col-reverse mx-auto p-8 lg:flex-row">
            <div className="flex flex-col space-y-10 mb-44 m-10 lg:m-10 xl:m-20 lg:mt:16 lg:w-1/2 xl:mb-52">
               <h1 className="text-5xl font-bold text-center lg:text-6xl lg:max-w-md lg:text-left">
                  Financial data with no news.
               </h1>
               <p className="text-2xl text-center text-gray-500 lg:max-w-md lg:text-left">
                  Search relevant financial documents without fear mongering and fake
                  news.
               </p>

               <div className="mx-auto lg:mx-0">
                  <Link
                     to="/login"
                     className="py-5 px-10 text-2xl font-bold text-gray-700 underline bg-lightGreen rounded lg:py-4 hover:opacity-70 flex items-center gap-2"
                  >
                     Get Started <ArrowRight />
                  </Link>
               </div>
            </div>
            <div className="mb-24 mx-auto md:w-180 md:px-10 lg:mb-0 lg:w-1/2">
               <img src={"stock.jpg"} alt="stock" className="rounded-xl shadow-2xl" />
               {/* <ChartLine size={300} className="stroke-green-500" /> */}
            </div>
         </div>
      </section>
   );
}

export default Home;
