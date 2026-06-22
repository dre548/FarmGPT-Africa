"use client";

import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Leaf, CloudRain, Bird, Banknote, ShoppingCart } from "lucide-react";
import { LanguageContext } from "../layout";

export default function Dashboard() {
  const router = useRouter();
  const { lang } = useContext(LanguageContext);
  const [activeTab, setActiveTab] = useState("crops");
  const [tasks, setTasks] = useState<any[]>([]);

  const t = {
    en: { 
      title: "Master Diary", crops: "Crops", poultry: "Poultry", apply: "Apply Loan / SACCO", buy: "Buy via M-Pesa",
      weatherCrop: "Short rains expected. Soil moisture optimal.",
      weatherBird: "Brooder temperatures require 2 heat lamps tonight.",
      c1: "Land Prep & Manure", c1d: "Incorporate 3 tonnes of well-rotted manure to restore nitrogen.",
      c2: "Transplanting Seedlings", c2d: "Transfer tomato seedlings at dawn to avoid heat stress.",
      c3: "Top Dressing (CAN)", c3d: "Apply CAN fertilizer in a 5cm ring around the base.",
      p1: "Brooder Setup", p1d: "Clean coop with Virukill. Turn on heat lamps.",
      p2: "Day-Old Chicks", p2d: "Receive 500 Broilers. Provide water with glucose.",
      p3: "Newcastle Vaccine", p3d: "Administer 1st dose via drinking water."
    },
    sw: { 
      title: "Shajara Kuu", crops: "Mimea", poultry: "Kuku", apply: "Omba Mkopo / SACCO", buy: "Nunua M-Pesa",
      weatherCrop: "Mvua fupi inatarajiwa. Unyevu wa udongo uko sawa.",
      weatherBird: "Baridi kali, washa taa mbili za joto kwa vifaranga leo usiku.",
      c1: "Maandalizi ya Shamba", c1d: "Weka tani 3 za mbolea ya kienyeji kurudisha rutuba.",
      c2: "Kupanda Miche", c2d: "Panda miche ya nyanya asubuhi na mapema kuepuka joto.",
      c3: "Mbolea ya CAN", c3d: "Weka mbolea ya CAN kuzunguka shina la mmea.",
      p1: "Kuandaa Chumba", p1d: "Safisha banda na washa taa za joto.",
      p2: "Vifaranga Wapya", p2d: "Pokea vifaranga 500. Wape maji yenye glukosi.",
      p3: "Chanjo ya Newcastle", p3d: "Weka chanjo kwenye maji ya kunywa."
    }
  };

  useEffect(() => {
    if (activeTab === "crops") {
      setTasks([
        { id: "c1", date: "Leo (Today)", type: "input", title: t[lang].c1, desc: t[lang].c1d, status: "pending", price: "KES 4,500" },
        { id: "c2", date: "Wiki Ijayo", type: "action", title: t[lang].c2, desc: t[lang].c2d, status: "pending" },
        { id: "c3", date: "Siku 35", type: "input", title: t[lang].c3, desc: t[lang].c3d, status: "pending", price: "KES 3,200" },
      ]);
    } else {
      setTasks([
        { id: "p1", date: "Leo (Today)", type: "action", title: t[lang].p1, desc: t[lang].p1d, status: "pending" },
        { id: "p2", date: "Kesho", type: "input", title: t[lang].p2, desc: t[lang].p2d, status: "pending", price: "KES 45,000" },
        { id: "p3", date: "Siku 7", type: "medical", title: t[lang].p3, desc: t[lang].p3d, status: "pending", price: "KES 800" },
      ]);
    }
  }, [activeTab, lang]);

  const markAsDone = (id: string) => setTasks(tasks.map(t => t.id === id ? { ...t, status: "completed" } : t));

  return (
    <div className="animate-in fade-in duration-500 pb-10">
      <h1 className="text-3xl font-black text-gray-900 mb-6">{t[lang].title}</h1>

      <div className="bg-white border border-gray-200 p-1.5 rounded-2xl flex mb-6 shadow-sm">
        <button onClick={() => setActiveTab("crops")} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 ${activeTab === "crops" ? "bg-[#2E5A27] text-white" : "text-gray-500"}`}><Leaf size={16}/> {t[lang].crops}</button>
        <button onClick={() => setActiveTab("poultry")} className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all flex justify-center items-center gap-2 ${activeTab === "poultry" ? "bg-[#2E5A27] text-white" : "text-gray-500"}`}><Bird size={16}/> {t[lang].poultry}</button>
      </div>

      <div className="bg-[#FDFBF7] border border-gray-200 rounded-xl p-4 flex items-start gap-3 mb-6">
        <CloudRain className="text-[#D4A373] shrink-0 mt-0.5" size={20} />
        <p className="text-xs font-bold text-gray-700 leading-relaxed">{activeTab === "crops" ? t[lang].weatherCrop : t[lang].weatherBird}</p>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className={`p-5 rounded-3xl border transition-all ${task.status === "completed" ? "bg-gray-50 border-gray-200 opacity-60" : "bg-white border-[#2E5A27]/30 shadow-sm"}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-4">
                <div className={`mt-1 shrink-0 w-4 h-4 rounded-full border-2 ${task.status === 'completed' ? 'bg-[#2E5A27] border-[#2E5A27]' : 'bg-gray-100 border-gray-300'}`}></div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md bg-[#FDFBF7] text-gray-600 border border-gray-200">{task.date}</span>
                  <h3 className={`font-bold mt-2 text-lg ${task.status === "completed" ? "line-through text-gray-400" : "text-gray-900"}`}>{task.title}</h3>
                </div>
              </div>
              {task.status === "pending" && <button onClick={() => markAsDone(task.id)} className="text-gray-300 hover:text-[#2E5A27] transition-colors"><CheckCircle2 size={28} /></button>}
            </div>
            
            <p className="text-sm font-medium text-gray-500 mb-3 ml-8 leading-relaxed">{task.desc}</p>
            
            {task.status === "pending" && (task.type === "input" || task.type === "medical") && (
              <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 ml-8">
                <div className="flex justify-between items-center">
                  <span className="font-black text-[#2E5A27]">{task.price}</span>
                  <button onClick={() => router.push('/marketplace')} className="flex items-center gap-1.5 bg-[#2E5A27] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#23451e] shadow-sm">
                    <ShoppingCart size={16} /> {t[lang].buy}
                  </button>
                </div>
                <div className="bg-[#FDFBF7] p-2 rounded-lg border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-600"><Banknote size={14} className="text-[#D4A373]"/> SACCO / Lipa Mdogo Mdogo</div>
                    {/* Routes to the new Finance Hub */}
                    <span onClick={() => router.push('/finance')} className="text-[10px] text-[#2E5A27] font-bold underline cursor-pointer hover:text-[#D4A373]">{t[lang].apply}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}