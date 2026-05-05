import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNotes } from "./use-notes";
import { NoteCard } from "./note-cards";

export function NoteList() {
  const { notes, isLoading, error, addNote, removeNote, editNote } = useNotes();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);


  async function handleAddNote() {
    await addNote(title.trim(), content.trim(), files);

    setTitle("");
    setContent("");
    setFiles([]);
  }

  return (
    <div className="max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Notes</h1>
        <p className="mt-2 text-slate-400">
          Capture ideas, thoughts, and useful references.
        </p>
      </div>

      <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Note title"
          className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-600"
        />

        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Write your note..."
          rows={5}
          className="mt-3 w-full resize-none rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-slate-600"
        />

        <input
          type="file"
          multiple
          onChange={(event) => {
            const selectedFiles = Array.from(event.target.files ?? []);
            setFiles(selectedFiles);
          }}
          className="mt-3 block w-full text-sm text-slate-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-950"
        />

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Selected files
            </p>

            {files.map((file) => (
              <div
                key={`${file.name}-${file.size}`}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-sm text-slate-300"
              >
                {file.name}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 flex justify-end">
          <Button 
            onClick={handleAddNote} 
            disabled={isLoading}
          > 
            {isLoading ? "Adding..." : "Add Note"}
          </Button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {notes.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center text-slate-400">
            No notes yet. Create your first note ✨
          </div>
        ) : (
          notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              isLoading={isLoading}
              onDeleteNote={removeNote}
              onEditNote={editNote}
            />
          ))
        )}
      </section>
    </div>
  );
}