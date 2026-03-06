import React from 'react';

interface PolicyListItem {
  label: string;
  content: string;
}

interface PolicyListProps {
  items: PolicyListItem[];
  /** Use 'ol' for ordered (numbered) list, 'ul' for unordered. Defaults to 'ul'. */
  ordered?: boolean;
}

const PolicyList: React.FC<PolicyListProps> = ({ items, ordered = false }) => {
  const Tag = ordered ? 'ol' : 'ul';

  return (
    <Tag
      style={{
        margin: '0 0 16px 0',
        paddingLeft: '20px',
        listStyleType: ordered ? 'decimal' : 'disc',
      }}
    >
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontSize: '14px',
            lineHeight: '1.75',
            color: '#374151',
            marginBottom: item.content ? '10px' : '4px',
          }}
        >
          {item.label && (
            <strong style={{ color: '#111827', fontWeight: 600 }}>
              {item.label}{' '}
            </strong>
          )}
          {item.content && <span>{item.content}</span>}
        </li>
      ))}
    </Tag>
  );
};

export default PolicyList;
