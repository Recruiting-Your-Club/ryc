package com.ryc.api.v2.s3.service;

import com.ryc.api.v2.s3.domain.FileType;
import com.ryc.api.v2.s3.presentation.dto.request.PresignedUrlRequest;
import com.ryc.api.v2.s3.presentation.dto.response.PresignedUrlResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Presigner presigner;

    private final String clubPath = "public/clubs";
    private final String announcementPath = "public/announcements";
    private final String applicationPath = "private/applications";

    @Value("${CLOUD_S3_BUCKET}")
    private String bucketName;

    @Value("${CLOUD_AWS_CDN_DOMAIN}")
    private String cdnDomain;

    @Transactional
    public PresignedUrlResponse getPreSignedUrl(PresignedUrlRequest request, String userId) {
        // 1. 파일 S3 경로 생성
        String S3Key = generateS3Key(request.fileType(), request.associatedId(), request.fileName());
        // 2. presigned url 생성
    }

    private String generateS3Key(FileType fileType, String associatedId, String fileName) {
        String uuid = UUID.randomUUID().toString();
        String path;

        path = switch (fileType){
            case CLUB_PROFILE -> clubPath;
            case ANNOUNCEMENT_IMAGE -> announcementPath;
            case APPLICATION_ATTACHMENT -> applicationPath;
        };

        return String.format("%s/%s/%s", path, associatedId, uuid);
    }
}
