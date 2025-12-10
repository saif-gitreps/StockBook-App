import { useState, useEffect } from "react";

function useDebounce(value: string, delay: number) {
   const [debouncedValue, setDebouncedValue] = useState(value);

   useEffect(() => {
      // Set a timeout to update the debounced value after the delay
      const handler = setTimeout(() => {
         setDebouncedValue(value);
      }, delay);

      // Cleanup function because in case: If the value changes (user keeps typing), clear the previous timeout
      return () => {
         clearTimeout(handler);
      };
   }, [value, delay]);

   return debouncedValue;
}

export default useDebounce;
