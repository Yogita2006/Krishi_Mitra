import { useState, useRef } from "react";
import { Camera, Upload, Crop, X, Check } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card } from "@/react-app/components/ui/card";
import Header from "@/react-app/components/Header";
import BottomNav from "@/react-app/components/BottomNav";
import { FarmerData } from "./FarmerInfo";

interface ImageCaptureProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
  analysisType: 'disease' | 'weed' | 'soil';
}

const translations = {
  en: {
    title: "Capture Image",
    subtitle: "Take or upload a photo for analysis",
    camera: "Use Camera",
    upload: "Upload Image",
    cancel: "Cancel",
    analyze: "Analyze",
    retake: "Retake",
    cropImage: "Crop & Adjust",
    disease: "Disease Detection",
    weed: "Weed Detection",
    soil: "Soil Analysis"
  },
  hi: {
    title: "तस्वीर लें",
    subtitle: "विश्लेषण के लिए फोटो लें या अपलोड करें",
    camera: "कैमरा उपयोग करें",
    upload: "तस्वीर अपलोड करें",
    cancel: "रद्द करें",
    analyze: "विश्लेषण करें",
    retake: "फिर से लें",
    cropImage: "क्रॉप और समायोजित करें",
    disease: "रोग पहचान",
    weed: "खरपतवार पहचान",
    soil: "मिट्टी विश्लेषण"
  }
};

export default function ImageCapture({ farmerData, language, analysisType }: ImageCaptureProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const t = translations[language];

  const getAnalysisTitle = () => {
    switch(analysisType) {
      case 'disease': return t.disease;
      case 'weed': return t.weed;
      case 'soil': return t.soil;
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsUsingCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access denied. Please use image upload instead.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsUsingCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    // Navigate to analysis page with image data
    console.log('Analyzing image:', capturedImage);
    // TODO: Navigate to respective analysis page
  };

  const handleReset = () => {
    setCapturedImage(null);
    setIsCropping(false);
    stopCamera();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header 
        title={getAnalysisTitle()} 
        subtitle={farmerData.name}
        language={language}
      />

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {!capturedImage && !isUsingCamera ? (
          <Card className="p-8 bg-white/80 backdrop-blur-sm border-2 border-green-200">
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                <Camera className="w-16 h-16 text-white" />
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.title}</h2>
                <p className="text-gray-600">{t.subtitle}</p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={startCamera}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-lg font-semibold shadow-lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {t.camera}
                </Button>

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="w-full border-2 border-green-500 text-green-700 hover:bg-green-50 py-6 text-lg font-semibold"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {t.upload}
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </Card>
        ) : isUsingCamera ? (
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-green-200">
            <div className="space-y-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg shadow-lg"
              />
              
              <div className="flex gap-3">
                <Button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-lg font-semibold"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capture
                </Button>
                
                <Button
                  onClick={stopCamera}
                  variant="outline"
                  className="border-2 border-red-500 text-red-700 hover:bg-red-50 py-6 px-6"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-2 border-green-200">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage!}
                  alt="Captured"
                  className="w-full rounded-lg shadow-lg"
                />
                {isCropping && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                    <div className="text-white text-center">
                      <Crop className="w-12 h-12 mx-auto mb-2" />
                      <p className="font-semibold">{t.cropImage}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setIsCropping(!isCropping)}
                  variant="outline"
                  className="flex-1 border-2 border-green-500 text-green-700 hover:bg-green-50 py-6"
                >
                  <Crop className="w-5 h-5 mr-2" />
                  {t.cropImage}
                </Button>
                
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-6 px-6"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <Button
                onClick={handleAnalyze}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-6 text-lg font-semibold shadow-lg"
              >
                <Check className="w-5 h-5 mr-2" />
                {t.analyze}
              </Button>
            </div>
          </Card>
        )}
      </div>

      <BottomNav language={language} />
    </div>
  );
}
