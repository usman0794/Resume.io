import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store';
import { getHomePage } from '@/store/actions/resumeActions';
import '@/styles/client/home.css';

import {
    HOME_HERO_WORDS, HOME_COUNTER_INITIAL, HOME_FEATURE_CARDS_DATA,
    HOME_TOOLS_DATA, HOME_FAQS, HOME_TEMPLATES,
} from './data/home.data';
import type { TemplateItem } from './types/home.types';

import HeroSection from './components/HeroSection';
import CounterSection from './components/CounterSection';
import ResumeBuilderCards from './components/ResumeBuilderCards';
import EveryToolSection from './components/EveryToolSection';
import HiredAtSection from './components/HiredAtSection';
import TestedTemplatesSection from './components/TestedTemplatesSection';
import ResumeBuilderFeaturesSection from './components/ResumeBuilderFeaturesSection';
import ReviewsGridSection from './components/ReviewsGridSection';
import BlogSection from './components/BlogSection';
import FAQSection from '@/components/shared/FAQSection';
import JoinBannerSection from './components/JoinBannerSection';

const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();

    // Templates — empty until API responds; no static fallback
    const [templates, setTemplates] = useState<TemplateItem[]>([]);
    const [templatesLoading, setTemplatesLoading] = useState(true);

    useEffect(() => {
        dispatch(getHomePage());

        setTemplatesLoading(true);
        setTimeout(() => {
            setTemplates([
                { id: '1', name: 'Entry Level', users: '10k+', img: '/assets/images/templates/template-entry-level.jpg' },
                { id: '2', name: 'Classic', users: '5k+', img: '/assets/images/templates/template-london-classic.jpg' },
                { id: '3', name: 'Traditional', users: '2,700,000+', img: '/assets/images/templates/template-dublin-classic.jpg' },
                { id: '4', name: 'Professional', users: '1k+', img: '/assets/images/templates/template-helsinki-professional.jpg' },
                { id: '5', name: 'Prime ATS', users: '2k+', img: '/assets/images/templates/template-santiago-prime-ats.jpg' }
            ]);
            setTemplatesLoading(false);
        }, 500);
    }, [dispatch]);

    const defaultIdx = templates.length > 0
        ? Math.min(2, Math.floor(templates.length / 2))
        : 0;

    return (
        <div className="bg-white">
            <HeroSection words={HOME_HERO_WORDS} />
            <CounterSection initialCount={HOME_COUNTER_INITIAL} />
            <ResumeBuilderCards cardsData={HOME_FEATURE_CARDS_DATA} />
            <EveryToolSection toolsData={HOME_TOOLS_DATA} />
            <HiredAtSection />

            <TestedTemplatesSection templates={HOME_TEMPLATES} defaultActiveIndex={2} />


            <ResumeBuilderFeaturesSection />

            {/* Reviews — no static fallback */}
            <ReviewsGridSection reviews={[]} />
            <BlogSection />
            <FAQSection faqs={HOME_FAQS} />
            <JoinBannerSection />
        </div>
    );
};

export default HomePage;
