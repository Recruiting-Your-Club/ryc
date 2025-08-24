import type { Answer, FileRecord } from '@pages/ClubApplyPage/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { deserializeFiles, type SerializedFile, serializeFiles } from '../utils/fileSerializer';

interface ApplicationState {
    answersByAnnouncement: Record<string, Answer[]>;
    filesByAnnouncement: Record<string, FileRecord>;
    serializedFilesByAnnouncement: Record<string, Record<string, SerializedFile[]>>; // sessionStorage용
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
            serializedFilesByAnnouncement: {},
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
            updateFiles: (announcementId, questionId, files) => {
                // 메모리에 즉시 저장
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
                });

                // 비동기로 직렬화하여 sessionStorage에 저장
                if (files.length > 0) {
                    serializeFiles(files).then((serializedFiles) => {
                        set((state) => {
                            const currentSerialized =
                                state.serializedFilesByAnnouncement[announcementId] || {};
                            return {
                                serializedFilesByAnnouncement: {
                                    ...state.serializedFilesByAnnouncement,
                                    [announcementId]: {
                                        ...currentSerialized,
                                        [questionId]: serializedFiles,
                                    },
                                },
                            };
                        });
                    });
                } else {
                    // 파일이 없으면 직렬화된 데이터도 제거
                    set((state) => {
                        const currentSerialized =
                            state.serializedFilesByAnnouncement[announcementId] || {};
                        const { [questionId]: removed, ...rest } = currentSerialized;
                        return {
                            serializedFilesByAnnouncement: {
                                ...state.serializedFilesByAnnouncement,
                                [announcementId]: rest,
                            },
                        };
                    });
                }
            },
            clear: (announcementId) =>
                set((state) => {
                    if (announcementId) {
                        const { [announcementId]: removedAnswers, ...restAnswers } =
                            state.answersByAnnouncement;
                        const { [announcementId]: removedFiles, ...restFiles } =
                            state.filesByAnnouncement;
                        const { [announcementId]: removedSerialized, ...restSerialized } =
                            state.serializedFilesByAnnouncement;

                        return {
                            answersByAnnouncement: restAnswers,
                            filesByAnnouncement: restFiles,
                            serializedFilesByAnnouncement: restSerialized,
                        };
                    }

                    return {
                        answersByAnnouncement: {},
                        filesByAnnouncement: {},
                        serializedFilesByAnnouncement: {},
                    };
                }),
        }),
        {
            name: 'application-store',
            storage: {
                getItem: (name) => {
                    const str = sessionStorage.getItem(name);
                    if (!str) return null;

                    const parsed = JSON.parse(str);
                    return parsed;
                },
                setItem: (name, value) => {
                    // filesByAnnouncement는 메모리용이므로 저장하지 않음
                    if (value.state) {
                        const { filesByAnnouncement, ...stateWithoutMemoryFiles } = value.state;
                        const valueToStore = {
                            ...value,
                            state: stateWithoutMemoryFiles,
                        };
                        sessionStorage.setItem(name, JSON.stringify(valueToStore));
                    } else {
                        sessionStorage.setItem(name, JSON.stringify(value));
                    }
                },
                removeItem: (name) => {
                    sessionStorage.removeItem(name);
                },
            },
            onRehydrateStorage: () => (state) => {
                // 페이지 로드 시 직렬화된 파일들을 File 객체로 복원
                if (state?.serializedFilesByAnnouncement) {
                    const restoredFiles: Record<string, FileRecord> = {};

                    Object.entries(state.serializedFilesByAnnouncement).forEach(
                        ([announcementId, questions]) => {
                            restoredFiles[announcementId] = {};
                            Object.entries(questions).forEach(([questionId, serializedFiles]) => {
                                try {
                                    restoredFiles[announcementId][questionId] =
                                        deserializeFiles(serializedFiles);
                                } catch (error) {
                                    console.error(
                                        `파일 복원 실패 (${announcementId}/${questionId}):`,
                                        error,
                                    );
                                    restoredFiles[announcementId][questionId] = [];
                                }
                            });
                        },
                    );

                    // 복원된 파일들을 메모리에 설정
                    Object.assign(state, { filesByAnnouncement: restoredFiles });
                }
            },
        },
    ),
);
