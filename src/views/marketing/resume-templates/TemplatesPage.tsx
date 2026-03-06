import React, { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import type { RootState } from '@/store/rootReducer'
import { fetchPublicTemplates as fetchTemplates } from '@/store/actions/templateActions';
import type { Template } from '@/types/template.types';
import type { TemplateData, CategorySectionData } from '@/types/page-templates.types';

import { TEMPLATES_FAQS, TEMPLATES_INFO_SECTIONS_PROPS, CATEGORY_SECTIONS, EXAMPLES_CAROUSEL, ALL_TEMPLATES } from './data/templates.data';
import '@/styles/client/templates.css';

import PageHeroSection      from '@/components/shared/features/HeroSection';
import TemplateFiltersBar   from '@/components/shared/features/TemplateFiltersBar';
import TemplateGrid         from '@/components/shared/features/TemplateGrid';
import TemplateCategoriesNav from './components/TemplateCategoriesNav';
import CategorySection      from '@/components/shared/features/CategorySection';
import ExamplesCarousel     from '@/components/shared/features/ExamplesCarousel';
import PromoBanner          from '@/components/shared/features/PromoBanner';
import InfoSections         from '@/components/shared/InfoSections';
import FAQSection           from '@/components/shared/FAQSection';

// Map category section id → tag keywords to match against template tags/name
const CATEGORY_TAG_MAP: Record<string, string[]> = {
  'cat-simple':     ['simple', 'basic', 'clean', 'minimal'],
  'cat-two-column': ['two-column', 'two column', 'multi-column', 'split'],
  'cat-google-docs':['google', 'docs', 'classic', 'traditional'],
};

const TemplatesPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { templates: rawTemplates, loading, error } = useAppSelector(
    (state: RootState) => state.templateReducer
  ) as { templates: Template[]; loading: boolean; error: string | null };

  const load = useCallback(() => {
    dispatch(fetchTemplates());
  }, [dispatch]);

  useEffect(() => { load(); }, [load]);

  // Normalize backend Template → TemplateData
  const templates: TemplateData[] = (rawTemplates ?? []).map((t) => ({
    id         : String(t.id),
    name       : t.name,
    description: (t.tags ?? []).join(' · ') || t.default_layout?.replace('-', ' ') || '',
    imageUrl   : t.image_url || t.image_path || '',
    formats    : ['PDF', 'DOCX'] as ('PDF' | 'DOCX')[],
    colors     : [],
  }));

  // Build category sections: use live API templates if available, fall back to static ALL_TEMPLATES
  const liveOrStatic = templates.length > 0 ? templates : ALL_TEMPLATES;

  const categorySectionsWithLiveData: CategorySectionData[] = CATEGORY_SECTIONS.map((cat) => {
    const keywords = CATEGORY_TAG_MAP[cat.id] ?? [];
    // Try to match templates by keywords in name/description
    const matched = liveOrStatic.filter((t) => {
      const haystack = `${t.name} ${t.description}`.toLowerCase();
      return keywords.some((kw) => haystack.includes(kw));
    });
    // If no match, just show first 4 live templates (fallback)
    return {
      ...cat,
      templates: matched.length >= 3 ? matched.slice(0, 4) : liveOrStatic.slice(0, 4),
    };
  });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <PageHeroSection
        breadcrumbLabel="Resume Templates"
        title="Resume templates"
        subtitle="Each resume template is designed to follow the exact rules you need to get hired faster. Use our resume templates and get free access to 18 more career tools!"
        primaryBtnText="Create my resume"
        secondaryBtnText="Upload my resume"
      />
      <TemplateFiltersBar />

      <main className="w-full">
        <TemplateGrid
          templates={templates}
          loading={loading}
          error={error}
          onRetry={load}
        />
        <TemplateCategoriesNav />

        {categorySectionsWithLiveData.map((category) => (
          <CategorySection key={category.id} data={category} loading={loading} />
        ))}

        <InfoSections {...TEMPLATES_INFO_SECTIONS_PROPS} />
        <FAQSection faqs={TEMPLATES_FAQS} />
        <ExamplesCarousel examples={EXAMPLES_CAROUSEL} />
        <PromoBanner />
      </main>
    </div>
  );
};

export default TemplatesPage;
