"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Lock, Eye, EyeOff, Save, Upload, Plus, Trash2, Edit2,
  ExternalLink, LogOut, CheckCircle, AlertCircle, Loader2, Sparkles, Folder, User, Award, MessageSquare, Mail,
  ChevronUp, ChevronDown
} from "lucide-react";
import { type Project } from "@/components/projects/ProjectCard";
import { type Certification } from "@/components/certifications/Certifications";

interface Toast {
  type: "success" | "error" | "info";
  message: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<"profile" | "projects" | "certifications" | "messages">("profile");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);

  // Profile Form States
  const [fullName, setFullName] = useState("Ahmad Sofi Sidik");
  const [title, setTitle] = useState("Software Engineer / Web Developer");
  const [bioHero, setBioHero] = useState("");
  const [bioAbout, setBioAbout] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [cvUrl, setCvUrl] = useState("");

  // Projects States
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectForm, setProjectForm] = useState({
    id: "",
    title: "",
    description: "",
    tags: "",
    emoji: "🚀",
    gradientFrom: "from-sky-500",
    gradientTo: "to-blue-600",
    githubUrl: "",
    liveUrl: "",
  });
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  // Certifications States
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [certForm, setCertForm] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    institution: "",
    fileUrl: "",
    articleUrl: "",
  });
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [showCertForm, setShowCertForm] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);

  // Messages State
  const [messages, setMessages] = useState<any[]>([]);

  // File upload state
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingCv, setUploadingCv] = useState(false);

  // Check auth on load
  useEffect(() => {
    const isAuth = sessionStorage.getItem("admin_auth") === "true";
    setIsAuthenticated(isAuth);
  }, []);

  // Fetch initial profile & projects from DB once authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    fetchProfile();
    fetchProjects();
    fetchCertifications();
    fetchMessages();
  }, [isAuthenticated]);

  // Autohide toast after 4 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    setToast({ message, type });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const correctPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_auth", "true");
      setAuthError("");
      showToast("Autentikasi berhasil! Selamat datang.", "success");
    } else {
      setAuthError("Password salah! Silakan coba lagi.");
      showToast("Autentikasi gagal.", "error");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("admin_auth");
    setPassword("");
    showToast("Berhasil logout.", "info");
  };

  // Database actions
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profile")
        .select("*")
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setFullName(data.full_name || "Ahmad Sofi Sidik");
        setTitle(data.title || "Software Engineer / Web Developer");
        setBioHero(data.bio_hero || "");
        setBioAbout(data.bio_about || "");
        setAvatarUrl(data.avatar_url || "");
        setCvUrl(data.cv_url || "");
      }
    } catch (err: any) {
      showToast(`Gagal memuat profil: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true });

      if (error) throw error;

      if (data) {
        const mapped: Project[] = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          description: p.description,
          tags: p.tags || [],
          emoji: p.emoji || "🚀",
          gradientFrom: p.gradient_from || "from-sky-500",
          gradientTo: p.gradient_to || "to-blue-600",
          githubUrl: p.github_url || "",
          liveUrl: p.live_url || undefined,
          sortOrder: p.sort_order || 0,
        }));
        setProjects(mapped);
      }
    } catch (err: any) {
      showToast(`Gagal memuat proyek: ${err.message}`, "error");
    }
  };

  const fetchCertifications = async () => {
    try {
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("id", { ascending: true });

      if (error) throw error;

      if (data) {
        setCertifications(data.map((c: any) => ({
          id: c.id,
          name: c.name,
          description: c.description,
          date: c.date,
          institution: c.institution,
          fileUrl: c.file_url || "",
          articleUrl: c.article_url || "",
          sortOrder: c.sort_order || 0,
        })));
      }
    } catch (err: any) {
      showToast(`Gagal memuat sertifikasi: ${err.message}`, "error");
    }
  };
  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      if (data) setMessages(data);
    } catch (err: any) {
      showToast(`Gagal memuat pesan: ${err.message}`, "error");
    }
  };

  const deleteMessage = async (id: number) => {
    if (!confirm("Hapus pesan ini?")) return;
    try {
      setLoading(true);
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
      showToast("Pesan dihapus!", "success");
      fetchMessages();
    } catch (err: any) {
      showToast(`Gagal menghapus pesan: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Check if table contains rows
      const { data: existingRows } = await supabase.from("profile").select("id").limit(1);

      let result;
      if (existingRows && existingRows.length > 0) {
        // Update existing row
        const rowId = existingRows[0].id;
        result = await supabase
          .from("profile")
          .update({
            full_name: fullName,
            title: title,
            bio_hero: bioHero,
            bio_about: bioAbout,
            avatar_url: avatarUrl,
            cv_url: cvUrl,
            updated_at: new Date().toISOString(),
          })
          .eq("id", rowId);
      } else {
        // Insert new row
        result = await supabase
          .from("profile")
          .insert({
            full_name: fullName,
            title: title,
            bio_hero: bioHero,
            bio_about: bioAbout,
            avatar_url: avatarUrl,
            cv_url: cvUrl,
          });
      }

      if (result.error) throw result.error;
      showToast("Profil berhasil diperbarui!", "success");
    } catch (err: any) {
      showToast(`Gagal memperbarui profil: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  // Upload file helper
  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>, type: "avatar" | "cv" | "cert") => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isAvatar = type === "avatar";
    const isCert = type === "cert";
    const setUploading = isCert ? setUploadingCert : (isAvatar ? setUploadingAvatar : setUploadingCv);
    const folder = isCert ? "certifications" : (isAvatar ? "avatars" : "cv");
    const allowedTypes = isAvatar 
      ? ["image/jpeg", "image/png", "image/webp", "image/gif"] 
      : ["application/pdf"];

    if (!allowedTypes.includes(file.type)) {
      showToast(isAvatar ? "Format file harus berupa gambar (JPG, PNG, WEBP)!" : "Format file harus berupa PDF!", "error");
      return;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload file directly to Supabase storage bucket
      const { error: uploadError } = await supabase.storage
        .from("portfolio-assets")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      // Get Public URL
      const { data } = supabase.storage
        .from("portfolio-assets")
        .getPublicUrl(filePath);

      if (isCert) {
        setCertForm({ ...certForm, fileUrl: data.publicUrl });
        showToast("File sertifikasi berhasil diunggah!", "success");
      } else if (isAvatar) {
        setAvatarUrl(data.publicUrl);
        showToast("Foto profil berhasil diunggah!", "success");
      } else {
        setCvUrl(data.publicUrl);
        showToast("Dokumen CV berhasil diunggah!", "success");
      }
    } catch (err: any) {
      showToast(`Gagal mengunggah file: ${err.message}. Pastikan bucket 'portfolio-assets' telah dibuat di Supabase Storage!`, "error");
    } finally {
      setUploading(false);
    }
  };

  // Projects handlers
  const saveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const parsedTags = projectForm.tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const dbPayload = {
        title: projectForm.title,
        description: projectForm.description,
        tags: parsedTags,
        emoji: projectForm.emoji,
        gradient_from: projectForm.gradientFrom,
        gradient_to: projectForm.gradientTo,
        github_url: projectForm.githubUrl,
        live_url: projectForm.liveUrl || null,
      };

      let error;
      if (isEditingProject && projectForm.id) {
        // Update
        const result = await supabase
          .from("projects")
          .update(dbPayload)
          .eq("id", projectForm.id);
        error = result.error;
      } else {
        // Insert
        const result = await supabase
          .from("projects")
          .insert(dbPayload);
        error = result.error;
      }

      if (error) throw error;

      showToast(isEditingProject ? "Proyek berhasil diupdate!" : "Proyek baru ditambahkan!", "success");
      setShowProjectForm(false);
      setIsEditingProject(false);
      resetProjectForm();
      fetchProjects();
    } catch (err: any) {
      showToast(`Gagal menyimpan proyek: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus proyek ini?")) return;

    try {
      setLoading(true);
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id);

      if (error) throw error;

      showToast("Proyek berhasil dihapus!", "success");
      fetchProjects();
    } catch (err: any) {
      showToast(`Gagal menghapus proyek: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditProjectClick = (proj: Project) => {
    setProjectForm({
      id: proj.id.toString(),
      title: proj.title,
      description: proj.description,
      tags: proj.tags.join(", "),
      emoji: proj.emoji,
      gradientFrom: proj.gradientFrom,
      gradientTo: proj.gradientTo,
      githubUrl: proj.githubUrl,
      liveUrl: proj.liveUrl || "",
    });
    setIsEditingProject(true);
    setShowProjectForm(true);
  };

  const moveOrder = async (table: "projects" | "certifications", index: number, direction: "up" | "down") => {
    const list = table === "projects" ? projects : certifications;
    if ((direction === "up" && index === 0) || (direction === "down" && index === list.length - 1)) return;

    const swapIndex = direction === "up" ? index - 1 : index + 1;
    const currentItem = list[index];
    const swapItem = list[swapIndex];

    try {
      setLoading(true);
      
      const currentOrder = currentItem.sortOrder || index;
      const swapOrder = swapItem.sortOrder || swapIndex;

      await Promise.all([
        supabase.from(table).update({ sort_order: swapOrder }).eq("id", currentItem.id),
        supabase.from(table).update({ sort_order: currentOrder }).eq("id", swapItem.id)
      ]);
      
      if (table === "projects") fetchProjects();
      else fetchCertifications();
    } catch (err: any) {
      showToast(`Gagal memindahkan urutan: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      id: "",
      title: "",
      description: "",
      tags: "",
      emoji: "🚀",
      gradientFrom: "from-sky-500",
      gradientTo: "to-blue-600",
      githubUrl: "",
      liveUrl: "",
    });
    setIsEditingProject(false);
  };

  // Certifications handlers
  const saveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const dbPayload = {
        name: certForm.name,
        description: certForm.description,
        date: certForm.date,
        institution: certForm.institution,
        file_url: certForm.fileUrl || null,
        article_url: certForm.articleUrl || null,
      };

      let error;
      if (isEditingCert && certForm.id) {
        const result = await supabase.from("certifications").update(dbPayload).eq("id", certForm.id);
        error = result.error;
      } else {
        const result = await supabase.from("certifications").insert(dbPayload);
        error = result.error;
      }

      if (error) throw error;

      showToast(isEditingCert ? "Sertifikasi diupdate!" : "Sertifikasi ditambahkan!", "success");
      setShowCertForm(false);
      setIsEditingCert(false);
      resetCertForm();
      fetchCertifications();
    } catch (err: any) {
      showToast(`Gagal menyimpan sertifikasi: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const deleteCert = async (id: number) => {
    if (!confirm("Hapus sertifikasi ini?")) return;
    try {
      setLoading(true);
      const { error } = await supabase.from("certifications").delete().eq("id", id);
      if (error) throw error;
      showToast("Sertifikasi dihapus!", "success");
      fetchCertifications();
    } catch (err: any) {
      showToast(`Gagal menghapus sertifikasi: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCertClick = (c: Certification) => {
    setCertForm({
      id: c.id.toString(),
      name: c.name,
      description: c.description,
      date: c.date,
      institution: c.institution,
      fileUrl: c.fileUrl || "",
      articleUrl: c.articleUrl || "",
    });
    setIsEditingCert(true);
    setShowCertForm(true);
  };

  const resetCertForm = () => {
    setCertForm({ id: "", name: "", description: "", date: "", institution: "", fileUrl: "", articleUrl: "" });
    setIsEditingCert(false);
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/3 -left-32 w-72 h-72 bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-500 mb-2">
              <Lock className="w-7 h-7 animate-pulse" />
            </div>
            <h1 className="font-quicksand text-3xl font-bold text-slate-900 dark:text-slate-50">Admin Panel</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Masukkan password untuk mengelola portfolio Anda.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Password Dashboard</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password..."
                  required
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {authError && <p className="text-xs font-semibold text-rose-500 mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all"
            >
              Buka Kunci Panel 🔓
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 pb-20 relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-[fade-up_0.3s_ease-out_forwards] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 max-w-sm">
          {toast.type === "success" ? (
            <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 animate-[bounce_1s_infinite]" />
          ) : toast.type === "error" ? (
            <AlertCircle className="w-6 h-6 text-rose-500 flex-shrink-0" />
          ) : (
            <Sparkles className="w-6 h-6 text-sky-500 flex-shrink-0 animate-spin-slow" />
          )}
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug">{toast.message}</p>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-900/50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="font-quicksand text-lg font-bold">Ahmad Sidik</h2>
            <p className="text-xs font-semibold text-sky-500">Dashboard Kontrol Portfolio</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            Lihat Portfolio <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-rose-500/10 hover:text-rose-500 dark:hover:bg-rose-500/15 transition-all text-xs font-bold"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Dashboard container */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all ${
              activeTab === "profile"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <User className="w-4 h-4" /> Profil & Biodata
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all ${
              activeTab === "projects"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Folder className="w-4 h-4" /> Kelola Proyek
          </button>
          <button
            onClick={() => setActiveTab("certifications")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all ${
              activeTab === "certifications"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <Award className="w-4 h-4" /> Sertifikasi
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 font-bold text-sm transition-all ${
              activeTab === "messages"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}
          >
            <MessageSquare className="w-4 h-4" /> Pesan Masuk
            {messages.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-sky-500 text-white text-[10px]">
                {messages.length}
              </span>
            )}
          </button>
        </div>

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <form onSubmit={saveProfile} className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-quicksand text-xl font-bold flex items-center gap-2 text-sky-500">
                👤 Edit Biografi Utama
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Nama Lengkap</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Pekerjaan / Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Hero Catchphrase (Short Catchy Bio)</label>
                <input
                  type="text"
                  value={bioHero}
                  onChange={(e) => setBioHero(e.target.value)}
                  placeholder="Contoh: Crafting seamless digital experiences where elegant design meets robust engineering."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Tentang Saya (Long Narrative)</label>
                <textarea
                  value={bioAbout}
                  onChange={(e) => setBioAbout(e.target.value)}
                  rows={6}
                  placeholder="Gunakan pemisah baris untuk paragraf baru..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all font-inter leading-relaxed"
                />
              </div>
            </div>

            {/* ASSET UPLOADER SECTION */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm space-y-6">
              <h3 className="font-quicksand text-xl font-bold flex items-center gap-2 text-sky-500">
                📁 Berkas & Foto Profil
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Avatar Uploader */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Foto Profil (Avatar)</label>
                    <div className="flex items-center gap-4">
                      {/* Avatar preview */}
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-850 flex-shrink-0 border border-slate-200 dark:border-slate-800 flex items-center justify-center">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl select-none">👨‍💻</span>
                        )}
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          id="avatar-file"
                          onChange={(e) => uploadFile(e, "avatar")}
                          className="hidden"
                          disabled={uploadingAvatar}
                        />
                        <label
                          htmlFor="avatar-file"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-sky-500 text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-950 transition-all font-semibold text-sm"
                        >
                          {uploadingAvatar ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                              Mengunggah...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 text-slate-400" />
                              Pilih Foto Profil
                            </>
                          )}
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Avatar URL Alternatif (Input Manual)</label>
                    <input
                      type="text"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      placeholder="Masukkan URL eksternal gambar..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-xs"
                    />
                  </div>
                </div>

                {/* CV Uploader */}
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Dokumen CV (PDF)</label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf"
                        id="cv-file"
                        onChange={(e) => uploadFile(e, "cv")}
                        className="hidden"
                        disabled={uploadingCv}
                      />
                      <label
                        htmlFor="cv-file"
                        className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-sky-500 text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-950 transition-all font-semibold text-sm"
                      >
                        {uploadingCv ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-sky-500" />
                            Mengunggah...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4 text-slate-400" />
                            Pilih Dokumen CV (PDF)
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">CV URL Alternatif (Input Manual)</label>
                    <input
                      type="text"
                      value={cvUrl}
                      onChange={(e) => setCvUrl(e.target.value)}
                      placeholder="Masukkan URL dokumen PDF..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35 transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" /> Simpan Semua Perubahan
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            {/* Create Project Button */}
            {!showProjectForm && (
              <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm">
                <div>
                  <h3 className="font-quicksand font-bold text-lg">Daftar Proyek Portfolio</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Koleksi proyek terpilih yang ditampilkan di halaman utama.</p>
                </div>
                <button
                  onClick={() => {
                    resetProjectForm();
                    setShowProjectForm(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-md hover:shadow-sky-500/20 transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" /> Proyek Baru
                </button>
              </div>
            )}

            {/* Project Form Container */}
            {showProjectForm && (
              <form onSubmit={saveProject} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="font-quicksand text-xl font-bold flex items-center gap-2 text-sky-500">
                  📂 {isEditingProject ? "Edit Proyek" : "Buat Proyek Baru"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Nama Proyek</label>
                    <input
                      type="text"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      required
                      placeholder="Contoh: GO_comerce"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Emoji Proyek</label>
                    <input
                      type="text"
                      value={projectForm.emoji}
                      onChange={(e) => setProjectForm({ ...projectForm, emoji: e.target.value })}
                      required
                      placeholder="Contoh: 🛒"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Deskripsi Proyek</label>
                  <textarea
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    required
                    rows={3}
                    placeholder="Tulis ringkasan mengenai proyek..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">GitHub Link Source Code</label>
                    <input
                      type="url"
                      value={projectForm.githubUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, githubUrl: e.target.value })}
                      required
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Live Demo Link (Opsional)</label>
                    <input
                      type="url"
                      value={projectForm.liveUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Teknologi / Tag (Pisahkan dengan koma)</label>
                  <input
                    type="text"
                    value={projectForm.tags}
                    onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                    required
                    placeholder="Golang, PostgreSQL, REST API, Docker"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 dark:bg-slate-950/50 p-4 rounded-xl border border-slate-200/50 dark:border-slate-900/50">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Warna Gradien Mulai (Tailwind class)</label>
                    <input
                      type="text"
                      value={projectForm.gradientFrom}
                      onChange={(e) => setProjectForm({ ...projectForm, gradientFrom: e.target.value })}
                      required
                      placeholder="from-sky-500"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:border-sky-500 outline-none text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Warna Gradien Berakhir (Tailwind class)</label>
                    <input
                      type="text"
                      value={projectForm.gradientTo}
                      onChange={(e) => setProjectForm({ ...projectForm, gradientTo: e.target.value })}
                      required
                      placeholder="to-cyan-400"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:border-sky-500 outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      resetProjectForm();
                      setShowProjectForm(false);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-950 text-sm font-bold transition-all"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold shadow-md transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" /> Simpan Proyek
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Projects Grid List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm flex items-start gap-4 hover:shadow-md transition-all"
                >
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-2xl bg-gradient-to-br ${proj.gradientFrom} ${proj.gradientTo} text-white shadow-md`}>
                    {proj.emoji}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-quicksand font-bold text-base truncate">{proj.title}</h4>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveOrder("projects", projects.indexOf(proj), "up")}
                          disabled={projects.indexOf(proj) === 0}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-500/10 transition-colors disabled:opacity-30"
                          title="Pindah ke Atas"
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveOrder("projects", projects.indexOf(proj), "down")}
                          disabled={projects.indexOf(proj) === projects.length - 1}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-500/10 transition-colors disabled:opacity-30"
                          title="Pindah ke Bawah"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditProjectClick(proj)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-sky-500 hover:bg-sky-500/10 transition-colors"
                          title="Edit Proyek"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteProject(proj.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Hapus Proyek"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 font-inter">{proj.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {proj.tags.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 text-[10px] font-semibold uppercase">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <div className="col-span-2 py-16 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
                  <Folder className="w-12 h-12 mx-auto stroke-1" />
                  <p className="font-semibold text-sm">Belum ada proyek ditambahkan.</p>
                  <p className="text-xs">Klik 'Proyek Baru' untuk mulai menambahkan proyek!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CERTIFICATIONS TAB */}
        {activeTab === "certifications" && (
          <div className="space-y-6">
            {!showCertForm && (
              <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm">
                <div>
                  <h3 className="font-quicksand font-bold text-lg">Daftar Sertifikasi & Penghargaan</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500">Koleksi sertifikasi yang ditampilkan di halaman utama.</p>
                </div>
                <button
                  onClick={() => {
                    resetCertForm();
                    setShowCertForm(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold shadow-md transition-all hover:scale-105"
                >
                  <Plus className="w-4 h-4" /> Tambah Data
                </button>
              </div>
            )}

            {showCertForm && (
              <form onSubmit={saveCert} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-6 shadow-sm space-y-6">
                <h3 className="font-quicksand text-xl font-bold flex items-center gap-2 text-amber-500">
                  <Award className="w-5 h-5" /> {isEditingCert ? "Edit Sertifikasi" : "Tambah Sertifikasi"}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Nama Sertifikasi / Penghargaan</label>
                    <input
                      type="text"
                      value={certForm.name}
                      onChange={(e) => setCertForm({ ...certForm, name: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Tanggal (Bulan/Tahun)</label>
                    <input
                      type="text"
                      value={certForm.date}
                      onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                      required
                      placeholder="Contoh: 2024-05"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Nama Instansi</label>
                  <input
                    type="text"
                    value={certForm.institution}
                    onChange={(e) => setCertForm({ ...certForm, institution: e.target.value })}
                    required
                    placeholder="Contoh: Amazon Web Services"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Deskripsi</label>
                  <textarea
                    value={certForm.description}
                    onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 text-slate-900 dark:text-slate-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-slate-200/50 dark:border-slate-800/50 p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-950/50">
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Unggah File (PDF/Gambar)</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          id="cert-file"
                          onChange={(e) => uploadFile(e, "cert")}
                          className="hidden"
                          disabled={uploadingCert}
                        />
                        <label
                          htmlFor="cert-file"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-amber-500 text-slate-500 cursor-pointer transition-all font-semibold text-sm"
                        >
                          {uploadingCert ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengunggah...</> : <><Upload className="w-4 h-4" /> Pilih File Sertifikat</>}
                        </label>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Atau URL Eksternal</label>
                      <input
                        type="text"
                        value={certForm.fileUrl}
                        onChange={(e) => setCertForm({ ...certForm, fileUrl: e.target.value })}
                        placeholder="https://..."
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs outline-none focus:border-amber-500 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Link Artikel (Opsional)</label>
                    <input
                      type="url"
                      value={certForm.articleUrl}
                      onChange={(e) => setCertForm({ ...certForm, articleUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-4 justify-end">
                  <button type="button" onClick={() => { resetCertForm(); setShowCertForm(false); }} className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 font-bold transition-all text-sm">Batal</button>
                  <button type="submit" disabled={loading} className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold transition-all disabled:opacity-50 text-sm">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Simpan
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-amber-500 bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-quicksand font-bold text-base truncate">{cert.name}</h4>
                      <div className="flex items-center gap-1">
                        <button onClick={() => moveOrder("certifications", certifications.indexOf(cert), "up")} disabled={certifications.indexOf(cert) === 0} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors disabled:opacity-30" title="Pindah ke Atas"><ChevronUp className="w-3.5 h-3.5" /></button>
                        <button onClick={() => moveOrder("certifications", certifications.indexOf(cert), "down")} disabled={certifications.indexOf(cert) === certifications.length - 1} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors disabled:opacity-30" title="Pindah ke Bawah"><ChevronDown className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleEditCertClick(cert)} className="p-1.5 rounded-lg text-slate-400 hover:text-amber-500 hover:bg-amber-500/10 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => deleteCert(cert.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">{cert.institution} • {cert.date}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-2">{cert.description}</p>
                  </div>
                </div>
              ))}
              {certifications.length === 0 && (
                <div className="col-span-2 py-16 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
                  <Award className="w-12 h-12 mx-auto stroke-1" />
                  <p className="font-semibold text-sm">Belum ada sertifikasi ditambahkan.</p>
                </div>
              )}
            </div>
          </div>
        )}
        {/* MESSAGES TAB */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm">
              <div>
                <h3 className="font-quicksand font-bold text-lg">Pesan Masuk (Contact Form)</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">Kumpulan pesan yang dikirim melalui form kontak.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/50 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-sky-500 bg-sky-50 dark:bg-sky-500/10 border border-sky-100 dark:border-sky-500/20">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col">
                        <h4 className="font-quicksand font-bold text-base truncate">{msg.name}</h4>
                        <a href={`mailto:${msg.email}`} className="text-xs font-semibold text-sky-500 dark:text-sky-400 mt-0.5 truncate flex items-center gap-1"><Mail className="w-3 h-3" /> {msg.email}</a>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => deleteMessage(msg.id)} className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors" title="Hapus Pesan"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-slate-400 mt-2">{new Date(msg.created_at).toLocaleString('id-ID')}</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 whitespace-pre-wrap bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800">{msg.message}</p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="py-16 text-center text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
                  <MessageSquare className="w-12 h-12 mx-auto stroke-1" />
                  <p className="font-semibold text-sm">Belum ada pesan masuk.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
