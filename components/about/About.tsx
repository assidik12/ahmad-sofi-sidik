"use client";

import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, MapPin, GraduationCap, Book } from "lucide-react";

interface AboutProps {
  fullName?: string;
  title?: string;
  bioAbout?: string;
  avatarUrl?: string | null;
  cvUrl?: string | null;
  loading?: boolean;
}

const socialLinks = [
  {
    href: "https://github.com/assidik12",
    label: "GitHub",
    icon: Github,
    color: "hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700",
  },
  {
    href: "https://www.linkedin.com/in/ahmad-sofi-sidik/",
    label: "LinkedIn",
    icon: Linkedin,
    color: "hover:bg-blue-600 hover:text-white",
  },
  {
    href: "https://www.instagram.com/as.sidik_/",
    label: "Instagram",
    icon: Instagram,
    color: "hover:bg-pink-500 hover:text-white",
  },
  {
    href: "https://medium.com/@sofi.sidik12",
    label: "Blog",
    icon: Book,
    color: "hover:bg-purple-500 hover:text-white",
  },
];

const DEFAULT_BIO = `Halo! Kenalin gue Sidik, IT student di UBSI Tegal yang part-time jadi Software Engineer. TBH, buat gue ngoding tuh bukan cuma sekadar ngetik syntax doang, tapi lebih ke cara gue nge-solve masalah di real life sambil ngekspresiin diri. It's giving ✨problem solver✨ energy, you know?

Gue suka banget nge-deep dive ke hal-hal yang agak mind-blowing: mulai dari Web3 & Blockchain, nyambungin physical devices pake IoT, sampe nge-explore Computer Vision buat bikin sesuatu yang beneran impactful. Agak nerd sih, but lowkey seru abis! 🚀

Kalo lagi chill & touch grass (alias nggak di depan laptop), lo bakal nemuin gue lagi nyeduh kopi ☕ sambil scrolling tech updates, atau ngerjain side project yang literally nggak tau kapan kelarnya. No cap! 😄`;

export default function About({
  fullName = "Ahmad Sofi Sidik",
  title = "Software Engineer · Web3 · IoT · Computer Vision",
  bioAbout = DEFAULT_BIO,
  loading = false,
}: AboutProps) {
  // Parse narrative into paragraphs
  const paragraphs = bioAbout ? bioAbout.split(/\n+/) : [];

  if (loading) {
    return (
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-16 space-y-3 animate-pulse">
            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto" />
            <div className="h-10 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl mx-auto" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-6 animate-pulse max-w-3xl mx-auto">
            <div className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="space-y-2">
              <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              <div className="h-4 w-72 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="space-y-3">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
              <div className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            </div>
            <div className="h-16 w-full bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest bg-sky-50 dark:bg-sky-950/50 px-3.5 py-1 rounded-full border border-sky-100 dark:border-sky-900/30">
            Kenalan Dulu
          </span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-4">
            Tentang Saya
          </h2>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="space-y-8 max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <MapPin className="w-4 h-4 text-sky-500" />
            <span className="font-medium">Brebes, Jawa Tengah 🇮🇩</span>
          </div>

          <div>
            <h3 className="font-quicksand text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              {fullName}
            </h3>
            <p className="text-sky-500 dark:text-sky-400 font-semibold text-sm mt-1 uppercase tracking-wide">
              {title}
            </p>
          </div>

          {/* Rich Narrative Paragraphs */}
          <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {/* Education Card */}
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-900/10 border border-sky-100/50 dark:border-sky-900/30 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-100 dark:bg-sky-950 flex items-center justify-center border border-sky-200/30 dark:border-sky-900/30">
              <GraduationCap className="w-5.5 h-5.5 text-sky-500 dark:text-sky-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-sky-500 dark:text-sky-400 uppercase tracking-wider mb-0.5">
                Pendidikan
              </p>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Universitas Bina Sarana Informatika
              </p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Teknologi Informasi · Kota Tegal
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="pt-2">
            <p className="text-sm font-bold text-slate-400 dark:text-slate-500 mb-3 uppercase tracking-wider">
              Temukan saya di:
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon: Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm ${color}`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
