import { useState, useRef, useEffect, useCallback } from "react";
import { Camera, Upload, Crop, X, Check, ArrowLeft, Bug, Leaf, FlaskConical, RotateCcw, Loader2 } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { Card } from "@/react-app/components/ui/card";
import { useNavigate } from "react-router";
import BottomNav from "@/react-app/components/BottomNav";
import { FarmerData } from "./FarmerInfo";

interface ImageCaptureProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

type AnalysisType = 'disease' | 'weed' | 'soil';

// API Response Types
interface PredictionResponse {
  success: boolean;
  prediction: string;
  confidence: number;
  predicted_index: number;
  top_3_predictions?: Array<{
    class: string;
    confidence: number;
  }>;
  filename?: string;
  error?: string;
}

interface AnalysisResult {
  prediction: string;
  confidence: number;
  topPredictions?: Array<{ class: string; confidence: number }>;
  timestamp: string;
  imageUrl: string;
}

const translations = {
  en: {
    pageTitle: "Crop Analysis",
    selectType: "What do you want to analyze?",
    title: "Capture Image",
    subtitle: "Take or upload a photo for analysis",
    camera: "Use Camera",
    upload: "Upload Image",
    analyze: "Analyze Now",
    cropImage: "Crop & Adjust",
    cropDone: "Apply Crop",
    cropCancel: "Cancel Crop",
    capture: "Capture",
    disease: "Disease Detection",
    diseaseDesc: "Identify pests & diseases",
    weed: "Weed Detection",
    weedDesc: "Spot unwanted plants",
    soil: "Soil Analysis",
    soilDesc: "Check soil condition",
    dragHint: "Drag corners to adjust crop area",
    analyzing: "Analyzing...",
    results: "Analysis Results",
    confidence: "Confidence",
    topPredictions: "Top Predictions",
    analyzeAgain: "Analyze Another Image",
    backToHome: "Back to Home",
    error: "Error",
    tryAgain: "Try Again",
    noImage: "No image selected",
    apiError: "Failed to connect to server",
  },
  hi: {
    pageTitle: "फसल विश्लेषण",
    selectType: "आप क्या विश्लेषण करना चाहते हैं?",
    title: "तस्वीर लें",
    subtitle: "विश्लेषण के लिए फोटो लें या अपलोड करें",
    camera: "कैमरा उपयोग करें",
    upload: "तस्वीर अपलोड करें",
    analyze: "विश्लेषण करें",
    cropImage: "क्रॉप और समायोजित करें",
    cropDone: "क्रॉप लागू करें",
    cropCancel: "क्रॉप रद्द करें",
    capture: "फोटो लें",
    disease: "रोग पहचान",
    diseaseDesc: "कीट और रोग पहचानें",
    weed: "खरपतवार पहचान",
    weedDesc: "अनचाहे पौधे देखें",
    soil: "मिट्टी विश्लेषण",
    soilDesc: "मिट्टी की स्थिति जांचें",
    dragHint: "कोने खींचकर क्रॉप क्षेत्र समायोजित करें",
    analyzing: "विश्लेषण हो रहा है...",
    results: "विश्लेषण परिणाम",
    confidence: "विश्वसनीयता",
    topPredictions: "शीर्ष भविष्यवाणियाँ",
    analyzeAgain: "दूसरी तस्वीर विश्लेषण करें",
    backToHome: "होम पेज पर जाएं",
    error: "त्रुटि",
    tryAgain: "पुनः प्रयास करें",
    noImage: "कोई तस्वीर नहीं चुनी गई",
    apiError: "सर्वर से कनेक्ट नहीं हो सका",
  }
};

const analysisOptions = [
  { type: 'disease' as AnalysisType, icon: Bug },
  { type: 'weed'    as AnalysisType, icon: Leaf },
  { type: 'soil'    as AnalysisType, icon: FlaskConical },
];

// ─── Crop Tool ────────────────────────────────────────────────────────────────
interface CropBox { x: number; y: number; w: number; h: number; }
type Handle = 'tl'|'tr'|'bl'|'br'|'move'|null;

const MIN_SIZE = 40;
const HANDLE_RADIUS = 14;

function CropTool({
  imageSrc,
  onApply,
  onCancel,
  t,
}: {
  imageSrc: string;
  onApply: (cropped: string) => void;
  onCancel: () => void;
  t: typeof translations['en'];
}) {
  const containerRef  = useRef<HTMLDivElement>(null);
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const imgRef        = useRef<HTMLImageElement | null>(null);
  const boxRef        = useRef<CropBox>({ x: 20, y: 20, w: 0, h: 0 });
  const dragRef       = useRef<{ handle: Handle; startX: number; startY: number; origBox: CropBox } | null>(null);
  const [, forceRender] = useState(0);
  const redraw = useCallback(() => forceRender(n => n + 1), []);

  // Load image once
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      // Init crop box to 80% of canvas
      const canvas = canvasRef.current;
      if (!canvas) return;
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      const bw = Math.round(cw * 0.8);
      const bh = Math.round(ch * 0.8);
      boxRef.current = {
        x: Math.round((cw - bw) / 2),
        y: Math.round((ch - bh) / 2),
        w: bw,
        h: bh,
      };
      redraw();
    };
    img.src = imageSrc;
  }, [imageSrc, redraw]);

  // Draw on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const img    = imgRef.current;
    if (!canvas || !img) return;

    // Match canvas resolution to display size
    const dpr = window.devicePixelRatio || 1;
    const cw  = canvas.offsetWidth;
    const ch  = canvas.offsetHeight;
    canvas.width  = cw * dpr;
    canvas.height = ch * dpr;

    const ctx = canvas.getContext('2d')!;
    ctx.scale(dpr, dpr);

    // Draw image fitted to canvas
    const imgRatio  = img.naturalWidth / img.naturalHeight;
    const boxRatio  = cw / ch;
    let dx = 0, dy = 0, dw = cw, dh = ch;
    if (imgRatio > boxRatio) { dh = cw / imgRatio; dy = (ch - dh) / 2; }
    else                     { dw = ch * imgRatio; dx = (cw - dw) / 2; }
    ctx.drawImage(img, dx, dy, dw, dh);

    // Dark overlay outside crop
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    const b = boxRef.current;
    ctx.fillRect(0, 0, cw, b.y);
    ctx.fillRect(0, b.y + b.h, cw, ch - b.y - b.h);
    ctx.fillRect(0, b.y, b.x, b.h);
    ctx.fillRect(b.x + b.w, b.y, cw - b.x - b.w, b.h);

    // Crop border
    ctx.strokeStyle = '#fff';
    ctx.lineWidth   = 2;
    ctx.strokeRect(b.x, b.y, b.w, b.h);

    // Rule-of-thirds grid
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth   = 1;
    for (let i = 1; i < 3; i++) {
      ctx.beginPath(); ctx.moveTo(b.x + b.w * i / 3, b.y); ctx.lineTo(b.x + b.w * i / 3, b.y + b.h); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(b.x, b.y + b.h * i / 3); ctx.lineTo(b.x + b.w, b.y + b.h * i / 3); ctx.stroke();
    }

    // Corner handles
    const corners: [number, number][] = [
      [b.x, b.y], [b.x + b.w, b.y],
      [b.x, b.y + b.h], [b.x + b.w, b.y + b.h],
    ];
    corners.forEach(([cx2, cy2]) => {
      ctx.beginPath();
      ctx.arc(cx2, cy2, HANDLE_RADIUS / 2, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  });

  // Pointer helpers
  const getPos = (e: React.PointerEvent | React.TouchEvent): { px: number; py: number } => {
    const canvas = canvasRef.current!;
    const rect   = canvas.getBoundingClientRect();
    const src    = 'touches' in e ? e.touches[0] : (e as React.PointerEvent);
    return { px: src.clientX - rect.left, py: src.clientY - rect.top };
  };

  const hitHandle = (px: number, py: number): Handle => {
    const b = boxRef.current;
    const corners: [Handle, number, number][] = [
      ['tl', b.x,       b.y      ],
      ['tr', b.x + b.w, b.y      ],
      ['bl', b.x,       b.y + b.h],
      ['br', b.x + b.w, b.y + b.h],
    ];
    for (const [h, cx2, cy2] of corners) {
      if (Math.hypot(px - cx2, py - cy2) <= HANDLE_RADIUS) return h;
    }
    if (px > b.x && px < b.x + b.w && py > b.y && py < b.y + b.h) return 'move';
    return null;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const { px, py } = getPos(e);
    const handle     = hitHandle(px, py);
    if (!handle) return;
    dragRef.current = { handle, startX: px, startY: py, origBox: { ...boxRef.current } };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const { px, py } = getPos(e);
    const { handle, startX, startY, origBox: o } = dragRef.current;
    const dx = px - startX;
    const dy = py - startY;
    const canvas = canvasRef.current!;
    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    let { x, y, w, h } = o;

    if (handle === 'move') {
      x = Math.max(0, Math.min(cw - w, o.x + dx));
      y = Math.max(0, Math.min(ch - h, o.y + dy));
    } else {
      if (handle === 'tl') { x = Math.min(o.x + dx, o.x + o.w - MIN_SIZE); y = Math.min(o.y + dy, o.y + o.h - MIN_SIZE); w = o.w - (x - o.x); h = o.h - (y - o.y); }
      if (handle === 'tr') { w = Math.max(MIN_SIZE, o.w + dx); y = Math.min(o.y + dy, o.y + o.h - MIN_SIZE); h = o.h - (y - o.y); }
      if (handle === 'bl') { x = Math.min(o.x + dx, o.x + o.w - MIN_SIZE); w = o.w - (x - o.x); h = Math.max(MIN_SIZE, o.h + dy); }
      if (handle === 'br') { w = Math.max(MIN_SIZE, o.w + dx); h = Math.max(MIN_SIZE, o.h + dy); }
      // clamp to canvas
      if (x < 0) { w += x; x = 0; }
      if (y < 0) { h += y; y = 0; }
      if (x + w > cw) w = cw - x;
      if (y + h > ch) h = ch - y;
    }
    boxRef.current = { x, y, w, h };
    redraw();
  };

  const onPointerUp = () => { dragRef.current = null; };

  const applyCrop = () => {
    const img    = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    const cw = canvas.offsetWidth;
    const ch = canvas.offsetHeight;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const boxRatio = cw / ch;
    let dx = 0, dy = 0, dw = cw, dh = ch;
    if (imgRatio > boxRatio) { dh = cw / imgRatio; dy = (ch - dh) / 2; }
    else                     { dw = ch * imgRatio; dx = (cw - dw) / 2; }

    const { x, y, w, h } = boxRef.current;
    // Map canvas coords → original image coords
    const scaleX = img.naturalWidth  / dw;
    const scaleY = img.naturalHeight / dh;
    const srcX = (x - dx) * scaleX;
    const srcY = (y - dy) * scaleY;
    const srcW = w * scaleX;
    const srcH = h * scaleY;

    const out = document.createElement('canvas');
    out.width  = srcW;
    out.height = srcH;
    out.getContext('2d')!.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, srcW, srcH);
    onApply(out.toDataURL('image/jpeg', 0.92));
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-center text-gray-500">{t.dragHint}</p>
      <div
        ref={containerRef}
        className="relative w-full rounded-xl overflow-hidden border-2 border-emerald-300 shadow-md"
        style={{ aspectRatio: '4/3', touchAction: 'none' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          style={{ touchAction: 'none', cursor: 'crosshair' }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        />
      </div>
      <div className="flex gap-3">
        <Button
          onClick={onCancel}
          variant="outline"
          className="flex-1 border-2 border-gray-300 text-gray-600 hover:bg-gray-50 py-4"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t.cropCancel}
        </Button>
        <Button
          onClick={applyCrop}
          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4"
        >
          <Check className="w-4 h-4 mr-2" />
          {t.cropDone}
        </Button>
      </div>
    </div>
  );
}

// ─── Results Component (inline to maintain UI flow) ─────────────────────────
function ResultsView({ 
  result, 
  analysisType, 
  onAnalyzeAgain, 
  onBackToHome,
  t 
}: { 
  result: AnalysisResult; 
  analysisType: AnalysisType;
  onAnalyzeAgain: () => void;
  onBackToHome: () => void;
  t: typeof translations['en'];
}) {
  return (
    <Card className="p-6 bg-white border-2 border-emerald-200">
      <div className="text-center mb-4">
        <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
          {analysisType === 'disease' && <Bug className="w-8 h-8 text-emerald-600" />}
          {analysisType === 'weed' && <Leaf className="w-8 h-8 text-emerald-600" />}
          {analysisType === 'soil' && <FlaskConical className="w-8 h-8 text-emerald-600" />}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{t.results}</h2>
      </div>

      <div className="space-y-4">
        <img 
          src={result.imageUrl} 
          alt="Analyzed" 
          className="w-full rounded-lg shadow-md max-h-48 object-cover"
        />

        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
          <p className="text-sm text-emerald-700 font-medium mb-1">{t.disease}</p>
          <p className="text-xl font-bold text-gray-800">{result.prediction}</p>
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{t.confidence}</span>
              <span className="font-semibold text-emerald-700">
                {result.confidence.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 rounded-full h-2" 
                style={{ width: `${result.confidence}%` }}
              />
            </div>
          </div>
        </div>

        {result.topPredictions && result.topPredictions.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">{t.topPredictions}</p>
            <div className="space-y-2">
              {result.topPredictions.map((pred, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-gray-600">{pred.class}</span>
                  <span className="font-medium text-emerald-700">{pred.confidence.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          <Button
            onClick={onAnalyzeAgain}
            variant="outline"
            className="flex-1 border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50"
          >
            {t.analyzeAgain}
          </Button>
          <Button
            onClick={onBackToHome}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {t.backToHome}
          </Button>
        </div>
      </div>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ImageCapture({ farmerData, language }: ImageCaptureProps) {
  const [analysisType, setAnalysisType] = useState<AnalysisType | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [isUsingCamera, setIsUsingCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const t = translations[language];

  // API Base URL
  const API_BASE_URL = 'http://127.0.0.1:8000';

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      setStream(mediaStream);
      setIsUsingCamera(true);
      if (videoRef.current) videoRef.current.srcObject = mediaStream;
      setError(null);
    } catch {
      setError('Camera access denied. Please use image upload instead.');
    }
  };

  const stopCamera = () => {
    stream?.getTracks().forEach(tr => tr.stop());
    setStream(null);
    setIsUsingCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      setCapturedImage(canvas.toDataURL('image/jpeg'));
      stopCamera();
      setAnalysisResult(null);
      setError(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size too large. Please upload an image less than 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = ev => {
      setCapturedImage(ev.target?.result as string);
      setAnalysisResult(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => { 
    setCapturedImage(null); 
    setIsCropping(false); 
    stopCamera();
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!capturedImage) {
      setError(t.noImage);
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      // Convert base64 to blob
      const base64Data = capturedImage.split(',')[1];
      const blob = await fetch(capturedImage).then(res => res.blob());
      
      // Create form data
      const formData = new FormData();
      formData.append('file', blob, 'image.jpg');

      // Send to backend
      const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PredictionResponse = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Store analysis result
      setAnalysisResult({
        prediction: data.prediction,
        confidence: data.confidence,
        topPredictions: data.top_3_predictions,
        timestamp: new Date().toISOString(),
        imageUrl: capturedImage,
      });

    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : t.apiError);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    if (analysisResult) {
      setAnalysisResult(null);
      setCapturedImage(null);
    } else if (isCropping) {
      setIsCropping(false);
    } else if (capturedImage || isUsingCamera) {
      handleReset();
    } else if (analysisType) {
      setAnalysisType(null);
    } else {
      navigate('/crops');
    }
  };

  // If we have analysis results, show them
  if (analysisResult) {
    return (
      <div className="min-h-screen bg-emerald-50 pb-24">
        <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
          <div className="flex items-center gap-3">
            <button onClick={handleBack} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">{t.results}</h1>
              <p className="text-emerald-200 text-sm">
                {new Date(analysisResult.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        </header>

        <div className="px-4 py-6 max-w-2xl mx-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm flex items-center gap-2">
                <X className="w-4 h-4" />
                {error}
              </p>
            </div>
          )}
          
          <ResultsView
            result={analysisResult}
            analysisType={analysisType || 'disease'}
            onAnalyzeAgain={() => {
              setAnalysisResult(null);
              setCapturedImage(null);
            }}
            onBackToHome={() => navigate('/crops')}
            t={t}
          />
        </div>

        <BottomNav language={language} currentPage="crops" />
      </div>
    );
  }

  // Original UI - completely unchanged from your code
  return (
    <div className="min-h-screen bg-emerald-50 pb-24">
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={handleBack} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{t.pageTitle}</h1>
            <p className="text-emerald-200 text-sm">
              {isCropping ? t.cropImage : analysisType ? t[analysisType] : farmerData.name}
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 max-w-2xl mx-auto">

        {/* Error message (only addition to original UI) */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm flex items-center gap-2">
              <X className="w-4 h-4" />
              {error}
            </p>
          </div>
        )}

        {/* STEP 1 — pick analysis type */}
        {!analysisType && (
          <div>
            <p className="text-gray-600 text-sm font-medium mb-4">{t.selectType}</p>
            <div className="grid grid-cols-1 gap-3">
              {analysisOptions.map(({ type, icon: Icon }) => (
                <button
                  key={type}
                  onClick={() => setAnalysisType(type)}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-400 hover:-translate-y-0.5 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{t[type]}</p>
                    <p className="text-sm text-gray-500">{t[`${type}Desc` as keyof typeof t]}</p>
                  </div>
                  <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2a — choose camera or upload */}
        {analysisType && !capturedImage && !isUsingCamera && (
          <Card className="p-8 bg-white border-2 border-emerald-200">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">{t.title}</h2>
                <p className="text-gray-500 text-sm">{t.subtitle}</p>
              </div>
              <div className="space-y-3">
                <Button onClick={startCamera} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 text-base font-semibold">
                  <Camera className="w-5 h-5 mr-2" />{t.camera}
                </Button>
                <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="w-full border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 py-5 text-base font-semibold">
                  <Upload className="w-5 h-5 mr-2" />{t.upload}
                </Button>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </div>
            </div>
          </Card>
        )}

        {/* STEP 2b — camera live view */}
        {analysisType && isUsingCamera && (
          <Card className="p-4 bg-white border-2 border-emerald-200">
            <div className="space-y-4">
              <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg shadow-md" />
              <div className="flex gap-3">
                <Button onClick={capturePhoto} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-5 text-base font-semibold">
                  <Camera className="w-5 h-5 mr-2" />{t.capture}
                </Button>
                <Button onClick={stopCamera} variant="outline" className="border-2 border-red-400 text-red-600 hover:bg-red-50 py-5 px-5">
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* STEP 3a — crop & adjust (interactive) */}
        {analysisType && capturedImage && isCropping && (
          <Card className="p-4 bg-white border-2 border-emerald-200">
            <CropTool
              imageSrc={capturedImage}
              onApply={(cropped) => { setCapturedImage(cropped); setIsCropping(false); }}
              onCancel={() => setIsCropping(false)}
              t={t}
            />
          </Card>
        )}

        {/* STEP 3b — review & analyze */}
        {analysisType && capturedImage && !isCropping && (
          <Card className="p-4 bg-white border-2 border-emerald-200">
            <div className="space-y-4">
              <img src={capturedImage} alt="Captured" className="w-full rounded-lg shadow-md" />
              <div className="flex gap-3">
                <Button
                  onClick={() => setIsCropping(true)}
                  variant="outline"
                  className="flex-1 border-2 border-emerald-500 text-emerald-700 hover:bg-emerald-50 py-4"
                  disabled={isAnalyzing}
                >
                  <Crop className="w-4 h-4 mr-2" />{t.cropImage}
                </Button>
                <Button onClick={handleReset} variant="outline" className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 py-4 px-5" disabled={isAnalyzing}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <Button 
                onClick={handleAnalyze} 
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 text-base font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    {t.analyzing}
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    {t.analyze}
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

      </div>

      <BottomNav language={language} currentPage="crops" />
    </div>
  );
}