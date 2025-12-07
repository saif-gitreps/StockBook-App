import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useSignIn from "../hooks/useSignIn";
import type { LoginFormData } from "@/types/common";
import GuestLogin from "./GuestLogin";

function LoginForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginFormData>();

   const { mutate: login, isPending } = useSignIn();

   const onSubmit = (data: LoginFormData) => {
      login(data);
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-black h-screen">
         <div className="max-w-2xl mx-auto pt-10 text-white">
            <div>
               <h1 className="text-3xl font-bold">Login</h1>
               <p className="text-lg font-normal">
                  Do not have an account?{" "}
                  <Button variant="secondary" type="button" asChild>
                     <Link to="/register" className="text-lg">
                        Register
                        <ArrowRight size={24} />
                     </Link>
                  </Button>
               </p>
            </div>

            <div className="flex flex-col gap-5">
               <label htmlFor="email" className="text-gray-400 text-md font-bold flex-1">
                  User name:
                  <input
                     type="text"
                     id="text"
                     className="border w-full border-gray-400 rounded p-2 font-normal"
                     {...register("userName", {
                        required: "userName is required",
                     })}
                  />
                  {errors.userName && (
                     <span className="text-red-600">{errors.userName.message}</span>
                  )}
               </label>

               <label
                  htmlFor="password"
                  className="text-gray-400 text-md font-bold flex-1"
               >
                  Password:
                  <input
                     type="password"
                     id="password"
                     className="border w-full border-gray-400 rounded p-2 font-normal"
                     {...register("password", {
                        required: "Password is required",

                        minLength: {
                           value: 6,
                           message: "Password should be at least 6 characters",
                        },
                     })}
                  />
                  {errors.password && (
                     <span className="text-red-600">{errors.password.message}</span>
                  )}
               </label>
            </div>

            <div className="flex items-center gap-2 mt-2">
               <Button type="submit" className="w-36" disabled={isPending}>
                  {isPending ? "Please wait.." : "Login"}
               </Button>

               <GuestLogin />
            </div>
         </div>
      </form>
   );
}

export default LoginForm;
