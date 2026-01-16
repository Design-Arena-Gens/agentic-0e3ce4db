import { Lead } from "@/lib/lead-store";
import { leadStatusOptions } from "@/lib/validators";
import { format, parseISO } from "date-fns";
import { Badge } from "./ui/badge";

const statusLabels: Record<Lead["status"], string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  lost: "Lost",
  won: "Won"
};

type LeadPipelineProps = {
  leads: Lead[];
};

export function LeadPipeline({ leads }: LeadPipelineProps) {
  const grouped = leadStatusOptions.reduce(
    (acc, status) => ({
      ...acc,
      [status]: leads.filter((lead) => lead.status === status)
    }),
    {} as Record<Lead["status"], Lead[]>
  );

  return (
    <section className="grid gap-4 lg:grid-cols-5">
      {leadStatusOptions.map((status) => (
        <div
          key={status}
          className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50"
        >
          <header className="flex items-center justify-between rounded-t-2xl border-b border-slate-200 bg-white px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-700">
              {statusLabels[status]}
            </h3>
            <Badge text={`${grouped[status].length}`} />
          </header>
          <div className="flex-1 space-y-3 p-3">
            {grouped[status].length === 0 ? (
              <p className="text-sm text-slate-400">No leads</p>
            ) : (
              grouped[status].map((lead) => (
                <article
                  key={lead.id}
                  className="space-y-2 rounded-xl border border-white bg-white p-3 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {lead.name}
                    </p>
                    <p className="text-xs text-slate-500">{lead.company}</p>
                  </div>
                  <p className="text-xs text-slate-500">
                    Added {format(parseISO(lead.createdAt), "PP")}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lead.tags.map((tag) => (
                      <Badge key={tag} text={tag} variant="success" />
                    ))}
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
