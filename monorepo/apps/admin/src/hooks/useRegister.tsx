import { register } from '@api/domain/auth/auth';
import type { Register, RegisterResponse } from '@api/domain/auth/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@ssoc/ui';

import { HttpError } from '../api/common/httpError';

function useRegister() {
    const navigate = useNavigate();
    const { toast } = useToast();

    return useMutation<RegisterResponse, Error, Register>({
        mutationFn: register,
        onSuccess: () => {
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            // 500 에러인 경우 전역 처리에 위임
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            }
            toast.error('회원가입에 실패했습니다.', {
                toastTheme: 'black',
                position: 'topCenter',
            });
        },
    });
}

export { useRegister };
