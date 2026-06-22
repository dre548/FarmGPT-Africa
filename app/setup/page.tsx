"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { Navigation, Loader2, CloudRain, Sprout, Hammer, ShieldCheck, PackageOpen } from "lucide-react";
import { LanguageContext } from "../layout";

export default function Setup() {
  const router = useRouter();
  const { lang } = useContext(LanguageContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [farmCategory, setFarmCategory] = useState<"crops" | "animals">("crops");
  const [aiResult, setAiResult] = useState<any>(null);
  
  // New Location States
  const [locationName, setLocationName] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const t = {
    en: {
      crops: "Crops", animals: "Animals", location: "Location Data", detect: "Detecting GPS...", size: "Size (Acres)", focus: "Crop Focus", prev: "Previous Season Crop", flock: "Head/Birds", init: "Initialize Offline AI",
      aiActive: "Local AI Active", aiProcess: "Processing entirely offline.", weather: "Offline Sync: Dry spell for 6 days. Irrigation required.",
      recCrop: "Since you previously planted Maize, your soil nitrogen is depleted. Apply 3 tonnes of organic manure.",
      recAnimal: "Cold nights (14°C) forecasted next week. Brooder heating critical.",
      infra: "Infrastructure", equip: "Equipment", generate: "Generate Master Schedule", micro: "Live Micro-Climate"
    },
    sw: {
      crops: "Mimea", animals: "Wanyama", location: "Mahali", detect: "Inatafuta GPS...", size: "Eneo (Ekari)", focus: "Aina ya Mmea", prev: "Msimu Uliopita", flock: "Idadi ya Mifugo", init: "Anzisha Uchunguzi",
      aiActive: "AI Inafanya Kazi", aiProcess: "Inachakata bila mtandao.", weather: "Hali ya Hewa: Ukame kwa siku 6. Unahitaji kunyunyizia maji.",
      recCrop: "Kwa kuwa ulipanda Mahindi, naitrojeni imepungua. Weka tani 3 za mbolea ya kienyeji.",
      recAnimal: "Baridi (14°C) inatarajiwa wiki ijayo. Joto kwa vifaranga ni muhimu.",
      infra: "Miundombinu", equip: "Vifaa", generate: "Tengeneza Shajara Kuu", micro: "Hali Ya Hewa"
    }
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationName(t[lang].detect);
    // Simulate GPS fetch delay
    setTimeout(() => {
      setLocationName("Nakuru County, Kenya");
      setIsLocating(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setAiResult({ ready: true });
      setIsSubmitting(false);
    }, 2500);
  };

  if (aiResult) {
    return (
      <div className="space-y-6 animate-in slide-in-from-bottom-6 duration-700 pb-10">
        <div className="bg-white border-2 border-[#2E5A27] p-6 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-1">{t[lang].aiActive}</h2>
          <p className="text-gray-500 mb-6 font-medium text-sm">{t[lang].aiProcess}</p>
          
          <div className="space-y-4">
            <div className="bg-[#FDFBF7] p-4 rounded-2xl border border-gray-200 shadow-sm flex gap-3">
              <CloudRain className="text-[#D4A373] shrink-0 mt-0.5" size={24} />
              <div>
                <h4 className="font-bold text-sm text-gray-900">{t[lang].micro}</h4>
                <p className="text-xs text-gray-500 mt-1">{t[lang].weather}</p>
              </div>
            </div>

            <div className="bg-[#FDFBF7] p-5 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                {farmCategory === "crops" ? <Sprout className="text-[#2E5A27]" size={20} /> : <Hammer className="text-[#2E5A27]" size={20} />}
                <h4 className="font-bold text-gray-900 text-md">{farmCategory === 'crops' ? t[lang].crops : t[lang].animals}</h4>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{farmCategory === 'crops' ? t[lang].recCrop : t[lang].recAnimal}</p>
            </div>
          </div>

          <button onClick={() => router.push('/dashboard')} className="w-full mt-6 bg-[#2E5A27] text-white font-black py-4 rounded-2xl hover:bg-[#23451e] shadow-md">
            {t[lang].generate}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10 animate-in fade-in duration-500">
      <div className="bg-white border border-gray-200 p-1.5 rounded-2xl flex mb-8">
        <button onClick={() => setFarmCategory("crops")} className={`flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${farmCategory === "crops" ? "bg-[#2E5A27] text-white shadow-sm" : "text-gray-500"}`}>{t[lang].crops}</button>
        <button onClick={() => setFarmCategory("animals")} className={`flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${farmCategory === "animals" ? "bg-[#2E5A27] text-white shadow-sm" : "text-gray-500"}`}>{t[lang].animals}</button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1 mb-2 block">{t[lang].location}</label>
          <div className="flex gap-2">
            <input readOnly placeholder={t[lang].location} value={locationName} className="flex-1 bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none" />
            <button type="button" onClick={handleGetLocation} className="bg-[#D4A373] text-white px-6 rounded-2xl hover:bg-[#b0875e] transition">
              {isLocating ? <Loader2 size={20} className="animate-spin" /> : <Navigation size={20}/>}
            </button>
          </div>
        </div>

        {farmCategory === "crops" ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].size}</label>
                <input type="number" defaultValue="2" className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].focus}</label>
                <select className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none">
                  <option>Tomatoes</option> <option>Maize</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].prev}</label>
              <select className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none">
                <option>Maize (Heavy Feeder)</option>
                <option>Beans (Legume)</option>
                <option>Fallow (Rested)</option>
              </select>
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].animals}</label>
              <select className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none">
                <option>Broilers</option> <option>Dairy Cows</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">{t[lang].flock}</label>
              <input type="number" defaultValue="500" className="w-full bg-white border border-gray-200 rounded-2xl px-5 py-4 font-bold text-gray-700 outline-none" />
            </div>
          </div>
        )}

        <button type="submit" disabled={isSubmitting || !locationName} className="w-full mt-4 bg-[#2E5A27] text-white py-5 rounded-2xl font-black text-lg hover:bg-[#23451e] shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? <Loader2 className="animate-spin mx-auto" /> : t[lang].init}
        </button>
      </form>
    </div>
  );
}