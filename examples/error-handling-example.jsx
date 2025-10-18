import { Router, Route, Link, RouterErrorBoundary } from '07-navegation-router'
import { useState } from 'react'

/**
 * Error Handling Example - Using ErrorBoundary
 */
export function ErrorHandlingExample() {
  return (
    <RouterErrorBoundary 
      showError={true}
      onError={(error) => console.error('Route error:', error)}
    >
      <Router>
        <Route path="/" Component={Home} />
        <Route path="/working" Component={WorkingPage} />
        <Route path="/broken" Component={BrokenPage} />
      </Router>
    </RouterErrorBoundary>
  )
}

function Home() {
  return (
    <div>
      <h1>⚠️ Error Handling Example</h1>
      <p>Try navigating to different pages:</p>
      <nav>
        <Link to="/working">✅ Working Page</Link>
        {' | '}
        <Link to="/broken">❌ Broken Page</Link>
      </nav>
    </div>
  )
}

function WorkingPage() {
  return (
    <div>
      <h1>✅ This page works fine!</h1>
      <p>No errors here.</p>
      <Link to="/">← Back to Home</Link>
    </div>
  )
}

function BrokenPage() {
  // This will throw an error
  throw new Error('Intentional error for demonstration')
  
  return <div>This will never render</div>
}

/**
 * Example with custom error fallback
 */
export function CustomErrorFallbackExample() {
  const [errorCount, setErrorCount] = useState(0)

  const customFallback = ({ error }) => (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      background: '#fff3cd',
      border: '2px solid #ffc107',
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h2>🔧 Oops! Something broke</h2>
      <p>Don\'t worry, we\'ve logged the error and our team is on it!</p>
      <details style={{ marginTop: '20px', textAlign: 'left' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          Error Details
        </summary>
        <pre style={{ 
          background: '#f8f9fa', 
          padding: '10px', 
          borderRadius: '4px',
          overflow: 'auto'
        }}>
          {error.message}
        </pre>
      </details>
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          marginTop: '20px',
          padding: '12px 24px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Return to Home
      </button>
    </div>
  )

  return (
    <RouterErrorBoundary
      fallback={customFallback}
      onError={() => setErrorCount(prev => prev + 1)}
    >
      <Router>
        <Route path="/" Component={() => (
          <div>
            <h1>Custom Error Fallback</h1>
            <p>Errors caught: {errorCount}</p>
            <Link to="/error">Trigger Error</Link>
          </div>
        )} />
        <Route path="/error" Component={() => {
          throw new Error('Custom error with nice fallback')
        }} />
      </Router>
    </RouterErrorBoundary>
  )
}

export default ErrorHandlingExample
