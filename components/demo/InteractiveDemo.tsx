import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZONE_DETAILS } from '../../constants';
import { ZoneId } from '../../types';

const zones: { id: ZoneId; name: string; color: string; gridPos: string }[] = [
  { id: 'living', name: '거실', color: '#4285F4', gridPos: 'col-span-2 row-span-2' },
  { id: 'bedroom', name: '침실', color: '#34A853', gridPos: 'col-span-1 row-span-2' },
  { id: 'kitchen', name: '주방', color: '#FBBC05', gridPos: 'col-span-2 row-span-1' },
  { id: 'kids', name: '아이방', color: '#EA4335', gridPos: 'col-span-1 row-span-1' },
];

const InteractiveDemo: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ZoneId>('living');
  const [isLightOn, setIsLightOn] = useState(true);
  const zoneDetail = ZONE_DETAILS[selectedZone];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          스마트홈 체험하기
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          각 공간을 클릭하여 Google Nest가 어떻게 작동하는지 확인해보세요
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Floor Plan */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 grid-rows-3 gap-3 aspect-square"
        >
          {zones.map((zone) => (
            <motion.button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              className={`${zone.gridPos} rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${
                selectedZone === zone.id
                  ? 'ring-4 ring-blue-500 shadow-2xl scale-[1.02]'
                  : 'hover:scale-[1.01]'
              }`}
              style={{
                backgroundColor: selectedZone === zone.id
                  ? zone.color
                  : isLightOn ? '#f3f4f6' : '#1f2937',
              }}
              whileHover={{ scale: selectedZone === zone.id ? 1.02 : 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={`text-sm font-bold uppercase tracking-widest ${
                selectedZone === zone.id ? 'text-white' : isLightOn ? 'text-gray-500' : 'text-gray-400'
              }`}>
                {zone.name}
              </span>
              <div className={`text-2xl font-bold ${
                selectedZone === zone.id ? 'text-white' : isLightOn ? 'text-gray-800' : 'text-white'
              }`}>
                {ZONE_DETAILS[zone.id].temp}°C
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedZone}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Zone Header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: zones.find(z => z.id === selectedZone)?.color }}
                />
                <h3 className="text-2xl font-bold">
                  {zones.find(z => z.id === selectedZone)?.name}
                </h3>
              </div>

              {/* Device Info */}
              <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">연결된 기기</span>
                  <span className="font-bold">{zoneDetail.device}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500">상태</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {zoneDetail.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">현재 온도</span>
                  <span className="text-3xl font-bold">{zoneDetail.temp}°C</span>
                </div>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                {/* Light Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <span className="font-medium">조명</span>
                  <button
                    onClick={() => setIsLightOn(!isLightOn)}
                    className={`relative w-14 h-8 rounded-full transition-colors ${
                      isLightOn ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <motion.div
                      className="absolute top-1 w-6 h-6 bg-white rounded-full shadow"
                      animate={{ left: isLightOn ? '28px' : '4px' }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  </button>
                </div>

                {/* Voice Command Hint */}
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-sm text-blue-600 font-medium mb-2">음성 명령 예시</p>
                  <p className="text-gray-700">
                    "오케이 구글, {zones.find(z => z.id === selectedZone)?.name} 조명 {isLightOn ? '꺼줘' : '켜줘'}"
                  </p>
                </div>
              </div>

              {/* Zone Image */}
              <div className="mt-6 rounded-2xl overflow-hidden">
                <img
                  src={zoneDetail.imageUrl}
                  alt={zones.find(z => z.id === selectedZone)?.name}
                  className="w-full h-48 object-cover"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
