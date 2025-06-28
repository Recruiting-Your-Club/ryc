import React from 'react';
import { createBrowserRouter } from 'react-router';
import {
    TestPage,
    NotFoundPage,
    LoginPage,
    RegisterPage,
    MainPage,
    StepManagementPage,
    ClubDetailPage,
    RecruitmentPage,
} from './pages';
import { UserLayout, ManagerLayout } from './layouts';
import { ClubApplyPage } from '@pages/ClubApplyPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { index: true, element: <MainPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'apply', element: <ClubApplyPage /> },
            { path: 'detail', element: <ClubDetailPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'detail/recruitment', element: <RecruitmentPage /> },
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
            { path: 'evaluation', element: <LoginPage /> },
            { path: 'questions', element: <RegisterPage /> },
            { path: 'setting', element: <LoginPage /> },
        ],
    },
]);

export default router;
