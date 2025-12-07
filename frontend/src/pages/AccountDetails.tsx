import Layout from "@/components/Layout";
import UpdateUserFormComponent from "@/feature/auth/components/UpdateUserForm";

function AccountDetails() {
   return (
      <Layout>
         <div className="max-w-xl mx-auto bg-[#0B1220] border border-[#1F2937] rounded-lg p-8">
            <h1 className="text-3xl font-bold text-white mb-6">Update Account</h1>

            <UpdateUserFormComponent />
         </div>
      </Layout>
   );
}

export default AccountDetails;
