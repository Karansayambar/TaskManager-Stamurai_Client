"use client";

import AdminDashboardPage from "@/app/components/Admin/DashboardPage";
import Navbar from "@/app/components/Comman/Navbar";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const [sidebar, setSidebar] = useState(true);
  const [viewTask, setViewTask] = useState(false);
  const [view, setView] = useState("List");
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  const handleClick = () => {
    setSidebar(!sidebar);
  };

  return (
    <div className="mt-0 h-screen w-screen">
      <Navbar handleClick={handleClick} view={view} setView={setView} />
      <AdminDashboardPage
        view={view}
        sidebar={sidebar}
        setViewTask={setViewTask}
        viewTask={viewTask}
      />
    </div>
  );
}
