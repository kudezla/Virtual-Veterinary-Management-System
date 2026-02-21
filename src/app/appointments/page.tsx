"use client";

import { useState } from "react";

type Appointment = {
  id: string;
  animalId: string;
  animalName: string;
  species: string;
  ownerName: string;
  ownerPhone: string;
  date: string;
  time: string;
  reason: string;
  vet: string;
  status: "Scheduled" | "Completed" | "Cancelled" | "No Show";
};

const initialAppointments: Appointment[] = [
  {
    id: "APT-001",
    animalId: "A-001",
    animalName: "Simba",
    species: "Dog",
    ownerName: "John Mwangi",
    ownerPhone: "0712345678",
    date: "2025-02-21",
    time: "09:00",
    reason: "Routine vaccination",
    vet: "Dr. Peter",
    status: "Scheduled",
  },
  {
    id: "APT-002",
    animalId: "A-002",
    animalName: "Bella",
    species: "Cat",
    ownerName: "Mary Wanjiku",
    ownerPhone: "0723456789",
    date: "2025-02-21",
    time: "10:30",
    reason: "Skin infection treatment",
    vet: "Dr. Kamau",
    status: "Completed",
  },
  {
    id: "APT-003",
    animalId: "A-003",
    animalName: "Daisy",
    species: "Cow",
    ownerName: "Peter Kamau",
    ownerPhone: "0734567890",
    date: "2025-02-22",
    time: "08:00",
    reason: "Deworming",
    vet: "Dr. Peter",
    status: "Scheduled",
  },
];

const vets = ["Dr. Peter", "Dr. Kamau", "Dr. Njoroge", "Dr. Wanjiru"];

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  "No Show": "bg-gray-100 text-gray-600",
};

const emptyForm = {
  animalId: "",
  animalName: "",
  species: "",
  ownerName: "",
  ownerPhone: "",
  date: "",
  time: "",
  reason: "",
  vet: "",
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState<string>("All");
  const [successMsg, setSuccessMsg] = useState("");
  const [viewAppt, setViewAppt] = useState<Appointment | null>(null);

  const statusFilters = ["All", "Scheduled", "Completed", "Cancelled", "No Show"];

  const filtered = appointments.filter(
    (a) => filter === "All" || a.status === filter
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newAppt: Appointment = {
      ...form,
      id: `APT-${String(appointments.length + 1).padStart(3, "0")}`,
      status: "Scheduled",
    };
    setAppointments([newAppt, ...appointments]);
    setForm(emptyForm);
    setShowForm(false);
    setSuccessMsg(`Appointment ${newAppt.id} scheduled for ${newAppt.animalName} on ${newAppt.date} at ${newAppt.time}.`);
    setTimeout(() => setSuccessMsg(""), 5000);
  }

  function updateStatus(id: string, status: Appointment["status"]) {
    setAppointments(appointments.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📅 Appointment Scheduling</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule and manage veterinary appointments</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          {showForm ? "Cancel" : "+ New Appointment"}
        </button>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="mb-4 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg px-4 py-3 text-sm">
          ✅ {successMsg}
        </div>
      )}

      {/* Appointment Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">New Appointment Form</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animal ID</label>
              <input
                value={form.animalId}
                onChange={(e) => setForm({ ...form, animalId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. A-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animal Name *</label>
              <input
                required
                value={form.animalName}
                onChange={(e) => setForm({ ...form, animalName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Simba"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
              <input
                required
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Dog"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
              <input
                required
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Phone *</label>
              <input
                required
                value={form.ownerPhone}
                onChange={(e) => setForm({ ...form, ownerPhone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="07XXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
              <input
                required
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Veterinarian *</label>
              <select
                required
                value={form.vet}
                onChange={(e) => setForm({ ...form, vet: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select vet</option>
                {vets.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
              <input
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Vaccination"
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
                className="px-5 py-2 rounded-lg bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800"
              >
                Schedule Appointment
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              filter === s
                ? "bg-blue-700 text-white"
                : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Animal</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Owner</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Date & Time</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Reason</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Vet</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-400">No appointments found.</td>
                </tr>
              ) : (
                filtered.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-blue-700 font-semibold">{appt.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{appt.animalName}</div>
                      <div className="text-xs text-gray-400">{appt.species}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-700">{appt.ownerName}</div>
                      <div className="text-xs text-gray-400">{appt.ownerPhone}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-gray-700">{appt.date}</div>
                      <div className="text-xs text-gray-400">{appt.time}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{appt.reason}</td>
                    <td className="px-4 py-3 text-gray-600">{appt.vet}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${statusColors[appt.status]}`}>
                        {appt.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <button
                        onClick={() => setViewAppt(appt)}
                        className="text-blue-700 hover:underline text-xs font-medium"
                      >
                        View
                      </button>
                      {appt.status === "Scheduled" && (
                        <>
                          <button
                            onClick={() => updateStatus(appt.id, "Completed")}
                            className="text-green-700 hover:underline text-xs font-medium"
                          >
                            Complete
                          </button>
                          <button
                            onClick={() => updateStatus(appt.id, "Cancelled")}
                            className="text-red-600 hover:underline text-xs font-medium"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {viewAppt && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Appointment Details</h3>
              <button onClick={() => setViewAppt(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ["Appointment ID", viewAppt.id],
                ["Animal ID", viewAppt.animalId || "—"],
                ["Animal Name", viewAppt.animalName],
                ["Species", viewAppt.species],
                ["Owner", viewAppt.ownerName],
                ["Phone", viewAppt.ownerPhone],
                ["Date", viewAppt.date],
                ["Time", viewAppt.time],
                ["Reason", viewAppt.reason],
                ["Veterinarian", viewAppt.vet],
                ["Status", viewAppt.status],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-gray-100 pb-1">
                  <span className="text-gray-500 font-medium">{label}</span>
                  <span className="text-gray-800">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
              📱 SMS notification would be sent to {viewAppt.ownerPhone} confirming this appointment.
            </div>
            <button
              onClick={() => setViewAppt(null)}
              className="mt-4 w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
