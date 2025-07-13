package com.ryc.api.v2.s3.infra;

public enum FileStatus {
  PENDING_UPLOAD,
  UPLOADED,
  PROCESSING,
  COMPLETED,
  FAILED
}
