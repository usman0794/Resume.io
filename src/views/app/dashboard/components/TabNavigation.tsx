import React from 'react';

/**
 * Component: TabNavigation
 * Purpose: High-level filtering of dashboard views.
 */
const TabNavigation = () => {
    const tabs = ['Resume Building', 'Job Search', 'Interview Prep', 'Learning'];
    return (
        <div className="flex justify-center mt-6 mb-10 overflow-x-auto custom-scrollbar pb-2" >
            <div className="flex bg-gray-100/80 p-1.5 rounded-full border border-gray-200/50 min-w-max"  style={{ boxShadow: '0 2px 0 rgba(90, 97, 105, .11), 0 4px 8px rgba(90, 97, 105, .12), 0 10px 10px rgba(90, 97, 105, .06)' }}>
                {tabs.map((tab, idx) => (
                    <button
                        key={idx}
                        className={`
              px-6 py-2.5 rounded-full text-sm font-medium transition-all
              ${idx === 0 ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'}
            `}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation;

