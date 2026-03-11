"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, User, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Tambahkan logika pengiriman email di sini (e.g. Resend, EmailJS, Server Action)
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Jangan Sungkan</span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-2">Mari Ngobrol! 👋</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Punya project seru, tawaran kolaborasi, atau sekadar mau say hi? Saya selalu terbuka untuk ngobrol!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left side: info cards */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Mail,
                title: "Email",
                desc: "hello@example.com",
                href: "mailto:hello@example.com",
              },
              {
                icon: MessageSquare,
                title: "Diskusi Santai",
                desc: "Mau ngobrol soal tech, ide project, atau kolaborasi? Yuk chat!",
                href: "#",
              },
            ].map(({ icon: Icon, title, desc, href }) => (
              <a
                key={title}
                href={href}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all duration-200 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-900/30 flex items-center justify-center group-hover:bg-sky-100 dark:group-hover:bg-sky-900/50 transition-colors">
                  <Icon className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{title}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{desc}</p>
                </div>
              </a>
            ))}

            <div className="p-5 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white">
              <p className="font-quicksand font-bold text-lg mb-1">Respon Cepat ⚡</p>
              <p className="text-sky-100 text-sm">Biasanya saya balas dalam 1×24 jam. Kalau urgent, DM saja ya!</p>
            </div>
          </motion.div>

          {/* Right side: form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }} className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 h-full gap-4"
              >
                <CheckCircle2 className="w-16 h-16 text-sky-500" />
                <h3 className="font-quicksand text-2xl font-bold text-slate-900 dark:text-slate-50">Pesan Terkirim! 🎉</h3>
                <p className="text-slate-500 dark:text-slate-400">Makasih udah ngabarin! Saya akan segera balas pesan kamu.</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-sm text-sky-500 hover:text-sky-600 font-medium">
                  Kirim pesan lain →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-5 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <User className="w-3.5 h-3.5 text-sky-500" />
                      Nama
                    </label>
                    <Input type="text" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-sky-500" />
                      Email
                    </label>
                    <Input type="email" placeholder="john@example.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                    Pesan
                  </label>
                  <Textarea placeholder="Halo! Saya mau ngobrol tentang..." required className="min-h-[140px]" />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-sky-500/30 hover:shadow-lg transition-all duration-200"
                >
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
