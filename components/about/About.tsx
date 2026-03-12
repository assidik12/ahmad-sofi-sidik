"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Github, Linkedin, MapPin, Coffee, GraduationCap, Book } from "lucide-react";
import Image from "next/image";

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

export default function About() {
  const [imgError, setImgError] = useState(false);
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Kenalan Dulu</span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-2">Tentang Saya</h2>{" "}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image Placeholder */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80">
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-sky-400 to-blue-600 rotate-6 opacity-30" />
              {/* Main gradient box */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-sky-500/30 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]" />
                {imgError ? (
                  <span className="text-7xl select-none">👨‍💻</span>
                ) : (
                  <Image
                    src="/placeholder-profile.png"
                    alt="Foto Profil Ahmad Sofi Sidik"
                    fill
                    className="rounded-3xl object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => setImgError(true)}
                    priority
                  />
                )}
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl px-4 py-2 shadow-lg border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Open to Work</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="space-y-5">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
              <MapPin className="w-4 h-4 text-sky-500" />
              <span>Tegal, Jawa Tengah 🇮🇩</span>
            </div>

            <div>
              <h3 className="font-quicksand text-2xl font-bold text-slate-900 dark:text-slate-50">Ahmad Sofi Sidik</h3>
              <p className="text-sky-500 font-medium text-sm mt-0.5">Software Engineer · Web3 · IoT · Computer Vision</p>
            </div>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
              Hai! Panggil saya <span className="font-semibold text-slate-900 dark:text-slate-100">Sidik</span>. Saya mahasiswa <span className="font-semibold text-slate-900 dark:text-slate-100">Teknologi Informasi</span> di{" "}
              <span className="font-semibold text-slate-900 dark:text-slate-100">Universitas Bina Sarana Informatika (UBSI) Kota Tegal</span> yang juga aktif mengembangkan diri sebagai Software Engineer. Buat saya, ngoding bukan sekadar
              kerjaan — itu cara saya berekspresi dan memecahkan masalah nyata.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
              Saya suka banget ngulik hal-hal yang biasanya dianggap ribet: dari ekosistem <span className="text-sky-500 font-medium">Web3 & Blockchain</span>, nyambungin perangkat fisik lewat{" "}
              <span className="text-sky-500 font-medium">IoT</span>, sampai nge-eksperimen dengan <span className="text-sky-500 font-medium">Computer Vision</span> buat hal-hal yang impactful.
            </p>

            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
              Kalau lagi ga di depan laptop, biasanya saya lagi nyeduh kopi ☕ sambil baca artikel tech, atau ngutak-atik project sampingan yang entah kapan selesainya. 😄
            </p>

            {/* Education Card */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/50">
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-sky-500" />
              </div>
              <div>
                <p className="text-xs font-semibold text-sky-500 uppercase tracking-wide mb-0.5">Pendidikan</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Universitas Bina Sarana Informatika</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Teknologi Informasi · Kota Tegal</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-3">Temukan saya di:</p>
              <div className="flex gap-3">
                {socialLinks.map(({ href, label, icon: Icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium transition-all duration-200 ${color}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
