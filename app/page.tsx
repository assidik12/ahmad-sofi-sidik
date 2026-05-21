"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Projects from "@/components/projects/Projects";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/footer/Footer";
import Clients from "@/components/client/client";
import { supabase } from "@/lib/supabase";
import { type Project } from "@/components/projects/ProjectCard";

interface ProfileData {
  full_name: string;
  title: string;
  bio_hero: string;
  bio_about: string;
  avatar_url: string | null;
  cv_url: string | null;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        // Fetch Profile (first record)
        const { data: profileData, error: profileError } = await supabase
          .from("profile")
          .select("full_name, title, bio_hero, bio_about, avatar_url, cv_url")
          .limit(1)
          .maybeSingle(); // Use maybeSingle to prevent crashing if table is empty

        if (profileData && !profileError) {
          setProfile(profileData);
        }

        // Fetch Projects
        const { data: projectsData, error: projectsError } = await supabase
          .from("projects")
          .select("id, title, description, tags, emoji, gradient_from, gradient_to, github_url, live_url")
          .order("id", { ascending: true });

        if (projectsData && !projectsError) {
          const mappedProjects: Project[] = projectsData.map((proj: any) => ({
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
          setProjects(mappedProjects);
        }
      } catch (err) {
        console.error("Error fetching data from Supabase:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 overflow-x-hidden">
      <Navbar />
      <Hero
        fullName={profile?.full_name}
        title={profile?.title}
        bioHero={profile?.bio_hero}
        avatarUrl={profile?.avatar_url}
        cvUrl={profile?.cv_url}
        loading={loading}
      />
      <About
        fullName={profile?.full_name}
        title={profile?.title}
        bioAbout={profile?.bio_about}
        avatarUrl={profile?.avatar_url}
        cvUrl={profile?.cv_url}
        loading={loading}
      />
      <Skills />
      <Projects projects={projects} loading={loading} />
      <Clients />
      <ContactForm />
      <Footer />
    </main>
  );
}
