"use client";

import { useState } from "react";
import { Github, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  gradientFrom: string;
  gradientTo: string;
  githubUrl: string;
  liveUrl?: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const isLong = project.description.length > maxLength;

  return (
    // CSS hover transition menggantikan whileHover Framer Motion
    <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-sky-500/10 hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* Gradient top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradientFrom} ${project.gradientTo}`} />

      {/* Card header with emoji */}
      <div className="p-6 pb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} text-2xl mb-4 shadow-md`}>{project.emoji}</div>
        <h3 className="font-quicksand text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-500 transition-colors">{project.title}</h3>
      </div>

      {/* Description */}
      <div className="px-6 pb-4 flex-1">
        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed inline-block">
          {isExpanded || !isLong ? project.description : `${project.description.slice(0, maxLength)}...`}
          {isLong && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 font-semibold ml-1 focus:outline-none transition-colors"
            >
              {isExpanded ? "Tampilkan lebih sedikit" : "Selengkapnya"}
            </button>
          )}
        </div>
      </div>

      {/* Tags */}
      <div className="px-6 pb-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Footer links */}
      <div className="px-6 pb-6 flex items-center gap-3">
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          <Github className="w-4 h-4" />
          Source Code
        </a>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-sky-500 hover:text-sky-600 transition-colors">
            Live Demo
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
