import { ClubApplyAgreementPage } from '@pages/ClubApplyPage/ClubApplyAgreemetPage';
import { ErrorFallbackPage } from '@pages/ErrorFallbackPage';
import React, { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, ScrollRestoration } from 'react-router';

import { UserLayout } from './layouts';
import {
    ClubApplyLoadingPage,
    DetailLoadingPage,
    LoginPage,
    MainLoadingPage,
    NotFoundPage,
    RecruitmentLoadingPage,
    RegisterPage,
    ReservationPage,
    TestPage,
} from './pages';
import { ClubApplySuccessPage } from './pages/ClubApplyPage/ClubApplySuccessPage/ClubApplySuccessPage';

const LazyMainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LazyDetailPage = lazy(() => import('./pages/ClubDetailPage/ClubDetailPage'));
const LazyRecruitmentPage = lazy(() => import('./pages/RecruitmentPage/RecruitmentPage'));
const LazyClubApplyPage = lazy(() => import('./pages/ClubApplyPage/ClubApplyPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <>
                <UserLayout />
                <ScrollRestoration />
            </>
        ),
        children: [
            {
                index: true,
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<MainLoadingPage />}>
                            <LazyMainPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: ':id',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<DetailLoadingPage />}>
                            <LazyDetailPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },

            { path: 'test', element: <TestPage /> },
        ],
    },
    {
        path: '/announcements',
        element: <UserLayout />,
        children: [
            {
                path: ':announcementId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<RecruitmentLoadingPage />}>
                            <LazyRecruitmentPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: ':announcementId/agreement',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <ClubApplyAgreementPage />
                    </ErrorBoundary>
                ),
            },
            {
                path: ':announcementId/application',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<ClubApplyLoadingPage />}>
                            <LazyClubApplyPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },
            {
                path: ':announcementId/application/success/:applicantId/:applicationId',
                element: <ClubApplySuccessPage />,
            },
        ],
    },

    {
        path: '/clubs/:clubId/announcements/:announcementId/applicants/:applicantId/interview-reservations',
        element: (
            <ErrorBoundary
                FallbackComponent={ErrorFallbackPage}
                onReset={() => window.location.reload()}
            >
                <ReservationPage />
            </ErrorBoundary>
        ),
    },
    { path: '*', element: <NotFoundPage /> },
]);

export default router;
