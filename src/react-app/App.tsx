import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Languages } from "lucide-react";
import FarmerInfo, { FarmerData } from "@/react-app/pages/FarmerInfo";
import HomePage from "@/react-app/pages/Home";
import MyCrops from "@/react-app/pages/MyCrops";
import Weather from "@/react-app/pages/Weather";
import Profile from "@/react-app/pages/Profile";
import ImageCapture from "@/react-app/pages/ImageCapture";

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleFarmerInfoComplete = (data: FarmerData) => {
    setFarmerData(data);
  };

  return (
    <Router>
      <div className="relative">
        {/* Language Toggle - Fixed Position */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-full px-4 py-2 font-bold text-sm shadow-md transition-all"
          >
            <Languages className="w-4 h-4" />
            <span>{language === 'en' ? 'हिंदी' : 'English'}</span>
          </button>
        </div>

        <Routes>
          <Route 
            path="/" 
            element={
              farmerData ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <FarmerInfo 
                  onComplete={handleFarmerInfoComplete} 
                  language={language}
                />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              farmerData ? (
                <HomePage 
                  farmerData={farmerData}
                  language={language}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/crops" 
            element={
              farmerData ? (
                <MyCrops 
                  farmerData={farmerData}
                  language={language}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/weather" 
            element={
              farmerData ? (
                <Weather 
                  farmerData={farmerData}
                  language={language}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              farmerData ? (
                <Profile 
                  farmerData={farmerData}
                  language={language}
                  onLanguageToggle={toggleLanguage}
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route 
            path="/capture/:type" 
            element={
              farmerData ? (
                <ImageCapture 
                  farmerData={farmerData}
                  language={language}
                  analysisType="disease"
                />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}
