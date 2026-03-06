import React from 'react';

export interface IndexEntry {
  letter?: string;
  number?: string;
  title: string;
  href?: string;
  children?: IndexEntry[];
}

interface PolicyIndexProps {
  entries: IndexEntry[];
}

const PolicyIndex: React.FC<PolicyIndexProps> = ({ entries }) => (
  <div style={{ marginBottom: '28px' }}>
    {entries.map((entry, i) => (
      <div key={i} style={{ marginBottom: '10px' }}>
        <IndexLink entry={entry} level={0} />
        {entry.children && (
          <div style={{ paddingLeft: '24px', marginTop: '4px' }}>
            {entry.children.map((child, j) => (
              <IndexLink key={j} entry={child} level={1} />
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

const IndexLink: React.FC<{ entry: IndexEntry; level: number }> = ({ entry, level }) => {
  const prefix = entry.letter
    ? `${entry.letter}. `
    : entry.number
    ? `${entry.number}. `
    : '';

  const content = (
    <span
      style={{
        fontSize: '14px',
        fontWeight: level === 0 ? 700 : 400,
        color: level === 0 ? '#111827' : '#374151',
        display: 'block',
        lineHeight: '1.6',
        margin: level === 1 ? '2px 0' : '0',
      }}
    >
      {prefix}{entry.title}
    </span>
  );

  if (entry.href) {
    return (
      <a
        href={entry.href}
        style={{ textDecoration: 'none', color: 'inherit' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a91f0')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = 'inherit')}
      >
        {content}
      </a>
    );
  }

  return content;
};

export default PolicyIndex;
