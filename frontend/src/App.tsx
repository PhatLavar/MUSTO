import { Navigate, Route, Routes } from "react-router-dom";
import { NotesPage } from "@/pages/note-page";
import { TodoPage } from "@/pages/todo-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todo" replace />} />
      <Route path="/todo" element={<TodoPage />} />
      <Route path="/notes" element={<NotesPage />} />
    </Routes>
  );
}

export default App;