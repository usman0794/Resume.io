import React from 'react';
import type { Template } from '@/types/template.types';
import { Badge, Button } from '@/components/ui';

const LAYOUT_BADGE: Record<string, 'purple' | 'success'> = {
  'two-column': 'purple',
  'one-column': 'success',
};

interface Props {
  template: Template;
  onDelete: (id: number) => void;
}

const TemplateCard: React.FC<Props> = ({ template, onDelete }) => {
  const badgeVariant = template.default_layout
    ? (LAYOUT_BADGE[template.default_layout] ?? 'neutral')
    : null;

  const rawSrc = template.image_url || template.image_path || template.image || '';
  const thumbSrc = rawSrc
    ? (/^(blob:|https?:)/.test(rawSrc) ? rawSrc : `/assets/images/${rawSrc.split('/').pop()}`)
    : '';

  return (
    <div className="card template-card">
      {/* Thumbnail */}
      <div className="template-card__thumb">
        {thumbSrc ? (
          <img
            src={thumbSrc}
            alt={template.name}
            className="template-card__img"
          />
        ) : (
          <div className="template-card__no-thumb">
            <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2}
                d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
            </svg>
            <span>No thumbnail</span>
          </div>
        )}
        <Badge variant={template.is_active !== false ? 'success' : 'neutral'}
          className="template-card__status-badge">
          {template.is_active !== false ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {/* Body */}
      <div className="template-card__body">
        <div className="template-card__header">
          <h3 className="template-card__title">{template.name}</h3>
          {badgeVariant && template.default_layout && (
            <Badge variant={badgeVariant as 'purple' | 'success'}>
              {template.default_layout === 'two-column' ? 'Two Column' : 'One Column'}
            </Badge>
          )}
        </div>

        {(template.tags?.length ?? 0) > 0 && (
          <div className="template-card__tags">
            {template.tags!.map(tag => (
              <Badge key={tag} variant="primary">{tag}</Badge>
            ))}
          </div>
        )}

        <div className="template-card__html-status">
          <div className={`template-card__html-dot${template.html ? '' : ' template-card__html-dot--missing'}`} />
          <span>{template.html ? 'HTML template attached' : 'No HTML uploaded'}</span>
        </div>

        <div className="template-card__actions">
          <Button variant="ghost" to={`/admin/templates/${template.id}`}
            size="sm" style={{ flex: 1, justifyContent: 'center' }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </Button>
          <Button variant="ghost" onClick={() => onDelete(template.id)}
            size="sm" style={{ flex: 1, justifyContent: 'center', color: 'var(--clr-danger)' }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateCard;
