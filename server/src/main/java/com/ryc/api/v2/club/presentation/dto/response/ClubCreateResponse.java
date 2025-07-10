package com.ryc.api.v2.club.presentation.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record ClubCreateResponse(@Schema(description = "동아리 ID") String clubId) {}
