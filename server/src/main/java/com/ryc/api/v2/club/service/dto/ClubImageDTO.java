package com.ryc.api.v2.club.service.dto;

import java.util.List;

import com.ryc.api.v2.common.dto.response.FileGetResponse;

public record ClubImageDTO(FileGetResponse profileImage, List<FileGetResponse> detailImages) {}
