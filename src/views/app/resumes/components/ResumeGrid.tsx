import React from 'react';
import ResumeCard from './ResumeCard';
import NewResumeCard from './NewResumeCard';
/**
 * Component: ResumeGrid
 *
 * Purpose:
 * Renders the list of existing resume cards plus the "New Resume" creation
 * card. On desktop/tablet uses a 2-column CSS grid; on mobile stacks vertically.
 *
 * Responsibilities:
 * - Map resume data array to ResumeCard instances
 * - Append NewResumeCard as the final item in the grid
 * - Provide consistent gap spacing between cards
 * - Insert mobile-only horizontal divider lines between stacked cards
 * - Bubble all action callbacks (tailor, download, export, more, edit) to parent
 *
 * Props:
 *   resumes     — array of resume data objects
 *   onCreateNew — callback fired when user clicks the NewResumeCard
 *
 * Design Intent:
 * Desktop (≥768px): CSS grid, 2 columns, gap-x-8 gap-y-2.
 *   Column 1: existing ResumeCard(s).
 *   Column 2: NewResumeCard.
 * Mobile (<768px): 1-column stack. Between cards: light border-gray-100 divider.
 * No outer card/box — cards are bare on the white page background.
 *
 * Layout Role:
 * Main content block of ResumesPage, below the promo banner, above AiCoachBar.
 *
 * Responsive Behavior:
 * - Mobile:  grid-cols-1, dividers between items
 * - Tablet+: grid-cols-2, no dividers, horizontal gap 32px
 */

export interface ResumeData {
  id:            string;
  title:         string;
  updatedAt:     string;
  score:         number;
  thumbnailUrl?: string;
}

interface ResumeGridProps {
  resumes:      ResumeData[];
  onCreateNew?: () => void;
  onDelete?:    (id: string) => void;
}

/** Default mock data — matches reference screenshot exactly */
export const MOCK_RESUMES: ResumeData[] = [
  {
    id:        'resume-1',
    title:     'Untitled',
    updatedAt: '24 May, 02:33',
    score:     20,
    // thumbnailUrl: undefined — will render the dark-green skeleton placeholder
  },
];

const ResumeGrid: React.FC<ResumeGridProps> = ({ resumes, onCreateNew, onDelete }) => (
  <div className="rg-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">

    {resumes.map((resume, idx) => (
      <React.Fragment key={resume.id}>

        {/* Mobile-only divider between stacked cards */}
        {idx > 0 && (
          <div className="rg-divider md:hidden col-span-full border-t border-gray-100 my-3" />
        )}

        <ResumeCard
          id={resume.id}
          title={resume.title}
          updatedAt={resume.updatedAt}
          score={resume.score}
          thumbnailUrl={resume.thumbnailUrl}
          onEdit={(newTitle) => console.log('[ResumeGrid] rename', resume.id, newTitle)}
          onTailor={() => console.log('[ResumeGrid] tailor', resume.id)}
          onDownloadPdf={async () => {
            try {
              await new Promise(r => setTimeout(r, 500));
              const dummyBlob = new Blob(['Mock PDF'], { type: 'application/pdf' });
              const url = URL.createObjectURL(dummyBlob);
              const a = document.createElement('a');
              a.href = url; a.download = `${resume.title || 'resume'}.pdf`; a.click();
              URL.revokeObjectURL(url);
            } catch { alert('Download failed. Please try again.'); }
          }}
          onExportDocx={() => console.log('[ResumeGrid] export docx', resume.id)}
          onExportTxt={() => console.log('[ResumeGrid] export txt', resume.id)}
          onMore={() => onDelete ? onDelete(resume.id) : console.log('[ResumeGrid] more', resume.id)}
        />

      </React.Fragment>
    ))}

    {/* New Resume card — always the last item in the grid */}
    <NewResumeCard onCreate={onCreateNew} />

  </div>
);

export default ResumeGrid;
