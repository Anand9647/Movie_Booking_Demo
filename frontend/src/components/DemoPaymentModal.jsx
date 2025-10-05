import React, { useState } from 'react'

export default function DemoPaymentModal({ isOpen, onClose, paymentData, onSuccess }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedMethod, setSelectedMethod] = useState('upi')

  if (!isOpen) return null

  const handlePayment = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing delay
    setTimeout(() => {
      const demoResponse = {
        razorpay_payment_id: 'demo_pay_' + Date.now(),
        razorpay_order_id: paymentData.order_id,
        razorpay_signature: 'demo_signature_' + Math.random().toString(36).substr(2, 16)
      }
      
      onSuccess(demoResponse)
      setIsProcessing(false)
    }, 2000)
  }

  const paymentMethods = [
    { id: 'upi', name: 'UPI', icon: '📱', desc: 'Pay using UPI apps' },
    { id: 'card', name: 'Card', icon: '💳', desc: 'Credit/Debit Cards' },
    { id: 'netbanking', name: 'Net Banking', icon: '🏦', desc: 'Online Banking' },
    { id: 'wallet', name: 'Wallet', icon: '👛', desc: 'Digital Wallets' }
  ]

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '400px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          position: 'relative'
        }}>
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              right: '1rem',
              top: '1rem',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              width: '30px',
              height: '30px',
              color: 'white',
              cursor: 'pointer'
            }}
          >×</button>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Demo Payment Gateway</h3>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '0.9rem' }}>
            {paymentData.description}
          </p>
        </div>

        {/* Amount */}
        <div style={{
          padding: '1.5rem',
          textAlign: 'center',
          borderBottom: '1px solid #eee',
          color: '#333'
        }}>
          <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
            Amount to Pay
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
            ₹{(paymentData.amount / 100).toFixed(2)}
          </div>
        </div>

        {/* Payment Methods */}
        <div style={{ padding: '1.5rem', color: '#333' }}>
          <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>Choose Payment Method</h4>
          
          <div style={{ display: 'grid', gap: '0.8rem', marginBottom: '2rem' }}>
            {paymentMethods.map(method => (
              <label key={method.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem',
                border: selectedMethod === method.id ? '2px solid #2563eb' : '1px solid #e5e7eb',
                borderRadius: '8px',
                cursor: 'pointer',
                background: selectedMethod === method.id ? '#eff6ff' : 'white'
              }}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={(e) => setSelectedMethod(e.target.value)}
                  style={{ marginRight: '1rem' }}
                />
                <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>{method.icon}</span>
                <div>
                  <div style={{ fontWeight: '500' }}>{method.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{method.desc}</div>
                </div>
              </label>
            ))}
          </div>

          {/* Demo Notice */}
          <div style={{
            background: '#fef3c7',
            border: '1px solid #f59e0b',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>⚠️</span>
              <strong>Demo Mode</strong>
            </div>
            <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#92400e' }}>
              This is a demo payment. No real money will be charged. Payment will automatically succeed after 2 seconds.
            </p>
          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            style={{
              width: '100%',
              background: isProcessing ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isProcessing ? (
              <>
                <div style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Processing...
              </>
            ) : (
              <>🔒 Pay Securely</>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}