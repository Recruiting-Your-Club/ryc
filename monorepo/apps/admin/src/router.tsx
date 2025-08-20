import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    ClubCreatePage,
    ClubSearchPage,
    DocumentEvaluationLoadingPage,
    InterviewEvaluationLoadingPage,
    LoginPage,
    MyClubPage,
    NotFoundPage,
    RegisterPage,
    TestPage,
} from './pages';

const LazyInterviewEvaluationPage = lazy(
    () => import('./pages/InterviewEvaluationPage/InterviewEvaluationPage'),
);
const LazyDocumentEvaluationPage = lazy(
    () => import('./pages/DocumentEvaluationPage/DocumentEvaluationPage'),
);

const router = createBrowserRouter([
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { index: true, element: <TestPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'test', element: <TestPage /> },
            {
                path: 'interview-evaluation',
                element: (
                    <Suspense fallback={<InterviewEvaluationLoadingPage />}>
                        <LazyInterviewEvaluationPage />
                    </Suspense>
                ),
            },
            {
                path: 'document-evaluation',
                element: (
                    <Suspense fallback={<DocumentEvaluationLoadingPage />}>
                        <LazyDocumentEvaluationPage />
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
