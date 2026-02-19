import React from 'react';

export default function Test() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#1a1a1a',
      color: 'white',
      padding: '20px'
    }}>
      <h1>Rupee Symbol Test</h1>
      <div style={{ fontSize: '24px', margin: '20px 0' }}>
        <span>? 1,234.56</span>
      </div>
      <div style={{ fontSize: '24px', margin: '20px 0', color: '#4ade80' }}>
        <span>? 5,678.90</span>
      </div>
      <div style={{ fontSize: '24px', margin: '20px 0', color: '#f87171' }}>
        <span>? 9,876.54</span>
      </div>
    </div>
  );
}
