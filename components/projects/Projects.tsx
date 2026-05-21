"use client";

import { motion } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

interface ProjectsProps {
  projects?: Project[];
  loading?: boolean;
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "BlinkLink",
    description:
      "Platform assistive technology yang memanfaatkan Computer Vision untuk mendeteksi kedipan mata sebagai metode komunikasi bagi penyandang disabilitas. Membantu pengguna berinteraksi dengan perangkat hanya menggunakan gerakan mata.",
    tags: ["Python", "Computer Vision", "OpenCV", "MediaPipe", "Accessibility"],
    emoji: "👁️",
    gradientFrom: "from-purple-500",
    gradientTo: "to-indigo-500",
    githubUrl: "https://github.com/assidik12/BlinkLink-Iot",
  },
  {
    id: 2,
    title: "GO_comerce",
    description:
      "Backend API e-commerce yang robust dan performant dibangun dengan Golang. Fitur lengkap mulai dari manajemen produk, order, pembayaran, hingga sistem autentikasi JWT yang aman dan scalable.",
    tags: ["Golang", "REST API", "PostgreSQL", "JWT", "Docker"],
    emoji: "🛒",
    gradientFrom: "from-sky-500",
    gradientTo: "to-cyan-400",
    githubUrl: "https://github.com/assidik12/GO_comerce",
  },
  {
    id: 3,
    title: "Sertifyed",
    description:
      "Platform penerbitan dan verifikasi sertifikat digital berbasis Web3/Blockchain. Sertifikat disimpan on-chain sebagai NFT sehingga tidak bisa dipalsukan dan bisa diverifikasi siapapun secara transparan.",
    tags: ["Web3", "Solidity", "NFT", "Next.js", "Ethers.js"],
    emoji: "🏆",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    githubUrl: "https://github.com/assidik12/sertifyed_contract",
  },
];

export default function Projects({
  projects = DEFAULT_PROJECTS,
  loading = false,
}: ProjectsProps) {
  
  // Clean fallback in case database returns empty list
  const activeProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  if (loading) {
    return (
      <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-16 space-y-3 animate-pulse">
            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
            <div className="h-4 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg mx-auto" />
          </div>

          {/* Grid Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((val) => (
              <div
                key={val}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-6 h-80 animate-pulse"
              >
                <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  <div className="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest bg-sky-50 dark:bg-sky-950/50 px-3.5 py-1 rounded-full border border-sky-100 dark:border-sky-900/30">
            Yang Sudah Dibuat
          </span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-4">
            Proyek Pilihan
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Beberapa project yang pernah saya bangun — dari iseng-isengan sampai yang serius. 😄
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.07 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/assidik12?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:border-sky-500 hover:text-sky-500 dark:hover:border-sky-400 dark:hover:text-sky-400 transition-all duration-300 hover:scale-105 shadow-sm"
          >
            Lihat Semua di GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
