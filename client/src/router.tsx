import { ClubApplyPage } from '@pages/ClubApplyPage';
import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import { ManagerLayout, UserLayout } from './layouts';
import {
    ClubCreatePage,
    DetailLoadingPage,
    DocumentEvaluationPage,
    LoginPage,
    MainLoadingPage,
    RecruitmentPage,
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
            { path: 'club/create', element: <ClubCreatePage /> },
        ],
    },
    {
        path: '/manager',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: 'test', element: <LoginPage /> },
            { path: 'recruitment', element: <RegisterPage /> },
            { path: 'steps', element: <StepManagementPage /> },
            { path: 'rejected', element: <RegisterPage /> },
            { path: 'edit', element: <LoginPage /> },
            { path: 'time-slots', element: <RegisterPage /> },
            { path: 'doc-evaluation', element: <DocumentEvaluationPage /> },
            { path: 'evaluation', element: <LoginPage /> },
            { path: 'questions', element: <RegisterPage /> },
            { path: 'setting', element: <LoginPage /> },
        ],
    },
]);

export default router;
