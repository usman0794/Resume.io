import React, { useState } from 'react';
import type { LegalTab } from './LegalTabs';

interface MobileLegalNavProps {
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
}

const TABS: { id: LegalTab; label: string }[] = [
  { id: 'withdrawal', label: 'Right of Withdrawal' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'privacy', label: 'Privacy Policy' },
];

const ChevronIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    style={{
      width: '18px',
      height: '18px',
      color: '#1a91f0',
      transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
      flexShrink: 0,
    }}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const MobileLegalNav: React.FC<MobileLegalNavProps> = ({ activeTab, onTabChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeLabel = TABS.find((t) => t.id === activeTab)?.label ?? '';

  const handleSelect = (tab: LegalTab) => {
    onTabChange(tab);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', marginBottom: '32px' }}>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          borderBottom: '1px solid #e5e7eb',
          cursor: 'pointer',
          padding: '0 0 12px',
        }}
      >
        <span
          style={{
            fontWeight: 700,
            fontSize: '11px',
            color: '#111827',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontFamily: 'inherit',
          }}
        >
          {activeLabel}
        </span>
        <ChevronIcon open={isOpen} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#fff',
            border: '1px solid #e5e7eb',
            borderTop: 'none',
            zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {TABS.filter((t) => t.id !== activeTab).map((tab) => (
            <button
              key={tab.id}
              role="option"
              aria-selected={false}
              onClick={() => handleSelect(tab.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                fontSize: '11px',
                fontWeight: 700,
                color: '#6b7280',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #f3f4f6',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = '#f9fafb';
                (e.currentTarget as HTMLButtonElement).style.color = '#111827';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = 'none';
                (e.currentTarget as HTMLButtonElement).style.color = '#6b7280';
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileLegalNav;
