import { useState } from 'react';
import type { KeyboardEvent } from 'react';

interface TagsInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, onChange }) => {
  const [input, setInput] = useState('');

  const addTag = (value: string) => {
    const tag = value.trim().toLowerCase();
    if (tag && !tags.includes(tag)) onChange([...tags, tag]);
    setInput('');
  };

  const removeTag = (tag: string) => onChange(tags.filter(t => t !== tag));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', ',', 'Tab'].includes(e.key)) {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  return (
    <div
      style={{
        border: '1px solid var(--clr-border-strong)',
        borderRadius: 'var(--radius-input)',
        padding: '6px 10px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        minHeight: 42,
        cursor: 'text',
        background: 'var(--clr-surface-subtle)',
      }}
      onClick={() => document.getElementById('tags-input')?.focus()}
    >
      {tags.map(tag => (
        <span key={tag} className="form-tag">
          {tag}
          <button type="button" className="form-tag__remove" onClick={() => removeTag(tag)}>
            <svg width="10" height="10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}
      <input
        id="tags-input"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKey}
        onBlur={() => { if (input.trim()) addTag(input); }}
        placeholder={tags.length === 0 ? 'Add tags (Enter or comma to add)…' : ''}
        style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.82rem', color: 'var(--clr-text-dark)', minWidth: 140, fontFamily: 'var(--font-primary)', flex: 1 }}
      />
    </div>
  );
};

export default TagsInput;
