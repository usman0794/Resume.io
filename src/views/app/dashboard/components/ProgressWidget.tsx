import React from 'react';
import { FileText } from 'lucide-react';

/**
 * Component: ProgressWidget
 * Purpose: Reusable component for the items in the left-hand 'PROGRESS' sidebar.
 */
const ProgressWidget = ({
    title,
    value,
    type = 'linear',
    isActive,
}: {
    title: string;
    value: number;
    type?: 'linear' | 'number' | string;
    isActive?: boolean;
}) => {
    return (
        <div
            className={`flex items-center justify-between p-3 rounded-xl cursor-pointer ${isActive ? 'bg-blue-50/50 ring-1 ring-blue-100' : 'hover:bg-gray-50'}`}
        >
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                    <FileText size={16} />
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>{title}</span>
            </div>
            <div className="flex items-center gap-3">
                {type === 'linear' && (
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                        <div className="al-progress-fill" style={{ width: `${value}%` }} />
                    </div>
                )}
                <span className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>{value === 0 ? '0' : `${value}%`}</span>
            </div>
        </div>
    );
};

export default ProgressWidget;

