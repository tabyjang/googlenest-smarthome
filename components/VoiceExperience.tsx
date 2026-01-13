
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const VoiceExperience: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<string>("'오케이 구글'이라고 불러보세요.");
  const [lastResponse, setLastResponse] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateVoiceControl = async () => {
    if (isProcessing) return;
    
    setIsListening(true);
    setStatus("듣고 있습니다...");
    setLastResponse("");
    
    // Simulate recording time
    setTimeout(async () => {
      setIsListening(false);
      setIsProcessing(true);
      setStatus("분석 중...");

      try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
          throw new Error("API Key not found");
        }

        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "사용자가 '거실 불 켜줘'라고 말했습니다. 구글 어시스턴트답게 친절하고 아주 짧게 확인 답변을 한국어로 작성해주세요. (예: 네, 거실 조명을 켰습니다.) 딱 한 문장으로 대답하세요.",
          config: {
             systemInstruction: "You are a helpful, concise Google Nest smart home assistant. Respond only in Korean."
          }
        });

        setLastResponse(response.text || "네, 거실 조명을 켰습니다.");
        setStatus("완료되었습니다.");
      } catch (e) {
        console.error("AI Error:", e);
        setLastResponse("네, 거실 조명을 켰습니다."); // Robust fallback
        setStatus("오프라인 모드 실행");
      } finally {
        setIsProcessing(false);
        setTimeout(() => setStatus("'오케이 구글'이라고 불러보세요."), 4000);
      }
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">"오케이 구글" 체험</h2>
        <p className="text-gray-500 text-lg">음성으로 집을 제어하는 마법같은 경험을 확인해보세요.</p>
      </div>

      <div className="relative flex flex-col items-center justify-center h-80 bg-[#0f172a] rounded-[3rem] overflow-hidden shadow-2xl border border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
        
        {/* Voice Visualizer Waves */}
        <div className="flex items-end gap-2 mb-10 h-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={isListening ? {
                height: [20, 60, 30, 50, 20],
                backgroundColor: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#4285F4'][i]
              } : { height: 8, backgroundColor: '#334155' }}
              transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
              className="w-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={simulateVoiceControl}
          disabled={isProcessing}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl
            ${isListening ? 'bg-white text-blue-600 ring-8 ring-blue-500/20' : 'bg-blue-600 text-white hover:bg-blue-500'}
          `}
        >
          {isProcessing ? (
             <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          )}
        </motion.button>

        <p className="mt-8 text-white font-medium text-lg tracking-wide z-10">{status}</p>

        <AnimatePresence>
          {lastResponse && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 z-10 shadow-2xl"
            >
              <p className="text-blue-300 font-medium tracking-tight">" {lastResponse} "</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 opacity-60">
        <button onClick={simulateVoiceControl} className="p-4 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors">"거실 불 켜줘"</button>
        <button onClick={simulateVoiceControl} className="p-4 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors">"오늘 날씨 어때?"</button>
        <button onClick={simulateVoiceControl} className="p-4 rounded-xl border border-gray-200 text-sm hover:bg-gray-50 transition-colors">"재즈 음악 틀어줘"</button>
      </div>
    </div>
  );
};

export default VoiceExperience;
