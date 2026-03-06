import React, { useState } from 'react';
import '@/styles/client/resume-examples.css';
import { CATEGORIES, INDUSTRY_DATA } from './data/resume-examples.data';

// Section Components
import ExamplesPageHero from '@/components/shared/ExamplesPageHero';
import SearchBar from '@/components/shared/SearchBar';
import CategoryNav from '@/components/shared/CategoryNav';
import IndustrySection from '@/components/shared/IndustrySection';
import BuilderCtaSection from '@/components/shared/BuilderCtaSection';
import InfoSections from '@/components/shared/InfoSections';

const ResumeExamplesPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredData = INDUSTRY_DATA.filter(industry =>
        industry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        industry.primaryExamples.some(ex => ex.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        industry.secondaryExamples.some(ex => ex.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <main className="w-full bg-white font-sans min-h-screen">

            <ExamplesPageHero
                breadcrumbLabel="Resume Examples"
                title="500+ Free Resume Examples by Industry (+Writing Guides)"
                description="Check out our free resume samples for inspiration. Use the expert guides and our resume builder to create a beautiful resume in minutes. We also provide a library of resume templates."
                ctaBtnText="Create my resume"
                trustpilotScore={4.2}
                trustpilotTotal={55615}
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
                            <IndustrySection key={industry.id} data={industry} baseUrl="/resume-examples" />
                        ))
                    ) : (
                        <div className="py-20 text-center text-slate-500 text-lg">
                            No resume examples found for &quot;{searchQuery}&quot;.
                        </div>
                    )}
                </div>

            </div>

            <BuilderCtaSection
                heading="Try our professional Resume builder now!"
                description="Save time with our easy 3-step resume builder. No more writer's block or formatting difficulties in Word. Rapidly make a perfect resume employers love."
                primaryBtnText="Create my resume"
                secondaryBtnText="Resume examples"
            />

            <InfoSections
                mainHeading="Essential components of a resume in 2026"
                mainDescription="If your resume doesn't contain the right sections, you'll likely be passed over in favor of other applicants. Here are the essential components to include on your resume in 2026:"
                bulletItems={[
                    {
                        label: 'Header:',
                        text: "The resume header is found at the top or on the side of your resume. Its main purpose is to keep your name and contact information handy so the employer can easily set up an interview with you. The header also adds a touch of attractive formatting to your resume."
                    },
                    {
                        label: 'Professional Summary:',
                        text: "The resume summary consists of 3-4 sentences that convey your top skills, experiences, and accomplishments. The goal of the summary is to catch the hiring manager's attention and encourage them to keep reading your resume."
                    },
                    {
                        label: 'Employment History:',
                        text: "This is the place to list your previous positions, along with bullet points that explain your duties, accomplishments, and the skills used in each job."
                    },
                    {
                        label: 'Education:',
                        text: "Your education section lists degrees and diplomas in order to give the employer a sense of your background and qualifications for the role."
                    },
                    {
                        label: 'Skills:',
                        text: "The skills section is the place to highlight your unique attributes or areas of expertise. Make sure to focus both on hard skills (technical knowledge) and soft skills (personality traits.)"
                    },
                ]}
                categories={[
                    {
                        heading: "Choosing the right resume example format",
                        description: (
                            <>
                                <p className="mb-4">When it comes to choosing the right resume format, it's important to think about the amount of experience you have to show, the type of job you are applying for, and the hiring manager's expectations. Here are three different resume sample formats to choose from:</p>
                                <p className="mb-2"><strong>Chronological resume format:</strong> The chronological — also known as reverse chronological — resume format is the "standard" structure that most hiring managers will expect to see. This format focuses on the employment history section. We recommend this format as the best choice for professionals and anyone with at least three previous jobs to show.</p>
                                <p className="mb-2"><strong>Functional resume format:</strong> The functional resume format is best-suited to students and first-time job seekers because it places less emphasis on previous experience. Instead, your resume begins with the skills section.</p>
                                <p className="mb-2"><strong>Combination resume format:</strong> The combination, or hybrid, resume format is a combination of the previous two resume formats, which offers maximum flexibility. This format is best suited to freelancers and other independent professionals.</p>
                            </>
                        ),
                        relatedExample: {
                            tag: 'Related example',
                            title: 'General resume example',
                            description: "By creating a general resume, you can prepare yourself to apply for a wide variety of jobs or save time customizing your resume for a specific application.",
                            imageUrl: 'https://resume.io/cdn-cgi/image/width=400,format=auto/assets/templates/new_york-afac6df9.jpg',
                            imageAlt: 'General Resume Example',
                            href: '/resume-examples/general',
                        }
                    },
                    {
                        heading: "Advantages of using our resume samples for job applications",
                        description: (
                            <ul className="list-none pl-0 space-y-3 text-[17px] leading-[1.7]">
                                {[
                                    { label: 'Expert advice:', text: "Our writing team closely monitors today's hiring trends to make sure our resume samples are packed full of the best possible tricks and tips for your next job application." },
                                    { label: 'HR-approved layouts:', text: "Our design team works in collaboration with HR professionals to create layouts that stand out to employers and give candidates an edge in crowded applicant pools." },
                                    { label: 'Quicker and easier:', text: "Our resume samples integrate seamlessly into our resume builder, where you can easily modify your experience, change the layout, and download a perfect resume in a few clicks." },
                                    { label: 'AI sample sentences and feedback:', text: "We've harnessed the power of AI to create hundreds of sample sentences that can give your resume a boost no matter what industry you work in." },
                                    { label: 'Wide variety of templates:', text: "We know that different jobs require different approaches, which is why we've created resume templates to match roles from accountant to zookeeper." },
                                    { label: 'ATS-friendly Resumes:', text: "We make sure our resume samples are compatible with today's resume scanners and ATS software." },
                                ].map((item, i) => (
                                    <li key={i} className="relative pl-6">
                                        <span className="absolute left-0 top-[11px] w-[5px] h-[5px] rounded-full bg-[#1a88ff]" />
                                        <strong className="text-[#1a1c29] font-bold">{item.label} </strong>{item.text}
                                    </li>
                                ))}
                            </ul>
                        ),
                    },
                ]}
                closingHeading="Resume example FAQs"
                closingDescription="Common questions about using resume examples for your job search."
                closingList={[
                    <><strong>What are employers' expectations from a resume?</strong> Employers look for a clean and organized structure with no typos or grammatical errors. They also want to see that the applicant has a good understanding of the role and the company.</>,
                    <><strong>Common pitfalls to avoid in resumes:</strong> The most common pitfalls are poor formatting, spelling and grammar mistakes, a disorganized layout, and a generic resume.</>,
                    <><strong>Do I need a cover letter to match my resume?</strong> We recommend submitting a cover letter with your resume whenever possible in order to increase your chances of landing the position.</>,
                    <><strong>Can I customize the resume example for my needs?</strong> Yes, every one of our 500+ resume examples was designed to be modified for your own employment history and qualifications.</>,
                    <><strong>Can you use the same resume example for every application?</strong> We highly recommend that you customize it for the job description of the role you are applying to.</>,
                ]}
                sidebarCtaProps={{
                    heading: "Build your resume in\n15 minutes",
                    description: "Use professional field-tested resume templates that follow the exact 'resume rules' employers look for.",
                    btnText: "Create my resume",
                }}
                wideCtaBannerProps={{
                    heading: "Build your resume in 15 minutes",
                    description: "Use professional field-tested resume templates that follow the exact 'resume rules' employers look for.",
                    btnText: "Create my resume",
                }}
            />
        </main>
    );
};

export default ResumeExamplesPage;
