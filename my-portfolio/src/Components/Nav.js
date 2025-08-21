"use client";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black/90 text-white sticky top-0 z-50">
      <div className="flex items-center justify-between p-4">
        {/* Logo / Name */}
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-indigo-600">
          Chikwado <br/> Valentine <br/>Ani
        </h1>

        {/* Hamburger Button (only mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-2xl focus:outline-none"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Links (desktop view) */}
        <ul className="hidden sm:flex gap-4">
          <NavLink href="/references/colleagues">Colleague&apos;s Ref</NavLink>
          <NavLink href="/references/coursemates">Coursemate&apos;s Ref</NavLink>
          <NavLink href="/references/fandf">Family & Friend&apos;s Ref</NavLink>
          <NavLink href="/references/business">Business/Others</NavLink>
        </ul>
      </div>

      {/* Links (mobile dropdown) */}
      {isOpen && (
        <ul className="flex flex-col gap-2 p-4 sm:hidden bg-black/95 border-t border-gray-700">
          <NavLink href="/references/colleagues">Colleague&apos;s Ref</NavLink>
          <NavLink href="/references/coursemates">Coursemate&apos;s Ref</NavLink>
          <NavLink href="/references/fandf">Family & Friend&apos;s Ref</NavLink>
          <NavLink href="/references/business">Business/Others</NavLink>
        </ul>
      )}
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="border border-purple-500 text-purple-400 hover:bg-purple-600 hover:text-white px-4 py-2 rounded text-center"
    >
      {children}
    </Link>
  );
}
