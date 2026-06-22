"use client";

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { LanguageContext } from "./layout";

export default function LandingPage() {
  const router = useRouter();
  const { lang } = useContext(LanguageContext);

  const t = {
    en: {
      subtitle: "A Digital Agriculture Tool Empowering Smallholder Farmers in Kenya.",
      setup: "Setup New Farm",
      diary: "View Diary"
    },
    sw: {
      subtitle: "Chombo cha Kilimo Dijitali Kuinua Wakulima Wadogo Nchini Kenya.",
      setup: "Anzisha Shamba",
      diary: "Fungua Shajara"
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-full space-y-10 animate-in fade-in duration-700">
      
      <div className="text-center mt-10">
        <div className="w-32 h-32 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 mx-auto border-2 border-[#2E5A27] p-4">
          <img src="/logo-light.png" alt="FarmGPT Logo" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">FarmGPT Africa</h1>
        <p className="text-[#D4A373] font-bold tracking-widest uppercase text-xs mt-2">Shamba Smart APP</p>
        <p className="text-gray-500 text-sm font-medium mt-4 px-4 leading-relaxed">
          {t[lang].subtitle}
        </p>
      </div>

      <div className="w-full space-y-4 px-2">
        <button 
          onClick={() => router.push('/setup')} 
          className="w-full py-5 bg-[#2E5A27] hover:bg-[#23451e] text-white font-bold rounded-2xl shadow-md transition-all"
        >
          {t[lang].setup}
        </button>
        <button 
          onClick={() => router.push('/dashboard')} 
          className="w-full py-5 bg-white border-2 border-[#2E5A27] hover:bg-gray-50 text-[#2E5A27] font-bold rounded-2xl shadow-sm transition-all"
        >
          {t[lang].diary}
        </button>
      </div>
    </div>
  );
}