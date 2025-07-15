import { BASE_URL } from "@constants/api";
import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    clear: () => void;
    bootstrap: () => Promise<string | null>;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({accessToken: token}),
    clear: () => set({accessToken: null}),
    bootstrap: async() => {
        try{
            const refreshURL = new URL('api/v2/auth/refreshToken', BASE_URL).toString();
            const res = await fetch(refreshURL, {
                method: 'GET',
                credentials: 'include'
            });
            if(!res.ok) throw new Error('refresh 실패');
            const {accessToken} = (await res.json()) as {accessToken: string}
            set({accessToken})
            return accessToken;
        } catch {
            set({accessToken: null})
            return null;
        }
    }
}))