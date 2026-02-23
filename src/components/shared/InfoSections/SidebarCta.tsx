import React from 'react';

interface SidebarCtaProps {
  heading?: string;
  description?: string;
  btnText?: string;
  btnHref?: string;
  imageUrl?: string;
}

const SidebarCta: React.FC<SidebarCtaProps> = ({
  heading = 'Build your resume in\n15 minutes',
  description = "Use professional field-tested resume templates that follow the exact 'resume rules' employers look for.",
  btnText = 'Create my resume',
  btnHref = '#',
  imageUrl = '/assets/images/misc/cta-banner-illustration.png',
}) => {
  return (
    <div className="bg-[#f4f2f0] flex flex-col pt-8 rounded-[8px] overflow-hidden">
      <div className="px-8 flex justify-center mb-6 h-[160px] relative items-end">
        <div
          className="w-[85%] h-full bg-cover bg-bottom bg-no-repeat"
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
      </div>

      <div className="px-8 text-center mb-8">
        <h3 className="text-[20px] font-bold text-[#1a1c29] mb-3 leading-[1.3]">
          {heading.split('\n').map((line, i) => (
            <React.Fragment key={i}>{line}{i < heading.split('\n').length - 1 && <br />}</React.Fragment>
          ))}
        </h3>
        <p className="text-[13px] text-[#505463] leading-[1.6] m-0">{description}</p>
      </div>

      <a
        href={btnHref}
        className="bg-[#1a1c29] text-white py-4 px-6 flex justify-between items-center w-full font-bold hover:bg-[#323650] transition-colors no-underline"
      >
        <span className="text-[15px]">{btnText}</span>
        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 0 24 24" width="22" className="fill-current">
          <path d="m9.43164 7.25696 1.35146-1.47431 5.8931 5.48015c.4324.3964.4324 1.078 0 1.4744l-5.8931 5.449-1.35146-1.4743 5.08896-4.7119z" />
        </svg>
      </a>
    </div>
  );
};

export default SidebarCta;
