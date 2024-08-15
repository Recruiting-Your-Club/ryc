package com.ryc.api.v1.club.service;

import com.ryc.api.v1.club.dto.request.CreateClubRequest;
import com.ryc.api.v1.club.dto.response.CreateClubResponse;

public interface ClubService {
    CreateClubResponse createClub(CreateClubRequest body);
}
