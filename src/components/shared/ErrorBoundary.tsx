import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error!} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({ error, resetError }) => (
  <div className="h-screen bg-retro-space-navy flex items-center justify-center">
    <div className="text-center text-retro-white max-w-md mx-auto p-6">
      <div className="mb-6">
        <svg className="w-16 h-16 text-retro-electric-blue mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        <h2 className="text-2xl font-bold mb-2 text-retro-electric-blue">Oops! Something went wrong</h2>
        <p className="text-retro-gray-light mb-4">
          The 3D portfolio experienced an unexpected error. This might be due to WebGL compatibility issues.
        </p>
        <details className="text-left text-sm text-retro-gray-medium mb-6">
          <summary className="cursor-pointer hover:text-retro-white">Error details</summary>
          <pre className="mt-2 p-2 bg-retro-cosmic-black rounded text-xs overflow-auto">
            {error.message}
          </pre>
        </details>
      </div>
      <div className="space-y-3">
        <button 
          onClick={resetError}
          className="w-full px-6 py-3 bg-gradient-to-r from-retro-electric-blue to-retro-neon-cyan text-retro-space-navy rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Try Again
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="w-full px-6 py-3 bg-gradient-to-r from-retro-neon-purple to-retro-hot-pink text-retro-white rounded-lg font-semibold hover:scale-105 transition-transform"
        >
          Reload Page
        </button>
      </div>
    </div>
  </div>
);

export default ErrorBoundary;