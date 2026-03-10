import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/rootReducer';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ManualPreviewProps {
  previewRef?: React.RefObject<HTMLDivElement>;
  selectedTemplate?: string;
  selectedColor?: string;
  fontFamily?: string;
  fontSize?: number;
  layoutColumns?: number;
  spacing?: string;
}

interface ResumeData {
  name: string; tagline: string; email: string; phone: string;
  address: string; website: string; linkedin: string; github: string; otherSocial: string;
  summary: string;
  experience: { role: string; company: string; startDate: string; endDate: string; bullets: string; }[];
  education:  { diploma: string; degree: string; school: string; startDate: string; endDate: string; grade: string; }[];
  projects:   { name: string; tech: string; description: string; link: string; }[];
  skills:     string[];
  languages:  { name: string; level: string; }[];
  certifications: { name: string; issuer: string; year: string; }[];
  hobbies: string;
}

// ─── Data builder ─────────────────────────────────────────────────────────────

function buildData(formModal: Record<string, unknown> | null, professionalSummary: string): ResumeData {
  const fm = formModal ?? {} as Record<string, unknown>;
  const sl = (fm.socialLinks ?? []) as { label: string; url: string; }[];
  return {
    name:       [fm.firstName, fm.lastName].filter(Boolean).join(' '),
    tagline:    (fm.jobTitle   as string) || '',
    email:      (fm.email      as string) || '',
    phone:      (fm.phone      as string) || '',
    address:    [(fm.city as string), (fm.country as string)].filter(Boolean).join(', '),
    website:    (fm.website    as string) || '',
    linkedin:   (fm.linkedin   as string) || sl.find(s => s.label?.toLowerCase().includes('linkedin'))?.url || '',
    github:     (fm.github     as string) || sl.find(s => s.label?.toLowerCase().includes('github'))?.url  || '',
    otherSocial:(fm.otherSocial as string) || '',
    summary:    professionalSummary || '',
    experience: ((fm.workExperience ?? []) as Record<string, string>[]).map(w => ({ role: w.jobTitle || '', company: w.employer || '', startDate: w.startDate || '', endDate: w.endDate || '', bullets: w.description || '' })),
    education:  ((fm.educations  ?? []) as Record<string, string>[]).map(e => ({ diploma: e.degree || '', degree: e.field_of_study || '', school: e.school || '', startDate: e.start_date || '', endDate: e.end_date || '', grade: e.grade || '' })),
    projects:   ((fm.projects    ?? []) as Record<string, string>[]).map(p => ({ name: p.title || '', tech: p.role || '', description: p.description || '', link: p.link || '' })),
    skills:     ((fm.skills      ?? []) as { label: string }[]).map(s => s.label).filter(Boolean),
    languages:  ((fm.languages   ?? []) as { language: string; level: string }[]).map(l => ({ name: l.language || '', level: l.level || '' })),
    certifications: ((fm.certifications ?? []) as Record<string, string>[]).map(c => ({ name: c.name || '', issuer: c.issuer || '', year: c.date || '' })),
    hobbies:    (fm.interests as string) || '',
  };
}

// ─── Template renderers ───────────────────────────────────────────────────────

function renderTwoColumnTemplate(data: ResumeData, color: string, fontFamily: string, fontSize: number, spacing: string): string {
  const accent = color || '#1a1a1a';
  const ff = fontFamily === 'serif' ? "'Georgia', serif" : fontFamily === 'mono' ? "'Courier New', monospace" : fontFamily === 'modern' ? "'Nunito', sans-serif" : "'Segoe UI', Arial, sans-serif";
  const base = Math.max(9, Math.min(20, fontSize));
  const lg = `${base + 1}px`, sm = `${Math.max(8, base - 1)}px`, xs = `${Math.max(7, base - 2)}px`, xxl = `${base + 10}px`, bf = `${base}px`;
  const gap = spacing === 'compact' ? '12px' : spacing === 'relaxed' ? '24px' : '18px';

  const expHTML = data.experience.filter(e => e.role || e.company).map(exp => `
    <div style="margin-bottom:${gap}">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
        <div><div style="font-weight:700;font-size:${lg};color:#111">${exp.role}</div><div style="font-size:${bf};color:${accent};font-weight:600">${exp.company}</div></div>
        ${(exp.startDate||exp.endDate)?`<span style="font-size:${xs};background:${accent};color:#fff;padding:2px 8px;border-radius:4px;white-space:nowrap">${[exp.startDate,exp.endDate].filter(Boolean).join(' – ')}</span>`:''}
      </div>
      ${exp.bullets?`<div style="margin-top:6px;font-size:${sm};color:#444;line-height:1.6">${exp.bullets.split('\n').map(b=>b.trim()).filter(Boolean).map(b=>`<div>• ${b}</div>`).join('')}</div>`:''}
    </div>`).join('');

  const projHTML = data.projects.filter(p => p.name).map(p => `
    <div style="margin-bottom:${gap}">
      <div style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px">
        <div style="font-weight:700;font-size:${bf};color:#111">${p.name}</div>
        ${p.link?`<a href="${p.link}" style="font-size:${xs};color:${accent}">${p.link.replace(/^https?:\/\//,'')}</a>`:''}
      </div>
      ${p.tech?`<div style="font-size:${sm};color:${accent};margin-bottom:3px">${p.tech}</div>`:''}
      ${p.description?`<div style="font-size:${sm};color:#555;line-height:1.6">• ${p.description}</div>`:''}
    </div>`).join('');

  const eduHTML = data.education.filter(e=>e.school||e.diploma).map(e=>`
    <div style="margin-bottom:12px">
      <div style="font-weight:700;font-size:${bf};color:#fff">${e.school}</div>
      <div style="font-size:${sm};color:rgba(255,255,255,.85)">${[e.diploma,e.degree].filter(Boolean).join(' in ')}</div>
      <div style="font-size:${xs};color:rgba(255,255,255,.65)">${[e.startDate,e.endDate].filter(Boolean).join(' – ')}${e.grade?` · GPA: ${e.grade}`:''}</div>
    </div>`).join('');

  const langHTML = data.languages.filter(l=>l.name).map(l=>`<div style="display:flex;justify-content:space-between;font-size:${sm};margin-bottom:6px"><span style="color:#fff;font-weight:600">${l.name}</span><span style="color:rgba(255,255,255,.7)">${l.level}</span></div>`).join('');
  const certHTML = data.certifications.filter(c=>c.name).map(c=>`<div style="margin-bottom:10px"><div style="font-weight:700;font-size:${sm};color:#fff">${c.name}</div><div style="font-size:${xs};color:rgba(255,255,255,.7)">${[c.issuer,c.year].filter(Boolean).join(' · ')}</div></div>`).join('');
  const contact  = [data.email&&`<div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:${sm}"><span>✉</span><span style="word-break:break-all">${data.email}</span></div>`,data.phone&&`<div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:${sm}"><span>📞</span><span>${data.phone}</span></div>`,data.address&&`<div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:${sm}"><span>📍</span><span>${data.address}</span></div>`,data.website&&`<div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:${sm}"><span>🌐</span><span style="word-break:break-all">${data.website}</span></div>`,data.linkedin&&`<div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:${sm}"><span>🔗</span><span style="word-break:break-all">${data.linkedin.replace(/^https?:\/\/(www\.)?/,'')}</span></div>`,data.github&&`<div style="margin-bottom:8px;display:flex;align-items:center;gap:8px;font-size:${sm}"><span>💻</span><span style="word-break:break-all">${data.github.replace(/^https?:\/\/(www\.)?/,'')}</span></div>`].filter(Boolean).join('');
  const st = (t: string) => `<div style="font-size:${xs};font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#111;border-bottom:2px solid ${accent};padding-bottom:4px;margin-bottom:12px">${t}</div>`;
  const ss = (t: string) => `<div style="font-size:${xs};font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#fff;border-bottom:1px solid rgba(255,255,255,.3);padding-bottom:4px;margin-bottom:10px;margin-top:20px">${t}</div>`;

  return `<div style="font-family:${ff};font-size:${bf};display:flex;min-height:1122px;color:#333">
    <div style="width:280px;min-width:280px;background:${accent};padding:30px 20px;box-sizing:border-box;color:#fff">
      <div style="margin-bottom:24px"><div style="font-size:${xxl};font-weight:800;color:#fff;line-height:1.2;margin-bottom:4px">${data.name||'Your Name'}</div>${data.tagline?`<div style="font-size:${bf};color:rgba(255,255,255,.8);font-weight:500;line-height:1.4">${data.tagline}</div>`:''}</div>
      ${contact?`${ss('Contact')}<div style="font-size:11px;color:rgba(255,255,255,.9)">${contact}</div>`:''}
      ${data.skills.length>0?`${ss('Skills')}<div>${data.skills.map(s=>`<div style="font-size:${sm};color:rgba(255,255,255,.9);margin-bottom:5px;display:flex;align-items:center;gap:6px"><span style="width:5px;height:5px;background:rgba(255,255,255,.6);border-radius:50%;display:inline-block;flex-shrink:0"></span>${s}</div>`).join('')}</div>`:''}
      ${eduHTML?`${ss('Education')}${eduHTML}`:''}
      ${langHTML?`${ss('Languages')}${langHTML}`:''}
      ${certHTML?`${ss('Certifications')}${certHTML}`:''}
    </div>
    <div style="flex:1;padding:30px 28px;box-sizing:border-box">
      ${data.summary?`<div style="margin-bottom:${gap}">${st('Profile')}<p style="font-size:${bf};color:#444;line-height:1.7;text-align:justify">${data.summary}</p></div>`:''}
      ${expHTML?`<div style="margin-bottom:${gap}">${st('Experience')}${expHTML}</div>`:''}
      ${projHTML?`<div style="margin-bottom:${gap}">${st('Projects')}${projHTML}</div>`:''}
    </div>
  </div>`;
}

function renderClassicTemplate(data: ResumeData, color: string, fontFamily: string, fontSize: number, spacing: string): string {
  const accent = color || '#1e4a8b';
  const ff = fontFamily === 'serif' ? "'Georgia', serif" : fontFamily === 'mono' ? "'Courier New', monospace" : fontFamily === 'modern' ? "'Nunito', sans-serif" : "'Segoe UI', Arial, sans-serif";
  const base = Math.max(9, Math.min(20, fontSize));
  const lg = `${base+1}px`, sm = `${Math.max(8,base-1)}px`, xs = `${Math.max(7,base-2)}px`, xxl = `${base+16}px`, bf = `${base}px`;
  const gap = spacing === 'compact' ? '16px' : spacing === 'relaxed' ? '32px' : '24px';
  const st = (icon: string, t: string) => `<div style="display:flex;align-items:center;gap:10px;background:${accent};color:#fff;padding:8px 14px;border-radius:3px;margin-bottom:14px;font-size:${sm};font-weight:700;text-transform:uppercase;letter-spacing:1px"><span>${icon}</span><span>${t}</span></div>`;

  const expHTML = data.experience.filter(e=>e.role||e.company).map(exp=>`<div style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px"><div><span style="font-weight:700;color:${accent};font-size:${lg}">${exp.role}</span>${exp.company?`<span style="color:#555;font-size:${bf}"> · ${exp.company}</span>`:''}</div><span style="font-size:${xs};color:#999;white-space:nowrap">${[exp.startDate,exp.endDate].filter(Boolean).join(' – ')}</span></div>${exp.bullets?`<ul style="margin:4px 0 0 18px;padding:0">${exp.bullets.split('\n').filter(b=>b.trim()).map(b=>`<li style="font-size:${sm};color:#555;margin-bottom:3px;line-height:1.5">${b.trim()}</li>`).join('')}</ul>`:''}</div>`).join('');
  const eduHTML = data.education.filter(e=>e.school||e.diploma).map(e=>`<div style="margin-bottom:14px"><div style="font-weight:700;color:${accent};font-size:${lg}">${[e.diploma,e.degree].filter(Boolean).join(' in ')}</div><div style="font-size:${sm};color:#555">${e.school}${e.grade?` · GPA: ${e.grade}`:''}</div><div style="font-size:${xs};color:#999">${[e.startDate,e.endDate].filter(Boolean).join(' – ')}</div></div>`).join('');
  const projHTML = data.projects.filter(p=>p.name).map(p=>`<div style="margin-bottom:14px"><div style="display:flex;justify-content:space-between;align-items:baseline"><span style="font-weight:700;color:${accent};font-size:${lg}">${p.name}</span>${p.link?`<a href="${p.link}" style="font-size:${xs};color:${accent}">${p.link.replace(/^https?:\/\//,'')}</a>`:''}</div>${p.tech?`<div style="font-size:${sm};color:#666;margin-bottom:2px">${p.tech}</div>`:''} ${p.description?`<div style="font-size:${sm};color:#555;line-height:1.5">${p.description}</div>`:''}</div>`).join('');
  const sklHTML = data.skills.length>0?`<div style="font-size:${bf};color:#555;line-height:1.8">${data.skills.join(' · ')}</div>`:'';
  const langHTML = data.languages.filter(l=>l.name).map(l=>`<div style="display:flex;justify-content:space-between;font-size:${sm};margin-bottom:5px"><span style="font-weight:600">${l.name}</span><span style="color:#777">${l.level}</span></div>`).join('');
  const certHTML = data.certifications.filter(c=>c.name).map(c=>`<div style="margin-bottom:10px"><div style="font-weight:700;font-size:${sm};color:${accent}">${c.name}</div><div style="font-size:${xs};color:#666">${[c.issuer,c.year].filter(Boolean).join(' · ')}</div></div>`).join('');
  const contact = [data.phone&&`<div style="display:flex;align-items:center;gap:6px;font-size:${sm}"><span style="color:${accent};font-weight:bold">📞</span>${data.phone}</div>`,data.email&&`<div style="display:flex;align-items:center;gap:6px;font-size:${sm}"><span style="color:${accent}">✉</span>${data.email}</div>`,data.address&&`<div style="display:flex;align-items:center;gap:6px;font-size:${sm}"><span style="color:${accent}">📍</span>${data.address}</div>`,data.website&&`<div style="display:flex;align-items:center;gap:6px;font-size:${sm}"><span style="color:${accent}">🌐</span>${data.website}</div>`,data.linkedin&&`<div style="display:flex;align-items:center;gap:6px;font-size:${sm}"><span style="color:${accent}">🔗</span>${data.linkedin.replace(/^https?:\/\/(www\.)?/,'')}</div>`,data.github&&`<div style="display:flex;align-items:center;gap:6px;font-size:${sm}"><span style="color:${accent}">💻</span>${data.github.replace(/^https?:\/\/(www\.)?/,'')}</div>`].filter(Boolean).join('');

  return `<div style="font-family:${ff};font-size:${bf};padding:40px;box-sizing:border-box;color:#333;min-height:1122px">
    <div style="border-bottom:3px solid ${accent};padding-bottom:20px;margin-bottom:${gap}">
      <div style="font-size:${xxl};font-weight:700;color:${accent};margin-bottom:4px;letter-spacing:.5px">${data.name||'Your Name'}</div>
      ${data.tagline?`<div style="font-size:${bf};color:#666;font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px">${data.tagline}</div>`:''}
      <div style="display:flex;gap:20px;font-size:${sm};color:#555;flex-wrap:wrap">${contact}</div>
    </div>
    ${data.summary?`<div style="margin-bottom:${gap}">${st('⚙️','Professional Summary')}<p style="font-size:${bf};color:#555;line-height:1.7;text-align:justify;margin:0">${data.summary}</p></div>`:''}
    ${expHTML?`<div style="margin-bottom:${gap}">${st('💼','Professional Experience')}${expHTML}</div>`:''}
    ${projHTML?`<div style="margin-bottom:${gap}">${st('🚀','Projects')}${projHTML}</div>`:''}
    ${(eduHTML||langHTML||certHTML)?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:${gap}"><div>${eduHTML?`${st('🎓','Education')}${eduHTML}`:''}</div><div>${certHTML?`${st('🏅','Certifications')}${certHTML}`:''}${langHTML?`${st('🌐','Languages')}${langHTML}`:''}</div></div>`:''}
    ${sklHTML?`<div style="margin-bottom:${gap}">${st('🛠️','Skills')}${sklHTML}</div>`:''}
  </div>`;
}

const TEMPLATE_REGISTRY: Record<string, (d: ResumeData, c: string, f: string, s: number, sp: string) => string> = {
  'two-column': renderTwoColumnTemplate,
  'classic':    renderClassicTemplate,
};

// ─── ManualPreview ────────────────────────────────────────────────────────────

const ManualPreview = ({
  previewRef,
  selectedTemplate = 'classic',
  selectedColor    = '#1e4a8b',
  fontFamily       = 'default',
  fontSize         = 12,
  layoutColumns: _lc,
  spacing          = 'normal',
}: ManualPreviewProps) => {
  const formModal           = useSelector((s: RootState) => s.resumeReducer.formModal);
  const professionalSummary = useSelector((s: RootState) => s.resumeReducer.professionalSummary);

  const data    = buildData(formModal as unknown as Record<string, unknown> | null, professionalSummary);
  const hasData = !!(data.name || data.email || data.phone || data.summary || data.experience?.length || data.skills?.length || data.education?.length);

  const renderer = TEMPLATE_REGISTRY[selectedTemplate] ?? renderClassicTemplate;
  const html     = hasData ? renderer(data, selectedColor, fontFamily, fontSize, spacing) : null;
  const tplName  = selectedTemplate === 'two-column' ? 'Modern Two-Column' : 'Classic Europass';

  return (
    <div className="flex flex-col min-h-full bg-[#F0F2F5] overflow-y-auto">
      <div className="flex flex-col items-center py-6 px-4">
        <div className="flex-1 flex items-start justify-center w-full">
          <div
            id="resume-preview-container"
            ref={previewRef}
            className="bg-white shadow-2xl origin-top transition-all duration-300"
            style={{ width: '794px', minHeight: '1122px', transform: 'scale(0.58)', transformOrigin: 'top center', marginBottom: 'calc((1122px * 0.58 - 1122px) + 16px)' }}
          >
            {html ? (
              <div className="w-full" data-resume="true" dangerouslySetInnerHTML={{ __html: html }} />
            ) : (
              <div className="flex flex-col items-center justify-center h-[1122px] text-center px-8">
                <div className="w-20 h-28 bg-gray-100 rounded-lg mb-5 flex items-center justify-center">
                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-500 mb-1">Start filling in your details</p>
                <p className="text-xs text-gray-400">Your resume preview will appear here live as you type</p>
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-4 mt-4 px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full flex items-center gap-2 shadow-lg z-10">
          <span>A4 · {tplName}</span>
        </div>
      </div>
    </div>
  );
};

export default ManualPreview;

