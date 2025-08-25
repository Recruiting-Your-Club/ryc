package com.ryc.api.v2.common.exception.event;

import lombok.Getter;

@Getter
public class ServerErrorEvent {

  private final String message;

  public ServerErrorEvent(String requestUri, String message) {
    this.message =
        """
      ❗️[서버 오류] 500 오류 발생
      ➤ 요청 URL: %s
      ➤ 예외 메시지: %s
      """
            .formatted(requestUri, message);
  }
}
