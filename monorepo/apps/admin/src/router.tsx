import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    AnnouncementPage,
    ApplicantScheduleLoadingPage,
    ClubCreatePage,
    ClubEditPage,
    EntryPage,
    InterviewEvaluationPage,
    LoginPage,
    MyClubPage,
    NonAnnouncementPage,
    NotFoundPage,
    RecruitCreatePage,
    RecruitSuccessPage,
    RegisterPage,
    StepManagementPage,
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
            { path: 'announcements/:clubId', element: <NonAnnouncementPage /> },
            { path: 'announcements/:clubId/:announcementId', element: <AnnouncementPage /> },

            {
                path: 'announcements/create/:clubId/:announcementId?',
                element: <RecruitCreatePage />,
            },

            { path: 'clubs/:clubId/:announcementId?', element: <ClubEditPage /> },

            { path: 'announcements/edit/:clubId', element: <NonAnnouncementPage /> },
            { path: 'announcements/edit/:clubId/:announcementId', element: <ClubCreatePage /> },

            { path: 'applicants/:clubId', element: <NonAnnouncementPage /> },
            { path: 'applicants/:clubId/:announcementId', element: <StepManagementPage /> },

            { path: 'interview-evaluation/:clubId', element: <NonAnnouncementPage /> },
            {
                path: 'interview-evaluation/:clubId/:announcementId',
                element: <InterviewEvaluationPage />,
            },

            { path: 'document-evaluation/:clubId', element: <NonAnnouncementPage /> },
            { path: 'document-evaluation/:clubId/:announcementId', element: <ClubCreatePage /> },

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
