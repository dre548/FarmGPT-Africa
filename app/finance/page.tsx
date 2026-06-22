"use client";

import { useState, useContext, useEffect } from "react";
import { LanguageContext } from "../layout";
import { Landmark, PiggyBank, Receipt, Phone, Loader2, CheckCircle2, ChevronDown, TrendingUp, Wallet, ArrowDownToLine } from "lucide-react";

export default function Finance() {
  const { lang } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState<"loans" | "savings" | "apply">("loans");
  
  // Payment & Saving States
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneInput, setPhoneInput] = useState("0712 345 678");
  const [payAmount, setPayAmount] = useState("1500");
  const [saveAmount, setSaveAmount] = useState("500");
  const [successMessage, setSuccessMessage] = useState("");

  // Clear messages when switching tabs
  useEffect(() => {
    setSuccessMessage("");
    setIsProcessing(false);
  }, [activeTab]);

  const t = {
    en: { 
      title: "Finance & Loans", loans: "Loans", savings: "Savings", apply: "Apply",
      bal: "Active Loan Balance", int: "Interest Rate: 2.5% PM",
      trigger: "Trigger M-Pesa PIN", num: "M-Pesa Number", payAmt: "Amount to Pay (KES)",
      hist: "Payment History",
      loanAmts: "Request Amount", saccoList: "Select SACCO", regBtn: "Submit Application",
      savBal: "Savings Balance", savInt: "13% P.A. Interest", saveAmt: "Deposit Amount (KES)", depoBtn: "Deposit Cash",
      historyList: [
        { date: "12 May 2026", amt: "KES 1,500", stat: "Paid" },
        { date: "12 Apr 2026", amt: "KES 1,500", stat: "Paid" }
      ]
    },
    sw: { 
      title: "Mikopo na Akiba", loans: "Mikopo", savings: "Akiba", apply: "Omba",
      bal: "Salio la Mkopo", int: "Riba: 2.5% Kila Mwezi",
      trigger: "Tuma Ujumbe (M-Pesa)", num: "Nambari ya Simu", payAmt: "Kiasi cha Kulipa (KES)",
      hist: "Historia ya Malipo",
      loanAmts: "Kiasi Unachoomba", saccoList: "Chagua SACCO", regBtn: "Tuma Maombi",
      savBal: "Salio la Akiba", savInt: "Riba 13% Kwa Mwaka", saveAmt: "Kiasi cha Kuweka (KES)", depoBtn: "Weka Akiba",
      historyList: [
        { date: "12 Mei 2026", amt: "KES 1,500", stat: "Imelipwa" },
        { date: "12 Apr 2026", amt: "KES 1,500", stat: "Imelipwa" }
      ]
    }
  };

  const handleTransaction = (e: React.FormEvent, type: "loan" | "save") => {
    e.preventDefault();
    setIsProcessing(true);
    setSuccessMessage("");
    
    // Simulate M-Pesa STK Push delay
    setTimeout(() => {
      setIsProcessing(false);
      const amt = type === "loan" ? payAmount : saveAmount;
      const msg = lang === "en" 
        ? `STK Push sent to ${phoneInput} for KES ${amt}` 
        : `Ujumbe umetumwa kwa ${phoneInput} kulipa KES ${amt}`;
      setSuccessMessage(msg);
    }, 2500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10 pt-4">
      <h1 className="text-3xl font-black text-gray-900 mb-6">{t[lang].title}</h1>

      {/* Tri-state Navigation Tabs */}
      <div className="bg-white border border-gray-200 p-1.5 rounded-2xl flex mb-6 shadow-sm">
        <button onClick={() => setActiveTab("loans")} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === "loans" ? "bg-[#D4A373] text-white" : "text-gray-500"}`}>{t[lang].loans}</button>
        <button onClick={() => setActiveTab("savings")} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === "savings" ? "bg-[#2E5A27] text-white" : "text-gray-500"}`}>{t[lang].savings}</button>
        <button onClick={() => setActiveTab("apply")} className={`flex-1 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${activeTab === "apply" ? "bg-gray-800 text-white" : "text-gray-500"}`}>{t[lang].apply}</button>
      </div>

      {activeTab === "loans" && (
        <div className="space-y-6 animate-in slide-in-from-left-4">
          {/* Active Balance Card (Loans) */}
          <div className="bg-[#D4A373] p-6 rounded-3xl shadow-md text-white relative overflow-hidden">
            <Landmark className="absolute -right-4 -bottom-4 text-white/10" size={120} />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-white/80 mb-1">{t[lang].bal}</p>
              <h2 className="text-4xl font-black mb-1">KES 14,500</h2>
              <p className="text-sm font-medium text-[#7a5734] bg-white/30 inline-block px-3 py-1 rounded-full">{t[lang].int}</p>
            </div>
          </div>

          {/* Make Payment Form (M-Pesa STK Push Simulation) */}
          <form onSubmit={(e) => handleTransaction(e, "loan")} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{t[lang].payAmt}</label>
                <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} required className="w-full bg-[#FDFBF7] border border-gray-200 rounded-2xl px-4 py-3 font-bold text-gray-900 outline-none" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{t[lang].num}</label>
              <div className="flex-1 bg-[#FDFBF7] border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2">
                <Phone size={18} className="text-[#D4A373]" />
                <input type="text" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} required className="bg-transparent font-bold text-gray-900 w-full outline-none" />
              </div>
            </div>
            
            <button type="submit" disabled={isProcessing} className="w-full mt-2 bg-gray-900 text-white font-black py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-gray-800 transition shadow-sm disabled:opacity-70">
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <><Receipt size={20} /> {t[lang].trigger}</>}
            </button>
            
            {/* Dynamic Success Message */}
            {successMessage && <div className="bg-[#2E5A27]/10 text-[#2E5A27] border border-[#2E5A27]/20 p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-in zoom-in-95"><CheckCircle2 size={16}/> {successMessage}</div>}
          </form>

          {/* Payment History */}
          <div className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-black text-sm text-gray-900 mb-4 uppercase tracking-wider">{t[lang].hist}</h3>
            <div className="space-y-4">
              {t[lang].historyList.map((hist, i) => (
                <div key={i} className="flex justify-between items-center border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E8F3E8] rounded-full flex items-center justify-center"><CheckCircle2 className="text-[#2E5A27]" size={20} /></div>
                    <div><p className="font-bold text-gray-900 text-sm">M-Pesa Paybill</p><p className="text-xs text-gray-500">{hist.date}</p></div>
                  </div>
                  <div className="text-right"><p className="font-black text-[#D4A373]">{hist.amt}</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{hist.stat}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "savings" && (
        <div className="space-y-6 animate-in zoom-in-95 duration-300">
          {/* Active Balance Card (Savings) */}
          <div className="bg-[#2E5A27] p-6 rounded-3xl shadow-md text-white relative overflow-hidden">
            <PiggyBank className="absolute -right-4 -bottom-4 text-white/10" size={120} />
            <div className="relative z-10">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D4A373] mb-1">{t[lang].savBal}</p>
              <h2 className="text-4xl font-black mb-1">KES 45,200</h2>
              <div className="flex items-center gap-2 mt-2">
                 <p className="text-sm font-bold text-white bg-white/20 inline-flex items-center gap-1 px-3 py-1.5 rounded-full"><TrendingUp size={14}/> {t[lang].savInt}</p>
              </div>
            </div>
          </div>

          {/* Make Deposit Form */}
          <form onSubmit={(e) => handleTransaction(e, "save")} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-black text-sm text-gray-900 flex items-center gap-2 mb-2"><Wallet className="text-[#2E5A27]"/> {t[lang].depoBtn}</h3>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{t[lang].saveAmt}</label>
                <input type="number" value={saveAmount} onChange={(e) => setSaveAmount(e.target.value)} required className="w-full bg-[#FDFBF7] border border-gray-200 rounded-2xl px-4 py-3 font-bold text-gray-900 outline-none focus:border-[#2E5A27]" />
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{t[lang].num}</label>
              <div className="flex-1 bg-[#FDFBF7] border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-2 focus-within:border-[#2E5A27]">
                <Phone size={18} className="text-[#2E5A27]" />
                <input type="text" value={phoneInput} onChange={(e) => setPhoneInput(e.target.value)} required className="bg-transparent font-bold text-gray-900 w-full outline-none" />
              </div>
            </div>
            
            <button type="submit" disabled={isProcessing} className="w-full mt-2 bg-[#2E5A27] text-white font-black py-4 rounded-2xl flex justify-center items-center gap-2 hover:bg-[#23451e] transition shadow-sm disabled:opacity-70">
              {isProcessing ? <Loader2 size={20} className="animate-spin" /> : <><ArrowDownToLine size={20} /> {t[lang].depoBtn}</>}
            </button>
            
            {/* Dynamic Success Message */}
            {successMessage && <div className="bg-[#2E5A27]/10 text-[#2E5A27] border border-[#2E5A27]/20 p-3 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-in zoom-in-95"><CheckCircle2 size={16}/> {successMessage}</div>}
          </form>
        </div>
      )}

      {activeTab === "apply" && (
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm animate-in slide-in-from-right-4">
          <div className="flex items-center gap-3 mb-6">
            <Landmark className="text-gray-800" size={28} />
            <h2 className="text-xl font-black text-gray-900">SACCO Registration</h2>
          </div>
          
          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setActiveTab("loans"); }}>
            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].saccoList}</label>
              <div className="relative mt-1">
                <select className="w-full bg-[#FDFBF7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none appearance-none">
                  <option>Kenya Highlands Sacco</option><option>Stima Sacco</option><option>Mhasibu Sacco</option>
                </select>
                <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].num}</label>
              <input type="text" defaultValue="0712 345 678" className="w-full bg-[#FDFBF7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 mt-1 outline-none" />
            </div>

            <div>
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].loanAmts}</label>
              <input type="number" defaultValue="25000" className="w-full bg-[#FDFBF7] border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 mt-1 outline-none" />
            </div>

            <button type="submit" className="w-full mt-4 bg-gray-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-gray-800 shadow-md transition-colors">
              {t[lang].regBtn}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}