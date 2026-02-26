import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Send, Bot, User, Mic, Loader2 } from "lucide-react";
import BottomNav from "@/react-app/components/BottomNav";
import type { FarmerData } from "@/react-app/pages/FarmerInfo";

interface AIChatProps {
  farmerData: FarmerData;
  language: 'en' | 'hi';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const quickQuestions = {
  en: [
    "How to control stem borer in rice?",
    "Best fertilizer schedule for wheat?",
    "What is MSP and how to apply?",
    "Signs of water stress in crops",
    "Organic pesticides I can make at home",
    "When should I harvest my crop?"
  ],
  hi: [
    "धान में तना छेदक कैसे रोकें?",
    "गेहूं के लिए सबसे अच्छा खाद कार्यक्रम?",
    "MSP क्या है और कैसे आवेदन करें?",
    "फसल में पानी की कमी के संकेत",
    "घर पर बना सकते हैं जैविक कीटनाशक",
    "मेरी फसल कब काटनी चाहिए?"
  ]
};

export default function AIChat({ farmerData, language }: AIChatProps) {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: language === 'en'
        ? `Namaste ${farmerData.name}! I'm Kheti-Mitra AI, your farming assistant. I know you're growing **${farmerData.crop}** in ${farmerData.village}. Ask me anything about your crops — diseases, fertilizers, weather tips, market prices, or government schemes! 🌾`
        : `नमस्ते ${farmerData.name}! मैं खेती-मित्र AI हूं, आपका कृषि सहायक। मुझे पता है आप ${farmerData.village} में **${farmerData.crop}** उगा रहे हैं। अपनी फसलों के बारे में कुछ भी पूछें — बीमारी, खाद, मौसम सलाह, मंडी भाव या सरकारी योजनाएं! 🌾`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getSystemPrompt = () => {
    return `You are Kheti-Mitra AI, a helpful farming assistant for Indian farmers. You are talking with:
- Farmer Name: ${farmerData.name}
- Location: ${farmerData.village}${farmerData.district ? ', ' + farmerData.district : ''}
- Main Crop: ${farmerData.crop}
- Phone: ${farmerData.phone || 'not provided'}

Your role:
1. Give practical, actionable farming advice specific to their crop and Indian conditions
2. Use simple, clear language that rural farmers can understand
3. Always mention Indian government schemes, MSP, and local resources when relevant
4. If asked in Hindi, reply in Hindi. If asked in English, reply in English.
5. Keep responses concise and practical — farmers need quick, usable advice
6. Use specific quantities, dosages, and timelines when giving agricultural advice
7. Reference common Indian brands/products when mentioning pesticides or fertilizers
8. Always prioritize safety and sustainable farming practices
9. Use emojis sparingly to highlight key points

Important context: Current season in India, the farmer is likely dealing with ${farmerData.crop} cultivation. Tailor all advice to Indian agricultural conditions and practices.`;
  };

  const sendMessage = async (messageText: string = input.trim()) => {
    if (!messageText || isLoading) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const conversationMessages = [...messages, userMessage]
        .filter(m => m.id !== "welcome")
        .map(m => ({ role: m.role, content: m.content }));

      // Always include a user message
      if (conversationMessages.length === 0) {
        conversationMessages.push({ role: "user", content: messageText });
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: getSystemPrompt(),
          messages: conversationMessages.length > 0 ? conversationMessages : [{ role: "user", content: messageText }]
        })
      });

      const data = await response.json();
      const assistantText = data.content?.map((c: {type: string; text?: string}) => c.type === "text" ? c.text : "").join("") || 
        (language === 'en' ? "Sorry, I couldn't get a response. Please try again." : "माफ करें, जवाब नहीं मिला। दोबारा कोशिश करें।");

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: assistantText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: language === 'en' 
          ? "⚠️ Connection error. Please check your internet and try again."
          : "⚠️ कनेक्शन त्रुटि। कृपया अपना इंटरनेट जांचें और दोबारा कोशिश करें।",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text: string) => {
    // Convert **bold** and simple markdown to styled spans
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={j}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col pb-16">
      {/* Header */}
      <header className="bg-emerald-600 text-white px-4 py-4 shadow-md flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-emerald-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">
              {language === 'en' ? 'Ask Kheti-Mitra AI' : 'खेती-मित्र AI से पूछें'}
            </h1>
            <p className="text-emerald-200 text-xs flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
              {language === 'en' ? 'AI Assistant Online' : 'AI सहायक उपलब्ध'}
            </p>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.role === 'user' 
                ? 'bg-emerald-600' 
                : 'bg-gradient-to-br from-green-500 to-emerald-600'
            }`}>
              {message.role === 'user' 
                ? <User className="w-5 h-5 text-white" />
                : <Bot className="w-5 h-5 text-white" />
              }
            </div>

            {/* Bubble */}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
              message.role === 'user'
                ? 'bg-emerald-600 text-white rounded-tr-none'
                : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
            }`}>
              <p className="text-sm leading-relaxed">
                {message.role === 'assistant' ? formatMessage(message.content) : message.content}
              </p>
              <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-emerald-200' : 'text-gray-400'}`}>
                {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">{language === 'en' ? 'Thinking...' : 'सोच रहा हूं...'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Questions - show only at start */}
        {messages.length <= 1 && !isLoading && (
          <div className="mt-2">
            <p className="text-xs text-gray-500 text-center mb-3">
              {language === 'en' ? '💡 Quick questions to get started:' : '💡 शुरुआत के लिए त्वरित सवाल:'}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickQuestions[language].map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="bg-white text-left text-sm text-emerald-700 font-medium border-2 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50 rounded-xl p-3 transition-all shadow-sm"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area - fixed above bottom nav */}
      <div className="flex-shrink-0 bg-white border-t-2 border-gray-100 px-4 py-6 pb-safe shadow-lg">
        <div className="flex items-center gap-2">
          <button className="p-2.5 bg-gray-100 hover:bg-emerald-100 rounded-xl transition-colors">
            <Mic className="w-5 h-5 text-gray-600" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'en' ? 'Ask about your crops...' : 'अपनी फसल के बारे में पूछें...'}
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 border-2 border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || isLoading}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white rounded-xl transition-colors shadow-sm"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <BottomNav language={language} currentPage="home" />
    </div>
  );
}