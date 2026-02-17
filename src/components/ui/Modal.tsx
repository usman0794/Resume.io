import type { ReactNode } from 'react';
import Button from './Button';

interface ModalProps {
  title:      string;
  body:       string;
  onConfirm:  () => void;
  onCancel:   () => void;
  loading?:   boolean;
  iconVariant?: 'danger' | 'warning';
  confirmLabel?: string;
  confirmVariant?: 'danger' | 'primary';
  icon?:      ReactNode;
}

const TrashIcon = () => (
  <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const Modal = ({
  title, body, onConfirm, onCancel, loading = false,
  iconVariant = 'danger',
  confirmLabel = 'Delete',
  confirmVariant = 'danger',
  icon,
}: ModalProps) => (
  <div className="modal-overlay">
    <div className="modal-dialog">
      <div className={`modal-dialog__icon modal-dialog__icon--${iconVariant}`}>
        {icon ?? <TrashIcon />}
      </div>
      <h3 className="modal-dialog__title">{title}</h3>
      <p className="modal-dialog__body">{body}</p>
      <div className="modal-dialog__actions">
        <Button variant="ghost" onClick={onCancel} disabled={loading}
          style={{ flex: 1, justifyContent: 'center' }}>
          Cancel
        </Button>
        <Button variant={confirmVariant} onClick={onConfirm} loading={loading}
          style={{ flex: 1, justifyContent: 'center' }}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  </div>
);

export default Modal;
