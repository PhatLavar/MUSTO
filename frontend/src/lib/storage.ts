const SUPABASE_BASE_URL =
  "https://jlmjqoosmtdhxhenyihs.supabase.co";

export function getFileUrl(path: string) {
  return `${SUPABASE_BASE_URL}/storage/v1/object/public/note-files/${path}`;
}