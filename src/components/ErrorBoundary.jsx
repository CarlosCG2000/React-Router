import { Component } from 'react'
import PropTypes from 'prop-types'

/**
 * Error Boundary component for catching routing errors
 * Wraps routes to prevent the entire app from crashing if a route component errors
 */
export class RouterErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('Router Error:', error, errorInfo)
        
        if (this.props.onError) {
            this.props.onError(error, errorInfo)
        }
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback({ error: this.state.error })
            }

            return (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h1>⚠️ Something went wrong</h1>
                    <p>There was an error loading this page.</p>
                    {this.props.showError && this.state.error && (
                        <pre style={{ 
                            background: '#f5f5f5', 
                            padding: '10px', 
                            borderRadius: '4px',
                            textAlign: 'left',
                            overflow: 'auto'
                        }}>
                            {this.state.error.toString()}
                        </pre>
                    )}
                    <button 
                        onClick={() => window.location.href = '/'}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            cursor: 'pointer'
                        }}
                    >
                        Go to Home
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

RouterErrorBoundary.propTypes = {
    children: PropTypes.node.isRequired,
    fallback: PropTypes.func,
    onError: PropTypes.func,
    showError: PropTypes.bool
}

RouterErrorBoundary.defaultProps = {
    showError: false
}
