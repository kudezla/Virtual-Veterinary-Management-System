"use client";

import { useState } from "react";

type ReportType = "Treatment" | "Vaccination" | "Diagnosis" | "Discharge" | "Follow-up";

type MedicalReport = {
  id: string;
  animalId: string;
  animalName: string;
  species: string;
  ownerName: string;
  date: string;
  type: ReportType;
  diagnosis: string;
  treatment: string;
  medication: string;
  vet: string;
  notes: string;
  nextVisit: string;
};

const initialReports: MedicalReport[] = [
  {
    id: "RPT-001",
    animalId: "A-001",
    animalName: "Simba",
    species: "Dog",
    ownerName: "John Mwangi",
    date: "2025-02-10",
    type: "Vaccination",
    diagnosis: "Healthy — routine vaccination",
    treatment: "Rabies vaccine administered",
    medication: "Rabies vaccine (1 dose)",
    vet: "Dr. Omuya",
    notes: "Animal is in good health. No adverse reactions observed.",
    nextVisit: "2026-02-10",
  },
  {
    id: "RPT-002",
    animalId: "A-002",
    animalName: "Bella",
    species: "Cat",
    ownerName: "Mary Wanjiku",
    date: "2025-02-15",
    type: "Treatment",
    diagnosis: "Dermatitis — skin infection",
    treatment: "Topical antifungal cream applied. Oral antibiotics prescribed.",
    medication: "Amoxicillin 250mg (7 days), Clotrimazole cream",
    vet: "Dr. Kamau",
    notes: "Owner advised to keep animal dry and clean. Return in 7 days for follow-up.",
    nextVisit: "2025-02-22",
  },
  {
    id: "RPT-003",
    animalId: "A-003",
    animalName: "Daisy",
    species: "Cow",
    ownerName: "Peter Kamau",
    date: "2025-02-18",
    type: "Diagnosis",
    diagnosis: "Mild respiratory infection",
    treatment: "Antibiotic injection administered. Supportive care recommended.",
    medication: "Oxytetracycline 20% (3 days)",
    vet: "Dr. Omuya",
    notes: "Isolate from other cattle. Monitor temperature daily.",
    nextVisit: "2025-02-25",
  },
];

const reportTypes: ReportType[] = ["Treatment", "Vaccination", "Diagnosis", "Discharge", "Follow-up"];
const vets = ["Dr. Omuya", "Dr. Kamau", "Dr. Njoroge", "Dr. Wanjiru"];

const typeColors: Record<ReportType, string> = {
  Treatment: "bg-red-100 text-red-700",
  Vaccination: "bg-green-100 text-green-700",
  Diagnosis: "bg-blue-100 text-blue-700",
  Discharge: "bg-gray-100 text-gray-600",
  "Follow-up": "bg-purple-100 text-purple-700",
};

const emptyForm = {
  animalId: "",
  animalName: "",
  species: "",
  ownerName: "",
  date: "",
  type: "Treatment" as ReportType,
  diagnosis: "",
  treatment: "",
  medication: "",
  vet: "",
  notes: "",
  nextVisit: "",
};

export default function ReportsPage() {
  const [reports, setReports] = useState<MedicalReport[]>(initialReports);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [viewReport, setViewReport] = useState<MedicalReport | null>(null);
  const [successMsg, setSuccessMsg] = useState("");

  const typeFilters = ["All", ...reportTypes];

  const filtered = reports.filter((r) => {
    const matchesType = filter === "All" || r.type === filter;
    const matchesSearch =
      r.animalName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.ownerName.toLowerCase().includes(search.toLowerCase()) ||
      r.diagnosis.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newReport: MedicalReport = {
      ...form,
      id: `RPT-${String(reports.length + 1).padStart(3, "0")}`,
    };
    setReports([newReport, ...reports]);
    setForm(emptyForm);
    setShowForm(false);
    setSuccessMsg(`Medical report ${newReport.id} generated for ${newReport.animalName}.`);
    setTimeout(() => setSuccessMsg(""), 4000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📋 Medical Reports</h1>
          <p className="text-gray-500 text-sm mt-1">Generate and manage animal medical reports</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-lg font-semibold transition-colors"
        >
          {showForm ? "Cancel" : "+ New Report"}
        </button>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="mb-4 bg-purple-50 border border-purple-300 text-purple-800 rounded-lg px-4 py-3 text-sm">
          ✅ {successMsg}
        </div>
      )}

      {/* Report Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">New Medical Report</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animal ID</label>
              <input
                value={form.animalId}
                onChange={(e) => setForm({ ...form, animalId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. A-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Animal Name *</label>
              <input
                required
                value={form.animalName}
                onChange={(e) => setForm({ ...form, animalName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Simba"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Species *</label>
              <input
                required
                value={form.species}
                onChange={(e) => setForm({ ...form, species: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Dog"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name *</label>
              <input
                required
                value={form.ownerName}
                onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
              <input
                required
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Report Type *</label>
              <select
                required
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value as ReportType })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {reportTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Veterinarian *</label>
              <select
                required
                value={form.vet}
                onChange={(e) => setForm({ ...form, vet: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select vet</option>
                {vets.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Next Visit Date</label>
              <input
                type="date"
                value={form.nextVisit}
                onChange={(e) => setForm({ ...form, nextVisit: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis *</label>
              <input
                required
                value={form.diagnosis}
                onChange={(e) => setForm({ ...form, diagnosis: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Dermatitis"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Treatment *</label>
              <textarea
                required
                value={form.treatment}
                onChange={(e) => setForm({ ...form, treatment: e.target.value })}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Describe treatment administered..."
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Medication</label>
              <input
                value={form.medication}
                onChange={(e) => setForm({ ...form, medication: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g. Amoxicillin 250mg"
              />
            </div>
            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                rows={2}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Additional notes or instructions..."
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
                className="px-5 py-2 rounded-lg bg-purple-700 text-white text-sm font-semibold hover:bg-purple-800"
              >
                Generate Report
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Search by animal, owner, or diagnosis..."
        />
        <div className="flex gap-2 flex-wrap">
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                filter === t
                  ? "bg-purple-700 text-white"
                  : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">ID</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Animal</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Owner</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Date</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Diagnosis</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Vet</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Next Visit</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center py-8 text-gray-400">No reports found.</td>
                </tr>
              ) : (
                filtered.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-purple-700 font-semibold">{report.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800">{report.animalName}</div>
                      <div className="text-xs text-gray-400">{report.species}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{report.ownerName}</td>
                    <td className="px-4 py-3 text-gray-500">{report.date}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${typeColors[report.type]}`}>
                        {report.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{report.diagnosis}</td>
                    <td className="px-4 py-3 text-gray-600">{report.vet}</td>
                    <td className="px-4 py-3 text-gray-500">{report.nextVisit || "—"}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => setViewReport(report)}
                        className="text-purple-700 hover:underline text-xs font-medium"
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

      {/* View Report Modal */}
      {viewReport && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Medical Report</h3>
                <p className="text-xs text-gray-400">{viewReport.id}</p>
              </div>
              <button onClick={() => setViewReport(null)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            {/* Report Header */}
            <div className="bg-purple-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-gray-800 text-lg">{viewReport.animalName}</div>
                  <div className="text-sm text-gray-500">{viewReport.species} &bull; ID: {viewReport.animalId || "—"}</div>
                  <div className="text-sm text-gray-600 mt-1">Owner: {viewReport.ownerName}</div>
                </div>
                <span className={`text-xs font-semibold rounded-full px-3 py-1 ${typeColors[viewReport.type]}`}>
                  {viewReport.type}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <span className="font-semibold text-gray-700">Date:</span>
                <span className="ml-2 text-gray-600">{viewReport.date}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Veterinarian:</span>
                <span className="ml-2 text-gray-600">{viewReport.vet}</span>
              </div>
              <div className="border-t pt-3">
                <div className="font-semibold text-gray-700 mb-1">Diagnosis</div>
                <div className="text-gray-600 bg-gray-50 rounded p-2">{viewReport.diagnosis}</div>
              </div>
              <div>
                <div className="font-semibold text-gray-700 mb-1">Treatment</div>
                <div className="text-gray-600 bg-gray-50 rounded p-2">{viewReport.treatment}</div>
              </div>
              {viewReport.medication && (
                <div>
                  <div className="font-semibold text-gray-700 mb-1">Medication</div>
                  <div className="text-gray-600 bg-gray-50 rounded p-2">{viewReport.medication}</div>
                </div>
              )}
              {viewReport.notes && (
                <div>
                  <div className="font-semibold text-gray-700 mb-1">Notes</div>
                  <div className="text-gray-600 bg-gray-50 rounded p-2">{viewReport.notes}</div>
                </div>
              )}
              {viewReport.nextVisit && (
                <div className="bg-blue-50 rounded-lg p-3 text-blue-700 text-sm">
                  📅 Next visit scheduled: <strong>{viewReport.nextVisit}</strong>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => window.print()}
                className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200 text-sm"
              >
                🖨️ Print Report
              </button>
              <button
                onClick={() => setViewReport(null)}
                className="flex-1 bg-purple-700 text-white py-2 rounded-lg font-semibold hover:bg-purple-800 text-sm"
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
