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

export async function updateTodo(id: string, is_completed: boolean) {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ is_completed }),
  });

  if (!res.ok) {
    throw new Error("Failed to update todo");
  }

  return res.json();
}

export async function deleteTodo(id: string) {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }

  return res.json();
}

export async function getNotes() {
  const res = await fetch("http://localhost:3000/api/notes");

  if (!res.ok) {
    throw new Error("Failed to fetch notes");
  }

  return res.json();
}

export async function createNote(title: string, content: string) {
  const res = await fetch("http://localhost:3000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content }),
  });

  if (!res.ok) {
    throw new Error("Failed to create note");
  }

  return res.json();
}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to upload file");
  }

  return res.json();
}

export async function createNoteFile(input: {
  note_id: string;
  file_name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
}) {
  const res = await fetch("http://localhost:3000/api/note-files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!res.ok) {
    throw new Error("Failed to create note file");
  }

  return res.json();
}