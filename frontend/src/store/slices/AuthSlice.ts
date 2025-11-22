import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
   isAuthenticated: boolean;
   user: { id: string; email: string; name: string } | null;
}

const initialState: AuthState = {
   user: null,
   isAuthenticated: false,
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      setCredentials: (
         state,
         action: PayloadAction<{ user: { id: string; email: string; name: string } }>
      ) => {
         state.user = action.payload.user;
         state.isAuthenticated = true;
      },
      logout: (state) => {
         state.user = null;
         state.isAuthenticated = false;
      },
   },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
