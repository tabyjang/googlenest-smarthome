import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
  resetError?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-100">
      <div className="max-w-lg mx-auto p-8 bg-white rounded-3xl shadow-luxury">
        <div className="text-center">
          {/* 에러 아이콘 */}
          <div className="text-6xl mb-6">⚠️</div>

          {/* 제목 */}
          <h1 className="text-2xl font-display text-charcoal-700 mb-4">
            문제가 발생했습니다
          </h1>

          {/* 설명 */}
          <p className="text-charcoal-400 mb-8 leading-relaxed">
            일시적인 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
          </p>

          {/* 액션 버튼 */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            {/* 주요 액션 - 페이지 새로고침 */}
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-charcoal-700 text-white rounded-full shadow-luxury hover:bg-charcoal-600 transition-colors duration-300"
            >
              페이지 새로고침
            </button>

            {/* 보조 액션 - 홈으로 */}
            <button
              onClick={handleGoHome}
              className="px-6 py-3 bg-cream-200 text-charcoal-700 rounded-full shadow-luxury hover:bg-cream-300 transition-colors duration-300"
            >
              홈으로 돌아가기
            </button>
          </div>

          {/* 개발 환경에서만 에러 메시지 표시 */}
          {process.env.NODE_ENV === 'development' && error && (
            <div className="mt-8 p-4 bg-cream-100 rounded-lg">
              <p className="text-xs text-charcoal-400 font-mono text-left">
                {error.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
