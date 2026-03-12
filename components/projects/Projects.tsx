"use client";

import { motion } from "framer-motion";
import ProjectCard, { type Project } from "./ProjectCard";

const projects: Project[] = [
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
    liveUrl: undefined,
  },
  {
    id: 2,
    title: "GO_comerce",
    description: "Backend API e-commerce yang robust dan performant dibangun dengan Golang. Fitur lengkap mulai dari manajemen produk, order, pembayaran, hingga sistem autentikasi JWT yang aman dan scalable.",
    tags: ["Golang", "REST API", "PostgreSQL", "JWT", "Docker"],
    emoji: "🛒",
    gradientFrom: "from-sky-500",
    gradientTo: "to-cyan-400",
    githubUrl: "https://github.com/assidik12/GO_comerce",
    liveUrl: undefined,
  },
  {
    id: 3,
    title: "Sertifyed",
    description: "Platform penerbitan dan verifikasi sertifikat digital berbasis Web3/Blockchain. Sertifikat disimpan on-chain sebagai NFT sehingga tidak bisa dipalsukan dan bisa diverifikasi siapapun secara transparan.",
    tags: ["Web3", "Solidity", "NFT", "Next.js", "Ethers.js"],
    emoji: "🏆",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-500",
    githubUrl: "https://github.com/assidik12/sertifyed_contract",
    liveUrl: undefined,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Yang Sudah Dibuat</span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-2">Proyek Pilihan</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Beberapa project yang pernah saya bangun — dari iseng-isengan sampai yang serius. 😄</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div key={project.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.1 }}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-12">
          <a
            href="https://github.com/assidik12?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold text-sm hover:border-sky-500 hover:text-sky-500 dark:hover:border-sky-400 dark:hover:text-sky-400 transition-all duration-200"
          >
            Lihat Semua di GitHub →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
