import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, HelpCircle, Phone, Mail, MessageCircle, ChevronDown, ChevronUp, Book, Video, Users, Headphones } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";

interface HelpProps {
  language: 'en' | 'hi';
}

export default function Help({ language }: HelpProps) {
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      questionEn: "How do I add a new crop to my calendar?",
      questionHi: "मैं अपने कैलेंडर में नई फसल कैसे जोड़ूं?",
      answerEn: "Go to Profile > Edit Profile and update your crop information. The calendar will automatically adjust to show relevant tasks for your crop.",
      answerHi: "प्रोफाइल > प्रोफाइल संपादित करें पर जाएं और अपनी फसल जानकारी अपडेट करें। कैलेंडर स्वचालित रूप से आपकी फसल के लिए प्रासंगिक कार्य दिखाएगा।"
    },
    {
      questionEn: "How accurate are the weather predictions?",
      questionHi: "मौसम की भविष्यवाणी कितनी सटीक है?",
      answerEn: "We use data from multiple weather services to provide accurate forecasts. Short-term predictions (1-3 days) are more accurate than long-term forecasts.",
      answerHi: "हम सटीक पूर्वानुमान प्रदान करने के लिए कई मौसम सेवाओं से डेटा का उपयोग करते हैं। अल्पकालिक भविष्यवाणी (1-3 दिन) दीर्घकालिक पूर्वानुमान से अधिक सटीक हैं।"
    },
    {
      questionEn: "Can I track expenses for multiple crops?",
      questionHi: "क्या मैं कई फसलों के लिए खर्च ट्रैक कर सकता हूं?",
      answerEn: "Yes! Use the calendar to add expenses on specific dates and categorize them by crop. You can view expense reports by crop in the Expenses tab.",
      answerHi: "हाँ! विशिष्ट तिथियों पर खर्च जोड़ने के लिए कैलेंडर का उपयोग करें और उन्हें फसल द्वारा वर्गीकृत करें।"
    },
    {
      questionEn: "How do I change the language?",
      questionHi: "मैं भाषा कैसे बदलूं?",
      answerEn: "Go to Profile > Settings and tap on the Language button. You can switch between English and Hindi anytime.",
      answerHi: "प्रोफाइल > सेटिंग्स पर जाएं और भाषा बटन पर टैप करें। आप किसी भी समय अंग्रेजी और हिंदी के बीच स्विच कर सकते हैं।"
    },
    {
      questionEn: "Are mandi prices updated in real-time?",
      questionHi: "क्या मंडी भाव वास्तविक समय में अपडेट होते हैं?",
      answerEn: "Mandi prices are updated daily from government sources. We show the latest available modal prices from nearby mandis.",
      answerHi: "मंडी भाव सरकारी स्रोतों से दैनिक रूप से अपडेट किए जाते हैं। हम नजदीकी मंडियों से नवीनतम उपलब्ध मोडल भाव दिखाते हैं।"
    },
    {
      questionEn: "How do I delete my account?",
      questionHi: "मैं अपना खाता कैसे हटाऊं?",
      answerEn: "Go to Profile > Settings > Privacy and scroll to the bottom. You'll find the account deletion option. All your data will be permanently deleted.",
      answerHi: "प्रोफाइल > सेटिंग्स > गोपनीयता पर जाएं और नीचे स्क्रॉल करें। आपको खाता हटाने का विकल्प मिलेगा।"
    }
  ];

  const supportOptions = [
    {
      icon: Phone,
      titleEn: "Phone Support",
      titleHi: "फोन सहायता",
      descEn: "Mon-Sat, 9 AM - 6 PM",
      descHi: "सोम-शनि, सुबह 9 - शाम 6",
      value: "1800-XXX-XXXX",
      color: "emerald"
    },
    {
      icon: Mail,
      titleEn: "Email Support",
      titleHi: "ईमेल सहायता",
      descEn: "Response within 24 hours",
      descHi: "24 घंटे में जवाब",
      value: "support@khetimitra.in",
      color: "blue"
    },
    {
      icon: MessageCircle,
      titleEn: "WhatsApp",
      titleHi: "व्हाट्सएप",
      descEn: "Chat with us anytime",
      descHi: "किसी भी समय चैट करें",
      value: "+91-XXXXX-XXXXX",
      color: "green"
    },
    {
      icon: Headphones,
      titleEn: "Live Chat",
      titleHi: "लाइव चैट",
      descEn: "Available 24/7",
      descHi: "24/7 उपलब्ध",
      value: "Start Chat",
      color: "purple"
    }
  ];

  const resources = [
    {
      icon: Book,
      titleEn: "User Guide",
      titleHi: "उपयोगकर्ता गाइड",
      descEn: "Complete app tutorial",
      descHi: "पूर्ण ऐप ट्यूटोरियल"
    },
    {
      icon: Video,
      titleEn: "Video Tutorials",
      titleHi: "वीडियो ट्यूटोरियल",
      descEn: "Watch how-to videos",
      descHi: "कैसे करें वीडियो देखें"
    },
    {
      icon: Users,
      titleEn: "Community Forum",
      titleHi: "समुदाय मंच",
      descEn: "Connect with farmers",
      descHi: "किसानों से जुड़ें"
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
              {language === 'en' ? 'Help & Support' : 'मदद और सहायता'}
            </h1>
            <p className="text-xs text-emerald-100">
              {language === 'en' ? "We're here to help" : 'हम मदद के लिए यहां हैं'}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 mb-4 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
            <HelpCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">
            {language === 'en' ? 'How can we help you?' : 'हम आपकी कैसे मदद कर सकते हैं?'}
          </h2>
          <p className="text-sm text-gray-600">
            {language === 'en' 
              ? 'Find answers to common questions or get in touch with our support team.'
              : 'सामान्य प्रश्नों के उत्तर खोजें या हमारी सहायता टीम से संपर्क करें।'}
          </p>
        </div>

        {/* Contact Options */}
        <div className="mb-4">
          <h3 className="text-lg font-extrabold text-gray-900 mb-3 px-1">
            {language === 'en' ? 'Contact Us' : 'हमसे संपर्क करें'}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {supportOptions.map((option, idx) => {
              const Icon = option.icon;
              return (
                <button
                  key={idx}
                  className="bg-white hover:bg-gray-50 rounded-2xl p-4 border-2 border-gray-200 transition-all active:scale-95 text-left"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-3 border-2 border-emerald-200">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="font-extrabold text-gray-900 text-sm mb-1">
                    {language === 'en' ? option.titleEn : option.titleHi}
                  </h4>
                  <p className="text-xs text-gray-500 mb-2">
                    {language === 'en' ? option.descEn : option.descHi}
                  </p>
                  <p className="text-xs font-bold text-emerald-600 truncate">{option.value}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-4">
          <h3 className="text-lg font-extrabold text-gray-900 mb-3 px-1">
            {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
          </h3>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-left text-sm">
                    {language === 'en' ? faq.questionEn : faq.questionHi}
                  </span>
                  {expandedFaq === idx ? (
                    <ChevronUp className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === idx && (
                  <div className="px-5 pb-4 pt-2 border-t-2 border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {language === 'en' ? faq.answerEn : faq.answerHi}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div className="mb-4">
          <h3 className="text-lg font-extrabold text-gray-900 mb-3 px-1">
            {language === 'en' ? 'Learning Resources' : 'सीखने के संसाधन'}
          </h3>
          <div className="space-y-2">
            {resources.map((resource, idx) => {
              const Icon = resource.icon;
              return (
                <button
                  key={idx}
                  className="w-full bg-white hover:bg-gray-50 rounded-2xl p-4 border-2 border-gray-200 transition-all active:scale-95 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center border-2 border-emerald-200 flex-shrink-0">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-extrabold text-gray-900 text-sm">
                      {language === 'en' ? resource.titleEn : resource.titleHi}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {language === 'en' ? resource.descEn : resource.descHi}
                    </p>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400 rotate-[-90deg]" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Emergency Support */}
        <div className="bg-emerald-50 rounded-2xl shadow-sm border-2 border-emerald-200 p-5">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-emerald-200">
              <Phone className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-extrabold text-emerald-900 mb-2">
                {language === 'en' ? '24/7 Emergency Support' : '24/7 आपातकालीन सहायता'}
              </h3>
              <p className="text-sm text-emerald-800 mb-3 leading-relaxed">
                {language === 'en' 
                  ? 'For urgent farming issues or pest outbreaks, call our emergency helpline:'
                  : 'तत्काल खेती के मुद्दों या कीट प्रकोप के लिए, हमारी आपातकालीन हेल्पलाइन पर कॉल करें:'}
              </p>
              <div className="bg-white rounded-xl p-3 border-2 border-emerald-200">
                <p className="text-lg font-extrabold text-emerald-600">1800-XXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav language={language} currentPage="profile" />
    </div>
  );
}
