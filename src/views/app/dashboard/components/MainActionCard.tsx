import React from 'react';

/**
 * Component: MainActionCard
 * Purpose: The primary call-to-action area suggesting the next best step for the user.
 */
const MainActionCard = () => (
    <div
        className="bg-[#f0f7ff] rounded-2xl p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden h-full border border-blue-100/50"
        style={{ boxShadow: '0 2px 0 rgba(90, 97, 105, .11), 0 4px 8px rgba(90, 97, 105, .12), 0 10px 10px rgba(90, 97, 105, .06), 0 7px 70px rgba(90, 97, 105, .1)' }}
    >        <div className="flex-1 z-10">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded mb-4 uppercase tracking-wider">
                Resume building
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Improve your score in 5 mins</h3>
            <p className="text-gray-600 text-sm mb-6 max-w-sm">
                Take small steps to improve your resume score. You'll start getting interviews at 90% or higher.
            </p>
            <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded-lg shadow-sm border border-gray-200 transition-all flex items-center gap-2">
                Add employment history <span className="text-emerald-600 font-bold">+25%</span>
            </button>
        </div>

        <div className="relative w-[180px] shrink-0 z-10 hidden sm:block">
            {/* Mock Resume Document */}
            <div className="bg-white w-full aspect-[1/1.4] rounded-sm shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 flex">
                <div className="w-1/3 bg-[#134e40] h-full" />
                <div className="flex-1 bg-white" />
            </div>
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-white p-1 rounded-xl shadow-lg border border-gray-100">
                <div className="bg-red-50 px-3 py-2 rounded-lg text-center">
                    <div className="text-red-500 font-bold text-lg leading-none">20%</div>
                    <div className="text-red-400 text-[10px] font-medium leading-tight mt-0.5">
                        Resume<br />Score
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MainActionCard;

