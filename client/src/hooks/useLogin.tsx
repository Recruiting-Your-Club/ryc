import { login } from "@api/domain";
import { Login, LoginResponse } from "@api/domain/auth/types";
import { useAuthStore } from "@stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useRouter } from "./useRouter";

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
            console.log(error);
        }
    })
}

export {useLogin}