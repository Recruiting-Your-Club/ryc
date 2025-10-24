package com.ryc.api.v2.file.infra.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.file.service.FileService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OrphanImageCleanupScheduler {
  private final FileService fileService;

  @Scheduled(cron = "0 0 0 * * *")
  public void deleteOrphanImage() {
    fileService.deleteOrphanImage();
  }
}
