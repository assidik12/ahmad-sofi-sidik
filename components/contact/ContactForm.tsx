"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare, User, CheckCircle2, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            message: formData.message,
          },
        ]);

      if (supabaseError) {
        throw supabaseError;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      console.error("Error submitting message:", err);
      setError("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="text-center mb-16">
          <span className="text-sky-500 font-semibold text-sm uppercase tracking-widest">Jangan Sungkan</span>
          <h2 className="font-quicksand text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-50 mt-2">Mari Ngobrol! 👋</h2>
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Punya project seru, tawaran kolaborasi, atau sekadar mau say hi? Saya selalu terbuka untuk ngobrol!</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Left side: info cards */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }} className="lg:col-span-2 space-y-4">
            {[
              {
                icon: Mail,
                title: "Email",
                desc: "sofi.sidik12@gmail.com",
                href: "mailto:sofi.sidik12@gmail.com",
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.07 }} className="lg:col-span-3">
            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 h-full gap-4">
                <CheckCircle2 className="w-16 h-16 text-sky-500" />
                <h3 className="font-quicksand text-2xl font-bold text-slate-900 dark:text-slate-50">Pesan Terkirim! 🎉</h3>
                <p className="text-slate-500 dark:text-slate-400">Makasih udah ngabarin! Saya akan segera balas pesan kamu.</p>
                <button onClick={() => setSubmitted(false)} className="mt-2 text-sm text-sky-500 hover:text-sky-600 font-medium">
                  Kirim pesan lain →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-5 shadow-sm">
                {error && <div className="p-3 text-sm text-red-500 bg-red-50 dark:bg-red-900/20 rounded-xl">{error}</div>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <User className="w-3.5 h-3.5 text-sky-500" />
                      Nama
                    </label>
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required disabled={isSubmitting} />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <Mail className="w-3.5 h-3.5 text-sky-500" />
                      Email
                    </label>
                    <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required disabled={isSubmitting} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                    Pesan
                  </label>
                  <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Halo! Saya mau ngobrol tentang..." required className="min-h-[140px]" disabled={isSubmitting} />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-sky-500 hover:bg-sky-600 text-white shadow-md hover:shadow-sky-500/30 hover:shadow-lg transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

