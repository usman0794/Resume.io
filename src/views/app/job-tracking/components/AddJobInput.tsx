/**
 * Component: AddJobInput
 *
 * Purpose:
 *   Inline "Enter a company name…" input with Continue + Cancel buttons.
 *   Appears inside a column when the "+ Add Job" button is clicked.
 *
 * Responsibilities:
 *   - Controlled text input for company name
 *   - Continue: fires onConfirm(companyName), resets input
 *   - Cancel: fires onCancel, resets input
 *   - Enter key triggers Continue; Escape triggers Cancel
 *
 * Design Intent:
 *   White card, 8px radius, 14px input text, blue Continue button,
 *   gray Cancel text button. Matches resume.io exactly.
 */

import React, { useState, useRef, useEffect } from 'react';

interface AddJobInputProps {
  onConfirm: (company: string) => void;
  onCancel: () => void;
}

const AddJobInput: React.FC<AddJobInputProps> = ({ onConfirm, onCancel }) => {
  const [company, setCompany] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleConfirm = () => {
    if (company.trim()) {
      onConfirm(company.trim());
      setCompany('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleConfirm();
    if (e.key === 'Escape') { setCompany(''); onCancel(); }
  };

  return (
    <div className="aji-wrap">
      <input
        ref={inputRef}
        type="text"
        className="aji-input"
        placeholder="Enter a company name..."
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Company name"
      />
      <div className="aji-actions">
        <button
          className="aji-confirm"
          onClick={handleConfirm}
          disabled={!company.trim()}
        >
          Continue
        </button>
        <button className="aji-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddJobInput;
