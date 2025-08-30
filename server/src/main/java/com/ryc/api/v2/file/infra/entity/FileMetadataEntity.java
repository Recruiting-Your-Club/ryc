package com.ryc.api.v2.file.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.common.infra.entity.BaseEntity;
import com.ryc.api.v2.file.domain.FileDomainType;
import com.ryc.api.v2.file.domain.FileStatus;

import lombok.*;

@Entity
@Table(name = "file_metadatas")
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

  // private 파일 임시 접근을 위한 accessToken
  private String accessToken;

  // Image or 문서 파일
  @Enumerated(EnumType.STRING)
  private FileDomainType fileDomainType;

  private String associatedId;

  // 최근 업로드 유저
  private String uploadedByUserId;

  private int displayOrder;

  @Enumerated(EnumType.STRING)
  private FileStatus status;

  private boolean isDeleted;

  public void update(FileMetadataEntity entity) {
    this.filePath = entity.getFilePath();
    this.originalFileName = entity.getOriginalFileName();
    this.contentType = entity.getContentType();
    this.fileSize = entity.getFileSize();
    this.fileDomainType = entity.getFileDomainType();
    this.associatedId = entity.getAssociatedId();
    this.uploadedByUserId = entity.getUploadedByUserId();
    this.status = entity.getStatus();
    this.isDeleted = entity.isDeleted();
    this.displayOrder = entity.getDisplayOrder();
  }
}
