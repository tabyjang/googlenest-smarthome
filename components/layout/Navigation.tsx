import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 50;

  const navItems = [
    { label: '홈', path: '/' },
    { label: '제품', path: '/products' },
    { label: '견적', path: '/#estimator' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-6 py-4 ${
      isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
            <path d="M12 3L4 9V21H20V9L12 3Z" stroke={isScrolled ? "#202124" : "#ffffff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="14" r="3" stroke={isScrolled ? "#202124" : "#ffffff"} strokeWidth="2"/>
          </svg>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
            Google <span className="font-normal opacity-70">Nest</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `text-sm font-medium uppercase tracking-widest transition-colors ${
                isScrolled
                  ? isActive ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                  : isActive ? 'text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <Link
          to="/products"
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            isScrolled ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white text-gray-900'
          }`}
        >
          제품 보기
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
