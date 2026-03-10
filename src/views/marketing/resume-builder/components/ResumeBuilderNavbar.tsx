import React from 'react';
import { useEffect, useRef, useState } from 'react';

interface ResumeBuilderNavbarProps {
  onIncreaseFontSize: () => void;
  onDecreaseFontSize: () => void;
  onDownload: (type: string) => void;
  showColorOptions?: boolean;
  onColorChange?: (color: string) => void;
  selectedColor?: string;
  onBack?: () => void;
}

const COLOR_OPTIONS = ['#000000', '#1a2a3a', '#1565C0', '#2E7D32', '#6A1B9A', '#AD1457', '#E65100'];

const ResumeBuilderNavbar = ({
  onIncreaseFontSize,
  onDecreaseFontSize,
  onDownload,
  showColorOptions = false,
  onColorChange,
  selectedColor,
  onBack,
}: ResumeBuilderNavbarProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isThreeDotMenuOpen, setThreeDotMenuOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [downloadFileType, setDownloadFileType] = useState('PDF');

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setThreeDotMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-blue-800 text-white sticky md:static top-0 z-50 text-sm rounded-t-md">
      <div className="w-full flex items-center justify-between py-3 px-4">
        {/* Left */}
        <div className="flex items-center space-x-4">
          {showColorOptions && onBack && (
            <button
              onClick={onBack}
              className="px-4 text-white text-center rounded-full hover:bg-blue-700 hover:px-4 hover:py-1 focus:outline-none flex items-center"
            >
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to editor
            </button>
          )}
        </div>

        {/* Hamburger — mobile */}
        <button
          className="sm:hidden text-white hover:text-gray-300 focus:outline-none"
          onClick={() => setMobileMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop controls */}
        <div className="hidden sm:flex items-center space-x-4">
          {/* Font size */}
          <div className="flex items-center space-x-2">
            <button onClick={onDecreaseFontSize} className="p-2 hover:bg-blue-700 rounded-full focus:outline-none" aria-label="Decrease font size">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            </button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6" />
            </svg>
            <button onClick={onIncreaseFontSize} className="p-2 hover:bg-blue-700 rounded-full focus:outline-none" aria-label="Increase font size">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            </button>
          </div>

          {/* Color swatches */}
          {showColorOptions && onColorChange && (
            <div className="flex items-center space-x-1">
              {COLOR_OPTIONS.map(color => (
                <button key={color} onClick={() => onColorChange(color)}
                  className="w-5 h-5 rounded-full border-2 focus:outline-none transition-transform hover:scale-110"
                  style={{ backgroundColor: color, borderColor: selectedColor === color ? '#fff' : 'transparent' }}
                  aria-label={`Color ${color}`}
                />
              ))}
            </div>
          )}

          {/* Download */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center">
              <button
                onClick={() => onDownload(downloadFileType)}
                className="bg-white text-blue-800 font-semibold px-4 py-1.5 rounded-l-full hover:bg-gray-100 focus:outline-none text-xs"
              >
                Download {downloadFileType}
              </button>
              <button
                onClick={() => setThreeDotMenuOpen(p => !p)}
                className="bg-white text-blue-800 px-2 py-1.5 rounded-r-full hover:bg-gray-100 focus:outline-none border-l border-blue-200"
                aria-label="More download options"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
            {isThreeDotMenuOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg z-50 overflow-hidden text-gray-800 text-xs w-28">
                {['PDF'].map(t => (
                  <button key={t} onClick={() => { setDownloadFileType(t); setThreeDotMenuOpen(false); }}
                    className="flex items-center justify-between w-full px-3 py-2 hover:bg-gray-100">
                    {t}
                    {downloadFileType === t && (
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-blue-900 px-4 pb-4 space-y-3">
          <div className="flex items-center space-x-2 pt-2">
            <button onClick={onDecreaseFontSize} className="p-2 hover:bg-blue-700 rounded-full" aria-label="Decrease font size">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>
            </button>
            <button onClick={onIncreaseFontSize} className="p-2 hover:bg-blue-700 rounded-full" aria-label="Increase font size">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            </button>
          </div>
          <button
            onClick={() => { onDownload(downloadFileType); setMobileMenuOpen(false); }}
            className="w-full bg-white text-blue-800 font-semibold py-2 rounded-full text-xs hover:bg-gray-100"
          >
            Download {downloadFileType}
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilderNavbar;
