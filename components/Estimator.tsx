
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Estimator: React.FC = () => {
  const [rooms, setRooms] = useState(2);
  const [options, setOptions] = useState({
    lighting: true,
    heating: false,
    voice: true,
    security: false
  });

  const basePrice = 250000;
  const roomMultiplier = 120000;
  const optionPrices = {
    lighting: 80000,
    heating: 150000,
    voice: 190000,
    security: 220000
  };

  const totalPrice = basePrice + (rooms * roomMultiplier) + 
    (options.lighting ? optionPrices.lighting : 0) +
    (options.heating ? optionPrices.heating : 0) +
    (options.voice ? optionPrices.voice : 0) +
    (options.security ? optionPrices.security : 0);

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
      <div className="p-12 md:p-16">
        <h2 className="text-4xl font-bold mb-8 text-center">나만의 스마트홈 견적</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">방 개수</label>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setRooms(Math.max(1, rooms - 1))}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="text-3xl font-bold w-12 text-center">{rooms}</span>
                <button 
                  onClick={() => setRooms(Math.min(5, rooms + 1))}
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">원하는 기능</label>
              <div className="space-y-4">
                {Object.entries(options).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                    <span className="font-medium text-gray-700 capitalize">
                      {key === 'lighting' ? '지능형 조명 제어' : 
                       key === 'heating' ? '각방 난방 제어' :
                       key === 'voice' ? '전 구역 음성 인식' : '통합 보안 모니터링'}
                    </span>
                    <input 
                      type="checkbox" 
                      checked={value}
                      onChange={() => setOptions(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                      className="w-6 h-6 rounded-lg text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-[2rem] p-8 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-400">예상 리스트</h3>
              <ul className="space-y-4">
                <li className="flex justify-between text-sm">
                  <span>기본 시스템 구축</span>
                  <span className="font-medium">₩{basePrice.toLocaleString()}</span>
                </li>
                <li className="flex justify-between text-sm">
                  <span>구역별 구성 ({rooms}개)</span>
                  <span className="font-medium">₩{(rooms * roomMultiplier).toLocaleString()}</span>
                </li>
                {Object.entries(options).map(([key, value]) => value && (
                  <li key={key} className="flex justify-between text-sm text-blue-600">
                    <span>{key === 'lighting' ? '조명 솔루션' : key === 'heating' ? '난방 시스템' : key === 'voice' ? '음성 엔진' : '보안 팩'}</span>
                    <span className="font-medium">+₩{optionPrices[key as keyof typeof optionPrices].toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8 border-t border-gray-200 mt-8">
              <div className="flex justify-between items-end mb-6">
                <span className="text-sm font-bold text-gray-400 uppercase">예상 견적</span>
                <span className="text-4xl font-bold text-gray-900">₩{totalPrice.toLocaleString()}</span>
              </div>
              <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
                상담 신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimator;
