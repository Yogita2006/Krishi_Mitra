import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, ChevronDown, ChevronUp, Phone } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface SchemesProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

interface Scheme {
  id: string;
  nameEn: string;
  nameHi: string;
  categoryEn: string;
  categoryHi: string;
  benefitEn: string;
  benefitHi: string;
  descriptionEn: string;
  descriptionHi: string;
  eligibilityEn: string[];
  eligibilityHi: string[];
  documentsEn: string[];
  documentsHi: string[];
  howToApplyEn: string;
  howToApplyHi: string;
  helplineEn: string;
  helplineHi: string;
  status: 'open' | 'closed' | 'ongoing';
}

const schemes: Scheme[] = [
  {
    id: "pm-kisan",
    nameEn: "PM-KISAN",
    nameHi: "पीएम किसान",
    categoryEn: "Income Support",
    categoryHi: "आय सहायता",
    benefitEn: "₹6,000/year",
    benefitHi: "₹6,000/वर्ष",
    descriptionEn: "Direct income support of ₹6,000 per year to small and marginal farmer families in 3 equal installments.",
    descriptionHi: "छोटे और सीमांत किसान परिवारों को ₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, 3 समान किस्तों में।",
    eligibilityEn: ["Land ownership records in name", "Bank account linked to Aadhaar", "Not a government employee"],
    eligibilityHi: ["नाम पर भूमि रिकॉर्ड", "आधार से जुड़ा बैंक खाता", "सरकारी कर्मचारी नहीं"],
    documentsEn: ["Aadhaar Card", "Bank Passbook", "Land Records", "Mobile Number"],
    documentsHi: ["आधार कार्ड", "बैंक पासबुक", "भूमि रिकॉर्ड", "मोबाइल नंबर"],
    howToApplyEn: "Visit pmkisan.gov.in or apply at nearest CSC Center",
    howToApplyHi: "pmkisan.gov.in पर जाएं या नजदीकी CSC केंद्र पर आवेदन करें",
    helplineEn: "155261",
    helplineHi: "155261",
    status: "ongoing"
  },
  {
    id: "pmfby",
    nameEn: "Pradhan Mantri Fasal Bima Yojana",
    nameHi: "प्रधानमंत्री फसल बीमा योजना",
    categoryEn: "Crop Insurance",
    categoryHi: "फसल बीमा",
    benefitEn: "Full sum insured",
    benefitHi: "पूर्ण बीमित राशि",
    descriptionEn: "Comprehensive crop insurance against natural calamities, pests, and diseases at subsidized premium rates.",
    descriptionHi: "प्राकृतिक आपदाओं, कीटों और बीमारियों से फसल का व्यापक बीमा, सब्सिडी दर पर।",
    eligibilityEn: ["All farmers growing notified crops", "Both loanee and non-loanee farmers eligible"],
    eligibilityHi: ["अधिसूचित फसल उगाने वाले सभी किसान", "ऋणी और गैर-ऋणी दोनों किसान पात्र"],
    documentsEn: ["Aadhaar Card", "Bank Account Details", "Land Records", "Sowing Certificate"],
    documentsHi: ["आधार कार्ड", "बैंक खाता विवरण", "भूमि रिकॉर्ड", "बुवाई प्रमाण पत्र"],
    howToApplyEn: "Apply through nearest bank branch, CSC, or pmfby.gov.in",
    howToApplyHi: "नजदीकी बैंक शाखा, CSC, या pmfby.gov.in के माध्यम से आवेदन करें",
    helplineEn: "1800-180-1551",
    helplineHi: "1800-180-1551",
    status: "open"
  },
  {
    id: "kcc",
    nameEn: "Kisan Credit Card",
    nameHi: "किसान क्रेडिट कार्ड",
    categoryEn: "Credit / Loan",
    categoryHi: "ऋण / क्रेडिट",
    benefitEn: "Credit up to ₹3L @ 4%",
    benefitHi: "₹3L तक ऋण @ 4%",
    descriptionEn: "Flexible credit facility for crop cultivation and post-harvest expenses at just 4% interest.",
    descriptionHi: "फसल खेती और फसल के बाद के खर्च के लिए 4% ब्याज पर लचीली क्रेडिट सुविधा।",
    eligibilityEn: ["Individual farmers growing crops", "Age 18-75 years"],
    eligibilityHi: ["फसल उगाने वाले व्यक्तिगत किसान", "आयु 18-75 वर्ष"],
    documentsEn: ["Aadhaar Card", "Address Proof", "Land Records", "Photo"],
    documentsHi: ["आधार कार्ड", "पता प्रमाण", "भूमि रिकॉर्ड", "फोटो"],
    howToApplyEn: "Visit any nationalized bank or cooperative bank near you",
    howToApplyHi: "नजदीकी राष्ट्रीयकृत बैंक या सहकारी बैंक पर जाएं",
    helplineEn: "Contact your bank",
    helplineHi: "अपने बैंक से संपर्क करें",
    status: "ongoing"
  },
  {
    id: "soil-health",
    nameEn: "Soil Health Card",
    nameHi: "मृदा स्वास्थ्य कार्ड",
    categoryEn: "Soil Testing",
    categoryHi: "मिट्टी परीक्षण",
    benefitEn: "Free soil testing",
    benefitHi: "निःशुल्क परीक्षण",
    descriptionEn: "Free soil testing every 2 years with crop-specific fertilizer recommendations.",
    descriptionHi: "हर 2 साल में निःशुल्क मिट्टी परीक्षण, फसल-विशिष्ट उर्वरक सिफारिशें।",
    eligibilityEn: ["All farmers with agricultural land"],
    eligibilityHi: ["कृषि भूमि वाले सभी किसान"],
    documentsEn: ["Land Ownership Proof", "Aadhaar Card"],
    documentsHi: ["भूमि स्वामित्व प्रमाण", "आधार कार्ड"],
    howToApplyEn: "Contact your local Agriculture Department office",
    howToApplyHi: "अपने स्थानीय कृषि विभाग कार्यालय से संपर्क करें",
    helplineEn: "1800-180-1551",
    helplineHi: "1800-180-1551",
    status: "ongoing"
  },
  {
    id: "drip-sprinkler",
    nameEn: "Drip Irrigation Subsidy",
    nameHi: "ड्रिप सिंचाई सब्सिडी",
    categoryEn: "Irrigation",
    categoryHi: "सिंचाई",
    benefitEn: "Up to 90% subsidy",
    benefitHi: "90% तक सब्सिडी",
    descriptionEn: "Up to 90% subsidy for small farmers on drip or sprinkler irrigation systems.",
    descriptionHi: "ड्रिप या स्प्रिंकलर सिंचाई प्रणाली पर छोटे किसानों को 90% तक सब्सिडी।",
    eligibilityEn: ["Small and marginal farmers", "Land must have water source"],
    eligibilityHi: ["छोटे और सीमांत किसान", "भूमि पर जल स्रोत होना चाहिए"],
    documentsEn: ["Aadhaar Card", "Land Records", "Bank Details"],
    documentsHi: ["आधार कार्ड", "भूमि रिकॉर्ड", "बैंक विवरण"],
    howToApplyEn: "Apply through pmksy.gov.in or district Agriculture office",
    howToApplyHi: "pmksy.gov.in या जिला कृषि कार्यालय से आवेदन करें",
    helplineEn: "1800-180-1551",
    helplineHi: "1800-180-1551",
    status: "open"
  }
];

export default function Schemes({ farmerData, language }: SchemesProps) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>("pm-kisan");

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-emerald-50 pb-24">
      {/* Header */}
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">
            {language === 'en' ? 'Government Schemes' : 'सरकारी योजनाएं'}
          </h1>
        </div>
        <p className="text-sm text-emerald-100 ml-14">
          {language === 'en' ? 'Benefits for farmers' : 'किसानों के लिए लाभ'}
        </p>
      </header>

      <div className="px-4 py-4">
        {/* Quick Summary */}
        <div className="bg-white rounded-lg shadow-md p-5 mb-4 border border-gray-200">
          <p className="font-bold text-gray-900 mb-3">
            {language === 'en' ? 'Quick Actions' : 'त्वरित कार्य'}
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">• {language === 'en' ? 'Apply for PM-KISAN (₹6,000/year free)' : 'PM-KISAN के लिए आवेदन करें (₹6,000/वर्ष)'}</p>
            <p className="text-sm text-gray-700">• {language === 'en' ? 'Get crop insurance before sowing' : 'बुवाई से पहले फसल बीमा करवाएं'}</p>
            <p className="text-sm text-gray-700">• {language === 'en' ? 'Get free soil testing card' : 'मुफ्त मिट्टी परीक्षण कार्ड बनवाएं'}</p>
          </div>
        </div>

        {/* Schemes List */}
        <div className="space-y-3">
          {schemes.map(scheme => {
            const isOpen = expanded === scheme.id;

            return (
              <div key={scheme.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                {/* Scheme Header */}
                <button
                  onClick={() => toggleExpand(scheme.id)}
                  className="w-full text-left p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 leading-tight mb-1">
                        {language === 'en' ? scheme.nameEn : scheme.nameHi}
                      </h3>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-full font-bold border border-emerald-200">
                          {language === 'en' ? scheme.categoryEn : scheme.categoryHi}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                          scheme.status === 'open' ? 'bg-green-50 text-green-700 border-green-200' :
                          scheme.status === 'ongoing' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {language === 'en'
                            ? (scheme.status === 'open' ? 'Open' : scheme.status === 'ongoing' ? 'Ongoing' : 'Closed')
                            : (scheme.status === 'open' ? 'खुला' : scheme.status === 'ongoing' ? 'चालू' : 'बंद')
                          }
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 ml-3">
                      <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                        {language === 'en' ? scheme.benefitEn : scheme.benefitHi}
                      </span>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                </button>

                {/* Expanded Content */}
                {isOpen && (
                  <div className="px-4 pb-4 space-y-3 border-t border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed pt-3">
                      {language === 'en' ? scheme.descriptionEn : scheme.descriptionHi}
                    </p>

                    {/* Eligibility */}
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <h4 className="font-bold text-gray-900 text-sm mb-2">
                        {language === 'en' ? 'Eligibility' : 'पात्रता'}
                      </h4>
                      <ul className="space-y-1">
                        {(language === 'en' ? scheme.eligibilityEn : scheme.eligibilityHi).map((e, i) => (
                          <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                            <span className="text-emerald-600 font-bold">✓</span>{e}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Documents */}
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm mb-2">
                        {language === 'en' ? 'Documents Needed' : 'आवश्यक दस्तावेज'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {(language === 'en' ? scheme.documentsEn : scheme.documentsHi).map((doc, i) => (
                          <span key={i} className="bg-gray-100 text-gray-700 text-xs font-bold px-3 py-1 rounded border border-gray-300">
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* How to Apply */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <h4 className="font-bold text-gray-900 text-sm mb-1">
                        {language === 'en' ? 'How to Apply' : 'कैसे आवेदन करें'}
                      </h4>
                      <p className="text-sm text-gray-700">
                        {language === 'en' ? scheme.howToApplyEn : scheme.howToApplyHi}
                      </p>
                    </div>

                    {/* Helpline */}
                    <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-3 border border-emerald-200">
                      <Phone className="w-4 h-4 text-emerald-700" />
                      <div>
                        <p className="text-xs text-gray-600">
                          {language === 'en' ? 'Helpline' : 'हेल्पलाइन'}
                        </p>
                        <p className="font-bold text-gray-900">
                          {language === 'en' ? scheme.helplineEn : scheme.helplineHi}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav language={language} currentPage="home" />
    </div>
  );
}
