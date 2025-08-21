import { ClubApplyLoadingPage } from './pages/LoadingPage';
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import { RecruitCreatePage } from '@pages/RecruitCreatePage/RecruitCreatePage';
import { ManagerLayout, UserLayout } from './layouts';
import {
    ClubCreatePage,
    DetailLoadingPage,
    DocumentEvaluationPage,
    InterviewEvaluationPage,
    LoginPage,
    MainLoadingPage,
    ReservationPage,
    MyClubPage,
    RegisterPage,
    StepManagementPage,
    TestPage,
    ApplicantSchedulePage,
    RecruitmentLoadingPage,
    ClubApplySuccessPage,
} from './pages';

const LazyMainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LazyDetailPage = lazy(() => import('./pages/ClubDetailPage/ClubDetailPage'));
const LazyRecruitmentPage = lazy(() => import('./pages/RecruitmentPage/RecruitmentPage'));
const LazyClubApplyPage = lazy(() => import('./pages/ClubApplyPage/ClubApplyPage'));

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
            { path: 'detail', element: <LazyDetailPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'myclub', element: <MyClubPage /> },
            { path: 'club/create', element: <ClubCreatePage /> },
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
        path: '/manager',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: 'manager', element: <LoginPage /> },
            { path: 'announcements', element: <RecruitCreatePage /> },
            { path: 'announcements/create', element: <RecruitCreatePage /> },
            { path: 'announcements/edit', element: <RecruitCreatePage /> },
            { path: 'applicants', element: <StepManagementPage /> },
            { path: 'evaluations/document', element: <DocumentEvaluationPage /> },
            { path: 'evaluations/interview', element: <InterviewEvaluationPage /> },
            { path: 'interviews/schedule', element: <ApplicantSchedulePage /> },
            { path: 'settings', element: <LoginPage /> },
        ],
    },
    {
        path: '/reservation',
        element: <ReservationPage />,
    },
]);

export default router;
