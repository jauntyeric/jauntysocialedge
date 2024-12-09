'use client';
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const STRIPE_KEY = 'pk_live_eVnMUUmeNrVU5GEMSXkSRDSQ00IkfhjREh';
const stripePromise = loadStripe(STRIPE_KEY);

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [feedbackType, setFeedbackType] = useState('');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      console.log('Payment handler called');
      
      const stripe = await stripePromise;
      console.log('Stripe loaded:', !!stripe);
      
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: selectedFile?.name || '',
          feedbackType: feedbackType || '',
          notes: feedbackNotes || '',
        }),
      });
  
      console.log('Response received');
      const data = await response.json();
      console.log('Session data:', data);
  
      if (data.sessionId) {
        const result = await stripe.redirectToCheckout({
          sessionId: data.sessionId,
        });
        
        if (result.error) {
          console.error('Stripe Checkout error:', result.error);
          alert('Payment failed. Please try again.');
        }
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    }
  };

  const handleFile = (file) => {
    setError('');
    const allowedTypes = [
      'video/mp4', 'video/quicktime',
      'audio/mpeg', 'audio/wav',
      'image/jpeg', 'image/png',
      'application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a supported file type (MP4, MOV, MP3, WAV, PDF, DOC, JPG, PNG)');
      return;
    }

    if (file.size > 500 * 1024 * 1024) {
      setError('File is too large. Maximum size is 500MB');
      return;
    }

    setSelectedFile(file);
  };

return (
    <main>
      {/* Navigation */}
      <nav style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{fontSize: '24px', fontWeight: 'bold', color: '#EB5B3C'}}>Social Edge Pro™</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#EB5B3C',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Upload Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        backgroundColor: '#F7FAFC',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <span style={{
            color: '#EB5B3C',
            fontWeight: '500',
            fontSize: '14px',
            textTransform: 'uppercase'
          }}>
            Your Personalized Social Skills Feedback Service
          </span>
          <h2 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginTop: '1rem',
            marginBottom: '1.5rem',
            lineHeight: '1.2',
            color: '#2D3748'
          }}>
            Get Expert Feedback on Your Social Skills and Presence
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#4A5568',
            marginBottom: '2rem'
          }}>
            Upload. Review. Transform. Your custom roadmap to social confidence is just 12-48 hours away.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#EB5B3C',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '18px'
            }}
          >
            Get Started Now
          </button>
        </div>
      </section>
      {/* Problem Section */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: '#2D3748',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            The Problem We Solve
          </h3>
          <p style={{
            fontSize: '20px',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Let's face it:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {[
              "You're stuck in patterns you can't see.",
              "You're unsure what's working and what's holding you back.",
              "Books and online videos aren't tailored to you."
            ].map((problem, index) => (
              <div key={index} style={{
                padding: '2rem',
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                {problem}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2D3748'
          }}>
            How Social Edge Pro™ Works
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                title: '1. Upload Your File',
                description: 'Share any interaction (real life recording or images, or you acting or role playing) up to 10 minutes long - video (MP4, MOV), audio (MP3, WAV), text (PDF, DOC), or images (JPG, PNG).',
                note: 'Maximum file size: 500MB'
              },
              {
                title: '2. Tell Us What You Need',
                description: 'Want help with body language? Need tips for better texting? Or leave it open for a full review.'
              },
              {
                title: '3. Receive Expert Insights',
                description: 'Get tailored feedback and advice in 12-48 hours. Delivered as a written report, video, or audio response—your choice.'
              }
            ].map((step, index) => (
              <div key={index} style={{
                padding: '2rem',
                backgroundColor: '#F7FAFC',
                borderRadius: '8px',
                textAlign: 'center'
              }}>
                <h4 style={{
                  color: '#EB5B3C',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  marginBottom: '1rem'
                }}>
                  {step.title}
                </h4>
                <p style={{
                  color: '#4A5568',
                  marginBottom: step.note ? '1rem' : '0'
                }}>
                  {step.description}
                </p>
                {step.note && (
                  <p style={{
                    color: '#718096',
                    fontSize: '14px',
                    fontStyle: 'italic'
                  }}>
                    {step.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Section */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: 'white'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#2D3748'
          }}>
            What Clients Are Saying
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {[
              {
                quote: "Social Edge Pro™ gave me clarity and direction. My first conversation using their feedback led to a second date—and I'd been stuck for months!",
                author: 'Sarah M., Los Angeles'
              },
              {
                quote: "I submitted a video of a work presentation, and their advice transformed the way I communicate. I nailed my next meeting!",
                author: 'Kevin R., New York'
              },
              {
                quote: "It's like having a personal coach in your pocket. They pointed out things I never noticed, and now I feel 10x more confident.",
                author: 'Raj P., London'
              }
            ].map((testimonial, index) => (
              <div key={index} style={{
                padding: '2rem',
                backgroundColor: '#F7FAFC',
                borderRadius: '8px'
              }}>
                <p style={{
                  color: '#4A5568',
                  marginBottom: '1rem',
                  fontStyle: 'italic'
                }}>
                  "{testimonial.quote}"
                </p>
                <p style={{
                  color: '#2D3748',
                  fontWeight: 'bold'
                }}>
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        padding: '4rem 1rem',
        backgroundColor: '#F7FAFC'
      }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#2D3748'
          }}>
            Simple, Transparent Pricing
          </h3>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              backgroundColor: '#EB5B3C',
              padding: '2rem',
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{fontSize: '20px', fontWeight: 'bold'}}>
                One-Time Payment
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: 'bold',
                margin: '1rem 0'
              }}>
                $149
              </div>
              <div style={{fontSize: '16px', opacity: 0.9}}>
                Upload up to 10 minutes of content
              </div>
            </div>
            <div style={{padding: '2rem'}}>
              <ul style={{marginBottom: '2rem'}}>
                {[
                  'Video (MP4, MOV), Audio (MP3, WAV), Text (PDF, DOC), Images (JPG, PNG)',
                  'Up to 10 minutes or 500MB per file',
                  'Actionable feedback tailored to your goals',
                  'Delivery within 12-48 hours',
                  'Choose your preferred feedback format'
                ].map((feature, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '1rem',
                    color: '#4A5568'
                  }}>
                    <span style={{
                      color: '#EB5B3C',
                      marginRight: '0.5rem'
                    }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsModalOpen(true)}
                style={{
                  backgroundColor: '#EB5B3C',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '6px',
                  border: 'none',
                  width: '100%',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Final Call to Action Section */}
      <section style={{
        padding: '6rem 1rem',
        backgroundColor: '#2D3748',
        color: 'white'
      }}>
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            Transform Your Social Skills Today
          </h3>
          <p style={{
            fontSize: '20px',
            marginBottom: '2rem',
            color: 'rgba(255,255,255,0.9)'
          }}>
            Your next breakthrough is just one upload away.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              backgroundColor: '#EB5B3C',
              color: 'white',
              padding: '1.25rem 3rem',
              borderRadius: '6px',
              border: 'none',
              fontWeight: 'bold',
              fontSize: '18px',
              cursor: 'pointer'
            }}
          >
            Upload Your File Now
          </button>
          <p style={{
            marginTop: '1.5rem',
            color: 'rgba(255,255,255,0.7)'
          }}>
            Secure. Confidential. Fast.
          </p>
        </div>
      </section>

      {/* Upload Modal with Steps */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            maxWidth: '500px',
            width: '90%'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{fontSize: '20px', fontWeight: 'bold'}}>
                {step === 1 ? 'Upload Your File' : 
                 step === 2 ? 'What would you like feedback on?' : 
                 'Complete Payment'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setStep(1);
                  setSelectedFile(null);
                  setFeedbackType('');
                  setFeedbackNotes('');
                }}
                style={{
                  border: 'none',
                  background: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#4A5568'
                }}
              >
                ×
              </button>
            </div>
            {/* Modal Content */}
            <div style={{padding: '20px'}}>
              {/* Step 1: File Upload */}
              {step === 1 && (
                <div
                  style={{
                    border: `2px dashed ${dragActive ? '#EB5B3C' : '#E2E8F0'}`,
                    borderRadius: '8px',
                    padding: '40px',
                    textAlign: 'center',
                    backgroundColor: dragActive ? '#FFF5F3' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragActive(false);
                    const file = e.dataTransfer.files[0];
                    handleFile(file);
                  }}
                  onClick={() => document.getElementById('file-upload').click()}
                >
                  {!selectedFile ? (
                    <>
                      <div style={{marginBottom: '20px', color: '#718096'}}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" style={{margin: '0 auto'}}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                      </div>
                      <p style={{marginBottom: '10px', color: '#2D3748'}}>
                        Drag and drop your file here, or click to browse
                      </p>
                      <p style={{color: '#718096', fontSize: '14px'}}>
                        Supported formats: MP4, MOV, MP3, WAV, PDF, DOC, JPG, PNG
                      </p>
                      <p style={{color: '#718096', fontSize: '14px'}}>
                        Maximum file size: 500MB
                      </p>
                    </>
                  ) : (
                    <div>
                      <p style={{marginBottom: '10px', color: '#2D3748', fontWeight: 'bold'}}>
                        Selected file:
                      </p>
                      <p style={{color: '#4A5568'}}>{selectedFile.name}</p>
                      <p style={{color: '#718096', fontSize: '14px', marginTop: '5px'}}>
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="file-upload"
                    style={{display: 'none'}}
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFile(e.target.files[0]);
                      }
                    }}
                    accept=".mp4,.mov,.mp3,.wav,.pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                </div>
              )}

              {/* Step 2: Feedback Form */}
              {step === 2 && (
                <div>
                  <div style={{
                    backgroundColor: '#F7FAFC',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <p style={{fontWeight: 'bold', marginBottom: '5px'}}>
                      Selected File: {selectedFile.name}
                    </p>
                    <p style={{color: '#718096', fontSize: '14px'}}>
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>

                  <div style={{marginBottom: '20px'}}>
                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 'bold'
                    }}>
                      Type of Feedback Needed:
                    </label>
                    <select 
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        marginBottom: '15px'
                      }}
                    >
                      <option value="">Select feedback type...</option>
                      <option value="general">General Review</option>
                      <option value="body-language">Body Language Analysis</option>
                      <option value="communication">Communication Style</option>
                      <option value="presentation">Presentation Skills</option>
                    </select>

                    <label style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: 'bold'
                    }}>
                      Specific Areas to Focus On:
                    </label>
                    <textarea
                      value={feedbackNotes}
                      onChange={(e) => setFeedbackNotes(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        borderRadius: '6px',
                        border: '1px solid #E2E8F0',
                        minHeight: '100px',
                        resize: 'vertical'
                      }}
                      placeholder="Tell us what aspects you'd like us to focus on... (Optional)"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div style={{padding: '20px'}}>
                  <div style={{
                    backgroundColor: '#F7FAFC',
                    padding: '15px',
                    borderRadius: '8px',
                    marginBottom: '20px'
                  }}>
                    <h4 style={{
                      fontWeight: 'bold',
                      marginBottom: '15px',
                      color: '#2D3748'
                    }}>
                      Order Summary
                    </h4>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      color: '#4A5568'
                    }}>
                      <span>Expert Review & Feedback</span>
                      <span>$149.00</span>
                    </div>
                    <div style={{
                      borderTop: '1px solid #E2E8F0',
                      paddingTop: '10px',
                      marginTop: '10px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 'bold',
                      color: '#2D3748'
                    }}>
                      <span>Total</span>
                      <span>$149.00</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handlePayment}
                    disabled={isProcessing}
                    style={{
                      backgroundColor: '#EB5B3C',
                      color: 'white',
                      padding: '12px',
                      borderRadius: '6px',
                      border: 'none',
                      width: '100%',
                      fontWeight: 'bold',
                      cursor: isProcessing ? 'not-allowed' : 'pointer',
                      opacity: isProcessing ? 0.7 : 1
                    }}
                  >
                    {isProcessing ? 'Processing...' : 'Pay $149'}
                  </button>
                </div>
              )}

              {error && (
                <div style={{
                  marginTop: '10px',
                  padding: '10px',
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}>
                  {error}
                </div>
              )}
            </div>
            {/* Modal Footer */}
            <div style={{
              padding: '20px',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  style={{
                    backgroundColor: '#EDF2F7',
                    color: '#4A5568',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    marginRight: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Back
                </button>
              )}
              
              <button
                onClick={() => {
                  if (step === 1 && !selectedFile) {
                    setIsModalOpen(false);
                  } else if (step === 1 && selectedFile) {
                    setStep(2);
                  } else if (step === 2) {
                    setStep(3);
                  }
                }}
                disabled={step === 3 || isProcessing}
                style={{
                  backgroundColor: step === 1 && !selectedFile ? '#EDF2F7' : '#EB5B3C',
                  color: step === 1 && !selectedFile ? '#4A5568' : 'white',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {step === 1 ? (selectedFile ? 'Continue' : 'Cancel') : 'Continue'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}