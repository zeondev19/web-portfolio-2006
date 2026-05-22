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
    name: "Tengku Bintang Zaky Irmaysa",
    eyebrow: "Web Developer | PHP, Laravel, React, Next.js, Vue",
    headline: "Web Developer with 2+ Years Experience Building Scalable PHP Systems",
    bio: "I build high-performance, scalable web applications with clean, maintainable code. My experience covers PHP, Laravel, CodeIgniter, React, Next.js, Vue, JavaScript, TypeScript, Python, backend integration, database optimization, and business systems such as ERP, CRM, queue management, employee management, and printing information systems.",
    location: "Surabaya, Indonesia",
    email: "zeondev19@gmail.com",
    phone: "+6281267276459",
    availability: "Open to Web Developer, Backend, and AI Engineering opportunities",
    roles: ["Web Developer", "PHP/Laravel Developer", "Backend Developer", "AI Engineering Learner"],
    hero_image_url: "/images/bintang.png",
    resume_url: "/documents/Tengku_Bintang_Resume.pdf",
    social_links: {
      github: "https://github.com/zeondev19",
      linkedin: "https://www.linkedin.com/in/tengku-bintang-zaky-irmaysa/",
      instagram: "#",
      twitter: "#",
    },
    stats: [
      { value: 2, suffix: "+", label: "Years Experience" },
      { value: 20, suffix: "+", label: "Client Projects" },
      { value: 345, suffix: "+", label: "Work Items Completed" },
    ],
  },
  services: [
    {
      title: "PHP Web Development",
      description:
        "Building maintainable web applications with PHP, Laravel, CodeIgniter, JavaScript, TypeScript, Bootstrap, and Tailwind.",
      icon_class: "flaticon-code",
      sort_order: 10,
      is_visible: true,
    },
    {
      title: "Backend & Database Systems",
      description:
        "Designing backend architecture, database schemas, efficient queries, integrations, and performance-focused workflows.",
      icon_class: "flaticon-browser",
      sort_order: 20,
      is_visible: true,
    },
    {
      title: "Business System Delivery",
      description:
        "Developing operational systems including queue management, employee management, ERP, CRM, and printing information systems.",
      icon_class: "flaticon-smartphone",
      sort_order: 30,
      is_visible: true,
    },
    {
      title: "Frontend & UI Implementation",
      description:
        "Turning layouts into responsive interfaces with HTML, CSS, Bootstrap, Tailwind, JavaScript, TypeScript, and Figma awareness.",
      icon_class: "flaticon-bezier-tool",
      sort_order: 40,
      is_visible: true,
    },
  ],
  projects: [
    {
      title: "AquaFlow Snap",
      slug: "aquaflow-snap",
      description:
        "Retail product website untuk faucet-tip water flow upgrade, lengkap dengan edukasi produk, specs, FAQ, dan inquiry path.",
      tech_stack: ["Next.js", "Product Page", "Retail UX"],
      project_url: "https://product-demo.zeondev.site/",
      repository_url: "#",
      image_path: "",
      image_url: "/images/projects/aquaflow-snap.png",
      sort_order: 10,
      is_featured: true,
      is_published: true,
    },
    {
      title: "Lumora Strategy Co.",
      slug: "business-website",
      description:
        "Website bisnis profesional untuk perusahaan digital strategy dengan positioning, service preview, process, portfolio, dan CTA flow.",
      tech_stack: ["Native PHP", "Business Site", "Responsive UI"],
      project_url: "https://zeondev.site/portfolio/business-website/",
      repository_url: "#",
      image_path: "",
      image_url: "/images/projects/lumora-business.png",
      sort_order: 20,
      is_featured: true,
      is_published: true,
    },
    {
      title: "Custom Forms Demo",
      slug: "custom-forms",
      description:
        "Native PHP form system demo untuk contact, quote, appointment, support ticket, validation, honeypot, dan integrasi client workflow.",
      tech_stack: ["Native PHP", "Validation", "Form UX"],
      project_url: "https://zeondev.site/portfolio/custom-forms/",
      repository_url: "#",
      image_path: "",
      image_url: "/images/projects/custom-forms.png",
      sort_order: 30,
      is_featured: true,
      is_published: true,
    },
  ],
  skills: [
    { name: "Laravel", category: "Backend Framework", level: 92, icon: "/images/stack/laravel.svg", sort_order: 10, is_visible: true },
    { name: "PHP", category: "Backend Language", level: 92, icon: "/images/stack/php.svg", sort_order: 20, is_visible: true },
    { name: "MySQL", category: "Database", level: 86, icon: "/images/stack/mysql.svg", sort_order: 30, is_visible: true },
    { name: "JavaScript", category: "Frontend", level: 86, icon: "/images/stack/javascript.svg", sort_order: 40, is_visible: true },
    { name: "React", category: "Frontend Library", level: 86, icon: "/images/stack/react.svg", sort_order: 50, is_visible: true },
    { name: "TypeScript", category: "Frontend Language", level: 84, icon: "/images/stack/typescript.svg", sort_order: 60, is_visible: true },
    { name: "Next.js", category: "React Framework", level: 82, icon: "/images/stack/nextjs.svg", sort_order: 70, is_visible: true },
    { name: "Vue", category: "Frontend Framework", level: 78, icon: "/images/stack/vue.svg", sort_order: 80, is_visible: true },
    { name: "CodeIgniter", category: "Backend Framework", level: 88, icon: "/images/stack/codeigniter.svg", sort_order: 90, is_visible: true },
    { name: "Tailwind CSS", category: "Frontend Styling", level: 84, icon: "/images/stack/tailwind.svg", sort_order: 100, is_visible: true },
    { name: "Python", category: "AI Engineering", level: 76, icon: "/images/stack/python.svg", sort_order: 110, is_visible: true },
    { name: "Figma", category: "UI Handoff", level: 78, icon: "/images/stack/figma.svg", sort_order: 120, is_visible: true },
  ],
  experiences: [
    {
      kind: "experience",
      title: "Programmer",
      organization: "PT Imagine Space Tech",
      date_label: "Oct 2024 - Oct 2025",
      description:
        "Developed and maintained queue management, employee management, ERP, CRM, and printing information systems across 20+ client projects among 50+ company clients. Completed 345+ medium-to-high complexity work items covering features, bug fixes, configuration, product demos, and stability improvements.",
      sort_order: 10,
      is_visible: true,
    },
    {
      kind: "experience",
      title: "Programming Laboratory Assistant",
      organization: "Universitas 17 Agustus 1945 Surabaya",
      date_label: "Feb 2022 - Sep 2024",
      description:
        "Coordinated semester laboratory sessions, handled accurate records and data entry, assisted 200+ students in Computer Architecture and Logic practicals, and supported continuous improvement for practicum learning.",
      sort_order: 20,
      is_visible: true,
    },
    {
      kind: "experience",
      title: "Back End Developer Intern",
      organization: "CV. Sejahtera Kemasan",
      date_label: "Oct 2023 - Dec 2023",
      description:
        "Collaborated with frontend developers for backend integration, refactored database schemas and queries, improved data storage and retrieval efficiency, and supported scalable backend architecture and performance tuning.",
      sort_order: 30,
      is_visible: true,
    },
    {
      kind: "education",
      title: "Bachelor of Computer Science",
      organization: "Universitas 17 Agustus 1945 Surabaya",
      date_label: "Sep 2021 - Feb 2025",
      description:
        "Graduated with GPA 3.75/4.00. Focused on software engineering fundamentals, computer architecture, logic, web development, and applied technology projects.",
      sort_order: 10,
      is_visible: true,
    },
    {
      kind: "award",
      title: "Gemastik 2023 ICT Scientific Paper Finalist",
      organization: "ICT Scientific Paper Division",
      date_label: "2023",
      description:
        "Selected as one of 21 finalists out of 335 participants with the paper 'Quality Control of Batik Using a Camera-Based Software Quality Checker to Detect Batik Patterns, Colors, and Sizes'.",
      sort_order: 10,
      is_visible: true,
    },
    {
      kind: "award",
      title: "PKM Project Team Leader",
      organization: "Kemendikbud Sponsored Project",
      date_label: "2023",
      description:
        "Led a sponsored PKM project on UAV fixed-wing drone technology for sustainable mangrove forest reforestation.",
      sort_order: 20,
      is_visible: true,
    },
  ],
};

const sortByOrder = <T extends { sort_order: number }>(items: T[]) =>
  [...items].sort((a, b) => a.sort_order - b.sort_order);

const legacyServiceTitles = new Set([
  "Web App Development",
  "Portfolio & Landing Page",
  "Supabase Backend",
  "UI Implementation",
]);

const legacyProjectSlugs = new Set([
  "portfolio-cms",
  "product-landing-page",
  "admin-dashboard",
  "creative-web-experience",
]);

const legacySkillNames = new Set([
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "UI Implementation",
  "Automation & API",
]);

const previousStackSkillNames = new Set([
  "Laravel",
  "PHP",
  "MySQL",
  "JavaScript",
  "CodeIgniter",
  "TypeScript",
  "Tailwind CSS",
  "Python",
]);

const legacyExperienceTitles = new Set([
  "Fullstack Developer",
  "Frontend Engineer",
  "Software Engineering Track",
  "Client Delivery Excellence",
]);

const normalizeServices = (items: Service[] | null | undefined): Service[] => {
  if (!items?.length) return defaultContent.services;

  const sortedServices = sortByOrder(items);
  const isLegacySeedData =
    sortedServices.length === legacyServiceTitles.size &&
    sortedServices.every((service) => legacyServiceTitles.has(service.title));

  return isLegacySeedData ? defaultContent.services : sortedServices;
};

const normalizeProjects = (items: Project[] | null | undefined): Project[] => {
  if (!items?.length) return defaultContent.projects;

  const sortedProjects = sortByOrder(items);
  const isLegacySeedData =
    sortedProjects.length === legacyProjectSlugs.size &&
    sortedProjects.every((project) => legacyProjectSlugs.has(project.slug));

  return isLegacySeedData ? defaultContent.projects : sortedProjects;
};

const normalizeSkills = (items: Skill[] | null | undefined): Skill[] => {
  if (!items?.length) return defaultContent.skills;

  const sortedSkills = sortByOrder(items);
  const isLegacySeedData =
    sortedSkills.every((skill) => legacySkillNames.has(skill.name)) ||
    (sortedSkills.length === previousStackSkillNames.size &&
      sortedSkills.every((skill) => previousStackSkillNames.has(skill.name)));

  return isLegacySeedData ? defaultContent.skills : sortedSkills;
};

const normalizeExperiences = (items: Experience[] | null | undefined): Experience[] => {
  if (!items?.length) return defaultContent.experiences;

  const sortedExperiences = sortByOrder(items);
  const isLegacySeedData = sortedExperiences.every((experience) =>
    legacyExperienceTitles.has(experience.title),
  );

  return isLegacySeedData ? defaultContent.experiences : sortedExperiences;
};

const normalizeProfile = (value: Partial<Profile> | null): Profile => {
  if (!value) return defaultContent.profile;

  const isLegacySeedData =
    value.name === "ZeonDev" && value.headline === "Fullstack Developer & Product Builder";

  if (isLegacySeedData) return defaultContent.profile;

  const normalizedProfile = {
    ...defaultContent.profile,
    ...value,
    roles: Array.isArray(value.roles) ? value.roles : defaultContent.profile.roles,
    social_links:
      value.social_links && typeof value.social_links === "object"
        ? value.social_links
        : defaultContent.profile.social_links,
    stats: Array.isArray(value.stats) ? value.stats : defaultContent.profile.stats,
  };

  const mismatchedHeroImages = new Set(["/images/hero-code-stack.svg", "/images/hero-4-thumb.jpg"]);
  return {
    ...normalizedProfile,
    hero_image_url: mismatchedHeroImages.has(normalizedProfile.hero_image_url)
      ? defaultContent.profile.hero_image_url
      : normalizedProfile.hero_image_url,
  };
};

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
    services: normalizeServices(services.data as Service[] | null),
    projects: normalizeProjects(projects.data as Project[] | null),
    skills: normalizeSkills(skills.data as Skill[] | null),
    experiences: normalizeExperiences(experiences.data as Experience[] | null),
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
