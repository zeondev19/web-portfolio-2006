import { supabase } from "./supabase";
import type {
  ContactMessage,
  Experience,
  PortfolioContent,
  Profile,
  Project,
  Service,
  Skill,
} from "./types";

export const defaultContent: PortfolioContent = {
  profile: {
    name: "ZeonDev",
    eyebrow: "Available for freelance",
    headline: "Fullstack Developer & Product Builder",
    bio: "Saya membangun website, dashboard, dan produk digital yang cepat, rapi, dan mudah dikembangkan. Fokus saya ada di frontend modern, backend Supabase, dan pengalaman pengguna yang terasa premium.",
    location: "Indonesia",
    email: "hello@zeondev.dev",
    phone: "+62 812 3456 7890",
    availability: "Open for selected projects",
    roles: ["Fullstack Developer", "UI Engineer", "Supabase Builder"],
    hero_image_url: "/images/hero-4-thumb.jpg",
    resume_url: "",
    social_links: {
      github: "#",
      linkedin: "#",
      instagram: "#",
      twitter: "#",
    },
    stats: [
      { value: 14, suffix: "+", label: "Projects Delivered" },
      { value: 50, suffix: "+", label: "Happy Clients" },
      { value: 200, suffix: "+", label: "Design Iterations" },
    ],
  },
  services: [
    {
      title: "Web App Development",
      description:
        "Membangun aplikasi web modern dengan UI cepat, API solid, dan struktur code yang siap scale.",
      icon_class: "flaticon-code",
      sort_order: 10,
      is_visible: true,
    },
    {
      title: "Portfolio & Landing Page",
      description:
        "Merancang halaman personal brand, product page, dan campaign page yang polished dan mudah diedit.",
      icon_class: "flaticon-browser",
      sort_order: 20,
      is_visible: true,
    },
    {
      title: "Supabase Backend",
      description:
        "Database, authentication, RLS policies, contact form, dan admin CMS yang aman untuk kebutuhan bisnis.",
      icon_class: "flaticon-smartphone",
      sort_order: 30,
      is_visible: true,
    },
    {
      title: "UI Implementation",
      description:
        "Mengubah desain menjadi frontend responsif dengan detail visual yang presisi dan terasa premium.",
      icon_class: "flaticon-bezier-tool",
      sort_order: 40,
      is_visible: true,
    },
  ],
  projects: [
    {
      title: "Portfolio CMS",
      slug: "portfolio-cms",
      description:
        "Personal portfolio dengan admin dashboard, Supabase Auth, RLS, dan konten yang bisa diedit dari browser.",
      tech_stack: ["React", "TypeScript", "Supabase"],
      project_url: "#",
      repository_url: "#",
      image_path: "",
      image_url: "/images/1_1.jpg",
      sort_order: 10,
      is_featured: true,
      is_published: true,
    },
    {
      title: "Product Landing Page",
      slug: "product-landing-page",
      description:
        "Landing page high-conversion untuk produk digital dengan section konten modular dan form inquiry.",
      tech_stack: ["Vite", "UI Design", "Forms"],
      project_url: "#",
      repository_url: "#",
      image_path: "",
      image_url: "/images/2_1.jpg",
      sort_order: 20,
      is_featured: true,
      is_published: true,
    },
    {
      title: "Admin Dashboard",
      slug: "admin-dashboard",
      description:
        "Dashboard operasional untuk mengelola pesan, project, skill, service, dan profile secara cepat.",
      tech_stack: ["Supabase", "RLS", "Dashboard"],
      project_url: "#",
      repository_url: "#",
      image_path: "",
      image_url: "/images/3.jpg",
      sort_order: 30,
      is_featured: true,
      is_published: true,
    },
    {
      title: "Creative Web Experience",
      slug: "creative-web-experience",
      description:
        "Eksperimen visual web dengan layout portfolio, micro-interaction, dan asset-rich presentation.",
      tech_stack: ["CSS", "Animation", "Frontend"],
      project_url: "#",
      repository_url: "#",
      image_path: "",
      image_url: "/images/4.jpg",
      sort_order: 40,
      is_featured: false,
      is_published: true,
    },
  ],
  skills: [
    { name: "React", category: "Frontend", level: 92, icon: "/images/figma.svg", sort_order: 10, is_visible: true },
    { name: "TypeScript", category: "Frontend", level: 88, icon: "/images/xd.svg", sort_order: 20, is_visible: true },
    { name: "Supabase", category: "Backend", level: 90, icon: "/images/wp.svg", sort_order: 30, is_visible: true },
    { name: "PostgreSQL", category: "Backend", level: 82, icon: "/images/sketch.svg", sort_order: 40, is_visible: true },
  ],
  experiences: [
    {
      kind: "experience",
      title: "Fullstack Developer",
      organization: "Independent Projects",
      date_label: "2024 - Present",
      description:
        "Membangun dashboard, landing page, workflow automation, dan sistem berbasis Supabase untuk kebutuhan produk digital.",
      sort_order: 10,
      is_visible: true,
    },
    {
      kind: "experience",
      title: "Frontend Engineer",
      organization: "Product & Web Teams",
      date_label: "2022 - 2024",
      description:
        "Mengembangkan interface responsif, design system ringan, dan performa frontend untuk pengalaman pengguna yang konsisten.",
      sort_order: 20,
      is_visible: true,
    },
    {
      kind: "education",
      title: "Software Engineering Track",
      organization: "Continuous Learning",
      date_label: "Ongoing",
      description:
        "Fokus pada React, TypeScript, PostgreSQL, Supabase, deployment workflow, dan product engineering.",
      sort_order: 10,
      is_visible: true,
    },
  ],
};

const sortByOrder = <T extends { sort_order: number }>(items: T[]) =>
  [...items].sort((a, b) => a.sort_order - b.sort_order);

const normalizeProfile = (value: Partial<Profile> | null): Profile => ({
  ...defaultContent.profile,
  ...value,
  roles: Array.isArray(value?.roles) ? value.roles : defaultContent.profile.roles,
  social_links:
    value?.social_links && typeof value.social_links === "object"
      ? value.social_links
      : defaultContent.profile.social_links,
  stats: Array.isArray(value?.stats) ? value.stats : defaultContent.profile.stats,
});

export async function loadPortfolioContent(): Promise<PortfolioContent> {
  if (!supabase) return defaultContent;

  const [profile, services, projects, skills, experiences] = await Promise.all([
    supabase.from("portfolio_profile").select("*").limit(1).maybeSingle(),
    supabase.from("portfolio_services").select("*").order("sort_order"),
    supabase.from("portfolio_projects").select("*").order("sort_order"),
    supabase.from("portfolio_skills").select("*").order("sort_order"),
    supabase.from("portfolio_experiences").select("*").order("kind").order("sort_order"),
  ]);

  return {
    profile: normalizeProfile(profile.data as Partial<Profile> | null),
    services: services.data?.length ? sortByOrder(services.data as Service[]) : defaultContent.services,
    projects: projects.data?.length ? sortByOrder(projects.data as Project[]) : defaultContent.projects,
    skills: skills.data?.length ? sortByOrder(skills.data as Skill[]) : defaultContent.skills,
    experiences: experiences.data?.length
      ? sortByOrder(experiences.data as Experience[])
      : defaultContent.experiences,
  };
}

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  if (!supabase) {
    throw new Error("Supabase belum dikonfigurasi.");
  }

  const { error } = await supabase.from("portfolio_contacts").insert({
    ...payload,
    status: "new",
    metadata: {
      source: "portfolio",
      user_agent: navigator.userAgent,
    },
  });

  if (error) throw error;
}

export async function loadContactMessages(): Promise<ContactMessage[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("portfolio_contacts")
    .select("id,name,email,subject,message,status,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data ?? []) as ContactMessage[];
}
