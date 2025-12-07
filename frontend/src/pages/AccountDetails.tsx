import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import useUpdateUser from "@/feature/auth/hooks/useUpdateUser";
import { useAppSelector } from "@/store/hooks";
import type { UpdateUserForm } from "@/types/common";
import { useForm } from "react-hook-form";

function AccountDetails() {
   const { user } = useAppSelector((state) => state.auth);
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<UpdateUserForm>({
      defaultValues: {
         email: user?.email || "",
         userName: user?.userName || "",
         password: "",
      },
   });

   const { mutate: updateUser } = useUpdateUser();

   const onSubmit = (data: UpdateUserForm) => {
      updateUser(data);
   };

   return (
      <Layout>
         <div className="max-w-xl mx-auto bg-[#0B1220] border border-[#1F2937] rounded-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Update Account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
               <div>
                  <label className="text-gray-300 block mb-1">Email</label>
                  <input
                     type="email"
                     {...register("email", {
                        required: "Email is required",
                        pattern: {
                           value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                           message: "Invalid email format",
                        },
                     })}
                     className="w-full px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600"
                     placeholder="Enter your email"
                  />
                  {errors.email && (
                     <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
               </div>

               <div>
                  <label className="text-gray-300 block mb-1">Username</label>
                  <input
                     type="text"
                     {...register("userName", {
                        required: "Username is required",
                        minLength: {
                           value: 3,
                           message: "Minimum 3 characters required",
                        },
                     })}
                     className="w-full px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600"
                     placeholder="Enter your username"
                  />
                  {errors.userName && (
                     <p className="text-red-400 text-sm mt-1">
                        {errors.userName.message}
                     </p>
                  )}
               </div>

               <div>
                  <label className="text-gray-300 block mb-1">Password</label>
                  <input
                     type="password"
                     {...register("password", {
                        required: "Password is required",
                        minLength: {
                           value: 6,
                           message: "Minimum 6 characters required",
                        },
                     })}
                     className="w-full px-4 py-2 bg-[#08101A] border border-[#1F2937] rounded-lg text-white placeholder-gray-400 
                     focus:outline-none focus:ring-2 focus:ring-cyan-600"
                     placeholder="Enter new password"
                  />
                  {errors.password && (
                     <p className="text-red-400 text-sm mt-1">
                        {errors.password.message}
                     </p>
                  )}
               </div>

               <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-cyan-800 text-white rounded-lg hover:bg-cyan-500 transition-colors disabled:opacity-50 hover:cursor-pointer"
               >
                  Update Account
               </Button>
            </form>
         </div>
      </Layout>
   );
}

export default AccountDetails;
