import { Pill, Droplet, Calendar, Leaf } from "lucide-react";
import type { Treatment } from "@/data/agriculture";

interface TreatmentCardProps {
  treatment: Treatment;
  language: 'en' | 'hi';
}

export default function TreatmentCard({ treatment, language }: TreatmentCardProps) {
  return (
    <div className="bg-white rounded-lg p-5 shadow-md border border-gray-200 mb-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-emerald-600 text-white rounded-full p-3">
          <Pill className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {language === 'en' ? 'Treatment Needed' : 'इलाज जरूरी'}
          </h2>
          <p className="text-sm text-gray-700 font-semibold">
            {language === 'en' ? treatment.problemEn : treatment.problemHi}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {/* Medicine Section */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-start gap-3">
            <Droplet className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="text-base font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Medicine' : 'दवा'}
              </h3>
              <p className="text-base text-gray-800 font-semibold mb-2">
                {language === 'en' ? treatment.medicineEn : treatment.medicineHi}
              </p>
              <div className="bg-white rounded-lg px-3 py-2.5 border border-emerald-200">
                <p className="text-sm text-gray-700 font-medium">
                  {treatment.dosage}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Days Section */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-start gap-3">
            <Calendar className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <p className="text-base font-bold text-gray-900">
                {language === 'en' ? 'Wait' : 'इंतजार'} {treatment.safetyDays} {language === 'en' ? 'days before harvest' : 'दिन कटाई से पहले'}
              </p>
            </div>
          </div>
        </div>

        {/* Organic Option Section */}
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <div className="flex items-start gap-3">
            <Leaf className="w-6 h-6 text-emerald-700 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="text-base font-bold text-gray-900 mb-2">
                {language === 'en' ? 'Organic Option:' : 'जैविक विकल्प:'}
              </h4>
              <p className="text-base text-gray-800 font-semibold">
                {language === 'en' ? treatment.organicOptionEn : treatment.organicOptionHi}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
