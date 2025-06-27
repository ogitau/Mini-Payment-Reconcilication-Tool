import React, { useState } from 'react';
import FileUploader from './components/FileUploader.js';
import SummaryDisplay from './components/summary_display.js';
import { parseCSV } from './utils/parseCSV.js';
import { reconcileData } from './utils/reconc_logic.js';

function App() {
  const [internalData, setInternalData] = useState([]);
  const [providerData, setProviderData] = useState([]);
  const [result, setResult] = useState(null);

  const handleInternalUpload = file => parseCSV(file, setInternalData);
  const handleProviderUpload = file => parseCSV(file, setProviderData);
  
  const reconcile = () => {
    console.log('Internal data:', internalData);
    console.log('Provider data:', providerData);
    const reconciliationResult = reconcileData(internalData, providerData);
    console.log('Reconciliation result:', reconciliationResult);
    setResult(reconciliationResult);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Mini Reconciliation Tool</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '250px' }}>
          <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', padding: '2rem', width: '340px', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <svg width="32" height="32" fill="none" stroke="#2563eb" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="#2563eb" strokeWidth="2" fill="#eff6ff" />
                <path d="M9 12h6M9 16h6" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', margin: 0 }}>Internal System Export</h3>
            </div>
        <FileUploader onUpload={handleInternalUpload} />
            {internalData.length > 0 && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', width: '100%' }}>
                <p style={{ color: '#15803d', fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  ✓ {internalData.length} records loaded
                </p>
              </div>
            )}
          </div>

          <div style={{ background: '#fff', borderRadius: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb', padding: '2rem', width: '340px', minHeight: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <svg width="32" height="32" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="#22c55e" strokeWidth="2" fill="#f0fdf4" />
                <path d="M9 12h6M9 16h6" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1f2937', margin: 0 }}>Provider Statement</h3>
      </div>
        <FileUploader onUpload={handleProviderUpload} />
            {providerData.length > 0 && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', width: '100%' }}>
                <p style={{ color: '#15803d', fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  ✓ {providerData.length} records loaded
                </p>
              </div>
            )}
          </div>
        </div>
        <button
          style={{
            marginTop: '2.5rem',
            padding: '0.75rem 2.5rem',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: '#fff',
            background: internalData.length > 0 && providerData.length > 0 ? '#2563eb' : '#d1d5db',
            boxShadow: internalData.length > 0 && providerData.length > 0 ? '0 2px 8px rgba(37,99,235,0.15)' : 'none',
            border: 'none',
            cursor: internalData.length > 0 && providerData.length > 0 ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            transition: 'background 0.2s',
          }}
          onClick={reconcile}
          disabled={internalData.length === 0 || providerData.length === 0}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
            <rect x="4" y="4" width="16" height="16" rx="4" stroke="#fff" strokeWidth="2" fill={internalData.length > 0 && providerData.length > 0 ? '#2563eb' : '#d1d5db'} />
            <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Reconcile Data
        </button>
      </div>

      {result && (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <SummaryDisplay {...result} />
        </div>
      )}
    </div>
  );
}

export default App;