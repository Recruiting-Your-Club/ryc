import React from 'react';
import { createBrowserRouter } from 'react-router';
import { TestPage, NotFoundPage, LoginPage, RegisterPage } from './pages';
import { UserLayout } from './layouts';
import { ManagerLayout } from '@layouts/ManagerLayout/ManagerLayout';

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
        ],
    },
    {
        path: '/manager',
        element: <ManagerLayout />,
        children: [{ index: true, element: <TestPage /> }],
    },
]);

export default router;
