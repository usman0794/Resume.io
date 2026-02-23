import React from 'react';

interface WideCtaBannerProps {
  heading?: string;
  description?: string;
  btnText?: string;
  btnHref?: string;
  imageUrl?: string;
}

const WideCtaBanner: React.FC<WideCtaBannerProps> = ({
  heading = 'Build your resume in 15 minutes',
  description = "Use professional field-tested resume templates that follow the exact 'resume rules' employers look for.",
  btnText = 'Create my resume',
  btnHref = '#',
  imageUrl = '/assets/images/misc/cta-banner-illustration.png',
}) => {
  return (
    <div className="bg-[#f4f2f0] flex flex-col md:flex-row items-center rounded-[8px] overflow-hidden">
      <div
        className="w-full md:w-[320px] h-[100px] md:h-auto self-stretch flex justify-center items-center relative bg-cover bg-center"
        style={{ backgroundImage: `url('${imageUrl}')` }}
      />

      <div className="flex-1 p-8 md:pl-10 text-center md:text-left flex flex-col justify-center">
        <h3 className="text-[22px] font-bold text-[#1a1c29] mb-2.5 leading-tight">{heading}</h3>
        <p className="text-[15px] text-[#505463] leading-relaxed max-w-[550px] m-0">{description}</p>
      </div>

      <div className="w-full md:w-auto p-8 md:p-10 pt-0 md:pt-10 flex items-center justify-center">
        <a
          href={btnHref}
          className="bg-[#1a1c29] text-white py-[14px] px-8 rounded flex justify-center items-center font-bold hover:bg-[#323650] transition-colors no-underline whitespace-nowrap text-[15px]"
        >
          {btnText}
          <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20" className="fill-current ml-2.5">
            <path d="m9.43164 7.25696 1.35146-1.47431 5.8931 5.48015c.4324.3964.4324 1.078 0 1.4744l-5.8931 5.449-1.35146-1.4743 5.08896-4.7119z" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default WideCtaBanner;
