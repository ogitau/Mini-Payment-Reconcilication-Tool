import React from 'react';
import { saveAs } from 'file-saver';

const downloadCSV = (data, name) => {
  if (data.length === 0) return;
  const csv = [Object.keys(data[0] || {}).join(','), ...data.map(row => Object.values(row).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `${name}.csv`);
};

// Helper function to safely convert any value to string
const safeToString = (value) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

const renderTable = (data, title, color, exportName) => {
  if (data.length === 0) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: color, fontWeight: 'bold', marginBottom: '1rem' }}>
          {title} ({data.length})
        </h3>
        <p style={{ color: '#6b7280', fontStyle: 'italic' }}>No records found</p>
      </div>
    );
  }

  const headers = Object.keys(data[0] || {});
  
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3 style={{ color: color, fontWeight: 'bold', marginBottom: '1rem' }}>
        {title} ({data.length})
      </h3>
      <div style={{ 
        background: '#fff', 
        borderRadius: '8px', 
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
        overflow: 'hidden',
        border: '1px solid #e5e7eb'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb' }}>
              {headers.map((header, index) => (
                <th key={index} style={{ 
                  padding: '12px 16px', 
                  textAlign: 'left', 
                  fontWeight: '600', 
                  color: '#374151',
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '0.875rem'
                }}>
                  {header.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} style={{ 
                borderBottom: rowIndex < data.length - 1 ? '1px solid #f3f4f6' : 'none',
                background: rowIndex % 2 === 0 ? '#fff' : '#fafafa'
              }}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} style={{ 
                    padding: '12px 16px', 
                    fontSize: '0.875rem',
                    color: '#374151',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {safeToString(row[header])}
                  </td>
                ))}
              </tr>
            ))}
            {/* Export button row */}
            <tr style={{ background: '#f8fafc', borderTop: '2px solid #e5e7eb' }}>
              <td colSpan={headers.length} style={{ padding: '16px', textAlign: 'center' }}>
                <button 
                  style={{
                    background: color,
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.background = color === '#059669' ? '#047857' : color === '#d97706' ? '#b45309' : '#dc2626'}
                  onMouseOut={(e) => e.target.style.background = color}
                  onClick={() => downloadCSV(data, exportName)}
                >
                  Export {exportName}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function SummaryDisplay({ matched, onlyInternal, onlyProvider }) {
  console.log('SummaryDisplay props:', { matched, onlyInternal, onlyProvider });
  
  return (
    <div style={{ marginTop: '1rem' }}>
      {renderTable(matched, '✅ Matched Transactions', '#059669', 'matched')}
      {renderTable(onlyInternal, '⚠️ Present Only in Internal', '#d97706', 'internal_only')}
      {renderTable(onlyProvider, '❌ Present Only in Provider', '#dc2626', 'provider_only')}
    </div>
  );
}
