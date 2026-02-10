import { AlertTriangle, Bug, CloudRain } from "lucide-react";
import type { Alert } from "@/data/agriculture";

interface AlertCardProps {
  alert: Alert;
  language: 'en' | 'hi';
}

export default function AlertCard({ alert, language }: AlertCardProps) {
  const getIcon = () => {
    switch (alert.type) {
      case 'pest':
        return <Bug className="w-8 h-8" />;
      case 'weather':
        return <CloudRain className="w-8 h-8" />;
      default:
        return <AlertTriangle className="w-8 h-8" />;
    }
  };

  const getBorderColor = () => {
    switch (alert.severity) {
      case 'high':
        return 'border-red-600';
      case 'medium':
        return 'border-orange-500';
      default:
        return 'border-yellow-500';
    }
  };

  return (
    <div className={`bg-white border-l-4 ${getBorderColor()} rounded-lg p-5 shadow-md mb-4`}>
      <div className="flex items-center gap-4">
        <div className="bg-emerald-100 rounded-full p-3">
          {getIcon()}
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold uppercase tracking-wider mb-1 text-gray-600">
            {language === 'en' ? 'Urgent Alert' : 'जरूरी सूचना'}
          </div>
          <h3 className="text-xl font-bold leading-tight text-gray-900">
            {language === 'en' ? alert.titleEn : alert.titleHi}
          </h3>
        </div>
      </div>
    </div>
  );
}
