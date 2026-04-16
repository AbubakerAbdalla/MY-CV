import fs from "fs";
import path from "path";
import { ClientsMarquee } from "./ClientsMarquee";

export async function Clients() {
  const clientsDir = path.join(process.cwd(), "public", "projects", "clients");
  
  let logos: string[] = [];
  try {
    const files = await fs.promises.readdir(clientsDir);
    logos = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".svg", ".webp", ".gif"].includes(ext);
      })
      .sort((a, b) => {
        // Natural sort to handle "1.png", "2.png", ..., "10.png" correctly
        const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
        const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
        return numA - numB;
      });
  } catch (error) {
    console.error("Failed to read clients directory:", error);
  }

  if (logos.length === 0) return null;

  return <ClientsMarquee logos={logos} />;
}
