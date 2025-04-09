"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiHome } from "react-icons/fi";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8 text-red-400">
          <span className="text-9xl font-bold">404</span>
        </div>

        <h1 className="text-3xl font-bold mb-4 text-neutral-900 dark:text-white">
          Page not found
        </h1>

        <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-10">
          We couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 rounded-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors w-full sm:w-auto"
          >
            <FiArrowLeft /> Go Back
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-red-400 hover:bg-red-500 text-white rounded-lg font-medium transition-colors w-full sm:w-auto"
          >
            <FiHome /> Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
