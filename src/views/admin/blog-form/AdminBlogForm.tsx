import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/store';
import { createBlog, updateBlog, fetchBlogById } from '@/store/actions/blogActions';
import { ROUTES } from '@/routes/routePaths';
import BlogFormFields, { type BlogFormData } from './components/BlogFormFields';
import ImageUploader from './components/ImageUploader';

const EMPTY_FORM: BlogFormData = {
  title: '', body: '', tags: [],
  meta_title: '', meta_description: '', focus_keyword: '',
  canonical_url: '', og_image_url: '',
};

const AdminBlogForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mode = id ? 'edit' : 'create';

  const [formData, setFormData] = useState<BlogFormData>(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(mode === 'edit');
  const [seoOpen, setSeoOpen] = useState(false);

  useEffect(() => {
    if (mode !== 'edit' || !id) return;
    setFetchLoading(true);
    (dispatch(fetchBlogById(id)) as unknown as Promise<{ success: boolean; data?: any }>).then((result) => {
      const b = result?.data;
      if (result.success && b) {
        setFormData({
          title: b.title ?? '',
          body: b.content ?? b.body ?? '',
          tags: b.tags ?? [],
          meta_title: b.meta_title ?? '',
          meta_description: b.meta_description ?? '',
          focus_keyword: b.focus_keyword ?? '',
          canonical_url: b.canonical_url ?? '',
          og_image_url: b.og_image_url ?? '',
        });
        const rawImage = b.image ?? b.image_path ?? null;
        const resolvedPreview = rawImage
          ? (/^(blob:|https?:)/.test(rawImage) ? rawImage : `/assets/images/${rawImage.replace(/^\/+/, '')}`)
          : null;
        setPreview(resolvedPreview);
      } else {
        setError('Failed to load post.');
      }
      setFetchLoading(false);
    });
  }, [mode, id, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleImage = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearImage = () => { setPreview(null); setImageFile(null); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSubmitting(true);
    if (!formData.title.trim()) { setError('Title is required.'); setSubmitting(false); return; }
    if (!formData.body.trim())  { setError('Content is required.'); setSubmitting(false); return; }
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('body', formData.body);
      formData.tags.forEach(t => data.append('tags[]', t));
      if (imageFile) data.append('image', imageFile);
      ['meta_title','meta_description','focus_keyword','canonical_url','og_image_url'].forEach(k => {
        const v = (formData as unknown as Record<string,string>)[k];
        if (v) data.append(k, v);
      });

      const result: { success: boolean; message?: string; errors?: Record<string, string[]> } =
        mode === 'create'
          ? await dispatch(createBlog(data))
          : await dispatch(updateBlog(id!, data));

      if (result.success) {
        setSuccess(result.message ?? `Post ${mode === 'create' ? 'published' : 'updated'} successfully!`);
        setTimeout(() => navigate(ROUTES.ADMIN_BLOGS), 1400);
      } else {
        const msgs = result.errors
          ? Object.values(result.errors).flat().join(' ')
          : result.message || `Failed to ${mode} post.`;
        setError(msgs);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  // SEO score
  const seoScore = [
    formData.meta_title.trim().length > 0,
    formData.meta_description.trim().length > 0,
    formData.focus_keyword.trim().length > 0,
    formData.og_image_url.trim().length > 0 || preview !== null,
    formData.meta_title.length <= 70,
    formData.meta_description.length <= 160,
  ].filter(Boolean).length;
  const seoColor = seoScore >= 5 ? 'var(--clr-success)' : seoScore >= 3 ? 'var(--clr-warning)' : 'var(--clr-danger)';
  const seoBg    = seoScore >= 5 ? '#22c55e'            : seoScore >= 3 ? '#facc15'            : '#f87171';
  const seoLabel = seoScore >= 5 ? 'Good'               : seoScore >= 3 ? 'Needs work'         : 'Poor';

  if (fetchLoading)
    return (
      <div className="admin-form-page">
        <div className="form-loading">
          <div className="form-spin" />
          <p className="form-loading__text">Loading post…</p>
        </div>
      </div>
    );

  return (
    <div className="admin-form-page">
      {/* Header */}
      <div className="form-page-header">
        <button
          type="button"
          className="form-page-header__back"
          onClick={() => navigate(ROUTES.ADMIN_BLOGS)}
          aria-label="Go back"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span className="form-page-header__eyebrow">
            {mode === 'create' ? 'New Post' : 'Edit Post'}
          </span>
          <h1 className="form-page-header__title">
            {mode === 'create' ? 'New Blog Post' : 'Edit Blog Post'}
          </h1>
          <p className="form-page-header__sub">
            {mode === 'create' ? 'Write and publish a blog post' : 'Update your existing post'}
          </p>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="form-alert form-alert--error">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          {error}
        </div>
      )}
      {success && (
        <div className="form-alert form-alert--success">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: 2 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-two-col">
          {/* Main column */}
          <div>
            <div className="form-card">
              <p className="form-card__title">Post Content</p>
              <BlogFormFields
                formData={formData}
                onChange={handleChange}
                onTagsChange={tags => setFormData(p => ({ ...p, tags }))}
              />
            </div>

            {/* SEO accordion */}
            <div className="form-card" style={{ padding: 0, overflow: 'hidden' }}>
              <button
                type="button"
                onClick={() => setSeoOpen(v => !v)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', padding: '16px 24px',
                  background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: 'var(--font-primary)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <span key={i} style={{
                        width: 8, height: 8, borderRadius: '50%',
                        background: i < seoScore ? seoBg : 'var(--clr-border-strong)',
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--clr-text-dark)' }}>SEO Settings</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: seoColor }}>{seoLabel}</span>
                </div>
                <svg
                  style={{ width: 16, height: 16, color: 'var(--clr-text-faint)', transition: 'transform 0.2s', transform: seoOpen ? 'rotate(180deg)' : 'none' }}
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {seoOpen && (
                <div style={{ padding: '0 24px 24px', borderTop: '1px solid var(--clr-border)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {/* Google preview */}
                  <div style={{ padding: 14, background: 'var(--clr-surface-subtle)', border: '1px solid var(--clr-border-strong)', borderRadius: 10 }}>
                    <p style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--clr-text-faint)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 8px' }}>Google Preview</p>
                    <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--clr-primary)', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {formData.meta_title || formData.title || 'Post title will appear here'}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: 'var(--clr-success)', margin: '0 0 4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      https://yoursite.com/blog/your-post-slug
                    </p>
                    <p style={{ fontSize: '0.82rem', color: 'var(--clr-text-muted)', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {formData.meta_description || 'Meta description will appear here.'}
                    </p>
                  </div>

                  {/* Meta Title */}
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label className="form-label">Meta Title</label>
                      <span style={{ fontSize: '0.7rem', color: formData.meta_title.length > 70 ? 'var(--clr-danger)' : 'var(--clr-text-faint)' }}>
                        {formData.meta_title.length}/70
                      </span>
                    </div>
                    <p className="form-hint">Keep under 70 chars.</p>
                    <input type="text" name="meta_title" value={formData.meta_title} onChange={handleChange}
                      placeholder={formData.title || 'SEO-optimised title…'} className="form-input" />
                  </div>

                  {/* Meta Description */}
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label className="form-label">Meta Description</label>
                      <span style={{ fontSize: '0.7rem', color: formData.meta_description.length > 160 ? 'var(--clr-danger)' : 'var(--clr-text-faint)' }}>
                        {formData.meta_description.length}/160
                      </span>
                    </div>
                    <p className="form-hint">Keep under 160 chars.</p>
                    <textarea name="meta_description" value={formData.meta_description} onChange={handleChange}
                      placeholder="A short, enticing summary…" rows={3} className="form-input form-input--textarea"
                      style={{ minHeight: 72 }} />
                  </div>

                  {/* Focus keyword */}
                  <div className="form-field" style={{ marginBottom: 0 }}>
                    <label className="form-label">Focus Keyword</label>
                    <input type="text" name="focus_keyword" value={formData.focus_keyword} onChange={handleChange}
                      placeholder="e.g. how to write a resume" className="form-input" />
                  </div>

                  {/* Canonical + OG */}
                  <div className="form-field form-field--half" style={{ marginBottom: 0 }}>
                    <div>
                      <label className="form-label">Canonical URL</label>
                      <input type="url" name="canonical_url" value={formData.canonical_url} onChange={handleChange}
                        placeholder="https://…" className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">OG Image URL</label>
                      <input type="url" name="og_image_url" value={formData.og_image_url} onChange={handleChange}
                        placeholder="https://…" className="form-input" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="form-sidebar-card">
              <p className="form-sidebar-card__title">Publish</p>
              <button
                type="submit"
                disabled={submitting}
                className="form-btn form-btn--primary form-btn--full"
              >
                {submitting && <span className="btn-spinner" />}
                {submitting
                  ? (mode === 'create' ? 'Publishing…' : 'Saving…')
                  : mode === 'create' ? 'Publish Post' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_BLOGS)}
                className="form-btn form-btn--ghost form-btn--full"
              >
                Discard
              </button>
            </div>

            <div className="form-sidebar-card">
              <p className="form-sidebar-card__title">Featured Image</p>
              <ImageUploader preview={preview} onFile={handleImage} onClear={clearImage} />
            </div>

            <div className="form-tips-card">
              <p className="form-tips-card__title">Writing Tips</p>
              <ul className="form-tips-card__list">
                {[
                  'Use ## Heading to create TOC sections',
                  'Include your focus keyword in title & first paragraph',
                  'Aim for 300–800 words for best readability',
                  'Fill in SEO settings before publishing',
                ].map(tip => (
                  <li key={tip} className="form-tips-card__item">
                    <span className="form-tips-card__dot">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
