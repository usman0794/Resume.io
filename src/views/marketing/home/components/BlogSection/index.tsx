// BlogSection/index.tsx — All data now lives in home.data.tsx (no local data/types)
import React from 'react';
import FeaturedVideoCard from './FeaturedVideoCard';
import PopularVideoCard from './PopularVideoCard';
import LatestVideoCard from './LatestVideoCard';
import { BLOG_FEATURED_VIDEO, BLOG_POPULAR_VIDEOS, BLOG_LATEST_VIDEOS } from '../../data/home.data';

export default function BlogSection() {
    return (
        <div className="font-sans bg-white py-16 px-6">
            <div className="max-w-[1140px] mx-auto">
                <h2 className="text-[#1a1c20] text-[32px] font-semibold mb-[40px] pb-5 border-b border-[#e7eaf4]">Videos</h2>
                <div className="grid grid-cols-1 lg:grid-cols-[22%_33%_minmax(0,1fr)] gap-x-[3.5rem] gap-y-12 items-start">
                    <div>
                        <h3 className="text-[#1a1c20] text-[22px] font-medium mb-[22px]">Popular</h3>
                        {BLOG_POPULAR_VIDEOS.map(video => <PopularVideoCard key={video.id} card={video} />)}
                    </div>
                    <div>
                        <h3 className="text-[#1a1c20] text-[22px] font-medium mb-[22px]">Latest</h3>
                        {BLOG_LATEST_VIDEOS.map(video => <LatestVideoCard key={video.id} card={video} />)}
                    </div>
                    <div className="h-full min-h-[480px]">
                        <FeaturedVideoCard card={BLOG_FEATURED_VIDEO} />
                    </div>
                </div>
            </div>
        </div>
    );
}
