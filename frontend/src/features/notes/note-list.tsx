import { useEffect, useState } from "react";
import { createNote, getNotes, createNoteFile, uploadFile } from "@/lib/api";
import { Button } from "@/components/ui/button";
import type { Note } from "./note-types";

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    refetchNotes();
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  async function handleAddNote() {
    if (!title.trim()) return;

    const createdNote = await createNote(title.trim(), content.trim());

    for (const file of files) {
      const uploadedFile = await uploadFile(file);

      await createNoteFile({
        note_id: createdNote.id,
        file_name: uploadedFile.file_name,
        file_path: uploadedFile.file_path,
        file_type: uploadedFile.file_type,
        file_size: uploadedFile.file_size,
      });
    }

  await refetchNotes();

  setTitle("");
  setContent("");
  setFiles([]);
}

  async function refetchNotes() {
    const newNotes = await getNotes();
    setNotes(newNotes);
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
          <Button onClick={handleAddNote}>Add Note</Button>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {notes.map((note) => (
          <article
            key={note.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <h2 className="text-lg font-semibold">{note.title}</h2>

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
          </article>
        ))}
      </section>
    </div>
  );
}