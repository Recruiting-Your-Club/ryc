import type { Period } from '@api/domain/announcement/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ClubState {
    clubName: string;
    setClubName: (name: string) => void;
    clubLogo: string;
    setClubLogo: (logo: string) => void;
    clubCategory: string;
    setClubCategory: (category: string) => void;
    clubDescription: string;
    setClubDescription: (description: string) => void;
    clubStatus: string;
    setClubStatus: (status: string) => void;
    clubField: string;
    setClubField: (field: string) => void;
    applicationPeriod: Period;
    setApplicationPeriod: (period: Period) => void;
    clear: () => void;
}

export const useClubStore = create<ClubState>()(
    persist(
        (set) => ({
            clubName: '',
            setClubName: (name) => set({ clubName: name }),
            clubLogo: '',
            setClubLogo: (logo) => set({ clubLogo: logo }),
            clubCategory: '',
            setClubCategory: (category) => set({ clubCategory: category }),
            clubDescription: '',
            setClubDescription: (description) => set({ clubDescription: description }),
            clubStatus: '',
            setClubStatus: (status) => set({ clubStatus: status }),
            clubField: '',
            setClubField: (field) => set({ clubField: field }),
            applicationPeriod: { startDate: '', endDate: '' },
            setApplicationPeriod: (period) => set({ applicationPeriod: period }),
            clear: () =>
                set({
                    clubName: '',
                    clubLogo: '',
                    clubCategory: '',
                    clubDescription: '',
                    clubStatus: '',
                    clubField: '',
                    applicationPeriod: { startDate: '', endDate: '' },
                }),
        }),
        {
            name: 'club-storage', // localStorage key
        },
    ),
);
