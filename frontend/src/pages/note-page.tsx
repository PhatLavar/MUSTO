import { NoteList } from "@/features/notes/note-list";
import { DashboardLayout } from "@/layouts/dashboard-layout";

export function NotesPage() {
  return (
    <DashboardLayout>
      <NoteList />
    </DashboardLayout>
  );
}