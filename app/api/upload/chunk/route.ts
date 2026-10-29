import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  const form = await req.formData();
  const fileId = form.get('fileId');
  const index = form.get('index');
  const total = form.get('total');
  const chunk = form.get('chunk');
  if (!fileId || !index || !chunk) return NextResponse.json({error:'missing'}, {status:400});
  const outDir = path.join(process.cwd(), 'storage', 'chunks', fileId.toString());
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});
  const buf = Buffer.from(await chunk.arrayBuffer());
  fs.writeFileSync(path.join(outDir, String(index)), buf);
  // If last chunk, assemble
  if (Number(index) + 1 === Number(total)) {
    const files = fs.readdirSync(outDir).sort((a,b)=>Number(a)-Number(b));
    const outPath = path.join(process.cwd(), 'storage', fileId + '_assembled');
    const w = fs.createWriteStream(outPath);
    for (const f of files) {
      const b = fs.readFileSync(path.join(outDir, f));
      w.write(b);
    }
    w.close();
    // cleanup chunks (optional)
  }
  return NextResponse.json({ok:true});
}
