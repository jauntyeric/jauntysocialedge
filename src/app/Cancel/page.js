'use client';
import React from 'react';
import { AlertCircle, ArrowLeft, HelpCircle, RefreshCw } from 'lucide-react';

export default function CancelPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#F7FAFC',
      padding: '40px 20px'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Cancel Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          backgroundColor: '#FEE2E2',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <AlertCircle size={32} color="#DC2626" />
        </div>

        {/* Main Message */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2D3748',
          marginBottom: '16px'
        }}>
          Payment Cancelled
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#4A5568',
          marginBottom: '40px'
        }}>
          No worries! Your payment was cancelled and you haven't been charged.
        </p>

        {/* Common Issues Section */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#2D3748',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <HelpCircle size={20} color="#3182CE" />
            Having Trouble?
          </h2>
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            {[
              {
                title: "Payment Method Issue",
                description: "Check if your card has sufficient funds or try a different payment method."
              },
              {
                title: "Technical Difficulties",
                description: "Try refreshing your browser or using a different device."
              }
            ].map((issue, index) => (
              <div key={index} style={{
                padding: '16px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px'
              }}>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#2D3748',
                  marginBottom: '4px'
                }}>{issue.title}</p>
                <p style={{
                  fontSize: '14px',
                  color: '#4A5568'
                }}>{issue.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'grid',
          gap: '16px',
          maxWidth: '300px',
          margin: '0 auto'
        }}>
          <button
            onClick={() => window.history.back()}
            style={{
              backgroundColor: '#EB5B3C',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <RefreshCw size={16} />
            Try Again
          </button>
          
          <a 
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: '#4A5568',
              fontSize: '16px',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={16} />
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}