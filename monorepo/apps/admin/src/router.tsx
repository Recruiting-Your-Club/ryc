import { InterviewEvaluationPage } from '@pages/InterviewEvaluationPage';
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    ApplicantScheduleLoadingPage,
    ClubCreatePage,
    ClubSearchPage,
    LoginPage,
    MyClubPage,
    NotFoundPage,
    RegisterPage,
    TestPage,
} from './pages';

const LazyApplicantSchedulePage = lazy(
    () => import('./pages/ApplicantSchedulePage/ApplicantSchedulePage'),
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'interview-evaluation', element: <InterviewEvaluationPage /> },
            {
                path: 'interview-slot',
                element: (
                    <Suspense fallback={<ApplicantScheduleLoadingPage />}>
                        <LazyApplicantSchedulePage />
                    </Suspense>
                ),
            },
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
