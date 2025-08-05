package com.ryc.api.v2.s3.service;

import com.ryc.api.v2.s3.domain.FileMetaData;
import com.ryc.api.v2.s3.domain.FileMetaDataRepository;
import com.ryc.api.v2.s3.domain.FileType;
import com.ryc.api.v2.s3.presentation.dto.request.UploadUrlRequest;
import com.ryc.api.v2.s3.presentation.dto.request.UploadConfirmRequest;
import com.ryc.api.v2.s3.presentation.dto.response.UploadUrlResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.S3AsyncClient;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.HeadObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.time.Duration;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3Service {

    private final S3Presigner presigner;
    private final S3Client s3Client;
    private final FileMetaDataRepository fileMetaDataRepository;

    private final String CLUB_PATH = "public/clubs";
    private final String ANNOUNCEMENT_PATH = "public/announcements";
    private final String APPLICATION_PATH = "private/applications";

    @Value("${CLOUD_S3_BUCKET}")
    private String bucketName;

    @Value("${CLOUD_AWS_CDN_DOMAIN}")
    private String cdnDomain;

    @Transactional
    public UploadUrlResponse getUploadPresignedUrl(UploadUrlRequest request, String userId) {

        // 1. String to enum && contentType validate
        FileType fileType = FileType.from(request.fileType());
        fileType.checkContentType(request.contentType());
        // 2. s3 key 생성
        String S3Key = generateS3Key(fileType, request.associatedId(), request.fileName());

        // 3. fileMetaData 생성
        FileMetaData fileMetaData = FileMetaData.initialize(request, S3Key, userId);

        FileMetaData savedFileMetaData = fileMetaDataRepository.save(fileMetaData);

        //4. presigned url 생성
        PutObjectRequest objectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(S3Key)
                .contentType(request.contentType())
                .build();

        PutObjectPresignRequest presignRequest = PutObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(10))
                .putObjectRequest(objectRequest)
                .build();

        String presignedUrl = presigner.presignPutObject(presignRequest).url().toString();

        return UploadUrlResponse.builder()
                .presignedUrl(presignedUrl)
                .fileMetadataId(savedFileMetaData.getId())
                .build();
    }

    @Transactional
    public void confirmUpload(UploadConfirmRequest request) {
        FileMetaData fileMetaData = fileMetaDataRepository.findById(request.fileMetadataId());

        HeadObjectRequest objectRequest = HeadObjectRequest.builder()
                .bucket(bucketName)
                .key(fileMetaData.getFilePath())
                .build();
        try {
            HeadObjectResponse response = s3Client.headObject(objectRequest);
            fileMetaDataRepository.save(fileMetaData.confirmUpload(response.contentLength()));
        } catch(NoSuchKeyException e){
            fileMetaDataRepository.save(fileMetaData.issueFailUpload());
            throw new RuntimeException("file not found");
        }
    }

    private String generateS3Key(FileType fileType, String associatedId, String fileName) {
        String uuid = UUID.randomUUID().toString();
        String path;

        path = switch (fileType){
            case CLUB_PROFILE -> CLUB_PATH;
            case ANNOUNCEMENT_IMAGE -> ANNOUNCEMENT_PATH;
            case APPLICATION_ATTACHMENT -> APPLICATION_PATH;
        };

        return String.format("%s/%s/%s_%s", path, associatedId, uuid, fileName);
    }
}
