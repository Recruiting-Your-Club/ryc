import { register } from '@api/domain/auth/auth';
import type { Register, RegisterResponse } from '@api/domain/auth/types';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function useRegister() {
    const navigate = useNavigate();

    return useMutation<RegisterResponse, Error, Register>({
        mutationFn: register,
        onSuccess: () => {
            navigate('/login', { replace: true });
        },
        onError: (error) => {
            //console.log(error)
        },
    });
}

export { useRegister };
