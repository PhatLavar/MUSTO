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

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("todos")
    .update({
      is_completed: body.is_completed,
    })
    .eq("id", id)
    .select()
    .single();

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

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select()
    .single();

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