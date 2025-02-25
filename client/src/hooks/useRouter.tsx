import { useNavigate } from 'react-router-dom';

const useRouter = () => {
    const navigate = useNavigate();

    const goTo = (path: string) => navigate(path);
    const goBack = () => navigate(-1);
    const goFront = () => navigate(1);

    const replaceGoTo = (path: string) => navigate(path, { replace: true });

    return { goTo, goBack, goFront, replaceGoTo };
};
export { useRouter };
