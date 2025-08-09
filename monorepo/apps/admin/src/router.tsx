import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    ClubCreatePage,
    ClubEditPage,
    InterviewEvaluationPage,
    LoginPage,
    MyClubPage,
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

            { path: 'clubs/:clubId', element: <ClubEditPage /> },

            { path: 'announcements', element: <LoginPage /> },
            { path: 'announcements/create', element: <ClubCreatePage /> },
            { path: 'announcements/edit', element: <ClubCreatePage /> },

            { path: 'applicants', element: <ClubCreatePage /> },

            { path: 'interview-evaluation', element: <InterviewEvaluationPage /> },
            { path: 'document-evaluation', element: <ClubCreatePage /> },

            { path: 'interviewee-schedule"', element: <LoginPage /> },

            { path: 'settings', element: <LoginPage /> },
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
            { path: 'myClub', element: <MyClubPage /> },
        ],
    },
]);

export default router;
