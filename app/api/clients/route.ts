import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const clientColumns = "id, name, description, logo_url, role, company_name, start_date, end_date, is_active, order_index, created_at, updated_at";

function validateClientPayload(payload: unknown) {
  if (!payload || typeof payload !== "object") return "Payload tidak valid.";

  const data = payload as Record<string, unknown>;
  const requiredFields = ["name", "description", "role", "company_name", "start_date"];
  if (requiredFields.some((field) => typeof data[field] !== "string" || !data[field]?.trim())) {
    return "Nama, posisi, perusahaan, dan tanggal mulai wajib diisi.";
  }

  if (data.end_date && typeof data.end_date !== "string") return "Tanggal selesai tidak valid.";
  if (data.end_date && String(data.end_date) < String(data.start_date)) return "Tanggal selesai tidak boleh sebelum tanggal mulai.";
  if (data.logo_url && typeof data.logo_url !== "string") return "URL logo tidak valid.";
  return null;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Math.max(Number(params.get("page") || 1), 1);
  const pageSize = Math.min(Math.max(Number(params.get("page_size") || 20), 1), 100);
  const status = params.get("is_active");
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase.from("clients").select(clientColumns, { count: "exact" }).order("order_index", { ascending: true }).order("created_at", { ascending: false }).range(from, to);
  if (status === "true" || status === "false") query = query.eq("is_active", status === "true");

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data: data || [], pagination: { page, pageSize, total: count || 0, totalPages: Math.ceil((count || 0) / pageSize) } });
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const validationError = validateClientPayload(payload);
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const data = payload as Record<string, unknown>;
    const { data: lastClient } = await supabase.from("clients").select("order_index").order("order_index", { ascending: false }).limit(1).maybeSingle();
    const { data: client, error } = await supabase
      .from("clients")
      .insert({
        name: String(data.name).trim(),
        description: String(data.description).trim(),
        logo_url: data.logo_url || null,
        role: String(data.role).trim(),
        company_name: String(data.company_name).trim(),
        start_date: data.start_date,
        end_date: data.end_date || null,
        is_active: data.is_active !== false,
        order_index: typeof data.order_index === "number" ? data.order_index : (lastClient?.order_index ?? -1) + 1,
      })
      .select(clientColumns)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: client }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Request JSON tidak valid." }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const payload = await request.json();
    const id = typeof payload?.id === "string" ? payload.id : "";
    const validationError = validateClientPayload(payload);
    if (!id) return NextResponse.json({ error: "ID client wajib diisi." }, { status: 400 });
    if (validationError) return NextResponse.json({ error: validationError }, { status: 400 });

    const data = payload as Record<string, unknown>;
    const { data: client, error } = await supabase
      .from("clients")
      .update({
        name: String(data.name).trim(),
        description: String(data.description).trim(),
        logo_url: data.logo_url || null,
        role: String(data.role).trim(),
        company_name: String(data.company_name).trim(),
        start_date: data.start_date,
        end_date: data.end_date || null,
        is_active: data.is_active !== false,
      })
      .eq("id", id)
      .select(clientColumns)
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ data: client });
  } catch {
    return NextResponse.json({ error: "Request JSON tidak valid." }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID client wajib diisi." }, { status: 400 });
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest) {
  try {
    const payload = await request.json();
    if (!Array.isArray(payload?.items) || payload.items.some((item: unknown) => typeof item !== "object" || !item || typeof (item as { id?: unknown }).id !== "string")) {
      return NextResponse.json({ error: "Format reorder tidak valid." }, { status: 400 });
    }

    const updates = payload.items.map((item: { id: string }, index: number) => supabase.from("clients").update({ order_index: index }).eq("id", item.id));
    const results = await Promise.all(updates);
    const failed = results.find((result) => result.error);
    if (failed?.error) return NextResponse.json({ error: failed.error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Request JSON tidak valid." }, { status: 400 });
  }
}
