'use client';
import React from 'react';
import { Check, Calendar, ArrowRight, Download } from 'lucide-react';

export default function SuccessPage() {
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
        {/* Success Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          backgroundColor: '#DEF7EC',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px'
        }}>
          <Check size={32} color="#059669" />
        </div>

        {/* Main Message */}
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2D3748',
          marginBottom: '16px'
        }}>
          Payment Successful!
        </h1>
        <p style={{
          fontSize: '18px',
          color: '#4A5568',
          marginBottom: '40px'
        }}>
          Thank you for your order. Our experts will begin reviewing your submission.
        </p>

        {/* Order Details */}
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
            marginBottom: '16px'
          }}>
            What Happens Next
          </h2>
          <div style={{
            display: 'grid',
            gap: '16px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: '#EBF8FF',
                padding: '8px',
                borderRadius: '8px'
              }}>
                <Calendar size={20} color="#3182CE" />
              </div>
              <div>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#2D3748',
                  marginBottom: '4px'
                }}>Expert Review</p>
                <p style={{
                  fontSize: '14px',
                  color: '#4A5568'
                }}>Our experts will analyze your submission within 48 hours</p>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: '#EBF8FF',
                padding: '8px',
                borderRadius: '8px'
              }}>
                <Download size={20} color="#3182CE" />
              </div>
              <div>
                <p style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#2D3748',
                  marginBottom: '4px'
                }}>Feedback Delivery</p>
                <p style={{
                  fontSize: '14px',
                  color: '#4A5568'
                }}>You'll receive an email when your detailed feedback is ready</p>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <a 
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#3182CE',
            fontSize: '16px',
            textDecoration: 'none'
          }}
        >
          Return to Home <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}