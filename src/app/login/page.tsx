"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

type LoginRole = "vet" | "owner";

// Demo credentials
const VET_CREDENTIALS = [
  { email: "dr.peter@vetms.ac.ke", password: "vet123", name: "Dr. Peter" },
  { email: "dr.wanjiku@vetms.ac.ke", password: "vet123", name: "Dr. Wanjiku" },
  { email: "admin@vetms.ac.ke", password: "admin123", name: "Admin" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState<LoginRole>("vet");

  // Vet login state
  const [vetEmail, setVetEmail] = useState("");
  const [vetPassword, setVetPassword] = useState("");
  const [vetError, setVetError] = useState("");

  // Owner login / register state
  const [ownerMode, setOwnerMode] = useState<"login" | "register">("login");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");
  const [ownerConfirm, setOwnerConfirm] = useState("");
  const [ownerError, setOwnerError] = useState("");

  // ── Vet Login ──────────────────────────────────────────────────────────────
  const handleVetLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setVetError("");
    const match = VET_CREDENTIALS.find(
      (c) => c.email === vetEmail.trim() && c.password === vetPassword
    );
    if (!match) {
      setVetError("Invalid email or password. Please try again.");
      return;
    }
    login({ name: match.name, role: "vet", email: match.email });
  };

  // ── Owner Login / Register ─────────────────────────────────────────────────
  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerError("");

    if (ownerMode === "register") {
      if (!ownerName.trim()) { setOwnerError("Full name is required."); return; }
      if (!ownerEmail.trim()) { setOwnerError("Email is required."); return; }
      if (!ownerPhone.trim()) { setOwnerError("Phone number is required."); return; }
      if (ownerPassword.length < 6) { setOwnerError("Password must be at least 6 characters."); return; }
      if (ownerPassword !== ownerConfirm) { setOwnerError("Passwords do not match."); return; }
      // In a real app, save to DB. Here we just log in directly.
      login({ name: ownerName.trim(), role: "owner", email: ownerEmail.trim() });
    } else {
      // Simple demo login — any email + password works for owners
      if (!ownerEmail.trim() || !ownerPassword) {
        setOwnerError("Please enter your email and password.");
        return;
      }
      const displayName = ownerEmail.split("@")[0];
      login({ name: displayName, role: "owner", email: ownerEmail.trim() });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-6xl">🐾</span>
          <h1 className="mt-3 text-3xl font-bold text-green-900">VetMS</h1>
          <p className="text-green-700 mt-1 text-sm">Virtual Veterinary Management System</p>
          <p className="text-gray-500 text-xs mt-0.5">Machakos University</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("vet")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                activeTab === "vet"
                  ? "bg-green-800 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              🩺 Veterinary Doctor
            </button>
            <button
              onClick={() => setActiveTab("owner")}
              className={`flex-1 py-4 text-sm font-semibold transition-colors ${
                activeTab === "owner"
                  ? "bg-green-800 text-white"
                  : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              🐶 Pet Owner
            </button>
          </div>

          <div className="p-8">
            {/* ── Vet Login Form ── */}
            {activeTab === "vet" && (
              <form onSubmit={handleVetLogin} className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-1">Doctor Login</h2>
                </div>

                {vetError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {vetError}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={vetEmail}
                    onChange={(e) => setVetEmail(e.target.value)}
                    placeholder="dr.peter@vetms.ac.ke"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={vetPassword}
                    onChange={(e) => setVetPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                >
                  Sign In as Doctor
                </button>

                {/* Demo hint */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-xs text-green-800">
                  <p className="font-semibold mb-1">Demo credentials:</p>
                  <p>Email: <span className="font-mono">dr.peter@vetms.ac.ke</span></p>
                  <p>Password: <span className="font-mono">vet123</span></p>
                </div>
              </form>
            )}

            {/* ── Owner Login / Register Form ── */}
            {activeTab === "owner" && (
              <div className="space-y-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 mb-1">
                    {ownerMode === "login" ? "Pet Owner Login" : "Create Account"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {ownerMode === "login"
                      ? "Sign in to register and manage your pets."
                      : "Create an account to register your pets with the clinic."}
                  </p>
                </div>

                {ownerError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {ownerError}
                  </div>
                )}

                <form onSubmit={handleOwnerSubmit} className="space-y-4">
                  {ownerMode === "register" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={ownerName}
                          onChange={(e) => setOwnerName(e.target.value)}
                          placeholder="John Mwangi"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={ownerPhone}
                          onChange={(e) => setOwnerPhone(e.target.value)}
                          placeholder="+254 700 000 000"
                          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={ownerEmail}
                      onChange={(e) => setOwnerEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={ownerPassword}
                      onChange={(e) => setOwnerPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  {ownerMode === "register" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        value={ownerConfirm}
                        onChange={(e) => setOwnerConfirm(e.target.value)}
                        placeholder="••••••••"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors text-sm"
                  >
                    {ownerMode === "login" ? "Sign In" : "Create Account & Continue"}
                  </button>
                </form>

                <div className="text-center text-sm text-gray-500">
                  {ownerMode === "login" ? (
                    <>
                      Don&apos;t have an account?{" "}
                      <button
                        onClick={() => { setOwnerMode("register"); setOwnerError(""); }}
                        className="text-green-700 font-semibold hover:underline"
                      >
                        Register here
                      </button>
                    </>
                  ) : (
                    <>
                      Already have an account?{" "}
                      <button
                        onClick={() => { setOwnerMode("login"); setOwnerError(""); }}
                        className="text-green-700 font-semibold hover:underline"
                      >
                        Sign in
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 Manyondo Peter · Machakos University
        </p>
      </div>
    </div>
  );
}
