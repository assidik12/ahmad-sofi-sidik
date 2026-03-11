import { Github, Linkedin, Heart, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 text-slate-300">
            <Code2 className="w-5 h-5 text-sky-500" />
            <span className="font-quicksand font-bold text-white">sidik.dev</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-center">
            Dibuat oleh <span className="text-slate-200 font-medium">Ahmad Sofi Sidik</span> © {new Date().getFullYear()}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800 hover:bg-sky-500 text-slate-400 hover:text-white transition-all duration-200"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-800 hover:bg-sky-500 text-slate-400 hover:text-white transition-all duration-200"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
