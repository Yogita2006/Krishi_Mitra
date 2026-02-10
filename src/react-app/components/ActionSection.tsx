import { Droplet, FlaskConical, SprayCan, Tractor, CheckCircle, XCircle } from "lucide-react";
import type { Action } from "@/data/agriculture";

interface ActionSectionProps {
  actions: Action[];
  type: 'do' | 'avoid';
  language: 'en' | 'hi';
}

export default function ActionSection({ actions, type, language }: ActionSectionProps) {
  const getIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactElement> = {
      'droplet': <Droplet className="w-8 h-8" />,
      'flask-conical': <FlaskConical className="w-8 h-8" />,
      'spray-can': <SprayCan className="w-8 h-8" />,
      'tractor': <Tractor className="w-8 h-8" />
    };
    return iconMap[iconName] || <CheckCircle className="w-8 h-8" />;
  };

  const StatusIcon = type === 'do' ? CheckCircle : XCircle;

  const titleText = type === 'do' 
    ? (language === 'en' ? 'Do This Today' : 'आज यह करें')
    : (language === 'en' ? 'Avoid Today' : 'आज यह न करें');

  return (
    <div className="bg-white rounded-lg p-5 shadow-md mb-4 border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <StatusIcon className="w-6 h-6 text-emerald-600" />
        <h2 className="text-xl font-bold text-gray-900">{titleText}</h2>
      </div>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-600 text-white rounded-full p-3 flex-shrink-0">
                {getIcon(action.icon)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1">
                  {language === 'en' ? action.titleEn : action.titleHi}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{action.details}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
