import { ClubApplyPage } from '@pages/ClubApplyPage';
import React from 'react';
import { createBrowserRouter } from 'react-router';

import { UserLayout } from './layouts';
import {
    ClubDetailPage,
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
            { path: 'apply', element: <ClubApplyPage /> },
            { path: 'detail', element: <ClubDetailPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'detail/recruitment', element: <RecruitmentPage /> },
        ],
    },
]);

export default router;
