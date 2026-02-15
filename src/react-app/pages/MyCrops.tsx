import { useNavigate } from "react-router";
import { Sprout, TrendingUp, Calendar, Droplet, Sun, ArrowLeft, ScanLine } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface MyCropsProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

export default function MyCrops({ farmerData, language }: MyCropsProps) {
  const navigate = useNavigate();

  const cropData = {
    name: farmerData.crop,
    stage: language === 'en' ? 'Flowering Stage' : 'फूल आने का चरण',
    daysPlanted: 65,
    expectedHarvest: 45,
    healthScore: 78,
    wateringSchedule: language === 'en' ? 'Every 3 days' : 'हर 3 दिन',
    lastWatered: language === 'en' ? '2 days ago' : '2 दिन पहले',
    yieldEstimate: language === 'en' ? '4.2 tons/hectare' : '4.2 टन/हेक्टेयर'
  };

  const activities = [
    {
      date: language === 'en' ? '3 days ago' : '3 दिन पहले',
      action: language === 'en' ? 'Applied fertilizer' : 'खाद डाली',
      type: 'fertilizer'
    },
    {
      date: language === 'en' ? '1 week ago' : '1 सप्ताह पहले',
      action: language === 'en' ? 'Pest control spray' : 'कीटनाशक छिड़काव',
      type: 'spray'
    },
    {
      date: language === 'en' ? '2 weeks ago' : '2 सप्ताह पहले',
      action: language === 'en' ? 'Irrigation' : 'सिंचाई',
      type: 'water'
    }
  ];

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
            {language === 'en' ? 'My Crops' : 'मेरी फसल'}
          </h1>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Current Crop Card */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-100 rounded-full p-3">
              <Sprout className="w-8 h-8 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{cropData.name}</h2>
              <p className="text-sm text-gray-600">{cropData.stage}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <p className="text-xs text-gray-600 mb-1">
                {language === 'en' ? 'Days Planted' : 'लगाए हुए दिन'}
              </p>
              <p className="text-2xl font-bold text-emerald-700">{cropData.daysPlanted}</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
              <p className="text-xs text-gray-600 mb-1">
                {language === 'en' ? 'Days to Harvest' : 'कटाई तक दिन'}
              </p>
              <p className="text-2xl font-bold text-emerald-700">{cropData.expectedHarvest}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-900">
                {language === 'en' ? 'Health Score' : 'स्वास्थ्य स्कोर'}
              </span>
              <span className="text-lg font-bold text-emerald-700">{cropData.healthScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-emerald-600 h-3 rounded-full"
                style={{ width: `${cropData.healthScore}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scan Crop — entry point to ImageCapture */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border border-emerald-200">
          <div className="flex items-center gap-3 mb-3">
            <ScanLine className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Scan Your Crop' : 'फसल स्कैन करें'}
            </h3>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            {language === 'en'
              ? 'Take a photo to detect diseases, weeds, or analyse soil'
              : 'रोग, खरपतवार पहचान या मिट्टी विश्लेषण के लिए फोटो लें'}
          </p>
          <button
            onClick={() => navigate('/capture')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-3 font-bold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <ScanLine className="w-4 h-4" />
            {language === 'en' ? 'Start Analysis' : 'विश्लेषण शुरू करें'}
          </button>
        </div>

        {/* Watering Info */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Droplet className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Watering Schedule' : 'पानी का समय'}
            </h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{language === 'en' ? 'Schedule' : 'समय-सारणी'}</span>
              <span className="font-bold text-gray-900">{cropData.wateringSchedule}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-700">{language === 'en' ? 'Last Watered' : 'आखिरी पानी'}</span>
              <span className="font-bold text-emerald-700">{cropData.lastWatered}</span>
            </div>
          </div>
        </div>

        {/* Yield Estimate */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Expected Yield' : 'अनुमानित उपज'}
            </h3>
          </div>
          <p className="text-2xl font-bold text-emerald-700">{cropData.yieldEstimate}</p>
          <p className="text-sm text-gray-600 mt-1">
            {language === 'en' ? 'Based on current conditions' : 'वर्तमान स्थिति के आधार पर'}
          </p>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">
              {language === 'en' ? 'Recent Activities' : 'हाल की गतिविधियां'}
            </h3>
          </div>
          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <div className="bg-emerald-600 rounded-full p-2 mt-1">
                  <Sun className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav language={language} currentPage="crops" />
    </div>
  );
}
