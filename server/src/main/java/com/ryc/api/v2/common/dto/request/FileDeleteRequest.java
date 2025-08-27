package com.ryc.api.v2.common.dto.request;

import org.hibernate.validator.constraints.UUID;

public record FileDeleteRequest(
    @UUID(message = "파일 메타데이터 id는 UUID 포멧이어야 합니다.") String fileMetadataId) {}
