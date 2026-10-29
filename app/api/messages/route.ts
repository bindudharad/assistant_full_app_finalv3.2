import { NextResponse } from 'next/server'
import { readDb, writeDb } from '../../../lib/localDb'

export async function GET(req) {
  const url = new URL(req.url);
  const chatId = url.searchParams.get('chatId');
  const q = url.searchParams.get('q') || '';
  const db = readDb();
  let messages = db.messages || [];
  if (chatId) messages = messages.filter(m=>m.chatId===chatId);
  if (q) messages = messages.filter(m=>m.content.toLowerCase().includes(q.toLowerCase()));
  return NextResponse.json({messages});
}

export async function POST(req) {
  const body = await req.json();
  if (!body.content) return NextResponse.json({error:'content required'}, {status:400});
  const db = readDb();
  const msg = {
    id: 'm'+Date.now(),
    chatId: body.chatId || 'default',
    role: body.role || 'user',
    content: body.content,
    created_at: Date.now()
  };
  db.messages.push(msg);
  writeDb(db);
  return NextResponse.json({ok:true, message: msg});
}

export async function PUT(req) {
  const body = await req.json();
  const db = readDb();
  const idx = db.messages.findIndex(m=>m.id===body.id);
  if (idx===-1) return NextResponse.json({error:'not found'}, {status:404});
  db.messages[idx].content = body.content || db.messages[idx].content;
  writeDb(db);
  return NextResponse.json({ok:true, message: db.messages[idx]});
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');
  const db = readDb();
  db.messages = db.messages.filter(m=>m.id!==id);
  writeDb(db);
  return NextResponse.json({ok:true});
}
