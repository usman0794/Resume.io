export const TEMPLATES = [
  { id: 'template1', label: 'Executive Split', thumbnail: '/templates/template1-thumb.png', defaultLayout: 'two-column', description: 'Two-column with spaced uppercase headings' },
  { id: 'template2', label: 'Navy Timeline', thumbnail: '/templates/template2-thumb.png', defaultLayout: 'two-column', description: 'Dark navy header, sidebar, timeline dots' },
  { id: 'template3', label: 'Clean Centered', thumbnail: '/templates/template3-thumb.png', defaultLayout: 'one-column', description: 'Centered header, gray section banners, 3-col skills' },
  { id: 'template4', label: 'Dark Sidebar', thumbnail: '/templates/template4-thumb.png', defaultLayout: 'two-column', description: 'Dark navy sidebar, timeline experience, elegant serif' },
] as const;

export const DEFAULT_TEMPLATE_ID = 'template1';

export const FONT_OPTIONS = [
  { value: null, label: 'Template default' },
  { value: 'Calibri', label: 'Calibri' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Garamond', label: 'Garamond' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Times New Roman', label: 'Times New Roman' },
] as const;

export const FONT_SIZE_OPTIONS = [
  { value: null, label: 'Default' },
  { value: 9, label: '9 pt' },
  { value: 10, label: '10 pt' },
  { value: 11, label: '11 pt' },
  { value: 12, label: '12 pt' },
] as const;

export const CATEGORY_META = {
  SUMMARY:    { icon: '◈', label: 'Summary',    color: '#1565C0' },
  EXPERIENCE: { icon: '◉', label: 'Experience', color: '#2E7D32' },
  SKILLS:     { icon: '◆', label: 'Skills',     color: '#6A1B9A' },
  PROJECTS:   { icon: '◎', label: 'Projects',   color: '#E65100' },
  EDUCATION:  { icon: '◐', label: 'Education',  color: '#00695C' },
  KEYWORDS:   { icon: '◇', label: 'Keywords',   color: '#AD1457' },
  REMOVE:     { icon: '✕',  label: 'Remove',    color: '#C62828' },
  REORDER:    { icon: '⇅',  label: 'Reorder',   color: '#4527A0' },
} as const;

export const STEP = {
  LANDING:       'landing',
  INPUT:         'input',
  MANUAL_FORM:   'manual_form',
  TEMPLATE_PICK: 'template_pick',
  MANUAL_Q:      'manual_q',
  PLANNING:      'planning',
  REVIEW:        'review',
  BUILDING:      'building',
  DONE:          'done',
} as const;

export type StepKey = typeof STEP[keyof typeof STEP];

export const PLAN_LOGS = [
  { delay: 0,    icon: '◈', text: 'Receiving resume and job description…' },
  { delay: 1200, icon: '◉', text: 'Extracting text from PDF…' },
  { delay: 2600, icon: '◆', text: 'Parsing resume structure and sections…' },
  { delay: 4000, icon: '◎', text: 'Analyzing job description requirements…' },
  { delay: 5500, icon: '◐', text: 'Identifying skill gaps and keyword mismatches…' },
  { delay: 7000, icon: '◈', text: 'Scoring relevance of each resume section…' },
  { delay: 8800, icon: '◇', text: 'Generating tailoring task plan…' },
] as const;

export const BUILD_LOGS = [
  { delay: 0,    icon: '◈', text: 'Preparing approved task list…' },
  { delay: 1000, icon: '◉', text: 'Applying edits to resume content…' },
  { delay: 2500, icon: '◆', text: 'Rewriting sections per approved changes…' },
  { delay: 4000, icon: '◎', text: 'Optimizing ATS keywords…' },
  { delay: 5500, icon: '◐', text: 'Formatting document structure…' },
  { delay: 6800, icon: '◈', text: 'Converting to PDF…' },
] as const;
