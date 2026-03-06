import React from 'react';

interface PolicySectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const PolicySection: React.FC<PolicySectionProps> = ({ title, children, id }) => (
  <section
    id={id}
    style={{ marginBottom: '32px', scrollMarginTop: '80px' }}
  >
    <h2
      style={{
        fontSize: '13px',
        fontWeight: 700,
        color: '#111827',
        marginBottom: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        lineHeight: 1.4,
      }}
    >
      {title}
    </h2>
    <div style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151' }}>
      {children}
    </div>
  </section>
);

export default PolicySection;
