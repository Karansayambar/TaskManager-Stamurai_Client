import { createAsyncThunk } from "@reduxjs/toolkit";

// 🔐 Login User
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string; role: string },
    { rejectWithValue }
  ) => {
    try {
      console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const results = await response.json();

      if (response.status === 200) {
        localStorage.setItem("tm-token", results.token);
        localStorage.setItem("role", results.role);
        return results;
      } else {
        return rejectWithValue(results.message || "Login failed");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// 📝 Register User
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    credentials: {
      username: string;
      email: string;
      password: string;
      role: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      const results = await response.json();

      if (response.status === 200) {
        return results;
      } else {
        return rejectWithValue(results.message || "Register failed");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Register failed");
    }
  }
);

// 🚪 Logout User
export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  const token = localStorage.getItem("tm-token");
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  localStorage.removeItem("tm-token");
  localStorage.removeItem("isAuthenticated");
});
