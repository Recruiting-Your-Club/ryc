import { login } from "@api/domain";
import { Login, LoginResponse } from "@api/domain/auth/types";
import { useAuthStore } from "@stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

function useLogin() {
    const setAccessToken = useAuthStore((state) => state.setAccessToken);
    const navigate = useNavigate();

    return useMutation<LoginResponse, Error, Login>({
        mutationFn: login,
        onSuccess: (data) => {
            setAccessToken(data.accessToken);
            navigate('/myClub', {replace: true})
        }
    })
}

export {useLogin}