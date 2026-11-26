import React from 'react';
import { useCadStore } from '../store/useCadStore';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : 'Unexpected CAD runtime exception',
    };
  }

  private handleRecover = () => {
    try {
      window.localStorage.removeItem('bmsit_starforge_sw4_snapshots_v1');
      useCadStore.getState().resetWorkspace();
    } catch {
      // Ignore recovery cleanup errors
    }
    this.setState({ hasError: false, errorMessage: '' });
  };

  override render() {
    if (this.state.hasError) {
      return (
        <div className="h-[100dvh] w-screen bg-[#09090b] text-[#f4f4f6] flex items-center justify-center p-6 font-mono-cad">
          <div className="max-w-md w-full border border-[#27272a] bg-[#101013] p-6 space-y-4">
            <h1 className="text-sm font-bold uppercase tracking-wider text-rose-400">
              CAD Workspace Exception Intercepted
            </h1>
            <p className="text-xs text-[#d4d4d8] leading-relaxed">
              An invalid layout state or corrupted local cache was caught before it could crash the studio.
            </p>
            <div className="text-xs text-[#a1a1aa] border border-[#27272a] bg-[#09090b] p-3 break-words">
              {this.state.errorMessage}
            </div>
            <button
              type="button"
              onClick={this.handleRecover}
              className="w-full min-h-[44px] py-2 px-4 border border-[#f4f4f6] bg-[#f4f4f6] text-[#09090b] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Reset Workspace &amp; Recover State
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
