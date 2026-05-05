import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Note } from "./note-types";

type NoteCardProps = {
  note: Note;
  isLoading: boolean;
  onDeleteNote: (id: string) => void;
  onEditNote: (
    id: string,
    input: {
      title: string;
      content: string;
    }
  ) => void;
};

export function NoteCard({
  note,
  isLoading,
  onDeleteNote,
  onEditNote,
}: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(note.title);
  const [draftContent, setDraftContent] = useState(note.content ?? "");

  function handleSave() {
    if (!draftTitle.trim()) return;

    onEditNote(note.id, {
      title: draftTitle.trim(),
      content: draftContent.trim(),
    });

    setIsEditing(false);
  }

  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      {isEditing ? (
        <div className="space-y-3">
          <input
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-600"
            autoFocus
          />

          <textarea
            value={draftContent}
            onChange={(event) => setDraftContent(event.target.value)}
            rows={5}
            className="w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-600"
          />

          <div className="flex justify-end gap-2">
            <Button size="sm" onClick={handleSave} disabled={isLoading}>
              Save
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setDraftTitle(note.title);
                setDraftContent(note.content ?? "");
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold">{note.title}</h2>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-slate-400 hover:text-white"
              >
                Edit
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDeleteNote(note.id)}
                disabled={isLoading}
                className="text-slate-400 hover:text-white"
              >
                Delete
              </Button>
            </div>
          </div>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-400">
            {note.content || "No content"}
          </p>

          {(note.note_files ?? []).length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                Attachments
              </p>

              {(note.note_files ?? []).map((file) => (
                <a
                  key={file.id}
                  href={`https://jlmjqoosmtdhxhenyihs.supabase.co/storage/v1/object/public/note-files/${file.file_path}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800"
                >
                  {file.file_name}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </article>
  );
}