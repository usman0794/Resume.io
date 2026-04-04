import React, { useRef, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploaderProps {
  preview : string | null;
  onFile  : (file: File) => void;
  onClear : () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ preview, onFile, onClear }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) onFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  if (preview) {
    return (
      <div className="imu-preview">
        <img src={preview} alt="Featured" className="imu-preview__img" />
        <button className="imu-preview__clear" onClick={onClear} aria-label="Remove image">
          <X size={14} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`imu-drop${dragging ? ' imu-drop--active' : ''}`}
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label="Upload featured image"
    >
      <UploadCloud size={28} className="imu-drop__icon" />
      <p className="imu-drop__text">Drag & drop or <span className="imu-drop__link">browse</span></p>
      <p className="imu-drop__hint">PNG, JPG, WebP up to 5 MB</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="imu-drop__input"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
};

export default ImageUploader;
