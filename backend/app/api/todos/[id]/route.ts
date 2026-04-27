type Todo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

declare global {
  var todos: Todo[] | undefined;
}

if (!globalThis.todos) {
  globalThis.todos = [
    { id: "1", title: "Design dashboard layout", isCompleted: true },
    { id: "2", title: "Create todo API", isCompleted: false },
  ];
}

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

  const todos = globalThis.todos!;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return Response.json(
      { message: "Todo not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    isCompleted: body.isCompleted,
  };

  return Response.json(todos[todoIndex], {
    headers: corsHeaders,
  });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const todos = globalThis.todos!;
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) {
    return Response.json(
      { message: "Todo not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  const deletedTodo = todos[todoIndex];
  todos.splice(todoIndex, 1);

  return Response.json(deletedTodo, {
    headers: corsHeaders,
  });
}