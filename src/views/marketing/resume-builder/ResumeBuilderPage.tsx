import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { AppDispatch } from '@/store';
import type { RootState } from '@/store/rootReducer';
import { getHomePage, getTemplateById } from '@/store/actions/resumeActions';
import { saveSession, loadSession, clearSession } from '@/utils/resumeSession';
import LoginGateModal from './components/LoginGateModal';
import ManualFlow from './components/flows/manual/ManualFlow';
import AiFlow from './components/flows/ai/AiFlow';

/* ── Start Modal ─────────────────────────────────────────────────────────── */
const StartModal = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const START_OPTIONS = [
    {
      id: 'manual',
      label: 'Create New Resume',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M5 12h14" />
        </svg>
      ),
    },
    {
      id: 'ai',
      label: 'Upload Resume To Tailor',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 bg-[#f0f2f5] z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[440px] p-7">
        <h2 className="text-[22px] font-semibold text-gray-900 text-center mb-1">Let's get started</h2>
        <p className="text-sm text-gray-400 text-center mb-6">How do you want to create your resume?</p>
        <div className="space-y-2.5">
          {START_OPTIONS.map(opt => (
            <button key={opt.id} onClick={() => onSelect(opt.id)}
              className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-[#F4F6FB] hover:bg-[#EAEDF6] transition-colors group">
              <div className="flex items-center gap-3.5 text-gray-800 font-medium text-[15px]">
                <span className="text-gray-500 group-hover:text-indigo-600 transition-colors">{opt.icon}</span>
                {opt.label}
              </div>
              <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ── Main Page ───────────────────────────────────────────────────────────── */
const ResumeBuilderPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isLoggedIn = useSelector((s: RootState) => s.userReducer.isLoggedIn);
  const templates = useSelector((s: RootState) => s.resumeReducer.home?.templates ?? []);
  const authToken = localStorage.getItem('token');

  const [showStartModal, setShowStartModal] = useState(true);
  const [showLoginGate, setShowLoginGate] = useState(false);
  const [mode, setMode] = useState<'manual' | 'ai' | null>(null);

  const sessionRestoredRef = useRef(false);

  // Restore session after login redirect
  useEffect(() => {
    if (!isLoggedIn || sessionRestoredRef.current) return;
    const saved = loadSession();
    if (!saved) return;
    sessionRestoredRef.current = true;
    if (saved.flow === 'ai') {
      setMode('ai'); setShowStartModal(false); return;
    }
    if (saved.flow === 'manual') {
      clearSession();
      setMode('manual'); setShowStartModal(false);
    }
  }, [isLoggedIn]);

  // URL param mode
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    const templateId = searchParams.get('templateId');
    if (modeParam === 'manual') {
      setShowStartModal(false); setMode('manual');
      if (templateId) dispatch(getTemplateById(Number(templateId)));
    } else if (modeParam === 'ai') {
      setShowStartModal(false); setMode('ai');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!templates?.length) dispatch(getHomePage());
  }, [dispatch, templates]);

  const handleSelect = (optionId: string) => {
    setShowStartModal(false);
    setMode(optionId as 'manual' | 'ai');
  };

  const handleBack = () => { setShowStartModal(true); setMode(null); };

  const saveAndGoToLogin = () => {
    saveSession({ flow: mode ?? 'manual' });
    setShowLoginGate(false);
    navigate('/login', { state: { from: window.location.pathname + window.location.search } });
  };

  if (showStartModal) return <StartModal onSelect={handleSelect} />;

  if (mode === 'ai') {
    return <AiFlow onBack={handleBack} />;
  }

  // Manual mode
  return (
    <>
      {showLoginGate && (
        <LoginGateModal onClose={() => setShowLoginGate(false)} onLogin={saveAndGoToLogin} />
      )}
      <ManualFlow
        onBack={handleBack}
        isLoggedIn={isLoggedIn ?? false}
        authToken={authToken}
      />
    </>
  );
};

export default ResumeBuilderPage;
