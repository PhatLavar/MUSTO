export async function getHealth() {
  const res = await fetch("http://localhost:3000/api/health");

  if (!res.ok) {
    throw new Error("Failed to fetch!");
  }

  return res.json();
}