import type { Answer, FileRecord } from '@pages/ClubApplyPage/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ApplicationState {
    answersByAnnouncement: Record<string, Answer[]>;
    filesByAnnouncement: Record<string, FileRecord>;
    setAnswers: (announcementId: string, answers: Answer[]) => void;
    getAnswers: (announcementId: string) => Answer[];
    setFiles: (announcementId: string, files: FileRecord) => void;
    getFiles: (announcementId: string) => FileRecord;
    updateFiles: (announcementId: string, questionId: string, files: File[]) => void;
    clear: (announcementId?: string) => void;
}

export const useApplicationStore = create<ApplicationState>()(
    persist(
        (set, get) => ({
            answersByAnnouncement: {},
            filesByAnnouncement: {},
            setAnswers: (announcementId, answers) =>
                set((state) => ({
                    answersByAnnouncement: {
                        ...state.answersByAnnouncement,
                        [announcementId]: answers,
                    },
                })),
            getAnswers: (announcementId) => get().answersByAnnouncement[announcementId] || [],
            setFiles: (announcementId, files) =>
                set((state) => ({
                    filesByAnnouncement: {
                        ...state.filesByAnnouncement,
                        [announcementId]: files,
                    },
                })),
            getFiles: (announcementId) => get().filesByAnnouncement[announcementId] || {},
            updateFiles: (announcementId, questionId, files) =>
                set((state) => {
                    const currentFiles = state.filesByAnnouncement[announcementId] || {};
                    return {
                        filesByAnnouncement: {
                            ...state.filesByAnnouncement,
                            [announcementId]: {
                                ...currentFiles,
                                [questionId]: files,
                            },
                        },
                    };
                }),
            clear: (announcementId) =>
                set((state) => {
                    if (announcementId) {
                        const { [announcementId]: removedAnswers, ...restAnswers } =
                            state.answersByAnnouncement;
                        const { [announcementId]: removedFiles, ...restFiles } =
                            state.filesByAnnouncement;
                        return {
                            answersByAnnouncement: restAnswers,
                            filesByAnnouncement: restFiles,
                        };
                    }
                    return {
                        answersByAnnouncement: {},
                        filesByAnnouncement: {},
                    };
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
