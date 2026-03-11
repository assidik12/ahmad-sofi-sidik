"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col"
    >
      {/* Gradient top bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradientFrom} ${project.gradientTo}`} />

      {/* Card header with emoji */}
      <div className="p-6 pb-4">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} text-2xl mb-4 shadow-md`}>{project.emoji}</div>
        <h3 className="font-quicksand text-xl font-bold text-slate-900 dark:text-slate-50 group-hover:text-sky-500 transition-colors">{project.title}</h3>
      </div>

      {/* Description */}
      <div className="px-6 pb-4 flex-1">
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{project.description}</p>
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
    </motion.div>
  );
}
