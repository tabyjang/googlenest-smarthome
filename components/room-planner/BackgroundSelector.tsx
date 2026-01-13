import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Background } from '../../types';

interface BackgroundSelectorProps {
  backgrounds: Background[];
  currentBackground: Background | null;
  onSelectBackground: (background: Background) => void;
  onClose: () => void;
}

export default function BackgroundSelector({
  backgrounds,
  currentBackground,
  onSelectBackground,
  onClose
}: BackgroundSelectorProps) {
  const [customBackground, setCustomBackground] = useState<Background | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('이미지 파일만 업로드할 수 있습니다.');
      setIsUploading(false);
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadError('파일 크기는 10MB 이하여야 합니다.');
      setIsUploading(false);
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;

        // Create image to validate dimensions
        const img = new Image();
        img.onload = () => {
          if (img.width < 800 || img.height < 600) {
            setUploadError('이미지 크기는 최소 800x600 픽셀이어야 합니다.');
            setIsUploading(false);
            return;
          }

          const customBg: Background = {
            id: `custom-${Date.now()}`,
            name: '내 사진',
            thumbnail: dataUrl,
            fullImage: dataUrl,
            isCustom: true
          };

          setCustomBackground(customBg);
          setIsUploading(false);
        };
        img.onerror = () => {
          setUploadError('이미지를 불러올 수 없습니다.');
          setIsUploading(false);
        };
        img.src = dataUrl;
      };
      reader.onerror = () => {
        setUploadError('파일을 읽을 수 없습니다.');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploadError('업로드 중 오류가 발생했습니다.');
      setIsUploading(false);
    }
  };

  const allBackgrounds = customBackground
    ? [customBackground, ...backgrounds]
    : backgrounds;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-charcoal-700/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-cream-200 flex items-center justify-between">
          <h2 className="font-display text-xl text-charcoal-600">배경 선택</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-cream-100 rounded-full transition-colors"
          >
            <svg className="w-5 h-5 text-charcoal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {/* Upload Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-charcoal-600 mb-3">내 방 사진 업로드</h3>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                isUploading
                  ? 'border-gold-400 bg-gold-50'
                  : 'border-cream-300 hover:border-gold-400 hover:bg-cream-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <svg className="w-8 h-8 text-gold-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <p className="mt-2 text-sm text-charcoal-600">업로드 중...</p>
                </div>
              ) : (
                <>
                  <svg
                    className="w-10 h-10 mx-auto text-cream-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm text-charcoal-600">
                    클릭하여 이미지를 선택하세요
                  </p>
                  <p className="text-xs text-charcoal-600/50 mt-1">
                    최소 800x600 픽셀 / 최대 10MB
                  </p>
                </>
              )}
            </div>
            {uploadError && (
              <p className="mt-2 text-sm text-red-500">{uploadError}</p>
            )}
          </div>

          {/* Background Grid */}
          <div>
            <h3 className="text-sm font-medium text-charcoal-600 mb-3">기본 배경</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allBackgrounds.map((bg) => (
                <motion.button
                  key={bg.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectBackground(bg)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                    currentBackground?.id === bg.id
                      ? 'border-gold-400 ring-2 ring-gold-400 ring-offset-2'
                      : 'border-transparent hover:border-gold-300'
                  }`}
                >
                  <img
                    src={bg.thumbnail}
                    alt={bg.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-700/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white text-sm font-medium">
                    {bg.name}
                  </span>
                  {bg.isCustom && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 bg-gold-500 text-white text-xs rounded-full">
                      업로드
                    </span>
                  )}
                  {currentBackground?.id === bg.id && (
                    <div className="absolute top-2 left-2">
                      <svg className="w-6 h-6 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-cream-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-charcoal-600 hover:bg-cream-100 rounded-lg transition-colors"
          >
            취소
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
