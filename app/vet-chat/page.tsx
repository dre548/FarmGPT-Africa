"use client";

import { useState, useContext, useRef, useEffect } from "react";
import { Send, Image as ImageIcon, Loader2, Mic, ShieldAlert } from "lucide-react";
import { LanguageContext } from "../layout";

type Message = { id: string; sender: "farmer" | "system"; text: string; time: string; };

export default function VetChat() {
  const { lang } = useContext(LanguageContext);
  const [symptomInput, setSymptomInput] = useState(""); 
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    en: { 
      title: "AI Vet", sub: "Local Edge Processing", snap: "Snap Photo", desc: "Describe Symptoms", run: "Run Offline Scan",
      sysHello: "AI Scanner is ready. Works entirely offline.",
      sysAlert: "DIAGNOSIS (TFLite Model): High probability of Foot-and-Mouth Disease. Isolate cow immediately and apply Virukill."
    },
    sw: { 
      title: "Daktari AI", sub: "Inafanya Kazi Bila Mtandao", snap: "Piga Picha", desc: "Eleza Dalili Zake", run: "Anza Uchunguzi",
      sysHello: "Uchunguzi wa AI Uko Tayari. Inafanya kazi bila mtandao.",
      sysAlert: "MAJIBU (TFLite Model): Kuna uwezekano mkubwa wa ugonjwa wa Miguu na Midomo (FMD). Tenga ng'ombe mara moja."
    }
  };

  useEffect(() => {
    // Explicitly uses `lang` strictly typed by Context to avoid the exact TS error in your screenshot
    setMessages([{ id: "m1", sender: "system", text: t[lang].sysHello, time: "08:00 AM" }]);
    setScanComplete(false);
    setSymptomInput("");
  }, [lang]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleInitialSubmission = (e: React.FormEvent) => {
    e.preventDefault(); 
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false); setScanComplete(true);
      if (symptomInput) { 
        setMessages(prev => [...prev, { id: `u1`, sender: "farmer", text: `[Image Attached] ${symptomInput}`, time: "08:02 AM" }]); 
      }
      setTimeout(() => {
        setMessages(prev => [...prev, { id: `sys1`, sender: "system", text: t[lang].sysAlert, time: "08:02 AM" }]);
      }, 1500);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-in fade-in duration-500">
      <div className="mb-6 mt-4">
        <h1 className="text-3xl font-black text-gray-900">{t[lang].title}</h1>
        <p className="text-[10px] font-bold text-[#D4A373] uppercase tracking-widest mt-1 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#D4A373]"></span> {t[lang].sub}
        </p>
      </div>

      {!scanComplete && (
        <form onSubmit={handleInitialSubmission} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="border-2 border-dashed border-[#2E5A27]/40 bg-[#FDFBF7] rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer hover:border-[#2E5A27] transition">
            <ImageIcon className="text-[#2E5A27] mb-3" size={32} />
            <span className="font-bold text-sm text-[#2E5A27]">{t[lang].snap}</span>
          </div>
          <div>
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{t[lang].desc}</label>
            <textarea value={symptomInput} onChange={(e) => setSymptomInput(e.target.value)} required className="w-full bg-[#FDFBF7] border border-gray-200 rounded-2xl p-5 text-sm font-medium text-gray-900 focus:border-[#2E5A27] outline-none resize-none h-20" />
          </div>
          
          <div className="flex gap-2">
            <button type="button" className="bg-[#FDFBF7] border border-gray-200 text-[#2E5A27] p-4 rounded-2xl flex items-center justify-center hover:bg-gray-50 transition-colors">
               <Mic size={24}/>
            </button>
            <button type="submit" disabled={isScanning || !symptomInput} className="flex-1 bg-[#2E5A27] text-white font-black py-4 rounded-2xl flex justify-center items-center gap-3 hover:bg-[#23451e] shadow-md">
              {isScanning ? <><Loader2 className="animate-spin" size={20} /> ...</> : <><Send size={20} /> {t[lang].run}</>}
            </button>
          </div>
        </form>
      )}

      {scanComplete && (
        <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "farmer" ? "items-end" : "items-start"}`}>
                {msg.sender === "system" ? (
                  <div className="w-full bg-orange-50 border border-orange-200 text-orange-900 p-4 rounded-2xl flex items-start gap-3 my-2">
                    <ShieldAlert size={20} className="mt-0.5 shrink-0 text-orange-500" />
                    <span className="font-bold text-sm leading-relaxed">{msg.text}</span>
                  </div>
                ) : (
                  <div className="max-w-[85%] rounded-3xl px-5 py-4 shadow-sm bg-[#2E5A27] text-white rounded-br-none">
                    <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </div>
  );
}