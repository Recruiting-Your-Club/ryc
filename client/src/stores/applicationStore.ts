import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApplicationState {
    userName: string;
    setUserName: (name: string) => void;
    userEmail: string;
    setUserEmail: (email: string) => void;
    clear: () => void;
}

export const useApplicationStore = create<ApplicationState>()(
    persist(
        (set) => ({
            userName: '',
            setUserName: (name) => set({ userName: name }),
            userEmail: '',
            setUserEmail: (email) => set({ userEmail: email }),
            clear: () => set({ userName: '', userEmail: '' }),
        }),
        {
            name: 'application-store',
        },
    ),
);
