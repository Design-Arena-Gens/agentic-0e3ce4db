import Link from "next/link";
import { formatDistanceToNow, parseISO } from "date-fns";
import { Lead } from "@/lib/lead-store";
import { Badge } from "./ui/badge";
import { leadStatusOptions } from "@/lib/validators";

const statusIntent: Record<Lead["status"], "default" | "success" | "warning" | "danger"> = {
  new: "warning",
  contacted: "default",
  qualified: "success",
  lost: "danger",
  won: "success"
};

const statusLabel: Record<Lead["status"], string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  lost: "Lost",
  won: "Won"
};

type LeadTableProps = {
  leads: Lead[];
};

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Lead
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Company
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Source
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Created
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
              Tags
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {leads.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">
                No leads yet. Connect your form to start capturing leads.
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-slate-50">
                <td className="px-4 py-4 text-sm">
                  <div className="font-medium text-slate-900">{lead.name}</div>
                  <Link
                    href={`mailto:${lead.email}`}
                    className="text-xs text-brand hover:underline"
                  >
                    {lead.email}
                  </Link>
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {lead.company || "—"}
                </td>
                <td className="px-4 py-4 text-sm">
                  <Badge
                    text={statusLabel[lead.status]}
                    variant={statusIntent[lead.status]}
                  />
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {lead.source || "Website"}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  {formatDistanceToNow(parseISO(lead.createdAt), {
                    addSuffix: true
                  })}
                </td>
                <td className="px-4 py-4 text-sm text-slate-600">
                  <div className="flex flex-wrap gap-2">
                    {lead.tags.length > 0 ? (
                      lead.tags.map((tag) => (
                        <Badge key={tag} text={tag} variant="default" />
                      ))
                    ) : (
                      <span className="text-xs text-slate-400">No tags</span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}
