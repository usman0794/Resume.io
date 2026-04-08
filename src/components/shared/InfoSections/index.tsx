import React from 'react';
import SidebarCta from './SidebarCta';
import WideCtaBanner from './WideCtaBanner';

export interface InfoSectionsBulletItem {
  label: string;
  labelHref?: string;
  text: React.ReactNode;
}

export interface InfoSectionsRelatedExample {
  tag?: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href?: string;
}

export interface InfoSectionsCategory {
  heading: string;
  description: React.ReactNode;
  relatedExample?: InfoSectionsRelatedExample;
}

export interface InfoSectionsProps {
  mainHeading?: string;
  mainDescription?: React.ReactNode;
  bulletItems?: InfoSectionsBulletItem[];
  videoThumbnailUrl?: string;
  videoThumbnailAlt?: string;
  categories?: InfoSectionsCategory[];
  closingHeading?: string;
  closingDescription?: React.ReactNode;
  closingList?: React.ReactNode[];
  sidebarCtaProps?: React.ComponentProps<typeof SidebarCta>;
  wideCtaBannerProps?: React.ComponentProps<typeof WideCtaBanner>;
}

const InfoSections: React.FC<InfoSectionsProps> = ({
  mainHeading = 'Why use our free resume templates?',
  mainDescription,
  bulletItems = [],
  videoThumbnailUrl = '/assets/images/misc/video-thumbnail-placeholder.jpg',
  videoThumbnailAlt = 'Video thumbnail',
  categories = [],
  closingHeading = 'What makes the best resume template?',
  closingDescription,
  closingList = [],
  sidebarCtaProps,
  wideCtaBannerProps,
}) => {
  return (
    <div className="font-sans text-[#505463] max-w-[1140px] mx-auto px-5 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative">

        {/* Left Column */}
        <div className="flex-1 min-w-0">

          {/* Main Heading */}
          <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1a1c29] mb-5 leading-[1.2]">
            {mainHeading}
          </h2>

          {mainDescription && (
            <div className="text-[17px] leading-[1.7] mb-6">{mainDescription}</div>
          )}

          {/* Bullet Items */}
          {bulletItems.length > 0 && (
            <ul className="list-none pl-0 space-y-4 mb-10 text-[17px] leading-[1.7]">
              {bulletItems.map((item, i) => (
                <li key={i} className="relative pl-6">
                  <span className="absolute left-0 top-[11px] w-[5px] h-[5px] rounded-full bg-[#1a88ff]" />
                  {item.labelHref ? (
                    <a href={item.labelHref} className="text-[#1a88ff] font-bold no-underline hover:underline transition-all">
                      {item.label}
                    </a>
                  ) : (
                    <strong className="text-[#1a1c29] font-bold">{item.label} </strong>
                  )}
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {/* Video */}
          {videoThumbnailUrl && (
            <figure className="mb-12 rounded-[4px] overflow-hidden border border-gray-200">
              <div className="relative pb-[56.25%] bg-[#000] group cursor-pointer">
                <img
                  src={videoThumbnailUrl}
                  alt={videoThumbnailAlt}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-300 group-hover:brightness-75"
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[48px] bg-[url('/assets/images/misc/youtube-icon.png')] bg-no-repeat bg-center z-10" />
              </div>
            </figure>
          )}

          {/* Categories */}
          {categories.map((cat, i) => (
            <div key={i}>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1a1c29] mb-5 leading-[1.2]">
                {cat.heading}
              </h2>
              <div className="text-[17px] leading-[1.7] mb-8">{cat.description}</div>
              {cat.relatedExample && (
                <a
                  href={cat.relatedExample.href || '#'}
                  className="flex flex-col sm:flex-row bg-[#f2f5f9] rounded-lg overflow-hidden mt-6 mb-12 no-underline text-inherit hover:opacity-90 transition-opacity duration-200 group"
                >
                  <div className="p-8 sm:p-10 flex-1 flex flex-col justify-center">
                    {cat.relatedExample.tag && (
                      <div className="text-[11px] font-bold tracking-[0.15em] text-[#828ba2] uppercase mb-2.5">
                        {cat.relatedExample.tag}
                      </div>
                    )}
                    <div className="text-[20px] font-bold text-[#1a1c29] mb-3 group-hover:text-[#1a88ff] transition-colors">
                      {cat.relatedExample.title}
                    </div>
                    <p className="text-[15px] leading-[1.6] text-[#505463] m-0">
                      {cat.relatedExample.description}
                    </p>
                  </div>
                  <div className="w-full sm:w-[300px] shrink-0 flex items-center justify-center p-8 bg-[#f2f5f9]">
                    <img
                      src={cat.relatedExample.imageUrl}
                      alt={cat.relatedExample.imageAlt}
                      className="max-w-full h-auto shadow-[0_2px_12px_rgba(0,0,0,0.06)] rounded-sm"
                    />
                  </div>
                </a>
              )}
            </div>
          ))}

          {/* Closing Section */}
          {closingHeading && (
            <>
              <h2 className="text-[28px] lg:text-[32px] font-bold text-[#1a1c29] mb-5 leading-[1.2]">
                {closingHeading}
              </h2>
              {closingDescription && (
                <div className="text-[17px] leading-[1.7] mb-8">{closingDescription}</div>
              )}
              {closingList.length > 0 && (
                <ol className="list-decimal pl-5 space-y-4 mb-12 text-[17px] leading-[1.7] marker:text-[#1a1c29] marker:font-bold">
                  {closingList.map((item, i) => (
                    <li key={i} className="pl-2">{item}</li>
                  ))}
                </ol>
              )}
            </>
          )}

        </div>

        {/* Right Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0 relative hidden lg:block">
          <div className="sticky top-[120px]">
            <SidebarCta {...sidebarCtaProps} />
          </div>
        </div>

      </div>

      {/* Bottom Wide Banner */}
      <div className="mt-5 pt-7">
        <WideCtaBanner {...wideCtaBannerProps} />
      </div>
    </div>
  );
};

export default InfoSections;
