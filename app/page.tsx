import { listLeads } from "@/lib/lead-store";
import { StatsCards } from "@/components/stats-cards";
import { LeadPipeline } from "@/components/lead-pipeline";
import { LeadTable } from "@/components/lead-table";
import { NewLeadForm } from "@/components/new-lead-form";
import { EmbedSnippet } from "@/components/embed-snippet";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const leads = await listLeads();

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pt-12">
        <header className="rounded-3xl border border-slate-200 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-xl">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold md:text-4xl">
                LeadFlow CRM
              </h1>
              <p className="mt-3 max-w-xl text-slate-300">
                Capture leads from your existing website, keep track of every
                conversation, and move deals through your pipeline with ease.
              </p>
            </div>
            <Link href="#lead-form" className="self-start">
              <Button>Capture a Lead</Button>
            </Link>
          </div>
        </header>

        <StatsCards leads={leads} />

        <section className="grid gap-6 lg:grid-cols-[1.6fr,1fr]">
          <LeadPipeline leads={leads} />
          <div className="space-y-6">
            <EmbedSnippet />
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                Zapier ready
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Use the `/api/leads` endpoint to connect with Zapier, Make, or
                custom automations.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-xs text-slate-200">
{`POST https://agentic-0e3ce4db.vercel.app/api/leads
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@company.com"
}`}
              </pre>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Lead inbox
            </h2>
            <p className="text-sm text-slate-500">
              {leads.length} lead{leads.length === 1 ? "" : "s"} captured
            </p>
          </div>
          <LeadTable leads={leads} />
        </section>

        <section id="lead-form">
          <NewLeadForm />
        </section>
      </div>
    </main>
  );
}
