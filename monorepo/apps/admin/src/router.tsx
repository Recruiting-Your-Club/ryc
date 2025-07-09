import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import { ClubCreatePage, LoginPage, NotFoundPage, RegisterPage, TestPage } from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'test', element: <TestPage /> },
        ],
    },
    {
        path: '/',
        element: <EntryLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'club-create', element: <ClubCreatePage /> },
        ],
    },
]);

export default router;
