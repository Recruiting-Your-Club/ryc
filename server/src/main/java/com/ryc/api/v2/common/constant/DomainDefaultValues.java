package com.ryc.api.v2.common.constant;

import java.time.LocalDateTime;

public final class DomainDefaultValues {
  public static final String DEFAULT_INITIAL_ID = "INITIALIZE_ID";
  public static final LocalDateTime DEFAULT_INITIAL_DATETIME = LocalDateTime.of(2000, 1, 1, 0, 0);

  private DomainDefaultValues() {
    throw new UnsupportedOperationException("This is a constant class and cannot be instantiated");
  }
}
