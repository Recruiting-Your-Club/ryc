import React from 'react';
import { createBrowserRouter } from 'react-router';
import { AuthPage, TestPage, NotFoundPage } from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'auth', element: <AuthPage /> },
        ],
    },
]);

export default router;
