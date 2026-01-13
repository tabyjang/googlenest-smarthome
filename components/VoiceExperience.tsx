import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from "@google/genai";

const VoiceExperience: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [status, setStatus] = useState<string>("음성 버튼을 눌러 시작하세요");
  const [lastResponse, setLastResponse] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const simulateVoiceControl = async () => {
    if (isProcessing) return;

    setIsListening(true);
    setStatus("듣고 있습니다...");
    setLastResponse("");

    setTimeout(async () => {
      setIsListening(false);
      setIsProcessing(true);
      setStatus("응답 생성 중...");

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
        setStatus("완료");
      } catch (e) {
        console.error("AI Error:", e);
        setLastResponse("네, 거실 조명을 켰습니다.");
        setStatus("데모 모드");
      } finally {
        setIsProcessing(false);
        setTimeout(() => setStatus("음성 버튼을 눌러 시작하세요"), 4000);
      }
    }, 2000);
  };

  const voiceCommands = [
    { text: "거실 불 켜줘", icon: "💡" },
    { text: "오늘 날씨 어때?", icon: "🌤" },
    { text: "재즈 음악 틀어줘", icon: "🎵" },
  ];

  return (
    <div className="max-w-4xl mx-auto text-center">
      {/* Section Header */}
      <div className="mb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs tracking-[0.3em] uppercase text-gold-400 font-medium mb-4"
        >
          Voice Control
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-cream-100 mb-6"
        >
          "오케이 구글" <span className="italic text-gold-400">체험</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-charcoal-300 font-light"
        >
          음성으로 집을 제어하는 럭셔리한 경험
        </motion.p>
      </div>

      {/* Voice Interface Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative flex flex-col items-center justify-center py-20 bg-gradient-to-br from-charcoal-700 to-charcoal-600 rounded-[3rem] overflow-hidden border border-charcoal-500"
      >
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, #C9A962 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} />
        </div>

        {/* Gold accent glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />

        {/* Voice Visualizer Waves */}
        <div className="flex items-end gap-3 mb-12 h-16">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={isListening ? {
                height: [16, 48, 24, 40, 16],
              } : { height: 6 }}
              transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.08 }}
              className="w-2 rounded-full"
              style={{
                backgroundColor: isListening ? '#C9A962' : '#4A4A4A',
                boxShadow: isListening ? '0 0 20px rgba(201, 169, 98, 0.4)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Main Voice Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={simulateVoiceControl}
          disabled={isProcessing}
          className={`relative z-10 w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 ${
            isListening
              ? 'bg-cream-100 text-gold-500 shadow-[0_0_60px_rgba(201,169,98,0.4)]'
              : 'bg-gradient-to-br from-gold-400 to-gold-500 text-charcoal-700 shadow-luxury-lg hover:shadow-[0_0_40px_rgba(201,169,98,0.3)]'
          }`}
        >
          {isProcessing ? (
             <div className="w-8 h-8 border-3 border-charcoal-300 border-t-charcoal-700 rounded-full animate-spin" />
          ) : (
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
            </svg>
          )}
        </motion.button>

        {/* Status Text */}
        <p className="mt-8 text-cream-200 font-light text-lg tracking-wide z-10">{status}</p>

        {/* Response Display */}
        <AnimatePresence>
          {lastResponse && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-8 px-8 py-4 bg-cream-100/5 backdrop-blur-xl rounded-2xl border border-gold-400/20 z-10"
            >
              <p className="text-gold-300 font-light tracking-wide">" {lastResponse} "</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick Command Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {voiceCommands.map((cmd, idx) => (
          <button
            key={idx}
            onClick={simulateVoiceControl}
            className="group p-5 rounded-2xl bg-charcoal-700/50 border border-charcoal-600 hover:border-gold-400/50 hover:bg-charcoal-700 transition-all duration-300"
          >
            <span className="block text-2xl mb-2">{cmd.icon}</span>
            <span className="text-sm text-charcoal-300 group-hover:text-cream-200 transition-colors">"{cmd.text}"</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default VoiceExperience;
