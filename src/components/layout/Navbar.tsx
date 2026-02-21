"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const vetNavLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/registration", label: "Animal Registration" },
  { href: "/appointments", label: "Appointments" },
  { href: "/queue", label: "Queue Management" },
  { href: "/reports", label: "Medical Reports" },
  { href: "/vet-pets", label: "🐾 Pet Owner Pets" },
];

const ownerNavLinks = [
  { href: "/my-pets", label: "My Pets" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  // Don't render navbar on login page
  if (pathname === "/login") return null;

  const navLinks = user?.role === "owner" ? ownerNavLinks : vetNavLinks;

  return (
    <nav className="bg-green-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={user?.role === "owner" ? "/my-pets" : "/"}
            className="flex items-center gap-2 font-bold text-lg tracking-wide"
          >
            <span className="text-2xl">🐾</span>
            <span className="hidden sm:block">VetMS</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-green-600 text-white"
                    : "text-green-100 hover:bg-green-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: user info + logout */}
          <div className="hidden md:flex items-center gap-3">
            {user && (
              <>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
                  <p className="text-xs text-green-300 leading-tight capitalize">
                    {user.role === "vet" ? "🩺 Veterinary Doctor" : "🐶 Pet Owner"}
                  </p>
                </div>
                <button
                  onClick={logout}
                  className="ml-2 bg-green-700 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors border border-green-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-green-100 hover:bg-green-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-green-600 text-white"
                    : "text-green-100 hover:bg-green-700 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <div className="pt-2 border-t border-green-700 mt-2">
                <p className="px-3 text-xs text-green-300 mb-2">
                  Signed in as <span className="font-semibold text-white">{user.name}</span>
                  {" "}({user.role === "vet" ? "Doctor" : "Pet Owner"})
                </p>
                <button
                  onClick={() => { setMenuOpen(false); logout(); }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-300 hover:bg-green-700 hover:text-red-200 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
