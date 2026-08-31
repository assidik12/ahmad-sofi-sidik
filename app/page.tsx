// ISR: re-fetch dari Supabase setiap 60 detik di production
export const revalidate = 30;

import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills, { type SkillGroup } from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import Certifications, { type Certification } from "@/components/certifications/Certifications";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/footer/Footer";
import Clients, { type Client } from "@/components/client/client";
import { createClient } from "@supabase/supabase-js";
import { type Project } from "@/components/projects/ProjectCard";

interface ProfileData {
  full_name: string;
  title: string;
  bio_hero: string;
  bio_about: string;
  avatar_url: string | null;
  cv_url: string | null;
}

// Server-side Supabase client (uses NEXT_PUBLIC_ keys — anon key is safe to use server-side too)
function createServerSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project-id.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key-to-pass-nextjs-build-checks";
  return createClient(supabaseUrl, supabaseAnonKey);
}

export default async function Home() {
  const supabase = createServerSupabase();

  // --- Fetch all data in parallel on the server ---
  const [profileResult, projectsResult, certsResult, skillsResult, clientsResult] = await Promise.allSettled([
    supabase.from("profile").select("full_name, title, bio_hero, bio_about, avatar_url, cv_url").limit(1).maybeSingle(),
    supabase.from("projects").select("id, title, description, tags, emoji, gradient_from, gradient_to, github_url, live_url, sort_order").order("sort_order", { ascending: true }).order("id", { ascending: true }),
    supabase.from("certifications").select("*").order("sort_order", { ascending: true }).order("id", { ascending: true }),
    supabase.from("skill_groups").select("*").order("sort_order", { ascending: true }).order("id", { ascending: true }),
    supabase.from("clients").select("*").eq("is_active", true).order("order_index", { ascending: true }).order("created_at", { ascending: false }),
  ]);

  // --- Parse profile ---
  const profile: ProfileData | null = profileResult.status === "fulfilled" && profileResult.value.data ? (profileResult.value.data as ProfileData) : null;

  // --- Parse projects ---
  let projects: Project[] = [];
  if (projectsResult.status === "fulfilled" && projectsResult.value.data) {
    projects = projectsResult.value.data.map((proj: any) => ({
      id: proj.id,
      title: proj.title,
      description: proj.description,
      tags: proj.tags || [],
      emoji: proj.emoji || "🚀",
      gradientFrom: proj.gradient_from || "from-sky-500",
      gradientTo: proj.gradient_to || "to-blue-600",
      githubUrl: proj.github_url || "",
      liveUrl: proj.live_url || undefined,
    }));
  }

  // --- Parse certifications ---
  let certifications: Certification[] = [];
  if (certsResult.status === "fulfilled" && certsResult.value.data) {
    certifications = certsResult.value.data.map((c: any) => ({
      id: c.id,
      name: c.name,
      description: c.description,
      date: c.date,
      institution: c.institution,
      fileUrl: c.file_url || undefined,
      articleUrl: c.article_url || undefined,
    }));
  }

  // --- Parse skills ---
  let skillGroups: SkillGroup[] = [];
  if (skillsResult.status === "fulfilled" && skillsResult.value.data) {
    skillGroups = skillsResult.value.data.map((group: any) => ({
      id: group.id,
      category: group.category || "General",
      emoji: group.emoji || "🚀",
      skills: Array.isArray(group.skills)
        ? group.skills
        : typeof group.skills === "string"
          ? group.skills
              .split(",")
              .map((skill: string) => skill.trim())
              .filter((skill: string) => skill.length > 0)
          : [],
      sortOrder: group.sort_order || 0,
    }));
  }

  let clients: Client[] = [];
  if (clientsResult.status === "fulfilled" && clientsResult.value.data) {
    clients = clientsResult.value.data.map((client: any) => ({
      id: client.id,
      name: client.name,
      description: client.description || "",
      logoUrl: client.logo_url,
      role: client.role,
      companyName: client.company_name,
      startDate: client.start_date,
      endDate: client.end_date,
      isActive: client.is_active,
      orderIndex: client.order_index,
    }));
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-x-hidden">
      <Navbar />
      <Hero fullName={profile?.full_name} title={profile?.title} bioHero={profile?.bio_hero} avatarUrl={profile?.avatar_url} cvUrl={profile?.cv_url} loading={false} />
      <About fullName={profile?.full_name} title={profile?.title} bioAbout={profile?.bio_about} avatarUrl={profile?.avatar_url} cvUrl={profile?.cv_url} loading={false} />
      <Skills skillGroups={skillGroups} />
      <Certifications certifications={certifications} loading={false} />
      <Projects projects={projects} loading={false} />
      <Clients clients={clients} />
      <ContactForm />
      <Footer />
    </main>
  );
}
