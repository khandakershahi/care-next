"use client";
import Link from "next/link";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/reviews">Reviews</Link></li>
            <li><Link href="/aboutUs">About Us</Link></li>
            {session?.user && (
              <>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/adminRoute">Admin</Link></li>
                <li><Link href="/userRoute">User</Link></li>
              </>
            )}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-primary">
            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
          </svg>
          <span className="text-primary font-bold">Care.xyz</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/reviews">Reviews</Link></li>
          <li><Link href="/aboutUs">About Us</Link></li>
          {session?.user && (
            <>
              <li><Link href="/dashboard">Dashboard</Link></li>
              <li>
                <details>
                  <summary>More</summary>
                  <ul className="p-2 bg-base-100 w-40 z-1">
                    <li><Link href="/adminRoute">Admin</Link></li>
                    <li><Link href="/userRoute">User</Link></li>
                  </ul>
                </details>
              </li>
            </>
          )}
        </ul>
      </div>
      
      <div className="navbar-end">
        {status === "loading" ? (
          <button className="btn btn-sm btn-disabled">Loading...</button>
        ) : session?.user?.email ? (
          <div className="flex items-center gap-2">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <span className="text-xl">{session.user.name?.charAt(0) || session.user.email?.charAt(0)}</span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li>
                  <Link href="/dashboard" className="justify-between">
                    Dashboard
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li><a onClick={() => signOut()}>Logout</a></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button onClick={() => signIn()} className="btn btn-primary btn-sm">
              Login
            </button>
            <Link href="/signup">
              <button className="btn btn-secondary btn-sm">Register</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
