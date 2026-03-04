// SearchResults.tsx — Filtered article list based on search query
import React from 'react';
import { FileText } from 'lucide-react';
import { FAQ_CATEGORIES } from '../../data/faq.data';

interface SearchResultsProps {
    query: string;
    onBack?: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
    const results = FAQ_CATEGORIES.flatMap((cat) =>
        cat.articles.filter(
            (a) =>
                a.title.toLowerCase().includes(query.toLowerCase()) ||
                a.description.toLowerCase().includes(query.toLowerCase()),
        ),
    );

    return (
        <div className="w-full max-w-3xl mx-auto px-4 pb-20">
            <p className="text-[14px] text-slate-500 mb-6">
                {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </p>
            {results.length === 0 ? (
                <p className="text-slate-400 text-center py-16">No articles found.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {results.map((article) => (
                        <div
                            key={article.id}
                            className="group cursor-pointer bg-[#f3f4f6] hover:bg-white border border-transparent hover:border-gray-200 rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.08)]"
                        >
                            <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#1a91f0] mt-0.5 flex-shrink-0 transition-colors" />
                            <div className="min-w-0">
                                <h3 className="text-[15px] font-semibold text-slate-800 group-hover:text-[#1a91f0] transition-colors leading-snug">
                                    {article.title}
                                </h3>
                                {article.updatedAt && (
                                    <span className="text-[12px] text-slate-400">{article.updatedAt}</span>
                                )}
                                <p className="text-[14px] text-slate-500 truncate mt-0.5">{article.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
