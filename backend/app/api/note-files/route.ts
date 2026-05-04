import { supabase } from "@/lib/supabase";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { note_id, file_name, file_path, file_type, file_size } = body;
  
  if (!note_id || !file_name || !file_path) {
    return Response.json(
      { message: "note_id, file_name and file_path are required" },
      { status: 400, headers: corsHeaders }
    );
  }

  const { data, error } = await supabase
    .from("note_files")
    .insert({
      note_id,
      file_name,
      file_path,
      file_type,
      file_size,
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
