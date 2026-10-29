import { NextResponse } from 'next/server'
import { readDb, writeDb } from '../../../lib/localDb'

export async function GET() {
  const db = readDb();
  return NextResponse.json({folders: db.folders || []});
}
export async function POST(req) {
  const body = await req.json();
  if (!body.name) return NextResponse.json({error:'name required'}, {status:400});
  const db = readDb();
  const f = {id:'f'+Date.now(), name: body.name, created_at: Date.now()};
  db.folders = db.folders || [];
  db.folders.push(f);
  writeDb(db);
  return NextResponse.json({ok:true, folder: f});
}
