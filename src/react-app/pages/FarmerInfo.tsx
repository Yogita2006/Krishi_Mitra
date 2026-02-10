import { useState } from "react";
import { User, MapPin, Sprout, Phone, ChevronRight } from "lucide-react";
import Logo from "@/react-app/components/Logo";

interface FarmerInfoProps {
  onComplete: (info: FarmerData) => void;
  language: 'en' | 'hi';
}

export interface FarmerData {
  name: string;
  village: string;
  district: string;
  crop: string;
  phone: string;
}

export default function FarmerInfo({ onComplete, language }: FarmerInfoProps) {
  const [formData, setFormData] = useState<FarmerData>({
    name: '',
    village: '',
    district: '',
    crop: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.village && formData.crop) {
      onComplete(formData);
    }
  };

  const crops = [
    { en: 'Rice (Paddy)', hi: 'धान' },
    { en: 'Wheat', hi: 'गेहूं' },
    { en: 'Cotton', hi: 'कपास' },
    { en: 'Sugarcane', hi: 'गन्ना' },
    { en: 'Maize', hi: 'मक्का' },
    { en: 'Potato', hi: 'आलू' },
    { en: 'Tomato', hi: 'टमाटर' }
  ];

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col">
      <header className="bg-emerald-600 text-white px-4 py-6 shadow-md">
        <div className="flex justify-center mb-3">
          <Logo className="w-16 h-16" />
        </div>
        <h1 className="text-3xl font-bold text-center">
          {language === 'en' ? 'Kheti-Mitra AI' : 'खेती-मित्र AI'}
        </h1>
        <p className="text-center text-emerald-100 mt-2 text-lg">
          {language === 'en' ? 'Your Smart Farming Assistant' : 'आपका स्मार्ट खेती सहायक'}
        </p>
      </header>

      <div className="flex-1 px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="text-center mb-6">
            <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-emerald-700" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {language === 'en' ? 'Welcome Farmer!' : 'किसान भाई, स्वागत है!'}
            </h2>
            <p className="text-gray-600 text-lg">
              {language === 'en' 
                ? 'Tell us about yourself to get started' 
                : 'शुरू करने के लिए अपने बारे में बताएं'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
                <User className="w-5 h-5 text-emerald-600" />
                {language === 'en' ? 'Your Name' : 'आपका नाम'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={language === 'en' ? 'Enter your name' : 'अपना नाम लिखें'}
                className="w-full px-4 py-4 text-xl border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                required
              />
            </div>

            {/* Village */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                {language === 'en' ? 'Village' : 'गांव'}
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                placeholder={language === 'en' ? 'Enter village name' : 'गांव का नाम लिखें'}
                className="w-full px-4 py-4 text-xl border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                required
              />
            </div>

            {/* District */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                {language === 'en' ? 'District' : 'जिला'}
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                placeholder={language === 'en' ? 'Enter district name' : 'जिला का नाम लिखें'}
                className="w-full px-4 py-4 text-xl border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
              />
            </div>

            {/* Main Crop */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                {language === 'en' ? 'Main Crop' : 'मुख्य फसल'}
              </label>
              <select
                value={formData.crop}
                onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                className="w-full px-4 py-4 text-xl border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none bg-white"
                required
              >
                <option value="">
                  {language === 'en' ? 'Select your crop' : 'अपनी फसल चुनें'}
                </option>
                {crops.map((crop) => (
                  <option key={crop.en} value={crop.en}>
                    {language === 'en' ? crop.en : crop.hi}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-2">
                <Phone className="w-5 h-5 text-emerald-600" />
                {language === 'en' ? 'Phone Number' : 'फोन नंबर'}
                <span className="text-sm text-gray-500 font-normal">
                  ({language === 'en' ? 'Optional' : 'वैकल्पिक'})
                </span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder={language === 'en' ? '10 digit number' : '10 अंकों का नंबर'}
                className="w-full px-4 py-4 text-xl border-2 border-gray-300 rounded-lg focus:border-emerald-600 focus:outline-none"
                maxLength={10}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-5 font-bold text-xl flex items-center justify-center gap-3 transition-all shadow-md mt-6"
            >
              <span>
                {language === 'en' ? 'Continue to Dashboard' : 'डैशबोर्ड पर जाएं'}
              </span>
              <ChevronRight className="w-6 h-6" />
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
          <p className="text-sm text-gray-600 text-center leading-relaxed">
            {language === 'en' 
              ? 'Your information is safe and will be used only to provide personalized farming advice'
              : 'आपकी जानकारी सुरक्षित है और केवल व्यक्तिगत खेती सलाह देने के लिए उपयोग की जाएगी'}
          </p>
        </div>
      </div>
    </div>
  );
}
