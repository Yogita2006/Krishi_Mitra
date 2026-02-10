import { useNavigate } from "react-router";
import { Home, Sprout, Cloud, User } from "lucide-react";

interface BottomNavProps {
  language: 'en' | 'hi';
  currentPage?: 'home' | 'crops' | 'weather' | 'profile';
}

export default function BottomNav({ language, currentPage = 'home' }: BottomNavProps) {
  const navigate = useNavigate();

  const tabs = [
    { 
      icon: Home, 
      labelEn: 'Home', 
      labelHi: 'होम', 
      page: 'home',
      path: '/dashboard'
    },
    { 
      icon: Sprout, 
      labelEn: 'My Crops', 
      labelHi: 'मेरी फसल', 
      page: 'crops',
      path: '/crops'
    },
    { 
      icon: Cloud, 
      labelEn: 'Weather', 
      labelHi: 'मौसम', 
      page: 'weather',
      path: '/weather'
    },
    { 
      icon: User, 
      labelEn: 'Profile', 
      labelHi: 'प्रोफाइल', 
      page: 'profile',
      path: '/profile'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-2xl">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = currentPage === tab.page;
          
          return (
            <button
              key={index}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
                isActive 
                  ? 'text-emerald-600 bg-emerald-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-7 h-7 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-xs font-bold ${isActive ? 'text-emerald-700' : 'text-gray-600'}`}>
                {language === 'en' ? tab.labelEn : tab.labelHi}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
