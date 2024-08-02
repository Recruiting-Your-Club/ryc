package com.ryc.api.v1.club.service;

import com.ryc.api.v1.club.dto.CreateClubRequestDto;
import com.ryc.api.v1.club.dto.CreateClubResponseDto;

public interface ClubService {
    CreateClubResponseDto createClub(CreateClubRequestDto body);
}
