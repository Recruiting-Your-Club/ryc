import { create } from "zustand";

interface AuthState {
    accessToken: string | null;
    setAccessToken: (t: string | null) => void;
    clear: () => void;
    bootstrap: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({accessToken: token}),
    clear: () => set({accessToken: null}),
    bootstrap: async() => {
        try{
            const res = await fetch('/auth/refreshToken', {
                method: 'GET',
                credentials: 'include'
            });
            if(!res.ok) throw new Error();
            const {accessToken} = (await res.json()) as {accessToken: string}
            set({accessToken})
        } catch {
            set({accessToken: null})
        }
    }
}))