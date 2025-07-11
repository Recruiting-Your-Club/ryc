package com.ryc.api.v2.Interview.infra.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "interviews")
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class InterviewEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;


}
