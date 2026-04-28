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
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return Response.json(
      { message: "File is required" },
      { status: 400, headers: corsHeaders }
    );
  }

  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("note-files")
    .upload(fileName, file);

  if (error) {
    return Response.json(
      { message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from("note-files")
    .getPublicUrl(fileName);

  return Response.json(
    {
      file_name: file.name,
      file_path: data.path,
      file_url: publicUrlData.publicUrl,
      file_type: file.type,
      file_size: file.size,
    },
    { headers: corsHeaders }
  );
}