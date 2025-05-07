"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Note: Changed from 'next/router'

const Home = () => {
  const router = useRouter();
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  const role = localStorage.getItem("role");
  console.log("isAuth", isAuthenticated);

  useEffect(() => {
    if (isAuthenticated && role === "user") {
      router.push("/UserDashboard");
    } else if (isAuthenticated && role === "admin") {
      router.push("/AdminDashboard");
    } else {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      Loading...
    </div>
  );
};

export default Home;
