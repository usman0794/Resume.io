import type { AppDispatch } from '@/store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/routes/routePaths';
import { createTemplate, updateTemplate } from '@/store/actions/templateActions';
import templateService from '@/services/templateService';

import TemplateFormFields, { type TemplateFormData } from './components/TemplateFormFields';
import HtmlUploader from './components/HtmlUploader';
import ImageUploadField from './components/ImageUploadField';

const INITIAL: TemplateFormData = {
  name: '',
  default_layout: 'two-column',
  tags: [],
  is_active: true,
};

const AdminTemplateForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const mode = id ? 'edit' : 'create';

  const [formData, setFormData] = useState<TemplateFormData>(INITIAL);
  const [tagInput, setTagInput] = useState('');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [htmlFile, setHtmlFile] = useState<File | null>(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [htmlMode, setHtmlMode] = useState<'file' | 'paste'>('file');
  const [htmlFilename, setHtmlFilename] = useState('');

  const [fetchLoading, setFetchLoading] = useState(mode === 'edit');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (mode !== 'edit' || !id) return;
    setFetchLoading(true);
    templateService.getTemplateById(id).then((t) => {
      setFormData({
        name: t.name ?? '',
        default_layout: t.default_layout ?? 'two-column',
        tags: t.tags ?? [],
        is_active: t.is_active ?? true,
      });
      setImagePreview(t.image_url ?? null);
      setHtmlContent(t.html ?? '<div>Mock HTML</div>');
      setHtmlMode('paste');
      setFetchLoading(false);
    });
  }, [mode, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImage = (file: File) => {
    setImageFile(file);
    const r = new FileReader();
    r.onloadend = () => setImagePreview(r.result as string);
    r.readAsDataURL(file);
  };

  const handleHtmlFile = (file: File) => {
    setHtmlFile(file);
    setHtmlFilename(file.name);
    const r = new FileReader();
    r.onloadend = () => setHtmlContent(r.result as string);
    r.readAsText(file);
  };

  const addTag = (tag: string) => {
    const clean = tag.trim().toLowerCase();
    if (!clean || formData.tags.includes(clean)) return;
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, clean] }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim()) {
      setError('Template name is required.');
      return;
    }

    if (mode === 'create' && !htmlContent.trim() && !htmlFile) {
      setError('HTML template is required. Upload a file or paste the HTML.');
      return;
    }

    setSubmitting(true);
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('default_layout', formData.default_layout);
      data.append('is_active', formData.is_active ? '1' : '0');
      data.append('tags', JSON.stringify(formData.tags));

      if (imageFile) data.append('image', imageFile);

      if (htmlFile && htmlMode === 'file') {
        data.append('html_file', htmlFile);
      } else if (htmlContent.trim()) {
        const blob = new Blob([htmlContent], { type: 'text/html' });
        data.append('html_file', blob, 'template.html');
      }

      const result: { success: boolean; message?: string } =
        mode === 'create'
          ? await dispatch(createTemplate(data))
          : await dispatch(updateTemplate(id!, data));

      if (result.success) {
        setSuccess(result.message ?? `Template ${mode === 'create' ? 'created' : 'updated'} successfully!`);
        setTimeout(() => navigate(ROUTES.ADMIN_TEMPLATES), 1400);
      } else {
        setError(result.message ?? 'Something went wrong.');
      }
      setSubmitting(false);

    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
      setSubmitting(false);
    }
  };

  if (fetchLoading)
    return (
      <div className="admin-form-page">
        <div className="form-loading">
          <div className="form-spin" />
          <p className="form-loading__text">Loading template…</p>
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
          onClick={() => navigate(ROUTES.ADMIN_TEMPLATES)}
          aria-label="Go back"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <span className="form-page-header__eyebrow">
            {mode === 'create' ? 'New Template' : 'Edit Template'}
          </span>
          <h1 className="form-page-header__title">
            {mode === 'create' ? 'Add Template' : 'Edit Template'}
          </h1>
          <p className="form-page-header__sub">
            {mode === 'create' ? 'Upload a new resume template' : 'Update template details'}
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
            <TemplateFormFields
              form={formData}
              tagInput={tagInput}
              onTagInput={setTagInput}
              onChange={handleChange}
              onAddTag={addTag}
              onRemoveTag={removeTag}
            />
            <HtmlUploader
              htmlMode={htmlMode}
              onModeChange={setHtmlMode}
              htmlContent={htmlContent}
              onHtmlContent={setHtmlContent}
              htmlFilename={htmlFilename}
              onHtmlFile={handleHtmlFile}
              isEdit={mode === 'edit'}
            />
          </div>

          {/* Sidebar */}
          <div>
            <div className="form-sidebar-card">
              <p className="form-sidebar-card__title">Publish</p>

              <div className="form-toggle">
                <div>
                  <p className="form-toggle__label">Active</p>
                  <p className="form-toggle__hint">Visible in template picker</p>
                </div>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, is_active: !p.is_active }))}
                  className={`form-toggle__track${formData.is_active ? ' form-toggle__track--on' : ''}`}
                  role="switch"
                  aria-checked={formData.is_active}
                >
                  <span className={`form-toggle__thumb${formData.is_active ? ' form-toggle__thumb--on' : ''}`} />
                </button>
              </div>

              <div style={{ marginTop: 16 }}>
                <button
                  type="submit"
                  disabled={submitting}
                  className="form-btn form-btn--primary form-btn--full"
                >
                  {submitting && <span className="btn-spinner" />}
                  {submitting
                    ? (mode === 'create' ? 'Creating…' : 'Saving…')
                    : mode === 'create' ? 'Create Template' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(ROUTES.ADMIN_TEMPLATES)}
                  className="form-btn form-btn--ghost form-btn--full"
                >
                  Discard
                </button>
              </div>
            </div>

            <ImageUploadField
              preview={imagePreview}
              onFile={handleImage}
              onClear={() => {
                setImagePreview(null);
                setImageFile(null);
              }}
            />

            <div className="form-tips-card">
              <p className="form-tips-card__title">Template Tips</p>
              <ul className="form-tips-card__list">
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Use <code style={{ background: 'var(--clr-primary-bg)', padding: '1px 5px', borderRadius: 4 }}>{'{{placeholder}}'}</code> for dynamic fields
                </li>
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Inline all CSS — no external stylesheets
                </li>
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Use A4 dimensions (210 × 297 mm)
                </li>
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Upload a thumbnail so users can preview it
                </li>
                <li className="form-tips-card__item">
                  <span className="form-tips-card__dot">•</span>
                  Mark inactive to hide during development
                </li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminTemplateForm;
