import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text,
  fullScreen = false
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-2',
    lg: 'w-16 h-16 border-3',
  };

  const spinner = (
    <div className={fullScreen ? 'inline-flex items-center gap-3' : 'inline-flex items-center gap-3'}>
      <div
        className={`${sizeClasses[size]} border-gold-400 border-t-transparent rounded-full animate-spin`}
        aria-label="로딩 중"
      />
      {text && (
        <span className="text-charcoal-400 font-light tracking-wide">
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-100">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default LoadingSpinner;
