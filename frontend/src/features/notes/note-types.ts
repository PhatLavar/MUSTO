export type NoteFile = {
  id: string;
  note_id: string;
  file_name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  created_at?: string;
};

export type Note = {
  id: string;
  title: string;
  content: string | null;
  created_at?: string;
  note_files?: NoteFile[];
};