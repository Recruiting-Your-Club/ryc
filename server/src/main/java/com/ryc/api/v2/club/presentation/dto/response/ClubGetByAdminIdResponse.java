package com.ryc.api.v2.club.presentation.dto.response;

import com.ryc.api.v2.common.dto.response.FileGetResponse;

import lombok.Builder;

@Builder
public record ClubGetByAdminIdResponse(
    String id, String name, String shortDescription, FileGetResponse image) {}
