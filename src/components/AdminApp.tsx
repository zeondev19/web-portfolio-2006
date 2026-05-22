import type { Session } from "@supabase/supabase-js";
import {
  BriefcaseBusiness,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Pencil,
  Plus,
  RefreshCcw,
  Save,
  ShieldAlert,
  Sparkles,
  Trash2,
  UserRound,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { defaultContent, loadContactMessages, loadPortfolioContent } from "../lib/content";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { ContactMessage, PortfolioContent, Profile } from "../lib/types";

type AdminTab = "overview" | "profile" | "projects" | "skills" | "services" | "resume" | "messages";
type AdminItem = Record<string, any> & { id?: string };
type FieldConfig = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "checkbox" | "array" | "select";
  options?: string[];
};

const tabs: Array<{ id: AdminTab; label: string; icon: JSX.Element }> = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
  { id: "profile", label: "Profile", icon: <UserRound size={18} /> },
  { id: "projects", label: "Projects", icon: <BriefcaseBusiness size={18} /> },
  { id: "skills", label: "Skills", icon: <Sparkles size={18} /> },
  { id: "services", label: "Services", icon: <ListChecks size={18} /> },
  { id: "resume", label: "Resume", icon: <Pencil size={18} /> },
  { id: "messages", label: "Messages", icon: <Inbox size={18} /> },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="admin-page">
      <div className="admin-shell">{children}</div>
    </main>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function runAuth() {
    if (!supabase) return;
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdminShell>
      <section className="admin-auth-card">
        <div>
          <span className="admin-kicker">Portfolio CMS</span>
          <h1>Admin Access</h1>
          <p>
            Private dashboard untuk akun yang sudah masuk allowlist. Tidak ada pendaftaran
            publik dari halaman ini.
          </p>
        </div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void runAuth();
          }}
        >
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              minLength={6}
              placeholder="Min. 6 characters"
            />
          </label>
          {error ? <p className="admin-error">{error}</p> : null}
          <div className="admin-auth-actions">
            <button className="admin-primary-btn" disabled={loading} type="submit">
              {loading ? "Checking..." : "Sign in"}
            </button>
          </div>
          <p className="admin-private-note">
            Only the allowlisted owner account can access CMS data.
          </p>
        </form>
      </section>
    </AdminShell>
  );
}

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return (
    <article className="admin-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function cleanPayload(item: AdminItem) {
  const { id, created_at, updated_at, ...payload } = item;
  return { id, payload };
}

function getTitle(item: AdminItem) {
  return item.title ?? item.name ?? item.subject ?? item.email ?? "Untitled";
}

function ResourceManager({
  title,
  table,
  items,
  emptyItem,
  fields,
  onRefresh,
}: {
  title: string;
  table: string;
  items: AdminItem[];
  emptyItem: AdminItem;
  fields: FieldConfig[];
  onRefresh: () => Promise<void>;
}) {
  const [form, setForm] = useState<AdminItem>(emptyItem);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function updateField(field: FieldConfig, value: string | boolean) {
    setForm((current) => ({
      ...current,
      [field.key]:
        field.type === "number"
          ? Number(value)
          : field.type === "array"
            ? String(value)
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean)
            : value,
    }));
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setMessage("");

    const { id, payload } = cleanPayload(form);
    const request = id
      ? supabase.from(table).update(payload).eq("id", id)
      : supabase.from(table).insert(payload);
    const { error } = await request;

    setSaving(false);
    if (error) {
      setMessage(error.message);
      return;
    }

    setForm(emptyItem);
    setMessage("Saved.");
    await onRefresh();
  }

  async function handleDelete(item: AdminItem) {
    if (!supabase || !item.id || !window.confirm(`Delete ${getTitle(item)}?`)) return;
    const { error } = await supabase.from(table).delete().eq("id", item.id);
    setMessage(error ? error.message : "Deleted.");
    await onRefresh();
  }

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-kicker">{title}</span>
          <h2>{title}</h2>
        </div>
        <button className="admin-ghost-btn" onClick={() => setForm(emptyItem)} type="button">
          <Plus size={16} /> New
        </button>
      </div>
      <div className="admin-grid-two">
        <form className="admin-form" onSubmit={handleSubmit}>
          {fields.map((field) => {
            const value = form[field.key];
            if (field.type === "textarea") {
              return (
                <label key={field.key}>
                  {field.label}
                  <textarea value={value ?? ""} onChange={(event) => updateField(field, event.target.value)} />
                </label>
              );
            }
            if (field.type === "checkbox") {
              return (
                <label className="admin-check" key={field.key}>
                  <input
                    checked={Boolean(value)}
                    onChange={(event) => updateField(field, event.target.checked)}
                    type="checkbox"
                  />
                  {field.label}
                </label>
              );
            }
            if (field.type === "select") {
              return (
                <label key={field.key}>
                  {field.label}
                  <select value={value ?? ""} onChange={(event) => updateField(field, event.target.value)}>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            return (
              <label key={field.key}>
                {field.label}
                <input
                  value={Array.isArray(value) ? value.join(", ") : value ?? ""}
                  onChange={(event) => updateField(field, event.target.value)}
                  type={field.type === "number" ? "number" : "text"}
                />
              </label>
            );
          })}
          {message ? <p className={message === "Saved." || message === "Deleted." ? "admin-success" : "admin-error"}>{message}</p> : null}
          <button className="admin-primary-btn" disabled={saving} type="submit">
            <Save size={16} /> {saving ? "Saving..." : "Save"}
          </button>
        </form>
        <div className="admin-list">
          {items.map((item) => (
            <article className="admin-list-item" key={item.id ?? getTitle(item)}>
              <div>
                <strong>{getTitle(item)}</strong>
                <span>{item.kind ?? item.category ?? item.slug ?? item.email ?? "Content item"}</span>
              </div>
              <div className="admin-row-actions">
                <button className="admin-icon-btn" onClick={() => setForm(item)} type="button" aria-label="Edit">
                  <Pencil size={16} />
                </button>
                <button className="admin-icon-btn danger" onClick={() => void handleDelete(item)} type="button" aria-label="Delete">
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProfileForm({ profile, onRefresh }: { profile: Profile; onRefresh: () => Promise<void> }) {
  const [form, setForm] = useState(profile);
  const [roles, setRoles] = useState(profile.roles.join(", "));
  const [socialLinks, setSocialLinks] = useState(JSON.stringify(profile.social_links, null, 2));
  const [stats, setStats] = useState(JSON.stringify(profile.stats, null, 2));
  const [message, setMessage] = useState("");

  useEffect(() => {
    setForm(profile);
    setRoles(profile.roles.join(", "));
    setSocialLinks(JSON.stringify(profile.social_links, null, 2));
    setStats(JSON.stringify(profile.stats, null, 2));
  }, [profile]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!supabase) return;

    try {
      const payload = {
        ...form,
        id: true,
        roles: roles
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        social_links: JSON.parse(socialLinks),
        stats: JSON.parse(stats),
      };
      const { error } = await supabase.from("portfolio_profile").upsert(payload, { onConflict: "id" });
      if (error) throw error;
      setMessage("Profile saved.");
      await onRefresh();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Profile failed to save.");
    }
  }

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-kicker">Identity</span>
          <h2>Profile</h2>
        </div>
      </div>
      <form className="admin-form profile-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
        </label>
        <label>
          Eyebrow
          <input value={form.eyebrow} onChange={(event) => setForm({ ...form, eyebrow: event.target.value })} />
        </label>
        <label>
          Headline
          <input value={form.headline} onChange={(event) => setForm({ ...form, headline: event.target.value })} />
        </label>
        <label>
          Bio
          <textarea value={form.bio} onChange={(event) => setForm({ ...form, bio: event.target.value })} />
        </label>
        <label>
          Roles
          <input value={roles} onChange={(event) => setRoles(event.target.value)} />
        </label>
        <label>
          Hero Image URL
          <input value={form.hero_image_url} onChange={(event) => setForm({ ...form, hero_image_url: event.target.value })} />
        </label>
        <label>
          Resume URL
          <input value={form.resume_url} onChange={(event) => setForm({ ...form, resume_url: event.target.value })} />
        </label>
        <label>
          Email
          <input value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label>
          Phone
          <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
        </label>
        <label>
          Location
          <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} />
        </label>
        <label>
          Availability
          <input value={form.availability} onChange={(event) => setForm({ ...form, availability: event.target.value })} />
        </label>
        <label>
          Social Links JSON
          <textarea value={socialLinks} onChange={(event) => setSocialLinks(event.target.value)} />
        </label>
        <label>
          Stats JSON
          <textarea value={stats} onChange={(event) => setStats(event.target.value)} />
        </label>
        {message ? <p className={message === "Profile saved." ? "admin-success" : "admin-error"}>{message}</p> : null}
        <button className="admin-primary-btn" type="submit">
          <Save size={16} /> Save Profile
        </button>
      </form>
    </section>
  );
}

function MessagesPanel({ messages, onRefresh }: { messages: ContactMessage[]; onRefresh: () => Promise<void> }) {
  async function updateStatus(message: ContactMessage, status: ContactMessage["status"]) {
    if (!supabase) return;
    await supabase.from("portfolio_contacts").update({ status }).eq("id", message.id);
    await onRefresh();
  }

  return (
    <section className="admin-panel">
      <div className="admin-panel-heading">
        <div>
          <span className="admin-kicker">Inbox</span>
          <h2>Messages</h2>
        </div>
      </div>
      <div className="admin-message-list">
        {messages.length ? (
          messages.map((message) => (
            <article className="admin-message" key={message.id}>
              <div className="admin-message-head">
                <div>
                  <strong>{message.subject}</strong>
                  <span>
                    {message.name} - {message.email}
                  </span>
                </div>
                <select value={message.status} onChange={(event) => void updateStatus(message, event.target.value as ContactMessage["status"])}>
                  <option value="new">new</option>
                  <option value="read">read</option>
                  <option value="replied">replied</option>
                  <option value="archived">archived</option>
                </select>
              </div>
              <p>{message.message}</p>
              <small>{new Date(message.created_at).toLocaleString()}</small>
            </article>
          ))
        ) : (
          <p className="admin-muted">No messages yet.</p>
        )}
      </div>
    </section>
  );
}

function Dashboard({ session }: { session: Session }) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [content, setContent] = useState<PortfolioContent>(defaultContent);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  async function refresh() {
    const [nextContent, nextMessages] = await Promise.all([
      loadPortfolioContent(),
      loadContactMessages().catch(() => []),
    ]);
    setContent(nextContent);
    setMessages(nextMessages);
  }

  useEffect(() => {
    async function checkAdmin() {
      if (!supabase) return;
      const { data } = await supabase
        .from("portfolio_admin_users")
        .select("user_id")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (data) {
        setIsAdmin(true);
        await refresh();
        return;
      }

      setIsAdmin(false);
    }

    void checkAdmin();
  }, [session.user.id]);

  const metrics = useMemo(
    () => [
      ["Projects", content.projects.length],
      ["Skills", content.skills.length],
      ["Services", content.services.length],
      ["Messages", messages.length],
    ],
    [content, messages],
  );

  if (isAdmin === null) {
    return (
      <AdminShell>
        <p className="admin-muted">Checking admin access...</p>
      </AdminShell>
    );
  }

  if (!isAdmin) {
    return (
      <AdminShell>
        <section className="admin-auth-card">
          <ShieldAlert size={42} />
          <h1>Access not allowed</h1>
          <p>Akun ini belum terdaftar di `portfolio_admin_users`.</p>
          <button className="admin-ghost-btn" onClick={() => supabase?.auth.signOut()} type="button">
            Back to login
          </button>
        </section>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/">
          ZD
          <span>Portfolio CMS</span>
        </a>
        <nav>
          {tabs.map((tab) => (
            <button
              className={activeTab === tab.id ? "active" : ""}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
        <button className="admin-logout" onClick={() => supabase?.auth.signOut()} type="button">
          <LogOut size={18} /> Sign out
        </button>
      </aside>
      <section className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker">Private CMS</span>
            <h1>Portfolio Control Room</h1>
            <p className="admin-session-email">{session.user.email}</p>
          </div>
          <div className="admin-topbar-actions">
            <a className="admin-ghost-btn" href="/" target="_blank" rel="noreferrer">
              <ExternalLink size={16} /> View Site
            </a>
            <button className="admin-ghost-btn" onClick={() => void refresh()} type="button">
              <RefreshCcw size={16} /> Refresh
            </button>
          </div>
        </header>
        {activeTab === "overview" ? (
          <section className="admin-overview">
            <div className="admin-metrics">
              {metrics.map(([label, value]) => (
                <MetricCard key={label} label={String(label)} value={value} />
              ))}
            </div>
            <div className="admin-overview-grid">
              <div className="admin-panel admin-home-panel">
                <span className="admin-kicker">System</span>
                <h2>Private CMS is locked</h2>
                <p>
                  Portfolio publik membaca konten published. Semua perubahan admin
                  diproteksi Supabase Auth dan allowlist `portfolio_admin_users`.
                </p>
                <div className="admin-health-list">
                  <span>RLS enabled</span>
                  <span>Signup UI removed</span>
                  <span>Owner-only mutations</span>
                </div>
              </div>
              <div className="admin-panel admin-home-panel">
                <span className="admin-kicker">Quick edit</span>
                <h2>{content.profile.name}</h2>
                <p>{content.profile.headline}</p>
                <div className="admin-quick-actions">
                  <button className="admin-ghost-btn" onClick={() => setActiveTab("profile")} type="button">
                    Edit Profile
                  </button>
                  <button className="admin-ghost-btn" onClick={() => setActiveTab("projects")} type="button">
                    Manage Projects
                  </button>
                </div>
              </div>
              <div className="admin-panel admin-home-panel">
                <span className="admin-kicker">Latest inbox</span>
                <h2>{messages.length ? messages[0].subject : "No messages yet"}</h2>
                <p>
                  {messages.length
                    ? `${messages[0].name} - ${messages[0].email}`
                    : "Pesan contact form akan masuk ke sini."}
                </p>
                <button className="admin-ghost-btn" onClick={() => setActiveTab("messages")} type="button">
                  Open Inbox
                </button>
              </div>
            </div>
          </section>
        ) : null}
        {activeTab === "profile" ? <ProfileForm profile={content.profile} onRefresh={refresh} /> : null}
        {activeTab === "projects" ? (
          <ResourceManager
            title="Projects"
            table="portfolio_projects"
            items={content.projects}
            emptyItem={{
              title: "",
              slug: "",
              description: "",
              tech_stack: [],
              project_url: "#",
              repository_url: "#",
              image_url: "/images/1_1.jpg",
              image_path: "",
              sort_order: 10,
              is_featured: true,
              is_published: true,
            }}
            fields={[
              { key: "title", label: "Title" },
              { key: "slug", label: "Slug" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "tech_stack", label: "Tech Stack", type: "array" },
              { key: "project_url", label: "Project URL" },
              { key: "repository_url", label: "Repository URL" },
              { key: "image_url", label: "Image URL" },
              { key: "sort_order", label: "Sort Order", type: "number" },
              { key: "is_featured", label: "Featured", type: "checkbox" },
              { key: "is_published", label: "Published", type: "checkbox" },
            ]}
            onRefresh={refresh}
          />
        ) : null}
        {activeTab === "skills" ? (
          <ResourceManager
            title="Skills"
            table="portfolio_skills"
            items={content.skills}
            emptyItem={{
              name: "",
              category: "Frontend",
              level: 80,
              icon: "/images/figma.svg",
              sort_order: 10,
              is_visible: true,
            }}
            fields={[
              { key: "name", label: "Name" },
              { key: "category", label: "Category" },
              { key: "level", label: "Level", type: "number" },
              { key: "icon", label: "Icon URL" },
              { key: "sort_order", label: "Sort Order", type: "number" },
              { key: "is_visible", label: "Visible", type: "checkbox" },
            ]}
            onRefresh={refresh}
          />
        ) : null}
        {activeTab === "services" ? (
          <ResourceManager
            title="Services"
            table="portfolio_services"
            items={content.services}
            emptyItem={{
              title: "",
              description: "",
              icon_class: "flaticon-code",
              sort_order: 10,
              is_visible: true,
            }}
            fields={[
              { key: "title", label: "Title" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "icon_class", label: "Icon Class" },
              { key: "sort_order", label: "Sort Order", type: "number" },
              { key: "is_visible", label: "Visible", type: "checkbox" },
            ]}
            onRefresh={refresh}
          />
        ) : null}
        {activeTab === "resume" ? (
          <ResourceManager
            title="Resume"
            table="portfolio_experiences"
            items={content.experiences}
            emptyItem={{
              kind: "experience",
              title: "",
              organization: "",
              date_label: "",
              description: "",
              sort_order: 10,
              is_visible: true,
            }}
            fields={[
              { key: "kind", label: "Kind", type: "select", options: ["experience", "education", "award"] },
              { key: "title", label: "Title" },
              { key: "organization", label: "Organization" },
              { key: "date_label", label: "Date Label" },
              { key: "description", label: "Description", type: "textarea" },
              { key: "sort_order", label: "Sort Order", type: "number" },
              { key: "is_visible", label: "Visible", type: "checkbox" },
            ]}
            onRefresh={refresh}
          />
        ) : null}
        {activeTab === "messages" ? <MessagesPanel messages={messages} onRefresh={refresh} /> : null}
      </section>
    </AdminShell>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <AdminShell>
        <section className="admin-auth-card">
          <ShieldAlert size={42} />
          <h1>Supabase belum dikonfigurasi</h1>
          <p>Isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_PUBLISHABLE_KEY` di `.env.local`.</p>
        </section>
      </AdminShell>
    );
  }

  if (!ready) {
    return (
      <AdminShell>
        <p className="admin-muted">Preparing admin...</p>
      </AdminShell>
    );
  }

  return session ? <Dashboard session={session} /> : <LoginForm />;
}
