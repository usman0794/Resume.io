import React from 'react';
import { FileText } from 'lucide-react';

/**
 * TemplatePlaceholder
 * Shown in the resume builder when no template image is available.
 */
const TemplatePlaceholder: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    className={`flex flex-col items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-400 ${className}`}
    aria-label="Template preview unavailable"
  >
    <FileText size={40} strokeWidth={1.5} className="mb-2 text-slate-300" />
    <span className="text-[13px] font-medium">No preview</span>
  </div>
);

export default TemplatePlaceholder;
