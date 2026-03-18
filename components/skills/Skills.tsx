"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend",
    emoji: "🎨",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    category: "Backend",
    emoji: "⚙️",
    skills: ["Golang", "Node.js", "Laravel", "MySQL", "PostgreSQL", "Redis", "Docker", "Kafka"],
  },
  {
    category: "Emerging Tech",
    emoji: "🚀",
    skills: ["Web3 / Blockchain", "Smart Contracts", "IoT", "Computer Vision", "Python"],
  },
  {
    category: "Tools & Lainnya",
    emoji: "🛠️",
    skills: ["Git & GitHub", "Figma", "Linux", "CI/CD", "Agile/Scrum"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="text-center mb-16">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Yang Saya Bisa</span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-2">Tech Stack</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Teknologi dan tools yang saya gunakan sehari-hari untuk membangun produk digital.</p>
        </motion.div>

        {/* Fix 3: Skills Grid — hapus nested stagger (motion.ul + motion.li),
            ganti dengan single motion.div per card saja agar lebih ringan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // Kurangi durasi dan delay — lebih snappy
              transition={{ duration: 0.35, delay: groupIdx * 0.07 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{group.emoji}</span>
                <h3 className="font-quicksand font-bold text-slate-900 dark:text-slate-50">{group.category}</h3>
              </div>
              {/* Plain ul — tidak pakai motion untuk kurangi JS overhead */}
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li key={skill}>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold bg-sky-50 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300 border border-sky-100 dark:border-sky-800/50 hover:bg-sky-100 dark:hover:bg-sky-900/50 transition-colors cursor-default">
                      {skill}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
