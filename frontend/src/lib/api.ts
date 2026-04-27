export async function getHealth() {
  const res = await fetch("http://localhost:3000/api/health");

  if (!res.ok) {
    throw new Error("Failed to fetch!");
  }

  return res.json();
}

export async function getTodos() {
  const res = await fetch("http://localhost:3000/api/todos");

  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }

  return res.json();
}

export async function createTodo(title: string) {
  const res = await fetch("http://localhost:3000/api/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return res.json();
}