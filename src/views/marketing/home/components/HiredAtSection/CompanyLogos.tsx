// CompanyLogos.tsx — Logos row with grayscale filter
import React from 'react';

const CompanyLogos: React.FC = () => (
    <div className="flex flex-wrap items-center justify-center xl:justify-end gap-10 sm:gap-14 flex-1 opacity-70 grayscale">
        <div className="flex items-center text-[#4b5563]">
            <span className="font-bold text-[24px] sm:text-[28px]" style={{ fontFamily: 'Georgia, serif' }}>Booking</span>
            <span className="font-normal text-[24px] sm:text-[28px]" style={{ fontFamily: 'Georgia, serif' }}>.com</span>
        </div>
        <svg width="24" height="28" viewBox="0 0 814 1000" fill="#4b5563" xmlns="http://www.w3.org/2000/svg">
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-167.2-37.5c-62.2 0-109.3-57.2-155.5-127.7C46.7 657 0 541.3 0 430.1c0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.2zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z" />
        </svg>
        <div className="relative flex flex-col items-center">
            <span className="font-black italic text-[24px] sm:text-[28px] text-[#4b5563] tracking-widest leading-none mb-1">DHL</span>
            <div className="w-[110%] h-[3px] bg-[#4b5563]" />
            <div className="w-[110%] h-[1px] bg-[#4b5563] mt-[2px]" />
        </div>
        <div className="flex flex-col items-center relative mt-2">
            <span className="font-semibold text-[26px] sm:text-[30px] text-[#4b5563] tracking-tight leading-none">amazon</span>
            <svg width="70" height="12" viewBox="0 0 70 12" className="absolute -bottom-2.5 left-0">
                <path d="M2 6 Q35 14 68 6" stroke="#4b5563" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M62 3 L70 5.5 L62 9" fill="#4b5563" />
            </svg>
        </div>
        <div className="bg-[#4b5563] rounded-[2px] p-1.5 flex flex-col items-center justify-center w-[60px] h-[60px]">
            <span className="font-bold text-[8px] text-white tracking-widest text-center leading-[1.2]">AMERICAN<br />EXPRESS</span>
        </div>
        <div className="flex items-center text-[#4b5563]">
            <span className="font-semibold text-[22px] sm:text-[26px] tracking-tight">accenture</span>
        </div>
        <div className="flex items-center">
            <span className="font-bold text-[20px] sm:text-[22px] text-[#4b5563] tracking-widest leading-none">KPMG</span>
        </div>
    </div>
);

export default CompanyLogos;