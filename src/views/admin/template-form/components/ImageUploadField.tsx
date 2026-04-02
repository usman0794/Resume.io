export interface ImageUploadFieldProps {
  preview: string | null;
  onFile: (file: File) => void;
  onClear: () => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ preview, onFile, onClear }) => (
  <div className="form-sidebar-card">
    <p className="form-sidebar-card__title">Thumbnail Image</p>

    {preview ? (
      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', marginBottom: 12 }}>
        <img src={preview} alt="Preview" style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
        <button
          type="button"
          onClick={onClear}
          style={{
            position: 'absolute', top: 8, right: 8,
            padding: 6, background: 'rgba(0,0,0,0.5)', color: '#fff',
            border: 'none', borderRadius: 6, cursor: 'pointer', lineHeight: 1,
          }}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    ) : (
      <div style={{
        border: '2px dashed var(--clr-border-strong)',
        borderRadius: 10, padding: 24, textAlign: 'center',
        marginBottom: 12, color: 'var(--clr-text-faint)',
        background: 'var(--clr-surface-subtle)',
      }}>
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ margin: '0 auto 6px' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p style={{ fontSize: '0.75rem', margin: 0 }}>No thumbnail set</p>
      </div>
    )}

    <label className="form-btn form-btn--ghost form-btn--full" style={{ cursor: 'pointer' }}>
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
      {preview ? 'Replace thumbnail' : 'Upload thumbnail'}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
        style={{ display: 'none' }}
      />
    </label>

    <p style={{ fontSize: '0.72rem', color: 'var(--clr-text-faint)', textAlign: 'center', marginTop: 8, marginBottom: 0 }}>
      PNG, JPG — shown in template picker
    </p>
  </div>
);

export default ImageUploadField;
