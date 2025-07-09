import { createBrowserRouter } from 'react-router';

import { ManagerLayout } from './layouts';
import { LoginPage, NotFoundPage, RegisterPage, TestPage } from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'test', element: <TestPage /> },
        ],
    },
]);

export default router;
