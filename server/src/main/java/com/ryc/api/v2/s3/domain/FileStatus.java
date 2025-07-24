package com.ryc.api.v2.s3.domain;

public enum FileStatus {
  PENDING_UPLOAD,
  UPLOADED,
  PROCESSING,
  COMPLETED,
  FAILED
}
