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
         Try as Guest
      </Button>
   );
}

export default GuestLogin;
