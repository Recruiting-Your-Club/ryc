import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, ScrollRestoration } from 'react-router';

import { UserLayout } from './layouts';
import {
    ClubApplyLoadingPage,
    DetailLoadingPage,
    LoginPage,
    MainLoadingPage,
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
                    <Suspense fallback={<RecruitmentLoadingPage />}>
                        <LazyRecruitmentPage />
                    </Suspense>
                ),
            },
            {
                path: ':announcementId/application',
                element: (
                    <Suspense fallback={<ClubApplyLoadingPage />}>
                        <LazyClubApplyPage />
                    </Suspense>
                ),
            },
            {
                path: ':announcementId/application/success/:applicantId/:applicationId',
                element: <ClubApplySuccessPage />,
            },
        ],
    },

    {
        path: '/reservation/clubs/:clubId/announcements/:announcementId/applicants/:applicantId/interview-reservations',
        element: <ReservationPage />,
    },
]);

export default router;
