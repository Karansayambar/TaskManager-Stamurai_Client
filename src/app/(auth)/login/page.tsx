"use client";

import { AppDispatch } from "@/lib/store";
import { loginUser } from "@/lib/thunk/authThunk";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("user");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const { isAuthenticated, loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password, role })).unwrap();
      console.log("Login successful");
      // router.push("/dashboard");
      console.log(localStorage.getItem("role"));
      if (localStorage.getItem("role") === "user") {
        router.push("/UserDashboard");
      } else if (localStorage.getItem("role") === "admin") {
        router.push("/AdminDashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
      <div className="border rounded-md flex bg-[#EEF6EF] space-y-8 flex-col p-8 shadow-lg">
        <div className="flex justify-center space-x-2 items-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* SVG PATH HERE */}
            <circle cx="16" cy="16" r="16" fill="#3F9142" />
          </svg>
          <span className="text-[24px] text-primary font-bold">DoIt</span>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col space-y-4 w-80">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-primary/90 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-slate-300 py-2 px-4 rounded-md"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="password" className="text-primary/90 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Must be at least 8 characters"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-slate-300 py-2 px-4 rounded-md"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label htmlFor="role" className="text-primary/90 font-medium">
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-gray-300 p-2 rounded-md"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div className="text-center">
            <span className="text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary font-semibold">
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
