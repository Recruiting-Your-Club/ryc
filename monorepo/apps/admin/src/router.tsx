import { InterviewEvaluationPage } from '@pages/InterviewEvaluationPage';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    AnnouncementPage,
    ClubCreatePage,
    ClubSearchPage,
    LoginPage,
    MyClubPage,
    NotFoundPage,
    RegisterPage,
    TestPage,
} from './pages';

const router = createBrowserRouter([
    {
        path: '/clubs',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'test', element: <TestPage /> },
            { path: ':clubId', element: <TestPage /> },
            { path: 'interview-evaluation', element: <InterviewEvaluationPage /> },
            { path: 'announcement-test', element: <AnnouncementPage /> },
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
            { path: 'myClub', element: <MyClubPage /> },
        ],
    },
]);

export default router;
