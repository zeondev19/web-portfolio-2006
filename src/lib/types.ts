export type StatItem = {
  value: number;
  suffix?: string;
  label: string;
};

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
  behance?: string;
  [key: string]: string | undefined;
};

export type Profile = {
  id?: boolean;
  name: string;
  eyebrow: string;
  headline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  availability: string;
  roles: string[];
  hero_image_url: string;
  resume_url: string;
  social_links: SocialLinks;
  stats: StatItem[];
};

export type Service = {
  id?: string;
  title: string;
  description: string;
  icon_class: string;
  sort_order: number;
  is_visible: boolean;
};

export type Project = {
  id?: string;
  title: string;
  slug: string;
  description: string;
  tech_stack: string[];
  project_url: string;
  repository_url: string;
  image_path: string;
  image_url: string;
  sort_order: number;
  is_featured: boolean;
  is_published: boolean;
};

export type Skill = {
  id?: string;
  name: string;
  category: string;
  level: number;
  icon: string;
  sort_order: number;
  is_visible: boolean;
};

export type Experience = {
  id?: string;
  kind: "experience" | "education" | "award";
  title: string;
  organization: string;
  date_label: string;
  description: string;
  sort_order: number;
  is_visible: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  created_at: string;
};

export type PortfolioContent = {
  profile: Profile;
  services: Service[];
  projects: Project[];
  skills: Skill[];
  experiences: Experience[];
};
