export async function GET() {
  return new Response(
    JSON.stringify({
      status: "ok",
      message: "MUSTO backend is running!",
    }),
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}