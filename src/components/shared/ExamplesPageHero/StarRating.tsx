import React from 'react';

interface StarRatingProps {
  /** Numeric score, e.g. 4.2 */
  score: number;
  /** Total number of reviews */
  total: number;
  /** Review source label, e.g. "Trustpilot" */
  source?: string;
  /** Max stars (default 5) */
  max?: number;
}

// Trustpilot green
const TP_GREEN = '#00b67a';

const StarIcon = ({ fill }: { fill: 'full' | 'partial' | 'empty'; pct?: number }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    {fill === 'partial' ? (
      <>
        <defs>
          <clipPath id="star-partial">
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        {/* empty background star */}
        <path
          d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.8l-6.4 5.2 2.8-8.7L2 11h8.1L12 2z"
          fill="#e0e0e0"
        />
        {/* filled half */}
        <path
          d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.8l-6.4 5.2 2.8-8.7L2 11h8.1L12 2z"
          fill={TP_GREEN}
          clipPath="url(#star-partial)"
        />
      </>
    ) : (
      <path
        d="M12 2l2.9 8.9H23l-7.4 5.4 2.8 8.7L12 19.8l-6.4 5.2 2.8-8.7L2 11h8.1L12 2z"
        fill={fill === 'full' ? TP_GREEN : '#e0e0e0'}
      />
    )}
  </svg>
);

const StarRating: React.FC<StarRatingProps> = ({
  score,
  total,
  source = 'Trustpilot',
  max = 5,
}) => {
  const stars = Array.from({ length: max }, (_, i) => {
    const pos = i + 1;
    if (score >= pos) return 'full' as const;
    if (score >= pos - 0.5) return 'partial' as const;
    return 'empty' as const;
  });

  const formattedTotal = total.toLocaleString();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
      {/* Stars row */}
      <div className="flex items-center gap-0.5" aria-label={`${score} out of ${max} stars`}>
        {stars.map((fill, i) => (
          <StarIcon key={i} fill={fill} />
        ))}
      </div>

      {/* Score + total + source */}
      <div className="flex items-center gap-1.5 text-[14px] text-slate-600">
        <span className="font-semibold text-slate-800">{score.toFixed(1)}</span>
        <span className="text-slate-400">·</span>
        <span>
          {formattedTotal} reviews on{' '}
          <span className="font-semibold" style={{ color: TP_GREEN }}>
            {source}
          </span>
        </span>
      </div>
    </div>
  );
};

export default StarRating;
