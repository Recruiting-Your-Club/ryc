package com.ryc.api.v2.announcement.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ryc.api.v2.announcement.domain.enums.AnnouncementStatus;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

  @Transactional(readOnly = true)
  public Map<String, AnnouncementStatus> getStatusesByClubIds(List<String> clubIds) {
    return clubIds.stream()
        .map(clubId -> Map.entry(clubId, AnnouncementStatus.UPCOMING))
        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
  }
}
