import React from 'react';
import { createBrowserRouter } from 'react-router';
import { AuthPage, TestPage, NotFoundPage } from './pages';
import { GlobalLayout } from './layouts';

const router = createBrowserRouter([
    {
        path: '/',
        element: <GlobalLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'auth', element: <AuthPage /> },
        ],
    },
]);

export default router;
