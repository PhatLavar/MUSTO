import { useEffect, useState } from "react";
import {
  createNote,
  createNoteFile,
  getNotes,
  uploadFile,
  deleteNote,
  updateNote
} from "@/lib/api";
import type { Note } from "./note-types";

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function refetchNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  useEffect(() => {
    refetchNotes();
  }, []);

  async function addNote(
    title: string,
    content: string,
    files: File[]
  ) {
    if (!title.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      const createdNote = await createNote(title, content);

      for (const file of files) {
        const uploaded = await uploadFile(file);

        await createNoteFile({
          note_id: createdNote.id,
          file_name: uploaded.file_name,
          file_path: uploaded.file_path,
          file_type: uploaded.file_type,
          file_size: uploaded.file_size,
        });
      }

      await refetchNotes();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  async function editNote(
    id: string,
    input: {
      title: string;
      content: string;
    }
  ) {
    try {
      setIsLoading(true);
      setError(null);

      await updateNote(id, input);
      await refetchNotes();
    } catch (err) {
      console.error(err);
      setError("Failed to update note");
    } finally {
      setIsLoading(false);
    }
  }

  async function removeNote(id: string) {
    try {
      setIsLoading(true);
      setError(null);

      await deleteNote(id);
      await refetchNotes();
    } catch (err) {
      console.error(err);
      setError("Failed to delete note");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    notes,
    isLoading,
    error,
    addNote,
    refetchNotes,
    removeNote,
    editNote
  };
}