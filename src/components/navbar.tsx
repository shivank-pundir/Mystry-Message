"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { LogOut, MessageCircle, UserCircle } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
 
  const user = session?.user;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

     

        <Link
          href="/dashboard"
          className="group flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 transition group-hover:bg-slate-700">
            <MessageCircle className="h-5 w-5 text-slate-200" />
          </div>

          <span className="text-lg font-bold tracking-tight text-white">
            Mystry Message
          </span>
        </Link>



        <div className="flex items-center gap-3">

          {session ? (
            <>
             

              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800">
                  <UserCircle className="h-5 w-5 text-slate-300" />
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-medium text-white">
                    {user?.username || user?.email}
                  </p>

                  <p className="text-xs text-slate-500">
                    Welcome back
                  </p>
                </div>
              </div>

              {/* Logout */}

              <button
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 hover:text-white"
              >
                <LogOut className="h-4 w-4" />

                <span className="hidden sm:inline">
                  Logout
                </span>
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
            >
              Login
            </Link>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;