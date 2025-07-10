import { Interviewee } from '@api/domain/interview/types';
import type { EnrichedInterviewee } from '../types';

export const normalizeQuery = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, '');
}; // 엄밀히 말하면 util 함수에 해당

export const filterQuery = (list: EnrichedInterviewee[], query: string) => {
    const normalizedQuery = normalizeQuery(query);
    return list.filter((value) => normalizeQuery(value.name).includes(normalizedQuery));
};
