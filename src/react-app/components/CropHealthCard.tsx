import { Sprout, Calendar } from "lucide-react";
import type { CropHealth } from "@/data/agriculture";

interface CropHealthCardProps {
  crop: CropHealth;
  language: 'en' | 'hi';
}

export default function CropHealthCard({ crop, language }: CropHealthCardProps) {
  const getRiskDotColor = () => {
    switch (crop.riskLevel) {
      case 'safe':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'danger':
        return 'bg-red-500';
    }
  };

  const getRiskLabel = () => {
    if (language === 'en') {
      switch (crop.riskLevel) {
        case 'safe':
          return 'Healthy';
        case 'warning':
          return 'Attention Needed';
        case 'danger':
          return 'Danger';
      }
    } else {
      switch (crop.riskLevel) {
        case 'safe':
          return 'स्वस्थ';
        case 'warning':
          return 'ध्यान दें';
        case 'danger':
          return 'खतरा';
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-200 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-100 rounded-full p-3">
            <Sprout className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              {language === 'en' ? crop.cropNameEn : crop.cropNameHi}
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">
              {language === 'en' ? crop.growthStage : crop.growthStageHi}
            </p>
          </div>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 border border-gray-300">
          <span className={`w-2.5 h-2.5 rounded-full ${getRiskDotColor()} animate-pulse`} />
          <span className="text-gray-900">{getRiskLabel()}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-gray-700 bg-emerald-50 rounded-lg px-4 py-3">
        <Calendar className="w-5 h-5 text-emerald-600" />
        <span className="font-semibold text-lg">
          {crop.daysToHarvest} {language === 'en' ? 'days to harvest' : 'दिन बाकी'}
        </span>
      </div>
    </div>
  );
}
