import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type { RootState } from '@/store/rootReducer';
import { useDashboardData } from '@/hooks/useDashboardData';
import TabNavigation from './components/TabNavigation';
import ProgressWidget from './components/ProgressWidget';
import MainActionCard from './components/MainActionCard';
import DocumentCard from './components/DocumentCard';
import JobMatchesSection from './components/JobMatchesSection';
import { Plus, Check } from 'lucide-react';

export default function ResumeIODashboardPage() {
    const user = useSelector((s: RootState) => s.userReducer.user);
    const { stats, resumes, savedJobs, deleteResume } = useDashboardData();

    const firstName    = user?.name?.split(' ')[0] ?? 'there';
    const totalResumes = stats?.total_resumes  ?? 0;
    const aiTailored   = (stats as any)?.ai_tailored  ?? 0;
    const savedCount   = (stats as any)?.saved_jobs   ?? savedJobs?.length ?? 0;
    const memberSince  = (stats as any)?.member_since ?? null;

    // Progress: cap each at 100
    const resumeProgress  = Math.min(totalResumes  * 20, 100);
    const tailorProgress  = Math.min(aiTailored    * 25, 100);
    const savedProgress   = Math.min(savedCount    * 10, 100);

    return (
        <div className="relative pb-5">
            <main className="max-w-[1000px] mx-auto w-full px-4 sm:px-6 lg:px-8 pt-3 lg:pt-2">

                {/* Greeting */}
                <div className="text-center lg:mt-4">
                    <h1 className="text-[28px] sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                        Hi {firstName}!
                    </h1>
                    <p className="text-gray-500 text-sm sm:text-base">What's your goal today?</p>
                    {memberSince && (
                        <p className="text-xs text-gray-400 mt-1">Member since {new Date(memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    )}
                </div>

                <TabNavigation />

                {/* Progress + Action */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 mb-12">
                    <div
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hidden md:block"
                        style={{ boxShadow: '0 2px 0 rgba(90,97,105,.11),0 4px 8px rgba(90,97,105,.12),0 10px 10px rgba(90,97,105,.06),0 7px 70px rgba(90,97,105,.1)' }}
                    >
                        <h4 className="text-xs font-bold text-gray-800 tracking-widest uppercase mb-4 ml-1">Progress</h4>
                        <div className="space-y-1">
                            <ProgressWidget title="Resume Building"     value={resumeProgress} isActive={true} />
                            <ProgressWidget title="Resume Tailoring"    value={tailorProgress} type="number" />
                            <ProgressWidget title="Saved Jobs"          value={savedProgress}  type="number" />
                            <ProgressWidget title="Cover Letter Crafting" value={0}            type="number" />
                        </div>

                        {/* Quick stats */}
                        <div className="mt-5 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
                            <div>
                                <p className="text-xl font-bold text-gray-900">{totalResumes}</p>
                                <p className="text-[10px] text-gray-500 leading-tight">Resumes</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900">{aiTailored}</p>
                                <p className="text-[10px] text-gray-500 leading-tight">AI Tailored</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-gray-900">{savedCount}</p>
                                <p className="text-[10px] text-gray-500 leading-tight">Saved Jobs</p>
                            </div>
                        </div>
                    </div>
                    <MainActionCard />
                </div>

                {/* Job Matches — real saved jobs */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Your job matches</h2>
                        <Link
                            to="/app/job-search"
                            className="text-sm text-blue-600 font-semibold hover:underline hidden sm:inline-block"
                        >
                            Browse more jobs →
                        </Link>
                    </div>
                    <div
                        className="rounded-xl overflow-hidden border border-gray-100 bg-white"
                        style={{ boxShadow: '0 2px 0 rgba(90,97,105,.11),0 4px 8px rgba(90,97,105,.12),0 10px 10px rgba(90,97,105,.06),0 7px 70px rgba(90,97,105,.1)' }}
                    >
                        <JobMatchesSection />
                    </div>
                </div>

                {/* Documents */}
                <div className="mb-12">
                    <div className="flex gap-8 mb-6 border-b border-gray-200">
                        <button className="pb-4 text-2xl font-bold text-gray-900 border-b-2 border-gray-900 px-1">Documents</button>
                        <button className="pb-4 text-2xl font-bold text-gray-400 hover:text-gray-600 px-1 transition-colors">Job Tracker</button>
                        <button className="pb-4 text-2xl font-bold text-gray-400 hover:text-gray-600 px-1 transition-colors flex items-center gap-2">
                            Job Search Help
                            <span className="bg-[#1A91F0] text-white text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">New</span>
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div className="flex gap-6 border-b border-gray-200 w-full sm:w-auto">
                            <button className="pb-2 text-sm font-semibold text-gray-900 border-b-2 border-gray-900">Resumes</button>
                            <button className="pb-2 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Cover Letters</button>
                        </div>
                        <Link
                            to="/app/resume-builder"
                            className="bg-[#1A91F0] hover:bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 shrink-0"
                        >
                            <Plus size={18} /> Create New
                        </Link>
                    </div>

                    {/* Promo Banner */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50/50 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 border border-yellow-100/50">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                            <span className="text-2xl">✉️</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">Ready to give your job search a boost and get more exposure?</h4>
                            <p className="text-sm text-gray-600">Choose your resume and we'll send it to hundreds of recruiters in your field in just a few clicks</p>
                        </div>
                        <button className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-900 font-semibold text-sm px-5 py-2 rounded-lg shadow-sm transition-colors shrink-0 whitespace-nowrap">
                            Start Now
                        </button>
                    </div>

                    {/* Document Grid — all resumes */}
                    {resumes.length === 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Empty state card */}
                            <div className="flex gap-6 p-1">
                                <div className="w-[140px] shrink-0">
                                    <Link
                                        to="/app/resume-builder"
                                        className="w-full aspect-[1/1.4] rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center gap-3 transition-colors group"
                                        style={{ display: 'flex' }}
                                    >
                                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 text-gray-400 group-hover:text-blue-500 rounded-full flex items-center justify-center transition-colors">
                                            <Plus size={24} />
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Create your first resume</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Build a professional resume in minutes using our AI-powered builder.</p>
                                    <Link to="/app/resume-builder" className="mt-3 inline-block text-sm text-blue-600 font-semibold hover:underline">
                                        Get started →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {resumes.map((resume) => (
                                <DocumentCard
                                    key={resume.id}
                                    id={resume.id}
                                    title={(resume as any).name || (resume as any).title || 'Untitled'}
                                    updatedAt={
                                        resume.updated_at
                                            ? new Date(resume.updated_at).toLocaleDateString('en-US', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit',
                                              })
                                            : '—'
                                    }
                                    score={(resume as any).score ?? 0}
                                    thumbnailUrl={(resume as any).thumbnail_url}
                                    onDelete={deleteResume ? () => deleteResume(String(resume.id)) : undefined}
                                />
                            ))}

                            {/* Add new resume card */}
                            <div className="flex gap-6 p-1">
                                <div className="w-[140px] shrink-0">
                                    <Link
                                        to="/app/resume-builder"
                                        className="w-full aspect-[1/1.4] rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50/50 flex flex-col items-center justify-center gap-3 transition-colors group"
                                        style={{ display: 'flex' }}
                                    >
                                        <div className="w-10 h-10 bg-gray-100 group-hover:bg-blue-100 text-gray-400 group-hover:text-blue-500 rounded-full flex items-center justify-center transition-colors">
                                            <Plus size={24} />
                                        </div>
                                    </Link>
                                </div>
                                <div className="flex-1 pt-1">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-2">New Resume</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Create a tailored resume for each job application. Double your chances of getting hired!</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Coaching Banner */}
                <div className="bg-[#f0f7ff] rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8 border border-blue-100/50 mb-8">
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#0d3f6d] mb-3">Get the Support You Need to Succeed</h3>
                        <p className="text-[#1a5b9c] text-sm mb-6 max-w-lg">Our expert career coaches help you set clear goals and confidently move forward—90% of clients achieve success with coaching!</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                            {[
                                'Connect with an expert coach tailored to your experience',
                                'Book 50-minute sessions anytime, 24/7, to fit your busy schedule',
                                'Get flexible coaching to achieve your goals',
                            ].map((txt) => (
                                <div key={txt} className="flex gap-3">
                                    <Check size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-xs text-gray-700">{txt}</span>
                                </div>
                            ))}
                        </div>
                        <button className="bg-[#1A91F0] hover:bg-blue-600 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-sm transition-colors">
                            Book a coach
                        </button>
                    </div>
                </div>
            </main>

            {/* Floating AI Coach */}
            <div className="sticky bottom-6 flex justify-center z-40 pointer-events-none">
                <button className="pointer-events-auto bg-white hover:bg-gray-50 text-gray-900 font-medium text-sm pl-4 pr-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 flex items-center gap-3 transition-transform hover:scale-105 active:scale-95">
                    <div className="w-5 h-5 rounded-full border-2 border-t-blue-500 border-r-purple-500 border-b-orange-400 border-l-blue-500 animate-spin" />
                    Ask AI coach anything.
                </button>
            </div>
        </div>
    );
}
