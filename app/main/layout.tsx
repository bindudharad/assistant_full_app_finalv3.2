
import React from 'react';

export default function MainLayout({ children }) {
  return (
    <div style={{display:'flex', minHeight:'100vh'}}>
      <aside style={{width:260, borderRight:'1px solid #eee', padding:20}}>
        <h2>Assistant</h2>
        <nav>
          <a href="/main/chat">Chat</a><br/>
          <a href="/main/settings">Settings</a>
        </nav>
      </aside>
      <section style={{flex:1}}>
        {children}
      </section>
    </div>
  )
}
