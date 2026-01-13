import React from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen bg-cream-100 selection:bg-gold-200 selection:text-charcoal-700">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
