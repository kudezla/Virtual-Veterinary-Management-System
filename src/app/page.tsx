import Link from "next/link";

const stats = [
  { label: "Registered Animals", value: "248", icon: "🐄", color: "bg-green-100 text-green-800" },
  { label: "Today's Appointments", value: "14", icon: "📅", color: "bg-blue-100 text-blue-800" },
  { label: "In Queue", value: "6", icon: "⏳", color: "bg-yellow-100 text-yellow-800" },
  { label: "Reports Generated", value: "92", icon: "📋", color: "bg-purple-100 text-purple-800" },
];

const modules = [
  {
    href: "/registration",
    title: "Animal Registration",
    description: "Register new animals, update existing records, and manage owner information.",
    icon: "🐾",
    color: "border-green-400 hover:bg-green-50",
    badge: "Core Module",
  },
  {
    href: "/appointments",
    title: "Appointment Scheduling",
    description: "Schedule, view, and manage veterinary appointments with automated reminders.",
    icon: "📅",
    color: "border-blue-400 hover:bg-blue-50",
    badge: "Core Module",
  },
  {
    href: "/queue",
    title: "Queue Management",
    description: "Track and manage patient queues, prioritize cases, and reduce waiting times.",
    icon: "⏳",
    color: "border-yellow-400 hover:bg-yellow-50",
    badge: "Core Module",
  },
  {
    href: "/reports",
    title: "Medical Reports",
    description: "Generate, view, and manage medical reports and treatment histories.",
    icon: "📋",
    color: "border-purple-400 hover:bg-purple-50",
    badge: "Core Module",
  },
];

const recentActivity = [
  { time: "08:30 AM", action: "Animal registered", detail: "Cow #A-112 — Owner: John Mwangi", type: "registration" },
  { time: "09:00 AM", action: "Appointment scheduled", detail: "Dog #D-045 — Dr. Omuya at 2:00 PM", type: "appointment" },
  { time: "09:15 AM", action: "Queue updated", detail: "Goat #G-078 moved to position #2", type: "queue" },
  { time: "09:45 AM", action: "Report generated", detail: "Treatment report for Cat #C-033", type: "report" },
  { time: "10:00 AM", action: "Animal registered", detail: "Horse #H-019 — Owner: Mary Wanjiku", type: "registration" },
];

const typeColors: Record<string, string> = {
  registration: "bg-green-100 text-green-700",
  appointment: "bg-blue-100 text-blue-700",
  queue: "bg-yellow-100 text-yellow-700",
  report: "bg-purple-100 text-purple-700",
};

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-2xl p-8 mb-8 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-5xl">🐾</span>
          <div>
            <h1 className="text-3xl font-bold">Virtual Veterinary Management System</h1>
            <p className="mt-1 text-green-100 text-lg">
              Machakos University &mdash; Improving veterinary service delivery in Kenya
            </p>
          </div>
        </div>
        <p className="mt-4 text-green-100 max-w-2xl">
          A web-based platform automating animal registration, appointment scheduling, queue management,
          and medical report generation for veterinary centers across Kenya.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`rounded-xl p-5 ${stat.color} shadow-sm`}>
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="text-sm font-medium mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Modules */}
      <h2 className="text-xl font-bold text-gray-800 mb-4">System Modules</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {modules.map((mod) => (
          <Link
            key={mod.href}
            href={mod.href}
            className={`block border-2 rounded-xl p-5 bg-white shadow-sm transition-all ${mod.color}`}
          >
            <div className="text-4xl mb-3">{mod.icon}</div>
            <span className="inline-block text-xs font-semibold bg-gray-100 text-gray-600 rounded-full px-2 py-0.5 mb-2">
              {mod.badge}
            </span>
            <h3 className="font-bold text-gray-800 text-base mb-1">{mod.title}</h3>
            <p className="text-sm text-gray-500">{mod.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-xs text-gray-400 w-20 shrink-0 pt-0.5">{item.time}</span>
              <span
                className={`text-xs font-semibold rounded-full px-2 py-0.5 shrink-0 ${typeColors[item.type]}`}
              >
                {item.action}
              </span>
              <span className="text-sm text-gray-600">{item.detail}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
