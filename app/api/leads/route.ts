import { NextResponse } from "next/server";
import {
  createLead,
  listLeads
} from "@/lib/lead-store";
import { leadSchema } from "@/lib/validators";

export async function GET() {
  const leads = await listLeads();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = leadSchema.parse(body);
    const lead = await createLead(data);
    return NextResponse.json(lead, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to create lead" },
      { status: 400 }
    );
  }
}
