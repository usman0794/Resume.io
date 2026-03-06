import React from 'react';

export type LegalTab = 'withdrawal' | 'terms' | 'privacy';

interface LegalTabsProps {
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
}

const TABS: { id: LegalTab; label: string }[] = [
  { id: 'withdrawal', label: 'Right of Withdrawal' },
  { id: 'terms', label: 'Terms of Service' },
  { id: 'privacy', label: 'Privacy Policy' },
];

const LegalTabs: React.FC<LegalTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #e5e7eb',
        marginBottom: '40px',
        gap: '0',
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            style={{
              padding: '0 0 16px',
              margin: '0 24px',
              fontSize: '11px',
              fontWeight: 700,
              color: isActive ? '#1a91f0' : '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              border: 'none',
              borderBottom: isActive ? '2px solid #1a91f0' : '2px solid transparent',
              background: 'none',
              cursor: 'pointer',
              transition: 'color 0.15s ease, border-color 0.15s ease',
              whiteSpace: 'nowrap',
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#111827';
            }}
            onMouseLeave={(e) => {
              if (!isActive) (e.currentTarget as HTMLButtonElement).style.color = '#6b7280';
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default LegalTabs;
