import type { AppPage } from "@/App";
import { NoteList } from "@/features/notes/note-list";
import { DashboardLayout } from "@/layouts/dashboard-layout";

type NotesPageProps = {
  currentPage: AppPage;
  onNavigate: (page: AppPage) => void;
};

export function NotesPage({ currentPage, onNavigate }: NotesPageProps) {
  return (
    <DashboardLayout currentPage={currentPage} onNavigate={onNavigate}>
      <NoteList />
    </DashboardLayout>
  );
}