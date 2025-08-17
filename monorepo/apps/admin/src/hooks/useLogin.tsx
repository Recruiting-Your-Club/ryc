import { login } from '@api/domain/auth/auth';
import type { Login, LoginResponse } from '@api/domain/auth/types';
import { useAuthStore } from '@stores/authStore';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '@ssoc/hooks';
import { useToast } from '@ssoc/ui';

function useLogin() {
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const { removeHistoryAndGo } = useRouter();
    const { toast } = useToast();

    return useMutation<LoginResponse, Error, Login>({
        mutationFn: login,
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            removeHistoryAndGo('/myClub');
        },
        onError: (error) => {
            toast.error('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.', {
                toastTheme: 'black',
                position: 'topCenter',
            });
        },
    });
}

export { useLogin };
