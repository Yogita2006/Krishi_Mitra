import { useNavigate } from "react-router";
import { User, MapPin, Sprout, Phone, Languages, Bell, HelpCircle, LogOut, ArrowLeft, Layers, Droplets, Tractor, BadgeCheck, Edit, Settings, Shield, FileText, Award } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-emerald-600 text-white px-4 pt-4 pb-20 shadow-md relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">
              {language === 'en' ? 'My Profile' : 'मेरा प्रोफाइल'}
            </h1>
            <button
              onClick={() => navigate('/edit-profile')}
              className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 -mt-12 relative">
        {/* Profile Card with Avatar */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 p-6 mb-4">
          <div className="flex flex-col items-center -mt-20 mb-4">
            {/* Avatar */}
            <div className="bg-emerald-600 rounded-full w-32 h-32 flex items-center justify-center shadow-xl border-4 border-white">
              <User className="w-16 h-16 text-white" />
            </div>
            
            {/* Name and title */}
            <h2 className="text-2xl font-extrabold text-gray-900 mt-4 text-center">
              {farmerData.name}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <div className="bg-gray-100 px-3 py-1 rounded-full border-2 border-gray-200">
                <p className="text-sm font-bold text-gray-700">
                  {language === 'en' ? 'Farmer' : 'किसान'}
                </p>
              </div>
              {farmerData.experience && (
                <div className="bg-gray-100 px-3 py-1 rounded-full border-2 border-gray-200">
                  <p className="text-sm font-bold text-gray-700">
                    {farmerData.experience}
                  </p>
                </div>
              )}
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mt-3 text-gray-600">
              <MapPin className="w-4 h-4" />
              <p className="text-sm font-bold">
                {farmerData.village}{farmerData.district && `, ${farmerData.district}`}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t-2 border-gray-100">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-2 border-2 border-emerald-200">
                <Sprout className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-xs text-gray-500 font-bold">
                {language === 'en' ? 'Crops' : 'फसलें'}
              </p>
              <p className="text-sm font-extrabold text-gray-900">
                {farmerData.secondaryCrop ? '2' : '1'}
              </p>
            </div>
            
            {farmerData.landSize && (
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-2 border-2 border-emerald-200">
                  <Layers className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-xs text-gray-500 font-bold">
                  {language === 'en' ? 'Land' : 'जमीन'}
                </p>
                <p className="text-sm font-extrabold text-gray-900">
                  {farmerData.landSize} {farmerData.landUnit}
                </p>
              </div>
            )}
            
            {farmerData.phone && (
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-2 border-2 border-emerald-200">
                  <Phone className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-xs text-gray-500 font-bold">
                  {language === 'en' ? 'Contact' : 'संपर्क'}
                </p>
                <p className="text-xs font-extrabold text-gray-900">
                  {farmerData.phone.slice(0, 5)}...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Farm Details Section */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5 mb-4">
          <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <Tractor className="w-5 h-5 text-emerald-600" />
            {language === 'en' ? 'Farm Details' : 'खेत की जानकारी'}
          </h3>
          
          <div className="space-y-3">
            {/* Main Crop */}
            <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border-2 border-emerald-200">
                    <Sprout className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">
                      {language === 'en' ? 'Main Crop' : 'मुख्य फसल'}
                    </p>
                    <p className="font-extrabold text-gray-900">{farmerData.crop}</p>
                  </div>
                </div>
                <div className="bg-emerald-50 px-2 py-1 rounded-lg border-2 border-emerald-200">
                  <span className="text-xs font-bold text-emerald-700">Primary</span>
                </div>
              </div>
            </div>

            {/* Secondary Crop */}
            {farmerData.secondaryCrop && (
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border-2 border-emerald-200">
                    <Sprout className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">
                      {language === 'en' ? 'Secondary Crop' : 'दूसरी फसल'}
                    </p>
                    <p className="font-extrabold text-gray-900">{farmerData.secondaryCrop}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Irrigation Type */}
            {farmerData.irrigationType && (
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border-2 border-emerald-200">
                    <Droplets className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">
                      {language === 'en' ? 'Irrigation Type' : 'सिंचाई का प्रकार'}
                    </p>
                    <p className="font-extrabold text-gray-900">{farmerData.irrigationType}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Farming Type */}
            {farmerData.farmingType && (
              <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center border-2 border-emerald-200">
                    <Tractor className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">
                      {language === 'en' ? 'Farming Type' : 'खेती का प्रकार'}
                    </p>
                    <p className="font-extrabold text-gray-900">{farmerData.farmingType}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Settings Grid */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5 mb-4">
          <h3 className="text-lg font-extrabold text-gray-900 mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-700" />
            {language === 'en' ? 'Settings & Support' : 'सेटिंग्स और सहायता'}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Language Toggle */}
            <button
              onClick={onLanguageToggle}
              className="bg-emerald-50 hover:bg-emerald-100 rounded-xl p-4 border-2 border-emerald-200 transition-colors text-center"
            >
              <Languages className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-900 mb-1">
                {language === 'en' ? 'Language' : 'भाषा'}
              </p>
              <p className="text-xs font-extrabold text-emerald-600">
                {language === 'en' ? 'EN' : 'हिं'}
              </p>
            </button>

            {/* Notifications */}
            <button 
              onClick={() => navigate('/notifications')}
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border-2 border-gray-200 transition-colors text-center"
            >
              <Bell className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-900 mb-1">
                {language === 'en' ? 'Notifications' : 'सूचनाएं'}
              </p>
              <p className="text-xs font-extrabold text-emerald-600">3 New</p>
            </button>

            {/* Help & Support */}
            <button 
              onClick={() => navigate('/help-support')}
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border-2 border-gray-200 transition-colors text-center"
            >
              <HelpCircle className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-900 mb-1">
                {language === 'en' ? 'Help' : 'मदद'}
              </p>
              <p className="text-xs font-extrabold text-gray-600">24/7</p>
            </button>

            {/* Privacy */}
            <button 
              onClick={() => navigate('/privacy')}
              className="bg-gray-50 hover:bg-gray-100 rounded-xl p-4 border-2 border-gray-200 transition-colors text-center"
            >
              <Shield className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-gray-900 mb-1">
                {language === 'en' ? 'Privacy' : 'गोपनीयता'}
              </p>
              <p className="text-xs font-extrabold text-gray-600">Secure</p>
            </button>
          </div>
        </div>

        {/* Additional Options */}
        <div className="space-y-3 mb-4">
          <button 
            onClick={() => navigate('/terms')}
            className="w-full bg-white hover:bg-gray-50 rounded-xl p-4 border-2 border-gray-200 transition-colors flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-gray-200">
                <FileText className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900">
                  {language === 'en' ? 'Terms & Conditions' : 'नियम और शर्तें'}
                </p>
                <p className="text-xs text-gray-500">
                  {language === 'en' ? 'Read our policies' : 'हमारी नीतियां पढ़ें'}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-full p-2 border-2 border-gray-200">
              <ArrowLeft className="w-4 h-4 text-gray-600 rotate-180" />
            </div>
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-xl p-4 font-extrabold transition-colors shadow-sm mb-4"
        >
          <LogOut className="w-5 h-5" />
          <span>{language === 'en' ? 'Logout' : 'लॉगआउट'}</span>
        </button>

        {/* App Info */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-emerald-200">
            <Sprout className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-sm font-extrabold text-gray-900 mb-1">
            {language === 'en' ? 'Kheti-Mitra AI' : 'खेती-मित्र AI'}
          </p>
          <p className="text-xs text-gray-500 mb-2">
            {language === 'en' ? 'Version 1.0.0' : 'संस्करण 1.0.0'}
          </p>
          <p className="text-xs text-gray-500">
            {language === 'en' 
              ? 'Your Smart Farming Assistant' 
              : 'आपका स्मार्ट खेती सहायक'}
          </p>
        </div>
      </div>

      <div className="relative z-50">
        <BottomNav language={language} currentPage="profile" />
      </div>
    </div>
  );
}
