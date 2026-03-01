// ReviewCard.tsx — Single review card
import React from 'react';
import type { ReviewItem } from '../../types/home.types';
import { TrustpilotSquare } from './TrustpilotStars';

interface ReviewCardProps { review: ReviewItem; }

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => (
    <div className="w-[85vw] sm:w-[300px] lg:w-[calc(33.333%-27px)] flex-shrink-0 snap-start flex flex-col text-left">
        <div className="flex items-center gap-[1px] mb-4">
            {[...Array(5)].map((_, i) => (
                <TrustpilotSquare key={i} fraction={i < review.rating ? 1 : 0} size="small" />
            ))}
        </div>
        <h3 className="font-bold text-[17px] text-[#1e2a3b] mb-2.5 leading-snug">{review.title}</h3>
        <p className="text-[15px] text-[#4b5563] leading-[1.6] mb-6 flex-1 min-h-[72px]">{review.comment}</p>
        <p className="text-[13px] text-[#828ba2] font-medium mt-auto">
            {review.author} <span className="mx-1">•</span> {review.time}
        </p>
    </div>
);

export default ReviewCard;

