import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { Languages } from "lucide-react";
import FarmerInfo, { FarmerData } from "@/react-app/pages/FarmerInfo";
import HomePage from "@/react-app/pages/Home";
import MyCrops from "@/react-app/pages/MyCrops";
import Weather from "@/react-app/pages/Weather";
import Profile from "@/react-app/pages/Profile";
import ImageCapture from "@/react-app/pages/ImageCapture";
import MandiPrices from "@/react-app/pages/Mandiprices";
import Schemes from "@/react-app/pages/Schemes";
import CropCalendar from "@/react-app/pages/Cropcalender";
import AIChat from "@/react-app/pages/AIchat";
import Notifications from "@/react-app/pages/Notifications";
import HelpSupport from "@/react-app/pages/Helpsupport";
import Privacy from "@/react-app/pages/Privacy";
import Terms from "@/react-app/pages/Terms";
import Help from "@/react-app/pages/Help";

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
            path="/notifications"
            element={
              farmerData ? (
                <Notifications
                  farmerData={farmerData}
                  language={language}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/help-support"
            element={
              farmerData ? (
                <HelpSupport
                  farmerData={farmerData}
                  language={language}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          {/* Privacy Policy Page */}
          <Route
            path="/privacy"
            element={<Privacy language={language} />}
          />
          {/* Terms & Conditions Page */}
          <Route
            path="/terms"
            element={<Terms language={language} />}
          />
          {/* Help Page */}
          <Route
            path="/help"
            element={<Help language={language} />}
          />
          {/* /capture — no :type param needed; ImageCapture manages type internally */}
          <Route
            path="/capture"
            element={
              farmerData ? (
                <ImageCapture
                  farmerData={farmerData}
                  language={language}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/mandi"
            element={
              farmerData ? (
                <MandiPrices farmerData={farmerData} language={language} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/schemes"
            element={
              farmerData ? (
                <Schemes farmerData={farmerData} language={language} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/calendar"
            element={
              farmerData ? (
                <CropCalendar farmerData={farmerData} language={language} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/chat"
            element={
              farmerData ? (
                <AIChat farmerData={farmerData} language={language} />
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
