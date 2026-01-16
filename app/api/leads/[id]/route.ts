import { NextResponse } from "next/server";
import {
  deleteLead,
  getLead,
  updateLead
} from "@/lib/lead-store";
import { leadSchema } from "@/lib/validators";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const lead = await getLead(params.id);
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json(lead);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const data = leadSchema.partial().parse(body);
    const lead = await updateLead(params.id, data);
    return NextResponse.json(lead);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to update lead" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await deleteLead(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to delete lead" },
      { status: 400 }
    );
  }
}
