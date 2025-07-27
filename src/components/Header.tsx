"use client";

// Import necessary modules
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SocialIcons } from "./Social-Icons";
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon

// Define the Header component
export default function Header() {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const handleNavItemClick = () => {
    setIsMobileNavVisible(false);
  };

  return (
    <header className="text-white py-4 sticky top-0 z-50 font-[family-name:var(--font-geist-sans)] bg-gray-900 border-b border-gray-700">
      {/* Header container */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Website title with icon */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/main-icon.svg" alt="Main Icon" width={32} height={32} />
          <h1 className="text-xl font-semibold">AutomatedAquarium</h1>
        </Link>
        
        {/* Desktop Navigation menu */}
        <nav className="hidden md:flex items-center gap-x-6">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            User Stories
          </Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-x-5">
          <SocialIcons />
          <Link href="/login" aria-label="Account Login">
            <FaUserCircle className="h-6 w-6 text-gray-300 hover:text-cyan-400 transition-colors" />
          </Link>
        </div>

        {/* Mobile Navigation Toggle Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileNavVisible(!isMobileNavVisible)} aria-label="Toggle mobile menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu (Dropdown) */}
        {isMobileNavVisible && (
            <nav
            id="mobile-nav"
            className="md:hidden absolute top-full left-0 right-0 mx-4 mt-2 bg-gray-800 rounded-lg p-4 shadow-lg"
            >
            <ul className="flex flex-col gap-y-4">
                <li>
                    <Link
                    href="/"
                    className="block hover:text-gray-300 hover:bg-slate-700 p-2 rounded"
                    onClick={handleNavItemClick}
                    >
                    Home
                    </Link>
                </li>
                <li>
                    <Link
                    href="/about"
                    className="block hover:text-gray-300 hover:bg-slate-700 p-2 rounded"
                    onClick={handleNavItemClick}
                    >
                    User Stories
                    </Link>
                </li>
                 <li>
                    <Link
                    href="/login"
                    className="flex items-center gap-x-3 hover:text-gray-300 hover:bg-slate-700 p-2 rounded"
                    onClick={handleNavItemClick}
                    >
                     <FaUserCircle className="h-5 w-5" />
                     Account
                    </Link>
                </li>
            </ul>
            <div className="border-t border-gray-700 mt-4 pt-4">
                <SocialIcons />
            </div>
            </nav>
        )}
      </div>
    </header>
  );
}
