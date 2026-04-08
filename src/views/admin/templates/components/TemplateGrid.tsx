import type { Template } from '@/types/template.types';
import TemplateCard from './TemplateCard';

interface Props {
  templates: Template[];
  onDelete:  (id: number) => void;
}

const TemplateGrid: React.FC<Props> = ({ templates, onDelete }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
    {templates.map(template => (
      <TemplateCard key={template.id} template={template} onDelete={onDelete} />
    ))}
  </div>
);

export default TemplateGrid;
