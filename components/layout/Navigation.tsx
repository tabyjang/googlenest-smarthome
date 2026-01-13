import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isScrolled = scrollY > 50;

  const navItems = [
    { label: '홈', path: '/' },
    { label: '컬렉션', path: '/products' },
    { label: '견적 문의', path: '/#estimator' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4 ${
        isScrolled
          ? 'bg-cream-100/90 backdrop-blur-xl shadow-soft'
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
              isScrolled
                ? 'bg-gradient-to-br from-charcoal-700 to-charcoal-600'
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3L4 9V21H9V14H15V21H20V9L12 3Z"
                  stroke={isScrolled ? "#FAFAF8" : "#FFFFFF"}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="10"
                  r="2"
                  stroke={isScrolled ? "#C9A962" : "#C9A962"}
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className={`text-lg font-display font-semibold tracking-tight transition-colors duration-500 ${
                isScrolled ? 'text-charcoal-700' : 'text-white'
              }`}>
                Google Nest
              </span>
              <span className={`text-[10px] tracking-[0.15em] uppercase transition-colors duration-500 ${
                isScrolled ? 'text-gold-500' : 'text-gold-300'
              }`}>
                Smart Living
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  relative text-sm font-medium tracking-wide transition-all duration-300
                  ${isScrolled
                    ? isActive
                      ? 'text-charcoal-700'
                      : 'text-charcoal-400 hover:text-charcoal-700'
                    : isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={`absolute -bottom-1.5 left-0 right-0 h-px ${
                          isScrolled
                            ? 'bg-gradient-to-r from-transparent via-gold-400 to-transparent'
                            : 'bg-gradient-to-r from-transparent via-white to-transparent'
                        }`}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            to="/products"
            className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-500 ${
              isScrolled
                ? 'bg-charcoal-700 text-cream-100 hover:bg-charcoal-600 shadow-luxury'
                : 'bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25'
            }`}
          >
            <span>둘러보기</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'bg-cream-200' : 'bg-white/10'
            }`}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              <motion.span
                animate={{
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 6 : 0
                }}
                className={`w-full h-0.5 rounded-full ${isScrolled ? 'bg-charcoal-600' : 'bg-white'}`}
              />
              <motion.span
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className={`w-3/4 h-0.5 rounded-full ${isScrolled ? 'bg-charcoal-600' : 'bg-white'}`}
              />
              <motion.span
                animate={{
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -6 : 0
                }}
                className={`w-full h-0.5 rounded-full ${isScrolled ? 'bg-charcoal-600' : 'bg-white'}`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-cream-100/98 backdrop-blur-xl pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => `
                      block text-3xl font-display font-light
                      ${isActive ? 'text-charcoal-700' : 'text-charcoal-400'}
                    `}
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-8 mt-8 border-t border-cream-400"
              >
                <Link
                  to="/products"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-charcoal-700 text-cream-100 rounded-full font-medium shadow-luxury"
                >
                  <span>컬렉션 둘러보기</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
