import React from 'react';

export interface ReviewItem { id: number; rating: number; title: string; comment: string; author: string; time: string; }
export interface TemplateItem { id: string; name: string; users: string; img: string; }
export interface ToolItem { id: string; title: string; description: string; iconUrl: string; imageUrl: string; bgColor: string; }
export interface FeatureCard { icon: React.ComponentType<{ className?: string }>; title: string; description: string; }

// ─── Props ────────────────────────────────────────────────────────────────
export interface HeroSectionProps { words?: string[]; }
export interface CounterSectionProps { initialCount?: number; }
export interface ResumeBuilderCardsProps { cardsData?: Array<{ key: string; title: string; description: string }>; }
export interface EveryToolSectionProps { toolsData?: Record<string, ToolItem[]>; }
export interface TestedTemplatesSectionProps { templates?: TemplateItem[]; defaultActiveIndex?: number; }
export interface ReviewsGridSectionProps { reviews?: ReviewItem[]; overallRating?: string; totalReviews?: string; }
export interface JoinBannerSectionProps { counter?: number; bannerImage?: string; ctaHref?: string; }
