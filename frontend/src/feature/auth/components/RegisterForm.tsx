import { useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSignUp from "../hooks/useSignUp";
import type { RegisterFormData } from "@/types/common";

function RegisterForm() {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<RegisterFormData>();

   const { mutate: signUp, isPending } = useSignUp();

   const onSubmit = handleSubmit((data) => {
      signUp(data);
   });

   return (
      <form className="max-w-2xl mx-auto" onSubmit={onSubmit}>
         <div className="">
            <h1 className="text-3xl font-bold">Create a new account</h1>
            <p className="text-lg font-normal">
               Already have an account?{" "}
               <Button variant="outline" type="button" asChild>
                  <Link to="/login" className="text-lg">
                     Login
                     <ArrowRight size={24} />
                  </Link>
               </Button>
            </p>
         </div>

         <div className="flex flex-col md:flex-row gap-5">
            <label htmlFor="email" className="text-gray-700 text-md font-bold flex-1">
               Email:
               <input
                  type="email"
                  id="email"
                  className="border w-full border-gray-400 rounded p-2 font-normal"
                  {...register("email", {
                     required: "Email is required",
                  })}
               />
               {errors.email && (
                  <span className="text-red-600">{errors.email.message}</span>
               )}
            </label>

            <label htmlFor="username" className="text-gray-700 text-md font-bold flex-1">
               Username:
               <input
                  type="text"
                  id="username"
                  className="border w-full border-gray-400 rounded p-2 font-normal"
                  {...register("userName", {
                     required: "username is required",

                     maxLength: {
                        value: 20,
                        message: "username should be less than 20 characters",
                     },
                  })}
               />
               {errors.userName && (
                  <span className="text-red-600">{errors.userName.message}</span>
               )}
            </label>
         </div>

         <div className="flex flex-col md:flex-row gap-5">
            <label htmlFor="password" className="text-gray-700 text-md font-bold flex-1">
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
               {isPending ? "Please wait.." : "Submit"}
            </Button>

            {/* <GuestLoginButton variant={"link"}>
               Sign in as a guest <ArrowUpRight />{" "}
            </GuestLoginButton> */}
         </div>
      </form>
   );
}

export default RegisterForm;
