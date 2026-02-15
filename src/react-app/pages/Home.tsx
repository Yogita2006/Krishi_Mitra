import { useNavigate } from "react-router";
import {
  TrendingUp, MessageCircle, Building2, CalendarDays,
  CloudSun, ScanLine, ChevronRight, Sprout, Droplets,
  Wind, MapPin, AlertTriangle
} from "lucide-react";
import Header from "@/react-app/components/Header";
import AlertCard from "@/react-app/components/AlertCard";
import CropHealthCard from "@/react-app/components/CropHealthCard";
import ActionSection from "@/react-app/components/ActionSection";
import TreatmentCard from "@/react-app/components/TreatmentCard";
import VoiceButton from "@/react-app/components/VoiceButton";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";
import {
  currentWeather,
  currentAlert,
  cropHealth,
  doActions,
  avoidActions,
  currentTreatment
} from "@/data/agriculture";

interface HomeProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

const quickLinks = [
  { path: "/mandi",    icon: TrendingUp,   labelEn: "Mandi",    labelHi: "मंडी",    descEn: "Live rates",    descHi: "ताजे भाव"  },
  { path: "/chat",     icon: MessageCircle,labelEn: "Ask AI",   labelHi: "AI सलाह", descEn: "Get advice",    descHi: "सलाह लें"  },
  { path: "/schemes",  icon: Building2,    labelEn: "Schemes",  labelHi: "योजनाएं", descEn: "Gov benefits",  descHi: "मुफ्त लाभ" },
  { path: "/calendar", icon: CalendarDays, labelEn: "Calendar", labelHi: "कैलेंडर", descEn: "Season tasks",  descHi: "मौसमी काम" },
];

export default function Home({ farmerData, language }: HomeProps) {
  const navigate = useNavigate();
  const L = language;

  const handleVoiceAdvice = () => {
    alert(L === 'en'
      ? '🔊 Voice feature would play audio advice here'
      : '🔊 यहां हिंदी में सलाह सुनाई जाएगी');
  };

  const location = farmerData.district
    ? `${farmerData.village}, ${farmerData.district}`
    : farmerData.village;

  const greeting = () => {
    const h = new Date().getHours();
    if (L === 'en') return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
    return h < 12 ? 'सुप्रभात' : h < 17 ? 'नमस्कार' : 'शुभ संध्या';
  };

  // Crop price lookup (static demo)
  const cropPrice: Record<string, string> = {
    'Wheat': '₹2,150', 'Cotton': '₹6,200', 'Rice (Paddy)': '₹1,950',
    'Potato': '₹950', 'Sugarcane': '₹340', 'Maize': '₹1,720',
    'Tomato': '₹1,200', 'Onion': '₹1,100', 'Mustard': '₹5,200',
  };
  const price = cropPrice[farmerData.crop] ?? '₹1,950';

  return (
    <div className="min-h-screen bg-gray-100 pb-24">

      {/* ── HEADER (existing component) ── */}
      <Header weather={currentWeather} language={L} location={location} />

      <div className="px-3 pt-3 space-y-3">

        {/* ══ HERO CARD ══════════════════════════════════════════════════════════ */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-lg"
          style={{ background: 'linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%)' }}
        >
          {/* Background texture circles */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-10 -translate-x-8" />
          <div className="absolute top-1/2 right-8 w-20 h-20 bg-white/5 rounded-full -translate-y-1/2" />

          <div className="relative px-5 pt-5 pb-4">
            {/* Greeting row */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-emerald-200 text-sm font-medium">{greeting()},</p>
                <h1 className="text-white text-2xl font-extrabold tracking-tight leading-tight">
                  {farmerData.name}
                </h1>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-emerald-300" />
                  <p className="text-emerald-300 text-xs">{location}</p>
                </div>
              </div>
              {/* Today's alert badge */}
              <div className="bg-amber-400/20 border border-amber-400/40 rounded-xl px-3 py-1.5 flex items-center gap-1.5 flex-shrink-0">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-amber-200 text-xs font-bold">
                  {L === 'en' ? '1 Alert' : '1 अलर्ट'}
                </span>
              </div>
            </div>

            {/* Farm stats strip */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[
                {
                  icon: Sprout,
                  val: farmerData.crop.split(' ')[0],
                  sub: L === 'en' ? 'Main crop' : 'मुख्य फसल',
                },
                {
                  icon: Droplets,
                  val: farmerData.irrigationType
                    ? farmerData.irrigationType.split(' ')[0]
                    : (L === 'en' ? 'Unknown' : 'अज्ञात'),
                  sub: L === 'en' ? 'Irrigation' : 'सिंचाई',
                },
                {
                  icon: null,
                  val: farmerData.landSize
                    ? `${farmerData.landSize} ${farmerData.landUnit ?? ''}`
                    : (L === 'en' ? 'N/A' : 'अज्ञात'),
                  sub: L === 'en' ? 'Land size' : 'जमीन',
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/10 rounded-xl px-3 py-2.5 flex flex-col"
                >
                  <p className="text-white font-extrabold text-sm leading-tight truncate">{stat.val}</p>
                  <p className="text-emerald-300 text-xs mt-0.5">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Scan CTA */}
            <button
              onClick={() => navigate('/capture')}
              className="w-full bg-white/15 hover:bg-white/25 active:scale-95 border border-white/25 rounded-xl px-4 py-3 flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <ScanLine className="w-4 h-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">
                    {L === 'en' ? 'Scan Your Crop' : 'फसल स्कैन करें'}
                  </p>
                  <p className="text-emerald-200 text-xs">
                    {L === 'en' ? 'Detect diseases, weeds & soil issues' : 'रोग, खरपतवार और मिट्टी जांचें'}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-300 flex-shrink-0" />
            </button>
          </div>
        </div>

        {/* ══ QUICK ACCESS ═══════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1 mb-2.5">
            {L === 'en' ? 'Quick Access' : 'त्वरित पहुंच'}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {quickLinks.map(link => {
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className="group flex flex-col items-center gap-1.5 rounded-xl p-2.5 hover:bg-emerald-50 active:scale-95 transition-all"
                >
                  <div className="w-14 h-14 bg-emerald-50 group-hover:bg-emerald-100 border-2 border-emerald-200 rounded-xl flex items-center justify-center transition-colors">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <span className="text-xs font-bold text-gray-700 text-center leading-tight">
                    {L === 'en' ? link.labelEn : link.labelHi}
                  </span>
                  <span className="text-xs text-gray-400 text-center leading-tight hidden sm:block">
                    {L === 'en' ? link.descEn : link.descHi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ══ WEATHER + MANDI SNAPSHOT - REDESIGNED ═══════════════════════════════ */}
        <div className="grid grid-cols-2 gap-4">
          {/* Weather Card */}
          <button
            onClick={() => navigate('/weather')}
            className="relative overflow-hidden bg-white rounded-3xl p-5 border-2 border-gray-200 text-left group hover:border-gray-300 hover:shadow-lg active:scale-[0.98] transition-all duration-300"
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100 rounded-full -translate-y-14 translate-x-14" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-100 rounded-full translate-y-10 -translate-x-10" />
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-gray-300 transition-all duration-300">
                  <CloudSun className="w-6 h-6 text-gray-700" />
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-full p-1.5 group-hover:translate-x-1 transition-transform duration-300">
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <div className="space-y-1 mb-3">
                <p className="text-5xl font-black text-gray-900 tracking-tight">32°</p>
                <p className="text-gray-600 text-sm font-semibold tracking-wide">
                  {L === 'en' ? 'Sunny' : 'धूप'}
                </p>
              </div>
              
              <div className="flex items-center gap-4 pt-3 border-t-2 border-gray-100">
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Droplets className="w-4 h-4" />
                  <span className="text-sm font-bold">20%</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-600">
                  <Wind className="w-4 h-4" />
                  <span className="text-sm font-bold">12 km/h</span>
                </span>
              </div>
            </div>
          </button>

          {/* Mandi Price Card */}
          <button
            onClick={() => navigate('/mandi')}
            className="relative overflow-hidden bg-white rounded-3xl p-5 border-2 border-gray-200 text-left group hover:border-gray-300 hover:shadow-lg active:scale-[0.98] transition-all duration-300"
          >
            {/* Subtle background decoration */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-100 rounded-full -translate-y-14 translate-x-14" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-emerald-100 rounded-full translate-y-10 -translate-x-10" />
            
            {/* Trending indicator */}
            <div className="absolute top-4 right-4 bg-gray-50 border border-gray-200 rounded-full px-2.5 py-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span className="text-gray-700 text-xs font-bold">+2.3%</span>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-gray-300 transition-all duration-300">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              
              <div className="space-y-1 mb-3">
                <p className="text-4xl font-black text-gray-900 tracking-tight">{price}</p>
                <p className="text-gray-600 text-sm font-semibold tracking-wide truncate">
                  {farmerData.crop}
                </p>
              </div>
              
              <div className="pt-3 border-t-2 border-gray-100">
                <p className="text-gray-700 font-bold text-sm flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                  {L === 'en' ? 'Modal price' : 'मोडल भाव'}
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* ══ TODAY'S ADVISORY SECTION HEADER ═════════════════════════════════════ */}
        <div className="flex items-center gap-3 px-1">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            {L === 'en' ? "Today's Advisory" : 'आज की सलाह'}
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* ══ EXISTING ADVISORY CARDS ═════════════════════════════════════════════ */}
        <AlertCard alert={currentAlert} language={L} />
        <CropHealthCard crop={cropHealth} language={L} />

        <ActionSection actions={doActions}   type="do"    language={L} />
        <ActionSection actions={avoidActions} type="avoid" language={L} />

        <TreatmentCard treatment={currentTreatment} language={L} />

      </div>

      <BottomNav language={L} currentPage="home" />
    </div>
  );
}
