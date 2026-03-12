"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-300/10 dark:bg-sky-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Greeting badge */}
        <motion.div {...fadeUp(0)} className="flex justify-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 text-sm font-semibold border border-sky-200 dark:border-sky-800">
            <Sparkles className="w-4 h-4" />
            Halo, perkenalkan — saya Sidik! 👋
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1 {...fadeUp(0.1)} className="font-quicksand text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-50 leading-tight">
          Crafting <span className="text-sky-500">Digital</span> Experiences
          <br />
          yang <span className="italic text-sky-500">Bermakna</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p {...fadeUp(0.2)} className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-inter">
          Saya seorang <span className="font-semibold text-slate-800 dark:text-slate-200">Software Engineer</span> yang antusias ngulik teknologi — dari ekosistem <span className="text-sky-500 font-medium">Web3</span>,{" "}
          <span className="text-sky-500 font-medium">IoT</span>, sampai <span className="text-sky-500 font-medium">Computer Vision</span>. Mahasiswa{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">Teknologi Informasi</span> di UBSI Tegal yang suka bikin sesuatu yang bukan cuma jalan, tapi juga <em>terasa</em> bagus.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-sky-500/30 hover:shadow-lg transition-all duration-200"
          >
            🚀 Lihat Project
          </a>
          <a
            href="https://drive.google.com/file/d/1Kl4eFowMchY3KTdTM3Idiju6yoc9PIdo/view?usp=sharing"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold rounded-xl border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition-all duration-200"
          >
            📄 Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-5 h-5 text-slate-400 dark:text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
