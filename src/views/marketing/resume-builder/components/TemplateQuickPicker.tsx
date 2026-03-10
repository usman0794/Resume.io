import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/store';
import { setSelectedTemplate } from '@/store/actions/resumeActions';
import { ROUTES } from '@/routes/routePaths';

interface Template {
  id: number;
  name: string;
  image_url?: string;
  default_layout?: 'one-column' | 'two-column';
}

interface TemplateCardProps {
  template: Template;
  onSelect: () => void;
}

const TemplateCard: React.FC<TemplateCardProps> = ({ template, onSelect }) => (
  <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-500">
    <div className="relative aspect-[3/4] bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center overflow-hidden">
      <img
        src={template.image_url || 'https://s3.resume.io/cdn-cgi/image/width=380,format=auto/uploads/local_template_image/image/488/persistent-resource/dublin-resume-templates.jpg'}
        alt={template.name || 'Resume Template'}
        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button
          onClick={onSelect}
          className="bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-2xl transition-all duration-300 transform translate-y-8 group-hover:translate-y-0 hover:bg-blue-700 hover:scale-105 active:scale-95"
        >
          Use this template
        </button>
      </div>
    </div>
    <div className="p-5 flex items-center justify-between bg-white dark:bg-gray-900">
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-bold text-gray-900 dark:text-white truncate tracking-tight">
          {template.name || 'Untitled Template'}
        </p>
        <div className="h-1 w-8 bg-blue-500 rounded-full mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded">
        {template.default_layout === 'two-column' ? '2-COL' : '1-COL'}
      </span>
    </div>
  </div>
);

const TemplateQuickPicker: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const templates = useAppSelector((s) => s.resumeReducer.home?.templates ?? []);

  const handleSelect = (template: Template) => {
    dispatch(setSelectedTemplate(template));
    navigate(ROUTES.RESUME_BUILDER);
  };

  if (!templates.length) return null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {(templates.slice(0, 3) as Template[]).map((template, index) => (
          <TemplateCard
            key={template.id ?? index}
            template={template}
            onSelect={() => handleSelect(template)}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplateQuickPicker;
