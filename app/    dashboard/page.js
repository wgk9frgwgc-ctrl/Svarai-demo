"use client";
import { useEffect, useState } from "react";

const welcome = {role:"assistant", content:"Hej 👋 Jeg er SvarAI-demoen. Hvad kan vi hjælpe dig med i dag?"};

export default function Home(){
  const [messages,setMessages]=useState([welcome]);
  const [input,setInput]=useState("");
  const [busy,setBusy]=useState(false);

  async function send(){
    if(!input.trim() || busy) return;
    const next=[...messages,{role:"user",content:input.trim()}];
    setMessages(next); setInput(""); setBusy(true);
    try{
      const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:next})});
      const data=await r.json();
      setMessages(m=>[...m,{role:"assistant",content:data.reply}]);
      if(data.case){
        const old=JSON.parse(localStorage.getItem("svarai_cases")||"[]");
        const item={...data.case,id:Date.now(),updated:new Date().toLocaleString("da-DK")};
        localStorage.setItem("svarai_cases",JSON.stringify([item,...old].slice(0,30)));
      }
    }catch(e){
      setMessages(m=>[...m,{role:"assistant",content:"Demoen kunne ikke kontakte AI-motoren. Kontrollér opsætningen og prøv igen."}]);
    }finally{setBusy(false)}
  }

  return <main className="wrap">
    <div className="top"><div className="brand">SvarAI</div><div className="pill">DEMO 0.1 · ingen rigtig VVS-service</div></div>
    <div className="grid">
      <section className="card chat">
        <div className="head"><h1>Kolding VVS Demo</h1><div className="muted">Digital receptionist · testmiljø</div></div>
        <div className="messages">
          {messages.map((m,i)=><div key={i} className={"msg "+(m.role==="user"?"user":"bot")}>{m.content}</div>)}
          {busy && <div className="msg bot">SvarAI tænker…</div>}
        </div>
        <div className="composer">
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Fx: Kælderen står under vand"/>
          <button onClick={send}>Send</button>
        </div>
      </section>
      <aside className="card side">
        <h2>Test SvarAI</h2>
        <div className="muted">Prøv vores seks real-life cases.</div>
        <div className="case red">🔴 Kælderen står under vand</div>
        <div className="case orange">🟠 Mine vandrør piber ved vaskemaskinen</div>
        <div className="case green">🟢 Tilslut vaskemaskine og opvaskemaskine</div>
        <div className="case green">🟢 Vandhanen drypper</div>
        <div className="case orange">🟠 Rør under vasken er utætte</div>
        <div className="case green">🟢 Dræn til nyt badeværelse</div>
        <a className="link" href="/dashboard">Åbn VVS-dashboard →</a>
        <div className="notice">Brug kun opdigtede testdata i Demo 0.1. Den er ikke en akutservice.</div>
      </aside>
    </div>
  </main>
}