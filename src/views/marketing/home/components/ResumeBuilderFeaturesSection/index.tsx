// ResumeBuilderFeaturesSection/index.tsx
import React from 'react';
import AiBadge from './AiBadge';
import LinkButton from './LinkButton';
import stepByStepImg from '@/assets/features/step_by_step-bb1f1e1d.png';
import professionalSummaryImg from '@/assets/features/professional_summary-fb1e272a.png';
import coverLetterImg from '@/assets/features/cover_letter-b65a83dd.png';
import jobLinkImg from '@/assets/features/job_link-e768b425.png';

export default function ResumeBuilderFeaturesSection() {
    return (
        <section className="w-full bg-white py-8 md:py-20 px-5 md:px-8 font-sans text-[#1e2a3b] overflow-hidden">
            <div className="max-w-[1240px] mx-auto">
                <h2 className="text-center text-[32px] md:text-[40px] lg:text-[44px] font-medium mb-12 md:mb-16 tracking-tight">
                    Way beyond a resume builder...
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-7">

                    {/* 1. Step-by-step guidance */}
                    <div className="md:col-span-2 lg:col-span-7 bg-[#f0f4fd] rounded-[32px] p-8 md:p-12 pb-0 overflow-hidden flex flex-col lg:flex-row relative group min-h-[400px] lg:min-h-[420px] shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]">
                        <div className="lg:w-[50%] pb-10 md:pb-12 z-10 flex flex-col items-start h-full relative">
                            <AiBadge />
                            <h3 className="text-[26px] md:text-[32px] leading-[1.1] font-bold mb-4 tracking-tight">Step-by-step guidance</h3>
                            <p className="text-[#828ba2] text-[16px] md:text-[17px] leading-[1.6] mb-8 max-w-sm">No need to think much. We guide you through every step of the process.</p>
                            <div className="mt-auto"><LinkButton text="Create my resume" /></div>
                        </div>
                        <div className="absolute right-[-5%] sm:right-[-5%] lg:right-[-8%] bottom-[-5%] w-[80%] sm:w-[65%] md:w-[55%] lg:w-[56%] z-0 flex justify-end">
                            <img loading="lazy" src={stepByStepImg} alt="Step by step UI" className="w-full h-auto max-w-[250px] sm:max-w-[340px] lg:max-w-[620px] object-contain drop-shadow-2xl" />
                        </div>
                    </div>

                    {/* 2. AI writes for you */}
                    <div className="md:col-span-1 lg:col-span-5 bg-[#f0f4fd] rounded-[32px] p-8 md:p-12 pb-0 overflow-hidden flex flex-col relative group min-h-[400px] lg:min-h-[420px] shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]">
                        <div className="z-10 flex flex-col items-start relative">
                            <AiBadge />
                            <h3 className="text-[26px] md:text-[32px] leading-[1.1] font-bold mb-4 tracking-tight">AI writes for you</h3>
                            <p className="text-[#828ba2] text-[16px] md:text-[17px] leading-[1.6]">Speak into the mic and the AI fixes mistakes. Stuck? Click to add phrases that sound professional.</p>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] sm:w-[70%] lg:w-[95%] z-0">
                            <img loading="lazy" src={professionalSummaryImg} alt="AI text generation UI" className="w-full h-auto max-w-[280px] sm:max-w-[400px] lg:max-w-[520px] mx-auto object-contain drop-shadow-xl rounded-t-xl" />
                        </div>
                    </div>

                    {/* 3. Need some advice? */}
                    <div className="md:col-span-2 lg:col-span-4 bg-[#eef5ef] rounded-[32px] p-8 md:p-10 lg:p-12 pb-0 overflow-hidden flex flex-col relative group min-h-[320px] shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]">
                        <div className="z-10 flex flex-col items-start relative">
                            <h3 className="text-[26px] md:text-[32px] leading-[1.1] font-bold mb-4 tracking-tight">Cover letter</h3>
                            <p className="text-[#828ba2] text-[16px] md:text-[17px] leading-[1.6]">Generate a cover letter to match your resume. Our AI tool writes it for you in seconds.</p>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] sm:w-[60%] lg:w-[90%] z-0">
                            <img loading="lazy" src={coverLetterImg} alt="Coaching" className="w-full h-auto object-contain" />
                        </div>
                    </div>

                    {/* 4. Recruiter Match */}
                    <div className="md:col-span-2 lg:col-span-8 bg-[#eef7fb] rounded-[32px] p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row relative group min-h-[300px] items-center shadow-[0_2px_0_rgba(90,97,105,.11),0_4px_8px_rgba(90,97,105,.12),0_10px_10px_rgba(90,97,105,.06)]">
                        <div className="lg:w-[45%] lg:pr-10 z-10 flex flex-col items-start h-full justify-center w-full relative mb-12 lg:mb-0">
                            <h3 className="text-[26px] md:text-[32px] leading-[1.1] font-bold mb-4 tracking-tight">Job link</h3>
                            <p className="text-[#828ba2] text-[16px] md:text-[17px] leading-[1.6] mb-8 max-w-lg">Share a link to your resume and cover letter. See when employers view or download them.</p>
                            <div className="mt-auto"><LinkButton text="Start sharing" /></div>
                        </div>
                        <div className="relative lg:absolute right-auto lg:right-[5%] top-auto lg:top-1/2 lg:-translate-y-1/2 w-[100%] sm:w-[75%] md:w-[60%] lg:w-[45%] z-0">
                            <img loading="lazy" src={jobLinkImg} alt="Recruiter Match" className="w-full h-auto object-contain drop-shadow-sm" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}