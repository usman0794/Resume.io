import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import type { RootState } from '@/store/rootReducer';
import { updateFormModal, setProfessionalSummary } from '@/store/reducers/resumeReducer';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ManualEditorProps {
  onScoreChange?: (score: number) => void;
}

// ─── Section config ───────────────────────────────────────────────────────────

import { RESUME_SECTIONS as SECTIONS } from '@/views/marketing/resume-builder/config/sections.config';

// ─── Field ────────────────────────────────────────────────────────────────────

const inputCls = 'w-full px-4 py-3 text-[15px] border-b-2 border-transparent bg-[#f3f5f9] focus:bg-[#eef2f5] focus:border-b-[#1a91f0] hover:bg-[#eef2f5] rounded-t-[4px] outline-none transition-colors placeholder-transparent';
const labelCls = 'block text-[13px] font-medium text-[#828ba2] mb-1.5 transition-colors group-focus-within:text-[#1a91f0]';

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}

const Field = ({ label, id, type = 'text', placeholder, value, onChange, rows = 4, hint }: FieldProps) => (
  <div className="group relative">
    <label htmlFor={id} className={labelCls}>{label}</label>
    <div className="relative overflow-hidden rounded-t-[4px] bg-[#f3f5f9] hover:bg-[#eef2f5] focus-within:bg-[#eef2f5]">
      {type === 'textarea' ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} className={`${inputCls} resize-none block w-full bg-transparent`} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={`${inputCls} block w-full bg-transparent`} />
      )}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/10 group-focus-within:bg-[#1a91f0] transition-colors" />
    </div>
    {hint && <p className="mt-1 text-xs text-[#828ba2]">{hint}</p>}
  </div>
);

// ─── Section forms ────────────────────────────────────────────────────────────

type FM = Record<string, unknown>;

const PersonalForm = ({ data, onChange }: { data: FM; onChange: (u: FM) => void }) => {
  const set = (field: string) => (val: string) => onChange({ ...data, [field]: val });
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-[1fr,150px] gap-6 items-start">
        <div className="space-y-6">
          <Field label="Wanted Job Title" id="jobTitle" value={(data.jobTitle as string) || ''} onChange={set('jobTitle')} placeholder="e.g. Software Engineer" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field label="First Name" id="firstName" value={(data.firstName as string) || ''} onChange={set('firstName')} />
            <Field label="Last Name" id="lastName" value={(data.lastName as string) || ''} onChange={set('lastName')} />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
           <div className="w-full aspect-square bg-[#f3f5f9] hover:bg-[#eef2f5] rounded cursor-pointer flex flex-col items-center justify-center text-[#828ba2] transition-colors border border-dashed border-[#d1d5db]">
             <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
             <span className="text-xs font-medium mt-2">Edit photo</span>
           </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Email" id="email" type="email" value={(data.email as string) || ''} onChange={set('email')} />
        <Field label="Phone" id="phone" type="tel" value={(data.phone as string) || ''} onChange={set('phone')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Country" id="country" value={(data.country as string) || ''} onChange={set('country')} />
        <Field label="City" id="city" value={(data.city as string) || ''} onChange={set('city')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Address" id="address" value={(data.address as string) || ''} onChange={set('address')} />
        <Field label="Postal Code" id="postalCode" value={(data.postalCode as string) || ''} onChange={set('postalCode')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Driving License" id="drivingLicense" value={(data.drivingLicense as string) || ''} onChange={set('drivingLicense')} />
        <Field label="Nationality" id="nationality" value={(data.nationality as string) || ''} onChange={set('nationality')} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Place Of Birth" id="placeOfBirth" value={(data.placeOfBirth as string) || ''} onChange={set('placeOfBirth')} />
        <Field label="Date Of Birth" id="dateOfBirth" value={(data.dateOfBirth as string) || ''} onChange={set('dateOfBirth')} />
      </div>
    </div>
  );
};

const SocialsForm = ({ data, onChange }: { data: FM; onChange: (u: FM) => void }) => {
  const set = (field: string) => (val: string) => onChange({ ...data, [field]: val });
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400 mb-3">Add your personal website and professional social profiles.</p>
      <Field label="Personal Website" id="website" type="url" value={(data.website as string) || ''} onChange={set('website')} placeholder="https://yoursite.com" />
      <Field label="LinkedIn URL" id="linkedin" type="url" value={(data.linkedin as string) || ''} onChange={set('linkedin')} placeholder="https://linkedin.com/in/yourname" />
      <Field label="GitHub URL" id="github" type="url" value={(data.github as string) || ''} onChange={set('github')} placeholder="https://github.com/yourname" />
      <Field label="Other (Twitter, Portfolio, etc.)" id="otherSocial" type="url" value={(data.otherSocial as string) || ''} onChange={set('otherSocial')} placeholder="https://..." />
    </div>
  );
};

interface ExpItem { id: number; jobTitle: string; employer: string; startDate: string; endDate: string; description: string; }
const INITIAL_EXPERIENCE: ExpItem[] = [{ id: 1, jobTitle: '', employer: '', startDate: '', endDate: '', description: '' }];

const ExperienceForm = ({ items, onChange }: { items: ExpItem[]; onChange: (v: ExpItem[]) => void }) => {
  const add = () => onChange([...items, { id: Date.now(), jobTitle: '', employer: '', startDate: '', endDate: '', description: '', isOpen: true } as ExpItem & { isOpen?: boolean }]);
  const upd = (id: number, f: string, v: string) => onChange(items.map(it => it.id === id ? { ...it, [f]: v } : it));
  const remove = (id: number) => onChange(items.filter(it => it.id !== id));
  const toggle = (id: number) => onChange(items.map(it => it.id === id ? { ...it, isOpen: !(it as any).isOpen } : it));
  return (
    <div className="space-y-4">
      <p className="text-[15px] text-[#828ba2] leading-relaxed mb-4">Show your relevant experience (last 10 years). Use bullet points to note your achievements, if possible - use numbers/facts (Achieved X, measured by Y, by doing Z).</p>
      {items.map((item: any) => (
        <div key={item.id} className="border border-[#eef2f5] rounded-[4px] bg-white group hover:border-[#1a91f0] transition-colors overflow-hidden">
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50" onClick={() => toggle(item.id)}>
            <div>
              <div className="text-[15px] font-bold text-[#1e2532] group-hover:text-[#1a91f0] transition-colors">{item.jobTitle ? `${item.jobTitle} at ${item.employer}` : '(Not specified)'}</div>
              <div className="text-[13px] text-[#828ba2] mt-0.5">{item.startDate && item.endDate ? `${item.startDate} - ${item.endDate}` : ''}</div>
            </div>
            <div className="flex items-center gap-2">
               <button onClick={(e) => { e.stopPropagation(); toggle(item.id); }} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
               </button>
            </div>
          </div>
          {item.isOpen && (
            <div className="p-4 border-t border-[#eef2f5] space-y-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Job Title" id={`jt-${item.id}`} value={item.jobTitle} onChange={v => upd(item.id, 'jobTitle', v)} />
                <Field label="Employer" id={`emp-${item.id}`} value={item.employer} onChange={v => upd(item.id, 'employer', v)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Start & End Date" id={`sed-${item.id}`} value={`${item.startDate} - ${item.endDate}`} onChange={v => {
                  const parts = v.split('-');
                  if (parts[0]) upd(item.id, 'startDate', parts[0].trim());
                  if (parts[1]) upd(item.id, 'endDate', parts[1].trim());
                }} />
                <Field label="City" id={`city-${item.id}`} value={""} onChange={() => {}} />
              </div>
              <Field label="Description" id={`desc-${item.id}`} type="textarea" rows={6} value={item.description} onChange={v => upd(item.id, 'description', v)} />
              <button onClick={() => remove(item.id)} className="text-[#828ba2] hover:text-red-500 text-[13px] font-bold">Delete</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={add} className="text-[#1a91f0] hover:text-[#157acb] font-bold text-[15px] flex items-center gap-1 mt-2">
        + Add employment
      </button>
    </div>
  );
};

interface EduItem { id: number; school: string; degree: string; field_of_study: string; start_date: string; end_date: string; grade: string; description: string; isOpen?: boolean; }
const INITIAL_EDUCATION: EduItem[] = [{ id: 1, school: '', degree: '', field_of_study: '', start_date: '', end_date: '', grade: '', description: '' }];

const EducationForm = ({ items, onChange }: { items: EduItem[]; onChange: (v: EduItem[]) => void }) => {
  const add = () => onChange([...items, { id: Date.now(), school: '', degree: '', field_of_study: '', start_date: '', end_date: '', grade: '', description: '', isOpen: true }]);
  const upd = (id: number, f: string, v: string) => onChange(items.map(it => it.id === id ? { ...it, [f]: v } : it));
  const remove = (id: number) => onChange(items.filter(it => it.id !== id));
  const toggle = (id: number) => onChange(items.map(it => it.id === id ? { ...it, isOpen: !it.isOpen } : it));
  return (
    <div className="space-y-4">
      <p className="text-[15px] text-[#828ba2] leading-relaxed mb-4">A varied education on your resume sums up the value that your learnings and background will bring to job.</p>
      {items.map((item) => (
        <div key={item.id} className="border border-[#eef2f5] rounded-[4px] bg-white group hover:border-[#1a91f0] transition-colors overflow-hidden">
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50/50" onClick={() => toggle(item.id)}>
            <div>
              <div className="text-[15px] font-bold text-[#1e2532] group-hover:text-[#1a91f0] transition-colors">{item.school || '(Not specified)'}</div>
              <div className="text-[13px] text-[#828ba2] mt-0.5">{item.degree && item.field_of_study ? `${item.degree} in ${item.field_of_study}` : ''}</div>
            </div>
            <div className="flex items-center gap-2">
               <button onClick={(e) => { e.stopPropagation(); toggle(item.id); }} className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-200 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
               </button>
            </div>
          </div>
          {item.isOpen && (
            <div className="p-4 border-t border-[#eef2f5] space-y-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="School" id={`sch-${item.id}`} value={item.school} onChange={v => upd(item.id, 'school', v)} />
                <Field label="Degree" id={`deg-${item.id}`} value={item.degree} onChange={v => upd(item.id, 'degree', v)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Start & End Date" id={`sed-${item.id}`} value={item.start_date} onChange={v => upd(item.id, 'start_date', v)} />
                <Field label="City" id={`cty-${item.id}`} value={item.grade} onChange={v => upd(item.id, 'grade', v)} />
              </div>
              <Field label="Description" id={`sdesc-${item.id}`} type="textarea" rows={6} value={item.description} onChange={v => upd(item.id, 'description', v)} />
              <button onClick={() => remove(item.id)} className="text-[#828ba2] hover:text-red-500 text-[13px] font-bold">Delete</button>
            </div>
          )}
        </div>
      ))}
      <button onClick={add} className="text-[#1a91f0] hover:text-[#157acb] font-bold text-[15px] flex items-center gap-1 mt-2">
        + Add education
      </button>
    </div>
  );
};

interface SkillItem { id: number; label: string; level: number; isOpen?: boolean; }
const SkillsForm = ({ skills, onChange }: { skills: SkillItem[]; onChange: (v: SkillItem[]) => void }) => {
  const [input, setInput] = useState('');
  const add = () => {
    const t = input.trim();
    if (!t || skills.find(s => s.label === t)) return;
    onChange([...skills, { id: Date.now(), label: t, level: 3 }]);
    setInput('');
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }} placeholder="e.g. React, Python, Figma…" className={inputCls} />
        <button onClick={add} className="px-4 py-2 bg-[#1a91f0] text-white rounded-lg text-sm font-medium hover:bg-[#157acb] transition-colors whitespace-nowrap">Add</button>
      </div>
      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map(s => (
            <span key={s.label} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#157acb] rounded-full text-xs font-medium">
              {s.label}
              <button onClick={() => onChange(skills.filter(x => x.label !== s.label))} className="hover:text-red-500 transition-colors">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

const SummaryForm = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="space-y-3">
    <p className="text-xs text-gray-400">Write a short professional summary — your 3-sentence pitch to a hiring manager.</p>
    <Field label="Professional Summary" id="summary" type="textarea" rows={6} value={value} onChange={onChange} placeholder="Results-driven professional with 5+ years of experience building scalable solutions…" />
  </div>
);

interface LangItem { id: number; language: string; level: number; isOpen?: boolean; }
const INITIAL_LANGUAGES: LangItem[] = [{ id: 1, language: '', level: 3 }];
const LANG_LEVELS: { label: string; value: number }[] = [
  { label: 'Basic', value: 1 },
  { label: 'Conversational', value: 2 },
  { label: 'Proficient', value: 3 },
  { label: 'Fluent', value: 4 },
  { label: 'Native', value: 5 },
];
const LanguagesForm = ({ items, onChange }: { items: LangItem[]; onChange: (v: LangItem[]) => void }) => null; // Skipped for brevity

interface ProjItem { id: number; title: string; role: string; description: string; link: string; startDate: string; endDate: string; }
const INITIAL_PROJECTS: ProjItem[] = [{ id: 1, title: '', role: '', description: '', link: '', startDate: '', endDate: '' }];
const ProjectsForm = ({ items, onChange }: { items: ProjItem[]; onChange: (v: ProjItem[]) => void }) => null; // Skipped for brevity


interface CertItem { id: number; name: string; issuer: string; date: string; }
const INITIAL_CERTIFICATIONS: CertItem[] = [{ id: 1, name: '', issuer: '', date: '' }];
const CertificationsForm = ({ items, onChange }: { items: CertItem[]; onChange: (v: CertItem[]) => void }) => null; // Skipped for simplicity in this forensic rebuild

// ─── Main ManualEditor ────────────────────────────────────────────────────────

const ManualEditor = ({ onScoreChange }: ManualEditorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const formModal = useSelector((s: RootState) => s.resumeReducer.formModal);
  const professionalSummary = useSelector((s: RootState) => s.resumeReducer.professionalSummary);

  const [activeSection, setActiveSection] = useState('personal');

  const fm = (formModal ?? {}) as unknown as Record<string, unknown>;

  const [experience, setExperience] = useState<ExpItem[]>((fm.workExperience as ExpItem[] | undefined)?.length ? (fm.workExperience as ExpItem[]) : INITIAL_EXPERIENCE);
  const [education, setEducation] = useState<EduItem[]>((fm.educations as EduItem[] | undefined)?.length ? (fm.educations as EduItem[]) : INITIAL_EDUCATION);
  const [languages, setLanguages] = useState<LangItem[]>((fm.languages as LangItem[] | undefined)?.length ? (fm.languages as LangItem[]) : INITIAL_LANGUAGES);
  const [projects, setProjects] = useState<ProjItem[]>((fm.projects as ProjItem[] | undefined)?.length ? (fm.projects as ProjItem[]) : INITIAL_PROJECTS);
  const [skills, setSkills] = useState<SkillItem[]>((fm.skills as SkillItem[] | undefined) ?? []);
  const [certifications, setCertifications] = useState<CertItem[]>((fm.certifications as CertItem[] | undefined)?.length ? (fm.certifications as CertItem[]) : INITIAL_CERTIFICATIONS);

  // Debounced Redux sync
  const debounce = <T,>(fn: (v: T) => void, ms = 400) => {
    let t: ReturnType<typeof setTimeout>;
    return (v: T) => { clearTimeout(t); t = setTimeout(() => fn(v), ms); };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncExp = useCallback(debounce<ExpItem[]>(v => dispatch(updateFormModal({ workExperience: v }))), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncEdu = useCallback(debounce<EduItem[]>(v => dispatch(updateFormModal({ educations: v }))), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncLang = useCallback(debounce<LangItem[]>(v => dispatch(updateFormModal({ languages: v }))), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncProj = useCallback(debounce<ProjItem[]>(v => dispatch(updateFormModal({ projects: v }))), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncSkl = useCallback(debounce<SkillItem[]>(v => dispatch(updateFormModal({ skills: v }))), []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const syncCert = useCallback(debounce<CertItem[]>(v => dispatch(updateFormModal({ certifications: v }))), []);

  const handleExp = (v: ExpItem[]) => { setExperience(v); syncExp(v); };
  const handleEdu = (v: EduItem[]) => { setEducation(v); syncEdu(v); };
  const handleLang = (v: LangItem[]) => { setLanguages(v); syncLang(v); };
  const handleProj = (v: ProjItem[]) => { setProjects(v); syncProj(v); };
  const handleSkl = (v: SkillItem[]) => { setSkills(v); syncSkl(v); };
  const handleCert = (v: CertItem[]) => { setCertifications(v); syncCert(v); };

  // Score computation
  useEffect(() => {
    const currentForm = (formModal ?? {}) as unknown as Record<string, unknown>;
    let score = 0;
    if (currentForm.firstName || currentForm.lastName) score += 10;
    if (currentForm.email) score += 5;
    if (currentForm.phone) score += 5;
    if (currentForm.jobTitle) score += 10;
    if (professionalSummary) score += 10;
    if ((currentForm.workExperience as ExpItem[] | undefined)?.some(w => w.jobTitle)) score += 20;
    if ((currentForm.educations as EduItem[] | undefined)?.some(e => e.school)) score += 15;
    if ((currentForm.skills as SkillItem[] | undefined)?.length) score += 10;
    if ((currentForm.languages as LangItem[] | undefined)?.some(l => l.language)) score += 5;
    if ((currentForm.projects as ProjItem[] | undefined)?.some(p => p.title)) score += 5;
    if ((currentForm.certifications as CertItem[] | undefined)?.some(c => c.name)) score += 5;
    onScoreChange?.(Math.min(score, 100));
  }, [formModal, professionalSummary, onScoreChange]);

  // Reset when formModal cleared
  useEffect(() => {
    if (!formModal || Object.keys(formModal).length === 0) {
      setActiveSection('personal');
      setExperience(INITIAL_EXPERIENCE);
      setEducation(INITIAL_EDUCATION);
      setLanguages(INITIAL_LANGUAGES);
      setProjects(INITIAL_PROJECTS);
      setSkills([]);
      setCertifications(INITIAL_CERTIFICATIONS);
    }
  }, [formModal]);

  const SKIP = ['workExperience', 'educations', 'skills', 'languages', 'projects', 'certifications'];

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalForm data={fm} onChange={updates => Object.entries(updates).forEach(([k, v]) => { if (!SKIP.includes(k)) dispatch(updateFormModal({ [k]: v })); })} />;
      case 'socials':
        return <SocialsForm data={fm} onChange={updates => Object.entries(updates).forEach(([k, v]) => dispatch(updateFormModal({ [k]: v })))} />;
      case 'experience': return <ExperienceForm items={experience} onChange={handleExp} />;
      case 'education': return <EducationForm items={education} onChange={handleEdu} />;
      case 'skills': return <SkillsForm skills={skills} onChange={handleSkl} />;
      case 'summary': return <SummaryForm value={professionalSummary || ''} onChange={v => dispatch(setProfessionalSummary(v))} />;
      case 'languages': return <LanguagesForm items={languages} onChange={handleLang} />;
      case 'projects': return <ProjectsForm items={projects} onChange={handleProj} />;
      case 'certifications': return <CertificationsForm items={certifications} onChange={handleCert} />;
      default: return null;
    }
  };

  const activeIdx = SECTIONS.findIndex(s => s.id === activeSection);
  const prevSection = SECTIONS[activeIdx - 1];
  const nextSection = SECTIONS[activeIdx + 1];

  const SectionBlock = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-12">
      <h2 className="text-[24px] font-bold text-[#1e2532] mb-4">{title}</h2>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white">
      <div className="flex flex-1 min-h-0 overflow-y-auto">
        <div className="w-full">
          <div className="px-10 py-10 max-w-[800px] mx-auto">
            
            <div className="mb-10 flex justify-center pb-8 border-b border-[#eef2f5]">
               <h1 className="text-center text-[30px] font-black text-[#1e2532]">Untitled</h1>
            </div>

            <SectionBlock title="Personal Details">
               <PersonalForm data={fm} onChange={updates => Object.entries(updates).forEach(([k, v]) => { if (!SKIP.includes(k)) dispatch(updateFormModal({ [k]: v })); })} />
            </SectionBlock>

            <SectionBlock title="Professional Summary">
               <SummaryForm value={professionalSummary || ''} onChange={v => dispatch(setProfessionalSummary(v))} />
            </SectionBlock>

            <SectionBlock title="Employment History">
               <ExperienceForm items={experience} onChange={handleExp} />
            </SectionBlock>

            <SectionBlock title="Education">
               <EducationForm items={education} onChange={handleEdu} />
            </SectionBlock>

            <SectionBlock title="Websites & Social Links">
               <SocialsForm data={fm} onChange={updates => Object.entries(updates).forEach(([k, v]) => dispatch(updateFormModal({ [k]: v })))} />
            </SectionBlock>

            <SectionBlock title="Skills">
               <SkillsForm skills={skills} onChange={handleSkl} />
            </SectionBlock>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualEditor;
