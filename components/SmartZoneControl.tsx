
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoneId } from '../types';

const SmartZoneControl: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<ZoneId>('living');
  const [isLightOn, setIsLightOn] = useState(true);

  // 구역 정의
  const zones: { id: ZoneId; name: string; color: string; gridPos: string }[] = [
    { id: 'living', name: 'Living Room', color: 'bg-orange-500', gridPos: 'col-start-1 row-start-1' },
    { id: 'bedroom', name: 'Bedroom', color: 'bg-blue-500', gridPos: 'col-start-2 row-start-1' },
    { id: 'kitchen', name: 'Kitchen', color: 'bg-emerald-500', gridPos: 'col-start-1 row-start-2' },
    { id: 'kids', name: 'Kids Room', color: 'bg-purple-500', gridPos: 'col-start-2 row-start-2' },
  ];

  // 구역별 상세 정보 및 이미지 (실제 구글 네스트 제품군 느낌의 이미지 시드 사용)
  const zoneDetails = {
    living: { 
      temp: 24, 
      device: 'Nest Hub Max', 
      status: '음악 재생 중', 
      // 화면이 있는 스마트 디스플레이 이미지
      imageUrl: 'https://images.unsplash.com/photo-1543512214-318c77a0e2eb?auto=format&fit=crop&q=80&w=300' 
    },
    bedroom: { 
      temp: 22, 
      device: 'Nest Audio', 
      status: '취침 모드', 
      // 패브릭 소재의 스피커 느낌
      imageUrl: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=300' 
    },
    kitchen: { 
      temp: 23, 
      device: 'Nest Thermostat', 
      status: '에너지 절약', 
      // 둥근 온도조절기 느낌
      imageUrl: 'https://images.unsplash.com/photo-1563456070-5b5502a55091?auto=format&fit=crop&q=80&w=300' 
    },
    kids: { 
      temp: 25, 
      device: 'Nest Cam', 
      status: '모니터링 On', 
      // 보안 카메라 느낌
      imageUrl: 'https://images.unsplash.com/photo-1557324232-b8917d3c3d63?auto=format&fit=crop&q=80&w=300' 
    },
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        
        {/* Left: 3D Isometric View */}
        <div className="w-full lg:w-1/2 perspective-1000">
          <div 
            className={`relative aspect-square w-full max-w-[500px] mx-auto transition-colors duration-700 rounded-[3rem] ${
              isLightOn ? 'bg-gray-50' : 'bg-[#0B101B]'
            } shadow-2xl border-4 border-white/10 flex items-center justify-center overflow-hidden`}
          >
            {/* Background Decor */}
            <div className={`absolute inset-0 bg-gradient-to-br ${isLightOn ? 'from-blue-50/50 to-purple-50/50' : 'from-blue-900/10 to-purple-900/10'}`} />

            {/* 3D Container */}
            <motion.div 
              className="relative grid grid-cols-2 gap-4 p-4 transform-style-3d"
              initial={false}
              animate={{ 
                rotateX: 60, // 더 깊은 각도로 3D 효과 강화
                rotateZ: -45,
                scale: 0.8
              }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              {zones.map((z) => {
                const isSelected = selectedZone === z.id;
                
                return (
                  <motion.div
                    key={z.id}
                    className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl cursor-pointer transition-all duration-300 transform-style-3d group
                      ${isLightOn ? 'bg-white shadow-lg' : 'bg-gray-800 shadow-2xl border border-gray-700'}
                      ${isSelected ? 'ring-4 ring-blue-500/50' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                    `}
                    onClick={() => setSelectedZone(z.id)}
                    whileHover={{ scale: 1.05, z: 20 }}
                  >
                    {/* Floor Status Light */}
                    <div className={`absolute inset-0 rounded-2xl opacity-20 transition-opacity duration-500 ${isLightOn ? 'opacity-0' : 'opacity-100'} ${z.color}`} />

                    {/* 3D Floating Element (Billboard) */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ 
                        // 부모의 회전을 상쇄시켜 정면을 바라보게 함 (Billboard Effect)
                        rotateZ: 45, 
                        rotateX: -60,
                        z: 40 // 바닥에서 띄움
                      }}
                    >
                      {/* Shadow on the floor */}
                      <div className="absolute -bottom-8 w-20 h-8 bg-black/20 blur-md rounded-[100%] transform scale-y-50" />

                      {/* Floating Card Content */}
                      <motion.div
                        animate={{ y: [0, -10, 0] }} // Floating animation
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: Math.random() * 2 }}
                        className={`relative w-24 h-28 bg-white/90 backdrop-blur-md rounded-xl p-2 shadow-xl border border-white/40 flex flex-col items-center gap-2 overflow-hidden
                           ${isSelected ? 'ring-2 ring-blue-500 scale-110' : ''}
                        `}
                      >
                         {/* Product Image */}
                         <div className="w-full h-16 rounded-lg overflow-hidden bg-gray-100">
                           <img 
                            src={zoneDetails[z.id].imageUrl} 
                            alt={z.name} 
                            className="w-full h-full object-cover"
                           />
                         </div>
                         
                         {/* Text Info */}
                         <div className="text-center">
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{z.name}</p>
                           <p className="text-[9px] font-medium text-gray-800 truncate px-1">{zoneDetails[z.id].device}</p>
                         </div>

                         {/* Status Dot */}
                         <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${z.color} animate-pulse`} />
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Toggle Switch */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50">
              <button
                onClick={(e) => { e.stopPropagation(); setIsLightOn(!isLightOn); }}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full font-bold shadow-lg transition-all
                  ${isLightOn ? 'bg-white text-gray-900' : 'bg-gray-800 text-white border border-gray-700'}
                `}
              >
                <span className="text-lg">{isLightOn ? '☀️' : '🌙'}</span>
                <span className="text-xs tracking-wide">{isLightOn ? 'Day Mode' : 'Night Mode'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="w-full lg:w-1/2 pl-0 lg:pl-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedZone}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg ${
                    selectedZone === 'living' ? 'bg-orange-100 text-orange-600' :
                    selectedZone === 'bedroom' ? 'bg-blue-100 text-blue-600' :
                    selectedZone === 'kitchen' ? 'bg-emerald-100 text-emerald-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  {selectedZone === 'living' ? '🛋️' : selectedZone === 'bedroom' ? '🛏️' : selectedZone === 'kitchen' ? '🍳' : '🧸'}
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-gray-900">{zoneDetails[selectedZone].device}</h2>
                  <p className="text-gray-500 font-medium">{zones.find(z => z.id === selectedZone)?.name}</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/50 space-y-6">
                 <div className="flex justify-between items-center pb-6 border-b border-gray-100">
                    <span className="text-gray-500 font-medium">현재 상태</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      {zoneDetails[selectedZone].status}
                    </span>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-xs text-gray-400 font-bold uppercase mb-1">Temperature</p>
                      <p className="text-2xl font-bold text-gray-900">{zoneDetails[selectedZone].temp}°C</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                       <p className="text-xs text-gray-400 font-bold uppercase mb-1">Usage</p>
                       <p className="text-2xl font-bold text-blue-600">Active</p>
                    </div>
                 </div>

                 <img 
                   src={zoneDetails[selectedZone].imageUrl} 
                   alt="Device Preview" 
                   className="w-full h-32 object-cover rounded-xl opacity-90"
                 />
              </div>

              <button className="w-full py-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold text-lg shadow-lg shadow-gray-300 transition-all transform hover:-translate-y-1">
                기기 제어하기
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SmartZoneControl;
