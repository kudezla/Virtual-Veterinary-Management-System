"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePets, type Pet } from "@/context/PetsContext";

const SPECIES_OPTIONS = ["Dog", "Cat", "Rabbit", "Bird", "Guinea Pig", "Hamster", "Fish", "Other"];

const KENYA_COUNTIES = [
  "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo-Marakwet", "Embu",
  "Garissa", "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho",
  "Kiambu", "Kilifi", "Kirinyaga", "Kisii", "Kisumu", "Kitui",
  "Kwale", "Laikipia", "Lamu", "Machakos", "Makueni", "Mandera",
  "Marsabit", "Meru", "Migori", "Mombasa", "Murang'a", "Nairobi",
  "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua", "Nyeri",
  "Samburu", "Siaya", "Taita-Taveta", "Tana River", "Tharaka-Nithi",
  "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot",
];

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

export default function MyPetsPage() {
  const { user } = useAuth();
  const { pets, addPet } = usePets();
  const [showForm, setShowForm] = useState(false);
  const [viewPet, setViewPet] = useState<Pet | null>(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    species: "",
    breed: "",
    age: "",
    gender: "",
    color: "",
    weight: "",
    notes: "",
    location: "",
  });
  const [formError, setFormError] = useState("");

  // Only show pets belonging to the current owner
  const myPets = pets.filter((p) => p.ownerName === user?.name);

  const filtered = myPets.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.species.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.name.trim()) { setFormError("Pet name is required."); return; }
    if (!form.species) { setFormError("Species is required."); return; }
    if (!form.gender) { setFormError("Gender is required."); return; }
    if (!form.location) { setFormError("Location (county) is required."); return; }

    const newPet: Pet = {
      id: `P-${String(pets.length + 1).padStart(3, "0")}`,
      name: form.name.trim(),
      species: form.species,
      breed: form.breed.trim() || "Unknown",
      age: form.age.trim() || "Unknown",
      gender: form.gender,
      color: form.color.trim() || "—",
      weight: form.weight.trim() || "—",
      notes: form.notes.trim(),
      location: form.location,
      ownerName: user?.name ?? "Unknown",
      registeredAt: new Date().toISOString().split("T")[0],
    };

    addPet(newPet);
    setForm({ name: "", species: "", breed: "", age: "", gender: "", color: "", weight: "", notes: "", location: "" });
    setShowForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-6 mb-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">My Pets</h1>
            <p className="text-green-100 text-sm mt-1">
              Welcome, <span className="font-semibold">{user?.name}</span> — manage your registered pets below.
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setFormError(""); }}
            className="bg-white text-green-800 font-semibold px-5 py-2.5 rounded-lg text-sm hover:bg-green-50 transition-colors shadow"
          >
            + Register New Pet
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search by name, species, or breed…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Pet Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <span className="text-5xl">🐾</span>
          <p className="mt-3 text-lg font-medium">No pets registered yet</p>
          <p className="text-sm mt-1">Click &quot;Register New Pet&quot; to add your first pet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{speciesIcon[pet.species] ?? "🐾"}</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-base">{pet.name}</h3>
                  <p className="text-xs text-gray-500">{pet.species} · {pet.breed}</p>
                </div>
              </div>
              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p><span className="font-medium text-gray-700">Age:</span> {pet.age}</p>
                <p><span className="font-medium text-gray-700">Gender:</span> {pet.gender}</p>
                <p><span className="font-medium text-gray-700">Weight:</span> {pet.weight}</p>
                <p>
                  <span className="font-medium text-gray-700">📍 Location:</span>{" "}
                  <span className="text-green-700 font-semibold">{pet.location}</span>
                </p>
                <p><span className="font-medium text-gray-700">Registered:</span> {pet.registeredAt}</p>
              </div>
              <button
                onClick={() => setViewPet(pet)}
                className="w-full text-center text-sm text-green-700 font-semibold border border-green-300 rounded-lg py-2 hover:bg-green-50 transition-colors"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Register Pet Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-800">Register New Pet</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                  {formError}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pet Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. Max"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
                  <select
                    name="species"
                    value={form.species}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select species</option>
                    {SPECIES_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Breed</label>
                  <input
                    name="breed"
                    value={form.breed}
                    onChange={handleChange}
                    placeholder="e.g. Labrador"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="e.g. 2 years"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color / Markings</label>
                  <input
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    placeholder="e.g. Golden"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    placeholder="e.g. 5 kg"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">📍 Location (County) *</label>
                  <select
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select county in Kenya</option>
                    {KENYA_COUNTIES.map((county) => (
                      <option key={county} value={county}>{county}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Allergies, medical history, special needs…"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-green-800 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
                >
                  Register Pet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
