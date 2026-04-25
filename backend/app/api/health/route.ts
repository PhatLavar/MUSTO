export async function GET() {
  return Response.json({
    status: "ok",
    message: "MUSTO backend is running",
  });
}