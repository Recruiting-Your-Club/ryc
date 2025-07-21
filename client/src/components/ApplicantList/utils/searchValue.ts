import { ApplicantSummary } from '@components/ApplicantMiniCard/types';

export const normalizeQuery = (value: string) => {
    return value.toLowerCase().replace(/\s+/g, '');
};

export const filterQuery = (list: ApplicantSummary[], query: string) => {
    const normalizedQuery = normalizeQuery(query);
    return list.filter((value) => normalizeQuery(value.name).includes(normalizedQuery));
};
