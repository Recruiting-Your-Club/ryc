package com.ryc.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

@Configuration
public class S3Config {

  @Value("${CLOUD_AWS_ACCESS_KEY}")
  private String accessKey;

  @Value("${CLOUD_AWS_SECRET_KEY}")
  private String secretKey;

  @Value("${CLOUD_AWS_REGION}")
  private String region;

  @Bean
  public S3Client s3Client() {
    AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(accessKey, secretKey);
    Region region = Region.of(this.region);

    return S3Client.builder().credentialsProvider(() -> awsBasicCredentials).region(region).build();
  }

  @Bean
  public S3Presigner s3Presigner() {
    AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(accessKey, secretKey);
    Region region = Region.of(this.region);

    return S3Presigner.builder()
        .credentialsProvider(() -> awsBasicCredentials)
        .region(region)
        .build();
  }
}
