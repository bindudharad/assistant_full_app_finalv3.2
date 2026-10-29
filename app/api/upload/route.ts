
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req) {
  try {
    const form = await req.formData()
    const file = form.get('file')
    if (!file) return NextResponse.json({error:'No file'}, {status:400})
    const arr = await file.arrayBuffer()
    const name = file.name || 'upload.bin'
    const outDir = path.join(process.cwd(), 'storage')
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true})
    fs.writeFileSync(path.join(outDir, name), Buffer.from(arr))
    return NextResponse.json({ok:true, name})
  } catch (err) {
    return NextResponse.json({error: String(err)}, {status:500})
  }
}
