import React from 'react';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
}

export interface TableRow {
  [key: string]: string;
}

interface PolicyTableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const PolicyTable: React.FC<PolicyTableProps> = ({ columns, rows }) => (
  <div style={{ overflowX: 'auto', marginBottom: '20px', marginTop: '8px' }}>
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px',
        lineHeight: '1.6',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f3f4f6' }}>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                border: '1px solid #d1d5db',
                padding: '10px 12px',
                textAlign: 'left',
                fontWeight: 700,
                color: '#111827',
                width: col.width,
                verticalAlign: 'top',
              }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            style={{ backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9fafb' }}
          >
            {columns.map((col) => (
              <td
                key={col.key}
                style={{
                  border: '1px solid #d1d5db',
                  padding: '10px 12px',
                  verticalAlign: 'top',
                  color: '#374151',
                  whiteSpace: 'pre-line',
                }}
              >
                {row[col.key] ?? ''}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PolicyTable;
