import React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';
import ResumeBuilderNavbar from './ResumeBuilderNavbar';

// ─── Section renderers ────────────────────────────────────────────────────────

const renderEducations = (items: any[] = []) =>
  items.map(e => `
    <div style="margin-bottom:10px;">
      <strong>${e.school || ''}</strong>${e.degree ? ` — ${e.degree}` : ''}${e.field_of_study ? `, ${e.field_of_study}` : ''}<br/>
      <span style="color:#555;font-size:0.9em;">${e.start_date || ''}${e.end_date ? ` – ${e.end_date}` : ''}</span>
      ${e.description ? `<p style="margin:4px 0 0;">${e.description}</p>` : ''}
    </div>`).join('');

const renderWorkExperience = (items: any[] = []) =>
  items.map(e => `
    <div style="margin-bottom:12px;">
      <strong>${e.jobTitle || ''}</strong>${e.employer ? ` at ${e.employer}` : ''}<br/>
      <span style="color:#555;font-size:0.9em;">${e.startDate || ''}${e.endDate ? ` – ${e.endDate}` : ''}</span>
      ${e.description ? `<p style="margin:4px 0 0;">${e.description}</p>` : ''}
    </div>`).join('');

const renderSkills = (items: any[] = []) =>
  items.map(s => `<span style="display:inline-block;margin:2px 4px;">${s.label || ''}</span>`).join('');

const renderLanguages = (items: any[] = []) =>
  items.map(l => `<span style="display:inline-block;margin:2px 4px;">${l.language || ''}</span>`).join('');

const renderProjects = (items: any[] = []) =>
  items.map(p => `
    <div style="margin-bottom:10px;">
      <strong>${p.title || ''}</strong>${p.role ? ` — ${p.role}` : ''}<br/>
      <span style="color:#555;font-size:0.9em;">${p.startDate || ''}${p.endDate ? ` – ${p.endDate}` : ''}</span>
      ${p.description ? `<p style="margin:4px 0 0;">${p.description}</p>` : ''}
    </div>`).join('');

const renderCertifications = (items: any[] = []) =>
  items.map(c => `
    <div style="margin-bottom:8px;">
      <strong>${c.name || ''}</strong>${c.issuer ? ` — ${c.issuer}` : ''}${c.date ? ` (${c.date})` : ''}
    </div>`).join('');

const renderSocialLinks = (items: any[] = []) =>
  items.map(s => `
    <div style="margin-bottom:4px;">
      ${s.label ? `<strong>${s.label}:</strong> ` : ''}${s.url ? `<a href="${s.url}">${s.url}</a>` : ''}
    </div>`).join('');

const renderReferences = (items: any[] = []) =>
  items.map(r => `
    <div style="margin-bottom:10px;">
      <strong>${r.name || ''}</strong>${r.company ? ` — ${r.company}` : ''}<br/>
      ${r.phone ? `📞 ${r.phone}  ` : ''}${r.email ? `✉ ${r.email}` : ''}
    </div>`).join('');

const renderExtraCurricular = (items: any[] = []) =>
  items.map(a => `
    <div style="margin-bottom:8px;">
      <strong>${a.title || ''}</strong>${a.description ? `<p style="margin:3px 0 0;">${a.description}</p>` : ''}
    </div>`).join('');

const buildPreviewHTML = (selectedTemplate: any, formData: any, professionalSummary: string): string | null => {
  if (!selectedTemplate?.html) return null;
  const fm = formData || {};
  let html = selectedTemplate.html;

  const scalars: Record<string, string> = {
    '{{firstName}}': fm.firstName || '',
    '{{lastName}}': fm.lastName || '',
    '{{jobTitle}}': fm.jobTitle || '',
    '{{email}}': fm.email || '',
    '{{phone}}': fm.phone || '',
    '{{address}}': fm.address || '',
    '{{city}}': fm.city || '',
    '{{country}}': fm.country || '',
    '{{postalCode}}': fm.postalCode || '',
    '{{nationality}}': fm.nationality || '',
    '{{dateOfBirth}}': fm.dateOfBirth || '',
    '{{placeOfBirth}}': fm.placeOfBirth || '',
    '{{drivingLicense}}': fm.drivingLicense || '',
    '{{summary}}': professionalSummary || '',
    '{{interests}}': fm.interests || '',
    '{{footer}}': fm.footer || '',
  };
  Object.entries(scalars).forEach(([key, val]) => {
    html = html.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), val);
  });

  const blocks: Record<string, string> = {
    '{{educations}}': renderEducations(fm.educations),
    '{{workExperience}}': renderWorkExperience(fm.workExperience),
    '{{skills}}': renderSkills(fm.skills),
    '{{languages}}': renderLanguages(fm.languages),
    '{{projects}}': renderProjects(fm.projects),
    '{{certifications}}': renderCertifications(fm.certifications),
    '{{socialLinks}}': renderSocialLinks(fm.socialLinks),
    '{{references}}': renderReferences(fm.references),
    '{{extraCarricularActivities}}': renderExtraCurricular(fm.extraCarricularActivities),
  };
  Object.entries(blocks).forEach(([key, val]) => {
    html = html.replace(new RegExp(key.replace(/[{}]/g, '\\$&'), 'g'), val);
  });

  return html;
};

// ─── Component ────────────────────────────────────────────────────────────────

interface PreviewSectionProps {
  hideNavigationBar?: boolean;
  onIncreaseFontSize?: () => void;
  onDecreaseFontSize?: () => void;
  onDownload?: (type: string) => void;
  onColorChange?: (color: string) => void;
  selectedColor?: string;
}

const PreviewSection = ({
  hideNavigationBar = false,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onDownload,
  onColorChange,
  selectedColor,
}: PreviewSectionProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const formData = useSelector((s: RootState) => s.resumeReducer.formModal);
  const professionalSummary = useSelector((s: RootState) => s.resumeReducer.professionalSummary);
  const selectedTemplate = useSelector((s: RootState) => s.resumeReducer.selectedTemplate);

  const preview = buildPreviewHTML(selectedTemplate, formData, professionalSummary || '');

  return (
    <>
      {!hideNavigationBar && onIncreaseFontSize && onDecreaseFontSize && onDownload && (
        <div className="w-full md:w-[80%] md:mx-auto">
          <ResumeBuilderNavbar
            onIncreaseFontSize={onIncreaseFontSize}
            onDecreaseFontSize={onDecreaseFontSize}
            onDownload={onDownload}
            showColorOptions={false}
            onColorChange={onColorChange}
            selectedColor={selectedColor}
          />
        </div>
      )}

      <div
        id="resume-preview-container"
        ref={previewRef}
        className="text-[12px] max-w-[calc(100%-20px)] md:w-[80%] mx-auto min-h-[90vh] mb-8 bg-white shadow-md rounded-md overflow-hidden flex justify-center items-start relative"
      >
        {preview ? (
          <div className="resume-preview-content w-full h-full" dangerouslySetInnerHTML={{ __html: preview }} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[600px] text-gray-400 text-center px-8">
            <div className="w-24 h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-sm font-medium text-gray-500">Loading your resume template…</p>
            <p className="text-xs text-gray-400 mt-1">Fill in your details on the left to see them appear here</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewSection;
