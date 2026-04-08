// Shared types for Resume Templates & Cover Letter Templates pages
// Used by: TemplateGrid, TemplateCard, ExamplesCarousel, CategorySection

export interface TemplateData {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    formats: ('PDF' | 'DOCX')[];
    colors?: string[];
}

export interface CategorySectionData {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    templates: TemplateData[];
}

export interface ExampleItem {
    id: string;
    title: string;
    reviews: number;
    rating: number;
    imageUrl: string;
}
