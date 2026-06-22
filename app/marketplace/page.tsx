"use client";

import { useState, useContext } from "react";
import { ShoppingCart, PackageOpen, Truck, Leaf, Loader2, MapPin, CheckCircle2, X, Wallet, Banknote, Calendar } from "lucide-react";
import { LanguageContext } from "../layout";

export default function Marketplace() {
  const { lang } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
  const [logisticsState, setLogisticsState] = useState<"idle" | "processing" | "dispatched">("idle");
  
  // Finance Modal State
  const [showFinanceModal, setShowFinanceModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"mpesa" | "mdogomdogo" | "sacco">("mpesa");
  const [deposit, setDeposit] = useState(1000);
  const [months, setMonths] = useState(3);
  const cartTotal = 4500; // Hardcoded cart total for the example

  const monthlyPayment = Math.max(0, (cartTotal - deposit) / months).toFixed(0);

  const t = {
    en: { 
      title: "Marketplace", buy: "Buy Inputs", sell: "Sell Produce", checkout: "Checkout & Finance", item: "Organic Manure", desc: "Nitrogen replenisher.",
      payTitle: "Select Payment Plan", full: "M-Pesa (Full)", install: "Installments", sacco: "SACCO Loan",
      depo: "Initial Deposit (KES)", mos: "Months", mthly: "Monthly Payment", confirmPay: "Confirm Payment", 
      saccoList: "Available SACCOs", dispatch: "Dispatch Confirmed"
    },
    sw: { 
      title: "Soko Letu", buy: "Nunua Bidhaa", sell: "Uza Mazao", checkout: "Lipa au Mkopo", item: "Mbolea ya Kienyeji", desc: "Inaongeza naitrojeni.",
      payTitle: "Chagua Njia ya Kulipa", full: "M-Pesa Kamili", install: "Mdogo Mdogo", sacco: "Mkopo wa SACCO",
      depo: "Kianzio (KES)", mos: "Miezi", mthly: "Malipo ya Mwezi", confirmPay: "Thibitisha Malipo", 
      saccoList: "SACCO Zinazopatikana", dispatch: "Mzigo Uko Njiani"
    }
  };

  const handleConfirmPayment = () => {
    setShowFinanceModal(false);
    setLogisticsState("processing");
    setTimeout(() => { setLogisticsState("dispatched"); }, 2500);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-10 pt-4 relative">
      <h1 className="text-3xl font-black text-gray-900 mb-6">{t[lang].title}</h1>

      {logisticsState === "idle" && (
        <div className="bg-white border border-gray-200 p-1.5 rounded-2xl flex mb-6 shadow-sm">
          <button onClick={() => setActiveTab("buy")} className={`flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === "buy" ? "bg-[#2E5A27] text-white" : "text-gray-500"}`}>{t[lang].buy}</button>
          <button onClick={() => setActiveTab("sell")} className={`flex-1 py-3.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeTab === "sell" ? "bg-[#D4A373] text-white" : "text-gray-500"}`}>{t[lang].sell}</button>
        </div>
      )}

      {logisticsState === "dispatched" ? (
        <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg animate-in zoom-in-95 duration-500">
          <div className="h-48 bg-gray-100 relative overflow-hidden flex items-center justify-center">
            <div className="absolute left-[20%] top-[60%] flex flex-col items-center animate-bounce">
              <div className="bg-white p-2 rounded-full shadow-lg"><Truck size={28} className="text-[#2E5A27]" /></div>
            </div>
            <div className="absolute right-[20%] top-[30%] flex flex-col items-center">
              <MapPin size={32} className="text-[#D4A373]" />
            </div>
          </div>
          <div className="p-8">
            <h2 className="text-2xl font-black mb-2 text-gray-900 flex items-center gap-2"><CheckCircle2 className="text-[#2E5A27]"/> {t[lang].dispatch}</h2>
            <button onClick={() => setLogisticsState("idle")} className="mt-8 w-full bg-[#2E5A27] text-white font-black py-4 rounded-2xl shadow-md">OK</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-100"><Leaf size={28} className="text-[#2E5A27]" /></div>
            <div className="flex-1">
              <h3 className="font-black text-sm text-gray-900">{t[lang].item}</h3>
              <p className="text-xs text-gray-500 font-medium mt-1">{t[lang].desc}</p>
              <p className="font-black text-[#D4A373] mt-2 text-lg">KES {cartTotal}</p>
            </div>
          </div>

          <button onClick={() => setShowFinanceModal(true)} className="w-full bg-[#2E5A27] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 mt-6 shadow-md">
            {logisticsState === "processing" ? <Loader2 size={24} className="animate-spin" /> : <Wallet size={24} />} {t[lang].checkout}
          </button>
        </div>
      )}

      {/* FINANCING & PAYMENT MODAL */}
      {showFinanceModal && (
        <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center pb-20 sm:pb-0">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowFinanceModal(false)}></div>
          <div className="bg-white w-full sm:w-[90%] rounded-t-3xl sm:rounded-3xl p-6 relative z-10 animate-in slide-in-from-bottom-10 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black text-gray-900">{t[lang].payTitle}</h2>
              <button onClick={() => setShowFinanceModal(false)} className="bg-gray-100 p-2 rounded-full"><X size={20}/></button>
            </div>

            {/* Payment Method Tabs */}
            <div className="flex gap-2 mb-6">
              <button onClick={() => setPaymentMethod("mpesa")} className={`flex-1 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest border-2 ${paymentMethod === "mpesa" ? "border-[#2E5A27] bg-[#2E5A27]/10 text-[#2E5A27]" : "border-gray-200 text-gray-500"}`}>{t[lang].full}</button>
              <button onClick={() => setPaymentMethod("mdogomdogo")} className={`flex-1 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest border-2 ${paymentMethod === "mdogomdogo" ? "border-[#D4A373] bg-[#D4A373]/10 text-[#D4A373]" : "border-gray-200 text-gray-500"}`}>{t[lang].install}</button>
              <button onClick={() => setPaymentMethod("sacco")} className={`flex-1 py-2 rounded-xl font-bold text-[10px] uppercase tracking-widest border-2 ${paymentMethod === "sacco" ? "border-blue-600 bg-blue-50 text-blue-600" : "border-gray-200 text-gray-500"}`}>{t[lang].sacco}</button>
            </div>

            {/* Lipa Mdogo Mdogo Calculator */}
            {paymentMethod === "mdogomdogo" && (
              <div className="space-y-4 mb-6 bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t[lang].depo}</label>
                  <input type="number" value={deposit} onChange={(e) => setDeposit(Number(e.target.value))} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 font-bold text-gray-900 mt-1" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t[lang].mos}</label>
                  <select value={months} onChange={(e) => setMonths(Number(e.target.value))} className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3 font-bold text-gray-900 mt-1">
                    <option value={3}>3 Months</option>
                    <option value={6}>6 Months</option>
                    <option value={9}>9 Months</option>
                  </select>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500">{t[lang].mthly}:</span>
                  <span className="text-xl font-black text-[#D4A373]">KES {monthlyPayment}</span>
                </div>
              </div>
            )}

            {/* SACCO Options */}
            {paymentMethod === "sacco" && (
              <div className="space-y-3 mb-6">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t[lang].saccoList}</label>
                <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-xl flex justify-between items-center">
                  <span className="font-bold text-blue-900">Kenya Highlands Sacco</span>
                  <input type="radio" name="sacco" defaultChecked className="w-5 h-5 accent-blue-600" />
                </div>
                <div className="p-4 border-2 border-gray-200 bg-white rounded-xl flex justify-between items-center">
                  <span className="font-bold text-gray-700">Stima Sacco</span>
                  <input type="radio" name="sacco" className="w-5 h-5 accent-blue-600" />
                </div>
              </div>
            )}

            <button onClick={handleConfirmPayment} className="w-full bg-gray-900 text-white font-black py-4 rounded-xl shadow-md">
              {t[lang].confirmPay}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}