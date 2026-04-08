import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export type FAQData = {
  question: string;
  answer: React.ReactNode;
};

type FAQSectionProps = {
  faqs: FAQData[];
};

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  // Pehla question default open rakhne ke liye 0 set kiya hai (original site ki tarah)
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-white py-10 sm:py-14 lg:py-16 px-4 sm:px-8 md:px-12 lg:px-16 font-sans">
      <div className=" mx-auto">
        {/* Heading */}
        <h2 className="text-[24px] sm:text-[28px] md:text-[36px] font-medium text-slate-900 text-center mb-8 sm:mb-10 tracking-tight">
          Frequently Asked Questions
        </h2>

        {/* Accordion List */}
        <div className="flex flex-col border-t border-slate-200">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-slate-200">
                <button
                  onClick={() => toggle(i)}
                  className="flex items-center justify-between w-full py-6 text-left gap-4 group"
                >
                  <span className="text-[15px] md:text-[16px] text-slate-800 transition-colors group-hover:text-[#1a91f0] font-medium">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 text-[#1a91f0] flex-shrink-0 transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    strokeWidth={2.2}
                  />
                </button>

                {/* Answer with smooth height transition */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-[500px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-[14px] md:text-[15px] text-slate-500 leading-[1.7] pr-4 md:pr-12">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Notes (Centered just like the screenshots) */}
        <div className="mt-10 flex flex-col gap-2 text-[13px] md:text-[14px] text-slate-500 text-center">
          <p>
            Can't find what you need yet? —{' '}
            <Link to="/faq" className="text-[#1a91f0] hover:underline">
              View our customer support articles
            </Link>
          </p>
          <p>
            Need more career advice? —{' '}
            <Link to="/blog" className="text-[#1a91f0] hover:underline">
              View our career resources
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

