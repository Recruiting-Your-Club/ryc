import { ErrorFallbackPage } from '@pages/ErrorFallbackPage';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorBoundaryWrapperPage({ children }: { children: ReactNode }) {
    const { reset } = useQueryErrorResetBoundary();
    return (
        <ErrorBoundary FallbackComponent={ErrorFallbackPage} onReset={reset}>
            {children}
        </ErrorBoundary>
    );
}

export { ErrorBoundaryWrapperPage };
