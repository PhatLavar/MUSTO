export type NoteFile = {
  id: string;
  name: string;
  size: number;
  type: string;
};

export type Note = {
  id: string;
  title: string;
  content: string;
  files: NoteFile[];
  created_at?: string;
};