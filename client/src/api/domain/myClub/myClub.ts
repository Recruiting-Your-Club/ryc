import { httpRequest } from "@api/common/httpRequest";
import { MyClubResponse } from "./types";

async function getMyClub(): Promise<MyClubResponse[]>{
    const response = await httpRequest.get({
        url: 'api/v2/clubs/my',
        isAuthRequire: true,
    })
    return response as MyClubResponse[];
}

export {getMyClub}