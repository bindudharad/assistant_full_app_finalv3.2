'use client'
import React from 'react'
export default function PDFViewer({src}) {
  if (!src) return <div>No file</div>
  return (
    <div style={{height:600}}>
      <embed src={src} type="application/pdf" width="100%" height="100%" />
    </div>
  )
}
