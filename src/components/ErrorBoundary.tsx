import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  panelName: string;
  children: React.ReactNode;
  onRecover?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'Unexpected subsystem fault',
    };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo): void {
    console.warn(`[ErrorBoundary:${this.props.panelName}]`, error, info.componentStack);
  }

  private handleReset = () => {
    this.setState({ hasError: false, message: '' });
    this.props.onRecover?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="w-full h-full min-h-[160px] bg-[#090D16] border border-rose-500/35 rounded-lg p-5 flex flex-col items-center justify-center text-center gap-2.5"
        >
          <AlertTriangle className="w-7 h-7 text-amber-400" />
          <div className="text-xs font-semibold text-slate-100">
            {this.props.panelName} Isolated Fault Recovery
          </div>
          <p className="text-[11px] text-slate-400 max-w-sm font-mono-telemetry">
            {this.state.message || 'Subsystem recovered safely without losing mission state.'}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 text-xs font-medium cursor-pointer transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reinitialize {this.props.panelName}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
