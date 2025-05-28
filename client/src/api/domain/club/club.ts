import { httpRequest } from '../../common/httpRequest';
import type { AllClub, Club } from './types';

async function getAllClubs(): Promise<AllClub[]> {
    const response = await httpRequest.get({
        url: 'clubs/all',
    });
    return response as AllClub[];
}
async function getClub(id: string): Promise<Club> {
    const response = await httpRequest.get({
        url: `clubs/${id}`,
    });
    return response as Club;
}

export { getAllClubs, getClub };
