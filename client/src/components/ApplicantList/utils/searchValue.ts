import { Applicant } from '@api/domain/applicant/types';

export const normalizeQuery = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, '');
};

export const filterQuery = (list: Applicant[], query: string) => {
    const normalizedQuery = normalizeQuery(query);
    return list.filter((value) => normalizeQuery(value.name).includes(normalizedQuery));
};
