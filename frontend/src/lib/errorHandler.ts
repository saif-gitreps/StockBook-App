import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleError = (error: AxiosError | Error) => {
   if (axios.isAxiosError(error)) {
      const err = error.response;
      const responseData = err?.data; // Simplification: get the main data body

      if (!responseData) {
         // Handle case where there is no response data (e.g., connection lost)
         toast.error(`Request failed with status: ${err?.status || "Unknown"}`);
         return;
      }

      // 1. Handle Identity Errors (Array at the root of the response body)
      // This handles: return BadRequest(createdUser.Errors)
      if (Array.isArray(responseData) && err?.status === 400) {
         for (const val of responseData) {
            // Assuming val has a 'description' property as per your example
            if (val.description) {
               toast.warning(val.description);
            } else {
               // Fallback for unexpected array item structure
               toast.warning("An identity error occurred.");
            }
         }
         return; // Exit after successful array handling
      }

      // 2. Handle Model State Errors (Object structure with 'errors' key)
      // This handles: return BadRequest(ModelState)
      // AND any other object-based error where properties are directly on the data root
      if (typeof responseData === "object" && responseData !== null) {
         // Check for the standard ASP.NET Core validation structure (using the 'errors' property)
         const validationErrors = responseData.errors;

         if (typeof validationErrors === "object" && validationErrors !== null) {
            // Iterate through the fields that failed validation
            for (const field in validationErrors) {
               // validationErrors[field] is typically an array of error messages (e.g., ['The field is required'])
               const errorMessages = validationErrors[field];
               if (Array.isArray(errorMessages) && errorMessages.length > 0) {
                  // Display the first error for that field
                  toast.warning(errorMessages[0]);
               }
            }
            return; // Exit after successful object handling
         }

         // Fallback for simple object error bodies (e.g., { message: "error" })
         if (responseData.message && typeof responseData.message === "string") {
            toast.warning(responseData.message);
            return;
         }
      }

      // 3. Handle simple string response (if server sends text/plain body)
      if (typeof responseData === "string") {
         toast.warning(responseData);
         return;
      }

      // 4. Handle 401 Unauthorized
      if (err?.status == 401) {
         toast.warning("Please login");
         window.history.pushState({}, "LoginPage", "/login");
         return;
      }

      // 5. General Fallback
      toast.error(`An unexpected error occurred (Status: ${err?.status || "Unknown"})`);
   }
};
