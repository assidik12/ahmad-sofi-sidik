"use client";

import { Github, Linkedin, Instagram, Code2, ArrowUp, Mail, MapPin } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  {
    href: "https://github.com/assidik12",
    label: "GitHub",
    icon: Github,
    hoverClass: "hover:bg-slate-700 hover:text-white",
  },
  {
    href: "https://www.linkedin.com/in/ahmad-sofi-sidik/",
    label: "LinkedIn",
    icon: Linkedin,
    hoverClass: "hover:bg-blue-600 hover:text-white",
  },
  {
    href: "https://www.instagram.com/as.sidik_/",
    label: "Instagram",
    icon: Instagram,
    hoverClass: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400 hover:text-white hover:border-transparent",
  },
];

const quickLinks = [
  { name: "Beranda", href: "#hero" },
  { name: "Tentang Saya", href: "#about" },
  { name: "Proyek", href: "#projects" },
  { name: "Sertifikasi", href: "#certifications" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 pt-20 pb-10 px-4 sm:px-6 lg:px-8 border-t border-slate-800/50 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* Brand & Bio (Span 5 cols on desktop) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:shadow-sky-500/40 transition-all duration-300">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-quicksand font-bold text-2xl text-white tracking-tight">sidik.dev</span>
            </Link>
            <p className="text-slate-400 leading-relaxed font-inter text-sm max-w-sm">
              Membangun pengalaman digital yang responsif, estetis, dan fungsional. Selalu antusias untuk belajar dan menerapkan teknologi terbaru dalam pengembangan web.
            </p>
            <div className="flex flex-col gap-2 pt-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-sky-500" />
                <span>Brebes, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Quick Links (Span 3 cols) */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-white font-quicksand font-bold text-lg tracking-wide">Navigasi</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm font-inter text-slate-400 hover:text-sky-400 hover:pl-2 transition-all duration-300 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack (Span 4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-white font-quicksand font-bold text-lg tracking-wide">Tech Stack</h3>
            <p className="text-sm text-slate-400 font-inter mb-4">
              Dibangun dengan teknologi modern untuk performa terbaik.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Framer Motion"].map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900 text-xs font-semibold text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500 font-inter text-center sm:text-left">
            © {new Date().getFullYear()} <span className="text-slate-300 font-medium">Ahmad Sofi Sidik</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon, hoverClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 ${hoverClass}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}

            <div className="w-px h-6 bg-slate-800 mx-2" />

            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl flex items-center justify-center bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-300"
              aria-label="Kembali ke atas"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
