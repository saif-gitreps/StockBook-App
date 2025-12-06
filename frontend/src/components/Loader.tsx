import { Loader2 } from "lucide-react";

export default function Loader({ children }: { children?: string }) {
   return (
      <div className="flex w-full flex-col justify-center items-center">
         <Loader2 className="size-14 animate-spin stroke-gray-500" />
         <div className="text-base mt-4 text-gray-500">{children}</div>
      </div>
   );
}
