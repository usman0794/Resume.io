import React, { useState, useRef } from 'react';

type Step = 'upload' | 'planning' | 'review' | 'executing' | 'done' | 'error';

interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
}

interface AiFlowProps {
  onBack: () => void;
}

const AiFlow: React.FC<AiFlowProps> = ({ onBack }) => {
  const [step,          setStep]          = useState<Step>('upload');
  const [tasks,         setTasks]         = useState<Task[]>([]);
  const [approvedIds,   setApprovedIds]   = useState<Set<string>>(new Set());
  const [resumeText,    setResumeText]    = useState('');
  const [resumeData,    setResumeData]    = useState<Record<string, unknown>>({});
  const [jobDesc,       setJobDesc]       = useState('');
  const [role,          setRole]          = useState('');
  const [pdfUrl,        setPdfUrl]        = useState('');
  const [errorMsg,      setErrorMsg]      = useState('');
  const [selectedTplId, setSelectedTplId] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem('token');

  /* ── Step 1: Upload → mock plan ──────────────────────────── */
  const handlePlan = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return;
    setStep('planning');
    setErrorMsg('');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockTasks = [
        { id: '1', title: 'Rewrite Professional Summary', description: 'Make it more impactful for the target role.', category: 'Content', impact: 'High' },
        { id: '2', title: 'Optimize Skills Section', description: 'Add missing keywords from job description.', category: 'Keywords', impact: 'Medium' }
      ];
      setTasks(mockTasks);
      setResumeText('Mock parsed text');
      setResumeData({});
      setApprovedIds(new Set(mockTasks.map((t: Task) => t.id)));
      setStep('review');
    } catch (e: any) {
      setErrorMsg('Something went wrong.');
      setStep('error');
    }
  };


  /* ── Step 2: Approve tasks → mock execute ─────────────────── */
  const handleExecute = async () => {
    setStep('executing');
    setErrorMsg('');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Create dummy PDF blob for download
      const dummyPdfContent = 'Mock PDF content';
      const blob = new Blob([dummyPdfContent], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      setStep('done');
    } catch (e: any) {
      setErrorMsg('Something went wrong.');
      setStep('error');
    }
  };

  const toggleTask = (id: string) =>
    setApprovedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  /* ── UI ───────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 sticky top-0 z-40">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
          </svg>
          Back
        </button>
        <span className="text-sm font-semibold text-gray-700">AI Resume Tailor</span>
      </div>

      <div className="flex-1 flex items-start justify-center p-6">
        <div className="w-full max-w-xl">

          {/* ── Upload step ── */}
          {step === 'upload' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Tailor your resume with AI</h2>
              <p className="text-sm text-gray-500">Upload your existing resume and optionally paste a job description. Our AI will suggest targeted improvements.</p>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Resume PDF *</label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/30 transition-colors"
                >
                  <svg className="w-8 h-8 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                  <p className="text-sm text-gray-500">Click to upload PDF</p>
                  <input ref={fileRef} type="file" accept=".pdf" className="hidden"
                    onChange={e => {
                      const name = e.target.files?.[0]?.name;
                      if (name) e.target.nextElementSibling && ((e.target.nextElementSibling as HTMLElement).textContent = name);
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Target Role (optional)</label>
                <input
                  type="text" value={role} onChange={e => setRole(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Job Description (optional)</label>
                <textarea
                  value={jobDesc} onChange={e => setJobDesc(e.target.value)}
                  rows={4} placeholder="Paste the job posting here…"
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-50 resize-none"
                />
              </div>

              <button
                onClick={handlePlan}
                disabled={!fileRef.current?.files?.length}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors disabled:opacity-40"
              >
                Analyse Resume →
              </button>
            </div>
          )}

          {/* ── Planning spinner ── */}
          {step === 'planning' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-sm font-medium text-gray-600">Analysing your resume…</p>
              <p className="text-xs text-gray-400">This takes about 10–20 seconds</p>
            </div>
          )}

          {/* ── Review tasks ── */}
          {step === 'review' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7 space-y-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Review suggested improvements</h2>
                <p className="text-sm text-gray-500">Uncheck anything you don't want. Then click Build Resume.</p>
              </div>

              <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
                {tasks.map(task => (
                  <label key={task.id} className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${approvedIds.has(task.id) ? 'border-indigo-300 bg-indigo-50/40' : 'border-gray-100 bg-gray-50'}`}>
                    <input
                      type="checkbox"
                      checked={approvedIds.has(task.id)}
                      onChange={() => toggleTask(task.id)}
                      className="mt-0.5 accent-indigo-600"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                      <div className="flex gap-2 mt-2">
                        {task.category && <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">{task.category}</span>}
                        {task.impact && <span className="text-[10px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-medium">{task.impact}</span>}
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep('upload')} className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-xl text-sm hover:bg-gray-50 transition-colors">
                  ← Back
                </button>
                <button
                  onClick={handleExecute}
                  disabled={approvedIds.size === 0}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-40"
                >
                  Build Resume ({approvedIds.size} tasks)
                </button>
              </div>
            </div>
          )}

          {/* ── Executing spinner ── */}
          {step === 'executing' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-sm font-medium text-gray-600">Building your tailored resume…</p>
              <p className="text-xs text-gray-400">This takes about 20–40 seconds</p>
            </div>
          )}

          {/* ── Done ── */}
          {step === 'done' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center gap-5 text-center">
              <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-1">Your resume is ready!</h2>
                <p className="text-sm text-gray-500">{token ? 'Saved to your dashboard automatically.' : 'Log in to save it to your dashboard.'}</p>
              </div>
              <a
                href={pdfUrl} download="tailored-resume.pdf"
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
              >
                Download PDF
              </a>
              <button onClick={() => { setStep('upload'); setPdfUrl(''); setTasks([]); }} className="text-sm text-gray-400 hover:text-gray-600">
                Start over
              </button>
            </div>
          )}

          {/* ── Error ── */}
          {step === 'error' && (
            <div className="bg-white rounded-2xl shadow-sm border border-red-100 p-8 flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">Something went wrong</h2>
                <p className="text-sm text-red-500">{errorMsg}</p>
              </div>
              <button onClick={() => setStep('upload')} className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-xl text-sm">
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AiFlow;
