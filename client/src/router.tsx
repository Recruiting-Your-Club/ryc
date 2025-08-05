import { ClubApplyPage } from '@pages/ClubApplyPage';
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
    RecruitmentPage,
    ReservationPage,
    MyClubPage,
    RegisterPage,
    StepManagementPage,
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
            { path: 'detail', element: <LazyDetailPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'detail/recruitment', element: <RecruitmentPage /> },
            { path: 'myclub', element: <MyClubPage /> },
            { path: 'club/create', element: <ClubCreatePage /> },
        ],
    },
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: 'manager', element: <LoginPage /> },
            { path: 'announcements', element: <RecruitCreatePage /> },
            { path: 'announcements/create', element: <RecruitCreatePage /> },
            { path: 'announcements/edit', element: <RecruitCreatePage /> },
            { path: 'applicants', element: <StepManagementPage /> },
            { path: 'evaluations/document', element: <DocumentEvaluationPage /> },
            { path: 'evaluations/interview', element: <RegisterPage /> },
            { path: 'interviews/schedule', element: <LoginPage /> },
            { path: 'settings', element: <LoginPage /> },
        ],
    },
    {
        path: '/reservation',
        element: <ReservationPage />,
    },
]);

export default router;
