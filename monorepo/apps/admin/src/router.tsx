import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    AnnouncementPage,
    ApplicantScheduleLoadingPage,
    ClubCreatePage,
    ClubEditPage,
    DocumentEvaluationLoadingPage,
    EntryPage,
    InterviewEvaluationLoadingPage,
    LoginPage,
    MyClubPage,
    NonAnnouncementPage,
    NotFoundPage,
    RecruitCreatePage,
    RecruitSuccessPage,
    RegisterPage,
    //StepManagementPage,
    StepManagementLoadingPage,
    TestPage,
} from './pages';

const LazyInterviewEvaluationPage = lazy(
    () => import('./pages/InterviewEvaluationPage/InterviewEvaluationPage'),
);
const LazyDocumentEvaluationPage = lazy(
    () => import('./pages/DocumentEvaluationPage/DocumentEvaluationPage'),
);
const LazyApplicantSchedulePage = lazy(
    () => import('./pages/ApplicantSchedulePage/ApplicantSchedulePage'),
);
const LazyStepManagementPage = lazy(() => import('./pages/StepManagementPage/StepManagementPage'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { path: 'announcements/:clubId', element: <NonAnnouncementPage /> },
            { path: 'announcements/:clubId/:announcementId', element: <AnnouncementPage /> },

            {
                path: 'announcements/create/:clubId/:announcementId?',
                element: <RecruitCreatePage />,
            },

            { path: 'clubs/:clubId/:announcementId?', element: <ClubEditPage /> },

            { path: 'announcements/:clubId/:announcementId?', element: <LazyStepManagementPage /> },
            { path: 'announcements/create/:clubId/:announcementId?', element: <ClubCreatePage /> },
            { path: 'announcements/edit/:clubId/:announcementId?', element: <ClubCreatePage /> },

            { path: 'announcements/edit/:clubId', element: <NonAnnouncementPage /> },
            { path: 'announcements/edit/:clubId/:announcementId', element: <ClubCreatePage /> },

            { path: 'applicants/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'applicants/:clubId/:announcementId',
                element: (
                    <Suspense fallback={<StepManagementLoadingPage />}>
                        <LazyStepManagementPage />
                    </Suspense>
                ),
            },

            { path: 'interview-evaluation/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'interview-evaluation/:clubId/:announcementId',
                element: (
                    <Suspense fallback={<InterviewEvaluationLoadingPage />}>
                        <LazyInterviewEvaluationPage />
                    </Suspense>
                ),
            },

            { path: 'document-evaluation/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'document-evaluation/:clubId/:announcementId',
                element: (
                    <Suspense fallback={<DocumentEvaluationLoadingPage />}>
                        <LazyDocumentEvaluationPage />
                    </Suspense>
                ),
            },

            { path: 'interviewee-schedule/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'interviewee-schedule/:clubId/:announcementId',
                element: (
                    <Suspense fallback={<ApplicantScheduleLoadingPage />}>
                        <LazyApplicantSchedulePage />
                    </Suspense>
                ),
            },

            { path: 'settings/:clubId/:announcementId?', element: <LoginPage /> },
            { path: 'recruitment/success', element: <RecruitSuccessPage /> },
        ],
    },
    {
        path: '/',
        element: <EntryLayout />,
        children: [
            { index: true, element: <EntryPage /> },
            { path: '*', element: <NotFoundPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'test', element: <TestPage /> },
            { path: 'club-create', element: <ClubCreatePage /> },
            { path: 'myClub', element: <MyClubPage /> },
        ],
    },
]);

export default router;
