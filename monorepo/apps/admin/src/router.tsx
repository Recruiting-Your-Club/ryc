import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import { RecruitEditPage } from './pages';
import { ErrorFallbackPage } from './pages';
import {
    AnnouncementPage,
    ApplicantScheduleLoadingPage,
    ClubCreatePage,
    ClubEditPage,
    ClubMemberRolePage,
    DocumentEvaluationLoadingPage,
    EntryPage,
    InterviewEvaluationLoadingPage,
    InviteConfirmPage,
    LoginPage,
    MyClubPage,
    NonAnnouncementPage,
    NotFoundPage,
    RecruitCreatePage,
    RecruitSuccessPage,
    RegisterPage,
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
            {
                path: 'announcements/:clubId/:announcementId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <AnnouncementPage />
                    </ErrorBoundary>
                ),
            },

            {
                path: 'announcements/create/:clubId/:announcementId?',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <RecruitCreatePage />
                    </ErrorBoundary>
                ),
            },

            {
                path: 'announcements/create/:clubId/success/:announcementId',
                element: <RecruitSuccessPage />,
            },

            {
                path: 'clubs/:clubId/:announcementId?',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <ClubEditPage />
                    </ErrorBoundary>
                ),
            },

            {
                path: 'announcements/:clubId/:announcementId?',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <AnnouncementPage />
                    </ErrorBoundary>
                ),
            },
            {
                path: 'announcements/create/:clubId/:announcementId?',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <ClubCreatePage />
                    </ErrorBoundary>
                ),
            },

            { path: 'announcements/edit/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'announcements/edit/:clubId/:announcementId?',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <RecruitEditPage />
                    </ErrorBoundary>
                ),
            },

            { path: 'announcements/edit/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'announcements/edit/:clubId/:announcementId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <ClubCreatePage />
                    </ErrorBoundary>
                ),
            },

            { path: 'applicants/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'applicants/:clubId/:announcementId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<StepManagementLoadingPage />}>
                            <LazyStepManagementPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },

            { path: 'interview-evaluation/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'interview-evaluation/:clubId/:announcementId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<InterviewEvaluationLoadingPage />}>
                            <LazyInterviewEvaluationPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },

            { path: 'document-evaluation/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'document-evaluation/:clubId/:announcementId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<DocumentEvaluationLoadingPage />}>
                            <LazyDocumentEvaluationPage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },

            { path: 'interviewee-schedule/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'interviewee-schedule/:clubId/:announcementId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <Suspense fallback={<ApplicantScheduleLoadingPage />}>
                            <LazyApplicantSchedulePage />
                        </Suspense>
                    </ErrorBoundary>
                ),
            },

            {
                path: 'settings/:clubId',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <ClubMemberRolePage />
                    </ErrorBoundary>
                ),
            },
            {
                path: 'recruitment',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <RecruitCreatePage />
                    </ErrorBoundary>
                ),
            },
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
            {
                path: 'club-create',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <ClubCreatePage />
                    </ErrorBoundary>
                ),
            },
            {
                path: 'myClub',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <MyClubPage />
                    </ErrorBoundary>
                ),
            },
            {
                path: ':inviteCode?',
                element: (
                    <ErrorBoundary
                        FallbackComponent={ErrorFallbackPage}
                        onReset={() => window.location.reload()}
                    >
                        <InviteConfirmPage />
                    </ErrorBoundary>
                ),
            },
        ],
    },
]);

export default router;
