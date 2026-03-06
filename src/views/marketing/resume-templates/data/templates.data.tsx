import React from 'react';
import type { FAQData } from '@/components/shared/FAQSection';
import type {
  InfoSectionsProps,
} from '@/components/shared/InfoSections';
import type { CategorySectionData, ExampleItem, TemplateData } from '@/types/page-templates.types';

// ─── Static template images ───────────────────────────────────────────────────
const IMG_NEW_YORK = 'https://resume.io/cdn-cgi/image/width=544,height=480,dpr=1.24,fit=crop,gravity=top,quality=75,format=auto/assets/templates/new_york-afac6df9.jpg';
const IMG_STOCKHOLM = '/assets/images/templates/template-stockholm-traditional.jpg';
const IMG_LONDON = '/assets/images/templates/template-entry-level.jpg';
const IMG_CLASSIC = '/assets/images/templates/template-london-classic.jpg';
const IMG_DUBLIN = '/assets/images/templates/template-dublin-classic.jpg';
const IMG_HELSINKI = '/assets/images/templates/template-helsinki-professional.jpg';
const IMG_SANTIAGO = '/assets/images/templates/template-santiago-prime-ats.jpg';

// ─── ALL_TEMPLATES — static fallback grid ─────────────────────────────────────
export const ALL_TEMPLATES: TemplateData[] = [
  { id: 'london', name: 'London', description: 'Simple · Clean', imageUrl: IMG_LONDON, formats: ['PDF', 'DOCX'], colors: [] },
  { id: 'classic', name: 'Classic', description: 'Classic · Traditional', imageUrl: IMG_CLASSIC, formats: ['PDF', 'DOCX'], colors: [] },
  { id: 'dublin', name: 'Dublin', description: 'Traditional · Clean', imageUrl: IMG_DUBLIN, formats: ['PDF', 'DOCX'], colors: [] },
  { id: 'helsinki', name: 'Helsinki', description: 'Professional · Modern', imageUrl: IMG_HELSINKI, formats: ['PDF', 'DOCX'], colors: [] },
  { id: 'santiago', name: 'Santiago', description: 'Prime ATS · Minimal', imageUrl: IMG_SANTIAGO, formats: ['PDF', 'DOCX'], colors: [] },
  { id: 'new-york', name: 'New York', description: 'ATS · Clean', imageUrl: IMG_NEW_YORK, formats: ['PDF', 'DOCX'], colors: [] },
  { id: 'stockholm', name: 'Stockholm', description: 'Two Column · Modern', imageUrl: IMG_STOCKHOLM, formats: ['PDF', 'DOCX'], colors: [] },
];

// ─── CATEGORY_SECTIONS ────────────────────────────────────────────────────────
export const CATEGORY_SECTIONS: CategorySectionData[] = [
  {
    id: 'cat-simple',
    title: 'Simple resume templates',
    description: 'Clean, minimal designs that let your experience do the talking. ATS-friendly and easy to read.',
    buttonText: 'See all simple templates',
    templates: ALL_TEMPLATES.slice(0, 4),
  },
  {
    id: 'cat-two-column',
    title: 'Two-column resume templates',
    description: 'Make the most of your page with a smart two-column layout — more content, better hierarchy.',
    buttonText: 'See all two-column templates',
    templates: ALL_TEMPLATES.slice(0, 4),
  },
  {
    id: 'cat-google-docs',
    title: 'Google Docs resume templates',
    description: 'Download as .docx and open instantly in Google Docs — fully editable with no extra software.',
    buttonText: 'See all Google Docs templates',
    templates: ALL_TEMPLATES.slice(0, 4),
  },
];

// ─── EXAMPLES_CAROUSEL ────────────────────────────────────────────────────────
export const EXAMPLES_CAROUSEL: ExampleItem[] = [
  { id: 'ex-1', title: 'Software Engineer Resume', reviews: 4821, rating: 4.8, imageUrl: IMG_NEW_YORK },
  { id: 'ex-2', title: 'Marketing Manager Resume', reviews: 3102, rating: 4.7, imageUrl: IMG_STOCKHOLM },
  { id: 'ex-3', title: 'Teacher Resume', reviews: 2654, rating: 4.9, imageUrl: IMG_LONDON },
  { id: 'ex-4', title: 'Nurse Resume', reviews: 2198, rating: 4.8, imageUrl: IMG_CLASSIC },
  { id: 'ex-5', title: 'Project Manager Resume', reviews: 1987, rating: 4.7, imageUrl: IMG_DUBLIN },
  { id: 'ex-6', title: 'Graphic Designer Resume', reviews: 1745, rating: 4.6, imageUrl: IMG_HELSINKI },
  { id: 'ex-7', title: 'Accountant Resume', reviews: 1532, rating: 4.8, imageUrl: IMG_SANTIAGO },
  { id: 'ex-8', title: 'Customer Service Resume', reviews: 1301, rating: 4.7, imageUrl: IMG_NEW_YORK },
];

// ─── TEMPLATES_INFO_SECTIONS_PROPS ────────────────────────────────────────────
export const TEMPLATES_INFO_SECTIONS_PROPS: InfoSectionsProps = {
  mainHeading: 'What makes a great resume template?',
  mainDescription: (
    <>
      A great resume template strikes the right balance between design and readability. It must pass
      ATS scanners while looking polished to a human recruiter. Our templates are tested with real
      hiring managers and optimised for every major industry.
    </>
  ),
  bulletItems: [
    {
      label: 'ATS-friendly',
      text: 'Every template is built with clean, machine-readable markup so your resume passes automated filters.',
    },
    {
      label: 'Recruiter-approved',
      text: 'Layouts reviewed by 200+ HR professionals to ensure your information is easy to scan.',
    },
    {
      label: 'Customisable',
      text: 'Change colours, fonts, and sections in seconds — no design skills required.',
    },
    {
      label: 'Downloadable',
      text: 'Export as PDF or DOCX instantly. Compatible with Google Docs and Microsoft Word.',
    },
  ],
  categories: [
    {
      heading: 'Professional templates',
      description: 'Clean, structured layouts trusted by job seekers in finance, law, engineering, and corporate roles.',
      relatedExample: {
        tag: 'Resume Template',
        title: 'Helsinki — Professional',
        description: 'A polished two-column layout with strong typographic hierarchy.',
        imageUrl: IMG_HELSINKI,
        imageAlt: 'Helsinki professional resume template',
        href: '/resume-templates/helsinki',
      },
    },
    {
      heading: 'Creative templates',
      description: 'Stand out with visually distinct layouts perfect for designers, marketers, and creative professionals.',
      relatedExample: {
        tag: 'Resume Template',
        title: 'Stockholm — Creative',
        description: 'Bold sidebar and accent colours for a modern, creative impression.',
        imageUrl: IMG_STOCKHOLM,
        imageAlt: 'Stockholm creative resume template',
        href: '/resume-templates/stockholm',
      },
    },
    {
      heading: 'Simple & ATS templates',
      description: 'No-fuss, single-column designs engineered to pass every applicant tracking system.',
      relatedExample: {
        tag: 'Resume Template',
        title: 'New York — Prime ATS',
        description: 'Ultra-clean format that scores top marks in every major ATS.',
        imageUrl: IMG_NEW_YORK,
        imageAlt: 'New York Prime ATS resume template',
        href: '/resume-templates/new-york',
      },
    },
  ],
  closingHeading: 'Ready to land your next role?',
  closingDescription: 'Pick a template, fill in your details, and download your resume in minutes.',
  closingList: [
    <>Choose from 35+ professionally designed templates</>,
    <>AI-powered writing suggestions for every section</>,
    <>Download as PDF or DOCX — free forever</>,
  ],
};

// ─── TEMPLATES_FAQS ───────────────────────────────────────────────────────────
export const TEMPLATES_FAQS: FAQData[] = [
  {
    question: 'Are your resume templates free?',
    answer: 'Yes — all templates are free to create and edit. Downloading in PDF or DOCX requires a subscription, which you can try free for 14 days.',
  },
  {
    question: 'Which resume template is best for ATS?',
    answer: (
      <>
        Our <strong>New York</strong> and <strong>London</strong> templates are optimised for applicant
        tracking systems. They use clean, single-column layouts with standard section headings that any
        ATS can parse correctly.
      </>
    ),
  },
  {
    question: 'Can I use these templates in Google Docs?',
    answer: 'Absolutely. Download any template as a .docx file and upload it directly to Google Drive — it opens natively in Google Docs for further editing.',
  },
  {
    question: 'How do I choose the right template for my industry?',
    answer: 'Creative fields like design and marketing benefit from visually distinctive templates (Stockholm, Santiago). Conservative industries like finance, law, and engineering should stick to clean, minimal layouts (London, Dublin, Helsinki).',
  },
  {
    question: 'Can I change the colour and font of a template?',
    answer: 'Yes. Every template supports custom accent colours and multiple font pairings. You can switch them in real time inside the resume builder with no design skills required.',
  },
  {
    question: 'What file formats can I download?',
    answer: 'You can download your resume as a PDF (for email applications) or as a .docx file (for uploading to job boards or editing in Word / Google Docs).',
  },
  {
    question: 'Are the templates designed for two-page resumes?',
    answer: 'Yes. All templates scale seamlessly across one or two pages. The builder automatically paginates your content and maintains consistent formatting across both pages.',
  },
  {
    question: 'Do I need to install any software?',
    answer: 'No. The resume builder runs entirely in your browser. There is nothing to download or install — just sign up and start building.',
  },
];
