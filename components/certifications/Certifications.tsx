"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Award, Calendar, Building2, ExternalLink, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface Certification {
  id: number;
  name: string;
  description: string;
  date: string;
  institution: string;
  fileUrl?: string;
  articleUrl?: string;
  sortOrder?: number;
}

interface CertificationsProps {
  certifications?: Certification[];
  loading?: boolean;
}

const DEFAULT_CERTIFICATIONS: Certification[] = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    description: "Sertifikasi keahlian dalam merancang dan menerapkan sistem terdistribusi di platform AWS secara scalable dan secure.",
    date: "2024-05",
    institution: "Amazon Web Services (AWS)",
  },
  {
    id: 2,
    name: "Dicoding: Belajar Membuat Aplikasi Web dengan React",
    description: "Lulus dengan predikat memuaskan, menguasai React hooks, routing, dan state management.",
    date: "2023-11",
    institution: "Dicoding Indonesia",
  },
];

function CertificationCardItem({ cert, idx }: { cert: Certification; idx: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const isLong = cert.description.length > maxLength;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
    >
      <div className="p-6 flex-1 flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-100 dark:border-amber-500/20 group-hover:scale-110 transition-transform">
          <Award className="w-6 h-6" />
        </div>
        
        <h3 className="font-quicksand text-xl font-bold text-slate-900 dark:text-slate-50 mb-2 group-hover:text-amber-500 transition-colors">
          {cert.name}
        </h3>
        
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">{cert.institution}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{cert.date}</span>
          </div>
        </div>
        
        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex-1">
          {isExpanded || !isLong ? cert.description : `${cert.description.slice(0, maxLength)}...`}
          {isLong && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 font-semibold ml-1 focus:outline-none transition-colors"
            >
              {isExpanded ? "Tampilkan lebih sedikit" : "Selengkapnya"}
            </button>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-6 pb-6 flex items-center gap-3 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/50">
        {cert.fileUrl && (
          <a
            href={cert.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg"
          >
            <FileText className="w-3.5 h-3.5" /> Lihat Dokumen
          </a>
        )}
        {cert.articleUrl && (
          <a
            href={cert.articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-600 transition-colors"
          >
            Artikel <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications({ certifications = DEFAULT_CERTIFICATIONS, loading = false }: CertificationsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const activeCerts = certifications && certifications.length > 0 ? certifications : DEFAULT_CERTIFICATIONS;
  const totalPages = Math.ceil(activeCerts.length / itemsPerPage);
  
  const currentCerts = activeCerts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) {
    return (
      <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-3 animate-pulse">
            <div className="h-4 w-32 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
            <div className="h-10 w-64 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((val) => (
              <div key={val} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-4 h-64 animate-pulse">
                <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-md mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest bg-amber-50 dark:bg-amber-950/50 px-3.5 py-1 rounded-full border border-amber-100 dark:border-amber-900/30">
            Pencapaian
          </span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-4">
            Sertifikasi & Penghargaan
          </h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            Bukti komitmen saya dalam terus belajar dan mengembangkan skill di dunia teknologi.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCerts.map((cert, idx) => (
            <CertificationCardItem key={cert.id} cert={cert} idx={idx} />
          ))}
        </div>

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 flex justify-center items-center gap-4"
          >
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentPage === i + 1 
                      ? "bg-amber-500 w-6" 
                      : "bg-slate-300 dark:bg-slate-700 hover:bg-amber-400 w-2.5"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="p-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-500 hover:border-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
