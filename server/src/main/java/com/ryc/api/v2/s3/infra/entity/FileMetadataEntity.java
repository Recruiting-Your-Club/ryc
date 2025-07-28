package com.ryc.api.v2.s3.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.common.entity.BaseEntity;
import com.ryc.api.v2.s3.domain.FileStatus;
import com.ryc.api.v2.s3.domain.FileType;

import lombok.*;

@Entity
@Table(name = "file_metadata")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class FileMetadataEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @Column(nullable = false, unique = true)
  private String s3Key;

  @Column(nullable = false)
  private String originalFileName;

  @Column(nullable = false)
  private String contentType;

  private Long fileSize;

  // Image or 문서 파일
  @Enumerated(EnumType.STRING)
  private FileType fileType;

  private Boolean isPublic;

  // 썸네일 S3 키
  private String thumbnailS3Key;
  // 최근 업로드 유저
  private String uploadedByUserId;

  @Enumerated(EnumType.STRING)
  private FileStatus status; // PENDING_UPLOAD, UPLOADED 등

  public void updateStatus(FileStatus newStatus) {
    this.status = newStatus;
  }

  public void updateThumbnailS3Key(String thumbnailS3Key) {
    this.thumbnailS3Key = thumbnailS3Key;
  }
}
