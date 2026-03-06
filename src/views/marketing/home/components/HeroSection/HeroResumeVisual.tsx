// HeroResumeVisual.tsx — Right-side resume card graphic (extracted from HeroSection)
import React from 'react';
import { Link as LinkIcon, Plus, Sparkles } from 'lucide-react';

const HeroResumeVisual: React.FC = () => (
    <div className="relative w-full aspect-square max-w-[420px] mx-auto lg:max-w-none flex justify-center items-center">

        {/* Resume Document */}
        <div className="relative w-[75%] bg-white/70 backdrop-blur-xl rounded-xl border border-white/60 z-10 p-5 sm:p-7 shadow-[0_20px_60px_rgba(2,6,23,0.12)] transition-transform duration-300 hover:scale-[1.02]">
            <h3 className="text-[14px] sm:text-[16px] font-semibold text-[#ef7e56] mb-0.5">Alice Hart</h3>
            <p className="text-slate-500 font-medium text-[9px] sm:text-[11px] mb-4">Math Teacher</p>
            <div className="text-[8px] sm:text-[9px] leading-[1.6] text-slate-500 space-y-1 mb-5 pr-12">
                <p>Dedicated and enthusiastic math teacher with over 8 years of experience...</p>
            </div>
            <div className="border-t border-slate-100 pt-4 flex gap-4">
                <div className="flex-1">
                    <h4 className="font-semibold text-[#ef7e56] text-[8px] sm:text-[9px] mb-2">Employment History</h4>
                    <div className="mb-3 space-y-0.5">
                        <div className="font-semibold text-slate-700 text-[8px] sm:text-[9px]">Tuscaloosa County High School</div>
                        <div className="text-slate-400 text-[6px] sm:text-[7px] mb-1">September 2017 — Present</div>
                        <div className="h-1 bg-slate-100 rounded w-full mb-1" />
                        <div className="h-1 bg-slate-100 rounded w-4/5 mb-1" />
                    </div>
                </div>
            </div>
        </div>

        {/* Avatar & Smooth Gradient Waves (Like Image) */}
        <div className="absolute top-[6%] right-[6%] w-[28%] aspect-square z-20 flex justify-center items-center transition-transform duration-300 hover:scale-[1.02]">

            {/* Background Gradient Waves (Soft Fading Edges) */}
            <div className="absolute pointer-events-none flex justify-center items-center -z-10 w-[300%] h-[300%]">
                {/* Outer Soft Ring */}
                <div className="absolute w-[90%] h-[90%] rounded-full opacity-60"
                    style={{ background: 'radial-gradient(circle, rgba(230,240,255,0.8) 0%, rgba(230,240,255,0) 70%)' }} />
                {/* Middle Ring */}
                <div className="absolute w-[65%] h-[65%] rounded-full opacity-80"
                    style={{ background: 'radial-gradient(circle, rgba(210,233,255,1) 0%, rgba(210,233,255,0) 70%)' }} />
                {/* Inner Ring */}
                <div className="absolute w-[45%] h-[45%] rounded-full"
                    style={{ background: 'radial-gradient(circle, rgba(180,215,255,1) 0%, rgba(180,215,255,0) 70%)' }} />
            </div>

            {/* Profile Image with 3D Shadow */}
            <div className="relative w-full h-full rounded-full border-[5px] border-white overflow-hidden bg-[#1a91f0] shadow-[1px_1px_0_#e2e8f0,2px_2px_0_#e2e8f0,3px_3px_0_#cbd5e1,4px_4px_0_#cbd5e1,5px_5px_0_#94a3b8,6px_6px_10px_rgba(0,0,0,0.15)]">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300" alt="Profile" className="w-full h-full object-cover" />
            </div>
        </div>

        {/* Score Badge */}
        <div className="absolute top-[35%] left-[2%] bg-white/70 backdrop-blur-xl rounded-lg border border-white/60 p-2 sm:p-2.5 flex items-center gap-2 z-20 shadow-[0_16px_50px_rgba(2,6,23,0.10)] transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#21b068] rounded flex justify-center items-center font-bold text-white text-[12px] sm:text-[14px]">81%</div>
            <div className="pr-1 sm:pr-2">
                <div className="text-[9px] sm:text-[10px] font-semibold text-slate-800 leading-tight">Resume</div>
                <div className="text-[9px] sm:text-[10px] font-medium text-slate-500 leading-tight">Score</div>
            </div>
        </div>

        {/* AI Coach */}
        <div className="absolute bottom-[25%] left-[5%] bg-white/70 backdrop-blur-xl rounded-full border border-white/60 px-3 py-2 sm:px-4 sm:py-2.5 flex items-center gap-2 z-20 shadow-[0_16px_50px_rgba(2,6,23,0.10)] transition-all duration-300 hover:translate-y-[-2px]">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-[2.5px] border-orange-400 border-t-orange-100 animate-spin" />
            <span className="text-[9px] sm:text-[11px] font-medium text-slate-600">Ask AI coach anything...</span>
        </div>

        {/* ATS Badge */}
        <div className="absolute top-[48%] right-[-2%] bg-[#8b5cf6]/95 text-white backdrop-blur-xl px-3 py-1.5 sm:px-4 sm:py-2 rounded-md flex items-center gap-1.5 z-30 shadow-[0_16px_50px_rgba(2,6,23,0.14)] transition-all duration-300 hover:-translate-y-0.5">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-[9px] sm:text-[11px] font-medium">ATS Perfect</span>
        </div>

        {/* Skills Popup */}
        <div className="absolute bottom-[5%] right-[5%] bg-white/70 backdrop-blur-xl rounded-xl border border-white/60 p-3 sm:p-4 w-[130px] sm:w-[150px] z-20 shadow-[0_16px_50px_rgba(2,6,23,0.10)] transition-all duration-300 hover:-translate-y-0.5">
            <h4 className="text-[10px] sm:text-[11px] font-bold text-slate-800 mb-2 flex items-center gap-1">
                Skills <LinkIcon className="w-3 h-3 text-slate-400" />
            </h4>
            <div className="space-y-1.5">
                {['Management Skills', 'Analytical Thinking', 'Leadership'].map((s) => (
                    <div key={s} className="bg-[#f8fafc] text-slate-600 text-[8px] sm:text-[10px] font-medium px-2 py-1.5 rounded border border-slate-100">{s}</div>
                ))}
                <button className="w-full mt-2 border border-[#e6f1fe] text-[#1a91f0] hover:bg-[#e6f1fe] text-[9px] sm:text-[10px] font-semibold py-1.5 rounded flex items-center justify-center gap-1 transition-colors">
                    <Plus className="w-3 h-3" /> Add skill
                </button>
            </div>
        </div>
    </div>
);

export default HeroResumeVisual;