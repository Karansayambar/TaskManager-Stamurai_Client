"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const role = localStorage.getItem("role");

    if (isAuthenticated === "true" && role === "user") {
      router.push("/UserDashboard");
    } else if (isAuthenticated === "true" && role === "admin") {
      router.push("/AdminDashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      Loading...
    </div>
  );
};

export default Home;
