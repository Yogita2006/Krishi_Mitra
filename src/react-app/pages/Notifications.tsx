import { useNavigate } from "react-router";
import { ArrowLeft, Bell, CheckCircle2, AlertTriangle, Info, TrendingUp } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface NotificationsProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'price';
  titleEn: string;
  titleHi: string;
  descEn: string;
  descHi: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    titleEn: 'Weather Alert',
    titleHi: 'मौसम अलर्ट',
    descEn: 'Heavy rain expected in 2 days. Plan irrigation accordingly.',
    descHi: '2 दिन में भारी बारिश की उम्मीद। सिंचाई की योजना बनाएं।',
    time: '2 hours ago',
    read: false
  },
  {
    id: '2',
    type: 'price',
    titleEn: 'Mandi Price Update',
    titleHi: 'मंडी भाव अपडेट',
    descEn: 'Rice prices increased by 5% in your local mandi.',
    descHi: 'आपकी स्थानीय मंडी में धान के दाम 5% बढ़े।',
    time: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'success',
    titleEn: 'Task Completed',
    titleHi: 'कार्य पूर्ण',
    descEn: 'You completed "Land Preparation" task for this month.',
    descHi: 'आपने इस महीने का "भूमि तैयारी" कार्य पूरा किया।',
    time: '1 day ago',
    read: true
  },
  {
    id: '4',
    type: 'info',
    titleEn: 'New Scheme Available',
    titleHi: 'नई योजना उपलब्ध',
    descEn: 'PM-KISAN scheme applications are now open. Apply today!',
    descHi: 'PM-KISAN योजना के आवेदन अब खुले हैं। आज आवेदन करें!',
    time: '2 days ago',
    read: true
  },
  {
    id: '5',
    type: 'info',
    titleEn: 'Soil Testing Reminder',
    titleHi: 'मिट्टी परीक्षण रिमाइंडर',
    descEn: 'Get your free soil health card from nearby Krishi Kendra.',
    descHi: 'नजदीकी कृषि केंद्र से मुफ्त मिट्टी कार्ड बनवाएं।',
    time: '3 days ago',
    read: true
  }
];

export default function Notifications({ farmerData, language }: NotificationsProps) {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'price':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-amber-50 border-amber-200';
      case 'price':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-emerald-50 pb-24">
      {/* Header */}
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/profile')} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Notifications' : 'सूचनाएं'}
            </h1>
            {unreadCount > 0 && (
              <p className="text-sm text-emerald-100">
                {unreadCount} {language === 'en' ? 'unread' : 'नई सूचनाएं'}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Notification Settings */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-bold text-gray-900">
                  {language === 'en' ? 'Push Notifications' : 'पुश नोटिफिकेशन'}
                </p>
                <p className="text-xs text-gray-600">
                  {language === 'en' ? 'Get alerts for important updates' : 'महत्वपूर्ण अपडेट के लिए अलर्ट पाएं'}
                </p>
              </div>
            </div>
            <label className="relative inline-block w-12 h-6">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-full h-full bg-gray-300 peer-checked:bg-emerald-600 rounded-full peer transition-colors"></div>
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-6"></div>
            </label>
          </div>
        </div>

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-center">
            <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-bold">
              {language === 'en' ? 'No notifications yet' : 'अभी तक कोई सूचना नहीं'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map(notif => (
              <div
                key={notif.id}
                className={`bg-white rounded-lg shadow-md border-2 p-4 ${
                  notif.read ? 'border-gray-200' : 'border-emerald-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getBgColor(notif.type)} border`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">
                        {language === 'en' ? notif.titleEn : notif.titleHi}
                      </h3>
                      {!notif.read && (
                        <div className="w-2 h-2 bg-emerald-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-2">
                      {language === 'en' ? notif.descEn : notif.descHi}
                    </p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Clear All Button */}
        {notifications.length > 0 && (
          <button className="w-full mt-4 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 rounded-lg py-3 font-bold transition-colors shadow-md">
            {language === 'en' ? 'Clear All Notifications' : 'सभी सूचनाएं हटाएं'}
          </button>
        )}
      </div>

      <BottomNav language={language} currentPage="profile" />
    </div>
  );
}
