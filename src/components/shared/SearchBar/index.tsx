// src/components/SearchBar.tsx

import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    placeholder?: string;
    value: string;
    onChange: (val: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Type your job title",
    value,
    onChange
}) => {
    return (
        <div className="relative w-full max-w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-500" />
            </div>
            <input
                type="text"
                className="block w-full pl-12 pr-4 py-3.5 bg-white border-2 border-[#2196F3] rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all text-base font-medium shadow-sm"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;
