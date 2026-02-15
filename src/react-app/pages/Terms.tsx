import { useNavigate } from "react-router";
import { ArrowLeft, FileText, CheckCircle, XCircle, AlertTriangle, Scale, UserX, RefreshCw } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";

interface TermsProps {
  language: 'en' | 'hi';
}

export default function Terms({ language }: TermsProps) {
  const navigate = useNavigate();

  const sections = [
    {
      icon: CheckCircle,
      titleEn: "Acceptance of Terms",
      titleHi: "नियमों की स्वीकृति",
      contentEn: "By using Kheti-Mitra AI, you agree to these terms and conditions. Please read them carefully before using our services. Continued use constitutes acceptance of any updates to these terms.",
      contentHi: "खेती-मित्र AI का उपयोग करके, आप इन नियमों और शर्तों से सहमत होते हैं। कृपया हमारी सेवाओं का उपयोग करने से पहले उन्हें ध्यान से पढ़ें।"
    },
    {
      icon: UserX,
      titleEn: "User Responsibilities",
      titleHi: "उपयोगकर्ता जिम्मेदारियां",
      contentEn: "You are responsible for maintaining the confidentiality of your account. You must provide accurate information and update it as needed. You agree not to misuse the app or use it for illegal purposes.",
      contentHi: "आप अपने खाते की गोपनीयता बनाए रखने के लिए जिम्मेदार हैं। आपको सटीक जानकारी प्रदान करनी होगी और आवश्यकतानुसार इसे अपडेट करना होगा।"
    },
    {
      icon: AlertTriangle,
      titleEn: "Service Disclaimer",
      titleHi: "सेवा अस्वीकरण",
      contentEn: "Our recommendations are based on AI analysis and available data. While we strive for accuracy, we cannot guarantee results. Agricultural decisions should consider local conditions and expert advice.",
      contentHi: "हमारी सिफारिशें AI विश्लेषण और उपलब्ध डेटा पर आधारित हैं। हालांकि हम सटीकता के लिए प्रयास करते हैं, हम परिणामों की गारंटी नहीं दे सकते।"
    },
    {
      icon: Scale,
      titleEn: "Intellectual Property",
      titleHi: "बौद्धिक संपदा",
      contentEn: "All content, features, and functionality of Kheti-Mitra AI are owned by us and protected by copyright and trademark laws. You may not copy, modify, or distribute our content without permission.",
      contentHi: "खेती-मित्र AI की सभी सामग्री, सुविधाएं और कार्यक्षमता हमारी संपत्ति हैं और कॉपीराइट और ट्रेडमार्क कानूनों द्वारा संरक्षित हैं।"
    },
    {
      icon: XCircle,
      titleEn: "Limitation of Liability",
      titleHi: "दायित्व की सीमा",
      contentEn: "We are not liable for any damages arising from your use of the app, including crop losses, financial losses, or data loss. Use the app at your own risk and always verify information independently.",
      contentHi: "हम ऐप के उपयोग से उत्पन्न किसी भी नुकसान के लिए उत्तरदायी नहीं हैं, जिसमें फसल का नुकसान, वित्तीय नुकसान या डेटा हानि शामिल है।"
    },
    {
      icon: RefreshCw,
      titleEn: "Changes to Terms",
      titleHi: "नियमों में बदलाव",
      contentEn: "We may update these terms from time to time. We will notify you of significant changes through the app. Continued use after changes means you accept the new terms.",
      contentHi: "हम समय-समय पर इन नियमों को अपडेट कर सकते हैं। हम ऐप के माध्यम से महत्वपूर्ण परिवर्तनों के बारे में आपको सूचित करेंगे।"
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
              {language === 'en' ? 'Terms & Conditions' : 'नियम और शर्तें'}
            </h1>
            <p className="text-xs text-emerald-100">
              {language === 'en' ? 'Please read carefully' : 'कृपया ध्यान से पढ़ें'}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-4">
        {/* Hero Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-6 mb-4 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-200">
            <FileText className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">
            {language === 'en' ? 'Terms of Service' : 'सेवा की शर्तें'}
          </h2>
          <p className="text-sm text-gray-600">
            {language === 'en' 
              ? 'These terms govern your use of Kheti-Mitra AI and outline both your rights and responsibilities.'
              : 'ये शर्तें खेती-मित्र AI के आपके उपयोग को नियंत्रित करती हैं और आपके अधिकारों और जिम्मेदारियों को रेखांकित करती हैं।'}
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-emerald-50 rounded-xl px-4 py-3 mb-4 border-2 border-emerald-200">
          <p className="text-sm font-bold text-emerald-900">
            {language === 'en' ? 'Effective Date: February 14, 2026' : 'प्रभावी तिथि: 14 फरवरी, 2026'}
          </p>
        </div>

        {/* Terms Sections */}
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

        {/* Important Notice */}
        <div className="bg-amber-50 rounded-2xl shadow-sm border-2 border-amber-200 p-5 mt-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-extrabold text-amber-900 mb-2">
                {language === 'en' ? 'Important Notice' : 'महत्वपूर्ण सूचना'}
              </h3>
              <p className="text-sm text-amber-900 leading-relaxed">
                {language === 'en' 
                  ? 'Always verify agricultural recommendations with local experts and consider your specific farm conditions. Kheti-Mitra AI is a decision support tool, not a replacement for professional agricultural advice.'
                  : 'हमेशा स्थानीय विशेषज्ञों के साथ कृषि सिफारिशों को सत्यापित करें और अपनी विशिष्ट खेत स्थितियों पर विचार करें। खेती-मित्र AI एक निर्णय समर्थन उपकरण है।'}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Card */}
        <div className="bg-white rounded-2xl shadow-sm border-2 border-gray-200 p-5 mt-4">
          <h3 className="text-lg font-extrabold text-gray-900 mb-3">
            {language === 'en' ? 'Legal Questions?' : 'कानूनी सवाल?'}
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            {language === 'en' 
              ? 'For legal inquiries or concerns about these terms:'
              : 'इन शर्तों के बारे में कानूनी पूछताछ या चिंताओं के लिए:'}
          </p>
          <div className="bg-gray-50 rounded-xl p-3 border-2 border-gray-200">
            <p className="text-xs text-gray-500 font-bold mb-1">
              {language === 'en' ? 'Email' : 'ईमेल'}
            </p>
            <p className="text-sm font-bold text-emerald-600">legal@khetimitra.in</p>
          </div>
        </div>
      </div>

      <BottomNav language={language} currentPage="profile" />
    </div>
  );
}
