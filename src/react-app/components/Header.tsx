import { MapPin, Cloud, Wind } from "lucide-react";
import Logo from "@/react-app/components/Logo";
import type { Weather } from "@/data/agriculture";

interface HeaderProps {
  weather: Weather;
  language: 'en' | 'hi';
  location: string;
}

export default function Header({ weather, language, location }: HeaderProps) {
  return (
    <header className="bg-emerald-600 text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <Logo className="w-11 h-11" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {language === 'en' ? 'Kheti-Mitra AI' : 'खेती-मित्र AI'}
            </h1>
            <div className="flex items-center gap-1.5 text-sm text-emerald-50 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="font-medium">{location}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-emerald-700 rounded-lg px-3 py-2 text-sm">
        <div className="flex items-center gap-1.5">
          <Cloud className="w-5 h-5" />
          <span className="font-bold text-lg">{weather.temperature}°C</span>
        </div>
        <div className="h-6 w-px bg-emerald-500" />
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
          </svg>
          <span className="font-medium">{weather.rainChance}% {language === 'en' ? 'rain' : 'बारिश'}</span>
        </div>
        <div className="h-6 w-px bg-emerald-500" />
        <div className="flex items-center gap-1.5">
          <Wind className="w-4 h-4" />
          <span className="font-medium">{weather.windSpeed} km/h</span>
        </div>
      </div>
    </header>
  );
}
