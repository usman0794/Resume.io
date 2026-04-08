import React from 'react';

interface PolicyAddressProps {
  lines: string[];
}

const PolicyAddress: React.FC<PolicyAddressProps> = ({ lines }) => (
  <address
    style={{
      fontStyle: 'normal',
      marginBottom: '20px',
      fontSize: '14px',
      lineHeight: '1.8',
      color: '#374151',
    }}
  >
    {lines.map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    ))}
  </address>
);

export default PolicyAddress;
