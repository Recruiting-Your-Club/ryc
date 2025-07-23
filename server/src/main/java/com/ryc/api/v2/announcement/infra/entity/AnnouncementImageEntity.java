package com.ryc.api.v2.announcement.infra.entity;

import jakarta.persistence.*;

import com.ryc.api.v2.common.entity.BaseEntity;
import com.ryc.api.v2.s3.infra.entity.FileMetadataEntity;

import lombok.*;

@Entity
@Table(name = "announcement_images")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Setter
public class AnnouncementImageEntity extends BaseEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "file_metadata_id", nullable = false)
  private FileMetadataEntity fileMetadata;

  @Column(name = "display_order", nullable = false)
  private int displayOrder;

  @Column(name = "file_metadata_id", insertable = false, updatable = false)
  private String fileMetadataId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "announcement_id")
  private AnnouncementEntity announcement;

  public void update(AnnouncementImageEntity newImage) {
    this.fileMetadata = newImage.getFileMetadata();
    this.displayOrder = newImage.getDisplayOrder();
  }
}
