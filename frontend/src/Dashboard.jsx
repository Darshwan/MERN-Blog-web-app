/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import Posts from "./Components/Dashboard/DashPosts";
import { FaUser } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import DashProfile from "./Components/Dashboard/DashProfile";
import { useSelector } from "react-redux";
// import Profile from "./Components/Dashboard/Profile";

function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search])
  return (
    <div>
      <Header />
      <div className="grid min-h-screen w-full lg:grid-cols-[250px_1fr]">
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-[60px] items-center border-b dark:border-gray-600 px-6">
              <span
                className="flex text-xl items-center gap-2 font-semibold"
                href="#"
              >
                <span className="">DashBoard</span>
              </span>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <Link
                  to="/dashboard?tab=profile"
                  className={`justify-between whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none hover:bg-neutral-100 dark:hover:bg-gray-600 h-10 flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${tab === "profile"
                      ? "bg-neutral-300 dark:bg-gray-800 hover:bg-neutral-300 dark:hover:bg-gray-800"
                      : ""
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <FaUser></FaUser> <p className="font-semibold text-md">Profile</p>
                  </div>
                  <div className="Badge px-3 py-1 text-xs border border-black dark:border-white rounded-full dark:bg-slate-950">
                    {
                      currentUser.isAdmin ? 'Admin' : 'User'
                    }
                  </div>
                </Link>
                <Link
                  to="/dashboard?tab=posts"
                  className={`justify-start whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-100 dark:hover:bg-gray-600 hover:text-accent-foreground h-10 flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${tab === "posts"
                      ? "bg-neutral-300 dark:bg-gray-800 hover:bg-neutral-300 dark:hover:bg-gray-800"
                      : ""
                    }`}
                >
                  <FaEdit></FaEdit> Posts
                </Link>
              </nav>
            </div>
          </div>
        </div>
        {/* <DashProfile /> */}
        {tab === "profile" && <DashProfile />}
        {/* <Posts /> */}
        {tab === "posts" && <Posts />}
      </div>
    </div>
  );
}

export default Dashboard;
