import { supabase } from "@/lib/supabase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }

  return Response.json(data, {
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.title || typeof body.title !== "string") {
    return Response.json(
      { message: "Title is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  const { data, error } = await supabase
    .from("todos")
    .insert({
      title: body.title,
      is_completed: false,
    })
    .select()
    .single();

  if (error) {
    return Response.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }

  return Response.json(data, {
    status: 201,
    headers: corsHeaders,
  });
}