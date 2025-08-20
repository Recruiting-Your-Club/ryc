import { createBrowserRouter } from 'react-router';

import { EntryLayout, ManagerLayout } from './layouts';
import {
    AnnouncementPage,
    ClubCreatePage,
    ClubEditPage,
    EntryPage,
    InterviewEvaluationPage,
    LoginPage,
    MyClubPage,
    NotFoundPage,
    RecruitCreatePage,
    RecruitSuccessPage,
    RegisterPage,
    StepManagementPage,
    TestPage,
} from './pages';

const router = createBrowserRouter([
    {
        path: '/',
        element: <ManagerLayout />,
        children: [
            { path: ':clubId/announcement-test', element: <AnnouncementPage /> },
            { path: 'clubs/:clubId/:announcementId?', element: <ClubEditPage /> },

            { path: 'announcements/:clubId/:announcementId?', element: <StepManagementPage /> },
            { path: 'announcements/create/:clubId/:announcementId?', element: <ClubCreatePage /> },
            { path: 'announcements/edit/:clubId/:announcementId?', element: <ClubCreatePage /> },

            { path: 'applicants/:clubId/:announcementId?', element: <StepManagementPage /> },

            {
                path: 'interview-evaluation/:clubId/:announcementId?',
                element: <InterviewEvaluationPage />,
            },
            { path: 'document-evaluation/:clubId/:announcementId?', element: <ClubCreatePage /> },

            { path: 'interviewee-schedule/:clubId/:announcementId?', element: <LoginPage /> },
            { path: 'settings/:clubId/:announcementId?', element: <LoginPage /> },
            { path: 'recruitment', element: <RecruitCreatePage /> },
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
