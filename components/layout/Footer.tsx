import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal-700 text-cream-200">
      {/* Top decorative line */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-charcoal-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path d="M9 22V12h6v10" />
                </svg>
              </div>
              <div>
                <span className="text-xl font-display font-semibold text-cream-100">Google Nest</span>
                <span className="block text-[10px] tracking-[0.15em] uppercase text-gold-400">Smart Living</span>
              </div>
            </div>
            <p className="text-charcoal-300 max-w-sm leading-relaxed font-light">
              Google Nest와 함께 더 스마트하고 품격있는 일상을 경험하세요.
              음성 하나로 조명, 온도, 보안까지 모든 것을 제어합니다.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 font-medium mb-6">Products</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/products/nest-hub" className="text-charcoal-300 hover:text-cream-100 transition-colors font-light">
                  Nest Hub
                </Link>
              </li>
              <li>
                <Link to="/products/nest-audio" className="text-charcoal-300 hover:text-cream-100 transition-colors font-light">
                  Nest Audio
                </Link>
              </li>
              <li>
                <Link to="/products/nest-cam" className="text-charcoal-300 hover:text-cream-100 transition-colors font-light">
                  Nest Cam
                </Link>
              </li>
              <li>
                <Link to="/products/nest-thermostat" className="text-charcoal-300 hover:text-cream-100 transition-colors font-light">
                  Nest Thermostat
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 font-medium mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/#estimator" className="text-charcoal-300 hover:text-cream-100 transition-colors font-light">
                  견적 문의
                </Link>
              </li>
              <li>
                <a href="https://support.google.com/googlenest" target="_blank" rel="noopener noreferrer" className="text-charcoal-300 hover:text-cream-100 transition-colors font-light">
                  고객센터
                </a>
              </li>
              <li>
                <a href="https://store.google.com" target="_blank" rel="noopener noreferrer" className="text-charcoal-300 hover:text-cream-100 transition-colors font-light">
                  Google Store
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-charcoal-600 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-charcoal-400 text-sm font-light">
            © 2026 Google Nest Experience. Crafted with elegance.
          </p>
          <div className="flex gap-8 text-charcoal-400 text-sm font-light">
            <a href="#" className="hover:text-cream-100 transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-cream-100 transition-colors">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
