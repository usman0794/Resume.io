import React, { useState } from 'react';
import { Pencil, Target, MoreHorizontal } from 'lucide-react';

/**
 * Component: ResumeCard
 *
 * Purpose:
 * Displays a single resume document card with thumbnail preview, editable title,
 * last-updated timestamp, resume score badge, and quick-action list.
 *
 * Responsibilities:
 * - Render resume thumbnail (dark green preview image or skeleton placeholder)
 * - Render editable title with pencil icon (inline edit on click)
 * - Render "Updated [date]" subtitle in gray
 * - Render score badge: orange pill with percentage + "Your resume score" label
 * - Render action list: Tailor to job listing, Download PDF,
 *   Export to DOCX, Export to TXT, More (with blue ellipsis icon)
 * - Handle all action callbacks via props
 *
 * Props:
 *   id             — unique resume ID
 *   title          — resume name (editable)
 *   updatedAt      — human-readable date string (e.g. "24 May, 02:33")
 *   score          — resume completeness % (0–100)
 *   thumbnailUrl   — optional URL for the preview image
 *   onEdit         — callback fired after rename blur/enter
 *   onTailor       — callback for "Tailor to job listing"
 *   onDownloadPdf  — callback for "Download PDF"
 *   onExportDocx   — callback for "Export to DOCX"
 *   onExportTxt    — callback for "Export to TXT"
 *   onMore         — callback for "More"
 *
 * Design Intent:
 * Two-column flex row. Left: thumbnail card (~172×220px on desktop,
 * ~120×160px on mobile), border border-gray-200, rounded-lg, white bg.
 * Right: text + actions column, flex-1.
 * Score badge: bg-orange-500 (#f97316), white text, 11px bold, rounded-sm px-1.5.
 * Actions: icon 18px left, label 14px text-gray-700, gap-3 between icon and text,
 * gap-2.5 between action rows.
 * "More" action text is blue (#3B82F6 / text-blue-500).
 * Pencil icon: 15px, gray-400, appears inline next to title.
 * Title input (edit mode): same font size, underline focus, no bg.
 *
 * Layout Role:
 * First item(s) in the ResumeGrid, between the promo banner and NewResumeCard.
 *
 * Responsive Behavior:
 * - Mobile (<768px): thumbnail 120px wide, min-height 160px
 * - Desktop/Tablet (≥768px): thumbnail 172px wide, min-height 220px
 */

interface ResumeCardProps {
  id:             string;
  title:          string;
  updatedAt:      string;
  score:          number;
  thumbnailUrl?:  string;
  onEdit?:        (newTitle: string) => void;
  onTailor?:      () => void;
  onDownloadPdf?: () => void;
  onExportDocx?:  () => void;
  onExportTxt?:   () => void;
  onMore?:        () => void;
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  title,
  updatedAt,
  score,
  thumbnailUrl,
  onEdit,
  onTailor,
  onDownloadPdf,
  onExportDocx,
  onExportTxt,
  onMore,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue]         = useState(title);

  const commitEdit = () => {
    setIsEditingTitle(false);
    onEdit?.(titleValue);
  };

  return (
    <div className="rc-card flex gap-5 md:gap-6 py-2">

      {/* ── Thumbnail ──────────────────────────────────────── */}
      <div className="rc-thumbnail flex-shrink-0 w-[120px] md:w-[172px] rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white self-start">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={`${titleValue} resume preview`}
            className="w-full h-auto object-cover"
          />
        ) : (
          /*
           * Placeholder — dark-green resume skeleton matching the reference.
           * Mimics a real resume: header text lines, content lines at varying widths.
           */
          <div className="rc-thumbnail__placeholder w-full bg-[#1a4a3a] flex flex-col px-3 pt-4 pb-3 min-h-[160px] md:min-h-[220px]">
            {/* Name / header area */}
            <div className="w-3/4 h-2 bg-white/30 rounded-sm mb-1" />
            <div className="w-1/2 h-1.5 bg-white/20 rounded-sm mb-1" />
            <div className="w-2/3 h-1.5 bg-white/15 rounded-sm mb-3" />
            {/* Section label */}
            <div className="w-1/3 h-1.5 bg-white/25 rounded-sm mb-1.5" />
            {/* Content lines */}
            {[100, 85, 90, 70, 80, 60, 75, 55, 85, 65].map((w, i) => (
              <div
                key={i}
                className="h-1 bg-white/15 rounded-sm mb-1.5"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Content column ─────────────────────────────────── */}
      <div className="rc-content flex flex-col flex-1 min-w-0 pt-1">

        {/* Title row */}
        <div className="rc-title-row flex items-center gap-2 mb-0.5">
          {isEditingTitle ? (
            <input
              autoFocus
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commitEdit();
                if (e.key === 'Escape') { setTitleValue(title); setIsEditingTitle(false); }
              }}
              className="rc-title-input text-[20px] md:text-[22px] font-bold text-gray-900 bg-transparent border-b border-blue-400 outline-none w-full leading-tight"
              aria-label="Resume title"
            />
          ) : (
            <h2 className="rc-title text-[20px] md:text-[22px] font-bold text-gray-900 leading-tight truncate">
              {titleValue}
            </h2>
          )}
          <button
            type="button"
            onClick={() => setIsEditingTitle(true)}
            className="rc-edit-btn flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-0 bg-transparent border-none cursor-pointer"
            aria-label="Rename resume"
          >
            <Pencil size={15} />
          </button>
        </div>

        {/* Updated date */}
        <p className="rc-date text-[13px] text-gray-400 mb-3 leading-none">
          Updated {updatedAt}
        </p>

        {/* Score badge */}
        <div className="rc-score flex items-center gap-2 mb-4">
          <span className="rc-score__badge bg-orange-500 text-white text-[11px] font-bold px-1.5 py-0.5 rounded-sm leading-tight">
            {score}%
          </span>
          <span className="rc-score__label text-[13px] text-gray-600">
            Your resume score
          </span>
        </div>

        {/* Actions list */}
        <ul className="rc-actions flex flex-col gap-2.5 list-none m-0 p-0">

          {/* Tailor to job listing */}
          <li>
            <button
              type="button"
              onClick={onTailor}
              className="rc-action flex items-center gap-3 text-[14px] text-gray-700 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              <Target size={18} className="text-blue-500 flex-shrink-0" />
              Tailor to job listing
            </button>
          </li>

          {/* Download PDF */}
          <li>
            <button
              type="button"
              onClick={onDownloadPdf}
              className="rc-action flex items-center gap-3 text-[14px] text-gray-700 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              {/* Download arrow inside circle — blue */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <circle cx="9" cy="9" r="7.5" stroke="#3B82F6" strokeWidth="1.3" />
                <path
                  d="M9 5.5v5M6.5 8.5 9 11l2.5-2.5"
                  stroke="#3B82F6"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download PDF
            </button>
          </li>

          {/* Export to DOCX */}
          <li>
            <button
              type="button"
              onClick={onExportDocx}
              className="rc-action flex items-center gap-3 text-[14px] text-gray-700 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              {/* W icon — blue rounded square */}
              <div className="w-[18px] h-[18px] rounded-sm bg-blue-500 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-white text-[9px] font-bold leading-none">W</span>
              </div>
              Export to DOCX
            </button>
          </li>

          {/* Export to TXT */}
          <li>
            <button
              type="button"
              onClick={onExportTxt}
              className="rc-action flex items-center gap-3 text-[14px] text-gray-700 hover:text-blue-600 transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              {/* T icon — blue rounded square */}
              <div className="w-[18px] h-[18px] rounded-sm bg-blue-500 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <span className="text-white text-[9px] font-bold leading-none">T</span>
              </div>
              Export to TXT
            </button>
          </li>

          {/* More */}
          <li>
            <button
              type="button"
              onClick={onMore}
              className="rc-action flex items-center gap-3 text-[14px] text-blue-500 hover:text-blue-700 transition-colors bg-transparent border-none cursor-pointer p-0"
            >
              <MoreHorizontal size={18} className="flex-shrink-0 text-blue-400" />
              More
            </button>
          </li>

        </ul>
      </div>
    </div>
  );
};

export default ResumeCard;
