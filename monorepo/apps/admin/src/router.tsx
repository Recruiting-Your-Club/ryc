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

            { path: 'clubs/:clubId/:announcementId?', element: <ClubEditPage /> },

            { path: 'announcements/:clubId/:announcementId?', element: <LoginPage /> },
            { path: 'announcements/create/:clubId/:announcementId?', element: <ClubCreatePage /> },
            { path: 'announcements/edit/:clubId/:announcementId?', element: <ClubCreatePage /> },

            { path: 'applicants/:clubId/:announcementId?', element: <ClubCreatePage /> },

            {
                path: 'interview-evaluation/:clubId/:announcementId?',
                element: <InterviewEvaluationPage />,
            },
            { path: 'document-evaluation/:clubId/:announcementId?', element: <ClubCreatePage /> },

            { path: 'interviewee-schedule/:clubId/:announcementId?', element: <LoginPage /> },
            { path: 'settings/:clubId/:announcementId?', element: <LoginPage /> },
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
