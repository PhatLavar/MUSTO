type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

let todos: Todo[] = [
  { id: "1", title: "Design dashboard layout", isCompleted: true },
  { id: "2", title: "Create todo API", isCompleted: false },
];

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  return Response.json(todos, {
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

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title: body.title,
    isCompleted: false,
  };

  todos.unshift(newTodo);

  return Response.json(newTodo, {
    status: 201,
    headers: corsHeaders,
  });
}