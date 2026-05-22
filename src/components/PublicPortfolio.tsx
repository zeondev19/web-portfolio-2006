import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Layers3,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import { sendContactMessage } from "../lib/content";
import { usePortfolioEffects } from "../lib/usePortfolioEffects";
import type { Experience, PortfolioContent, Project, SocialLinks } from "../lib/types";

type PublicPortfolioProps = {
  content: PortfolioContent;
  loading: boolean;
};

const navItems = [
  ["Services", "#services"],
  ["Projects", "#projects"],
  ["Resume", "#resume"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

const socialIcon = (name: string) => {
  if (name.toLowerCase().includes("github")) return <Github size={18} />;
  if (name.toLowerCase().includes("linkedin")) return <Linkedin size={18} />;
  return <ArrowUpRight size={18} />;
};

type CaseStudyDetail = {
  summary: string;
  role: string;
  timeline: string;
  platform: string;
  metrics: Array<{ value: string; label: string }>;
  highlights: string[];
  challenge: string;
  solution: string;
  outcome: string;
  gallery: string[];
  process: Array<{ title: string; text: string }>;
  stackNotes: Array<{ title: string; text: string }>;
};

const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "aquaflow-snap": {
    summary:
      "A retail-focused product introduction site for AquaFlow Snap, a faucet-tip upgrade positioned around less splash, smoother rinsing, and simple installation.",
    role: "Product page strategy, frontend implementation, responsive polish",
    timeline: "Product demo sprint",
    platform: "Next.js, product education, retail inquiry flow",
    metrics: [
      { value: "4", label: "Install steps explained" },
      { value: "3", label: "Instant benefit cards" },
      { value: "1", label: "Retail inquiry path" },
    ],
    highlights: [
      "Hero communicates the product promise before visitors need technical context.",
      "Problem, feature, install, FAQ, and retailer sections are structured for quick scanning.",
      "The CTA path supports product information requests without turning the page into checkout.",
    ],
    challenge:
      "A small faucet accessory can feel too technical if the page starts with parts and specs. The site needed to translate the product into a clear everyday problem: splash, uneven flow, and messy rinsing.",
    solution:
      "The page leads with a benefit-first product story, then supports it with installation steps, feature callouts, fit notes, FAQ content, and a direct inquiry route for retail interest.",
    outcome:
      "Visitors can understand what AquaFlow Snap does in one pass, while retailers still get enough detail to evaluate the product opportunity.",
    gallery: [
      "/images/projects/aquaflow-snap.png",
      "https://product-demo.zeondev.site/images/aquaflow-snap-product.png",
      "/images/projects/aquaflow-how-it-works.png",
    ],
    process: [
      {
        title: "Message Hierarchy",
        text: "Reframed the product around less splash, smoother rinsing, and no faucet replacement.",
      },
      {
        title: "Product Education",
        text: "Connected technical details like the flow face, gasket, and screen to customer outcomes.",
      },
      {
        title: "Retail CTA",
        text: "Kept the inquiry path visible after the shopper understands the product and its install story.",
      },
    ],
    stackNotes: [
      { title: "Next.js", text: "Built as a modern product demo with optimized image handling and clear routes." },
      { title: "Product UX", text: "Every section ties a physical feature to a practical kitchen benefit." },
      { title: "Responsive UI", text: "The page keeps product imagery, specs, and inquiry actions readable across screen sizes." },
    ],
  },
  "business-website": {
    summary:
      "A polished business website sample for Lumora Strategy Co., built to present a serious service company with clear positioning, trust signals, and practical conversion flow.",
    role: "Business website design, frontend implementation, content structure",
    timeline: "3 week launch sprint model",
    platform: "Native PHP, responsive frontend, service-site UX",
    metrics: [
      { value: "42+", label: "Projects shipped signal" },
      { value: "91%", label: "Client retention proof" },
      { value: "+38%", label: "Qualified inquiry snapshot" },
    ],
    highlights: [
      "Hero section sells the business value before explaining services.",
      "Service, process, selected work, testimonials, and CTA sections support one consultation path.",
      "The visual system feels credible for consulting, agency, and expert-led business audiences.",
    ],
    challenge:
      "A service business website has to feel established quickly. The page needed to avoid generic brochure energy and make the company look structured, strategic, and ready for client acquisition.",
    solution:
      "I shaped the page around a sharp positioning statement, supporting metrics, scoped services, a four-step workflow, selected work previews, and testimonials that explain the value in plain language.",
    outcome:
      "The result reads like a complete client-ready business presence instead of a design mockup, with clear paths to start a project or review work.",
    gallery: [
      "/images/projects/lumora-business.png",
      "/images/projects/lumora-portfolio.png",
      "https://zeondev.site/portfolio/business-website/assets/images/project-finance.svg",
    ],
    process: [
      { title: "Positioning", text: "Defined the business as a digital strategy partner for serious service companies." },
      { title: "Page Flow", text: "Ordered the page from business promise to proof, services, process, work, and contact action." },
      { title: "Implementation", text: "Built the experience in native PHP with responsive layouts and lightweight interaction patterns." },
    ],
    stackNotes: [
      { title: "Native PHP", text: "Keeps the demo simple, portable, and easy to host on traditional PHP environments." },
      { title: "Business UX", text: "The content hierarchy is built for trust, clarity, and consultation intent." },
      { title: "Responsive UI", text: "Cards, stats, charts, and navigation are structured to hold up across viewport sizes." },
    ],
  },
  "custom-forms": {
    summary:
      "A professional native PHP forms demo covering contact, quote, appointment, support, validation, spam protection, safe storage, and integration-ready workflow structure.",
    role: "Form UX, PHP validation architecture, frontend interaction polish",
    timeline: "Custom workflow sprint",
    platform: "Native PHP, JavaScript validation, integration-ready backend",
    metrics: [
      { value: "4", label: "Form demos" },
      { value: "2x", label: "Frontend and PHP checks" },
      { value: "API", label: "Integration-ready layer" },
    ],
    highlights: [
      "Includes contact, quote request, appointment request, and support ticket forms.",
      "Validation happens in the browser and again on the PHP backend before safe demo storage.",
      "The structure is prepared for email, CRM, FileMaker, Gravity Forms, or client workflow integrations.",
    ],
    challenge:
      "Forms often look finished visually while still being weak in validation, spam handling, and integration structure. This demo needed to show the full workflow, not just styled inputs.",
    solution:
      "The project separates presentation, client-side validation, PHP validation, storage, and connector logic so each form can be adapted to real business workflows without rewriting the whole system.",
    outcome:
      "Clients can review multiple form types and understand how the system would plug into their existing website, CRM, or operations process.",
    gallery: [
      "/images/projects/custom-forms.png",
      "/images/projects/custom-forms-contact.png",
      "/images/projects/custom-forms-quote.png",
    ],
    process: [
      { title: "Form Mapping", text: "Covered the common business flows: inquiry, quote, appointment, and support ticket." },
      { title: "Validation Layer", text: "Added required fields, format checks, allowed values, CSRF, honeypot, and safe file constraints." },
      { title: "Integration Shape", text: "Prepared the processing layer for email, CRM, FileMaker, Gravity Forms, or custom connectors." },
    ],
    stackNotes: [
      { title: "Native PHP", text: "Backend validation and processing stay visible, practical, and portable." },
      { title: "JavaScript", text: "Client-side checks improve completion before the server validates again." },
      { title: "Integration Ready", text: "Connector boundaries make future CRM, email, FileMaker, or WordPress form work cleaner." },
    ],
  },
};

const fallbackDetail = (project: Project): CaseStudyDetail => ({
  summary: `${project.title} is a portfolio case study focused on polished delivery, clear content structure, and reusable frontend systems.`,
  role: "Frontend implementation",
  timeline: "Project sprint",
  platform: project.tech_stack.join(", "),
  metrics: [
    { value: "1", label: "Production-ready surface" },
    { value: `${project.tech_stack.length}`, label: "Core technologies" },
    { value: "100%", label: "Responsive presentation" },
  ],
  highlights: [
    "Designed as a focused portfolio case study.",
    "Uses reusable content and visual patterns.",
    "Built to stay easy to improve as the project grows.",
  ],
  challenge:
    "The project needed a clean, credible presentation that explains both the visual result and the engineering decisions behind it.",
  solution:
    "I shaped the page around the actual project outcome, then gave the detail view enough structure for overview, process, stack, and impact.",
  outcome:
    "The project can now be reviewed as a real case study instead of only a thumbnail in a grid.",
  gallery: [projectImage(project), "/images/p-gallery-1.jpg", "/images/p-gallery-2.jpg"],
  process: [
    { title: "Discovery", text: "Clarified the purpose, audience, and content hierarchy." },
    { title: "Build", text: "Implemented the core UI with reusable sections and responsive constraints." },
    { title: "Polish", text: "Refined spacing, motion, image framing, and interaction details." },
  ],
  stackNotes: project.tech_stack.map((tech) => ({
    title: tech,
    text: `${tech} supports the project structure, interaction model, or delivery workflow.`,
  })),
});

function Header({ links, isDetail = false }: { links: SocialLinks; isDetail?: boolean }) {
  const navPrefix = isDetail ? "/" : "";

  return (
    <header className="tj-header-area header-3 header-4 header-absolute portfolio-header">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-wrap justify-content-between align-items-center">
            <a className="portfolio-logo" href={isDetail ? "/" : "#top"} aria-label="Back to top">
              ZD
            </a>
            <nav className="portfolio-nav" aria-label="Primary navigation">
              {navItems.map(([label, href]) => (
                <a href={`${navPrefix}${href}`} key={href}>
                  {label}
                </a>
              ))}
            </nav>
            <div className="header-media d-none d-lg-inline-flex">
              <ul className="ul-reset social-icons">
                {Object.entries(links)
                  .filter(([, href]) => href)
                  .slice(0, 4)
                  .map(([name, href]) => (
                    <li key={name}>
                      <a href={href} aria-label={name} target="_blank" rel="noreferrer">
                        {socialIcon(name)}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero({ content }: { content: PortfolioContent }) {
  const { profile } = content;

  return (
    <section className="tj-hero-4-area heroAnimation portfolio-hero" id="top">
      <div className="tj-hero-overlay" />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="tj-hero-4-top text-center">
              <div className="tj-hero-4-subtitle-text">
                <span className="tj-hero-4-subtitle">{profile.eyebrow}</span>
              </div>
              <div className="tj-hero-4-title-text">
                <h1 className="tj-hero-4-title">{profile.name}</h1>
                <p className="portfolio-hero-headline">{profile.headline}</p>
              </div>
            </div>
            <div className="tj-hero-4-bottom-wrapper">
              <div className="tj-hero-4-bottom-thumb">
                <div
                  className="image-animated tilt-card hero-tilt"
                  data-tilt
                  data-tilt-max="14"
                  data-tilt-scale="1.04"
                >
                  <img src={profile.hero_image_url} alt={profile.name} decoding="async" fetchPriority="high" />
                </div>
                {profile.roles.slice(0, 2).map((role, index) => (
                  <div
                    className={`tj-hero-4-bottom-thumb-shape-${index + 1}`}
                    key={role}
                  >
                    <span className="tj-hero-4-bottom-tag">{role}</span>
                  </div>
                ))}
              </div>
              <div className="tj-hero-4-bottom-reviews portfolio-hero-copy">
                <p>{profile.bio}</p>
                <div className="portfolio-meta">
                  <span>
                    <MapPin size={18} /> {profile.location}
                  </span>
                  <span>{profile.availability}</span>
                </div>
                <div className="portfolio-hero-actions">
                  <a href="#contact" className="btn tj-btn-primary">
                    Hire Me <ArrowUpRight size={18} />
                  </a>
                  {profile.resume_url ? (
                    <a className="portfolio-resume-link" href={profile.resume_url} target="_blank" rel="noreferrer">
                      Resume <ArrowUpRight size={17} />
                    </a>
                  ) : null}
                </div>
              </div>
              <div className="tj-hero-4-bottom-counter">
                {profile.stats.map((stat) => (
                  <div className="tj-hero-4-bottom-counter-item" key={stat.label}>
                    <div className="funfact-item d-flex flex-column flex-sm-row flex-wrap align-items-center">
                      <div className="number">
                        <span data-counter-target={stat.value}>{stat.value}</span>
                        {stat.suffix}
                      </div>
                      <div className="text">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee({ roles }: { roles: string[] }) {
  const words = [
    ...roles,
    "Laravel",
    "PHP",
    "React",
    "TypeScript",
    "Next.js",
    "Vue",
    "MySQL",
    "JavaScript",
    "CodeIgniter",
    "Python",
  ];

  return (
    <section className="tj-maquee-section style-4 portfolio-marquee mt-5">
      <div className="portfolio-marquee-track">
        {[...words, ...words].map((word, index) => (
          <div className="marquee-box" key={`${word}-${index}`}>
            <div className="marquee-icon">
              <img src="/images/star.svg" alt="" />
            </div>
            <div className="marquee-title">
              <h5 className="title">{word}</h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services({ content }: { content: PortfolioContent }) {
  return (
    <section className="tj-service-4-area" id="services">
      <div className="container">
        <div className="row">
          <div className="section-header style-2">
            <span>Service</span>
            <h2 className="title">What I can ship for you</h2>
          </div>
        </div>
        <div className="row">
          {content.services.map((service, index) => (
            <div className="col-xl-3 col-lg-6 col-md-6" key={service.id ?? service.title}>
              <article className={`tj-service-4-wrapper tilt-card ${index === 0 ? "current" : ""}`}>
                <div className="tj-service-4-icon">
                  <span>
                    <i className={service.icon_class || "flaticon-code"} />
                  </span>
                </div>
                <div className="tj-service-4-content">
                  <h4 className="tj-service-4-title">{service.title}</h4>
                  <p className="tj-service-4-paragraph">{service.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function projectImage(project: Project) {
  return project.image_url || project.image_path || "/images/1_1.jpg";
}

function Projects({ content }: { content: PortfolioContent }) {
  return (
    <section className="tj-project-4-area" id="projects">
      <div className="container">
        <div className="row">
          <div className="section-header style-2">
            <span>Project</span>
            <h2 className="title">Selected Case Studies</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="tj-project-4-wrappper">
              {content.projects.map((project) => (
                <article
                  className="tj-project-4-item portfolio-project-card tilt-card"
                  data-tilt
                  data-tilt-max="12"
                  data-tilt-scale="1.025"
                  key={project.id ?? project.slug}
                >
                  <a className="project-card-media-link" href={`/projects/${project.slug}`} data-cursor="View Detail">
                    <span className="tj-project-4-thumb">
                      <img src={projectImage(project)} alt={project.title} decoding="async" />
                    </span>
                  </a>
                  <div className="tj-project-4-content">
                    <span className="tj-project-4-subtitle">
                      {project.tech_stack?.[0] ?? "Project"}
                    </span>
                    <h4 className="tj-project-4-title">
                      <a href={`/projects/${project.slug}`}>{project.title}</a>
                    </h4>
                    <p>{project.description}</p>
                    <div className="portfolio-tags">
                      {project.tech_stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="portfolio-card-actions">
                      <a href={`/projects/${project.slug}`}>
                        Case Study <ArrowUpRight size={16} />
                      </a>
                      {project.project_url && project.project_url !== "#" ? (
                        <a href={project.project_url} target="_blank" rel="noreferrer">
                          Live <ArrowUpRight size={16} />
                        </a>
                      ) : null}
                      {project.repository_url && project.repository_url !== "#" ? (
                        <a href={project.repository_url} target="_blank" rel="noreferrer">
                          Code <Github size={16} />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getProjectDetail(project: Project) {
  return caseStudyDetails[project.slug] ?? fallbackDetail(project);
}

function ProjectNotFound({ projects }: { projects: Project[] }) {
  return (
    <section className="project-detail-page project-detail-empty">
      <div className="container">
        <a className="detail-back-link" href="/#projects">
          <ArrowLeft size={18} /> Back to projects
        </a>
        <div className="project-detail-empty-box">
          <h1>Project not found</h1>
          <p>The case study you opened is not available. Pick one of the active portfolio projects below.</p>
          <div className="detail-related-grid">
            {projects.slice(0, 4).map((project) => (
              <a className="detail-related-card" href={`/projects/${project.slug}`} key={project.slug}>
                <img src={projectImage(project)} alt="" decoding="async" />
                <span>{project.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectDetailPage({ content, project }: { content: PortfolioContent; project: Project }) {
  const detail = getProjectDetail(project);
  const relatedProjects = content.projects.filter((item) => item.slug !== project.slug).slice(0, 3);

  return (
    <section className="project-detail-page" id="top">
      <div className="project-detail-bg" aria-hidden="true" />
      <div className="container">
        <a className="detail-back-link" href="/#projects">
          <ArrowLeft size={18} /> Back to projects
        </a>

        <div className="project-detail-hero">
          <div className="project-detail-copy">
            <div className="project-detail-title-row">
              <span>{project.tech_stack[0] ?? "Case Study"}</span>
              <span>{detail.timeline}</span>
            </div>
            <h1>{project.title}</h1>
            <p className="project-detail-lead">{detail.summary}</p>
            <div className="portfolio-tags detail-tags">
              {project.tech_stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
            <div className="detail-hero-actions">
              {project.project_url && project.project_url !== "#" ? (
                <a className="btn tj-btn-primary" href={project.project_url} target="_blank" rel="noreferrer">
                  Open Live <ArrowUpRight size={18} />
                </a>
              ) : null}
              {project.repository_url && project.repository_url !== "#" ? (
                <a className="detail-secondary-link" href={project.repository_url} target="_blank" rel="noreferrer">
                  View Code <Github size={18} />
                </a>
              ) : null}
            </div>
          </div>

          <div className="project-detail-visual tilt-card" data-tilt data-tilt-max="8" data-tilt-scale="1.018">
            <img src={projectImage(project)} alt={`${project.title} preview`} decoding="async" />
            <div className="detail-visual-caption">
              <Sparkles size={17} />
              <span>Interactive case-study preview</span>
            </div>
          </div>
        </div>

        <div className="detail-meta-grid">
          <article>
            <Rocket size={22} />
            <span>Role</span>
            <strong>{detail.role}</strong>
          </article>
          <article>
            <Workflow size={22} />
            <span>Timeline</span>
            <strong>{detail.timeline}</strong>
          </article>
          <article>
            <Layers3 size={22} />
            <span>Platform</span>
            <strong>{detail.platform}</strong>
          </article>
        </div>

        <div className="detail-section-grid">
          <article className="detail-story-block">
            <span>Challenge</span>
            <h2>What needed to be solved</h2>
            <p>{detail.challenge}</p>
          </article>
          <article className="detail-story-block">
            <span>Solution</span>
            <h2>How the interface was shaped</h2>
            <p>{detail.solution}</p>
          </article>
          <article className="detail-story-block">
            <span>Outcome</span>
            <h2>Why it works now</h2>
            <p>{detail.outcome}</p>
          </article>
        </div>

        <div className="detail-impact-band">
          {detail.metrics.map((metric) => (
            <article key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </article>
          ))}
        </div>

        <div className="detail-gallery">
          {detail.gallery.map((image, index) => (
            <figure className={index === 0 ? "is-large" : ""} key={`${image}-${index}`}>
              <img src={image} alt={`${project.title} visual ${index + 1}`} decoding="async" />
            </figure>
          ))}
        </div>

        <div className="detail-process-layout">
          <div className="detail-process-heading">
            <h2>Build Process</h2>
            <p>Each case study is structured around clarity first, then motion, polish, and maintainability.</p>
          </div>
          <div className="detail-process-list">
            {detail.process.map((step, index) => (
              <article key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="detail-stack-layout">
          <div className="detail-stack-card">
            <ShieldCheck size={24} />
            <h2>Engineering Notes</h2>
            <p>
              The detail page uses the same project data as the portfolio grid, then enriches it with case-study
              specific context so the project feels explainable, not just visual.
            </p>
          </div>
          <div className="detail-stack-notes">
            {detail.stackNotes.map((item) => (
              <article key={item.title}>
                <CheckCircle2 size={19} />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {relatedProjects.length ? (
          <div className="detail-related">
            <div className="detail-related-heading">
              <h2>More case studies</h2>
              <a href="/#projects">View all <ArrowUpRight size={17} /></a>
            </div>
            <div className="detail-related-grid">
              {relatedProjects.map((item) => (
                <a className="detail-related-card" href={`/projects/${item.slug}`} key={item.slug}>
                  <img src={projectImage(item)} alt="" decoding="async" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ResumeGroup({ title, items }: { title: string; items: Experience[] }) {
  if (!items.length) return null;

  return (
    <div className="resume_inner">
      <div className="resume-sidebar-btn">
        <span className="side-sticky-inner side-sticky">{title}</span>
      </div>
      <div className="resume_wrapper">
        {items.map((item) => (
          <article className="resume_item" key={item.id ?? `${item.kind}-${item.title}`}>
            <div className="resume_content">
              <div className="icon_box">
                <img src="/images/h4-work-1.png" alt="" />
              </div>
              <div className="resume_text">
                <h5 className="title">{item.title}</h5>
                <span className="subtitle">{item.organization}</span>
                <div className="desc">
                  <p>{item.description}</p>
                </div>
              </div>
            </div>
            <div className="resume_date">
              <span className="date">{item.date_label}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Resume({ content }: { content: PortfolioContent }) {
  const groups = useMemo(
    () => ({
      experience: content.experiences.filter((item) => item.kind === "experience"),
      education: content.experiences.filter((item) => item.kind === "education"),
      award: content.experiences.filter((item) => item.kind === "award"),
    }),
    [content.experiences],
  );

  return (
    <section className="resume-section style-4" id="resume">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header style-2">
              <h2 className="title">Education & Work Experience</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ResumeGroup title="Experience" items={groups.experience} />
            <ResumeGroup title="Education" items={groups.education} />
            <ResumeGroup title="Awards" items={groups.award} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ content }: { content: PortfolioContent }) {
  return (
    <section className="tj-progress-section" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header style-2">
              <span>Skills</span>
              <h2 className="title">My Favorite Stack</h2>
            </div>
          </div>
        </div>
        <div className="row portfolio-skills-grid">
          {content.skills.map((skill) => (
            <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6" key={skill.id ?? skill.name}>
              <article className="progress-single portfolio-skill-card tilt-card">
                <div className="progress-text">
                  <div className="icon-box">
                    <img src={skill.icon || "/images/stack/laravel.svg"} alt="" decoding="async" />
                  </div>
                  <div className="progress-title">
                    <h4 className="title">{skill.name}</h4>
                    <span>{skill.category}</span>
                  </div>
                </div>
                <div className="tj-progress-bar">
                  <div className="progress_bar">
                    <div className="progress-item">
                      <div className="item_value">{skill.level}%</div>
                      <div className="item_bar">
                        <div
                          className="progress"
                          data-progress={skill.level}
                          style={{ "--skill-level": `${skill.level}%` } as CSSProperties}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ content }: { content: PortfolioContent }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    try {
      await sendContactMessage(payload);
      event.currentTarget.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Message failed to send.");
    }
  }

  return (
    <section className="contact-section portfolio-contact" id="contact">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="section-header style-2">
              <span>Contact</span>
              <h2 className="title">Let's build something polished</h2>
              <p>{content.profile.bio}</p>
            </div>
            <ul className="contact-info-list">
              <li>
                <div className="icon-box">
                  <Mail size={20} />
                </div>
                <div className="text-box">
                  <p>Email</p>
                  <a href={`mailto:${content.profile.email}`}>{content.profile.email}</a>
                </div>
              </li>
              <li>
                <div className="icon-box">
                  <Phone size={20} />
                </div>
                <div className="text-box">
                  <p>Phone</p>
                  <a href={`tel:${content.profile.phone}`}>{content.profile.phone}</a>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-7">
            <div className="contact-form-box">
              <form className="tj-contact-form" onSubmit={handleSubmit}>
                <div className="row gx-3">
                  <div className="col-sm-6">
                    <div className="form_group">
                      <input name="name" type="text" placeholder="Name" required minLength={1} />
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form_group">
                      <input name="email" type="email" placeholder="Email" required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form_group">
                      <input name="subject" type="text" placeholder="Subject" required />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form_group">
                      <textarea name="message" placeholder="Tell me about the project" required minLength={1} />
                    </div>
                  </div>
                  <div className="col-12">
                    <button className="btn tj-btn-primary" type="submit" disabled={status === "sending"}>
                      {status === "sending" ? "Sending..." : "Send Message"} <Send size={18} />
                    </button>
                    {status === "sent" ? <p className="form-note success">Message sent.</p> : null}
                    {status === "error" ? <p className="form-note error">{error}</p> : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ content }: { content: PortfolioContent }) {
  return (
    <footer className="tj-footer-area style-4 portfolio-footer">
      <div className="footer-top-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-contact-infos">
                <div className="contact-footer-item">
                  <div className="contact_text">
                    <a href={`mailto:${content.profile.email}`}>
                      <span className="active-link">{content.profile.email}</span>
                      <span className="hover-link">{content.profile.email}</span>
                    </a>
                  </div>
                  <div className="line">/</div>
                  <div className="contact_text">
                    <span className="location">{content.profile.location}</span>
                  </div>
                  <div className="line">/</div>
                  <div className="contact_text">
                    <a href={`tel:${content.profile.phone}`}>
                      <span className="active-link">{content.profile.phone}</span>
                      <span className="hover-link">{content.profile.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
              <p className="portfolio-admin-link">
                <a href="/admin">Admin</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function PublicPortfolio({ content, loading }: PublicPortfolioProps) {
  usePortfolioEffects(!loading);
  const projectMatch = window.location.pathname.match(/^\/projects\/([^/]+)/);
  const projectSlug = projectMatch?.[1] ? decodeURIComponent(projectMatch[1]) : "";
  const activeProject = projectSlug ? content.projects.find((project) => project.slug === projectSlug) : null;
  const isProjectDetail = Boolean(projectSlug);

  return (
    <div className="portfolio-public">
      <div className="portfolio-preloader preloader" aria-hidden="true">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path id="preloaderSvg" d="M0,1005S175,995,500,995s500,5,500,5V0H0Z" />
        </svg>
        <div className="preloader-heading">
          <div className="load-text">
            {"Loading".split("").map((letter) => (
              <span key={letter}>{letter}</span>
            ))}
          </div>
        </div>
      </div>
      <div id="magic-cursor" aria-hidden="true">
        <div id="ball" />
      </div>
      <button className="progress-wrap" id="scrollUp" type="button" aria-label="Back to top">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
          <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
      </button>
      <Header links={content.profile.social_links} isDetail={isProjectDetail} />
      {loading ? <div className="portfolio-loading">Loading portfolio...</div> : null}
      <main className="site-content" id="content">
        {isProjectDetail ? (
          activeProject ? (
            <ProjectDetailPage content={content} project={activeProject} />
          ) : (
            <ProjectNotFound projects={content.projects} />
          )
        ) : (
          <>
            <Hero content={content} />
            <Marquee roles={content.profile.roles} />
            <Services content={content} />
            <Projects content={content} />
            <Resume content={content} />
            <Skills content={content} />
            <Contact content={content} />
          </>
        )}
      </main>
      <Footer content={content} />
    </div>
  );
}
