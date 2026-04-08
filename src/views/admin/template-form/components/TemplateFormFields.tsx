import type React from 'react';

const LAYOUT_OPTIONS = [
  { value: 'two-column', label: 'Two Column', hint: 'Sidebar + main content' },
  { value: 'one-column', label: 'One Column', hint: 'Full-width single stream' },
] as const;

const SUGGESTED_TAGS = [
  'modern', 'classic', 'minimal', 'creative', 'professional',
  'academic', 'executive', 'simple',
] as const;

export interface TemplateFormData {
  name: string;
  default_layout: string;
  tags: string[];
  is_active: boolean;
}

export interface TemplateFormFieldsProps {
  form: TemplateFormData;
  tagInput: string;
  onTagInput: (v: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

const TemplateFormFields: React.FC<TemplateFormFieldsProps> = ({
  form,
  tagInput,
  onTagInput,
  onChange,
  onAddTag,
  onRemoveTag,
}) => (
  <div className="form-card">
    <p className="form-card__title">Basic Information</p>

    {/* Name */}
    <div className="form-field">
      <label className="form-label">
        Template Name <span className="form-label__req">*</span>
      </label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="e.g. Executive Split"
        className="form-input"
      />
    </div>

    {/* Layout */}
    <div className="form-field">
      <label className="form-label">Default Layout</label>
      <div className="form-radio-grid">
        {LAYOUT_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`form-radio-card${form.default_layout === opt.value ? ' form-radio-card--selected' : ''}`}
          >
            <input
              type="radio"
              name="default_layout"
              value={opt.value}
              checked={form.default_layout === opt.value}
              onChange={onChange}
              style={{ accentColor: 'var(--clr-primary)' }}
            />
            <div>
              <p className="form-radio-card__title">{opt.label}</p>
              <p className="form-radio-card__hint">{opt.hint}</p>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Tags */}
    <div className="form-field" style={{ marginBottom: 0 }}>
      <label className="form-label">Tags</label>
      <p className="form-hint">Press Enter or comma to add. Helps categorise templates.</p>

      {form.tags.length > 0 && (
        <div className="form-tag-list" style={{ marginTop: 8 }}>
          {form.tags.map((tag) => (
            <span key={tag} className="form-tag">
              {tag}
              <button type="button" className="form-tag__remove" onClick={() => onRemoveTag(tag)}>
                <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
        </div>
      )}

      <input
        type="text"
        value={tagInput}
        onChange={(e) => onTagInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            onAddTag(tagInput);
          }
        }}
        placeholder="Type a tag and press Enter…"
        className="form-input"
        style={{ marginTop: 8 }}
      />

      <div className="form-tag-suggestions">
        {SUGGESTED_TAGS.filter((t) => !form.tags.includes(t)).map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onAddTag(tag)}
            className="form-tag-suggestion"
          >
            + {tag}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default TemplateFormFields;
