import React from 'react';

const TemplateFanVisual: React.FC = () => (
    <div className="w-full lg:w-1/2 relative h-[350px] sm:h-[450px] lg:h-[500px] flex items-center justify-center perspective-1000">
        <div className="relative w-full max-w-[400px] h-full flex items-center justify-center">

            {/* Back Card */}
            <div
                className="absolute w-[220px] sm:w-[280px] rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.15)] overflow-hidden transition-transform duration-500 hover:-translate-y-4 z-10"
                style={{ transform: 'rotate(-16deg) translateX(-15%) translateY(10%)', transformOrigin: 'center center' }}
            >
                <img
                    src="https://s3.resume.io/cdn-cgi/image/width=300,dpr=1,format=auto/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg?v=1651663693"
                    alt="Professional Resume Template - Dublin"
                    className="w-full h-auto block"
                />
            </div>

            {/* Middle Card */}
            <div
                className="absolute w-[220px] sm:w-[280px] rounded-lg shadow-[0_15px_35px_rgba(0,0,0,0.12)] overflow-hidden transition-transform duration-500 hover:-translate-y-4 z-20"
                style={{ transform: 'rotate(-6deg) translateX(-2%) translateY(2%)', transformOrigin: 'center center' }}
            >
                <img
                    src="https://s3.resume.io/cdn-cgi/image/width=300,dpr=1,format=auto/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg?v=1656506913"
                    alt="Professional Resume Template - Stockholm"
                    className="w-full h-auto block"
                />
            </div>

            {/* Front Card */}
            <div
                className="absolute w-[220px] sm:w-[280px] bg-white rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.18)] overflow-hidden transition-transform duration-500 hover:-translate-y-4 z-30 border border-slate-100"
                style={{ transform: 'rotate(6deg) translateX(15%) translateY(-5%)', transformOrigin: 'center center' }}
            >
                <img
                    src="https://resume.io/cdn-cgi/image/width=300,dpr=1,format=auto/assets/templates/amsterdam-4d95083c.jpg"
                    alt="Professional Resume Template - Amsterdam"
                    className="w-full h-auto block"
                    onError={(e) => {
                        e.currentTarget.src = 'https://s3.resume.io/cdn-cgi/image/width=300,dpr=1,format=auto/uploads/local_template_image/image/370/persistent-resource/stockholm-resume-templates.jpg?v=1656506913';
                    }}
                />
            </div>

        </div>
    </div>
);

export default TemplateFanVisual;
