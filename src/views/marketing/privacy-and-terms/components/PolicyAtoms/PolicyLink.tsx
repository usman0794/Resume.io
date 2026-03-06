import React from 'react';

interface PolicyLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const PolicyLink: React.FC<PolicyLinkProps> = ({ href, children, external = false }) => (
  <a
    href={href}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    style={{
      color: '#1a91f0',
      textDecoration: 'none',
      borderBottom: '1px solid transparent',
      transition: 'border-color 0.15s ease',
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = '#1a91f0';
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = 'transparent';
    }}
  >
    {children}
  </a>
);

export default PolicyLink;
