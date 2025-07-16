package com.ryc.api.health;

import java.util.Map;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {
  @PersistenceContext private EntityManager entityManager;

  @GetMapping("/api/health")
  public ResponseEntity<?> healthCheck() {
    try {
      Query query = entityManager.createNativeQuery("SELECT 1");
      query.getSingleResult();

      return ResponseEntity.status(HttpStatus.OK)
          .body(
              Map.of(
                  "status", "UP",
                  "db", "UP"));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(
              Map.of(
                  "status", "DOWN",
                  "db", "DOWN",
                  "message", e.getMessage()));
    }
  }
}
