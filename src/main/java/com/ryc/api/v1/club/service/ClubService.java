package com.ryc.api.v1.club.service;

import com.ryc.api.v1.club.dto.request.CreateClubRequest;
import com.ryc.api.v1.club.dto.response.CreateClubResponse;
import com.ryc.api.v1.club.dto.response.ClubOverviewResponse;

import java.util.List;

public interface ClubService {
    CreateClubResponse createClub(CreateClubRequest body);
    List<ClubOverviewResponse> findAllClubsOverview();
}
