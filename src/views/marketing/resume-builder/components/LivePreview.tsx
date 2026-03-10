import React from 'react';
import { renderTemplate } from '@/utils/templateRenderer';

interface ManualData {
    name?: string;
    summary?: string;
    education?: unknown[];
    experience?: unknown[];
    projects?: unknown[];
    [key: string]: unknown;
}

interface LivePreviewProps {
    manualData: ManualData | null;
    selectedTemplateId?: string;
}

const LivePreview = ({ manualData, selectedTemplateId }: LivePreviewProps) => {
    if (!manualData) return null;

    const templateId = selectedTemplateId ?? 'template1';
    const html = renderTemplate(templateId, manualData as unknown as Parameters<typeof renderTemplate>[1]);

    const hasContent = !!(
        manualData.name ||
        manualData.summary ||
        (manualData.education as unknown[] | undefined)?.length ||
        (manualData.experience as unknown[] | undefined)?.length ||
        (manualData.projects as unknown[] | undefined)?.length
    );

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-blue-700 text-white text-xs flex-shrink-0">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-400 opacity-80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-300 opacity-60 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-200 opacity-40 inline-block" />
                    <span className="ml-2 font-medium">Live Preview</span>
                </div>
                <span className="text-blue-200 text-[11px]">Updates as you answer</span>
            </div>

            {hasContent ? (
                <div className="flex-1 overflow-auto bg-gray-100 flex justify-center items-start p-4">
                    <div
                        className="bg-white shadow-lg"
                        style={{ width: '210mm', minHeight: '100%', flexShrink: 0 }}
                    >
                        <div
                            style={{ width: '210mm', minHeight: '297mm', background: '#fff' }}
                            dangerouslySetInnerHTML={{ __html: html }}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
                    <svg width="48" height="56" viewBox="0 0 48 56" fill="none" className="mb-4">
                        <rect x="1" y="1" width="46" height="54" rx="3" stroke="#d1d5db" strokeWidth="1.5" fill="#f9fafb" />
                        <line x1="10" y1="14" x2="38" y2="14" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="10" y1="20" x2="32" y2="20" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="10" y1="28" x2="38" y2="28" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="10" y1="34" x2="28" y2="34" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="10" y1="42" x2="38" y2="42" stroke="#e5e7eb" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500">Start answering questions</p>
                    <p className="text-xs text-gray-400 mt-1">Your resume will appear here as you fill in the sections</p>
                </div>
            )}
        </div>
    );
};

export default LivePreview;
