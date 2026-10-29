import fs from 'fs';
import path from 'path';
const DB_FILE = path.join(process.cwd(), 'data', 'db.json');

function ensure() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ chats: [], messages: [], folders: [] }, null, 2));
  }
}
export function readDb() {
  ensure();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}
export function writeDb(db) {
  ensure();
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}
