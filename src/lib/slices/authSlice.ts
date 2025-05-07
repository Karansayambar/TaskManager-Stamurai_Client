"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "../thunk/authThunk";

// Read auth status from localStorage
// const authFromSession = localStorage.getItem("isAuthenticated") === "true";

interface AuthState {
  loading: boolean;
  error: string | false;
  isAuthenticated: boolean;
  role: string | null;
  user: any;
}

const initialState: AuthState = {
  loading: false,
  error: false,
  isAuthenticated: false,
  user: null,
  role: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthFromStorage: (state) => {
      if (typeof window !== "undefined") {
        state.isAuthenticated =
          localStorage.getItem("isAuthenticated") === "true";
        state.role = localStorage.getItem("role");
      }
    },
  },
  extraReducers: (builder) => {
    // 🔐 loginUser
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      localStorage.setItem("isAuthenticated", "true");
      sessionStorage.setItem("token", action.payload.token);
      sessionStorage.setItem("role", action.payload.role);

      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.role = action.payload.role;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 📝 registerUser
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      localStorage.setItem("isAuthenticated", "true");
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // 🚪 logoutUser
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = false;
      state.user = null;
    });
  },
});
export const { setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
