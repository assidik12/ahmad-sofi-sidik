"use client";

import { Sparkles, FileText, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface HeroProps {
  fullName?: string;
  title?: string;
  bioHero?: string;
  avatarUrl?: string | null;
  cvUrl?: string | null;
  loading?: boolean;
}

export default function Hero({
  fullName = "Ahmad Sofi Sidik",
  title = "Software Engineer / Web Developer",
  bioHero = "Crafting seamless digital experiences where elegant design meets robust engineering.",
  avatarUrl,
  cvUrl = "https://drive.google.com/file/d/1Kl4eFowMchY3KTdTM3Idiju6yoc9PIdo/view?usp=sharing",
  loading = false,
}: HeroProps) {
  const [imgError, setImgError] = useState(false);

  // Skeleton Loader for premium loading state
  if (loading) {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 -left-32 w-72 h-72 bg-sky-400/10 dark:bg-sky-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center space-y-8 animate-pulse">
          {/* Avatar Skeleton */}
          <div className="flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-slate-300/20 shadow-lg" />
          </div>

          {/* Badge Skeleton */}
          <div className="flex justify-center">
            <div className="h-9 w-52 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>

          {/* Heading Skeleton */}
          <div className="space-y-3 flex flex-col items-center">
            <div className="h-12 md:h-16 w-3/4 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-12 md:h-16 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>

          {/* Subtitle Skeleton */}
          <div className="space-y-2 flex flex-col items-center max-w-2xl mx-auto">
            <div className="h-5 w-full bg-slate-200 dark:bg-slate-800 rounded-lg" />
            <div className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-lg" />
          </div>

          {/* Buttons Skeleton */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
            <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </section>
    );
  }

  // Fallback avatar handling
  const finalAvatar = avatarUrl && !imgError ? avatarUrl : null;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">
      {/* Dynamic Ambient Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 -left-32 w-72 h-72 bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite_1s]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sky-300/10 dark:bg-sky-400/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Profile Avatar with Breathing Glowing Border and Hover Zoom */}
        <div className="flex justify-center animate-[fade-up_0.6s_ease-out_forwards] opacity-0">
          <div className="relative group cursor-pointer" style={{ perspective: '1000px' }}>
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-sky-400 to-blue-600 opacity-60 blur-lg transition duration-1000 group-hover:opacity-100 group-hover:duration-300 animate-[pulse_3s_ease-in-out_infinite]" />
            
            <div 
              className="relative w-44 h-44 md:w-56 md:h-56 rounded-full shadow-2xl transition-all duration-700 ease-out group-hover:[transform:rotateY(180deg)_scale(1.05)]"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Front Side (Main Profile Photo) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {finalAvatar ? (
                  <Image
                    src={finalAvatar}
                    alt={fullName}
                    fill
                    sizes="(max-width: 768px) 176px, 224px"
                    priority
                    className="object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-7xl select-none animate-[bounce_2s_infinite]">👨‍💻</div>
                )}
              </div>

              {/* Back Side (PNG Avatar) */}
              <div 
                className="absolute inset-0 w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-slate-900 bg-sky-50 dark:bg-sky-900/20 flex items-center justify-center"
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
              >
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Avatar Illustration"
                  fill
                  sizes="(max-width: 768px) 176px, 224px"
                  className="object-cover p-2 scale-110 drop-shadow-xl"
                />
              </div>
            </div>

            {/* Glowing Green Dot Status Badge */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/30 rounded-full px-3.5 py-1 text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap shadow-md backdrop-blur-md transition-all duration-300 group-hover:translate-y-[-2px] group-hover:shadow-emerald-500/10 group-hover:shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Coding right now
            </div>
          </div>
        </div>

        {/* Greeting Badge */}
        <div className="flex justify-center animate-[fade-up_0.6s_ease-out_0.15s_forwards] opacity-0">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/80 dark:bg-sky-900/40 text-sky-800 dark:text-sky-300 text-sm font-semibold border border-sky-200/50 dark:border-sky-800/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-sky-200/50 dark:hover:bg-sky-900/60">
            <Sparkles className="w-4 h-4 animate-spin-slow text-amber-600 dark:text-amber-500" />
            Halo, perkenalkan — saya {fullName.split(" ")[2] || fullName.split(" ")[0]}! 👋
          </span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-quicksand text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-slate-50 leading-tight tracking-tight animate-[fade-up_0.6s_ease-out_0.3s_forwards] opacity-0">
          Crafting <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-400 dark:to-blue-500">Digital</span> Experiences
          <br className="hidden sm:inline" />
          yang <span className="italic font-light text-slate-800 dark:text-slate-200">Bermakna</span> & <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Robust</span>
        </h1>

        {/* Dynamic Bio Description */}
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-inter animate-[fade-up_0.6s_ease-out_0.45s_forwards] opacity-0">
          Saya seorang <span className="font-semibold text-slate-800 dark:text-slate-200">{title}</span>. {bioHero}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-[fade-up_0.6s_ease-out_0.6s_forwards] opacity-0">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            🚀 Lihat Project
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          
          {cvUrl && (
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-semibold rounded-xl border-2 border-sky-500/20 hover:border-sky-500 text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 dark:border-sky-400/20 dark:text-slate-300 dark:hover:bg-sky-400/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FileText className="w-4 h-4 text-sky-500 dark:text-sky-400" />
              📄 Download CV
            </a>
          )}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50 hover:opacity-100 transition-opacity">
        <a href="#about" aria-label="Scroll Down">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-slate-400 dark:text-slate-500 hover:text-sky-500 dark:hover:text-sky-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}
