import type { Template } from '@/types/template.types';

let mockTemplates: Template[] = [
  { id: 1, name: 'Authority', default_layout: 'chicago', is_active: true, tags: ['bold', 'modern'], image_url: '/assets/images/templates/template-chicago-authority.jpg' },
  { id: 2, name: 'Half Tone', default_layout: 'copenhagen', is_active: true, tags: ['traditional', 'modern'], image_url: '/assets/images/templates/template-copenhagen-halftone.jpg' },
  { id: 3, name: 'Executive', default_layout: 'boston', is_active: true, tags: ['professional', 'multi-column'], image_url: '/assets/images/templates/template-boston-executive.jpg' },
  { id: 4, name: 'Classic', default_layout: 'dublin', is_active: true, tags: ['classic'], image_url: '/assets/images/templates/template-dublin-classic.jpg' },
  { id: 5, name: 'Traditional', default_layout: 'stockholm', is_active: true, tags: ['traditional', 'simple'], image_url: '/assets/images/templates/template-stockholm-traditional.jpg' },
  { id: 6, name: 'Prime ATS', default_layout: 'new-york', is_active: true, tags: ['ats', 'professional'], image_url: 'https://resume.io/cdn-cgi/image/width=544,height=480,dpr=1.24,fit=crop,gravity=top,quality=75,format=auto/assets/templates/new_york-afac6df9.jpg' },
  { id: 7, name: 'Professional', default_layout: 'seoul', is_active: true, tags: ['professional', 'clean'], image_url: '/assets/images/templates/template-seoul-professional.jpg' },
  { id: 8, name: 'Crisp', default_layout: 'madrid', is_active: true, tags: ['creative', 'fresh'], image_url: '/assets/images/templates/template-stockholm-traditional.jpg' },
];

const nextId = () => (mockTemplates.length ? Math.max(...mockTemplates.map(t => t.id)) + 1 : 1);

/** Pull the plain fields we care about out of the FormData the admin form builds. */
const parseFormData = (formData: FormData) => {
  const name = String(formData.get('name') ?? '');
  const default_layout = String(formData.get('default_layout') ?? '');
  const is_active = formData.get('is_active') === '1';
  let tags: string[] = [];
  try { tags = JSON.parse(String(formData.get('tags') ?? '[]')); } catch { /* ignore */ }

  const imageFile = formData.get('image');
  const image_url = imageFile instanceof File ? URL.createObjectURL(imageFile) : undefined;

  return { name, default_layout, is_active, tags, image_url };
};

const templateService = {
  async getPublicTemplates(): Promise<Template[]> {
    await new Promise(r => setTimeout(r, 500));
    return mockTemplates;
  },
  async getAdminTemplates(): Promise<Template[]> {
    await new Promise(r => setTimeout(r, 500));
    return mockTemplates;
  },
  async getTemplateById(id: number | string): Promise<Template> {
    await new Promise(r => setTimeout(r, 300));
    return mockTemplates.find(t => t.id === Number(id)) ?? mockTemplates[0];
  },
  /** Admin — create template (stored in-memory; resets on page reload) */
  async createTemplate(formData: FormData): Promise<{ message: string; data: Template }> {
    await new Promise(r => setTimeout(r, 500));
    const parsed = parseFormData(formData);
    const newTemplate: Template = {
      id: nextId(),
      created_at: new Date().toISOString(),
      ...parsed,
      image_url: parsed.image_url ?? '/assets/images/templates/template-stockholm-traditional.jpg',
    };
    mockTemplates = [newTemplate, ...mockTemplates];
    return { message: 'Template created successfully.', data: newTemplate };
  },
  /** Admin — update template */
  async updateTemplate(id: number | string, formData: FormData): Promise<{ message: string; data: Template }> {
    await new Promise(r => setTimeout(r, 500));
    const idx = mockTemplates.findIndex(t => t.id === Number(id));
    const parsed = parseFormData(formData);
    const base = idx !== -1 ? mockTemplates[idx] : { id: Number(id) } as Template;
    const updated: Template = {
      ...base,
      ...parsed,
      image_url: parsed.image_url ?? base.image_url,
      id: base.id,
    };
    if (idx !== -1) mockTemplates[idx] = updated;
    return { message: 'Template updated successfully.', data: updated };
  },
  async deleteTemplate(id: number | string): Promise<{ message: string }> {
    await new Promise(r => setTimeout(r, 500));
    mockTemplates = mockTemplates.filter(t => t.id !== Number(id));
    return { message: 'Template deleted successfully.' };
  },
};

export default templateService;
