package com.ryc.api.v2.email.infra.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EmailEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;
}
