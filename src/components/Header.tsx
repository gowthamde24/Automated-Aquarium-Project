"use client";

// Import necessary modules
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { SocialIcons } from "./Social-Icons";

// Define the Header component
export default function Header() {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);

  const handleNavItemClick = () => {
    setIsMobileNavVisible(false);
  };

  return (
    <header className="text-white py-4 sticky top-0 z-50 font-[family-name:var(--font-geist-sans)] bg-gray-900">
      {/* Header container */}
      <div className="container mx-auto px-4 flex justify-center items-center md:justify-between relative">
        {/* Website title with icon */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/main-icon.svg" alt="Main Icon" width={32} height={32} />
          <h1 className="text-xl font-semibold">automatedAquarium</h1>
        </Link>
        {/* Navigation menu */}
        <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-x-6">
            {/* Navigation links */}
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            {/* <li>
              <Link href="/streaming" className="hover:text-gray-300">
                Streaming
              </Link>
            </li> */}
            <li>
              
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              
            </li>
          </ul>
        </nav>
        {/* Social media icons */}
        <div className="hidden md:block">
          <SocialIcons />
        </div>
        {/* Add Mobile Navigation Toggle Here */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileNavVisible(!isMobileNavVisible)}>
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
        <nav
          id="mobile-nav"
          className={`md:hidden absolute top-full left-0 right-0 m-8 ${
            isMobileNavVisible ? "" : "hidden"
          } bg-gray-800 rounded-lg p-4`}
        >
          <ul className="flex flex-col gap-y-4 mt-4">
            <Link
              href="/"
              className="hover:text-gray-300 hover:bg-slate-700 p-1"
              onClick={handleNavItemClick}
            >
              <li>Home</li>
            </Link>
            <Link
              href="/blog"
              className="hover:text-gray-300 hover:bg-slate-700 p-1"
              onClick={handleNavItemClick}
            >
              <li>Blog</li>
            </Link>
            <Link
              href="/about"
              className="hover:text-gray-300 hover:bg-slate-700 p-1"
              onClick={handleNavItemClick}
            >
              <li>About</li>
            </Link>
            {/*<Link href="/streaming" className="hover:text-gray-300 hover:bg-slate-700 p-1" onClick={handleNavItemClick}>
            <li>Streaming</li> 
            </Link>*/}
            <Link
              href="/contact"
              className="hover:text-gray-300 hover:bg-slate-700 p-1"
              onClick={handleNavItemClick}
            >
              <li>Contact</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}