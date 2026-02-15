import { useNavigate } from "react-router";
import { ArrowLeft, Shield, Eye, Lock, Database, UserCheck, Bell, Smartphone } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";

interface PrivacyProps {
  language: 'en' | 'hi';
}

export default function Privacy({ language }: PrivacyProps) {
  const navigate = useNavigate();

  const sections = [
    {
      icon: Database,
      titleEn: "Information We Collect",
      titleHi: "हम क्या जानकारी एकत्र करते हैं",
      contentEn: "We collect information you provide when creating your profile, including your name, location, crop details, land size, and contact information. We also collect usage data to improve our services.",
      contentHi: "हम आपकी प्रोफाइल बनाते समय आपके द्वारा प्रदान की गई जानकारी एकत्र करते हैं, जिसमें आपका नाम, स्थान, फसल विवरण, जमीन का आकार और संपर्क जानकारी शामिल है।"
    },
    {
      icon: Eye,
      titleEn: "How We Use Your Data",
      titleHi: "हम आपके डेटा का उपयोग कैसे करते हैं",
      contentEn: "Your data is used to provide personalized farming recommendations, weather alerts, market prices, and crop calendar. We analyze anonymized data to improve our AI models and services.",
      contentHi: "आपका डेटा व्यक्तिगत खेती सिफारिशें, मौसम अलर्ट, बाजार मूल्य और फसल कैलेंडर प्रदान करने के लिए उपयोग किया जाता है।"
    },
    {
      icon: Lock,
      titleEn: "Data Security",
      titleHi: "डेटा सुरक्षा",
      contentEn: "We use industry-standard encryption to protect your personal information. Your data is stored securely on protected servers with regular backups and security audits.",
      contentHi: "हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए उद्योग-मानक एन्क्रिप्शन का उपयोग करते हैं। आपका डेटा सुरक्षित सर्वर पर संग्रहीत किया जाता है।"
    },
    {
      icon: UserCheck,
      titleEn: "Your Rights",
      titleHi: "आपके अधिकार",
      contentEn: "You have the right to access, modify, or delete your personal data at any time. You can also export your data or request account deletion through the app settings.",
      contentHi: "आपको किसी भी समय अपने व्यक्तिगत डेटा तक पहुंचने, संशोधित करने या हटाने का अधिकार है। आप ऐप सेटिंग्स के माध्यम से अपना डेटा निर्यात या खाता हटाने का अनुरोध कर सकते हैं।"
    },
    {
      icon: Bell,
      titleEn: "Notifications",
      titleHi: "सूचनाएं",
      contentEn: "We send notifications for weather alerts, crop calendar reminders, and market updates. You can customize notification preferences in settings at any time.",
      contentHi: "हम मौसम अलर्ट, फसल कैलेंडर रिमाइंडर और बाजार अपडेट के लिए सूचनाएं भेजते हैं। आप किसी भी समय सेटिंग्स में सूचना प्राथमिकताएं अनुकूलित कर सकते हैं।"
    },
    {
      icon: Smartphone,
      titleEn: "Third-Party Services",
      titleHi: "तृतीय-पक्ष सेवाएं",
      contentEn: "We may use third-party services for weather data, market prices, and analytics. These services have their own privacy policies and we ensure they meet our security standards.",
      contentHi: "हम मौसम डेटा, बाजार मूल्य और विश्लेषण के लिए तृतीय-पक्ष सेवाओं का उपयोग कर सकते हैं। इन सेवाओं की अपनी गोपनीयता नीतियां हैं।"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate('/profile')}
            className="p-2 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">
              {language === 'en' ? 'Privacy Policy' : 'गोपनीयता नीति'}
            </h1>
            <p className="text-xs text-emerald-100">
              {language === 'en' ? 'How we protect your data' : 'हम आपके डेटा की सुरक्षा कैसे करते हैं'}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 mb-4 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
            <Shield className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">
            {language === 'en' ? 'Your Privacy Matters' : 'आपकी गोपनीयता मायने रखती है'}
          </h2>
          <p className="text-sm text-gray-600">
            {language === 'en' 
              ? 'We are committed to protecting your personal information and being transparent about how we use it.'
              : 'हम आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध हैं और इसका उपयोग कैसे करते हैं, इस बारे में पारदर्शी हैं।'}
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-emerald-50 rounded-xl px-4 py-3 mb-4 border-2 border-emerald-200">
          <p className="text-sm font-bold text-emerald-900">
            {language === 'en' ? '📅 Last Updated: February 14, 2026' : '📅 अंतिम अपडेट: 14 फरवरी, 2026'}
          </p>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-3">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-emerald-200">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-extrabold text-gray-900 mb-2">
                      {language === 'en' ? section.titleEn : section.titleHi}
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {language === 'en' ? section.contentEn : section.contentHi}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5 mt-4">
          <h3 className="text-lg font-extrabold text-gray-900 mb-3">
            {language === 'en' ? '📧 Questions?' : '📧 सवाल?'}
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {language === 'en' 
              ? 'If you have any questions about our privacy policy, please contact us:'
              : 'यदि हमारी गोपनीयता नीति के बारे में आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करें:'}
          </p>
          <div className="space-y-2">
            <div className="bg-gray-50 rounded-xl p-3 border-2 border-gray-200">
              <p className="text-xs text-gray-500 font-bold mb-1">
                {language === 'en' ? 'Email' : 'ईमेल'}
              </p>
              <p className="text-sm font-bold text-emerald-600">privacy@khetimitra.in</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3 border-2 border-gray-200">
              <p className="text-xs text-gray-500 font-bold mb-1">
                {language === 'en' ? 'Phone' : 'फोन'}
              </p>
              <p className="text-sm font-bold text-emerald-600">1800-XXX-XXXX</p>
            </div>
          </div>
        </div>
      </div>

      <BottomNav language={language} currentPage="profile" />
    </div>
  );
}
