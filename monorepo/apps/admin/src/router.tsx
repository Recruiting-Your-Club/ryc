import { InterviewEvaluationPage } from '@pages/InterviewEvaluationPage';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    ClubCreatePage,
    ClubSearchPage,
    LoginPage,
    NotFoundPage,
    RegisterPage,
    TestPage,
} from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'interview-evaluation', element: <InterviewEvaluationPage /> },
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
            { path: 'club-search', element: <ClubSearchPage /> },
        ],
    },
]);

export default router;
