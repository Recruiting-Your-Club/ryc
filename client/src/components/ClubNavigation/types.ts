import type { ReactNode } from 'react';

export interface NavigationItem {
    title: string;
    page: ReactNode; // React 컴포넌트나 JSX 엘리먼트를 포함할 수 있음을 나타냅니다.
}
