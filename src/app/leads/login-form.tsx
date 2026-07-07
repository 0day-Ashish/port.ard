"use client";

import { useActionState, useState } from "react";
import { loginAction } from "./actions";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full bg-white flex flex-col justify-between selection:bg-black selection:text-white font-sans text-zinc-900">
      {/* Top Header / Navigation */}
      <header className="w-full px-8 py-8 flex justify-between items-center">
        <Link
          href="/"
          className="text-zinc-500 hover:text-black transition-colors font-bold tracking-widest text-xs uppercase flex items-center gap-2"
        >
          <span>←</span> <span>Back to site</span>
        </Link>
        <span className="font-black text-sm tracking-[0.2em] uppercase">
          ard.dev ©
        </span>
      </header>

      {/* Main Login Card */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md flex flex-col">
          {/* Label & Title */}
          <div className="mb-8">
            <span className="text-zinc-400 uppercase tracking-widest text-xs font-bold block mb-1">
              Admin Portal
            </span>
            <h1 className="text-4xl md:text-5xl uppercase font-black tracking-tight leading-none text-zinc-900">
              Access Leads
            </h1>
          </div>

          {/* Form */}
          <form action={formAction} className="flex flex-col gap-6">
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[10px] text-zinc-400 font-black tracking-[0.2em] uppercase"
              >
                Email Address
              </label>
              <div className="border-b border-zinc-200 focus-within:border-zinc-900 transition-colors">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                  className="w-full bg-transparent text-zinc-900 font-medium text-lg py-3 border-0 focus:outline-none focus:ring-0 placeholder:text-zinc-300"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-[10px] text-zinc-400 font-black tracking-[0.2em] uppercase"
              >
                Password
              </label>
              <div className="border-b border-zinc-200 focus-within:border-zinc-900 transition-colors flex items-center justify-between">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent text-zinc-900 font-medium text-lg py-3 border-0 focus:outline-none focus:ring-0 placeholder:text-zinc-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-zinc-400 hover:text-zinc-900 transition-colors px-2 py-1 cursor-pointer focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {state?.error && (
              <div className="text-xs font-bold text-red-600 uppercase tracking-wider mt-2 animate-fade-in">
                {state.error}
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-4 flex items-center justify-between">
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-3 text-zinc-900 font-black uppercase text-base hover:opacity-70 transition-opacity disabled:opacity-50 cursor-pointer"
              >
                <span>{isPending ? "Authenticating…" : "Enter Portal"}</span>
                <span aria-hidden className="text-xl leading-none">
                  →
                </span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
