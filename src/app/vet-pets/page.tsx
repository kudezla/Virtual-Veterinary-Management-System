"use client";

import { useState } from "react";
import { usePets, type Pet } from "@/context/PetsContext";

const speciesIcon: Record<string, string> = {
  Dog: "🐕",
  Cat: "🐈",
  Rabbit: "🐇",
  Bird: "🐦",
  "Guinea Pig": "🐹",
  Hamster: "🐹",
  Fish: "🐟",
  Other: "🐾",
};

export default function VetPetsPage() {
  const { pets } = usePets();
  const [search, setSearch] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [viewPet, setViewPet] = useState<Pet | null>(null);

  const uniqueLocations = Array.from(new Set(pets.map((p) => p.location))).sort();
  const uniqueSpecies = Array.from(new Set(pets.map((p) => p.species))).sort();

  const filtered = pets.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchLocation = locationFilter ? p.location === locationFilter : true;
    const matchSpecies = speciesFilter ? p.species === speciesFilter : true;
    return matchSearch && matchLocation && matchSpecies;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
        <div className="flex items-center gap-4">
          <span className="text-4xl">🩺</span>
          <div>
            <h1 className="text-2xl font-bold">All Registered Pets</h1>
            <p className="text-green-100 text-sm mt-1">
              View all pets registered by pet owners across Kenya
            </p>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-green-700">{pets.length}</p>
          <p className="text-xs text-gray-500 mt-1">Total Pets</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-blue-600">{uniqueLocations.length}</p>
          <p className="text-xs text-gray-500 mt-1">Counties</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-purple-600">{uniqueSpecies.length}</p>
          <p className="text-xs text-gray-500 mt-1">Species</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
          <p className="text-2xl font-bold text-orange-500">
            {Array.from(new Set(pets.map((p) => p.ownerName))).length}
          </p>
          <p className="text-xs text-gray-500 mt-1">Pet Owners</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by pet name, owner, breed, or ID…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">All Counties</option>
          {uniqueLocations.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
        >
          <option value="">All Species</option>
          {uniqueSpecies.map((sp) => (
            <option key={sp} value={sp}>{sp}</option>
          ))}
        </select>
      </div>

      {/* Pets Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Pet</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Species</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Breed</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Age</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Owner</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">📍 Location</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Registered</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-400">
                    <span className="text-3xl block mb-2">🐾</span>
                    No pets found.
                  </td>
                </tr>
              ) : (
                filtered.map((pet) => (
                  <tr key={pet.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-green-700 font-semibold">{pet.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{speciesIcon[pet.species] ?? "🐾"}</span>
                        <span className="font-medium text-gray-800">{pet.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{pet.species}</td>
                    <td className="px-4 py-3 text-gray-600">{pet.breed || "—"}</td>
                    <td className="px-4 py-3 text-gray-600">{pet.age || "—"}</td>
                    <td className="px-4 py-3 text-gray-700 font-medium">{pet.ownerName}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-blue-700 font-semibold rounded-full px-2.5 py-1">
                        📍 {pet.location}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{pet.registeredAt}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setViewPet(pet)}
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
        {filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
            Showing {filtered.length} of {pets.length} pets
          </div>
        )}
      </div>

      {/* View Pet Modal */}
      {viewPet && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Pet Details</h2>
              <button
                onClick={() => setViewPet(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-5xl">{speciesIcon[viewPet.species] ?? "🐾"}</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{viewPet.name}</h3>
                  <p className="text-sm text-gray-500">{viewPet.species} · {viewPet.breed}</p>
                  <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 font-semibold rounded-full px-2 py-0.5">
                    ID: {viewPet.id}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  ["Age", viewPet.age],
                  ["Gender", viewPet.gender],
                  ["Color", viewPet.color],
                  ["Weight", viewPet.weight],
                  ["📍 Location", viewPet.location],
                  ["Owner", viewPet.ownerName],
                  ["Registered", viewPet.registeredAt],
                ].map(([label, value]) => (
                  <div key={label} className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 font-medium">{label}</p>
                    <p className="text-gray-800 font-semibold mt-0.5">{value}</p>
                  </div>
                ))}
              </div>
              {viewPet.notes && (
                <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-xs font-semibold text-yellow-800 mb-1">Notes</p>
                  <p className="text-sm text-yellow-900">{viewPet.notes}</p>
                </div>
              )}
              <button
                onClick={() => setViewPet(null)}
                className="mt-5 w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
