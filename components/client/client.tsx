"use client";

import React, { useState } from "react";

export interface Experience {
  id: string | number;
  organization: string;
  logo?: string; // optional path in /public
  role: string;
  startDate: string; // e.g. "Jan 2024"
  endDate?: string; // e.g. "Jun 2024" or "Present"
  location?: string;
  keyTasks: string[];
}

const sampleExperiences: Experience[] = [
  {
    id: 1,
    organization: "Dinas Komunikasi, Informatika dan Statistik Kabupaten Brebes",
    role: "IoT and Computer Vision Research Engineer",
    startDate: "Sep 2025",
    endDate: "Des 2025",
    location: "Brebes Regency, Central Java, Indonesia",
    keyTasks: [
      "Mempelopori penelitian, desain, dan pengembangan prototipe sistem kontrol hands-free untuk perangkat smart home (teknologi bantu untuk individu dengan gangguan motorik).",
      "Mengelola seluruh siklus pengembangan produk, mulai dari konseptualisasi dan pemilihan teknologi hingga implementasi full-stack dan integrasi perangkat keras.",
    ],
  },
  {
    id: 2,
    organization: "Flow Byte Digital",
    role: "Back End Developer",
    startDate: "Jan 2025",
    endDate: "Feb 2025",
    location: "Area DKI Jakarta",
    keyTasks: [
      "Development: Membangun fitur baru, memperbaiki bug, dan mengoptimalkan performa.",
      "Integration: Menghubungkan sistem dengan layanan pihak ketiga.",
      "Menerapkan metodologi Agile untuk pengembangan yang cepat dan fleksibel, serta membangun API yang tangguh dan efisien.",
    ],
  },
  {
    id: 3,
    organization: "Candidate College",
    role: "Back End Developer",
    startDate: "Okt 2024",
    endDate: "Feb 2025",
    location: "Area DKI Jakarta",
    keyTasks: ["Mengembangkan REST API untuk sistem manajemen.", "Menerapkan metode Agile dan berkolaborasi dengan tim.", "Memberikan solusi terhadap masalah selama proses pengembangan aplikasi."],
  },
];

function ExperienceCard({ exp }: { exp: Experience }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xl font-semibold text-slate-700 dark:text-slate-100">
          {/* If logo provided, render <img>, else initials fallback */}
          {exp.logo ? (
            // plain img so it loads from /public without next/image overhead in list
            // eslint-disable-next-line @next/next/no-img-element
            <img src={exp.logo} alt={`${exp.organization} logo`} className="w-10 h-10 object-contain rounded-md" />
          ) : (
            <span className="leading-none">
              {exp.organization
                .split(" ")
                .map((s) => s[0])
                .slice(0, 2)
                .join("")}
            </span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h4 className="font-quicksand font-bold text-sm text-slate-900 dark:text-slate-50">{exp.role}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {exp.organization} · <span className="text-slate-600 dark:text-slate-300">{exp.location}</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {exp.startDate} — {exp.endDate ?? "Present"}
              </p>
              <button onClick={() => setOpen((v) => !v)} aria-expanded={open} className="mt-2 text-xs text-sky-500 hover:text-sky-600 font-medium">
                {open ? "Sembunyikan" : "Lihat tugas"}
              </button>
            </div>
          </div>

          <div className={`mt-3 text-sm text-slate-700 dark:text-slate-300 ${open ? "" : "hidden"}`}>
            <ul className="list-disc list-inside space-y-2">
              {exp.keyTasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Clients() {
  return (
    <section id="clients" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Pengalaman</span>
          <h2 className="font-quicksand text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 mt-2">Magang & Kolaborasi</h2>
          <p className="mt-3 text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Beberapa pengalaman kerja/kolaborasi dan tugas utama yang pernah saya tangani.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleExperiences.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}
