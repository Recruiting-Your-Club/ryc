import type { Answer } from '@pages/ClubApplyPage/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApplicationState {
    answersByAnnouncement: Record<string, Answer[]>;
    setAnswers: (announcementId: string, answers: Answer[]) => void;
    getAnswers: (announcementId: string) => Answer[];
    clear: (announcementId?: string) => void;
}

export const useApplicationStore = create<ApplicationState>()(
    persist(
        (set, get) => ({
            answersByAnnouncement: {},
            setAnswers: (announcementId, answers) =>
                set((state) => ({
                    answersByAnnouncement: {
                        ...state.answersByAnnouncement,
                        [announcementId]: answers,
                    },
                })),
            getAnswers: (announcementId) => get().answersByAnnouncement[announcementId] || [],
            clear: (announcementId) =>
                set((state) => {
                    if (announcementId) {
                        const { [announcementId]: removed, ...rest } = state.answersByAnnouncement;
                        return { answersByAnnouncement: rest };
                    }
                    return { answersByAnnouncement: {} };
                }),
        }),
        {
            name: 'application-store',
            storage: {
                getItem: (name) => {
                    const str = sessionStorage.getItem(name);
                    return str ? JSON.parse(str) : null;
                },
                setItem: (name, value) => {
                    sessionStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                },
            },
        },
    ),
);
