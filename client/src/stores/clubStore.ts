import { Period } from '@api/domain/announcement/types';
import { create } from 'zustand';

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
    applicationPeriod: Period;
    setApplicationPeriod: (period: Period) => void;
    clear: () => void;
}

export const useClubStore = create<ClubState>((set) => ({
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
    applicationPeriod: { startDate: '', endDate: '' },
    setApplicationPeriod: (period) => set({ applicationPeriod: period }),
    clear: () =>
        set({
            clubName: '',
            clubLogo: '',
            clubCategory: '',
            clubDescription: '',
            clubStatus: '',
            applicationPeriod: { startDate: '', endDate: '' },
        }),
}));
