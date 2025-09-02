import { ClubApplyAgreementPage } from '@pages/ClubApplyPage/ClubApplyAgreemetPage';
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, ScrollRestoration } from 'react-router';

import { UserLayout } from './layouts';
import {
    ClubApplyLoadingPage,
    DetailLoadingPage,
    ErrorBoundaryWrapperPage,
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
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<MainLoadingPage />}>
                            <LazyMainPage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
                ),
            },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            {
                path: ':id',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<DetailLoadingPage />}>
                            <LazyDetailPage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
                ),
            },
        ],
    },
    {
        path: '/announcements',
        element: <UserLayout />,
        children: [
            {
                path: ':announcementId',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<RecruitmentLoadingPage />}>
                            <LazyRecruitmentPage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
                ),
            },
            {
                path: ':announcementId/agreement',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <ClubApplyAgreementPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
            {
                path: ':announcementId/application',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<ClubApplyLoadingPage />}>
                            <LazyClubApplyPage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
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
            <ErrorBoundaryWrapperPage>
                <ReservationPage />
            </ErrorBoundaryWrapperPage>
        ),
    },
    { path: '*', element: <NotFoundPage /> },
]);

export default router;
