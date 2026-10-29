'use client'
import React, { useState, useEffect } from 'react'

function ChatMessage({m, onEdit, onDelete}) {
  return (
    <div style={{marginBottom:12, padding:8, borderRadius:8, background:'#fafafa'}}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div><strong>{m.role}</strong></div>
        <div><small>{new Date(m.created_at).toLocaleString()}</small></div>
      </div>
      <div style={{whiteSpace:'pre-wrap', marginTop:6}}>{m.content}</div>
      <div style={{marginTop:6}}>
        <button onClick={()=>onEdit(m)}>Edit</button>
        <button onClick={()=>onDelete(m.id)} style={{marginLeft:8}}>Delete</button>
      </div>
    </div>
  )
}

export default function ChatPage(){
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [folders, setFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState('default');

  useEffect(()=> {
    fetch('/api/folders').then(r=>r.json()).then(j=>{
      setFolders(j.folders || [{id:'default', name:'Inbox'}]);
    }).catch(()=>{});
    loadMessages();
  },[])

  async function loadMessages() {
    const q = search ? ('?q='+encodeURIComponent(search)+'&chatId='+encodeURIComponent(activeFolder)) : ('?chatId='+encodeURIComponent(activeFolder));
    const r = await fetch('/api/messages'+q);
    const j = await r.json();
    setMessages(j.messages || []);
  }

  useEffect(()=> {
    const t = setTimeout(()=> loadMessages(), 250);
    return ()=> clearTimeout(t);
  }, [search, activeFolder])

  const send = async () => {
    if(!text) return;
    const body = { content: text, role: 'user', chatId: activeFolder };
    const r = await fetch('/api/messages', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(body)});
    const j = await r.json();
    if (j.ok) {
      setText('');
      loadMessages();
      // Now ask OpenAI (server streaming may be used in server endpoint)
      const rr = await fetch('/api/chat', {method:'POST', body: JSON.stringify({message: text, chatId: activeFolder})});
      const data = await rr.json();
      // Save assistant reply
      await fetch('/api/messages', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({content: data.reply, role:'assistant', chatId: activeFolder})});
      loadMessages();
    }
  }

  const edit = async (m) => {
    const e = prompt('Edit message', m.content)
    if (!e) return;
    await fetch('/api/messages', {method:'PUT', headers:{'content-type':'application/json'}, body: JSON.stringify({id:m.id, content: e})});
    loadMessages();
  }

  const del = async (id) => {
    if(!confirm('Delete message?')) return;
    await fetch('/api/messages?id='+encodeURIComponent(id), {method:'DELETE'});
    loadMessages();
  }

  const createFolder = async () => {
    const name = prompt('Folder name');
    if (!name) return;
    await fetch('/api/folders', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({name})});
    const r = await fetch('/api/folders'); const j = await r.json(); setFolders(j.folders || []);
  }

  return (
    <div style={{padding:20}}>
      <h3>Chat — Folder: {activeFolder}</h3>
      <div style={{display:'flex', gap:12, marginBottom:12}}>
        <div style={{minWidth:180}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <strong>Folders</strong>
            <button onClick={createFolder}>New</button>
          </div>
          <ul>
            {folders.map(f => <li key={f.id}><button onClick={()=>setActiveFolder(f.id)} style={{fontWeight: f.id===activeFolder ? 'bold' : 'normal'}}>{f.name}</button></li>)}
          </ul>
        </div>
        <div style={{flex:1}}>
          <div style={{marginBottom:8}}>
            <input placeholder="Search messages" value={search} onChange={e=>setSearch(e.target.value)} />
          </div>
          <div style={{height:400, overflow:'auto', border:'1px solid #ddd', padding:12}}>
            {messages.map(m => <ChatMessage key={m.id} m={m} onEdit={edit} onDelete={del} />)}
          </div>
          <div style={{marginTop:12}}>
            <textarea rows={3} style={{width:'100%'}} value={text} onChange={e=>setText(e.target.value)} />
            <div style={{marginTop:8}}>
              <button onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
