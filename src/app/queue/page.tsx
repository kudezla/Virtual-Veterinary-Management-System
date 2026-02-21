"use client";

import { useState } from "react";

type Priority = "Emergency" | "High" | "Normal" | "Low";
type QueueStatus = "Waiting" | "In Progress" | "Completed" | "Skipped";

type QueueEntry = {
  id: string;
  position: number;
  animalName: string;
  species: string;
  ownerName: string;
  ownerPhone: string;
  reason: string;
  priority: Priority;
  status: QueueStatus;
  arrivedAt: string;
  vet: string;
};

const initialQueue: QueueEntry[] = [
  {
    id: "Q-001",
    position: 1,
    animalName: "Simba",
    species: "Dog",
    ownerName: "John Mwangi",
    ownerPhone: "0712345678",
    reason: "Vaccination",
    priority: "Normal",
    status: "In Progress",
    arrivedAt: "08:45 AM",
    vet: "Dr. Omuya",
  },
  {
    id: "Q-002",
    position: 2,
    animalName: "Daisy",
    species: "Cow",
    ownerName: "Peter Kamau",
    ownerPhone: "0734567890",
    reason: "Deworming",
    priority: "Normal",
    status: "Waiting",
    arrivedAt: "09:00 AM",
    vet: "Dr. Omuya",
  },
  {
    id: "Q-003",
    position: 3,
    animalName: "Rex",
    species: "Dog",
    ownerName: "Alice Njeri",
    ownerPhone: "0745678901",
    reason: "Emergency — broken leg",
    priority: "Emergency",
    status: "Waiting",
    arrivedAt: "09:10 AM",
    vet: "Dr. Kamau",
  },
  {
    id: "Q-004",
    position: 4,
    animalName: "Mimi",
    species: "Cat",
    ownerName: "Grace Wambua",
    ownerPhone: "0756789012",
    reason: "Routine checkup",
    priority: "Low",
    status: "Waiting",
    arrivedAt: "09:20 AM",
    vet: "Dr. Njoroge",
  },
];

const priorityColors: Record<Priority, string> = {
  Emergency: "bg-red-100 text-red-700 border-red-300",
  High: "bg-orange-100 text-orange-700 border-orange-300",
  Normal: "bg-blue-100 text-blue-700 border-blue-300",
  Low: "bg-gray-100 text-gray-600 border-gray-300",
};

const statusColors: Record<QueueStatus, string> = {
  Waiting: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Skipped: "bg-gray-100 text-gray-500",
};

const vets = ["Dr. Omuya", "Dr. Kamau", "Dr. Njoroge", "Dr. Wanjiru"];

const emptyForm = {
  animalName: "",
  species: "",
  ownerName: "",
  ownerPhone: "",
  reason: "",
  priority: "Normal" as Priority,
  vet: "",
};

export default function QueuePage() {
  const [queue, setQueue] = useState<QueueEntry[]>(initialQueue);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [successMsg, setSuccessMsg] = useState("");

  const waiting = queue.filter((q) => q.status === "Waiting").length;
  const inProgress = queue.filter((q) => q.status === "In Progress").length;
  const completed = queue.filter((q) => q.status === "Completed").length;

  // Sort: Emergency first, then by position
  const sortedQueue = [...queue].sort((a, b) => {
    const priorityOrder: Record<Priority, number> = { Emergency: 0, High: 1, Normal: 2, Low: 3 };
    if (a.status === "Completed" && b.status !== "Completed") return 1;
    if (b.status === "Completed" && a.status !== "Completed") return -1;
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.position - b.position;
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });
    const newEntry: QueueEntry = {
      ...form,
      id: `Q-${String(queue.length + 1).padStart(3, "0")}`,
      position: queue.length + 1,
      status: "Waiting",
      arrivedAt: timeStr,
    };
    setQueue([...queue, newEntry]);
    setForm(emptyForm);
    setShowForm(false);
    setSuccessMsg(`${newEntry.animalName} added to queue as ${newEntry.id}.`);
    setTimeout(() => setSuccessMsg(""), 4000);
  }

  function updateStatus(id: string, status: QueueStatus) {
    setQueue(queue.map((q) => (q.id === id ? { ...q, status } : q)));
  }

  function removeFromQueue(id: string) {
    setQueue(queue.filter((q) => q.id !== id));
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">⏳ Queue Management</h1>
          <p className="text-gray-500 text-sm mt-1">Track and manage patient queues in real time</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          {showForm ? "Cancel" : "+ Add to Queue"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{waiting}</div>
          <div className="text-sm text-yellow-600 font-medium">Waiting</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">{inProgress}</div>
          <div className="text-sm text-blue-600 font-medium">In Progress</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{completed}</div>
          <div className="text-sm text-green-600 font-medium">Completed</div>
        </div>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="mb-4 bg-yellow-50 border border-yellow-300 text-yellow-800 rounded-lg px-4 py-3 text-sm">
          ✅ {successMsg}
        </div>
      )}

      {/* Add to Queue Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Add Patient to Queue</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animal Name *</label>
              <input
                required
                value={form.animalName}
                onChange={(e) => setForm({ ...form, animalName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g. Simba"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
              <input
                required
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g. Dog"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
              <input
                required
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Phone *</label>
              <input
                required
                value={form.ownerPhone}
                onChange={(e) => setForm({ ...form, ownerPhone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="07XXXXXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
              <input
                required
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="e.g. Vaccination"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
              <select
                required
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="Emergency">🚨 Emergency</option>
                <option value="High">🔴 High</option>
                <option value="Normal">🔵 Normal</option>
                <option value="Low">⚪ Low</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assign Vet *</label>
              <select
                required
                value={form.vet}
                onChange={(e) => setForm({ ...form, vet: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="">Select vet</option>
                {vets.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
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
                className="px-5 py-2 rounded-lg bg-yellow-600 text-white text-sm font-semibold hover:bg-yellow-700"
              >
                Add to Queue
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Queue Cards */}
      <div className="space-y-3">
        {sortedQueue.map((entry) => (
          <div
            key={entry.id}
            className={`bg-white rounded-xl border-l-4 shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${priorityColors[entry.priority]}`}
          >
            {/* Position Badge */}
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-700 text-sm shrink-0">
                #{entry.position}
              </div>
              <div className="min-w-0">
                <div className="font-bold text-gray-800">{entry.animalName}</div>
                <div className="text-xs text-gray-500">{entry.species} &bull; {entry.ownerName} &bull; {entry.ownerPhone}</div>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-700">{entry.reason}</div>
              <div className="text-xs text-gray-400 mt-0.5">Arrived: {entry.arrivedAt} &bull; {entry.vet}</div>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs font-semibold rounded-full px-2 py-0.5 border ${priorityColors[entry.priority]}`}>
                {entry.priority}
              </span>
              <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${statusColors[entry.status]}`}>
                {entry.status}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              {entry.status === "Waiting" && (
                <button
                  onClick={() => updateStatus(entry.id, "In Progress")}
                  className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Start
                </button>
              )}
              {entry.status === "In Progress" && (
                <button
                  onClick={() => updateStatus(entry.id, "Completed")}
                  className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 font-medium"
                >
                  Complete
                </button>
              )}
              {(entry.status === "Waiting" || entry.status === "In Progress") && (
                <button
                  onClick={() => updateStatus(entry.id, "Skipped")}
                  className="text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Skip
                </button>
              )}
              {(entry.status === "Completed" || entry.status === "Skipped") && (
                <button
                  onClick={() => removeFromQueue(entry.id)}
                  className="text-xs bg-red-100 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-200 font-medium"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}

        {queue.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-2">✅</div>
            <p>Queue is empty. No patients waiting.</p>
          </div>
        )}
      </div>
    </div>
  );
}
