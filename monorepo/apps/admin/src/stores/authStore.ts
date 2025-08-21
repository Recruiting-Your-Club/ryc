import { BASE_URL } from '@constants/api';
import { create } from 'zustand';

let refreshingPromise: Promise<string | null> | null = null;

interface AuthState {
    accessToken: string | null;
    setAccessToken: (token: string | null) => void;
    clear: () => void;
    bootstrap: () => Promise<string | null>;
    logout?: (reason?: 'SESSION_EXPIRED' | 'MANUAL') => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    setAccessToken: (token) => set({ accessToken: token }),
    clear: () => set({ accessToken: null }),
    bootstrap: async () => {
        if (refreshingPromise) return refreshingPromise;
        const refreshURL = new URL('auth/refresh-token', BASE_URL).toString();

        refreshingPromise = (async () => {
            try {
                const response = await fetch(refreshURL, {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) throw new Error('refresh 실패');

                const { accessToken } = (await response.json()) as { accessToken: string };
                set({ accessToken });
                return accessToken;
            } catch {
                set({ accessToken: null });
                return null;
            } finally {
                refreshingPromise = null;
            }
        })();

        return refreshingPromise;
    },
    logout: async (reason = 'MANUAL') => {
        try {
            const logoutURL = new URL('auth/logout', BASE_URL).toString();
            await fetch(logoutURL, { method: 'POST', credentials: 'include' });
        } catch {
            /** no-op */
        } finally {
            set({ accessToken: null });
            const params = new URLSearchParams({ reason });
            window.location.href = `/login?${params.toString()}`;
        }
    },
}));
