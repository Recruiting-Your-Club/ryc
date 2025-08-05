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
  private String filePath;

  @Column(nullable = false)
  private String originalFileName;

  @Column(nullable = false)
  private String contentType;

  private Long fileSize;

  // Image or 문서 파일
  @Enumerated(EnumType.STRING)
  private FileType fileType;

  @Column(nullable = false)
  private String associatedId;

  // 최근 업로드 유저
  private String uploadedByUserId;

  @Enumerated(EnumType.STRING)
  private FileStatus status;

  public void update(FileMetadataEntity entity) {
    this.filePath = entity.getFilePath();
    this.originalFileName = entity.getOriginalFileName();
    this.contentType = entity.getContentType();
    this.fileSize = entity.getFileSize();
    this.fileType = entity.getFileType();
    this.associatedId = entity.getAssociatedId();
    this.uploadedByUserId = entity.getUploadedByUserId();
    this.status = entity.getStatus();
  }
}
