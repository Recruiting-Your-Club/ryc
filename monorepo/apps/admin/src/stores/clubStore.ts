import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ClubStore {
    clubId: string | null;
    setClubId: (id: string) => void;
    resetClubId: () => void;
}

export const useClubStore = create<ClubStore>()(
    persist(
        (set) => ({
            clubId: null,
            setClubId: (id) => set({ clubId: id }),
            resetClubId: () => set({ clubId: null }),
        }),
        {
            name: 'club-storage',
        },
    ),
);
