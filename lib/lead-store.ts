import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
import path from "path";

export type LeadStatus = "new" | "contacted" | "qualified" | "lost" | "won";

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  status: LeadStatus;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  source?: string;
  owner?: string;
  lastContactedAt?: string;
}

type LeadPayload = Omit<
  Lead,
  "id" | "createdAt" | "updatedAt" | "lastContactedAt"
> & { lastContactedAt?: string };

const DATA_FILE = path.join(process.cwd(), "data", "leads.json");

async function readLeads(): Promise<Lead[]> {
  const data = await readFile(DATA_FILE, "utf-8");
  return JSON.parse(data) as Lead[];
}

async function writeLeads(leads: Lead[]) {
  await writeFile(DATA_FILE, JSON.stringify(leads, null, 2));
}

export async function listLeads(): Promise<Lead[]> {
  const leads = await readLeads();
  return leads.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getLead(id: string): Promise<Lead | undefined> {
  const leads = await readLeads();
  return leads.find((lead) => lead.id === id);
}

export async function createLead(
  payload: Omit<LeadPayload, "status" | "tags"> & {
    status?: LeadStatus;
    tags?: string[];
  }
): Promise<Lead> {
  const now = new Date().toISOString();
  const lead: Lead = {
    id: randomUUID(),
    name: payload.name.trim(),
    email: payload.email.toLowerCase(),
    phone: payload.phone?.trim(),
    company: payload.company?.trim(),
    message: payload.message?.trim(),
    status: payload.status ?? "new",
    tags: payload.tags?.map((tag) => tag.trim()).filter(Boolean) ?? [],
    createdAt: now,
    updatedAt: now,
    source: payload.source?.trim(),
    owner: payload.owner?.trim(),
    lastContactedAt: payload.lastContactedAt
  };

  const leads = await readLeads();
  leads.push(lead);
  await writeLeads(leads);

  return lead;
}

export async function updateLead(
  id: string,
  payload: Partial<LeadPayload>
): Promise<Lead> {
  const leads = await readLeads();
  const index = leads.findIndex((lead) => lead.id === id);

  if (index === -1) {
    throw new Error("Lead not found");
  }

  const now = new Date().toISOString();
  const current = leads[index];
  const updated: Lead = {
    ...current,
    ...payload,
    tags:
      payload.tags?.map((tag) => tag.trim()).filter(Boolean) ?? current.tags,
    updatedAt: now,
    lastContactedAt: payload.lastContactedAt ?? current.lastContactedAt
  };

  leads[index] = updated;
  await writeLeads(leads);

  return updated;
}

export async function deleteLead(id: string): Promise<void> {
  const leads = await readLeads();
  const filtered = leads.filter((lead) => lead.id !== id);
  await writeLeads(filtered);
}
