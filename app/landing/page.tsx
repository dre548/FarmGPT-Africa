"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center space-y-10 animate-in fade-in duration-700">
      
      {/* Centered Large Logo/Brand Area */}
      <div className="text-center">
        <div className="w-32 h-32 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-6 mx-auto border border-slate-100">
          <span className="text-4xl">🌱</span>
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">FarmGPT</h1>
        <p className="text-emerald-600 font-bold tracking-widest uppercase text-sm mt-2">Smart Agricultural Intelligence</p>
      </div>

      {/* Interactive Action Buttons */}
      <div className="w-full space-y-4">
        <button 
          onClick={() => router.push('/')} 
          className="w-full py-5 bg-emerald-200/80 hover:bg-emerald-300 text-emerald-900 font-bold rounded-2xl shadow-sm transition-all active:scale-95"
        >
          Setup New Farm
        </button>
        <button 
          onClick={() => router.push('/dashboard')} 
          className="w-full py-5 bg-slate-200/80 hover:bg-slate-300 text-slate-900 font-bold rounded-2xl shadow-sm transition-all active:scale-95"
        >
          View Existing Diary
        </button>
      </div>
    </div>
  );
}