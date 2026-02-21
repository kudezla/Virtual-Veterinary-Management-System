"use client";

import { useState } from "react";

type Animal = {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  gender: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  registeredAt: string;
  status: "Active" | "Under Treatment" | "Discharged";
};

const initialAnimals: Animal[] = [
  {
    id: "A-001",
    name: "Simba",
    species: "Dog",
    breed: "German Shepherd",
    age: "3 years",
    gender: "Male",
    ownerName: "John Mwangi",
    ownerPhone: "0712345678",
    ownerEmail: "john@example.com",
    registeredAt: "2025-01-10",
    status: "Active",
  },
  {
    id: "A-002",
    name: "Bella",
    species: "Cat",
    breed: "Persian",
    age: "2 years",
    gender: "Female",
    ownerName: "Mary Wanjiku",
    ownerPhone: "0723456789",
    ownerEmail: "mary@example.com",
    registeredAt: "2025-01-15",
    status: "Under Treatment",
  },
  {
    id: "A-003",
    name: "Daisy",
    species: "Cow",
    breed: "Friesian",
    age: "5 years",
    gender: "Female",
    ownerName: "Peter Kamau",
    ownerPhone: "0734567890",
    ownerEmail: "peter@example.com",
    registeredAt: "2025-02-01",
    status: "Active",
  },
];

const speciesOptions = ["Dog", "Cat", "Cow", "Goat", "Sheep", "Horse", "Pig", "Poultry", "Rabbit", "Other"];

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700",
  "Under Treatment": "bg-yellow-100 text-yellow-700",
  Discharged: "bg-gray-100 text-gray-600",
};

const emptyForm = {
  name: "",
  species: "",
  breed: "",
  age: "",
  gender: "",
  ownerName: "",
  ownerPhone: "",
  ownerEmail: "",
};

export default function RegistrationPage() {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [viewAnimal, setViewAnimal] = useState<Animal | null>(null);

  const filtered = animals.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      a.species.toLowerCase().includes(search.toLowerCase())
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newAnimal: Animal = {
      ...form,
      id: `A-${String(animals.length + 1).padStart(3, "0")}`,
      registeredAt: new Date().toISOString().split("T")[0],
      status: "Active",
    };
    setAnimals([newAnimal, ...animals]);
    setForm(emptyForm);
    setShowForm(false);
    setSuccessMsg(`Animal "${newAnimal.name}" registered successfully with ID ${newAnimal.id}.`);
    setTimeout(() => setSuccessMsg(""), 4000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🐾 Animal Registration</h1>
          <p className="text-gray-500 text-sm mt-1">Register and manage animal records</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          {showForm ? "Cancel" : "+ Register New Animal"}
        </button>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="mb-4 bg-green-50 border border-green-300 text-green-800 rounded-lg px-4 py-3 text-sm">
          ✅ {successMsg}
        </div>
      )}

      {/* Registration Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">New Animal Registration Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Animal Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animal Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Simba"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
              <select
                required
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select species</option>
                {speciesOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
              <input
                value={form.breed}
                onChange={(e) => setForm({ ...form, breed: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. German Shepherd"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <input
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g. 3 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select
                required
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            {/* Owner Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
              <input
                required
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Phone *</label>
              <input
                required
                value={form.ownerPhone}
                onChange={(e) => setForm({ ...form, ownerPhone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="07XXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Email</label>
              <input
                type="email"
                value={form.ownerEmail}
                onChange={(e) => setForm({ ...form, ownerEmail: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="email@example.com"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(emptyForm); }}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-green-700 text-white text-sm font-semibold hover:bg-green-800"
              >
                Register Animal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Search */}
      <div className="mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search by name, ID, owner, or species..."
        />
      </div>

      {/* Animals Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Species</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Breed</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Owner</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Registered</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-400">No animals found.</td>
                </tr>
              ) : (
                filtered.map((animal) => (
                  <tr key={animal.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-green-700 font-semibold">{animal.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{animal.name}</td>
                    <td className="px-4 py-3 text-gray-600">{animal.species}</td>
                    <td className="px-4 py-3 text-gray-600">{animal.breed || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{animal.ownerName}</td>
                    <td className="px-4 py-3 text-gray-500">{animal.registeredAt}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${statusColors[animal.status]}`}>
                        {animal.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setViewAnimal(animal)}
                        className="text-green-700 hover:underline text-xs font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewAnimal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Animal Details</h3>
              <button onClick={() => setViewAnimal(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ["ID", viewAnimal.id],
                ["Name", viewAnimal.name],
                ["Species", viewAnimal.species],
                ["Breed", viewAnimal.breed || "—"],
                ["Age", viewAnimal.age || "—"],
                ["Gender", viewAnimal.gender],
                ["Owner", viewAnimal.ownerName],
                ["Phone", viewAnimal.ownerPhone],
                ["Email", viewAnimal.ownerEmail || "—"],
                ["Registered", viewAnimal.registeredAt],
                ["Status", viewAnimal.status],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500 font-medium">{label}</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => setViewAnimal(null)}
              className="mt-5 w-full bg-green-700 text-white py-2 rounded-lg font-semibold hover:bg-green-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
