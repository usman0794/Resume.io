import React, { useState } from 'react';
import '@/styles/client/resume-examples.css';
import { CATEGORIES, INDUSTRY_DATA } from '../resume/data/resume-examples.data';

// Section Components
import ExamplesPageHero from '@/components/shared/ExamplesPageHero';
import SearchBar from '@/components/shared/SearchBar';
import CategoryNav from '@/components/shared/CategoryNav';
import IndustrySection from '@/components/shared/IndustrySection';
import BuilderCtaSection from '@/components/shared/BuilderCtaSection';
import InfoSections from '@/components/shared/InfoSections';

const CoverLetterExamplesPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = INDUSTRY_DATA.filter(industry =>
        industry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.primaryExamples.some(ex => ex.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        industry.secondaryExamples.some(ex => ex.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <main className="w-full bg-white font-sans min-h-screen">

            <ExamplesPageHero
                breadcrumbLabel="Cover Letter Examples"
                title="Cover letter examples for any job in 2026"
                description="250+ free cover letter examples by industry. Check out our free cover letter samples for inspiration. Use the expert guides and our cover letter builder to create a beautiful cover letter in minutes. We also provide a library of cover letter templates."
                ctaBtnText="Create my cover letter"
                trustpilotScore={4.2}
                trustpilotTotal={55615}
                heroImageSrc="https://resume.io/cdn-cgi/image/width=544,height=480,dpr=1.24,fit=crop,gravity=top,quality=75,format=auto/assets/templates/new_york-afac6df9.jpg"
                heroImageAlt="Cover Letter Example"
            />

            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">

                <div className="w-full mb-8">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search by job title or industry"
                    />
                </div>

                <CategoryNav categories={CATEGORIES} />

                <div className="flex flex-col w-full">
                    {filteredData.length > 0 ? (
                        filteredData.map((industry) => (
                            <IndustrySection key={industry.id} data={industry} baseUrl="/cover-letter-examples" />
                        ))
                    ) : (
                        <div className="py-20 text-center text-slate-500 text-lg">
                            No cover letter examples found for &quot;{searchQuery}&quot;.
                        </div>
                    )}
                </div>

            </div>

            <BuilderCtaSection
                heading="Try our professional cover letter builder now!"
                description="Save time with our easy 3-step cover letter builder. No more writer's block or formatting difficulties in Word. Rapidly make a perfect cover letter employers love."
                primaryBtnText="Create my cover letter"
                secondaryBtnText="Cover letter examples"
            />

            <InfoSections
                mainHeading="Essential components of a cover letter in 2026"
                mainDescription="If your cover letter doesn't contain the right sections, you'll likely be passed over in favor of other applicants. Here are the essential components to include on your cover letter in 2026:"
                bulletItems={[
                    {
                        label: 'Header:',
                        text: "The cover letter header is found at the top or on the side of your cover letter. Its main purpose is to keep your name and contact information handy so the employer can easily set up an interview with you."
                    },
                    {
                        label: 'Greeting / Salutation:',
                        text: "The greeting is a short, professional opening that addresses the hiring manager directly and sets the tone for your cover letter."
                    },
                    {
                        label: 'Introduction:',
                        text: "The introduction consists of 3-4 sentences that convey your top skills, experiences, and accomplishments. The goal is to catch the hiring manager's attention and encourage them to keep reading."
                    },
                    {
                        label: 'Body Paragraphs:',
                        text: "This is the place to explain your duties, accomplishments, and the skills used in each job, expanding on the bullet points in your resume."
                    },
                    {
                        label: 'Conclusion & Call to Action:',
                        text: "The conclusion is the place to highlight your unique attributes or areas of expertise and request an interview."
                    },
                ]}
                categories={[]}
                closingHeading="Cover letter example FAQs"
                closingDescription="Common questions about using cover letter examples for your job search."
                closingList={[
                    <><strong>What are employers' expectations from a cover letter?</strong> Employers look for a clean and organized structure with no typos or grammatical errors. They also want to see that the applicant has a good understanding of the role and the company.</>,
                    <><strong>Common pitfalls to avoid in cover letters:</strong> The most common pitfalls are poor formatting, spelling and grammar mistakes, a disorganized layout, and a generic cover letter.</>,
                    <><strong>Do I need a resume to match my cover letter?</strong> We recommend submitting a cover letter with your resume whenever possible in order to increase your chances of landing the position.</>,
                    <><strong>Can I customize the cover letter example for my needs?</strong> Yes, every one of our 250+ cover letter examples was designed to be modified for your own employment history and qualifications.</>,
                    <><strong>Can you use the same cover letter example for every application?</strong> We highly recommend that you customize it for the job description of the role you are applying to.</>,
                ]}
                sidebarCtaProps={{
                    heading: "Build your cover letter in\n15 minutes",
                    description: "Use professional field-tested cover letter templates that follow the exact rules employers look for.",
                    btnText: "Create my cover letter",
                }}
                wideCtaBannerProps={{
                    heading: "Build your cover letter in 15 minutes",
                    description: "Use professional field-tested cover letter templates that follow the exact rules employers look for.",
                    btnText: "Create my cover letter",
                }}
            />
        </main>
    );
};

export default CoverLetterExamplesPage;
