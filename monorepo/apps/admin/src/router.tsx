import { RecruitAgreementPage } from '@pages/RecruitCreatePage/RecruitAgreementPage/RecruitAgreementPage';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import { ErrorBoundaryWrapperPage } from './pages';
import { RecruitEditPage, RegisterAgreementPage } from './pages';
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
    UserSettingPage,
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
                    <ErrorBoundaryWrapperPage>
                        <AnnouncementPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },

            {
                path: 'announcements/create/:clubId/:announcementId?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <RecruitCreatePage />
                    </ErrorBoundaryWrapperPage>
                ),
            },

            {
                path: 'announcements/create/:clubId/success/:announcementId',
                element: <RecruitSuccessPage />,
            },

            {
                path: 'clubs/:clubId/:announcementId?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <ClubEditPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },

            {
                path: 'announcements/:clubId/:announcementId?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <AnnouncementPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
            {
                path: 'announcements/create/agreement/:clubId/:announcementId?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <RecruitAgreementPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
            {
                path: 'announcements/create/:clubId/:announcementId?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <ClubCreatePage />
                    </ErrorBoundaryWrapperPage>
                ),
            },

            { path: 'announcements/edit/:clubId', element: <NonAnnouncementPage /> },
            { path: 'announcements/edit/agreement/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'announcements/edit/agreement/:clubId/:announcementId',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <RecruitAgreementPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
            {
                path: 'announcements/edit/:clubId/:announcementId?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <RecruitEditPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },

            { path: 'announcements/edit/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'announcements/edit/:clubId/:announcementId',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <ClubCreatePage />
                    </ErrorBoundaryWrapperPage>
                ),
            },

            { path: 'applicants/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'applicants/:clubId/:announcementId',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<StepManagementLoadingPage />}>
                            <LazyStepManagementPage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
                ),
            },

            { path: 'interview-evaluation/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'interview-evaluation/:clubId/:announcementId',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<InterviewEvaluationLoadingPage />}>
                            <LazyInterviewEvaluationPage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
                ),
            },

            { path: 'document-evaluation/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'document-evaluation/:clubId/:announcementId',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<DocumentEvaluationLoadingPage />}>
                            <LazyDocumentEvaluationPage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
                ),
            },

            { path: 'interviewee-schedule/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'interviewee-schedule/:clubId/:announcementId',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <Suspense fallback={<ApplicantScheduleLoadingPage />}>
                            <LazyApplicantSchedulePage />
                        </Suspense>
                    </ErrorBoundaryWrapperPage>
                ),
            },

            {
                path: 'settings/:clubId/:announcementId?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <ClubMemberRolePage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
            { path: 'user/:clubId/:announcementId?', element: <UserSettingPage /> },
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
            { path: 'agreement', element: <RegisterAgreementPage /> },
            {
                path: 'club-create',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <ClubCreatePage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
            {
                path: 'myClub',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <MyClubPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
            {
                path: ':inviteCode?',
                element: (
                    <ErrorBoundaryWrapperPage>
                        <InviteConfirmPage />
                    </ErrorBoundaryWrapperPage>
                ),
            },
        ],
    },
]);

export default router;
