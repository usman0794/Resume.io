import TagsInput from './TagsInput';

interface BlogFormData {
  title: string;
  body: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  focus_keyword: string;
  canonical_url: string;
  og_image_url: string;
}

interface BlogFormFieldsProps {
  formData: BlogFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTagsChange: (tags: string[]) => void;
}

const BlogFormFields: React.FC<BlogFormFieldsProps> = ({ formData, onChange, onTagsChange }) => {
  const wordCount = formData.body.trim() ? formData.body.trim().split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div>
      {/* Title */}
      <div className="form-field">
        <label className="form-label">
          Post Title <span className="form-label__req">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Write a compelling title…"
          className="form-input"
          style={{ fontSize: '1rem', fontWeight: 500 }}
        />
        <p className="form-hint">{formData.title.length} characters</p>
      </div>

      {/* Body */}
      <div className="form-field">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <label className="form-label">
            Content <span className="form-label__req">*</span>
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.72rem', color: 'var(--clr-text-faint)' }}>
            <span>{wordCount} words</span>
            <span style={{ width: 1, height: 10, background: 'var(--clr-border-strong)', display: 'inline-block' }} />
            <span>{readTime} min read</span>
          </div>
        </div>
        <p className="form-hint">
          Use <code style={{ background: 'var(--clr-surface-subtle)', padding: '1px 5px', borderRadius: 4 }}>## Heading</code> syntax — headings become TOC entries on the live post.
        </p>
        <textarea
          name="body"
          value={formData.body}
          onChange={onChange}
          placeholder={"## Introduction\n\nWrite your intro here...\n\n## Section One\n\nYour content..."}
          rows={20}
          className="form-input form-input--textarea"
          style={{ fontFamily: 'var(--font-mono)', lineHeight: 1.7, minHeight: 360 }}
        />
      </div>

      {/* Tags */}
      <div className="form-field" style={{ marginBottom: 0 }}>
        <label className="form-label">Tags</label>
        <p className="form-hint">Tag the post for discoverability.</p>
        <TagsInput tags={formData.tags} onChange={onTagsChange} />
      </div>
    </div>
  );
};

export { type BlogFormData };
export default BlogFormFields;
