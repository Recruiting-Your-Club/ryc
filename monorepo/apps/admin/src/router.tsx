import { createBrowserRouter } from 'react-router';

import { ManagerLayout } from './layouts';
import {
    LoginPage,
    NotFoundPage,
    RecruitCreatePage,
    RecruitSuccessPage,
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
            { path: 'login', element: <LoginPage /> },
            { path: 'register', element: <RegisterPage /> },
            { path: 'recruitment', element: <RecruitCreatePage /> },

            //추 후 clubId에 따른 하위 router로 리펙토링 예정
            { path: 'recruitment/success', element: <RecruitSuccessPage /> },
            { path: 'test', element: <TestPage /> },
        ],
    },
]);

export default router;
