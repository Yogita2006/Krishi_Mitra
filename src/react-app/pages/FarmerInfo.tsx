import { useState } from "react";
import { User, MapPin, Sprout, Phone, ChevronRight, ChevronLeft, Layers, Droplets, Tractor, BadgeCheck } from "lucide-react";
import Logo from "@/react-app/components/Logo";

interface FarmerInfoProps {
  onComplete: (info: FarmerData) => void;
  language: 'en' | 'hi';
}

export interface FarmerData {
  name: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  crop: string;
  secondaryCrop: string;
  landSize: string;
  landUnit: string;
  irrigationType: string;
  farmingType: string;
  experience: string;
}

// ── Static data ───────────────────────────────────────────────────────────────

const indianStates = [
  { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश' },
  { en: 'Assam', hi: 'असम' },
  { en: 'Bihar', hi: 'बिहार' },
  { en: 'Chhattisgarh', hi: 'छत्तीसगढ़' },
  { en: 'Gujarat', hi: 'गुजरात' },
  { en: 'Haryana', hi: 'हरियाणा' },
  { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश' },
  { en: 'Jharkhand', hi: 'झारखंड' },
  { en: 'Karnataka', hi: 'कर्नाटक' },
  { en: 'Kerala', hi: 'केरल' },
  { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश' },
  { en: 'Maharashtra', hi: 'महाराष्ट्र' },
  { en: 'Manipur', hi: 'मणिपुर' },
  { en: 'Odisha', hi: 'ओडिशा' },
  { en: 'Punjab', hi: 'पंजाब' },
  { en: 'Rajasthan', hi: 'राजस्थान' },
  { en: 'Tamil Nadu', hi: 'तमिल नाडु' },
  { en: 'Telangana', hi: 'तेलंगाना' },
  { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश' },
  { en: 'Uttarakhand', hi: 'उत्तराखंड' },
  { en: 'West Bengal', hi: 'पश्चिम बंगाल' },
];

const crops = [
  { en: 'Rice (Paddy)', hi: 'धान' },
  { en: 'Wheat', hi: 'गेहूं' },
  { en: 'Cotton', hi: 'कपास' },
  { en: 'Sugarcane', hi: 'गन्ना' },
  { en: 'Maize', hi: 'मक्का' },
  { en: 'Potato', hi: 'आलू' },
  { en: 'Tomato', hi: 'टमाटर' },
  { en: 'Onion', hi: 'प्याज' },
  { en: 'Soybean', hi: 'सोयाबीन' },
  { en: 'Groundnut', hi: 'मूंगफली' },
  { en: 'Mustard', hi: 'सरसों' },
  { en: 'Chickpea', hi: 'चना' },
  { en: 'Lentil (Masoor)', hi: 'मसूर' },
  { en: 'Mung Bean', hi: 'मूंग' },
  { en: 'Barley', hi: 'जौ' },
  { en: 'Sorghum', hi: 'ज्वार' },
  { en: 'Millet (Bajra)', hi: 'बाजरा' },
  { en: 'Turmeric', hi: 'हल्दी' },
  { en: 'Ginger', hi: 'अदरक' },
  { en: 'Garlic', hi: 'लहसुन' },
];

const irrigationTypes = [
  { en: 'Canal Irrigation', hi: 'नहर सिंचाई' },
  { en: 'Borewell / Tubewell', hi: 'बोरवेल / ट्यूबवेल' },
  { en: 'Drip Irrigation', hi: 'ड्रिप सिंचाई' },
  { en: 'Sprinkler Irrigation', hi: 'स्प्रिंकलर सिंचाई' },
  { en: 'Rainwater / Barani', hi: 'बारानी (वर्षा आधारित)' },
  { en: 'River / Pond', hi: 'नदी / तालाब' },
];

const farmingTypes = [
  { en: 'Conventional Farming', hi: 'परंपरागत खेती' },
  { en: 'Organic Farming', hi: 'जैविक खेती' },
  { en: 'Natural Farming', hi: 'प्राकृतिक खेती' },
  { en: 'Mixed Farming', hi: 'मिश्रित खेती' },
  { en: 'Horticulture', hi: 'बागवानी' },
  { en: 'Sericulture', hi: 'रेशम खेती' },
];

const experienceOptions = [
  { en: 'Less than 1 year', hi: '1 साल से कम' },
  { en: '1 – 3 years', hi: '1 – 3 साल' },
  { en: '3 – 5 years', hi: '3 – 5 साल' },
  { en: '5 – 10 years', hi: '5 – 10 साल' },
  { en: '10 – 20 years', hi: '10 – 20 साल' },
  { en: 'More than 20 years', hi: '20 साल से अधिक' },
];

const landUnits = [
  { en: 'Acres', hi: 'एकड़' },
  { en: 'Hectares', hi: 'हेक्टेयर' },
  { en: 'Bigha', hi: 'बीघा' },
];

const TOTAL_STEPS = 4;

// ── Shared input styles ───────────────────────────────────────────────────────
const inputCls = "w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white";
const selectCls = "w-full px-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white text-gray-800";

export default function FarmerInfo({ onComplete, language }: FarmerInfoProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FarmerData>({
    name: '', phone: '',
    state: '', district: '', village: '',
    crop: '', secondaryCrop: '', landSize: '', landUnit: 'Acres',
    irrigationType: '', farmingType: '', experience: '',
  });

  const set = (key: keyof FarmerData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [key]: e.target.value }));

  const canProceed = (): boolean => {
    if (step === 1) return formData.name.trim().length > 0;
    if (step === 2) return formData.state !== '' && formData.district.trim().length > 0 && formData.village.trim().length > 0;
    if (step === 3) return formData.crop !== '' && formData.landSize.trim().length > 0;
    if (step === 4) return formData.irrigationType !== '' && formData.farmingType !== '' && formData.experience !== '';
    return false;
  };

  const handleNext = () => { if (canProceed() && step < TOTAL_STEPS) setStep(s => s + 1); };
  const handleBack = () => { if (step > 1) setStep(s => s - 1); };
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (canProceed()) onComplete(formData); };

  const stepMeta = [
    { icon: User,    en: 'Your Identity',   hi: 'आपकी पहचान' },
    { icon: MapPin,  en: 'Your Location',   hi: 'आपका स्थान' },
    { icon: Sprout,  en: 'Your Farm',       hi: 'आपका खेत' },
    { icon: Tractor, en: 'Farming Profile', hi: 'कृषि प्रोफाइल' },
  ];
  const current = stepMeta[step - 1];
  const CurrentIcon = current.icon;

  const label = (en: string, hi: string, optional = false) => (
    <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
      <span>{language === 'en' ? en : hi}</span>
      {optional && (
        <span className="text-sm font-normal text-gray-400">
          ({language === 'en' ? 'Optional' : 'वैकल्पिक'})
        </span>
      )}
    </label>
  );

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col">

      {/* Header */}
      <header className="bg-emerald-600 text-white px-4 py-6 shadow-md">
        <div className="flex justify-center mb-3">
          <Logo className="w-14 h-14" />
        </div>
        <h1 className="text-3xl font-bold text-center">
          {language === 'en' ? 'Kheti-Mitra AI' : 'खेती-मित्र AI'}
        </h1>
        <p className="text-center text-emerald-100 mt-1 text-base">
          {language === 'en' ? 'Your Smart Farming Assistant' : 'आपका स्मार्ट खेती सहायक'}
        </p>
      </header>

      {/* Progress */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-emerald-700">
            {language === 'en' ? `Step ${step} of ${TOTAL_STEPS}` : `चरण ${step} / ${TOTAL_STEPS}`}
          </span>
          <span className="text-sm text-gray-500 font-medium">
            {language === 'en' ? current.en : current.hi}
          </span>
        </div>
        {/* Step dots + bar */}
        <div className="relative w-full bg-gray-100 rounded-full h-2.5">
          <div
            className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <span
              key={i}
              className={`text-xs font-bold ${i + 1 <= step ? 'text-emerald-600' : 'text-gray-300'}`}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Form body — full width, no max-w constraint */}
      <div className="flex-1 px-4 py-5">
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Step banner */}
          <div className="bg-white rounded-xl border border-emerald-200 shadow-sm px-5 py-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CurrentIcon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {language === 'en' ? current.en : current.hi}
              </h2>
              <p className="text-sm text-gray-500">
                {language === 'en' ? 'Fill in the details below' : 'नीचे जानकारी भरें'}
              </p>
            </div>
          </div>

          {/* ── STEP 1: Identity ── */}
          {step === 1 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Full Name' : 'पूरा नाम'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={set('name')}
                  placeholder={language === 'en' ? 'Enter your full name' : 'अपना पूरा नाम लिखें'}
                  className={inputCls}
                  autoFocus
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Phone Number' : 'फोन नंबर'}
                  <span className="text-sm font-normal text-gray-400">
                    ({language === 'en' ? 'Optional' : 'वैकल्पिक'})
                  </span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={set('phone')}
                  placeholder={language === 'en' ? '10 digit mobile number' : '10 अंकों का मोबाइल नंबर'}
                  className={inputCls}
                  maxLength={10}
                />
              </div>
            </div>
          )}

          {/* ── STEP 2: Location ── */}
          {step === 2 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'State' : 'राज्य'}
                </label>
                <select value={formData.state} onChange={set('state')} className={selectCls}>
                  <option value="">{language === 'en' ? 'Select your state' : 'अपना राज्य चुनें'}</option>
                  {indianStates.map(o => (
                    <option key={o.en} value={o.en}>{language === 'en' ? o.en : o.hi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'District' : 'जिला'}
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={set('district')}
                  placeholder={language === 'en' ? 'Enter district name' : 'जिले का नाम लिखें'}
                  className={inputCls}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Village / Town' : 'गांव / कस्बा'}
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={set('village')}
                  placeholder={language === 'en' ? 'Enter village or town name' : 'गांव या कस्बे का नाम लिखें'}
                  className={inputCls}
                />
              </div>
            </div>
          )}

          {/* ── STEP 3: Farm ── */}
          {step === 3 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Main Crop' : 'मुख्य फसल'}
                </label>
                <select value={formData.crop} onChange={set('crop')} className={selectCls}>
                  <option value="">{language === 'en' ? 'Select main crop' : 'मुख्य फसल चुनें'}</option>
                  {crops.map(o => (
                    <option key={o.en} value={o.en}>{language === 'en' ? o.en : o.hi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <Sprout className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Secondary Crop' : 'दूसरी फसल'}
                  <span className="text-sm font-normal text-gray-400">
                    ({language === 'en' ? 'Optional' : 'वैकल्पिक'})
                  </span>
                </label>
                <select value={formData.secondaryCrop} onChange={set('secondaryCrop')} className={selectCls}>
                  <option value="">{language === 'en' ? 'Select secondary crop' : 'दूसरी फसल चुनें'}</option>
                  {crops.map(o => (
                    <option key={o.en} value={o.en}>{language === 'en' ? o.en : o.hi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <Layers className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Total Land Size' : 'कुल जमीन का आकार'}
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    value={formData.landSize}
                    onChange={set('landSize')}
                    placeholder={language === 'en' ? 'e.g. 2.5' : 'जैसे 2.5'}
                    min="0"
                    step="0.1"
                    className={inputCls + ' flex-1'}
                  />
                  <select
                    value={formData.landUnit}
                    onChange={set('landUnit')}
                    className="w-32 px-3 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none bg-white"
                  >
                    {landUnits.map(u => (
                      <option key={u.en} value={u.en}>{language === 'en' ? u.en : u.hi}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Farming profile ── */}
          {step === 4 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-5 space-y-5">
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <Droplets className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Irrigation Type' : 'सिंचाई का प्रकार'}
                </label>
                <select value={formData.irrigationType} onChange={set('irrigationType')} className={selectCls}>
                  <option value="">{language === 'en' ? 'Select irrigation type' : 'सिंचाई का प्रकार चुनें'}</option>
                  {irrigationTypes.map(o => (
                    <option key={o.en} value={o.en}>{language === 'en' ? o.en : o.hi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <Tractor className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Type of Farming' : 'खेती का प्रकार'}
                </label>
                <select value={formData.farmingType} onChange={set('farmingType')} className={selectCls}>
                  <option value="">{language === 'en' ? 'Select farming type' : 'खेती का प्रकार चुनें'}</option>
                  {farmingTypes.map(o => (
                    <option key={o.en} value={o.en}>{language === 'en' ? o.en : o.hi}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="flex items-center gap-2 text-gray-800 font-bold text-base mb-2">
                  <BadgeCheck className="w-5 h-5 text-emerald-600" />
                  {language === 'en' ? 'Years of Experience' : 'खेती का अनुभव'}
                </label>
                <select value={formData.experience} onChange={set('experience')} className={selectCls}>
                  <option value="">{language === 'en' ? 'Select experience' : 'अनुभव चुनें'}</option>
                  {experienceOptions.map(o => (
                    <option key={o.en} value={o.en}>{language === 'en' ? o.en : o.hi}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 pt-1">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center justify-center gap-2 bg-white border-2 border-emerald-500 text-emerald-700 rounded-xl px-5 py-4 font-bold text-base hover:bg-emerald-50 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
                {language === 'en' ? 'Back' : 'पीछे'}
              </button>
            )}
            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl px-6 py-4 font-bold text-lg transition-all shadow-md"
              >
                {language === 'en' ? 'Next' : 'आगे'}
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canProceed()}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl px-6 py-4 font-bold text-lg transition-all shadow-md"
              >
                {language === 'en' ? 'Go to Dashboard' : 'डैशबोर्ड पर जाएं'}
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          {language === 'en'
            ? 'Your information is safe and used only for personalized farming advice'
            : 'आपकी जानकारी सुरक्षित है और केवल व्यक्तिगत खेती सलाह के लिए उपयोग की जाएगी'}
        </p>
      </div>
    </div>
  );
}
