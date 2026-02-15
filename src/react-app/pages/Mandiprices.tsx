import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Search, MapPin } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface MandiPricesProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

interface MandiPrice {
  cropEn: string;
  cropHi: string;
  mandiEn: string;
  mandiHi: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  change: number;
  unit: string;
  date: string;
}

const mandiData: MandiPrice[] = [
  {
    cropEn: "Rice (Paddy)", cropHi: "धान",
    mandiEn: "Gorakhpur Mandi", mandiHi: "गोरखपुर मंडी",
    minPrice: 1800, maxPrice: 2100, modalPrice: 1950, change: 2.5, unit: "₹/quintal", date: "Today"
  },
  {
    cropEn: "Wheat", cropHi: "गेहूं",
    mandiEn: "Varanasi Mandi", mandiHi: "वाराणसी मंडी",
    minPrice: 2050, maxPrice: 2300, modalPrice: 2150, change: -1.2, unit: "₹/quintal", date: "Today"
  },
  {
    cropEn: "Rice (Paddy)", cropHi: "धान",
    mandiEn: "Lucknow Mandi", mandiHi: "लखनऊ मंडी",
    minPrice: 1820, maxPrice: 2080, modalPrice: 1960, change: 0, unit: "₹/quintal", date: "Today"
  },
  {
    cropEn: "Cotton", cropHi: "कपास",
    mandiEn: "Nagpur Mandi", mandiHi: "नागपुर मंडी",
    minPrice: 5800, maxPrice: 6500, modalPrice: 6200, change: 3.1, unit: "₹/quintal", date: "Today"
  },
  {
    cropEn: "Maize", cropHi: "मक्का",
    mandiEn: "Gorakhpur Mandi", mandiHi: "गोरखपुर मंडी",
    minPrice: 1650, maxPrice: 1900, modalPrice: 1780, change: -0.8, unit: "₹/quintal", date: "Today"
  },
  {
    cropEn: "Potato", cropHi: "आलू",
    mandiEn: "Agra Mandi", mandiHi: "आगरा मंडी",
    minPrice: 800, maxPrice: 1100, modalPrice: 950, change: 5.2, unit: "₹/quintal", date: "Today"
  },
  {
    cropEn: "Tomato", cropHi: "टमाटर",
    mandiEn: "Nasik Mandi", mandiHi: "नासिक मंडी",
    minPrice: 400, maxPrice: 700, modalPrice: 550, change: -4.5, unit: "₹/quintal", date: "Today"
  },
  {
    cropEn: "Sugarcane", cropHi: "गन्ना",
    mandiEn: "Muzaffarnagar Mandi", mandiHi: "मुजफ्फरनगर मंडी",
    minPrice: 290, maxPrice: 340, modalPrice: 315, change: 1.0, unit: "₹/quintal", date: "Today"
  }
];

const msp = {
  "Rice (Paddy)": 2183,
  "Wheat": 2275,
  "Cotton": 6620,
  "Maize": 2090,
  "Sugarcane": 340
};

export default function MandiPrices({ farmerData, language }: MandiPricesProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<string>("all");

  const crops = ["all", ...Array.from(new Set(mandiData.map(d => d.cropEn)))];

  const filtered = mandiData.filter(item => {
    const matchesCrop = selectedCrop === "all" || item.cropEn === selectedCrop;
    const matchesSearch = search === "" ||
      item.cropEn.toLowerCase().includes(search.toLowerCase()) ||
      item.cropHi.includes(search) ||
      item.mandiEn.toLowerCase().includes(search.toLowerCase()) ||
      item.mandiHi.includes(search);
    return matchesCrop && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.cropEn === farmerData.crop) return -1;
    if (b.cropEn === farmerData.crop) return 1;
    return 0;
  });

  const getMSPStatus = (cropEn: string, modalPrice: number) => {
    const mspVal = msp[cropEn as keyof typeof msp];
    if (!mspVal) return null;
    const diff = ((modalPrice - mspVal) / mspVal * 100).toFixed(1);
    return { mspVal, diff: parseFloat(diff), above: modalPrice >= mspVal };
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      {/* Header */}
      <div className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-extrabold text-white">
              {language === 'en' ? 'Mandi Prices' : 'मंडी भाव'}
            </h1>
            <p className="text-xs text-emerald-100">
              {language === 'en' ? 'Live market rates' : 'ताजे मंडी भाव'}
            </p>
          </div>
        </div>
      </div>

      <div className="px-3 pt-3 space-y-3">
        {/* MSP Banner */}
        {farmerData.crop && msp[farmerData.crop as keyof typeof msp] && (
          <div className="bg-emerald-50 rounded-2xl px-4 py-3 border-2 border-emerald-200">
            <p className="text-xs text-gray-600 font-bold mb-0.5">
              {language === 'en' ? 'MSP for your crop' : 'आपकी फसल का MSP'}
            </p>
            <p className="font-extrabold text-emerald-700 text-lg">
              ₹{msp[farmerData.crop as keyof typeof msp].toLocaleString()}/quintal
            </p>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={language === 'en' ? 'Search crop or mandi...' : 'फसल या मंडी खोजें...'}
            className="w-full pl-10 pr-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white shadow-sm"
          />
        </div>

        {/* Crop Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {crops.map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all border-2 ${
                selectedCrop === crop
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-300'
              }`}
            >
              {crop === "all"
                ? (language === 'en' ? 'All' : 'सभी')
                : (language === 'en' ? crop : mandiData.find(d => d.cropEn === crop)?.cropHi || crop)
              }
            </button>
          ))}
        </div>

        {/* Price Cards */}
        <div className="space-y-3">
          {sorted.map((item, idx) => {
            const mspStatus = getMSPStatus(item.cropEn, item.modalPrice);
            const isUserCrop = item.cropEn === farmerData.crop;

            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${
                  isUserCrop ? 'border-emerald-300' : 'border-gray-100'
                }`}
              >
                {isUserCrop && (
                  <div className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 text-center">
                    {language === 'en' ? '⭐ YOUR CROP' : '⭐ आपकी फसल'}
                  </div>
                )}

                <div className="p-4">
                  {/* Header Row: Crop name, Location, and Change */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-extrabold text-gray-900">
                        {language === 'en' ? item.cropEn : item.cropHi}
                      </h3>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {language === 'en' ? item.mandiEn : item.mandiHi}
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold ${
                      item.change > 0 ? 'bg-green-100 text-green-700' :
                      item.change < 0 ? 'bg-gray-100 text-gray-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {item.change > 0 ? <TrendingUp className="w-3 h-3" /> :
                       item.change < 0 ? <TrendingDown className="w-3 h-3" /> :
                       <Minus className="w-3 h-3" />}
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </div>
                  </div>

                  {/* New Layout: Modal Price on left, Min/Max on right */}
                  <div className="grid grid-cols-5 gap-3 mb-3">
                    {/* Modal Price - Takes 3 columns */}
                    <div className="col-span-3 bg-emerald-50 rounded-xl p-3 border-2 border-emerald-200">
                      <p className="text-xs text-gray-600 mb-1 font-bold">
                        {language === 'en' ? 'Modal Price' : 'मोडल भाव'}
                      </p>
                      <p className="text-2xl font-extrabold text-emerald-700">
                        ₹{item.modalPrice.toLocaleString()}
                      </p>
                      <span className="text-xs text-gray-500">/quintal</span>
                    </div>

                    {/* Min/Max - Takes 2 columns, stacked vertically */}
                    <div className="col-span-2 space-y-2">
                      <div className="bg-gray-50 rounded-xl p-2 border border-gray-200 text-center">
                        <p className="text-xs text-gray-500 font-bold">{language === 'en' ? 'Min' : 'न्यूनतम'}</p>
                        <p className="font-extrabold text-gray-900 text-sm">₹{item.minPrice.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-xl p-2 border border-gray-200 text-center">
                        <p className="text-xs text-gray-500 font-bold">{language === 'en' ? 'Max' : 'अधिकतम'}</p>
                        <p className="font-extrabold text-gray-900 text-sm">₹{item.maxPrice.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* MSP Comparison */}
                  {mspStatus && (
                    <div className={`flex items-center justify-between text-xs rounded-lg px-3 py-2 ${
                      mspStatus.above ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className="font-bold">
                        MSP: ₹{mspStatus.mspVal.toLocaleString()}
                      </span>
                      <span className="font-extrabold">
                        {Math.abs(mspStatus.diff)}% {language === 'en' ? (mspStatus.above ? 'above' : 'below') : (mspStatus.above ? 'ऊपर' : 'नीचे')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="font-bold">{language === 'en' ? 'No results found' : 'कोई परिणाम नहीं मिला'}</p>
          </div>
        )}
      </div>

      <BottomNav language={language} currentPage="home" />
    </div>
  );
}
