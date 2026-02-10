import { Volume2 } from "lucide-react";

interface VoiceButtonProps {
  language: 'en' | 'hi';
  onClick: () => void;
}

export default function VoiceButton({ language, onClick }: VoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-6 py-5 shadow-md font-bold text-xl flex items-center justify-center gap-3 transition-all mb-4"
    >
      <Volume2 className="w-8 h-8" />
      <span>{language === 'en' ? 'Suno Salah (Listen to Advice)' : 'सुनो सलाह'}</span>
    </button>
  );
}
