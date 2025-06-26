import { useNavigate } from 'react-router-dom';
const useRouter = () => {
    const navigate = useNavigate();
    const goTo = (path) => navigate(path);
    const goBack = () => navigate(-1);
    const goFront = () => navigate(1);
    const removeHistoryAndGo = (path) => navigate(path, { replace: true });
    return { goTo, goBack, goFront, removeHistoryAndGo };
};
export { useRouter };
//# sourceMappingURL=useRouter.js.map