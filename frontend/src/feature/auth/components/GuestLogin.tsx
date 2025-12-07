import { Button } from "@/components/ui/button";
import useSignIn from "../hooks/useSignIn";

function GuestLogin() {
   const { mutate: login, isPending } = useSignIn();

   return (
      <Button
         onClick={() =>
            login({
               userName: "pear",
               password: "Pe@rl_harbour4",
            })
         }
         disabled={isPending}
      >
         {isPending ? "Please wait.." : "Try as a Guest"}
      </Button>
   );
}

export default GuestLogin;
