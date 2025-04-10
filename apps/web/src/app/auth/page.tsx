/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMail, FiLock, FiUser, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Toast from "@/components/common/Toast";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dismissError = () => setError(null);
  const dismissSuccess = () => setSuccess(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const endpoint = isLogin ? "/api/auth/signin" : "/api/auth/signup";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.username, email: formData.email, password: formData.password };
      const authEndpoint = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;

      const response = await fetch(authEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("userData", JSON.stringify(data.data.user));

      setSuccess(isLogin ? "Login successful!" : "Account created successfully!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Auth error:", err);
      setError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mockGoogleData = {
        name: "Google User",
        email: "google.user@example.com",
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockGoogleData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Google authentication failed");
      }

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("userData", JSON.stringify(data.data.user));

      setSuccess("Login with Google successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Google auth error:", err);
      setError("Google authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const mockGithubData = {
        name: "GitHub User",
        email: "github.user@example.com",
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/github`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockGithubData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "GitHub authentication failed");
      }

      localStorage.setItem("authToken", data.data.token);
      localStorage.setItem("userData", JSON.stringify(data.data.user));

      setSuccess("Login with GitHub successful!");

      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("GitHub auth error:", err);
      setError("GitHub authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-950 flex flex-col">
      {error && <Toast message={error} type="error" onDismiss={dismissError} />}
      {success && <Toast message={success} type="success" onDismiss={dismissSuccess} />}

      <div className="flex-1 flex flex-col items-center justify-center md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-16">
          <div className="w-full max-w-md">
            <h1 className="text-3xl font-bold mb-1 text-neutral-900 dark:text-white">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8">
              {isLogin
                ? "Sign in to your account to continue"
                : "Register to get started with CourseGPT"}
            </p>
            <div className="flex flex-col gap-4 mb-6">
              <button
                onClick={handleGoogleLogin}
                disabled={true}
                className="flex items-center justify-center gap-2 py-3 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:cursor-pointer transition-colors disabled:opacity-70"
              >
                <FcGoogle size={20} />
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {isLogin ? "Sign in with Google" : "Sign up with Google"}
                </span>
              </button>
            </div>


            <div className="flex flex-col gap-4 mb-6">
              <button
                onClick={handleGoogleLogin}
                disabled={true}
                className="flex items-center justify-center gap-2 py-3 px-4 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-900 hover:cursor-pointer transition-colors disabled:opacity-70"
              >
                <FiGithub size={20} />
                <span className="font-medium text-neutral-800 dark:text-neutral-200">
                  {isLogin ? "Sign in with Github" : "Sign up with Github"}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                or continue with email
              </span>
              <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                      <FiUser />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      required={!isLogin}
                      value={formData.username}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                      placeholder="johndoe"
                    />
                  </div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5 text-neutral-700 dark:text-neutral-300"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <FiMail />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                  >
                    Password
                  </label>
                  {isLogin && (
                    <Link
                      href="/auth/reset"
                      className="text-sm text-red-400 hover:text-red-500"
                    >
                      Forgot password?
                    </Link>
                  )}
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <FiLock />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-2.5 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full hover:cursor-pointer flex items-center justify-center gap-2 bg-red-400 text-black font-medium rounded-lg py-2.5 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>{isLogin ? "Sign in" : "Create account"}</>
                )}
              </button>

              <div className="text-center mt-6">
                <p className="text-neutral-700 dark:text-neutral-300">
                  {isLogin
                    ? "Don't have an account? "
                    : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setFormData({ username: "", email: "", password: "" });
                    }}
                    className="text-red-400 hover:text-red-500 font-medium hover:cursor-pointer"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden md:block w-1/2 h-screen bg-neutral-50 dark:bg-neutral-800">
          <div className="h-full flex flex-col justify-center items-center p-16">
            <div className="mb-8 text-red-400">
             <Image src={"/images/logo.png"} alt="CourseGPT" width={100} height={100} className="w-32 h-32" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white text-center">
              Create Better Courses <span className="text-red-400">Faster</span>
            </h2>
            <p className="text-center text-neutral-700 dark:text-neutral-300 max-w-md">
              CourseGPT is an intelligent authoring tool that empowers educators
              to efficiently create, organize, and enhance educational content
              with AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
