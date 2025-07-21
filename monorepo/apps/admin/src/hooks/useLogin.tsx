import { login } from '@api/domain/auth/auth';
import type { Login, LoginResponse } from '@api/domain/auth/types';
import { useAuthStore } from '@stores/authStore';
import { useMutation } from '@tanstack/react-query';

import { useRouter } from '@ssoc/hooks';

function useLogin() {
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const { removeHistoryAndGo } = useRouter();

    return useMutation<LoginResponse, Error, Login>({
        mutationFn: login,
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            removeHistoryAndGo('/myClub');
        },
        onError: (error) => {
            //console.log(error);
        },
    });
}

export { useLogin };
