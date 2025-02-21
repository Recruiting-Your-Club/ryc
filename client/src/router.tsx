import React from 'react';
import { createBrowserRouter } from 'react-router';
import { AuthPage, TestPage, NotFoundPage } from './pages';
import { UserLayout } from './layouts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'auth', element: <AuthPage /> },
        ],
    },
]);

export default router;
