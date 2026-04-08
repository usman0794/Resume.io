import React from 'react';

interface PolicyInShortProps {
  text: string;
}

/**
 * Renders the "In Short: ..." italic summary paragraph
 * that appears at the top of most policy sections.
 */
const PolicyInShort: React.FC<PolicyInShortProps> = ({ text }) => (
  <p
    style={{
      fontSize: '14px',
      lineHeight: '1.75',
      color: '#374151',
      fontStyle: 'italic',
      marginBottom: '14px',
    }}
  >
    <em>In Short: {text}</em>
  </p>
);

export default PolicyInShort;
