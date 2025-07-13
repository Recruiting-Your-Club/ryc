package com.ryc.api.v2.application.infra.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ApplicationEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  String id;

  String AnnouncementId;

  String email;
}
