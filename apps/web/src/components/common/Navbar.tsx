"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import Theme from "./Theme";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="w-full h-16 sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-black/80 border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-[80vw] mx-auto h-full px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-neutral-900 dark:text-white">
              Course<span className="text-red-400">GPT</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`${
                  isActive(link.path)
                    ? "text-red-400"
                    : "text-neutral-700 dark:text-neutral-300 hover:text-red-400 dark:hover:text-red-400"
                } font-medium transition-colors`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth"
              className="bg-red-400 text-black font-medium rounded-lg px-4 py-2 transition-colors hover:bg-red-500"
            >
              Login
            </Link>
            <Theme />
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
            <Theme />
          </div>
        </div>
      </nav>

      {/* Mobile Menu with overlay */}
      {isMenuOpen && (
        <>
          {/* Overlay backdrop */}
          <div
            className="fixed inset-0 top-16 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu content */}
          <div className="fixed inset-x-0 top-16 z-50 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800">
            <div className="max-w-[80vw] mx-auto p-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`${
                    isActive(link.path)
                      ? "text-red-400"
                      : "text-neutral-700 dark:text-neutral-300"
                  } font-medium text-lg py-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-neutral-200 dark:border-neutral-800 my-4"></div>
              <Link
                href="/auth"
                className="bg-red-400 text-black font-medium rounded-lg px-6 py-3 transition-colors hover:bg-red-500 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
