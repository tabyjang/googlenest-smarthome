import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* 브랜드 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path d="M9 22V12h6v10" />
              </svg>
              <span className="text-xl font-bold">Google Nest</span>
            </div>
            <p className="text-gray-400 max-w-md leading-relaxed">
              Google Nest와 함께 더 스마트하고 편리한 일상을 경험하세요.
              음성 하나로 조명, 온도, 보안까지 모든 것을 제어합니다.
            </p>
          </div>

          {/* 제품 링크 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">제품</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/products/nest-hub" className="hover:text-white transition-colors">
                  Nest Hub
                </Link>
              </li>
              <li>
                <Link to="/products/nest-audio" className="hover:text-white transition-colors">
                  Nest Audio
                </Link>
              </li>
              <li>
                <Link to="/products/nest-cam" className="hover:text-white transition-colors">
                  Nest Cam
                </Link>
              </li>
              <li>
                <Link to="/products/nest-thermostat" className="hover:text-white transition-colors">
                  Nest Thermostat
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객지원 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">고객지원</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/#estimator" className="hover:text-white transition-colors">
                  견적 문의
                </Link>
              </li>
              <li>
                <a href="https://support.google.com/googlenest" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  고객센터
                </a>
              </li>
              <li>
                <a href="https://store.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Google Store
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 Google Nest Experience. Created for Innovation.
          </p>
          <div className="flex gap-6 text-gray-500 text-sm">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
