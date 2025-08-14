import { ApplicantSchedulePage } from '@pages/ApplicantSchedulePage';
import { InterviewEvaluationPage } from '@pages/InterviewEvaluationPage';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
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
        path: '/',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'interview-evaluation', element: <InterviewEvaluationPage /> },
            { path: 'interview-slot', element: <ApplicantSchedulePage /> },
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
            { path: 'myclub', element: <MyClubPage /> },
        ],
    },
]);

export default router;
