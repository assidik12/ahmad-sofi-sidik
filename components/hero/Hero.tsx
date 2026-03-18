"use client";

import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 overflow-hidden">
      {/* Background gradient blobs — pakai CSS saja, tidak perlu JS */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-300/10 dark:bg-sky-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6">
        {/* Greeting badge — CSS animation, bukan Framer Motion */}
        <div className="flex justify-center animate-[fade-up_0.5s_ease-out_forwards] opacity-0">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 text-sm font-semibold border border-sky-200 dark:border-sky-800">
            <Sparkles className="w-4 h-4" />
            Halo, perkenalkan — saya Sidik! 👋
          </span>
        </div>

        {/* Fix 1 (LCP): h1 TIDAK pakai motion — render langsung tanpa JS delay */}
        <h1 className="font-quicksand text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-50 leading-tight animate-[fade-up_0.5s_ease-out_0.1s_forwards] opacity-0">
          Crafting <span className="text-sky-500">Digital</span> Experiences
          <br />
          yang <span className="italic text-sky-500">Bermakna</span>
        </h1>

        {/* Subtitle — CSS animation */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-inter animate-[fade-up_0.5s_ease-out_0.2s_forwards] opacity-0">
          Saya seorang <span className="font-semibold text-slate-800 dark:text-slate-200">Software Engineer</span> yang antusias ngulik teknologi — dari ekosistem <span className="text-sky-500 font-medium">Web3</span>,{" "}
          <span className="text-sky-500 font-medium">IoT</span>, sampai <span className="text-sky-500 font-medium">Computer Vision</span>. Mahasiswa{" "}
          <span className="font-semibold text-slate-800 dark:text-slate-200">Teknologi Informasi</span> di UBSI Tegal yang suka bikin sesuatu yang bukan cuma jalan, tapi juga <em>terasa</em> bagus.
        </p>

        {/* CTA Buttons — CSS animation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 animate-[fade-up_0.5s_ease-out_0.3s_forwards] opacity-0">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-sky-500/30 hover:shadow-lg transition-all duration-200"
          >
            🚀 Lihat Project
          </a>
          <a
            href="https://drive.google.com/file/d/1Kl4eFowMchY3KTdTM3Idiju6yoc9PIdo/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold rounded-xl border-2 border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-400 dark:text-sky-400 dark:hover:bg-sky-500 dark:hover:text-white transition-all duration-200"
          >
            📄 Download CV
          </a>
        </div>
      </div>

      {/* Scroll indicator — CSS animation, pure lightweight */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
