import React from 'react';

interface PolicySubsectionProps {
  title: string;
  children: React.ReactNode;
  id?: string;
}

const PolicySubsection: React.FC<PolicySubsectionProps> = ({ title, children, id }) => (
  <div id={id} style={{ marginTop: '20px', marginBottom: '16px', scrollMarginTop: '80px' }}>
    <h3
      style={{
        fontSize: '13px',
        fontWeight: 700,
        color: '#111827',
        marginBottom: '10px',
        lineHeight: 1.4,
      }}
    >
      {title}
    </h3>
    <div style={{ fontSize: '14px', lineHeight: '1.75', color: '#374151' }}>
      {children}
    </div>
  </div>
);

export default PolicySubsection;
