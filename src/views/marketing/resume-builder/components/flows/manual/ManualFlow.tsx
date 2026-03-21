import React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store';
import type { RootState } from '@/store/rootReducer';
import { getHomePage } from '@/store/actions/resumeActions';
import { saveSession, loadSession, clearSession } from '@/utils/resumeSession';
import ManualEditor from './ManualEditor';
import ManualPreview from './ManualPreview';
import CustomizePanel from '../../CustomizePanel';

interface ManualFlowProps {
    onBack: () => void;
    isLoggedIn: boolean;
    authToken: string | null;
}

// ─── TopBar ───────────────────────────────────────────────────────────────────

interface TopBarProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
    onDownload: () => void;
    isLoading: boolean;
    onBack: () => void;
    mainColor: string;
    onColorChange: (c: string) => void;
    onDashboard: () => void;
    isLoggedIn: boolean;
}

const MAIN_COLORS = ['#1e4a8b', '#5B4FCF', '#1565C0', '#2E7D32', '#C62828', '#000000', '#6D4C41', '#00695C'];

const TopBar = ({ activeTab, onTabChange, onDownload, isLoading, mainColor, onColorChange, onDashboard, isLoggedIn }: TopBarProps) => (
    <div className="h-[60px] bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-40">
        
        {/* Left Space (Empty for centering) */}
        <div className="flex-1 flex items-center">
            {/* Can put dashboard button here if logged in, but real site has no back button */}
        </div>

        {/* Center: Segment Control */}
        <div className="flex flex-1 justify-center">
            <div className="flex bg-[#eef2f5] rounded-full p-1 border border-black/5">
                {['Edit', 'Customize'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab.toLowerCase())}
                        className={`px-8 py-1.5 text-[15px] font-bold rounded-full transition-all ${activeTab === tab.toLowerCase()
                            ? 'bg-white shadow-sm text-[#1e2532]'
                            : 'text-[#828ba2] hover:text-[#1e2532]'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex items-center justify-end gap-3">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            </button>
            {isLoggedIn && (
                <button
                    onClick={onDownload}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-5 py-2 bg-[#1a91f0] hover:bg-[#157acb] text-white rounded font-bold text-[15px] transition-colors disabled:opacity-50"
                >
                    {isLoading ? <span className="inline-block animate-spin">⟳</span> : 'Download PDF'}
                </button>
            )}
        </div>
    </div>
);

// ─── ResumeScore ──────────────────────────────────────────────────────────────

const ResumeScore = ({ score = 10 }: { score: number }) => (
    <div className="px-5 py-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded">{score}%</span>
                <span className="text-xs text-gray-500">Your resume score</span>
            </div>
        </div>
        <div className="h-1 bg-[#ff5252]/20 rounded-full overflow-hidden w-[200px]">
            <div
                className="h-full bg-[#ff5252] rounded-full transition-all duration-700"
                style={{ width: `${score}%` }}
            />
        </div>
    </div>
);

// ─── BottomActionBar ────────────────────────────────────────────────────────
const BottomActionBar = ({ onBack, onNext }: { onBack: () => void; onNext: () => void }) => (
    <div className="bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-between sticky bottom-0 z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <button onClick={onBack} className="text-[#828ba2] hover:text-[#1e2532] font-bold text-[15px] px-2 py-2 transition-colors">
            Back
        </button>
        <div className="flex items-center gap-2">
            {[...Array(7)].map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#1a91f0]' : 'bg-[#eef2f5]'}`} />
            ))}
        </div>
        <button onClick={onNext} className="bg-[#1a91f0] hover:bg-[#157acb] text-white font-bold text-[15px] px-8 py-3 rounded transition-colors shadow-sm">
            Next: Professional Experience
        </button>
    </div>
);



// ─── LoginGateModal ───────────────────────────────────────────────────────────

const LoginGateModal = ({ onClose, onLogin }: { onClose: () => void; onLogin: () => void }) => (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] p-8 text-center">
            <div className="w-14 h-14 bg-[#f3f5f9] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#1a91f0]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.75">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Sign in to download</h2>
            <p className="text-sm text-gray-400 mb-6">Your resume is ready! Sign in to download and save it — your work won't be lost.</p>
            <button onClick={onLogin} className="w-full py-2.5 bg-[#1a91f0] hover:bg-[#157acb] text-white rounded-xl text-sm font-medium transition-colors mb-3">
                Sign in / Create account
            </button>
            <button onClick={onClose} className="text-sm text-gray-400 hover:text-gray-600 transition-colors">Maybe later</button>
        </div>
    </div>
);

// ─── ManualFlow ───────────────────────────────────────────────────────────────

const ManualFlow = ({ onBack, isLoggedIn, authToken }: ManualFlowProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const previewRef = useRef<HTMLDivElement | null>(null);

    const formModal = useSelector((s: RootState) => s.resumeReducer.formModal);
    const templates = useSelector((s: RootState) => s.resumeReducer.home?.templates ?? []);

    const [isLoading, setIsLoading] = useState(false);
    const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);
    const [showLoginGate, setShowLoginGate] = useState(false);
    const [activeTab, setActiveTab] = useState('edit');
    const [resumeScore, setResumeScore] = useState(10);

    const [selectedTemplate, setSelectedTemplate] = useState('classic');
    const [mainColor, setMainColor] = useState('#000000');
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [fontFamily, setFontFamily] = useState('default');
    const [fontSize, setFontSize] = useState(12);
    const [layoutColumns, setLayoutColumns] = useState(1);
    const [spacing, setSpacing] = useState('normal');

    const sessionRestoredRef = useRef(false);

    useEffect(() => {
        if (!templates?.length) dispatch(getHomePage());
    }, [dispatch, templates?.length]);

    useEffect(() => {
        if (!isLoggedIn || sessionRestoredRef.current) return;
        const saved = loadSession();
        if (!saved || saved.flow !== 'manual') return;
        sessionRestoredRef.current = true;
        clearSession();
        setActiveTab(String(saved.activeTab ?? 'edit') as 'edit' | 'preview');
        setSelectedTemplate(String(saved.selectedTemplate ?? 'classic'));
        setMainColor(String(saved.mainColor ?? '#000000'));
        setSelectedColor(String(saved.mainColor ?? '#000000'));
        setFontFamily(String(saved.fontFamily ?? 'default'));
        setFontSize(Number(saved.fontSize ?? 12));
        setLayoutColumns(Number(saved.layoutColumns ?? 1));
        setSpacing(String(saved.spacing ?? 'normal') as 'compact' | 'normal' | 'relaxed');
    }, [isLoggedIn]);

    const setColor = (c: string) => { setMainColor(c); setSelectedColor(c); };

    const saveAndGoToLogin = () => {
        saveSession({ flow: 'manual', activeTab, selectedTemplate, mainColor, fontFamily, fontSize, layoutColumns, spacing });
        setShowLoginGate(false);
        navigate('/login', { state: { from: window.location.pathname + window.location.search } });
    };

    const handleDownload = async () => {
        if (!isLoggedIn) { setShowLoginGate(true); return; }
        setIsLoading(true);
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            const contentDiv = document.getElementById('resume-preview-container');
            if (!contentDiv) return;
            const clone = contentDiv.cloneNode(true) as HTMLElement;
            clone.style.transform = 'none';
            clone.style.width = '794px';
            clone.style.height = 'auto';
            clone.style.overflow = 'visible';
            const pdfBlob: Blob = await html2pdf().set({
                margin: 0,
                filename: 'resume.pdf',
                html2canvas: { scale: 2, useCORS: true, logging: false },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
            }).from(clone).outputPdf('blob');
            const blobUrl = URL.createObjectURL(pdfBlob);
            Object.assign(document.createElement('a'), { href: blobUrl, download: 'resume.pdf' }).click();
            URL.revokeObjectURL(blobUrl);

            // Fire-and-forget persist (Mocked)
            try {
                console.log('[ManualFlow] Mocked /build-manual store successful');
            } catch (e) {
                console.warn('[ManualFlow] /build-manual store failed (non-fatal):', e);
            }
        } catch (e) {
            console.error('[ManualFlow] PDF error:', e);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {showLoginGate && <LoginGateModal onClose={() => setShowLoginGate(false)} onLogin={saveAndGoToLogin} />}

            <TopBar
                activeTab={activeTab}
                onTabChange={setActiveTab}
                onDownload={handleDownload}
                isLoading={isLoading}
                onBack={onBack}
                mainColor={mainColor}
                onColorChange={setColor}
                onDashboard={() => isLoggedIn && navigate('/dashboard')}
                isLoggedIn={isLoggedIn}
            />

            <div className="flex flex-1 overflow-hidden">
                {/* Editor panel */}
                <div className={`flex flex-col bg-white border-r border-gray-200 overflow-y-auto w-full md:w-1/2 flex-shrink-0 ${showPreviewOnMobile ? 'hidden md:flex' : 'flex'}`}>
                    <ResumeScore score={resumeScore} />
                    {activeTab === 'edit' ? (
                        <ManualEditor onScoreChange={setResumeScore} />
                    ) : (
                        <CustomizePanel
                            selectedTemplate={selectedTemplate}
                            onTemplateChange={setSelectedTemplate}
                            mainColor={mainColor}
                            onColorChange={setColor}
                            fontFamily={fontFamily}
                            onFontChange={setFontFamily}
                            fontSize={fontSize}
                            onFontSizeChange={setFontSize}
                            layoutColumns={layoutColumns}
                            onLayoutChange={setLayoutColumns}
                            spacing={spacing}
                            onSpacingChange={setSpacing}
                        />
                    )}
                    {activeTab === 'edit' && (
                        <BottomActionBar onBack={onBack} onNext={() => { if (!isLoggedIn) setShowLoginGate(true); }} />
                    )}
                </div>

                {/* Preview panel */}
                <div className={`flex-1 bg-[#F0F2F5] overflow-hidden flex-col ${showPreviewOnMobile ? 'flex' : 'hidden md:flex'}`}>
                    <ManualPreview
                        previewRef={previewRef as React.RefObject<HTMLDivElement>}
                        selectedTemplate={selectedTemplate}
                        selectedColor={selectedColor}
                        fontFamily={fontFamily}
                        fontSize={fontSize}
                        layoutColumns={layoutColumns}
                        spacing={spacing}
                    />
                    {/* Real preview pane has a pagination pill instead of the bottom right blue CTA */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
                        <div className="bg-[#1e2532] text-white text-[13px] font-medium px-4 py-2 rounded-full shadow-lg flex items-center gap-4">
                            <button className="opacity-50 cursor-not-allowed">&lt;</button>
                            <span>1 / 1</span>
                            <button className="opacity-50 cursor-not-allowed">&gt;</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile toggle */}
            <button
                onClick={() => setShowPreviewOnMobile(p => !p)}
                className="fixed bottom-5 right-5 bg-[#1a91f0] hover:bg-[#157acb] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg md:hidden z-40 transition-colors"
            >
                {showPreviewOnMobile ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                )}
            </button>



            {isLoading && (
                <div className="fixed inset-0 bg-gray-800/60 flex justify-center items-center z-50">
                    <div className="flex items-center gap-3 bg-white rounded-2xl px-8 py-5 shadow-xl">
                        <svg className="w-6 h-6 text-[#1a91f0] animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span className="text-gray-700 font-medium">Generating PDF…</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManualFlow;
