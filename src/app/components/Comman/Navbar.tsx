"use client";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import { logoutUser } from "@/lib/thunk/authThunk";
import { useRouter } from "next/navigation";
import { MdGridView } from "react-icons/md";
import { RiListView } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";
import logo from "../../../../public/logomark.svg";
import { useState } from "react";
import { AppDispatch, RootState } from "@/lib/store";
import { filterSearch } from "@/lib/slices/taskSlice";
const Navbar = ({ handleClick, setView, view }: any) => {
  const dispatch = useDispatch<AppDispatch>(); // Typing the dispatch function
  const router = useRouter();

  const handleView = () => {
    setView(view === "List" ? "Grid" : "List");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <div className="flex justify-between px-5 tab:px-12 w-screen py-2 items-center">
      {/* Left - Sidebar toggle & Logo */}
      <div className="flex items-center space-x-5">
        <svg
          onClick={handleClick}
          className="cursor-pointer"
          width="20"
          height="14"
          viewBox="0 0 20 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H19M1 1H19M1 13H19"
            stroke="#1B281B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <div className="flex items-center space-x-2">
          {/* App Logo */}
          <img src={logo} />

          {/* App Name */}
          <span className="text-[24px] text-primary font-bold">DoIt</span>
        </div>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center space-x-6">
        <div className="flex border border-green-700 rounded-lg p-2 align-center gap-2">
          <input
            type="search"
            className="outline-none"
            onChange={(e) => {
              const value = e.target.value;
              dispatch(filterSearch(value));
            }}
          />

          <BiSearchAlt size={25} />
        </div>
        {/* View Toggle */}
        <button onClick={handleView} className="text-sm font-medium">
          {view === "List" ? (
            <MdGridView size={25} />
          ) : (
            <RiListView size={25} />
          )}
        </button>

        {/* Logout */}
        <CiLogout
          onClick={handleLogout}
          size={24}
          className="cursor-pointer text-primary"
        />
      </div>
    </div>
  );
};

export default Navbar;
