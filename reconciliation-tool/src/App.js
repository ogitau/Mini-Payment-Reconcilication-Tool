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
    <div style={{ 
      padding: '2rem', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      minHeight: '100vh',
      color: '#ffffff'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '2rem', 
        textAlign: 'center', 
        color: '#ffffff',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)'
      }}>
        Mini Reconciliation Tool
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '250px' }}>
          <div style={{ 
            background: 'linear-gradient(135deg,rgb(19, 55, 156) 0%,rgb(30, 57, 155) 100%)', 
            borderRadius: '16px', 
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)', 
            border: '1px solid rgb(1, 6, 26)', 
            padding: '2rem', 
            width: '340px', 
            minHeight: '220px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 20px rgba(30, 58, 138, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <svg width="32" height="32" fill="none" stroke="#ffffff" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="#ffffff" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
                <path d="M9 12h6M9 16h6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Internal System Export</h3>
            </div>
        <FileUploader onUpload={handleInternalUpload} />
            {internalData.length > 0 && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', width: '100%' }}>
                <p style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  ✓ {internalData.length} records loaded
                </p>
              </div>
            )}
          </div>

          <div style={{ 
            background: 'linear-gradient(135deg,rgb(19, 55, 156) 0%,rgb(30, 57, 155) 100%)', 
            borderRadius: '16px', 
            boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)', 
            border: '1px solid rgb(1, 6, 26)', 
            padding: '2rem', 
            width: '340px', 
            minHeight: '220px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-4px)';
            e.target.style.boxShadow = '0 8px 20px rgba(30, 58, 138, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(30, 58, 138, 0.3)';
          }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <svg width="32" height="32" fill="none" stroke="#ffffff" strokeWidth="2" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
                <rect x="4" y="4" width="16" height="16" rx="4" stroke="#ffffff" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
                <path d="M9 12h6M9 16h6" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#ffffff', margin: 0 }}>Provider Statement</h3>
      </div>
        <FileUploader onUpload={handleProviderUpload} />
            {providerData.length > 0 && (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', width: '100%' }}>
                <p style={{ color: '#ffffff', fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
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
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (internalData.length > 0 && providerData.length > 0) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(37,99,235,0.3)';
              e.target.style.background = '#1d4ed8';
            }
          }}
          onMouseLeave={(e) => {
            if (internalData.length > 0 && providerData.length > 0) {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(37,99,235,0.15)';
              e.target.style.background = '#2563eb';
            }
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
        <div style={{ 
          background: '#ffffff', 
          borderRadius: '12px', 
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', 
          padding: '1.5rem', 
          border: '1px solid #e5e7eb',
          marginTop: '2rem'
        }}>
          <SummaryDisplay {...result} />
        </div>
      )}
    </div>
  );
}

export default App;