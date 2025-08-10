package com.ryc.api.v2.file.infra;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.common.exception.custom.BusinessRuleException;
import com.ryc.api.v2.file.common.exception.code.S3ErrorCode;

import lombok.RequiredArgsConstructor;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.HeadObjectResponse;
import software.amazon.awssdk.services.s3.model.NoSuchKeyException;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

@Component
@RequiredArgsConstructor
public class S3FileStorage {
  private final S3Presigner presigner;
  private final S3Client s3Client;

  @Value("${CLOUD_S3_BUCKET}")
  private String bucketName;

  public String getUploadPresignedUrl(String s3Key, String contentType) {
    PutObjectRequest objectRequest =
        PutObjectRequest.builder().bucket(bucketName).key(s3Key).contentType(contentType).build();

    PutObjectPresignRequest presignRequest =
        PutObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(10))
            .putObjectRequest(objectRequest)
            .build();

    return presigner.presignPutObject(presignRequest).url().toString();
  }

  public void moveFile(String sourceS3Key, String targetS3Key) {
    s3Client.copyObject(
        r ->
            r.sourceBucket(bucketName)
                .sourceKey(sourceS3Key)
                .destinationBucket(bucketName)
                .destinationKey(targetS3Key));
  }

  public String getPrivateFileGetUrl(String s3Key) {
    GetObjectRequest getObjectRequest =
        GetObjectRequest.builder().bucket(bucketName).key(s3Key).build();

    GetObjectPresignRequest presignRequest =
        GetObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(10))
            .getObjectRequest(getObjectRequest)
            .build();

    return presigner.presignGetObject(presignRequest).url().toString();
  }

  public HeadObjectResponse getMetaData(String s3Key) {
    try {
      return s3Client.headObject(r -> r.bucket(bucketName).key(s3Key));
    } catch (NoSuchKeyException e) {
      throw new BusinessRuleException(S3ErrorCode.FILE_NOT_FOUND_AT_S3, s3Key);
    } catch (Exception e) {
      throw new BusinessRuleException(S3ErrorCode.S3_SERVER_ERROR);
    }
  }

  public void deleteFile(String s3Key) {
    s3Client.deleteObject(r -> r.bucket(bucketName).key(s3Key));
  }
}
