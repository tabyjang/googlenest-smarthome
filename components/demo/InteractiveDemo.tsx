import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZONE_DETAILS } from '../../constants';
import { ZoneId } from '../../types';

const zones: { id: ZoneId; name: string; nameEn: string; accentColor: string; gridPos: string }[] = [
  { id: 'living', name: '리빙룸', nameEn: 'Living Room', accentColor: '#C9A962', gridPos: 'col-span-2 row-span-2' },
  { id: 'bedroom', name: '침실', nameEn: 'Bedroom', accentColor: '#B8A07E', gridPos: 'col-span-1 row-span-2' },
  { id: 'kitchen', name: '주방', nameEn: 'Kitchen', accentColor: '#D4C5A0', gridPos: 'col-span-2 row-span-1' },
  { id: 'kids', name: '키즈룸', nameEn: 'Kids Room', accentColor: '#E8DCC4', gridPos: 'col-span-1 row-span-1' },
];

const InteractiveDemo: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ZoneId>('living');
  const [isLightOn, setIsLightOn] = useState(true);
  const zoneDetail = ZONE_DETAILS[selectedZone];
  const currentZone = zones.find(z => z.id === selectedZone);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block text-xs tracking-[0.3em] uppercase text-gold-500 font-medium mb-4"
        >
          Interactive Experience
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-charcoal-700 mb-6"
        >
          공간을 <span className="italic text-gold-gradient">터치</span>하세요
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-charcoal-400 max-w-xl mx-auto font-light"
        >
          각 공간을 선택하여 Google Nest의 스마트 컨트롤을 경험해보세요
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Floor Plan */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-cream-400 rounded-[2rem]" />
          <div className="absolute -inset-8 border border-cream-300/50 rounded-[2.5rem]" />

          <div className="grid grid-cols-3 grid-rows-3 gap-3 aspect-square p-4 bg-cream-200/50 rounded-3xl">
            {zones.map((zone) => (
              <motion.button
                key={zone.id}
                onClick={() => setSelectedZone(zone.id)}
                className={`${zone.gridPos} relative rounded-2xl p-6 flex flex-col justify-between overflow-hidden transition-all duration-500 ${
                  selectedZone === zone.id
                    ? 'shadow-luxury-lg scale-[1.02]'
                    : 'hover:scale-[1.01] shadow-soft'
                }`}
                style={{
                  backgroundColor: selectedZone === zone.id
                    ? isLightOn ? '#FAFAF8' : '#2D2D2D'
                    : isLightOn ? '#FFFFFF' : '#1A1A1A',
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Selected indicator */}
                {selectedZone === zone.id && (
                  <motion.div
                    layoutId="zone-indicator"
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      border: `2px solid ${zone.accentColor}`,
                    }}
                  />
                )}

                {/* Zone label */}
                <div className="relative z-10">
                  <span className={`text-[10px] tracking-[0.2em] uppercase font-medium ${
                    selectedZone === zone.id
                      ? 'text-gold-500'
                      : isLightOn ? 'text-charcoal-300' : 'text-charcoal-500'
                  }`}>
                    {zone.nameEn}
                  </span>
                  <span className={`block text-lg font-display mt-1 ${
                    selectedZone === zone.id
                      ? isLightOn ? 'text-charcoal-700' : 'text-cream-100'
                      : isLightOn ? 'text-charcoal-500' : 'text-charcoal-300'
                  }`}>
                    {zone.name}
                  </span>
                </div>

                {/* Temperature display */}
                <div className={`relative z-10 text-right ${
                  selectedZone === zone.id
                    ? isLightOn ? 'text-charcoal-700' : 'text-cream-100'
                    : isLightOn ? 'text-charcoal-400' : 'text-charcoal-400'
                }`}>
                  <span className="text-3xl font-light">{ZONE_DETAILS[zone.id].temp}</span>
                  <span className="text-sm ml-0.5">°C</span>
                </div>

                {/* Ambient glow for selected */}
                {selectedZone === zone.id && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/2 opacity-20 pointer-events-none"
                    style={{
                      background: `linear-gradient(to top, ${zone.accentColor}, transparent)`,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-[2rem] shadow-soft-lg overflow-hidden border border-cream-300"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedZone}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-10"
            >
              {/* Zone Header */}
              <div className="flex items-center justify-between mb-10">
                <div>
                  <span className="text-xs tracking-[0.2em] uppercase text-gold-500 font-medium">
                    {currentZone?.nameEn}
                  </span>
                  <h3 className="text-3xl font-display font-light text-charcoal-700 mt-1">
                    {currentZone?.name}
                  </h3>
                </div>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentZone?.accentColor + '20' }}
                >
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: currentZone?.accentColor }}
                  />
                </div>
              </div>

              {/* Device Info */}
              <div className="bg-cream-100 rounded-2xl p-6 mb-8">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <span className="text-xs tracking-wider uppercase text-charcoal-300">기기</span>
                    <p className="text-charcoal-600 font-medium mt-1">{zoneDetail.device}</p>
                  </div>
                  <div>
                    <span className="text-xs tracking-wider uppercase text-charcoal-300">상태</span>
                    <p className="flex items-center gap-2 mt-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-charcoal-600 font-medium">{zoneDetail.status}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-xs tracking-wider uppercase text-charcoal-300">온도</span>
                    <p className="text-charcoal-700 font-display text-2xl mt-1">{zoneDetail.temp}°</p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Light Toggle */}
                <div className="flex items-center justify-between p-5 bg-cream-50 rounded-xl border border-cream-200">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      isLightOn ? 'bg-gold-100' : 'bg-charcoal-100'
                    }`}>
                      <svg className={`w-5 h-5 ${isLightOn ? 'text-gold-500' : 'text-charcoal-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className="font-medium text-charcoal-600">조명 제어</span>
                  </div>
                  <button
                    onClick={() => setIsLightOn(!isLightOn)}
                    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                      isLightOn
                        ? 'bg-gradient-to-r from-gold-400 to-gold-500'
                        : 'bg-charcoal-200'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                      animate={{ left: isLightOn ? '28px' : '4px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Voice Command Hint */}
                <div className="p-5 bg-gradient-to-br from-cream-50 to-gold-50/30 rounded-xl border border-gold-200/50">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs tracking-wider uppercase text-gold-600 font-medium mb-2">Voice Command</p>
                      <p className="text-charcoal-600 font-light leading-relaxed">
                        "오케이 구글, {currentZone?.name} 조명 {isLightOn ? '꺼줘' : '켜줘'}"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Zone Image */}
          <div className="relative h-52 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-700/60 via-transparent to-transparent z-10" />
            <img
              src={zoneDetail.imageUrl}
              alt={currentZone?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-6 z-20">
              <span className="text-cream-100/80 text-xs tracking-wider uppercase">Preview</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
