import React from 'react';
import { Compass, ArrowDownToLine, FileDown, FileText as FileTxt, Trash2 } from 'lucide-react';

export interface DocumentCardProps {
  id:            number;
  title:         string;
  updatedAt:     string;
  score?:        number;
  thumbnailUrl?: string;
  onDelete?:     () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  id, title, updatedAt, score = 0, thumbnailUrl, onDelete,
}) => {
  const handleDownload = async () => {
    if (!id) return;
    try {
      await new Promise(r => setTimeout(r, 500));
      const dummyBlob = new Blob(['Mock PDF'], { type: 'application/pdf' });
      const url = URL.createObjectURL(dummyBlob);
      const a   = document.createElement('a');
      a.href     = url;
      a.download = `${title || 'resume'}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Download failed. Please try again.');
    }
  };

  const handleDelete = () => {
    if (!onDelete) return;
    if (window.confirm(`Delete "${title}"? This cannot be undone.`)) {
      onDelete();
    }
  };

  return (
    <div className="flex gap-6 p-1">
      {/* Preview */}
      <div className="w-[140px] shrink-0">
        <div className="bg-white w-full aspect-[1/1.4] rounded border border-gray-200 shadow-sm overflow-hidden group cursor-pointer hover:border-blue-300 transition-colors flex">
          {thumbnailUrl ? (
            <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="w-1/3 bg-[#134e40] h-full" />
              <div className="flex-1 bg-white" />
            </>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 pt-1">
        <div className="flex items-center gap-2 mb-1 group cursor-pointer w-max">
          <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {title || 'Untitled'}
          </h4>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </div>
        <p className="text-xs text-gray-500 mb-4">Updated {updatedAt}</p>

        {score > 0 && (
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">{score}%</span>
            <span className="text-sm font-medium text-gray-700">Your resume score</span>
          </div>
        )}

        <div className="space-y-3">
          <button className="flex items-center gap-3 text-sm text-gray-700 font-medium hover:text-blue-600 transition-colors">
            <div className="w-6 flex justify-center text-blue-500"><Compass size={18} /></div>
            Tailor to job listing
          </button>
          <button
            onClick={handleDownload}
            disabled={!id}
            className="flex items-center gap-3 text-sm text-gray-700 font-medium hover:text-blue-600 transition-colors disabled:opacity-40"
          >
            <div className="w-6 flex justify-center text-blue-500"><ArrowDownToLine size={18} /></div>
            Download PDF
          </button>
          <button className="flex items-center gap-3 text-sm text-gray-700 font-medium hover:text-blue-600 transition-colors">
            <div className="w-6 flex justify-center text-blue-500"><FileDown size={18} /></div>
            Export to DOCX
          </button>
          <button className="flex items-center gap-3 text-sm text-gray-700 font-medium hover:text-blue-600 transition-colors">
            <div className="w-6 flex justify-center text-blue-500"><FileTxt size={18} /></div>
            Export to TXT
          </button>
          {onDelete && (
            <button
              onClick={handleDelete}
              className="flex items-center gap-3 text-sm text-red-500 font-medium hover:text-red-700 transition-colors"
            >
              <div className="w-6 flex justify-center"><Trash2 size={18} /></div>
              Delete Resume
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
