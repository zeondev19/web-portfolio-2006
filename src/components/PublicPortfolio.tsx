import { useMemo, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
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

function Header({ links }: { links: SocialLinks }) {
  return (
    <header className="tj-header-area header-3 header-4 header-absolute portfolio-header">
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex flex-wrap justify-content-between align-items-center">
            <a className="portfolio-logo" href="#top" aria-label="Back to top">
              ZD
            </a>
            <nav className="portfolio-nav" aria-label="Primary navigation">
              {navItems.map(([label, href]) => (
                <a href={href} key={href}>
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
                  <img src={profile.hero_image_url} alt={profile.name} />
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
                <a href="#contact" className="btn tj-btn-primary">
                  Hire Me <ArrowUpRight size={18} />
                </a>
              </div>
              <div className="tj-hero-4-bottom-counter">
                {profile.stats.map((stat) => (
                  <div className="tj-hero-4-bottom-counter-item" key={stat.label}>
                    <div className="funfact-item d-flex flex-column flex-sm-row flex-wrap align-items-center">
                    <div className="number">
                        <span data-counter-target={stat.value}>0</span>
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
  const words = [...roles, "Development", "Design Systems", "Supabase", "Frontend", "Automation"];

  return (
    <section className="tj-maquee-section style-4 portfolio-marquee">
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
                  <div className="tj-project-4-thumb" data-cursor="View More">
                    <img src={projectImage(project)} alt={project.title} />
                  </div>
                  <div className="tj-project-4-content">
                    <span className="tj-project-4-subtitle">
                      {project.tech_stack?.[0] ?? "Project"}
                    </span>
                    <h4 className="tj-project-4-title">{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="portfolio-tags">
                      {project.tech_stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <div className="portfolio-card-actions">
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
        <div className="row">
          {content.skills.map((skill) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={skill.id ?? skill.name}>
              <article className="progress-single portfolio-skill-card tilt-card">
                <div className="progress-text">
                  <div className="icon-box">
                    <img src={skill.icon || "/images/figma.svg"} alt="" />
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
      <Header links={content.profile.social_links} />
      {loading ? <div className="portfolio-loading">Loading portfolio...</div> : null}
      <main className="site-content" id="content">
        <Hero content={content} />
        <Marquee roles={content.profile.roles} />
        <Services content={content} />
        <Projects content={content} />
        <Resume content={content} />
        <Skills content={content} />
        <Contact content={content} />
      </main>
      <Footer content={content} />
    </div>
  );
}
