import { httpRequest } from '../../common/httpRequest';
import type { AllClub } from './types';

async function getAllClubs(): Promise<AllClub[]> {
    const response = await httpRequest.get({
        url: 'clubs/all',
        isAuthRequire: false,
    });
    return response as AllClub[];
}
export { getAllClubs };
