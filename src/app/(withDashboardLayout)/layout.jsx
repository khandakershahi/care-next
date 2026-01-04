"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Plus, User, Settings } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 font-semibold text-lg">Dashboard</div>
        </nav>
        {/* Page content here */}
        <div className="p-4 min-h-screen bg-base-100">{children}</div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Logo/Brand */}
          <div className="p-4 w-full border-b border-base-300">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-content font-bold text-xl">
                C
              </div>
              <span className="is-drawer-close:hidden font-bold text-xl">
                Care.xyz
              </span>
            </Link>
          </div>

          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* Dashboard Home */}
            <li>
              <Link
                href="/dashboard"
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isActive("/dashboard") ? "active" : ""
                }`}
                data-tip="Dashboard"
              >
                <Home className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>

            {/* My Bookings */}
            <li>
              <Link
                href="/dashboard/my-bookings"
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isActive("/dashboard/my-bookings") ? "active" : ""
                }`}
                data-tip="My Bookings"
              >
                <BookOpen className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">My Bookings</span>
              </Link>
            </li>

            {/* Add Service */}
            <li>
              <Link
                href="/dashboard/add-service"
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isActive("/dashboard/add-service") ? "active" : ""
                }`}
                data-tip="Add Service"
              >
                <Plus className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Add Service</span>
              </Link>
            </li>

            {/* Divider */}
            <li className="is-drawer-close:hidden">
              <div className="divider my-0"></div>
            </li>

            {/* Profile */}
            <li>
              <Link
                href="/dashboard/profile"
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isActive("/dashboard/profile") ? "active" : ""
                }`}
                data-tip="Profile"
              >
                <User className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Profile</span>
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link
                href="/dashboard/settings"
                className={`is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                  isActive("/dashboard/settings") ? "active" : ""
                }`}
                data-tip="Settings"
              >
                <Settings className="my-1.5 inline-block size-4" />
                <span className="is-drawer-close:hidden">Settings</span>
              </Link>
            </li>
          </ul>

          {/* Back to Home */}
          <div className="w-full p-4 border-t border-base-300">
            <Link
              href="/"
              className="btn btn-outline btn-sm w-full is-drawer-close:btn-square"
            >
              <span className="is-drawer-close:hidden">Back to Home</span>
              <span className="is-drawer-open:hidden">←</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
