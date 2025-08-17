package com.ryc.api.v2.announcement.service.event;

import java.util.List;

public record AnnouncementDeletedEvent(List<String> announcementIds) {}
