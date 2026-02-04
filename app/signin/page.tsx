"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <span
              className="text-3xl md:text-4xl font-bold tracking-tight text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Pora
            </span>
            <span className="text-gold font-medium tracking-widest text-sm uppercase">
              Door
            </span>
          </Link>
        </div>

        {/* Sign In Card */}
        <div className="card-premium p-8 md:p-10 animate-scale-in">
          <div className="mb-8">
            <h1
              className="text-3xl font-bold text-primary mb-2"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Welcome Back
            </h1>
            <p className="text-secondary text-sm">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-primary mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-primary placeholder:text-muted"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-primary mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-surface border border-divider rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all text-primary placeholder:text-muted"
                placeholder="••••••••"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-gold border-divider rounded focus:ring-gold focus:ring-2"
                />
                <span className="text-secondary">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-gold hover:text-green transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="btn-primary w-full text-center"
              onClick={(e) => {
                e.preventDefault();
                router.push("/dashboard");
              }}
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-divider"></div>
            <span className="text-muted text-sm">or</span>
            <div className="flex-1 h-px bg-divider"></div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-secondary text-sm">
            Don't have an account?{" "}
            <Link
              href="/dashboard"
              className="text-gold hover:text-green font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-secondary hover:text-gold text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
