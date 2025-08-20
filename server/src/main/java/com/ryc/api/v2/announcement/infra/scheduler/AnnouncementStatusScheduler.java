package com.ryc.api.v2.announcement.infra.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.ryc.api.v2.announcement.service.AnnouncementService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AnnouncementStatusScheduler {

  private final AnnouncementService announcementService;

  @Scheduled(cron = "0 * * * * *")
  public void updateAnnouncementStatus() {
    announcementService.updateAnnouncementStatus();
  }
}
