import { ClubApplyPage } from '@pages/ClubApplyPage';
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { UserLayout } from './layouts';
import {
    DetailLoadingPage,
    LoginPage,
    MainLoadingPage,
    RecruitmentPage,
    RegisterPage,
    ReservationPage,
    TestPage,
} from './pages';

const LazyMainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LazyDetailPage = lazy(() => import('./pages/ClubDetailPage/ClubDetailPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<MainLoadingPage />}>
                        <LazyMainPage />
                    </Suspense>
                ),
            },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: ':id',
                element: (
                    <Suspense fallback={<DetailLoadingPage />}>
                        <LazyDetailPage />
                    </Suspense>
                ),
            },
            { path: 'apply', element: <ClubApplyPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'detail/recruitment', element: <RecruitmentPage /> },
        ],
    },
    {
        path: '/reservation',
        element: <ReservationPage />,
    },
]);

export default router;
