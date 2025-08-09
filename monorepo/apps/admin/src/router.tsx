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

            { path: 'announcements/:clubId', element: <LoginPage /> },
            { path: 'announcements/create/:clubId', element: <ClubCreatePage /> },
            { path: 'announcements/edit/:clubId', element: <ClubCreatePage /> },

            { path: 'applicants/:clubId', element: <ClubCreatePage /> },

            { path: 'interview-evaluation/:clubId', element: <InterviewEvaluationPage /> },
            { path: 'document-evaluation/:clubId', element: <ClubCreatePage /> },

            { path: 'interviewee-schedule/:clubId', element: <LoginPage /> },

            { path: 'settings/:clubId', element: <LoginPage /> },
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
