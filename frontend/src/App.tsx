import { NotesPage } from "@/pages/note-page";
import { TodoPage } from "@/pages/todo-page";
import { useState } from "react";

export type AppPage = "todo" | "notes";

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>("todo");

  if (currentPage === "notes") {
    return <NotesPage currentPage={currentPage} onNavigate={setCurrentPage} />;
  }

  return <TodoPage currentPage={currentPage} onNavigate={setCurrentPage} />;
}

export default App;