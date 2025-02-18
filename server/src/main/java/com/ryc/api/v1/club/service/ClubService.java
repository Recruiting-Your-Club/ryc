package com.ryc.api.v1.club.service;

import java.util.List;

import com.ryc.api.v1.club.dto.request.CreateClubRequest;
import com.ryc.api.v1.club.dto.response.ClubOverviewResponse;
import com.ryc.api.v1.club.dto.response.ClubResponse;
import com.ryc.api.v1.club.dto.response.CreateClubResponse;

public interface ClubService {
  CreateClubResponse createClub(CreateClubRequest body);

  List<ClubOverviewResponse> findAllClubsOverview();

  ClubResponse findClubById(String clubId);
}
