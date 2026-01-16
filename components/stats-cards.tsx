import { Lead } from "@/lib/lead-store";
import { format, parseISO } from "date-fns";
import { Users, Trophy, ClipboardList, Phone } from "lucide-react";

type StatsCardsProps = {
  leads: Lead[];
};

function calculateStats(leads: Lead[]) {
  const total = leads.length;
  const won = leads.filter((lead) => lead.status === "won").length;
  const contacted = leads.filter((lead) => lead.status !== "new").length;
  const recent = leads
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 1)
    .map((lead) => format(parseISO(lead.createdAt), "PP p"))
    .at(0);

  return {
    total,
    won,
    contacted,
    recent
  };
}

const cards = [
  {
    title: "Total Leads",
    icon: Users,
    key: "total" as const
  },
  {
    title: "Won Deals",
    icon: Trophy,
    key: "won" as const
  },
  {
    title: "Contacted",
    icon: Phone,
    key: "contacted" as const
  },
  {
    title: "Latest Lead",
    icon: ClipboardList,
    key: "recent" as const
  }
];

export function StatsCards({ leads }: StatsCardsProps) {
  const stats = calculateStats(leads);

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map(({ title, icon: Icon, key }) => (
        <div
          key={title}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <span className="rounded-full bg-brand/10 p-2 text-brand">
              <Icon size={18} />
            </span>
          </div>
          <p className="mt-3 text-2xl font-semibold text-slate-900">
            {stats[key] ?? "—"}
          </p>
        </div>
      ))}
    </section>
  );
}
