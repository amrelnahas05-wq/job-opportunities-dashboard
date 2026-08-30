import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  ArrowUpLeft,
  BellRing,
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ExternalLink,
  Filter,
  Link2,
  MapPin,
  Menu,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Target,
  Wifi,
  WifiOff,
  X,
} from "lucide-react";
import { fetchDashboardData, type DashboardData, type Job } from "@/lib/api";

const LOGO_URL = "/manus-storage/desert-signal-logo_7de8bedd.png";
const HERO_URL = "/manus-storage/desert-signal-hero_18e4372c.jpg";
const CONTOURS_URL = "/manus-storage/desert-signal-contours_10b27dc6.jpg";

const categoryLabels: Record<string, string> = {
  technology: "تقنية",
  design: "تصميم",
  marketing: "تسويق",
  administration: "إدارة",
  finance: "مالية",
  civil_construction: "هندسة مدنية",
  electrical: "كهرباء",
  mechanical: "ميكانيكا",
  sales: "مبيعات",
  education: "تعليم",
  healthcare: "صحة",
  logistics: "لوجستيات",
  other: "متنوع",
};

const formatDate = (value?: string | null) => {
  if (!value) return "غير محدد";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("ar-EG", { day: "numeric", month: "short" }).format(date);
};

const categoryName = (value?: string | null) => (value ? categoryLabels[value] ?? value : "غير مصنف");

function StatusPill({ connected }: { connected: boolean }) {
  return (
    <span className={`status-pill ${connected ? "status-pill--live" : "status-pill--offline"}`}>
      {connected ? <Wifi size={13} /> : <WifiOff size={13} />}
      {connected ? "متصل الآن" : "وضع المعاينة"}
    </span>
  );
}

function JobCard({ job, index }: { job: Job; index: number }) {
  const title = job.job_title || "فرصة عمل بدون مسمى واضح";
  const source = job.source_chat || "مصدر غير محدد";
  const description = job.original_text || "لا يوجد نص أصلي متاح لهذه الفرصة.";
  return (
    <article className="job-card" style={{ "--stagger": `${index * 45}ms` } as CSSProperties}>
      <div className="job-card__signal" />
      <div className="job-card__topline">
        <span className="job-card__category">{categoryName(job.category)}</span>
        <span className="job-card__date"><CalendarDays size={14} /> {formatDate(job.message_date)}</span>
      </div>
      <div className="job-card__body">
        <div>
          <h3>{title}</h3>
          <p className="job-card__company">{job.company || "جهة غير محددة"}</p>
        </div>
        <span className={`confidence confidence--${job.confidence || "low"}`}>
          {job.confidence === "high" ? "واضحة" : job.confidence === "medium" ? "مراجعة" : "تحتاج تحقق"}
        </span>
      </div>
      <p className="job-card__excerpt">{description.length > 190 ? `${description.slice(0, 190)}…` : description}</p>
      <div className="job-card__meta">
        <span><MapPin size={14} /> {job.location || "الموقع غير محدد"}</span>
        <span><Link2 size={14} /> {job.application_method || "طريقة التقديم غير محددة"}</span>
      </div>
      <div className="job-card__footer">
        <span className="job-card__source"><BellRing size={13} /> {source}</span>
        {job.source_url ? (
          <a className="source-link" href={job.source_url} target="_blank" rel="noreferrer">
            افتح المصدر <ExternalLink size={14} />
          </a>
        ) : <span className="source-link source-link--muted">المصدر غير متاح</span>}
      </div>
    </article>
  );
}

function EmptyState({ connected }: { connected: boolean }) {
  return (
    <div className="empty-state">
      <div className="empty-state__mark"><Target size={24} /></div>
      <div>
        <p className="eyebrow">{connected ? "بانتظار الإشارة" : "ربط البيانات مطلوب"}</p>
        <h3>{connected ? "لا توجد فرص مطابقة بعد" : "هذه الواجهة جاهزة للاتصال"}</h3>
        <p>{connected ? "جرّب تغيير الفلاتر أو عد لاحقاً عندما تصل فرصة جديدة." : "أضف رابط واجهة جامع الفرص في إعدادات البيئة لعرض البيانات الحقيقية هنا."}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [data, setData] = useState<DashboardData>({ jobs: [], sources: [], connected: false });
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const next = await fetchDashboardData();
    setData(next);
    setLoading(false);
  };

  useEffect(() => { void load(); }, []);

  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    data.jobs.forEach((job) => counts.set(job.category || "other", (counts.get(job.category || "other") || 0) + 1));
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }, [data.jobs]);

  const filteredJobs = useMemo(() => {
    const needle = search.trim().toLocaleLowerCase();
    return data.jobs.filter((job) => {
      const haystack = [job.job_title, job.company, job.location, job.original_text, job.category].filter(Boolean).join(" ").toLocaleLowerCase();
      return (!needle || haystack.includes(needle)) && (activeCategory === "all" || (job.category || "other") === activeCategory) && (sourceFilter === "all" || job.source_chat === sourceFilter);
    });
  }, [activeCategory, data.jobs, search, sourceFilter]);

  const latestLabel = data.jobs.length ? formatDate(data.jobs[0]?.message_date) : "بانتظار أول دفعة";

  return (
    <div className="site-shell">
      <aside className="side-rail">
        <div className="brand-lockup">
          <img src={LOGO_URL} alt="" className="brand-mark" />
          <div>
            <span className="brand-kicker">FIELD NOTES</span>
            <strong>إشارة</strong>
          </div>
        </div>
        <nav className="rail-nav" aria-label="التنقل الرئيسي">
          <a className="rail-nav__item rail-nav__item--active" href="#opportunities"><Sparkles size={17} /> الفرص الحالية</a>
          <a className="rail-nav__item" href="#sources"><BookOpen size={17} /> المصادر</a>
          <a className="rail-nav__item" href="#about"><ArrowUpLeft size={17} /> عن اللوحة</a>
        </nav>
        <div className="rail-note">
          <span className="rail-note__line" />
          <p>كل فرصة تبدأ<br />بإشارة صغيرة.</p>
        </div>
        <div className="rail-footer">
          <span>JOB SIGNALS / 01</span>
          <span>2026</span>
        </div>
      </aside>

      <main className="content-field">
        <header className="topbar">
          <button className="mobile-menu" type="button" aria-label="فتح القائمة"><Menu size={20} /></button>
          <div className="topbar__crumb"><span>لوحة الفرص</span><ChevronLeft size={14} /><strong>المشهد اليومي</strong></div>
          <div className="topbar__actions"><StatusPill connected={data.connected} /><button className="refresh-button" type="button" onClick={() => void load()} aria-label="تحديث البيانات"><RefreshCw size={16} className={loading ? "spin" : ""} /></button></div>
        </header>

        <section className="hero-panel" style={{ backgroundImage: `linear-gradient(90deg, rgba(246,240,229,.98) 0%, rgba(246,240,229,.88) 45%, rgba(246,240,229,.2) 100%), url(${HERO_URL})` }}>
          <div className="hero-copy" dir="rtl">
            <p className="eyebrow">لوحة متابعة · تحديث مستمر</p>
            <h1>فرص تستحق<br /><em>وقتَك.</em></h1>
            <p className="hero-copy__intro">مساحة هادئة لفرز فرص العمل العربية. نحتفظ بالمصدر، نوضح الإشارة، ونترك قرار التقديم لك.</p>
          </div>
          <div className="hero-note" dir="rtl">
            <div className="hero-note__index">01 / <span>FIELD REPORT</span></div>
            <p>اللقطة الأحدث</p>
            <strong>{latestLabel}</strong>
            <span className="hero-note__rule" />
            <small>{data.connected ? "البيانات متصلة بمصدر الفرص" : "بانتظار تفعيل واجهة البيانات"}</small>
          </div>
        </section>

        <section className="stat-strip" aria-label="ملخص البيانات">
          <div className="stat-item"><span>إجمالي الفرص</span><strong>{data.jobs.length || "—"}</strong></div>
          <div className="stat-item"><span>مصادر نشطة</span><strong>{data.sources.length || "—"}</strong></div>
          <div className="stat-item"><span>آخر تحديث</span><strong>{latestLabel}</strong></div>
          <div className="stat-item stat-item--accent"><span>حالة النظام</span><strong>{data.connected ? "متصل" : "جاهز للربط"}</strong></div>
        </section>

        <div className="workspace" id="opportunities">
          <aside className={`filter-panel ${mobileFilters ? "filter-panel--open" : ""}`}>
            <div className="filter-panel__header"><div><p className="eyebrow">تضييق المشهد</p><h2>الفلاتر</h2></div><button className="mobile-close" onClick={() => setMobileFilters(false)} aria-label="إغلاق الفلاتر"><X size={18} /></button></div>
            <label className="search-field"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث في الفرص…" aria-label="البحث في الفرص" /></label>
            <div className="filter-group"><span className="filter-label">التخصص</span><button className={`filter-option ${activeCategory === "all" ? "is-active" : ""}`} onClick={() => setActiveCategory("all")}><span>كل التخصصات</span><b>{data.jobs.length || "—"}</b></button>{categories.map(([category, count]) => <button key={category} className={`filter-option ${activeCategory === category ? "is-active" : ""}`} onClick={() => setActiveCategory(category)}><span>{categoryName(category)}</span><b>{count}</b></button>)}</div>
            <div className="filter-group" id="sources"><span className="filter-label">المصدر</span><select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)} aria-label="تصفية حسب المصدر"><option value="all">كل المصادر</option>{data.sources.map((source) => <option value={source} key={source}>{source}</option>)}</select></div>
            <div className="filter-footnote"><SlidersHorizontal size={15} /><span>تُحفظ الفلاتر<br />في هذه الجلسة فقط.</span></div>
          </aside>

          <section className="opportunity-stream">
            <div className="stream-header"><div><p className="eyebrow">سجل الفرص</p><h2>المشهد المفتوح <span>{filteredJobs.length}</span></h2></div><button className="filter-toggle" type="button" onClick={() => setMobileFilters(true)}><Filter size={16} /> الفلاتر</button><div className="stream-meta"><span>ترتيب: الأحدث</span><span className="meta-dot" /> <span>عربي / English</span></div></div>
            {loading ? <div className="loading-state"><RefreshCw size={20} className="spin" /> جارٍ تحميل الإشارات…</div> : filteredJobs.length ? <div className="job-list">{filteredJobs.map((job, index) => <JobCard key={`${job.source_chat_id}-${job.message_id}-${job.subjob_index ?? 0}`} job={job} index={index} />)}</div> : <EmptyState connected={data.connected} />}
          </section>
        </div>

        <footer className="page-footer" id="about"><span>إشارة / لوحة فرص العمل العربية</span><span>المصدر دائماً ظاهر. القرار دائماً لك.</span></footer>
      </main>
      <div className="contour-wash" style={{ backgroundImage: `url(${CONTOURS_URL})` }} aria-hidden="true" />
    </div>
  );
}
