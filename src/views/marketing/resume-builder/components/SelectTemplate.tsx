import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import type { RootState } from '@/store/rootReducer';
import { setSelectedTemplate } from '@/store/reducers/resumeReducer';
import type { Template } from '@/types/template.types';

const getTemplateImageUrl = (template: Template): string => {
  if (!template.image_url) {
    return 'https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg';
  }
  // If already absolute URL, return as-is
  if (template.image_url.startsWith('http')) return template.image_url;
  // Mock local image resolution
  return `/assets/images/${template.image_url.split('/').pop()}`;
};

interface SelectTemplateProps {
  isOpen: boolean;
  onClose: () => void;
  previewRef?: React.RefObject<HTMLDivElement | null>;
  onClickDownloadBtn: () => void;
  onClickIncreaseBtn: () => void;
  onClickDecreaseBtn: () => void;
  onClickColorChange: (color: string) => void;
  selectedColor: string;
}

const SelectTemplate = ({
  isOpen,
  onClose,
  onClickDownloadBtn,
  onClickIncreaseBtn,
  onClickDecreaseBtn,
  onClickColorChange,
  selectedColor,
}: SelectTemplateProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const templates: Template[] = useSelector((state: RootState) => state.resumeReducer.home?.templates ?? []);
  const selectedTemplate = useSelector((state: RootState) => state.resumeReducer.selectedTemplate);

  if (!isOpen) return null;

  const isLoading = !templates || templates.length === 0;

  const handleSelectTemplate = (template: Template) => {
    dispatch(setSelectedTemplate(template));
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center">
        <div className="relative bg-blue-800 shadow-lg w-full h-screen overflow-y-auto">
          {/* Navbar bar */}
          <div className="flex items-center justify-between px-6 py-3 bg-blue-900 border-b border-blue-700">
            <span className="text-white font-semibold text-sm">Choose Template</span>
            <div className="flex items-center gap-3">
              <button
                onClick={onClickIncreaseBtn}
                className="px-3 py-1 text-xs text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
              >
                A+
              </button>
              <button
                onClick={onClickDecreaseBtn}
                className="px-3 py-1 text-xs text-white bg-blue-700 hover:bg-blue-600 rounded-lg transition-colors"
              >
                A-
              </button>
              <button
                onClick={onClickDownloadBtn}
                className="px-3 py-1 text-xs text-white bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors"
              >
                Download PDF
              </button>
              {/* Color swatch row */}
              {['#1e4a8b','#C62828','#2E7D32','#6A1B9A','#1a1a1a'].map(c => (
                <button
                  key={c}
                  onClick={() => onClickColorChange(c)}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${selectedColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
              <button onClick={onClose} className="text-white hover:text-gray-300 transition-colors ml-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex h-[calc(100vh-52px)]">
            {/* Template list */}
            <div className="w-full md:w-4/12 h-full bg-blue-900 px-8 py-6 border-r border-blue-700 overflow-y-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-400 rounded-full animate-spin mb-4 mx-auto" />
                  <p className="text-white text-sm mb-2">Loading templates...</p>
                  <button
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-lg transition-colors"
                    onClick={() => window.location.reload()}
                  >
                    Retry
                  </button>
                </div>
              ) : templates.length === 0 ? (
                <div className="bg-red-500/20 border border-red-400 text-red-100 p-4 rounded-xl text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⚠</span>
                    <strong>No templates available</strong>
                  </div>
                  <p className="text-red-50/90 text-xs mb-3">Templates failed to load from server.</p>
                  <div className="flex gap-2">
                    <button
                      className="flex-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg font-medium transition-colors"
                      onClick={() => window.dispatchEvent(new CustomEvent('retry-templates'))}
                    >
                      Retry Load
                    </button>
                    <button
                      className="px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-lg transition-colors"
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                  {templates.map((template, idx) => (
                    <div
                      key={template.id ?? idx}
                      className={`relative text-center cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'border-indigo-400 ring-2 ring-indigo-300'
                          : 'border-transparent hover:border-blue-400'
                      }`}
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <h2 className="mb-1 font-extralight text-white truncate text-sm px-2 pt-2">
                        {template.name ?? 'Template'}
                      </h2>
                      {Array.isArray(template.tags) && template.tags.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-1 mb-2 px-2">
                          {template.tags.map(tag => (
                            <span key={tag} className="text-[10px] bg-blue-900 text-blue-200 rounded-full px-2 py-0.5">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="p-2 bg-blue-50 rounded-md hover:border-2 hover:border-blue-600">
                        <img
                          src={getTemplateImageUrl(template)}
                          alt={template.name ?? 'CV Sample'}
                          className="w-full h-auto drop-shadow-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Preview pane */}
            <div className="w-full md:w-8/12 h-full bg-white px-4 lg:px-12 py-6 overflow-y-auto flex items-start justify-center">
              {selectedTemplate?.html ? (
                <div
                  className="bg-white shadow-xl origin-top"
                  style={{ width: '794px', minHeight: '1122px', transform: 'scale(0.55)', transformOrigin: 'top center' }}
                  dangerouslySetInnerHTML={{ __html: selectedTemplate.html }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg className="w-16 h-20 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm">Select a template to preview</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTemplate;
