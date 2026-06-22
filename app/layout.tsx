"use client";

import './globals.css';
import Link from 'next/link';
import React, { createContext, useState } from 'react';
import { Home, CalendarDays, ShoppingCart, Camera, Signal, Battery, Wifi, Menu, X, Settings, User, LogOut, Globe, Wallet } from 'lucide-react';

type LangType = 'en' | 'sw';
interface LangContextProps { lang: LangType; toggleLang: () => void; }

export const LanguageContext = createContext<LangContextProps>({ lang: 'en', toggleLang: () => {} });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lang, setLang] = useState<LangType>('en');

  const toggleLang = () => setLang(prev => prev === 'en' ? 'sw' : 'en');

  const t = {
    en: { home: "Home", diary: "Diary", market: "Market", vet: "Scan AI", finance: "SACCO & Loans", settings: "Settings", profile: "Profile", logout: "Logout", farmer: "Farmer" },
    sw: { home: "Mwanzo", diary: "Shajara", market: "Soko", vet: "Daktari AI", finance: "SACCO & Mikopo", settings: "Mipangilio", profile: "Akaunti", logout: "Ondoka", farmer: "Mkulima" }
  };

  return (
    <html lang="en" className="bg-gray-200">
      <body className="min-h-screen flex items-center justify-center font-sans text-gray-900 py-6 px-4 m-0">
        <LanguageContext.Provider value={{ lang, toggleLang }}>
          <div className="w-full max-w-[380px] h-[800px] max-h-[95vh] bg-[#111] rounded-[2rem] border-[14px] border-[#2A2A2A] relative shadow-2xl flex flex-col overflow-hidden mx-auto">
            <div className="absolute top-2 inset-x-0 flex justify-center z-[70]"><div className="w-3 h-3 bg-[#000] rounded-full border border-gray-700"></div></div>
            <div className="absolute top-0 inset-x-0 h-8 flex justify-between items-center px-4 z-[60] text-gray-800 bg-[#FDFBF7] text-[11px] font-bold pt-1 pointer-events-none">
              <span>08:00 AM</span>
              <div className="flex items-center gap-1.5"><Signal size={12} className="fill-gray-800" /><Wifi size={12} /><span>98%</span><Battery size={14} className="fill-gray-800" /></div>
            </div>

            <div className="w-full h-full bg-[#FDFBF7] rounded-b-xl flex flex-col relative pt-8 border-t border-gray-200 mt-0">
              <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-[#FDFBF7] z-40">
                <div className="flex items-center gap-2">
                  <button onClick={() => setIsSidebarOpen(true)} className="text-[#2E5A27] hover:bg-gray-100 p-1.5 rounded-lg transition-colors"><Menu size={24} /></button>
                  <div className="flex items-center gap-2">
                     <img src="/logo-light.png" alt="FarmGPT" className="h-6 w-auto object-contain" />
                     <span className="font-black text-gray-900 tracking-tight text-sm">FarmGPT</span>
                  </div>
                </div>
                <button onClick={toggleLang} className="flex items-center gap-1 bg-[#D4A373]/20 text-[#D4A373] px-2 py-1 rounded-lg text-xs font-bold border border-[#D4A373]/30 hover:bg-[#D4A373]/30 transition-colors">
                  <Globe size={14} /> {lang === 'en' ? 'EN' : 'SW'}
                </button>
              </header>

              {isSidebarOpen && (
                <div className="absolute inset-0 z-[60] flex overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)} />
                  <div className="relative w-[75%] h-full bg-[#FDFBF7] shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                    <div className="p-6 border-b border-gray-200 bg-white">
                      <div className="flex items-center justify-between mb-6">
                         <div className="bg-[#FDFBF7] p-2 rounded-xl border border-[#2E5A27] flex items-center justify-center">
                           <img src="/logo-light.png" alt="FarmGPT" className="h-8 w-auto object-contain" />
                         </div>
                         <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-gray-800 p-1 bg-gray-100 rounded-lg"><X size={20} /></button>
                      </div>
                      <h2 className="font-black text-xl text-gray-900">Dennis Maina</h2>
                      <p className="text-xs font-bold text-[#D4A373] mt-1 tracking-widest uppercase">{t[lang].farmer}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                      <Link href="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-[#2E5A27]/10 hover:text-[#2E5A27] rounded-xl font-bold transition-colors"><Home size={20} /> {t[lang].home}</Link>
                      <Link href="/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-[#2E5A27]/10 hover:text-[#2E5A27] rounded-xl font-bold transition-colors"><CalendarDays size={20} /> {t[lang].diary}</Link>
                      <Link href="/marketplace" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-[#2E5A27]/10 hover:text-[#2E5A27] rounded-xl font-bold transition-colors"><ShoppingCart size={20} /> {t[lang].market}</Link>
                      <Link href="/vet-chat" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-[#2E5A27]/10 hover:text-[#2E5A27] rounded-xl font-bold transition-colors"><Camera size={20} /> {t[lang].vet}</Link>
                      
                      <div className="my-4 border-t border-gray-200"></div>
                      
                      {/* NEW FINANCE LINK */}
                      <Link href="/finance" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-[#2E5A27]/10 hover:text-[#2E5A27] rounded-xl font-bold transition-colors"><Wallet size={20} /> {t[lang].finance}</Link>
                      <Link href="#" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-4 px-4 py-3 text-gray-700 hover:bg-[#2E5A27]/10 hover:text-[#2E5A27] rounded-xl font-bold transition-colors"><User size={20} /> {t[lang].profile}</Link>
                    </div>
                  </div>
                </div>
              )}

              <main className="flex-1 overflow-y-auto px-5 pt-4 pb-24 scrollbar-hide relative z-10">{children}</main>

              <nav className="absolute bottom-0 w-full bg-[#FDFBF7] border-t border-gray-200 pb-4 pt-2 z-30">
                <div className="flex justify-between items-center px-6">
                  <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2E5A27] transition-colors"><Home size={22} /><span className="text-[9px] font-bold uppercase tracking-widest">{t[lang].home}</span></Link>
                  <Link href="/dashboard" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2E5A27] transition-colors"><CalendarDays size={22} /><span className="text-[9px] font-bold uppercase tracking-widest">{t[lang].diary}</span></Link>
                  <Link href="/finance" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2E5A27] transition-colors"><Wallet size={22} /><span className="text-[9px] font-bold uppercase tracking-widest">Mkopo</span></Link>
                  <Link href="/vet-chat" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#2E5A27] transition-colors"><Camera size={22} /><span className="text-[9px] font-bold uppercase tracking-widest">{t[lang].vet}</span></Link>
                </div>
              </nav>
              
            </div>
          </div>
        </LanguageContext.Provider>
      </body>
    </html>
  );
}