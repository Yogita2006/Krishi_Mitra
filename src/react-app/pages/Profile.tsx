import { useNavigate } from "react-router";
import { User, MapPin, Sprout, Phone, Languages, Bell, HelpCircle, LogOut, ArrowLeft } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface ProfileProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
  onLanguageToggle: () => void;
}

export default function Profile({ farmerData, language, onLanguageToggle }: ProfileProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm(language === 'en' 
      ? 'Are you sure you want to logout?' 
      : 'क्या आप लॉगआउट करना चाहते हैं?')) {
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-24">
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Profile' : 'प्रोफाइल'}
          </h1>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Farmer Info Card */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center">
              <User className="w-10 h-10 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{farmerData.name}</h2>
              <p className="text-sm text-gray-600">
                {language === 'en' ? 'Farmer' : 'किसान'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <MapPin className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="text-xs text-gray-600">
                  {language === 'en' ? 'Location' : 'स्थान'}
                </p>
                <p className="font-bold text-gray-900">
                  {farmerData.village}{farmerData.district && `, ${farmerData.district}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <Sprout className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="text-xs text-gray-600">
                  {language === 'en' ? 'Main Crop' : 'मुख्य फसल'}
                </p>
                <p className="font-bold text-gray-900">{farmerData.crop}</p>
              </div>
            </div>

            {farmerData.phone && (
              <div className="flex items-center gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <Phone className="w-5 h-5 text-emerald-700" />
                <div>
                  <p className="text-xs text-gray-600">
                    {language === 'en' ? 'Phone Number' : 'फोन नंबर'}
                  </p>
                  <p className="font-bold text-gray-900">{farmerData.phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Settings' : 'सेटिंग्स'}
          </h3>
          
          <div className="space-y-2">
            <button
              onClick={onLanguageToggle}
              className="w-full flex items-center justify-between bg-emerald-50 hover:bg-emerald-100 rounded-lg p-4 border border-emerald-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-emerald-700" />
                <span className="font-bold text-gray-900">
                  {language === 'en' ? 'Language' : 'भाषा'}
                </span>
              </div>
              <span className="text-emerald-700 font-bold">
                {language === 'en' ? 'English' : 'हिंदी'}
              </span>
            </button>

            <button className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 transition-colors">
              <Bell className="w-5 h-5 text-gray-700" />
              <span className="font-bold text-gray-900">
                {language === 'en' ? 'Notifications' : 'सूचनाएं'}
              </span>
            </button>

            <button className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 rounded-lg p-4 border border-gray-200 transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-700" />
              <span className="font-bold text-gray-900">
                {language === 'en' ? 'Help & Support' : 'मदद और सहायता'}
              </span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-red-50 text-red-600 border-2 border-red-600 rounded-lg p-4 font-bold transition-colors shadow-md"
        >
          <LogOut className="w-5 h-5" />
          <span>{language === 'en' ? 'Logout' : 'लॉगआउट'}</span>
        </button>

        {/* App Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {language === 'en' ? 'Kheti-Mitra AI v1.0' : 'खेती-मित्र AI v1.0'}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {language === 'en' 
              ? 'Your Smart Farming Assistant' 
              : 'आपका स्मार्ट खेती सहायक'}
          </p>
        </div>
      </div>

      <BottomNav language={language} currentPage="profile" />
    </div>
  );
}
