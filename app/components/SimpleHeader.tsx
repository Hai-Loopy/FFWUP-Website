'use client'

import Link from 'next/link'

export default function SimpleHeader() {
  return (
    <div style={{
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '80px',
      backgroundColor: 'red',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 9999,
      fontSize: '16px'
    }}>
      <div>FFWUP WEBSITE - LOGIN BUTTONS:</div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link 
          href="/login" 
          style={{
            backgroundColor: 'blue',
            color: 'white',
            padding: '8px 16px',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          LOGIN
        </Link>
        <Link 
          href="/register"
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '8px 16px',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          REGISTER
        </Link>
      </div>
    </div>
  )
}
