import { ApplicantList } from '@components/ApplicantList';
import React from 'react';
import { createBrowserRouter } from 'react-router';
import { ManagerLayout, UserLayout } from './layouts';
import {
    ClubDetailPage,
    DocumentEvaluationPage,
    LoginPage,
    MainPage,
    NotFoundPage,
    RecruitmentPage,
    RegisterPage,
    TestPage,
} from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { index: true, element: <MainPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
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
            { path: 'steps', element: <LoginPage /> },
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
