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

export default function Home({ farmerData, language }: HomeProps) {
  const handleVoiceAdvice = () => {
    alert(language === 'en' 
      ? '🔊 Voice feature would play Hindi audio advice here' 
      : '🔊 यहां हिंदी में सलाह सुनाई जाएगी'
    );
  };

  const location = farmerData.district 
    ? `${farmerData.village}, ${farmerData.district}`
    : farmerData.village;

  return (
    <div className="min-h-screen bg-emerald-50 pb-24">
      <Header weather={currentWeather} language={language} location={location} />
      
      <div className="px-4 py-4">
        {/* Farmer Greeting */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-emerald-200">
          <p className="text-lg font-bold text-emerald-900">
            {language === 'en' ? `Welcome, ${farmerData.name}!` : `स्वागत है, ${farmerData.name}!`}
          </p>
          <p className="text-sm text-emerald-700">
            {farmerData.village}{farmerData.district && `, ${farmerData.district}`}
          </p>
        </div>

        <AlertCard alert={currentAlert} language={language} />
        <CropHealthCard crop={cropHealth} language={language} />
        
        <VoiceButton language={language} onClick={handleVoiceAdvice} />
        
        <ActionSection 
          actions={doActions}
          type="do"
          language={language}
        />
        
        <ActionSection 
          actions={avoidActions}
          type="avoid"
          language={language}
        />
        
        <TreatmentCard treatment={currentTreatment} language={language} />
      </div>

      <BottomNav language={language} currentPage="home" />
    </div>
  );
}
