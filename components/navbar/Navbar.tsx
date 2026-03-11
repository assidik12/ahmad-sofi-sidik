"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#about", label: "Tentang" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Proyek" },
  { href: "#contact", label: "Kontak" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm" : "bg-transparent")}>
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-quicksand font-bold text-xl text-slate-900 dark:text-slate-50 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
          <Code2 className="w-6 h-6 text-sky-500" />
          <span>sidik.dev</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-all duration-200 shadow-md hover:shadow-sky-500/30">
            Mari Ngobrol
          </a>

          {/* Mobile menu button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300" aria-label="Toggle menu">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-sky-500 py-2 transition-colors">
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)} className="mt-2 text-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white transition-colors">
                Mari Ngobrol
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
