import { useRef } from 'react';

export type HtmlUploaderMode = 'file' | 'paste';

interface HtmlUploaderProps {
  htmlMode: HtmlUploaderMode;
  onModeChange: (mode: HtmlUploaderMode) => void;
  htmlContent: string;
  onHtmlContent: (v: string) => void;
  htmlFilename: string;
  onHtmlFile: (file: File) => void;
  isEdit: boolean;
}

const HtmlUploader: React.FC<HtmlUploaderProps> = ({
  htmlMode, onModeChange, htmlContent, onHtmlContent, htmlFilename, onHtmlFile, isEdit,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div className="form-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--clr-border)' }}>
        <p className="form-card__title" style={{ margin: 0, border: 0, padding: 0 }}>
          HTML Template {!isEdit && <span style={{ color: 'var(--clr-danger)' }}>*</span>}
        </p>
        <div style={{ display: 'flex', borderRadius: 8, border: '1px solid var(--clr-border-strong)', overflow: 'hidden' }}>
          {(['file', 'paste'] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onModeChange(m)}
              style={{
                padding: '5px 12px',
                fontSize: '0.78rem',
                fontWeight: 700,
                fontFamily: 'var(--font-primary)',
                cursor: 'pointer',
                border: 'none',
                background: htmlMode === m ? 'var(--clr-primary)' : 'transparent',
                color: htmlMode === m ? '#fff' : 'var(--clr-text-muted)',
                transition: 'var(--transition-fast)',
              }}
            >
              {m === 'file' ? '📁 Upload' : '✏️ Paste'}
            </button>
          ))}
        </div>
      </div>

      {htmlMode === 'file' ? (
        <label
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const f = e.dataTransfer.files?.[0];
            if (f) onHtmlFile(f);
          }}
          style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 12, padding: 32,
            border: '2px dashed var(--clr-border-strong)',
            borderRadius: 'var(--radius-card-inner)',
            cursor: 'pointer', background: 'var(--clr-surface-subtle)',
            transition: 'var(--transition-fast)',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--clr-primary)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--clr-border-strong)')}
        >
          {htmlFilename ? (
            <>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--clr-success-bg)', color: 'var(--clr-success)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--clr-text-body)', margin: 0 }}>{htmlFilename}</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', margin: 0 }}>Click to replace</p>
            </>
          ) : (
            <>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--clr-border)', color: 'var(--clr-text-faint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--clr-text-body)', margin: '0 0 2px' }}>
                  Drop HTML file or click to browse
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', margin: 0 }}>.html files only</p>
              </div>
              {isEdit && htmlContent && (
                <p style={{ fontSize: '0.75rem', color: 'var(--clr-primary)', fontWeight: 500, margin: 0 }}>
                  Current HTML loaded — upload to replace
                </p>
              )}
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".html,text/html"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onHtmlFile(f);
            }}
            style={{ display: 'none' }}
          />
        </label>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)', margin: 0 }}>Paste your full HTML markup below</p>
            <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-faint)' }}>{htmlContent.length.toLocaleString()} chars</span>
          </div>
          <textarea
            value={htmlContent}
            onChange={(e) => onHtmlContent(e.target.value)}
            placeholder={'<!DOCTYPE html>\n<html>\n  <head>...</head>\n  <body></body>\n</html>'}
            rows={14}
            className="form-input form-input--textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', minHeight: 280, lineHeight: 1.5 }}
          />
        </div>
      )}
    </div>
  );
};

export default HtmlUploader;
