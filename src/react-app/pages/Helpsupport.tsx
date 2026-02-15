import { useNavigate } from "react-router";
import { ArrowLeft, Phone, Mail, MessageCircle, HelpCircle, Book, Video, ChevronRight } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface HelpSupportProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

export default function HelpSupport({ farmerData, language }: HelpSupportProps) {
  const navigate = useNavigate();

  const helpTopics = [
    {
      titleEn: 'Getting Started',
      titleHi: 'शुरुआत करना',
      descEn: 'Learn how to use the app',
      descHi: 'ऐप का उपयोग करना सीखें'
    },
    {
      titleEn: 'Crop Calendar',
      titleHi: 'फसल कैलेंडर',
      descEn: 'How to track farming tasks',
      descHi: 'खेती के कार्यों को ट्रैक करना'
    },
    {
      titleEn: 'Mandi Prices',
      titleHi: 'मंडी भाव',
      descEn: 'Understanding market rates',
      descHi: 'बाजार भाव समझना'
    },
    {
      titleEn: 'Government Schemes',
      titleHi: 'सरकारी योजनाएं',
      descEn: 'How to apply for benefits',
      descHi: 'लाभ के लिए आवेदन करना'
    }
  ];

  const faqs = [
    {
      qEn: 'How do I change language?',
      qHi: 'भाषा कैसे बदलें?',
      aEn: 'Go to Profile > Settings > Language to switch between English and Hindi.',
      aHi: 'प्रोफाइल > सेटिंग्स > भाषा पर जाएं और अंग्रेजी/हिंदी चुनें।'
    },
    {
      qEn: 'Are mandi prices updated daily?',
      qHi: 'क्या मंडी भाव रोज अपडेट होते हैं?',
      aEn: 'Yes, prices are updated daily from official government sources.',
      aHi: 'हां, भाव रोज सरकारी स्रोतों से अपडेट होते हैं।'
    },
    {
      qEn: 'How do I mark tasks as complete?',
      qHi: 'कार्य कैसे पूर्ण करें?',
      aEn: 'In Crop Calendar, simply tap on any task to mark it as complete.',
      aHi: 'फसल कैलेंडर में, किसी भी कार्य पर टैप करके पूर्ण करें।'
    }
  ];

  return (
    <div className="min-h-screen bg-emerald-50 pb-24">
      {/* Header */}
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/profile')} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">
              {language === 'en' ? 'Help & Support' : 'मदद और सहायता'}
            </h1>
            <p className="text-sm text-emerald-100">
              {language === 'en' ? 'We are here to help' : 'हम आपकी मदद के लिए हैं'}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Contact Options */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Contact Us' : 'संपर्क करें'}
          </h2>
          <div className="space-y-3">
            <button className="w-full flex items-center gap-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg p-4 transition-colors">
              <Phone className="w-5 h-5 text-emerald-600" />
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900">
                  {language === 'en' ? 'Call Helpline' : 'हेल्पलाइन कॉल करें'}
                </p>
                <p className="text-xs text-gray-600">1800-180-1551 (Toll Free)</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center gap-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg p-4 transition-colors">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900">
                  {language === 'en' ? 'WhatsApp Support' : 'WhatsApp सहायता'}
                </p>
                <p className="text-xs text-gray-600">
                  {language === 'en' ? 'Chat with us' : 'हमसे बात करें'}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>

            <button className="w-full flex items-center gap-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg p-4 transition-colors">
              <Mail className="w-5 h-5 text-emerald-600" />
              <div className="flex-1 text-left">
                <p className="font-bold text-gray-900">
                  {language === 'en' ? 'Email Us' : 'ईमेल करें'}
                </p>
                <p className="text-xs text-gray-600">support@khetimitra.gov.in</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Help Topics */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            {language === 'en' ? 'Help Topics' : 'सहायता विषय'}
          </h2>
          <div className="space-y-2">
            {helpTopics.map((topic, idx) => (
              <button
                key={idx}
                className="w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg p-4 transition-colors"
              >
                <Book className="w-5 h-5 text-gray-600" />
                <div className="flex-1 text-left">
                  <p className="font-bold text-gray-900">
                    {language === 'en' ? topic.titleEn : topic.titleHi}
                  </p>
                  <p className="text-xs text-gray-600">
                    {language === 'en' ? topic.descEn : topic.descHi}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Video Tutorials */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <Video className="w-6 h-6 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {language === 'en' ? 'Video Tutorials' : 'वीडियो ट्यूटोरियल'}
              </h3>
              <p className="text-xs text-gray-600">
                {language === 'en' ? 'Learn by watching' : 'देखकर सीखें'}
              </p>
            </div>
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors">
            {language === 'en' ? 'Watch Videos' : 'वीडियो देखें'}
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            {language === 'en' ? 'Frequently Asked Questions' : 'अक्सर पूछे जाने वाले प्रश्न'}
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                <p className="font-bold text-gray-900 mb-2">
                  {language === 'en' ? faq.qEn : faq.qHi}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {language === 'en' ? faq.aEn : faq.aHi}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Kheti-Mitra AI v1.0</p>
          <p className="text-xs text-gray-500 mt-1">
            {language === 'en' ? 'Your Smart Farming Assistant' : 'आपका स्मार्ट खेती सहायक'}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {language === 'en' ? '© 2024 Government of India' : '© 2024 भारत सरकार'}
          </p>
        </div>
      </div>

      <BottomNav language={language} currentPage="profile" />
    </div>
  );
}
