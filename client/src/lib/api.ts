export type Job = {
  source_chat_id?: string;
  source_chat?: string | null;
  message_id?: number;
  subjob_index?: number;
  message_date?: string | null;
  source_url?: string | null;
  original_text?: string | null;
  job_title?: string | null;
  company?: string | null;
  location?: string | null;
  employment_type?: string | null;
  salary?: string | null;
  application_method?: string | null;
  deadline?: string | null;
  category?: string | null;
  confidence?: string | null;
  target_country?: string | null;
};

export type DashboardData = {
  jobs: Job[];
  sources: string[];
  connected: boolean;
};

const API_URL = (import.meta.env.VITE_COLLECTOR_API_URL || "").replace(/\/$/, "");

function normalizeJobs(payload: unknown): Job[] {
  if (Array.isArray(payload)) return payload as Job[];
  if (payload && typeof payload === "object" && Array.isArray((payload as { jobs?: unknown }).jobs)) {
    return (payload as { jobs: Job[] }).jobs;
  }
  return [];
}

export async function fetchDashboardData(): Promise<DashboardData> {
  if (!API_URL) return { jobs: [], sources: [], connected: false };
  try {
    const response = await fetch(`${API_URL}/public/dashboard`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`Dashboard API returned ${response.status}`);
    const payload = await response.json() as { jobs?: unknown; sources?: unknown };
    return {
      jobs: normalizeJobs(payload.jobs),
      sources: Array.isArray(payload.sources) ? payload.sources.map(String) : [],
      connected: true,
    };
  } catch (error) {
    console.warn("Dashboard API unavailable", error);
    return { jobs: [], sources: [], connected: false };
  }
}
