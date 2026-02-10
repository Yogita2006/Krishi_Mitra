import { useNavigate } from "react-router";
import { Cloud, CloudRain, Sun, Wind, Droplet, Thermometer, ArrowLeft } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface WeatherProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

export default function Weather({ farmerData, language }: WeatherProps) {
  const navigate = useNavigate();

  const forecast = [
    {
      day: language === 'en' ? 'Today' : 'आज',
      temp: 32,
      rain: 20,
      condition: 'sunny'
    },
    {
      day: language === 'en' ? 'Tomorrow' : 'कल',
      temp: 31,
      rain: 35,
      condition: 'partly-cloudy'
    },
    {
      day: language === 'en' ? 'Day 3' : 'दिन 3',
      temp: 29,
      rain: 60,
      condition: 'rainy'
    },
    {
      day: language === 'en' ? 'Day 4' : 'दिन 4',
      temp: 28,
      rain: 75,
      condition: 'rainy'
    },
    {
      day: language === 'en' ? 'Day 5' : 'दिन 5',
      temp: 30,
      rain: 40,
      condition: 'partly-cloudy'
    }
  ];

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'rainy':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-500" />;
    }
  };

  const farmingAdvice = [
    {
      titleEn: 'Good for Irrigation',
      titleHi: 'सिंचाई के लिए अच्छा',
      descEn: 'Next 2 days are dry - good time to water crops',
      descHi: 'अगले 2 दिन सूखे - फसलों को पानी देने का अच्छा समय'
    },
    {
      titleEn: 'Avoid Spraying',
      titleHi: 'छिड़काव से बचें',
      descEn: 'Rain expected in 3 days - wait to spray pesticides',
      descHi: '3 दिनों में बारिश की उम्मीद - कीटनाशक छिड़काव रुकें'
    },
    {
      titleEn: 'Prepare Drainage',
      titleHi: 'जल निकासी तैयार करें',
      descEn: 'Heavy rain forecast - check drainage systems',
      descHi: 'भारी बारिश का अनुमान - जल निकासी की जांच करें'
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
            {language === 'en' ? 'Weather Forecast' : 'मौसम पूर्वानुमान'}
          </h1>
        </div>
        <p className="text-emerald-100 text-sm ml-14">
          {farmerData.village}{farmerData.district && `, ${farmerData.district}`}
        </p>
      </header>

      <div className="px-4 py-4">
        {/* Current Weather */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="text-center mb-4">
            <div className="flex justify-center mb-3">
              <Sun className="w-20 h-20 text-yellow-500" />
            </div>
            <p className="text-5xl font-bold text-gray-900 mb-2">32°C</p>
            <p className="text-lg text-gray-600">
              {language === 'en' ? 'Sunny' : 'धूप'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200 text-center">
              <Droplet className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-1">
                {language === 'en' ? 'Rain' : 'बारिश'}
              </p>
              <p className="text-lg font-bold text-gray-900">20%</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200 text-center">
              <Wind className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-1">
                {language === 'en' ? 'Wind' : 'हवा'}
              </p>
              <p className="text-lg font-bold text-gray-900">12 km/h</p>
            </div>
            <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200 text-center">
              <Thermometer className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <p className="text-xs text-gray-600 mb-1">
                {language === 'en' ? 'Humidity' : 'नमी'}
              </p>
              <p className="text-lg font-bold text-gray-900">65%</p>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'en' ? '5-Day Forecast' : '5 दिन का पूर्वानुमान'}
          </h3>
          <div className="space-y-3">
            {forecast.map((day, index) => (
              <div key={index} className="flex items-center justify-between bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                <span className="font-bold text-gray-900 w-20">{day.day}</span>
                <div className="flex items-center gap-3 flex-1 justify-center">
                  {getWeatherIcon(day.condition)}
                  <span className="text-xl font-bold text-gray-900">{day.temp}°C</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600">
                  <Droplet className="w-4 h-4" />
                  <span className="font-bold">{day.rain}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farming Advice */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Farming Advice Based on Weather' : 'मौसम के आधार पर खेती सलाह'}
          </h3>
          <div className="space-y-3">
            {farmingAdvice.map((advice, index) => (
              <div key={index} className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <h4 className="font-bold text-gray-900 mb-1">
                  {language === 'en' ? advice.titleEn : advice.titleHi}
                </h4>
                <p className="text-sm text-gray-700">
                  {language === 'en' ? advice.descEn : advice.descHi}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav language={language} currentPage="weather" />
    </div>
  );
}
