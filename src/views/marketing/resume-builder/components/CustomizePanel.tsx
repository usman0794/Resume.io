import React from 'react';
import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Template {
    id: string;
    name: string;
    description?: string;
    tags?: string[];
}

interface CustomizePanelProps {
    selectedTemplate: string;
    onTemplateChange: (id: string) => void;
    mainColor: string;
    onColorChange: (color: string) => void;
    fontFamily: string;
    onFontChange: (font: string) => void;
    fontSize: number;
    onFontSizeChange: (size: number) => void;
    layoutColumns: number;
    onLayoutChange: (cols: number) => void;
    spacing: string;
    onSpacingChange: (spacing: string) => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TEMPLATE_FILTERS = ['All', 'Modern', 'Classic', 'Two column', 'ATS'];

const LOCAL_TEMPLATES: Template[] = [
    { id: 'two-column', name: 'Modern Two-Column', description: 'Dark sidebar with skills & contact. Great for tech roles.', tags: ['Two column', 'Modern'] },
    { id: 'classic', name: 'Classic Europass', description: 'Clean single-column. ATS-friendly and professional.', tags: ['ATS', 'Classic'] },
];

const FONT_OPTIONS = [
    { value: 'default', label: 'Sans-serif', preview: 'Aa', style: undefined },
    { value: 'serif', label: 'Serif', preview: 'Aa', style: { fontFamily: 'Georgia, serif' } },
    { value: 'mono', label: 'Monospace', preview: 'Aa', style: { fontFamily: 'monospace' } },
    { value: 'modern', label: 'Nunito', preview: 'Aa', style: { fontFamily: 'Nunito, sans-serif' } },
];

const SIZE_OPTIONS = [
    { value: 'small', label: 'Small', px: 11 },
    { value: 'medium', label: 'Medium', px: 13 },
    { value: 'large', label: 'Large', px: 15 },
];

const SPACING_OPTIONS = ['Compact', 'Normal', 'Relaxed'];

const ACCENT_PRESETS = [
    '#1e4a8b', '#1a1a1a', '#2E7D32', '#6A1B9A',
    '#C62828', '#E65100', '#00695C', '#AD1457',
];

// ─── TemplateCard ─────────────────────────────────────────────────────────────

interface TemplateCardProps {
    template: Template;
    selected: boolean;
    accentColor: string;
    onClick: () => void;
}

const TemplateCard = ({ template, selected, accentColor, onClick }: TemplateCardProps) => {
    const isTwoCol = template.tags?.includes('Two column');
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${selected
                    ? 'border-indigo-500 shadow-lg ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                }`}
        >
            <div className="bg-white h-40 relative overflow-hidden">
                <div className="h-1.5 w-full" style={{ backgroundColor: accentColor }} />
                {isTwoCol ? (
                    <div className="flex h-full pt-2 px-2 gap-1.5 pb-2">
                        <div className="w-10 space-y-1" style={{ backgroundColor: `${accentColor}18` }}>
                            <div className="h-2 rounded mx-1 mt-1" style={{ backgroundColor: accentColor, opacity: 0.5 }} />
                            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-1 bg-gray-200 rounded mx-1" />)}
                        </div>
                        <div className="flex-1 space-y-1 pt-1">
                            <div className="h-1.5 bg-gray-400 rounded w-3/4" />
                            <div className="h-1 bg-gray-200 rounded w-1/2 mb-1" />
                            {Array.from({ length: 7 }).map((_, i) => <div key={i} className="h-1 bg-gray-100 rounded" />)}
                        </div>
                    </div>
                ) : (
                    <div className="px-3 pt-2 space-y-1">
                        <div className="h-2 rounded w-2/3" style={{ backgroundColor: accentColor, opacity: 0.7 }} />
                        <div className="h-1 bg-gray-300 rounded w-1/2" />
                        <div className="h-px bg-gray-200 my-1" />
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className={`h-1 rounded ${i % 3 === 0 ? 'w-1/3' : 'w-full'} bg-gray-200`} />
                        ))}
                    </div>
                )}
                {selected && (
                    <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center shadow">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="px-2 py-2 bg-gray-50 border-t border-gray-100">
                <p className="text-[11px] font-semibold text-gray-700 truncate">{template.name}</p>
                <p className="text-[10px] text-gray-400 mt-0.5 truncate">{template.description}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                    {template.tags?.map(tag => (
                        <span key={tag} className="text-[9px] font-bold text-white bg-indigo-500 px-1.5 py-0.5 rounded">{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ─── Sub-panels ───────────────────────────────────────────────────────────────

interface TemplateColorsPanelProps {
    selectedTemplate: string;
    onTemplateChange: (id: string) => void;
    mainColor: string;
    onColorChange: (color: string) => void;
}

const TemplateColorsPanel = ({ selectedTemplate, onTemplateChange, mainColor, onColorChange }: TemplateColorsPanelProps) => {
    const [activeFilter, setActiveFilter] = useState('All');
    const filtered = activeFilter === 'All'
        ? LOCAL_TEMPLATES
        : LOCAL_TEMPLATES.filter(t => t.tags?.some(tag => tag.toLowerCase() === activeFilter.toLowerCase()));

    return (
        <div className="space-y-5">
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Template</label>
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {TEMPLATE_FILTERS.map(f => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all ${activeFilter === f ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {filtered.map(tpl => (
                        <TemplateCard
                            key={tpl.id}
                            template={tpl}
                            selected={selectedTemplate === tpl.id}
                            accentColor={mainColor || '#1e4a8b'}
                            onClick={() => onTemplateChange(tpl.id)}
                        />
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Accent Color</label>
                <div className="flex flex-wrap gap-2 mb-2">
                    {ACCENT_PRESETS.map(c => (
                        <button
                            key={c}
                            onClick={() => onColorChange(c)}
                            className={`w-7 h-7 rounded-full border-2 transition-all ${mainColor === c ? 'border-indigo-500 scale-110' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
                <input
                    type="color"
                    value={mainColor || '#1e4a8b'}
                    onChange={e => onColorChange(e.target.value)}
                    className="w-full h-9 rounded-lg cursor-pointer border border-gray-200"
                />
            </div>
        </div>
    );
};

interface TextPanelProps {
    fontFamily: string;
    onFontChange: (f: string) => void;
    fontSize: number;
    onFontSizeChange: (n: number) => void;
}

const TextPanel = ({ fontFamily, onFontChange, fontSize, onFontSizeChange }: TextPanelProps) => (
    <div className="space-y-6">
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Font Family</label>
            <div className="space-y-2">
                {FONT_OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        onClick={() => onFontChange(opt.value)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${fontFamily === opt.value
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        <span className="text-sm font-medium" style={opt.style}>{opt.label}</span>
                        <span className="text-lg" style={opt.style}>{opt.preview}</span>
                    </button>
                ))}
            </div>
        </div>
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Font Size <span className="font-normal text-gray-400">({fontSize}px)</span>
            </label>
            <div className="flex gap-2 mb-3">
                {SIZE_OPTIONS.map(opt => (
                    <button
                        key={opt.value}
                        onClick={() => onFontSizeChange(opt.px)}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-medium transition-all ${fontSize === opt.px
                                ? 'border-indigo-500 bg-indigo-600 text-white'
                                : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
            <input
                type="range" min="1" max="20" value={fontSize}
                onChange={e => onFontSizeChange(Number(e.target.value))}
                className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                <span>1</span><span>20</span>
            </div>
        </div>
    </div>
);

interface LayoutPanelProps {
    layoutColumns: number;
    onLayoutChange: (n: number) => void;
    spacing: string;
    onSpacingChange: (s: string) => void;
}

const LayoutPanel = ({ layoutColumns, onLayoutChange, spacing, onSpacingChange }: LayoutPanelProps) => (
    <div className="space-y-6">
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Columns</label>
            <div className="grid grid-cols-2 gap-3">
                {[
                    { value: 1, label: 'Single column', note: 'ATS-friendly' },
                    { value: 2, label: 'Two columns', note: 'Visual impact' },
                ].map(opt => (
                    <button
                        key={opt.value}
                        onClick={() => onLayoutChange(opt.value)}
                        className={`flex flex-col items-center gap-2 py-5 rounded-xl border-2 transition-all ${layoutColumns === opt.value ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex gap-1">
                            {opt.value === 1 ? (
                                <div className="w-10 space-y-1">
                                    {Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-1.5 bg-gray-400 rounded" />)}
                                </div>
                            ) : (
                                <div className="flex gap-1">
                                    <div className="w-5 space-y-1">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-1.5 bg-gray-400 rounded" />)}</div>
                                    <div className="w-8 space-y-1">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-1.5 bg-gray-300 rounded" />)}</div>
                                </div>
                            )}
                        </div>
                        <span className={`text-xs font-semibold ${layoutColumns === opt.value ? 'text-indigo-700' : 'text-gray-600'}`}>{opt.label}</span>
                        <span className="text-[10px] text-gray-400">{opt.note}</span>
                    </button>
                ))}
            </div>
        </div>
        <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Spacing</label>
            <div className="flex gap-2">
                {SPACING_OPTIONS.map(opt => (
                    <button
                        key={opt}
                        onClick={() => onSpacingChange(opt.toLowerCase())}
                        className={`flex-1 py-2.5 rounded-lg border text-xs font-medium transition-all ${spacing === opt.toLowerCase()
                                ? 'border-indigo-500 bg-indigo-600 text-white'
                                : 'border-gray-200 text-gray-600 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────

const TABS = [
    { id: 'templates', label: 'Template & Colors' },
    { id: 'text', label: 'Text' },
    { id: 'layout', label: 'Layout' },
];

const CustomizePanel = (props: CustomizePanelProps) => {
    const [activeTab, setActiveTab] = useState('templates');
    const {
        selectedTemplate, onTemplateChange,
        mainColor, onColorChange,
        fontFamily, onFontChange,
        fontSize, onFontSizeChange,
        layoutColumns, onLayoutChange,
        spacing, onSpacingChange,
    } = props;

    return (
        <div className="flex flex-col flex-1 min-h-0">
            <div className="flex border-b border-gray-200">
                {TABS.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-3 text-xs font-medium transition-all border-b-2 ${activeTab === tab.id
                                ? 'border-indigo-600 text-indigo-700'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="flex-1 overflow-y-auto p-5">
                {activeTab === 'templates' && (
                    <TemplateColorsPanel
                        selectedTemplate={selectedTemplate}
                        onTemplateChange={onTemplateChange}
                        mainColor={mainColor}
                        onColorChange={onColorChange}
                    />
                )}
                {activeTab === 'text' && (
                    <TextPanel
                        fontFamily={fontFamily}
                        onFontChange={onFontChange}
                        fontSize={fontSize}
                        onFontSizeChange={onFontSizeChange}
                    />
                )}
                {activeTab === 'layout' && (
                    <LayoutPanel
                        layoutColumns={layoutColumns}
                        onLayoutChange={onLayoutChange}
                        spacing={spacing}
                        onSpacingChange={onSpacingChange}
                    />
                )}
            </div>
        </div>
    );
};

export default CustomizePanel;
